const { renderLayout } = require("../layout");

function buildHomePage() {
  const body = `
    <section class="hero">
      <div class="shell shell-narrow">

        <!-- 🔥 TOP BANNER ADS -->
        <div class="ad-slot" style="margin-bottom:20px;" aria-label="Advertisement">
          <span>Top banner ad</span>
        </div>

        <div class="hero-card">

          <h1>Download Instagram Stories</h1>
          <p style="margin-bottom:15px;color:#666;">
            Fast, clean and free Instagram story viewer
          </p>

          <form class="story-form" action="/result" method="get">
            <label class="sr-only" for="username">Instagram username</label>
            <input 
              id="username" 
              name="username" 
              type="text" 
              placeholder="@username" 
              inputmode="text" 
              autocapitalize="off" 
              autocomplete="off" 
              required
            >
            <button type="submit">View Stories</button>
          </form>

          <!-- 💰 MAIN MONEY ADS -->
          <div class="ad-slot" style="margin-top:20px;" aria-label="Advertisement">
            <span>Main ad (high CTR)</span>
          </div>

          <div style="margin-top:25px;">
            <p style="font-size:14px;color:#777;">Want more reach?</p>
            <a href="https://SENINSITE.com" target="_blank" 
               style="
                 display:block;
                 padding:14px;
                 background:#111;
                 color:#fff;
                 border-radius:12px;
                 text-decoration:none;
                 margin-top:10px;
               ">
              Boost profile engagement →
            </a>
          </div>

          <!-- 🔥 BOTTOM ADS -->
          <div class="ad-slot" style="margin-top:25px;" aria-label="Advertisement">
            <span>Bottom ad</span>
          </div>

        </div>
      </div>
    </section>
  `;

  return renderLayout({
    title: "Download Instagram Stories",
    description: "View and download Instagram story pages with a fast, minimal SSR experience.",
    pathname: "/",
    body
  });
}

module.exports = {
  buildHomePage
};