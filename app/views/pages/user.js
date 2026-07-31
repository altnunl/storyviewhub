const { renderLayout } = require("../layout");
const { siteConfig } = require("../../config/site");
const {
  escapeAttribute,
  escapeHtml,
  safeHttpUrl,
  safeJsonForScript
} = require("../../utils/html");

function generateUniqueText(username) {
  const name = username.charAt(0).toUpperCase() + username.slice(1);

  const variations = [
    `${name} currently has no active Instagram stories. We check frequently and update this page as soon as new stories are available.`,
    `There are no active stories from ${name} right now. Our system automatically monitors updates and will display them here instantly.`,
    `${name} has not shared any stories at the moment. Please check back later as we continuously update story data.`,
    `No stories available for ${name}. We are actively checking Instagram for new uploads and will update this page shortly.`,
    `At the moment, ${name} does not have any active Instagram stories. New content will appear here automatically once available.`
  ];

  return variations[Math.floor(Math.random() * variations.length)];
}

function buildProfileNotFoundPage({ pathname = "/user/not-found", relatedUsers = [] } = {}) {
  const relatedLinks = relatedUsers
    .map((user) => {
      const href = `/user/${encodeURIComponent(user.slug)}`;
      return `<a href="${escapeAttribute(href)}">@${escapeHtml(user.slug)}</a>`;
    })
    .join("");

  return renderLayout({
    title: "Profile Not Found",
    description: "This Instagram profile page could not be found.",
    pathname,
    indexable: false,
    includeCanonical: false,
    includeSchema: false,
    body: `
      <section class="page-section">
        <div class="shell shell-narrow">
          <div class="empty-state">
            <h1>Profile not found</h1>
            <p>We could not find a verified public profile for this username.</p>
            <a class="cta-button" href="/">Back to Story Saver</a>
            ${relatedLinks ? `<div class="link-list" style="margin-top:20px;">${relatedLinks}</div>` : ""}
          </div>
        </div>
      </section>
    `
  });
}

