const { escapeAttribute, escapeHtml } = require("../../utils/html");
const { absoluteUrl } = require("../../utils/seo");

function renderBreadcrumbs(items) {
  return `
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <ol>
        ${items.map((item, index) => {
          const isLast = index === items.length - 1;
          return `
            <li>
              ${isLast
                ? `<span aria-current="page">${escapeHtml(item.name)}</span>`
                : `<a href="${escapeAttribute(item.href)}">${escapeHtml(item.name)}</a>`}
            </li>
          `;
        }).join("")}
      </ol>
    </nav>
  `;
}

function buildBreadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.href)
    }))
  };
}

module.exports = {
  buildBreadcrumbSchema,
  renderBreadcrumbs
};
