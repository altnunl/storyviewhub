const { siteConfig } = require("../config/site");
const { usernames } = require("../services/userService");
const { escapeHtml } = require("./html");

function absoluteUrl(pathname) {
  return `${siteConfig.baseUrl}${pathname}`;
}

function buildCanonicalTag(pathname) {
  return `<link rel="canonical" href="${escapeHtml(absoluteUrl(pathname))}">`;
}

function buildRobotsMeta(indexable) {
  return `<meta name="robots" content="${indexable ? "index,follow,max-image-preview:large" : "noindex,nofollow"}">`;
}

function buildWebPageSchema({ title, description, pathname }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: absoluteUrl(pathname)
  };

  return `<script type="application/ld+json">${JSON.stringify(schema)}</script>`;
}

function buildMetaTags({ title, description, pathname, indexable }) {
  return [
    `<title>${escapeHtml(title)}</title>`,
    `<meta name="description" content="${escapeHtml(description)}">`,
    `<meta property="og:title" content="${escapeHtml(title)}">`,
    `<meta property="og:description" content="${escapeHtml(description)}">`,
    `<meta property="og:type" content="website">`,
    `<meta property="og:url" content="${escapeHtml(absoluteUrl(pathname))}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${escapeHtml(title)}">`,
    `<meta name="twitter:description" content="${escapeHtml(description)}">`,
    buildCanonicalTag(pathname),
    buildRobotsMeta(indexable),
    buildWebPageSchema({ title, description, pathname })
  ].join("\n");
}

function buildSitemapXml() {
  const urls = [
    {
      loc: absoluteUrl("/"),
      changefreq: "daily",
      priority: "1.0"
    },
    ...usernames.map((user) => ({
      loc: absoluteUrl(`/user/${user.slug}`),
      changefreq: "daily",
      priority: "0.8"
    }))
  ];

  const body = urls
    .map((url) => {
      return [
        "<url>",
        `<loc>${escapeHtml(url.loc)}</loc>`,
        `<changefreq>${url.changefreq}</changefreq>`,
        `<priority>${url.priority}</priority>`,
        "</url>"
      ].join("");
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</urlset>`;
}

module.exports = {
  buildMetaTags,
  buildSitemapXml,
  absoluteUrl
};
