const express = require("express");
const path = require("path");

const { siteConfig } = require("./config/site");
const { buildHomePage } = require("./views/pages/home");
const { buildUserPage } = require("./views/pages/user");
const { findUserByUsername, getRelatedUsers } = require("./services/userService");
const { getStoriesForUsername } = require("./services/storyService");
const { buildSitemapXml } = require("./utils/seo");

function createApp() {
  const app = express();

  app.disable("x-powered-by");
  app.set("trust proxy", true);

  app.use(express.urlencoded({ extended: false }));
  app.use("/static", express.static(path.join(__dirname, "..", "public"), {
    maxAge: "30d",
    immutable: true
  }));

  app.get("/", (req, res) => {
    res.set("Cache-Control", "public, max-age=300, s-maxage=1800, stale-while-revalidate=86400");
    res.status(200).send(buildHomePage());
  });

  app.get("/api/story", async (req, res) => {
    const username = req.query.username;

    if (!username) {
      return res.json({ stories: [] });
    }

    try {
      const stories = await getStoriesForUsername(username);
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
    const rawUsername = typeof req.query.username === "string" ? req.query.username : "";
    const cleanedUsername = rawUsername.trim().replace(/^@+/, "").toLowerCase();

    if (!cleanedUsername) {
      return res.redirect(302, "/");
    }

    res.set("X-Robots-Tag", "noindex, nofollow");
    return res.redirect(302, `/user/${encodeURIComponent(cleanedUsername)}`);
  });

  app.get("/user/:username", async (req, res) => {
    const username = String(req.params.username || "").trim().replace(/^@+/, "").toLowerCase();

    if (!username) {
      return res.redirect(302, "/");
    }

    // Kayıtlı kullanıcı varsa onu kullan
    let user = findUserByUsername(username);

    // Kayıtlı değilse dinamik kullanıcı oluştur
    if (!user) {
      user = {
        slug: username,
        displayName: username
          .split(/[._-]/g)
          .filter(Boolean)
          .map(part => part.charAt(0).toUpperCase() + part.slice(1))
          .join(" ") || username
      };
    }

    let stories = [];
    try {
      stories = await getStoriesForUsername(username);
    } catch (err) {
      console.log("USER PAGE STORY ERROR:", err.message);
      stories = [];
    }

    const relatedUsers = getRelatedUsers(siteConfig.featuredUsernames[0], 12);

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