const { siteConfig } = require("../config/site");
const { getSitemapPages } = require("../services/seoPageService");
const { escapeHtml } = require("./html");

function absoluteUrl(pathname) {
  return `${siteConfig.baseUrl}${pathname}`;
}

function buildCanonicalTag(pathname) {
  if (!pathname) {
    return "";
  }
  return `<link rel="canonical" href="${escapeHtml(absoluteUrl(pathname))}">`;
}

function buildRobotsMeta(indexable, robotsContent) {
  const content = robotsContent || (indexable ? "index, follow, max-image-preview:large" : "noindex, nofollow");
  return `<meta name="robots" content="${escapeHtml(content)}">`;
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

function buildMetaTags({
  title,
  description,
  pathname,
  indexable,
  canonicalPathname = pathname,
  includeCanonical = true,
  includeSchema = true,
  robotsContent
}) {
  const tags = [
    `<title>${escapeHtml(title)}</title>`,
    `<meta name="description" content="${escapeHtml(description)}">`,
    `<meta property="og:title" content="${escapeHtml(title)}">`,
    `<meta property="og:description" content="${escapeHtml(description)}">`,
    `<meta property="og:type" content="website">`,
    `<meta property="og:url" content="${escapeHtml(absoluteUrl(pathname))}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${escapeHtml(title)}">`,
    `<meta name="twitter:description" content="${escapeHtml(description)}">`,
    buildRobotsMeta(indexable, robotsContent)
  ];

  if (includeCanonical && canonicalPathname) {
    tags.push(buildCanonicalTag(canonicalPathname));
  }

  if (includeSchema) {
    tags.push(buildWebPageSchema({ title, description, pathname: canonicalPathname || pathname }));
  }

  return tags.join("\n");
}

function buildSitemapXml() {
  const urls = [
    {
      loc: absoluteUrl("/"),
      changefreq: "daily",
      priority: "1.0"
    },
    ...getSitemapPages().map((page) => ({
      loc: absoluteUrl(page.path),
      changefreq: page.changefreq,
      priority: page.priority
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
