const { buildMetaTags } = require("../utils/seo");
const { monetagConfig } = require("../config/monetag");
const { platformPages } = require("../services/seoPageService");
const { escapeAttribute, safeJsonForScript } = require("../utils/html");

function renderHeaderBrand(pathname) {
  if (pathname === "/") {
    return `<span class="brand" aria-current="page">Story Saver</span>`;
  }

  return `<a class="brand" href="/">Story Saver</a>`;
}

function renderFooterPlatformLinks(pathname) {
  const links = platformPages
    .map((page) => {
      if (page.path === pathname) {
        return `<span class="footer-platform-current" aria-current="page">${page.name}</span>`;
      }

      return `<a href="${page.path}">${page.name}</a>`;
    })
    .join("");

  return `<nav class="footer-platform-links" aria-label="Platform tools">${links}</nav>`;
}

function renderMonetagScripts() {
  const directLink = safeJsonForScript(monetagConfig.directLink);
  const vignetteZone = safeJsonForScript(monetagConfig.vignetteZone);
  const popunderZone = safeJsonForScript(monetagConfig.popunderZone);

  return `
<!-- Monetag Vignette -->
<script id="svh-monetag-vignette">
(function(){
  if (window.__svhMonetagVignetteLoaded) return;
  window.__svhMonetagVignetteLoaded = true;
  var s = document.createElement('script');
  s.src = 'https://n6wxm.com/vignette.min.js';
  s.dataset.zone = ${vignetteZone};
  document.body.appendChild(s);
})();
</script>

<!-- Monetag Popunder -->
<script id="svh-monetag-popunder">
(function(){
  if (window.__svhMonetagPopunderLoaded) return;
  window.__svhMonetagPopunderLoaded = true;
  var s = document.createElement('script');
  s.src = 'https://al5sm.com/tag.min.js';
  s.dataset.zone = ${popunderZone};
  document.body.appendChild(s);
})();
</script>

<!-- Monetag Direct Link for marked, valid form submits only -->
<script id="svh-monetag-direct-link-handler">
(function(){
  if (window.__svhMonetagDirectLinkHandlerLoaded) return;
  window.__svhMonetagDirectLinkHandlerLoaded = true;

  var directLink = ${directLink};
  var usernamePattern = /^[a-z0-9._]{1,30}$/;

  function passesCustomValidation(form) {
    if (form.getAttribute('data-monetag-validate') !== 'instagram-username') {
      return true;
    }

    var input = form.querySelector('input[name="username"]');
    var username = String(input && input.value || '').trim().replace(/^@+/, '').toLowerCase();
    return usernamePattern.test(username);
  }

  document.addEventListener('submit', function(event) {
    var form = event.target;

    if (!form || form.nodeName !== 'FORM') return;
    if (form.getAttribute('data-monetag-direct-link') !== 'true') return;
    if (event.defaultPrevented) return;
    if (typeof form.checkValidity === 'function' && !form.checkValidity()) return;
    if (!passesCustomValidation(form)) return;

    try {
      var opened = window.open(directLink, '_blank', 'noopener,noreferrer');
      if (opened) {
        try {
          opened.opener = null;
        } catch (err) {}
      }
    } catch (err) {}
  });
})();
</script>`;
}

function renderLayout({
  title,
  description,
  pathname,
  indexable = true,
  canonicalPathname = pathname,
  includeCanonical = true,
  includeSchema = true,
  robotsContent,
  body,
  extraHead = "",
  extraBody = ""
}) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta name="monetag" content="${escapeAttribute(monetagConfig.verification)}">
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <link rel="icon" href="/static/favicon.ico" sizes="any">
  <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png">
  <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png">
  <link rel="apple-touch-icon" href="/static/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="192x192" href="/static/android-chrome-192x192.png">
  <link rel="icon" type="image/png" sizes="512x512" href="/static/android-chrome-512x512.png">

  ${buildMetaTags({ title, description, pathname, indexable, canonicalPathname, includeCanonical, includeSchema, robotsContent })}
  <link rel="preload" href="/static/styles.css" as="style">
  <link rel="stylesheet" href="/static/styles.css?v=5">

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

<header class="site-header">
  <div class="shell header-shell">
    ${renderHeaderBrand(pathname)}
  </div>
</header>

<main>
  ${body}
</main>

<footer class="site-footer">
  <div class="shell footer-shell">
    <p>Fast SSR pages built for search traffic and social growth funnels.</p>
    ${renderFooterPlatformLinks(pathname)}
  </div>
</footer>

${extraBody}

<!-- Monetag integration -->
${renderMonetagScripts()}

</body>
</html>`;
}

module.exports = {
  renderLayout
};
