const { escapeAttribute, escapeHtml } = require("../../utils/html");

function renderList(items) {
  return `
    <ul class="seo-list">
      ${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
    </ul>
  `;
}

function renderSteps(items) {
  return `
    <ol class="seo-steps">
      ${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
    </ol>
  `;
}

function renderToolPageBody({ page, platform, breadcrumbs, relatedTools, submitted }) {
  const resultMessage = "The media processing connection for this tool has not been configured yet.";

  return `
    <section class="seo-page">
      <div class="shell">
        ${breadcrumbs}

        <div class="seo-hero">
          <span class="seo-kicker">${escapeHtml(platform.name)} Tool</span>
          <h1>${escapeHtml(page.h1)}</h1>
          <p>${escapeHtml(page.intro)}</p>
        </div>

        <section class="seo-tool-shell" aria-labelledby="toolFormTitle">
          <div>
            <h2 id="toolFormTitle">Tool setup</h2>
            <p>This page is ready for a real provider connection, but backend media processing is not configured in this phase.</p>
          </div>

          <form class="seo-tool-form" action="${escapeAttribute(page.path)}" method="GET" data-tool-form data-monetag-direct-link="true">
            <label for="toolInput">${escapeHtml(page.form.label)}</label>
            <div class="seo-form-row">
              <input
                id="toolInput"
                name="${escapeAttribute(page.form.inputName)}"
                type="text"
                maxlength="${page.form.maxLength}"
                placeholder="${escapeAttribute(page.form.placeholder)}"
                autocomplete="off"
                required
              >
              <button type="submit" aria-describedby="toolAdDisclosure">${escapeHtml(page.form.submitLabel)}</button>
            </div>
            <p class="seo-form-help">Maximum ${page.form.maxLength} characters. Public content only.</p>
            <p class="ad-disclosure" id="toolAdDisclosure">An advertising tab may open to support this free service.</p>
            <div class="seo-tool-result" aria-live="polite" data-tool-result>
              ${submitted ? escapeHtml(resultMessage) : ""}
            </div>
          </form>
        </section>

        <section class="seo-split">
          <article class="seo-panel">
            <h2>How to use it</h2>
            ${renderSteps(page.steps)}
          </article>

          <article class="seo-panel">
            <h2>Features</h2>
            ${renderList(page.features)}
          </article>
        </section>

        <section class="seo-split">
          <article class="seo-panel">
            <h2>Supported links and content</h2>
            ${renderList(page.supportedLinks)}
          </article>

          <article class="seo-panel">
            <h2>Privacy and safety</h2>
            <p>${escapeHtml(page.privacy)}</p>
            <p>StoryViewHub is independent and is not affiliated with Instagram, TikTok, Pinterest, Facebook, Reddit, Snapchat or Telegram.</p>
          </article>
        </section>

        <section class="seo-panel">
          <h2>Search focus</h2>
          <p>The primary search focus is <strong>${escapeHtml(page.primaryKeyword)}</strong>. Supporting topics include ${page.supportingKeywords.map(escapeHtml).join(", ")}.</p>
        </section>

        <section class="seo-panel" aria-labelledby="relatedToolsTitle">
          <h2 id="relatedToolsTitle">Related tools</h2>
          <div class="related-tool-grid">
            <a class="related-tool" href="${escapeAttribute(platform.path)}">
              <strong>${escapeHtml(platform.name)} tools</strong>
              <span>Return to the ${escapeHtml(platform.name)} hub.</span>
            </a>
            ${relatedTools.map((tool) => `
              <a class="related-tool" href="${escapeAttribute(tool.href)}">
                <strong>${escapeHtml(tool.title)}</strong>
                <span>${escapeHtml(tool.description)}</span>
              </a>
            `).join("")}
          </div>
        </section>
      </div>
    </section>
  `;
}

module.exports = {
  renderToolPageBody
};
