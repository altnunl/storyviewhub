const { renderLayout } = require("../layout");
const { siteConfig } = require("../../config/site");
const { escapeHtml } = require("../../utils/html");

// UNIQUE TEXT
function generateUniqueText(username) {
  const name = username.charAt(0).toUpperCase() + username.slice(1);

  const variations = [
    `${name} currently has no active Instagram stories.`,
    `No active stories from ${name} right now.`,
    `${name} has not shared any stories.`,
    `No stories available for ${name}.`,
    `${name} currently has no active content.`
  ];

  return variations[Math.floor(Math.random() * variations.length)];
}

function buildUserPage({ user, relatedUsers }) {

  if (!user) {
    return renderLayout({
      title: "User Not Found",
      description: "This Instagram story page could not be found.",
      pathname: "/user/not-found",
      indexable: false,
      body: `<h1>User not found</h1>`
    });
  }

  const pathname = `/user/${user.slug}`;
  const dynamicText = generateUniqueText(user.slug);

  const body = `
    <section class="page-section">
      <div class="shell">

        <div class="page-intro">
          <h1>${escapeHtml(user.displayName)} Stories</h1>
          <p>@${escapeHtml(user.slug)} story viewer</p>

          <p style="margin-top:10px; color:#666;">
            Watch stories anonymously
          </p>

          <!-- SEARCH -->
          <div style="margin-top:20px;">
            <input id="usernameInput" placeholder="Enter username..." />
            <button onclick="goToUser()">View Stories</button>
          </div>
        </div>

        <div id="result" style="margin-top:30px;"></div>

      </div>
    </section>

<script>

function goToUser() {
  let val = document.getElementById("usernameInput").value;
  val = val.replace(/^@+/, "").toLowerCase();
  window.location.href = "/user/" + val;
}

async function loadStories() {
  const username = "${user.slug}";
  const resultDiv = document.getElementById("result");

  // LOADING UI
  resultDiv.innerHTML = \`
    <div style="padding:20px;">
      <div style="display:flex;gap:4px;margin-bottom:15px;">
        \${Array(5).fill('<div style="flex:1;height:3px;background:#333;"><div class="bar-fill"></div></div>').join("")}
      </div>
      <div id="loadingText">Loading stories...</div>
    </div>
  \`;

  document.querySelectorAll(".bar-fill").forEach((bar, i) => {
    setTimeout(() => {
      bar.style.width = "100%";
    }, i * 400);
  });

  try {
    const res = await fetch("/api/story?username=" + username);
    const data = await res.json();

    if (!data.stories || data.stories.length === 0) {
      resultDiv.innerHTML = "${dynamicText}";
      return;
    }

    resultDiv.innerHTML = "";

    const unlockBtn = document.createElement("button");
    unlockBtn.innerText = "Unlock Stories";

    unlockBtn.onclick = () => {
      document.querySelectorAll(".story-media").forEach(el => {
        el.style.filter = "blur(0)";
      });
      unlockBtn.remove();
    };

    resultDiv.appendChild(unlockBtn);

    data.stories.forEach(item => {

      const url = item.url || item.link;

      let media;

      if (item.type === "video") {
        media = document.createElement("video");
        media.src = url;
        media.controls = true;
      } else {
        media = document.createElement("img");
        media.src = url;
      }

      media.className = "story-media";
      media.style.filter = "blur(15px)";

      const card = document.createElement("div");
      card.appendChild(media);

      const download = document.createElement("a");
      download.innerText = "Download";
      download.href = url;

      card.appendChild(download);

      resultDiv.appendChild(card);

    });

  } catch {
    resultDiv.innerHTML = "Error loading stories.";
  }
}

loadStories();

</script>
  `;

  return renderLayout({
    title: user.displayName + " Stories",
    description: "Watch stories",
    pathname,
    body
  });
}

module.exports = {
  buildUserPage
};