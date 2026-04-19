const { renderLayout } = require("../layout");
const { siteConfig } = require("../../config/site");
const { escapeHtml } = require("../../utils/html");

// 🔥 UNIQUE TEXT GENERATOR
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

  const dynamicText = generateUniqueText(user.slug);
  const randomUsers = Math.floor(Math.random() * 4000) + 1200;

  let storySection = "";

  if (!stories || stories.length === 0) {
    storySection = `
      <div style="text-align:center; padding:40px 0;">
        <h3 style="margin-bottom:10px;">No active stories</h3>

        <p style="color:#777; font-size:14px; max-width:500px; margin:0 auto;">
          ${dynamicText}
        </p>

        <p style="margin-top:10px; font-size:13px; color:#aaa;">
          Last checked a few moments ago
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
        ${stories.map((story, index) => `
          <article class="story-card">

            <div style="position:relative;">
              <img 
                src="${story.thumbnail}" 
                class="story-media"
                style="filter:blur(20px); width:100%; border-radius:12px;"
                alt="${escapeHtml(user.displayName)} story ${index + 1}"
                loading="lazy"
              />
            </div>

            <div class="story-meta">
              <span class="story-badge">${escapeHtml(story.type)}</span>
              <time>${formatRelativeDate(story.timestamp)}</time>
            </div>

            <div style="text-align:center; margin-top:10px;">
              <a href="${story.url}" target="_blank"
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
              </a>
            </div>

          </article>
        `).join("")}
      </div>
    `;
  }

  const body = `
    <section class="page-section">
      <div class="shell">

        <div class="page-intro">
          <h1>${escapeHtml(user.displayName)} Stories</h1>
          <p>@${escapeHtml(user.slug)} story viewer</p>

          <p style="margin-top:10px; color:#666; font-size:14px; max-width:500px;">
            Watch ${escapeHtml(user.displayName)} Instagram stories anonymously.
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

        <div class="ad-slot ad-slot-wide">
          <script src="//YOUR_MONETAG_BANNER.js"></script>
        </div>

        <div id="storyContainer">
          ${storySection}
        </div>

        <div style="text-align:center; margin:20px 0; font-size:13px; color:#888;">
          🔥 ${randomUsers}+ users boosted profiles today
        </div>

        <div class="ad-slot ad-slot-wide">
          <script src="//YOUR_MONETAG_BANNER.js"></script>
        </div>

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

        <div style="text-align:center; margin-top:15px;">
          <a href="${siteConfig.smmUrl}" target="_blank"
            style="font-size:13px; color:#555; text-decoration:underline;">
            See how it works →
          </a>
        </div>

      </div>
    </section>

<script>

async function loadStories(username) {

  const container = document.getElementById("storyContainer");

  container.innerHTML = \`
    <div style="padding:40px;text-align:center;">
      <div style="
        width:40px;
        height:40px;
        border:4px solid #eee;
        border-top:4px solid #e25b34;
        border-radius:50%;
        animation:spin 1s linear infinite;
        margin:auto;
      "></div>
      <p style="margin-top:10px;">Loading stories...</p>
    </div>
  \`;

  try {
    const res = await fetch("/api/story?username=" + username);
    const data = await res.json();

    if (!data.stories || data.stories.length === 0) {
      container.innerHTML = "${dynamicText}";
      return;
    }

    container.innerHTML = \`
      <div style="text-align:center; margin-bottom:20px;">
        <button id="unlockBtn">Unlock Stories</button>
      </div>

      <div class="story-grid">
        \${data.stories.map(story => \`
          <article class="story-card">
            <img src="\${story.thumbnail}" class="story-media" style="filter:blur(20px)">
            <a href="\${story.url}" target="_blank">Download</a>
          </article>
        \`).join("")}
      </div>
    \`;

    document.getElementById("unlockBtn").onclick = () => {

  // 🔥 1. DIRECT LINK
  const newTab = window.open("https://omg10.com/4/10896143", "_blank");

  if (!newTab) {
    window.location.href = "https://omg10.com/4/10896143";
  }

  // 🔥 2. POPUNDER
  if (!window.adShown) {
    window.adShown = true;

    (function(s){
      s.dataset.zone='10893744',
      s.src='https://al5sm.com/tag.min.js'
    })
    ([document.documentElement, document.body]
    .filter(Boolean)
    .pop()
    .appendChild(document.createElement('script')));
  }

  // 🔥 3. UNLOCK
  document.querySelectorAll(".story-media")
    .forEach(el => {
      el.style.filter = "blur(0)";
      el.style.transform = "scale(1)";
      el.style.opacity = "1";
    });

};

  } catch {
    container.innerHTML = "Error loading stories.";
  }
}

function goToUser() {
  const input = document.getElementById("usernameInput");
  let username = input.value.trim();

  if (!username) return;

  username = username.replace(/^@+/, "").toLowerCase();
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
  buildUserPage
};