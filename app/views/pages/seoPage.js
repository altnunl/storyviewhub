const { renderLayout } = require("../layout");
const { buildBreadcrumbSchema, renderBreadcrumbs } = require("../components/breadcrumbs");
const { buildFaqSchema, renderFaq } = require("../components/faq");
const { renderPlatformPageBody } = require("../components/platformPage");
const { renderToolPageBody } = require("../components/toolPage");
const { safeJsonForScript } = require("../../utils/html");

function renderJsonLd(schema) {
  return `<script type="application/ld+json">${safeJsonForScript(schema)}</script>`;
}

function renderStructuredData({ breadcrumbs, faq }) {
  return [
    renderJsonLd(buildBreadcrumbSchema(breadcrumbs)),
    renderJsonLd(buildFaqSchema(faq))
  ].join("\n");
}

function buildPlatformSeoPage(page) {
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: page.name, href: page.path }
  ];

  const body = `
    ${renderPlatformPageBody({
      page,
      breadcrumbs: renderBreadcrumbs(breadcrumbs)
    })}
    ${renderFaq(page.faq)}
  `;

  return renderLayout({
    title: page.metaTitle,
    description: page.metaDescription,
    pathname: page.path,
    canonicalPathname: page.path,
    indexable: true,
    robotsContent: "index, follow",
    body,
    extraHead: renderStructuredData({ breadcrumbs, faq: page.faq })
  });
}

function buildToolSeoPage({ page, platform, relatedTools, submitted }) {
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: platform.name, href: platform.path },
    { name: page.h1, href: page.path }
  ];

  const body = `
    ${renderToolPageBody({
      page,
      platform,
      breadcrumbs: renderBreadcrumbs(breadcrumbs),
      relatedTools,
      submitted
    })}
    ${renderFaq(page.faq)}
  `;

  return renderLayout({
    title: page.metaTitle,
    description: page.metaDescription,
    pathname: page.path,
    canonicalPathname: page.path,
    indexable: true,
    robotsContent: "index, follow",
    body,
    extraHead: renderStructuredData({ breadcrumbs, faq: page.faq })
  });
}

module.exports = {
  buildPlatformSeoPage,
  buildToolSeoPage
};
