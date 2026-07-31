const { renderLayout } = require("../layout");

const faqItems = [
  {
    question: "Can someone see if I view their Instagram story?",
    answer: "If you open a story inside Instagram while logged in, Instagram can include your account in that story's viewer information. This tool is built to view public story results without signing in through the page."
  },
  {
    question: "How can I view someone's Instagram story anonymously?",
    answer: "Enter the public username in the search box, wait for available stories to load, then use the viewer on this page instead of opening the story from your own Instagram profile."
  },
  {
    question: "Does Instagram show how many times I viewed a story?",
    answer: "The viewer and count information shown inside Instagram is controlled by Instagram. This site does not show a replay counter or send a logged-in view from your account while you use it."
  },
  {
    question: "Can someone see if I screenshot their Instagram story?",
    answer: "This website does not take screenshots or report screenshot activity. Instagram controls any notifications inside its own app, especially for private message features, so treat screenshots carefully."
  },
  {
    question: "Do I need an Instagram account to use the story viewer?",
    answer: "No. The page does not ask you to log in. It only works with public story data that can be returned for the username you search."
  },
  {
    question: "Can I view stories from private Instagram accounts?",
    answer: "No. This tool is intended for publicly available Instagram stories. It cannot unlock private accounts or bypass Instagram privacy settings."
  },
  {
    question: "Can I download Instagram stories?",
    answer: "If public story media is available, the results include a Download link that opens the media in a new tab."
  }
];

function buildFaqJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };

  return JSON.stringify(schema).replace(/</g, "\\u003c");
}

