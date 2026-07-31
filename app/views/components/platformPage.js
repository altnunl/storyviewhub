const { escapeAttribute, escapeHtml } = require("../../utils/html");

function renderList(items) {
  return `
    <ul class="seo-list">
      ${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
    </ul>
  `;
}

function renderPlatformPageBody({ page, breadcrumbs }) {
  return `
    <section class="seo-page">
      <div class="shell">
        ${breadcrumbs}

        <div class="seo-hero">
          <span class="seo-kicker">Social Media Tools</span>
          <h1>${escapeHtml(page.h1)}</h1>
          <p>${escapeHtml(page.intro)}</p>
        </div>

        <section class="seo-panel" aria-labelledby="platformToolsTitle">
          <div class="seo-section-heading">
            <h2 id="platformToolsTitle">${escapeHtml(page.name)} tools on StoryViewHub</h2>
            <p>These pages are designed around public content, honest setup states, and future provider integrations.</p>
          </div>

          <div class="tool-card-grid">
            ${page.toolCards.map((tool) => `
              <article class="tool-card">
                <h3><a href="${escapeAttribute(tool.href)}">${escapeHtml(tool.title)}</a></h3>
                <p>${escapeHtml(tool.description)}</p>
              </article>
            `).join("")}
          </div>
        </section>

        <section class="seo-split">
          <article class="seo-panel">
            <h2>Supported content types</h2>
            ${renderList(page.contentTypes)}
          </article>

          <article class="seo-panel">
            <h2>Use and privacy approach</h2>
            <p>${escapeHtml(page.usage)}</p>
            <p>${escapeHtml(page.privacy)}</p>
          </article>
        </section>

        <section class="seo-panel">
          <h2>Search focus</h2>
          <p>The primary search focus is <strong>${escapeHtml(page.primaryKeyword)}</strong>. Supporting topics include ${page.supportingKeywords.map(escapeHtml).join(", ")}.</p>
        </section>

        <section class="seo-panel">
          <h2>Independent tool notice</h2>
          <p>StoryViewHub is an independent tool and is not affiliated with Instagram, TikTok, Pinterest, Facebook, Reddit, Snapchat or Telegram.</p>
        </section>
      </div>
    </section>
  `;
}

module.exports = {
  renderPlatformPageBody
};
