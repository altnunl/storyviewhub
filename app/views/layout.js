const { buildMetaTags } = require("../utils/seo");
const { siteConfig } = require("../config/site");

function renderLayout({
  title,
  description,
  pathname,
  indexable = true,
  body,
  extraHead = "",
  extraBody = ""
}) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta name="monetag" content="b0e1f20a1296f16a3af2a1ec3f5e2941">
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <link rel="icon" href="/favicon.ico">
  <!-- 🔥 MONETAG POPUNDER SCRIPT (DOĞRU) -->
  <script>
  
  ([document.documentElement, document.body]
  .filter(Boolean)
  .pop()
  .appendChild(document.createElement('script')))
  </script>

  ${buildMetaTags({ title, description, pathname, indexable })}
  <link rel="preload" href="/static/styles.css" as="style">
  <link rel="stylesheet" href="/static/styles.css?v=2">

  <!-- 🔥 FIX: ANIMATION TRANSFORM ÇAKIŞMA -->
  <style>
    @keyframes pulseGlow {
      0% { transform: translateX(-50%) scale(1); }
      50% { transform: translateX(-50%) scale(1.05); }
      100% { transform: translateX(-50%) scale(1); }
    }
  </style>

  ${extraHead}
</head>

<body>

<div class="promo-bar" id="promoBar">
  <span>
    🔥 Get 10% OFF – Use code <strong>FOLLOWONNET10</strong>
  </span>
  <a href="${siteConfig.smmUrl}" target="_blank">Shop Now</a>
  <span class="promo-close" onclick="closePromo()">✕</span>
</div>

<header class="site-header">
  <div class="shell header-shell">
    <a class="brand" href="/">Story Saver</a>
  </div>
</header>

<main>
  ${body}
</main>

<a href="${siteConfig.smmUrl}" class="sticky-cta" id="stickyCta">
  Boost story views
</a>

<footer class="site-footer">
  <div class="shell footer-shell">
    <p>Fast SSR pages built for search traffic and social growth funnels.</p>
  </div>
</footer>

${extraBody}

<script>
  let hasScrolledEnough = false;
  let hasWaitedEnough = false;
  let shown = false;
  let exitTriggered = false;

  function updateStickyText() {
    const sticky = document.getElementById("stickyCta");

    if (!sticky) return;

    if (window.location.pathname.includes("/user/")) {
      sticky.textContent = "Boost this profile 🚀";
    } else {
      sticky.textContent = "Boost story views";
    }
  }

  function tryShowElements() {
    if (shown) return;

    if (hasScrolledEnough && hasWaitedEnough) {
      shown = true;

      const sticky = document.querySelector('.sticky-cta');
      const promo = document.querySelector('#promoBar');

      if (promo) {
        promo.style.display = 'flex';
      }

      if (sticky) {
        setTimeout(() => {
          sticky.style.display = 'flex';

          setTimeout(() => {
            sticky.classList.add("show");
          }, 50);

        }, 2000);
      }
    }
  }

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const height = document.body.scrollHeight - window.innerHeight;

    if (height > 0 && scrollY / height > 0.4) {
      hasScrolledEnough = true;
      tryShowElements();
    }
  });

  setTimeout(() => {
    hasWaitedEnough = true;
    tryShowElements();
  }, 3000);

  document.addEventListener("mouseleave", function(e) {
    if (e.clientY < 10 && !exitTriggered) {
      exitTriggered = true;

      const promo = document.getElementById("promoBar");

      if (promo) {
        promo.style.display = "flex";
        promo.innerHTML = \`
          ⚠️ Wait! Get 15% OFF – <strong>LAST CHANCE</strong>
          <a href="${siteConfig.smmUrl}" target="_blank">Claim Now</a>
        \`;
      }
    }
  });

  function closePromo() {
    const promo = document.getElementById('promoBar');
    if (promo) promo.style.display = 'none';
  }

  updateStickyText();
</script>

</body>
</html>`;
}

module.exports = {
  renderLayout
};