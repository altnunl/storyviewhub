const { escapeHtml } = require("../../utils/html");

function renderFaq(items, heading = "Frequently Asked Questions") {
  return `
    <section class="seo-faq" aria-labelledby="seoFaqTitle">
      <h2 id="seoFaqTitle">${escapeHtml(heading)}</h2>
      <div class="seo-faq-grid">
        ${items.map((item) => `
          <article class="seo-faq-item">
            <h3>${escapeHtml(item.question)}</h3>
            <p>${escapeHtml(item.answer)}</p>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function buildFaqSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };
}

module.exports = {
  buildFaqSchema,
  renderFaq
};
