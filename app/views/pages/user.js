const { renderLayout } = require("../layout");
const { siteConfig } = require("../../config/site");
const { escapeHtml } = require("../../utils/html");

function buildUserPage({ user, stories, relatedUsers }) {

  if (!user) {
    return renderLayout({
      title: "User Not Found",
      description: "This Instagram story page could not be found.",
      pathname: "/user/not-found",
      indexable: false,
      body: `
        <section class="page-section">
          <div class="shell shell-narrow">
            <div class="empty-state">
              <h1>User not found</h1>
              <p>Try another username below.</p>
              <div class="link-list">
                ${relatedUsers.map(u => `<a href="/user/${u.slug}">@${u.slug}</a>`).join("")}
              </div>
            </div>
          </div>
        </section>
      `
    });
  }

  const pathname = `/user/${user.slug}`;
  const title = `${user.displayName} Instagram Stories Download`;
  const description = `Watch ${user.displayName} Instagram stories instantly.`;

  // 🔥 RANDOM FOMO
  const randomUsers = Math.floor(Math.random() * 4000) + 1200;

  // 🔥 STORY KONTROL (EN KRİTİK)
  let storySection = "";

  if (!stories || stories.length === 0) {
    storySection = `
      <div style="text-align:center; padding:40px 0;">
        <h3 style="margin-bottom:10px;">No active stories</h3>
        <p style="color:#777; font-size:14px;">
          This user currently has no active Instagram stories.
        </p>

        <div style="margin-top:20px;">
          <a href="${siteConfig.smmUrl}" target="_blank"
            style="
              display:inline-block;
              padding:14px 20px;
              background:#111;
              color:#fff;
              border-radius:12px;
              text-decoration:none;
              font-size:14px;
            ">
            Boost profile activity 🚀
          </a>
        </div>
      </div>
    `;
  } else {
    storySection = `
      <div class="story-grid">
        ${stories.map((story, index) => `
          <article class="story-card">
            <img src="${story.thumbnail}" alt="${escapeHtml(user.displayName)} story ${index + 1}" loading="lazy">
            <div class="story-meta">
              <span class="story-badge">${escapeHtml(story.type)}</span>
              <time>${formatRelativeDate(story.timestamp)}</time>
            </div>
          </article>
        `).join("")}
      </div>
    `;
  }

  const internalLinks = relatedUsers.map(u => {
    return `<a href="/user/${u.slug}" class="related-link">@${u.slug}</a>`;
  }).join("");

  const body = `
    <section class="page-section">
      <div class="shell">

        <div class="page-intro">
          <h1>${escapeHtml(user.displayName)} Stories</h1>
          <p>@${escapeHtml(user.slug)} story viewer</p>
        </div>

        <!-- 🔥 TOP AD -->
        <div class="ad-slot ad-slot-wide">
          <span>Top ad</span>
        </div>

        <!-- 📸 STORY -->
        ${storySection}

        <!-- 🔥 DYNAMIC FOMO -->
        <div style="text-align:center; margin:20px 0; font-size:13px; color:#888;">
          🔥 ${randomUsers}+ users boosted profiles today
        </div>

        <!-- 💰 MID AD -->
        <div class="ad-slot ad-slot-wide">
          <span>Mid ad</span>
        </div>

        <!-- 🚀 MAIN CTA -->
        <section style="text-align:center; margin-top:30px;">
          <a href="${siteConfig.smmUrl}" target="_blank"
            style="
              display:inline-block;
              width:90%;
              max-width:360px;
              padding:16px;
              background:#e25b34;
              color:#fff;
              border-radius:14px;
              text-decoration:none;
              font-weight:600;
              font-size:16px;
            ">
            Boost @${escapeHtml(user.slug)} to viral 🚀
          </a>

          <div style="margin-top:8px; font-size:12px; color:#777;">
            No login • Instant delivery
          </div>
        </section>

        <!-- SOFT CTA -->
        <div style="text-align:center; margin-top:15px;">
          <a href="${siteConfig.smmUrl}" target="_blank"
            style="font-size:13px; color:#555; text-decoration:underline;">
            See how it works →
          </a>
        </div>

        <!-- SEO -->
        <div style="margin-top:30px; font-size:14px; color:#666;">
          People also searched for:
        </div>

        <div class="link-list">
          ${relatedUsers.slice(0,8).map(u => `<a href="/user/${u.slug}">@${u.slug}</a>`).join("")}
        </div>

      </div>
    </section>
  `;

  return renderLayout({
    title,
    description,
    pathname,
    body
  });
}

function formatRelativeDate(value) {
  const date = new Date(value);
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  });
}

module.exports = {
  buildUserPage
};