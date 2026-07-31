const express = require("express");
const path = require("path");

const { siteConfig } = require("./config/site");
const { buildHomePage } = require("./views/pages/home");
const { buildPlatformSeoPage, buildToolSeoPage } = require("./views/pages/seoPage");
const { buildProfileNotFoundPage, buildUserPage } = require("./views/pages/user");
const {
  getCanonicalSeoPaths,
  getPlatformByPath,
  getPlatformBySlug,
  getRelatedTools,
  getToolByPath,
  getTrailingSlashRedirects,
  redirects
} = require("./services/seoPageService");
const { findUserByUsername, getRelatedUsers } = require("./services/userService");
const { getStoriesForUsername } = require("./services/storyService");
const { buildSitemapXml } = require("./utils/seo");
const { normalizeUsername } = require("./utils/username");

function createApp() {
  const app = express();

  app.disable("x-powered-by");
  app.set("trust proxy", true);

  app.use((req, res, next) => {
    res.set("X-Content-Type-Options", "nosniff");
    res.set("Referrer-Policy", "strict-origin-when-cross-origin");
    res.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=()");
    res.set("X-Frame-Options", "SAMEORIGIN");
    next();
  });

  app.use(express.urlencoded({ extended: false }));
  app.use("/static", express.static(path.join(__dirname, "..", "public"), {
    maxAge: "30d",
    immutable: true
  }));

  app.get("/favicon.ico", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "favicon.ico"));
  });

  // 🔥 CACHE (EN KRİTİK FIX)
  const storyCache = {};
  const CACHE_DURATION = 60 * 1000; // 60 saniye

  async function getStoriesSafe(username) {
    const now = Date.now();

    if (storyCache[username] && (now - storyCache[username].time < CACHE_DURATION)) {
      return storyCache[username].data;
    }

    const data = await getStoriesForUsername(username);

    storyCache[username] = {
      data,
      time: now
    };

    return data;
  }

  // 🔥 BOT FILTER (para yakmayı keser)
  function isBot(req) {
    const ua = req.headers["user-agent"] || "";
    return /bot|crawl|spider|slurp|facebookexternalhit|wget|curl/i.test(ua);
  }

  app.get("/", (req, res) => {
    res.set("Cache-Control", "public, max-age=300, s-maxage=1800, stale-while-revalidate=86400");
    res.status(200).send(buildHomePage());
  });

  const seoRedirects = new Map();
  [...getTrailingSlashRedirects(), ...redirects].forEach((redirect) => {
    seoRedirects.set(redirect.from, redirect);

    if (redirect.from.endsWith("/") && redirect.from !== "/") {
      seoRedirects.set(redirect.from.slice(0, -1), {
        from: redirect.from.slice(0, -1),
        to: redirect.to,
        status: redirect.status
      });
    }
  });

  seoRedirects.forEach((redirect) => {
    app.get(redirect.from, (req, res, next) => {
      if (req.path !== redirect.from) {
        return next();
      }

      res.redirect(redirect.status, redirect.to);
    });
  });

  getCanonicalSeoPaths().forEach((pathname) => {
    app.get(pathname, (req, res, next) => {
      const platformPage = getPlatformByPath(pathname);

      if (platformPage) {
        res.set("Cache-Control", "public, max-age=300, s-maxage=1800, stale-while-revalidate=86400");
        return res.status(200).send(buildPlatformSeoPage(platformPage));
      }

      const toolPage = getToolByPath(pathname);

      if (!toolPage) {
        return next();
      }

      const platform = getPlatformBySlug(toolPage.platform);

      if (!platform) {
        return next();
      }

      res.set("Cache-Control", "public, max-age=300, s-maxage=1800, stale-while-revalidate=86400");
      return res.status(200).send(buildToolSeoPage({
        page: toolPage,
        platform,
        relatedTools: getRelatedTools(toolPage),
        submitted: typeof req.query[toolPage.form.inputName] === "string"
      }));
    });
  });

  app.get("/api/story", async (req, res) => {
    const normalized = normalizeUsername(
      typeof req.query.username === "string" ? req.query.username : ""
    );

    if (!normalized.ok) {
      return res.json({ stories: [] });
    }

    // 🔥 BOT ENGEL
    if (isBot(req)) {
      return res.json({ stories: [] });
    }

    try {
      const stories = await getStoriesSafe(normalized.username);
      res.json({ stories });
    } catch (err) {
      console.log("API ERROR:", err.message);
      res.json({ stories: [] });
    }
  });

  let visitorCount = 0;

  app.get("/api/count", (req, res) => {
    visitorCount++;
    res.json({ count: visitorCount });
  });

  app.get("/result", (req, res) => {
    res.set("X-Robots-Tag", "noindex, nofollow");
    const normalized = normalizeUsername(
      typeof req.query.username === "string" ? req.query.username : ""
    );

    if (!normalized.ok) {
      const relatedUsers = getRelatedUsers(siteConfig.featuredUsernames[0], 12);
      return res.status(404).send(buildProfileNotFoundPage({
        pathname: "/user/not-found",
        relatedUsers
      }));
    }

    return res.redirect(303, `/user/${encodeURIComponent(normalized.username)}`);
  });

  app.get("/user/:username", async (req, res) => {
    const normalized = normalizeUsername(
      typeof req.params.username === "string" ? req.params.username : ""
    );
    const relatedUsers = getRelatedUsers(siteConfig.featuredUsernames[0], 12);

    if (!normalized.ok) {
      res.set("Cache-Control", "public, max-age=60, s-maxage=300");
      return res.status(404).send(buildProfileNotFoundPage({
        pathname: "/user/not-found",
        relatedUsers
      }));
    }

    const username = normalized.username;
    const user = findUserByUsername(username);

    if (!user) {
      res.set("Cache-Control", "public, max-age=60, s-maxage=300");
      return res.status(404).send(buildProfileNotFoundPage({
        pathname: `/user/${encodeURIComponent(username)}`,
        relatedUsers
      }));
    }

    // 🔥 CRITICAL FIX: SAYFA RENDER'DA APIFY YOK
    let stories = [];

    try {
      // 🔥 EKSTRA GÜVENLİK: sadece gerçek kullanıcı ise bile burada çağırma
      // (artık tüm veri sadece /api/story üzerinden gelecek)
      if (!isBot(req)) {
        // stories = await getStoriesSafe(username); ❌ KAPATILDI
      }
    } catch (err) {
      console.log("USER PAGE STORY ERROR:", err.message);
      stories = [];
    }

    res.set("Cache-Control", "public, max-age=300, s-maxage=1800, stale-while-revalidate=86400");
    res.status(200).send(buildUserPage({
      user,
      stories,
      relatedUsers
    }));
  });

  app.get("/robots.txt", (req, res) => {
    res.set("Cache-Control", "public, max-age=3600, s-maxage=86400");
    res.type("text/plain").send(
      [
        "User-agent: *",
        "Allow: /",
        "Disallow: /result",
        `Sitemap: ${siteConfig.baseUrl}/sitemap.xml`
      ].join("\n")
    );
  });

  app.get("/sitemap.xml", (req, res) => {
    res.set("Cache-Control", "public, max-age=3600, s-maxage=86400");
    res.type("application/xml").send(buildSitemapXml());
  });

  return app;
}

module.exports = {
  createApp
};