function buildUserPage({ user, stories = [], relatedUsers = [] }) {
  if (!user) {
    return buildProfileNotFoundPage({ relatedUsers });
  }

  const pathname = `/user/${encodeURIComponent(user.slug)}`;
  const title = `${user.displayName} Instagram Stories Download`;
  const description = `Watch ${user.displayName} Instagram stories instantly.`;
  const safeDisplayName = escapeHtml(user.displayName);
  const safeDisplayNameAttribute = escapeAttribute(user.displayName);
  const safeSlug = escapeHtml(user.slug);

  const dynamicText = generateUniqueText(user.slug);
  const dynamicTextHtml = escapeHtml(dynamicText);
  const dynamicTextJson = safeJsonForScript(dynamicText);
  const randomUsers = Math.floor(Math.random() * 4000) + 1200;

  let storySection = "";

  if (!stories || stories.length === 0) {
    storySection = `
      <div style="text-align:center; padding:40px 0;">
        <h3 style="margin-bottom:10px;">No active stories</h3>

        <p style="color:#777; font-size:14px; max-width:500px; margin:0 auto;">
          ${dynamicTextHtml}
        </p>

        <p style="margin-top:10px; font-size:13px; color:#aaa;">
          Last checked a few moments ago
        </p>

        <div style="margin-top:20px;">
          <a href="${escapeAttribute(siteConfig.smmUrl)}" target="_blank"
            style="
              display:inline-block;
              padding:14px 20px;
              background:#111;
              color:#fff;
              border-radius:12px;
              text-decoration:none;
              font-size:14px;
            ">
            Boost profile activity
          </a>
        </div>
      </div>
    `;
  } else {
    storySection = `
      <div style="text-align:center; margin-bottom:20px;">
        <button id="unlockBtn"
          style="
            padding:12px 20px;
            background:#e25b34;
            color:#fff;
            border:none;
            border-radius:10px;
            cursor:pointer;
            font-weight:600;
          ">
          Unlock Stories
        </button>
      </div>

      <div class="story-grid">
        ${stories.map((story, index) => {
          const thumbnailUrl = safeHttpUrl(story.thumbnail);
          const storyUrl = safeHttpUrl(story.url);

          return `
          <article class="story-card">

            <div style="position:relative;">
              ${thumbnailUrl ? `
                <img
                  src="${escapeAttribute(thumbnailUrl)}"
                  class="story-media"
                  style="filter:blur(20px); width:100%; border-radius:12px;"
                  alt="${safeDisplayNameAttribute} story ${index + 1}"
                  loading="lazy"
                />
              ` : ""}
            </div>

            <div class="story-meta">
              <span class="story-badge">${escapeHtml(story.type)}</span>
              <time>${formatRelativeDate(story.timestamp)}</time>
            </div>

            <div style="text-align:center; margin-top:10px;">
              ${storyUrl ? `<a href="${escapeAttribute(storyUrl)}" target="_blank"
                style="
                  display:inline-block;
                  padding:10px 14px;
                  background:#111;
                  color:#fff;
                  border-radius:8px;
                  text-decoration:none;
                  font-size:13px;
                ">
                Download
              </a>` : ""}
            </div>

          </article>
        `;
        }).join("")}
      </div>
    `;
  }

  const body = `
    <section class="page-section">
      <div class="shell">

        <div class="page-intro">
          <h1>${safeDisplayName} Stories</h1>
          <p>@${safeSlug} story viewer</p>

          <p style="margin-top:10px; color:#666; font-size:14px; max-width:500px;">
            Watch ${safeDisplayName} Instagram stories anonymously.
            No login required. Fast and updated regularly.
          </p>

          <div style="margin-top:20px;">
            <div style="display:flex; justify-content:center; gap:10px; flex-wrap:wrap;">

              <input
                id="usernameInput"
                type="text"
                placeholder="Enter another username..."
                style="
                  padding:12px 14px;
                  border-radius:10px;
                  border:1px solid #ddd;
                  min-width:220px;
                  font-size:14px;
                "
                onkeypress="if(event.key==='Enter'){goToUser()}"
              />

              <button onclick="goToUser()"
                style="
                  padding:12px 16px;
                  border:none;
                  background:#e25b34;
                  color:#fff;
                  border-radius:10px;
                  font-weight:600;
                  cursor:pointer;
                ">
                View Stories
              </button>

            </div>

            <div style="margin-top:8px; font-size:12px; color:#888;">
              Try: cristiano, messi, nike
            </div>
          </div>

        </div>

        <div id="storyContainer">
          ${storySection}
        </div>

        <div style="text-align:center; margin:20px 0; font-size:13px; color:#888;">
          ${randomUsers}+ users boosted profiles today
        </div>

        <section style="text-align:center; margin-top:30px;">
          <a href="${escapeAttribute(siteConfig.smmUrl)}" target="_blank"
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
            Boost @${safeSlug} to viral
          </a>

          <div style="margin-top:8px; font-size:12px; color:#777;">
            No login - Instant delivery
          </div>
        </section>

        <div style="text-align:center; margin-top:15px;">
          <a href="${escapeAttribute(siteConfig.smmUrl)}" target="_blank"
            style="font-size:13px; color:#555; text-decoration:underline;">
            See how it works
          </a>
        </div>

      </div>
    </section>

<script>
const emptyStoryText = ${dynamicTextJson};
const usernamePattern = /^[a-z0-9._]{1,30}$/;

function normalizeUsernameInput(value) {
  const username = String(value || "").trim().replace(/^@+/, "").toLowerCase();
  return usernamePattern.test(username) ? username : "";
}

function safeMediaUrl(value) {
  try {
    const url = new URL(String(value || ""));
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return "";
    }
    return url.href;
  } catch {
    return "";
  }
}

function renderContainerMessage(message) {
  const container = document.getElementById("storyContainer");
  if (!container) return;

  container.innerHTML = "";

  const wrapper = document.createElement("div");
  wrapper.style.padding = "40px";
  wrapper.style.textAlign = "center";
  wrapper.textContent = message;
  container.appendChild(wrapper);
}

function attachUnlockHandler() {
  const unlockBtn = document.getElementById("unlockBtn");
  if (!unlockBtn) return;

  unlockBtn.onclick = () => {
    document.querySelectorAll(".story-media")
      .forEach(el => {
        el.style.filter = "blur(0)";
        el.style.transform = "scale(1)";
        el.style.opacity = "1";
      });
  };
}

async function loadStories(username) {
  const normalizedUsername = normalizeUsernameInput(username);
  const container = document.getElementById("storyContainer");
  if (!container) return;

  if (!normalizedUsername) {
    renderContainerMessage("Please enter a valid Instagram username.");
    return;
  }

  container.innerHTML = '<div style="padding:40px;text-align:center;"><div style="width:40px;height:40px;border:4px solid #eee;border-top:4px solid #e25b34;border-radius:50%;animation:spin 1s linear infinite;margin:auto;"></div><p style="margin-top:10px;">Loading stories...</p></div>';

  try {
    const res = await fetch("/api/story?username=" + encodeURIComponent(normalizedUsername));
    const data = await res.json();

    if (!data.stories || data.stories.length === 0) {
      renderContainerMessage(emptyStoryText);
      return;
    }

    container.innerHTML = "";

    const buttonWrap = document.createElement("div");
    buttonWrap.style.textAlign = "center";
    buttonWrap.style.marginBottom = "20px";

    const unlockBtn = document.createElement("button");
    unlockBtn.id = "unlockBtn";
    unlockBtn.textContent = "Unlock Stories";
    buttonWrap.appendChild(unlockBtn);

    const grid = document.createElement("div");
    grid.className = "story-grid";

    let renderedStories = 0;

    data.stories.forEach(story => {
      const mediaUrl = safeMediaUrl(story && (story.url || story.link || ""));
      const thumbnailUrl = safeMediaUrl(story && story.thumbnail) || mediaUrl;

      if (!mediaUrl && !thumbnailUrl) {
        return;
      }

      const card = document.createElement("article");
      card.className = "story-card";

      if (thumbnailUrl) {
        const image = document.createElement("img");
        image.src = thumbnailUrl;
        image.className = "story-media";
        image.style.filter = "blur(20px)";
        card.appendChild(image);
      }

      if (mediaUrl) {
        const download = document.createElement("a");
        download.href = mediaUrl;
        download.target = "_blank";
        download.textContent = "Download";
        card.appendChild(download);
      }

      grid.appendChild(card);
      renderedStories++;
    });

    if (!renderedStories) {
      renderContainerMessage("No stories found.");
      return;
    }

    container.appendChild(buttonWrap);
    container.appendChild(grid);
    attachUnlockHandler();

  } catch {
    renderContainerMessage("Error loading stories.");
  }
}

function goToUser() {
  const input = document.getElementById("usernameInput");
  const username = normalizeUsernameInput(input ? input.value : "");

  if (!username) {
    renderContainerMessage("Please enter a valid Instagram username.");
    return;
  }

  loadStories(username);
}

</script>
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
  buildProfileNotFoundPage,
  buildUserPage
};
