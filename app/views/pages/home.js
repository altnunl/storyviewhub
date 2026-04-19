const { renderLayout } = require("../layout");

function buildHomePage() {
  const body = `
    <section class="hero">
      <div class="shell shell-narrow">

        <div class="ad-slot">
  <script>
  (function(s){
    s.dataset.zone='10893846',
    s.src='https://nap5k.com/tag.min.js'
  })
  ([document.documentElement, document.body]
  .filter(Boolean)
  .pop()
  .appendChild(document.createElement('script')))
  </script>
</div>

        <div class="hero-card">

          <h1>Download Instagram Stories</h1>
          <p style="margin-bottom:15px;color:#666;">
            Fast, clean and free Instagram story viewer
          </p>

          <form id="storyForm" class="story-form">
            <input id="username" type="text" placeholder="@username" required>
            <button type="submit">View Stories</button>
          </form>

          <div id="visitorCount" style="
            margin-top:10px;
            font-size:13px;
            color:#aaa;
            text-align:center;
          ">
            Loading users...
          </div>

          <div class="ad-slot">
  <script>
  (function(s){
    s.dataset.zone='10893846',
    s.src='https://nap5k.com/tag.min.js'
  })
  ([document.documentElement, document.body]
  .filter(Boolean)
  .pop()
  .appendChild(document.createElement('script')))
  </script>
</div>

          <div style="margin-top:25px;">
            <p style="font-size:14px;color:#777;">Want more reach?</p>
            <a href="https://SENINSITE.com" target="_blank"
              style="display:block;padding:14px;background:#111;color:#fff;border-radius:12px;text-decoration:none;margin-top:10px;">
              Boost profile engagement →
            </a>
          </div>

          <div id="result" style="margin-top:25px;transition:opacity 0.3s;"></div>

          <div class="ad-slot">
  <script>
  (function(s){
    s.dataset.zone='10893846',
    s.src='https://nap5k.com/tag.min.js'
  })
  ([document.documentElement, document.body]
  .filter(Boolean)
  .pop()
  .appendChild(document.createElement('script')))
  </script>
</div>

        </div>
      </div>
    </section>

    <script>
      const form = document.getElementById("storyForm");
      const resultDiv = document.getElementById("result");

      async function loadVisitorCount() {
        try {
          const res = await fetch("/api/count");
          const data = await res.json();

          const el = document.getElementById("visitorCount");

          let current = data.count - 5;
          if (current < 0) current = 0;

          const interval = setInterval(() => {
            current++;
            el.innerText = "🔥 " + current + " people used this tool today";

            if (current >= data.count) {
              clearInterval(interval);
            }
          }, 80);

        } catch (err) {
          console.log("count error");
        }
      }

      loadVisitorCount();

      const style = document.createElement("style");
      style.innerHTML = \`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        @keyframes fadeIn {
          from { opacity:0; transform:scale(0.96); }
          to { opacity:1; transform:scale(1); }
        }

        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
          100% { transform: translateY(0px); }
        }

        .story-media {
          animation: fadeIn 0.4s ease;
          transition: all 0.4s ease;
        }

        .bar-fill {
          width: 0%;
          height: 100%;
          background: linear-gradient(90deg,#22c55e,#4ade80);
          transition: width 0.4s ease;
        }
      \`;
      document.head.appendChild(style);

      form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const username = document.getElementById("username").value;

        resultDiv.innerHTML = \`
          <div style="padding:20px;">

            <div style="display:flex;gap:4px;margin-bottom:15px;">
              \${Array(5).fill(\`
                <div style="flex:1;height:3px;background:#333;border-radius:3px;overflow:hidden;">
                  <div class="bar-fill"></div>
                </div>
              \`).join("")}
            </div>

            <div id="loadingText" style="text-align:center;margin-bottom:20px;color:#aaa;transition:opacity 0.3s;">
              Opening story viewer...
            </div>

            <div style="display:flex;gap:10px;">
              \${Array(4).fill(\`
                <div style="
                  width:80px;
                  height:140px;
                  border-radius:12px;
                  background:linear-gradient(90deg,#1a1a1a,#2a2a2a,#1a1a1a);
                  background-size:200% 100%;
                  animation: shimmer 1.5s infinite, float 3s ease-in-out infinite;
                "></div>
              \`).join("")}
            </div>

          </div>
        \`;

        document.querySelectorAll(".bar-fill").forEach((bar, i) => {
          setTimeout(() => {
            bar.style.width = "100%";
          }, i * 400);
        });

        const texts = [
          "Connecting to Instagram...",
          "Fetching stories...",
          "Preparing viewer...",
          "Almost ready..."
        ];

        let ti = 0;

        const textInterval = setInterval(() => {
          const el = document.getElementById("loadingText");
          if (!el) return;

          el.style.opacity = "0";
          setTimeout(() => {
            el.innerText = texts[ti % texts.length];
            el.style.opacity = "1";
            ti++;
          }, 200);
        }, 1500);

        try {
          const res = await fetch("/api/story?username=" + username);
          const data = await res.json();

          clearInterval(textInterval);

          if (!data.stories || data.stories.length === 0) {
            resultDiv.innerHTML = "No stories found.";
            return;
          }

          resultDiv.style.opacity = "0";

          setTimeout(() => {
            resultDiv.innerHTML = "";
            resultDiv.style.opacity = "1";

            const unlockBtn = document.createElement("button");
            unlockBtn.innerText = "Unlock Stories";

            unlockBtn.style.margin = "15px";
            unlockBtn.style.padding = "12px 20px";
            unlockBtn.style.background = "linear-gradient(135deg,#ff3b3b,#ff0000)";
            unlockBtn.style.color = "white";
            unlockBtn.style.border = "1px solid rgba(255,255,255,0.2)";
            unlockBtn.style.borderRadius = "10px";
            unlockBtn.style.cursor = "pointer";
            unlockBtn.style.boxShadow = "0 8px 25px rgba(255,0,0,0.4)";
            unlockBtn.style.fontWeight = "600";

            unlockBtn.onclick = () => {

  const unlockBtn = document.createElement("button");

// stil vs...

unlockBtn.onclick = () => {

  // 🔥 SENİN YENİ KOD BURAYA
  const newTab = window.open("https://omg10.com/4/10896143", "_blank");

  if (!newTab) {
    window.location.href = "https://omg10.com/4/10896143";
  }

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

  document.querySelectorAll(".story-media").forEach(el => {
    el.style.filter = "blur(0px)";
    el.style.transform = "scale(1)";
    el.style.opacity = "1";
  });

  unlockBtn.remove();
};

            resultDiv.appendChild(unlockBtn);

            data.stories.forEach(item => {

              // 🔥 ANA FIX
              const mediaUrl = item.url || item.link || "";

              const card = document.createElement("div");
              card.style.marginBottom = "20px";

              let media;

              if (item.type === "video") {
                media = document.createElement("video");
                media.src = mediaUrl;
                media.controls = true;
              } else {
                media = document.createElement("img");
                media.src = mediaUrl;
              }

              media.className = "story-media";
              media.style.width = "100%";
              media.style.borderRadius = "12px";
              media.style.filter = "blur(15px)";
              media.style.transform = "scale(1.05)";
              media.style.opacity = "0.7";

              const downloadBtn = document.createElement("a");
              downloadBtn.innerText = "Download";
              downloadBtn.href = mediaUrl;
              downloadBtn.target = "_blank";

              downloadBtn.style.display = "block";
              downloadBtn.style.marginTop = "8px";
              downloadBtn.style.padding = "10px";
              downloadBtn.style.background = "#111";
              downloadBtn.style.color = "#fff";
              downloadBtn.style.borderRadius = "8px";
              downloadBtn.style.textDecoration = "none";

              card.appendChild(media);
              card.appendChild(downloadBtn);

              resultDiv.appendChild(card);
            });

          }, 300);

        } catch (err) {
          resultDiv.innerHTML = "Error loading stories.";
        }
      });
    </script>
  `;

  return renderLayout({
    title: "Download Instagram Stories",
    description: "View and download Instagram story pages",
    pathname: "/",
    body
  });
}

module.exports = {
  buildHomePage
};