function buildHomePage() {
  const faqMarkup = faqItems
    .map((item) => `
        <article class="home-seo-faq-item">
          <h3>${item.question}</h3>
          <p>${item.answer}</p>
        </article>
      `)
    .join("");

  const body = `
<section class="hero">
  <div class="shell shell-narrow">

    <div class="hero-card">

      <h1>Download Instagram Stories</h1>
      <p style="margin-bottom:15px;color:#666;">
        Fast, clean and free Instagram story viewer
      </p>

      <form id="storyForm" class="story-form" action="/result" method="GET" data-monetag-direct-link="true" data-monetag-validate="instagram-username" aria-describedby="homeAdDisclosure">
        <input id="username" name="username" type="text" placeholder="@username" required>
        <button type="submit">View Stories</button>
      </form>
      <p class="ad-disclosure" id="homeAdDisclosure">An advertising tab may open to support this free service.</p>

      <div id="visitorCount" style="
        margin-top:10px;
        font-size:13px;
        color:#4b5563;
        text-align:center;
      ">
        Loading users...
      </div>

      <div id="result" style="margin-top:25px;transition:opacity 0.3s;"></div>

    </div>

  </div>
</section>


    <script>
      const form = document.getElementById("storyForm");
      const resultDiv = document.getElementById("result");
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

      async function loadVisitorCount() {
        try {
          const res = await fetch("/api/count");
          const data = await res.json();

          const el = document.getElementById("visitorCount");

          let current = data.count - 5;
          if (current < 0) current = 0;

          const interval = setInterval(() => {
            current++;
            el.innerText = current + " people used this tool today";

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

      form.addEventListener("submit", (e) => {
        const input = document.getElementById("username");
        const username = normalizeUsernameInput(input.value);

        if (!username) {
          e.preventDefault();
          resultDiv.textContent = "Please enter a valid Instagram username.";
          return;
        }

        input.value = username;
      });
    </script>

<section class="home-seo-section" aria-labelledby="homeSeoTitle">
  <div class="shell">
    <div class="home-seo-panel">
      <div class="home-seo-intro">
        <span class="home-seo-kicker">Instagram Story Viewer</span>
        <h2 id="homeSeoTitle">Anonymous Instagram Story Viewer</h2>
        <p>
          Story Saver is an Online Instagram Story Viewer for checking public Instagram stories from a clean browser page.
          It works as a Story Viewer, Anonymous Story Viewer, and IG Story Viewer for people who want to preview available public story media without opening Instagram from their own account.
          The flow is Fast, Secure, Free, and built with No Login Required.
        </p>
      </div>

      <div class="home-seo-grid">
        <article class="home-seo-card">
          <h2>View Instagram Stories Anonymously</h2>
          <p>
            When you want to view someone's public Instagram story without sending a logged-in view from your profile, this page keeps the search flow separate from an Instagram login.
            Enter a public username, wait for the story results, and review what can be shown from mobile or desktop.
            It is designed for quick checks, not private-account access.
          </p>
        </article>

        <article class="home-seo-card">
          <h2>Instagram Story Downloader</h2>
          <p>
            When public story media is available, Story Saver can also work as a Story Downloader for opening photos or videos in a new tab.
            The download option makes the tool useful as an Instagram Story Downloader for public content you are allowed to access, while keeping the viewer simple and lightweight.
          </p>
        </article>
      </div>

      <section class="home-seo-steps" aria-labelledby="homeSeoStepsTitle">
        <div class="home-seo-wide">
          <h2 id="homeSeoStepsTitle">How to Use the Instagram Story Viewer</h2>
        </div>

        <article class="home-seo-step">
          <span class="home-seo-step-number">1</span>
          <h3>Enter a username</h3>
          <p>Type a public Instagram username into the search field. You can start with or without the @ symbol.</p>
        </article>

        <article class="home-seo-step">
          <span class="home-seo-step-number">2</span>
          <h3>Wait for story results</h3>
          <p>The page checks for available public stories and prepares the viewer when media can be returned.</p>
        </article>

        <article class="home-seo-step">
          <span class="home-seo-step-number">3</span>
          <h3>View or download</h3>
          <p>Use the story view results on the page, then open the download link when a public photo or video is available.</p>
        </article>
      </section>

      <section class="home-seo-privacy" aria-labelledby="homeSeoPrivacyTitle">
        <h2 id="homeSeoPrivacyTitle">View Public Instagram Stories Without Logging In</h2>
        <p>
          Story Saver is designed for anonymous Instagram story view sessions on public content.
          The page does not ask for your Instagram password, and it does not claim to show private accounts, bypass privacy controls, or reveal hidden viewer data.
          If you are researching how to view an Instagram profile anonymously, use the tool only for public usernames, respect creator settings, and download media only when you have a legitimate reason to keep it.
        </p>
      </section>

      <section class="home-seo-grid" aria-labelledby="homeSeoInternationalTitle">
        <div class="home-seo-wide">
          <h2 id="homeSeoInternationalTitle">International Story Viewer Support</h2>
        </div>

        <article class="home-seo-card">
          <h3>Deutsch</h3>
          <p>
            Für öffentliche Profile bietet StoryViewHub einen klaren Instagram Story Viewer, der direkt im Browser funktioniert.
            Wer eine Story anonym ansehen möchte, kann den Nutzernamen eingeben und verfügbare Inhalte prüfen, ohne sich hier bei Instagram anzumelden.
            Story Saver Insta hilft außerdem, öffentlich verfügbare Fotos oder Videos schneller zu öffnen.
            Wenn Medien bereitstehen, kann der Story Downloader sie in einem neuen Tab anzeigen, damit du sie bequem speichern kannst.
          </p>
        </article>

        <article class="home-seo-card">
          <h3>Español</h3>
          <p>
            Para Ver historias de Instagram desde una página limpia, StoryViewHub ofrece un Story Viewer pensado para perfiles públicos.
            Solo escribe el nombre de usuario y revisa las stories disponibles sin iniciar sesión en esta página.
            Story Saver resulta útil cuando quieres guardar una foto o un video público para consultarlo después.
            Si el contenido está disponible, puedes Descargar Stories abriendo el enlace de descarga en una nueva pestaña.
          </p>
        </article>

        <article class="home-seo-card">
          <h3>Italiano</h3>
          <p>
            Il Visualizzatore Storie Instagram di StoryViewHub aiuta a controllare le storie pubbliche con un flusso semplice e veloce.
            Inserisci il nome utente, attendi i risultati e guarda i contenuti disponibili senza effettuare il login su questa pagina.
            Story Saver è pratico anche quando vuoi aprire foto o video pubblici in modo ordinato.
            Quando il media è disponibile, puoi Scaricare Stories tramite il link dedicato.
          </p>
        </article>

        <article class="home-seo-card">
          <h3>Français</h3>
          <p>
            StoryViewHub propose une Visionneuse Story Instagram simple pour consulter les stories publiques depuis le navigateur.
            Saisis un nom d'utilisateur public, attends les résultats, puis ouvre les contenus disponibles sans connexion Instagram sur cette page.
            Story Saver peut aussi servir à conserver un accès rapide aux médias publics.
            Quand une photo ou une vidéo est disponible, l'option Télécharger Story l'ouvre dans un nouvel onglet.
          </p>
        </article>

        <article class="home-seo-card">
          <h3>Português</h3>
          <p>
            O Visualizador de Stories do StoryViewHub foi criado para quem quer consultar stories públicos de forma simples, rápida e online.
            Digite o nome de usuário público e veja os resultados disponíveis sem fazer login nesta página.
            O Story Saver ajuda quando você precisa abrir uma foto ou um vídeo público com mais praticidade.
            Se a mídia estiver disponível, use Baixar Stories pelo link exibido nos resultados.
          </p>
        </article>
      </section>

      <section class="home-seo-faq" aria-labelledby="homeSeoFaqTitle">
        <h2 id="homeSeoFaqTitle">Frequently Asked Questions</h2>
        ${faqMarkup}
      </section>
    </div>
  </div>
</section>
  `;

  return renderLayout({
    title: "Instagram Story Viewer - View Stories Anonymously",
    description: "Use this Instagram Story Viewer to view public Instagram stories anonymously, check available stories without logging in, and download story media when results are available.",
    pathname: "/",
    extraHead: `<script type="application/ld+json">${buildFaqJsonLd()}</script>`,
    body
  });
}

module.exports = {
  buildHomePage
};
