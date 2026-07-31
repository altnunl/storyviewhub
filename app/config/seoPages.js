const platformPages = [
  {
    slug: "instagram",
    name: "Instagram",
    path: "/instagram/",
    metaTitle: "Instagram Tools for Public Stories | StoryViewHub",
    metaDescription: "Explore StoryViewHub Instagram tools for public stories, story downloads, profile checks, and safe public-content workflows.",
    h1: "Instagram Tools",
    intro: "Instagram is still the core StoryViewHub platform. This hub collects public-story workflows, story saving guidance, and privacy-first checks for people who want a simple browser experience without logging in here.",
    primaryKeyword: "Instagram tools",
    supportingKeywords: [
      "Instagram story viewer",
      "Instagram story downloader",
      "view Instagram stories anonymously",
      "anonymous Instagram viewer"
    ],
    contentTypes: ["Public stories", "Public story media", "Public profile usernames"],
    usage: "Use the Instagram tools with public usernames or public profile links. Private accounts, hidden viewer data, and password-protected content are not supported.",
    privacy: "StoryViewHub keeps the Instagram flow focused on public content. The current story viewer does not ask for an Instagram password.",
    toolCards: [
      {
        title: "Instagram Story Viewer",
        href: "/",
        description: "The existing StoryViewHub home page remains the primary Instagram Story Viewer to avoid duplicate SEO intent."
      },
      {
        title: "Instagram Story Downloader",
        href: "/instagram/story-downloader/",
        description: "A future-ready page for public story media links with clear limitations and no fake download results."
      }
    ],
    faq: [
      {
        question: "Which Instagram tool should I use first?",
        answer: "Use the StoryViewHub home page for the current Instagram Story Viewer. It is the primary public story viewing flow."
      },
      {
        question: "Does StoryViewHub support private Instagram accounts?",
        answer: "No. StoryViewHub pages should be used only with public usernames and public content."
      },
      {
        question: "Why does the story viewer link go to the home page?",
        answer: "The home page already targets the Instagram story viewer intent, so it remains the canonical page for that tool."
      },
      {
        question: "Can I connect another Instagram backend later?",
        answer: "Yes. Future providers should be connected through the central tool configuration rather than hardcoded page logic."
      }
    ],
    sitemapPriority: "0.8",
    sitemapChangefreq: "weekly"
  },
  {
    slug: "tiktok",
    name: "TikTok",
    path: "/tiktok/",
    metaTitle: "TikTok Tools for Public Videos and Stories | StoryViewHub",
    metaDescription: "Browse TikTok tool pages for public video links, story viewing research, mobile-friendly forms, and safe setup notes.",
    h1: "TikTok Tools",
    intro: "TikTok searches often move between short videos, creator profiles, and story-style updates. This hub organizes future TikTok workflows without pretending that media processing is already connected.",
    primaryKeyword: "TikTok tools",
    supportingKeywords: ["TikTok video downloader", "TikTok story viewer", "TikTok downloader"],
    contentTypes: ["Public video links", "Public profile links", "Story-style public updates"],
    usage: "Paste only public TikTok links or public profile references. The current pages provide validation-ready forms and setup messaging while backend processing remains unconfigured.",
    privacy: "TikTok pages do not request account credentials and do not provide private-account access.",
    toolCards: [
      {
        title: "TikTok Video Downloader",
        href: "/tiktok/video-downloader/",
        description: "Prepare a public TikTok video link for a future media processing connection."
      },
      {
        title: "TikTok Story Viewer",
        href: "/tiktok/story-viewer/",
        description: "A public story-viewing research page for TikTok-style updates and profile checks."
      }
    ],
    faq: [
      {
        question: "Can these TikTok tools download videos today?",
        answer: "No. The processing connection has not been configured yet, and the pages do not show fake media results."
      },
      {
        question: "What TikTok links are expected?",
        answer: "Future integrations should accept public TikTok video or profile links, depending on the specific tool."
      },
      {
        question: "Are private TikTok accounts supported?",
        answer: "No. Private or restricted TikTok content is outside the supported scope."
      },
      {
        question: "Is StoryViewHub affiliated with TikTok?",
        answer: "No. StoryViewHub is an independent tool hub and is not affiliated with TikTok."
      }
    ],
    sitemapPriority: "0.8",
    sitemapChangefreq: "weekly"
  },
  {
    slug: "pinterest",
    name: "Pinterest",
    path: "/pinterest/",
    metaTitle: "Pinterest Download Tools for Pins | StoryViewHub",
    metaDescription: "Explore Pinterest video and image downloader pages for public pin links, image saves, and clear media-use guidance.",
    h1: "Pinterest Tools",
    intro: "Pinterest content is usually organized around pins, boards, image ideas, and short videos. This hub separates image and video workflows so each future tool has a clear purpose.",
    primaryKeyword: "Pinterest tools",
    supportingKeywords: ["Pinterest video downloader", "Pinterest image downloader", "save Pinterest image"],
    contentTypes: ["Public pins", "Public pin images", "Public pin videos"],
    usage: "Use public Pinterest pin or media URLs only. Respect creator rights before saving or reusing media.",
    privacy: "Pinterest pages do not access private boards or logged-in account areas.",
    toolCards: [
      {
        title: "Pinterest Video Downloader",
        href: "/pinterest/video-downloader/",
        description: "A public pin video form prepared for a later media provider."
      },
      {
        title: "Pinterest Image Downloader",
        href: "/pinterest/image-downloader/",
        description: "A focused page for public pin image URLs and future image handling."
      }
    ],
    faq: [
      {
        question: "Which Pinterest tool is for photos?",
        answer: "Use the Pinterest Image Downloader page for public pin image links."
      },
      {
        question: "Which Pinterest tool is for videos?",
        answer: "Use the Pinterest Video Downloader page for public pin video links."
      },
      {
        question: "Can private Pinterest boards be accessed?",
        answer: "No. StoryViewHub should only work with public Pinterest content."
      },
      {
        question: "Do I need to install an app?",
        answer: "No. These pages are designed as browser-based workflows."
      }
    ],
    sitemapPriority: "0.8",
    sitemapChangefreq: "weekly"
  },
  {
    slug: "facebook",
    name: "Facebook",
    path: "/facebook/",
    metaTitle: "Facebook Video Tools for Public Posts | StoryViewHub",
    metaDescription: "Review Facebook public video tool pages, supported link types, privacy notes, and safe media-use guidance.",
    h1: "Facebook Tools",
    intro: "Facebook media can appear in public posts, pages, groups, and reels. This hub keeps the first Facebook expansion narrow by focusing on public video links only.",
    primaryKeyword: "Facebook tools",
    supportingKeywords: ["Facebook video downloader", "Facebook video download", "save Facebook video"],
    contentTypes: ["Public Facebook video links", "Public post URLs", "Public page video URLs"],
    usage: "Only public Facebook video URLs should be used. The page does not support private posts, locked groups, or account-only content.",
    privacy: "Facebook tools do not request Facebook login details and should not be used to bypass privacy settings.",
    toolCards: [
      {
        title: "Facebook Video Downloader",
        href: "/facebook/video-downloader/",
        description: "A future-ready page for public Facebook video links with no fake output."
      }
    ],
    faq: [
      {
        question: "What Facebook content is in scope?",
        answer: "The first Facebook tool is scoped to public video links."
      },
      {
        question: "Are private groups supported?",
        answer: "No. Locked groups, private posts, and restricted videos are not supported."
      },
      {
        question: "Will the page show a fake download if the provider is missing?",
        answer: "No. It only shows a setup message until a real provider is configured."
      },
      {
        question: "Is StoryViewHub affiliated with Facebook?",
        answer: "No. StoryViewHub is independent and not affiliated with Facebook."
      }
    ],
    sitemapPriority: "0.7",
    sitemapChangefreq: "weekly"
  },
  {
    slug: "reddit",
    name: "Reddit",
    path: "/reddit/",
    metaTitle: "Reddit Video Tools for Public Posts | StoryViewHub",
    metaDescription: "Explore Reddit video downloader planning pages for public post links, mobile use, and responsible media handling.",
    h1: "Reddit Tools",
    intro: "Reddit video links often come from public posts and community discussions. This hub keeps Reddit handling focused on public post URLs and clear attribution responsibility.",
    primaryKeyword: "Reddit tools",
    supportingKeywords: ["Reddit video downloader", "Reddit video download", "download Reddit videos"],
    contentTypes: ["Public Reddit posts", "Public video posts", "Public media links"],
    usage: "Use public Reddit post URLs only and respect the context of the community where the media was shared.",
    privacy: "Reddit pages do not access private messages, mod-only content, or account-restricted areas.",
    toolCards: [
      {
        title: "Reddit Video Downloader",
        href: "/reddit/video-downloader/",
        description: "A page for preparing public Reddit video links for a future provider."
      }
    ],
    faq: [
      {
        question: "Which Reddit links are expected?",
        answer: "Future support should focus on public Reddit post URLs that contain video media."
      },
      {
        question: "Can private Reddit messages be downloaded?",
        answer: "No. Private messages and restricted areas are not supported."
      },
      {
        question: "Should I credit Reddit creators?",
        answer: "Yes. Users are responsible for respecting creators, communities, and content rights."
      },
      {
        question: "Does this hub scrape Reddit today?",
        answer: "No. No Reddit backend is connected in this phase."
      }
    ],
    sitemapPriority: "0.7",
    sitemapChangefreq: "weekly"
  },
  {
    slug: "snapchat",
    name: "Snapchat",
    path: "/snapchat/",
    metaTitle: "Snapchat Story Tools for Public Stories | StoryViewHub",
    metaDescription: "Review Snapchat public story viewer planning pages with privacy notes, supported input guidance, and mobile-friendly forms.",
    h1: "Snapchat Tools",
    intro: "Snapchat is privacy-sensitive, so this hub is intentionally narrow. It describes public story viewing workflows without claiming access to private or disappearing content.",
    primaryKeyword: "Snapchat tools",
    supportingKeywords: ["Snapchat story viewer", "anonymous Snapchat story viewer"],
    contentTypes: ["Public stories", "Public profile references", "Public story URLs"],
    usage: "Use only public Snapchat story or profile references. Private stories and account-restricted content are not supported.",
    privacy: "StoryViewHub does not request Snapchat credentials and does not bypass privacy settings.",
    toolCards: [
      {
        title: "Snapchat Story Viewer",
        href: "/snapchat/story-viewer/",
        description: "A public story-viewing page with a clear setup notice until a provider is connected."
      }
    ],
    faq: [
      {
        question: "Can Snapchat private stories be viewed?",
        answer: "No. Private stories are not supported."
      },
      {
        question: "Does the Snapchat page require login?",
        answer: "No. StoryViewHub pages should not ask for Snapchat passwords."
      },
      {
        question: "Is Snapchat story processing active?",
        answer: "No. The backend connection has not been configured yet."
      },
      {
        question: "Why is the Snapchat page cautious?",
        answer: "Snapchat content can be privacy-sensitive, so the page only discusses public story workflows."
      }
    ],
    sitemapPriority: "0.7",
    sitemapChangefreq: "weekly"
  },
  {
    slug: "telegram",
    name: "Telegram",
    path: "/telegram/",
    metaTitle: "Telegram Video Tools for Public Posts | StoryViewHub",
    metaDescription: "Explore Telegram video downloader planning pages for public channel posts, link formats, and safe media-use guidance.",
    h1: "Telegram Tools",
    intro: "Telegram content can appear in public channels, public groups, and shared post links. This hub focuses only on public video links and avoids private chat access.",
    primaryKeyword: "Telegram tools",
    supportingKeywords: ["Telegram video downloader", "Telegram video download", "save Telegram video"],
    contentTypes: ["Public channel posts", "Public video posts", "Public Telegram links"],
    usage: "Use public Telegram post links only. Private chats, invite-only groups, and protected content are not supported.",
    privacy: "Telegram pages do not request account access and do not connect to private chats.",
    toolCards: [
      {
        title: "Telegram Video Downloader",
        href: "/telegram/video-downloader/",
        description: "A future-ready form for public Telegram video post links."
      }
    ],
    faq: [
      {
        question: "Which Telegram links are expected?",
        answer: "Future support should focus on public Telegram post or channel links that contain video media."
      },
      {
        question: "Can private Telegram chats be accessed?",
        answer: "No. Private chats and invite-only content are outside the supported scope."
      },
      {
        question: "Is a Telegram account required?",
        answer: "No account login should be required on StoryViewHub pages."
      },
      {
        question: "Is Telegram media processing connected now?",
        answer: "No. This phase creates the SEO page and integration point only."
      }
    ],
    sitemapPriority: "0.7",
    sitemapChangefreq: "weekly"
  }
];

// Manual integration point: connect a real provider by updating each tool's
// integration object. Pages must not invent media results while enabled is false.
const toolPages = [
  {
    id: "instagram-story-downloader",
    platform: "instagram",
    slug: "story-downloader",
    path: "/instagram/story-downloader/",
    metaTitle: "Instagram Story Downloader - Save Public Stories | StoryViewHub",
    metaDescription: "Prepare public Instagram story links or usernames for future story download processing. No private account access is supported.",
    h1: "Instagram Story Downloader",
    intro: "This page is prepared for public Instagram story download workflows. It keeps the input simple and honest while the media processing connection remains unconfigured.",
    primaryKeyword: "Instagram story downloader",
    supportingKeywords: ["download Instagram stories", "save Instagram story", "Instagram story download"],
    form: {
      label: "Instagram username or public profile URL",
      inputName: "instagram_story_source",
      placeholder: "@username or public Instagram profile URL",
      maxLength: 120,
      submitLabel: "Check story setup"
    },
    integration: {
      enabled: false,
      actionUrl: null,
      provider: null
    },
    features: [
      "Prepared for public Instagram story media workflows",
      "Keeps private-account limitations visible",
      "Uses safe form handling without displaying raw input",
      "Can be connected to a real provider from central config later"
    ],
    steps: [
      "Copy a public Instagram username or profile URL.",
      "Paste it into the story downloader form.",
      "Submit the form to see whether processing has been configured.",
      "Use only content you have the right to save."
    ],
    supportedLinks: ["Public Instagram usernames", "Public Instagram profile URLs", "Public story media when a provider is connected"],
    privacy: "Private Instagram accounts, password-protected content, and hidden viewer data are not supported.",
    relatedToolIds: ["home-story-viewer"],
    relatedCrossToolIds: ["tiktok-story-viewer", "snapchat-story-viewer"],
    faq: [
      {
        question: "Can this page download Instagram stories right now?",
        answer: "No. The media processing connection has not been configured yet, so the page does not show fake downloads."
      },
      {
        question: "What input should I use?",
        answer: "Use a public Instagram username or public profile URL."
      },
      {
        question: "Are private stories supported?",
        answer: "No. Private accounts and restricted stories are not supported."
      },
      {
        question: "Where is the Instagram Story Viewer?",
        answer: "The current Instagram Story Viewer remains on the StoryViewHub home page."
      }
    ],
    sitemapPriority: "0.8",
    sitemapChangefreq: "weekly"
  },
  {
    id: "tiktok-video-downloader",
    platform: "tiktok",
    slug: "video-downloader",
    path: "/tiktok/video-downloader/",
    metaTitle: "TikTok Video Downloader - Prepare Public Links | StoryViewHub",
    metaDescription: "Paste a public TikTok video link and see whether media processing is configured. No fake downloads or private access.",
    h1: "TikTok Video Downloader",
    intro: "This TikTok Video Downloader page is built for public video link workflows. The backend connection is intentionally separate so no unsupported download result is shown.",
    primaryKeyword: "TikTok video downloader",
    supportingKeywords: ["download TikTok videos", "TikTok video download", "TikTok downloader", "save TikTok video", "download TikTok video online"],
    form: {
      label: "Public TikTok video URL",
      inputName: "tiktok_video_url",
      placeholder: "https://www.tiktok.com/@creator/video/...",
      maxLength: 300,
      submitLabel: "Check video setup"
    },
    integration: {
      enabled: false,
      actionUrl: null,
      provider: null
    },
    features: [
      "Prepared for public TikTok video URLs",
      "Mobile-friendly form structure",
      "Does not promise watermark removal or HD output",
      "No remote fetch occurs until a real provider is configured"
    ],
    steps: [
      "Open a public TikTok video.",
      "Copy the video link from TikTok.",
      "Paste the link into the form.",
      "Submit to check the current provider configuration."
    ],
    supportedLinks: ["Public TikTok video URLs", "Creator video links", "Shared TikTok video links"],
    privacy: "Private TikTok videos, restricted accounts, and login-only content are not supported.",
    relatedToolIds: ["tiktok-story-viewer"],
    relatedCrossToolIds: ["pinterest-video-downloader", "facebook-video-downloader"],
    faq: [
      {
        question: "Does this TikTok downloader work right now?",
        answer: "No. The page is ready for a future provider, but media processing is not configured in this phase."
      },
      {
        question: "Can I use a private TikTok video?",
        answer: "No. Only public TikTok video links are in scope."
      },
      {
        question: "Does StoryViewHub promise HD downloads?",
        answer: "No. The page does not promise HD output, 4K output, uncapped processing, or watermark removal."
      },
      {
        question: "Will my pasted link be shown on the page?",
        answer: "No. The form result does not echo raw user input."
      }
    ],
    sitemapPriority: "0.8",
    sitemapChangefreq: "weekly"
  },
  {
    id: "tiktok-story-viewer",
    platform: "tiktok",
    slug: "story-viewer",
    path: "/tiktok/story-viewer/",
    metaTitle: "TikTok Story Viewer - Public Story Checks | StoryViewHub",
    metaDescription: "Use a public TikTok profile reference to prepare future story viewing checks. Private accounts are not supported.",
    h1: "TikTok Story Viewer",
    intro: "This TikTok Story Viewer page is designed for future public story checks without suggesting private access or account bypass.",
    primaryKeyword: "TikTok story viewer",
    supportingKeywords: ["TikTok anonymous viewer", "view TikTok stories anonymously", "view TikTok stories"],
    form: {
      label: "TikTok username or public profile URL",
      inputName: "tiktok_story_source",
      placeholder: "@creator or public TikTok profile URL",
      maxLength: 160,
      submitLabel: "Check story setup"
    },
    integration: {
      enabled: false,
      actionUrl: null,
      provider: null
    },
    features: [
      "Prepared for public profile references",
      "Explains that story processing is not yet connected",
      "Does not request TikTok login details",
      "Keeps anonymous-viewing language limited to public content"
    ],
    steps: [
      "Find a public TikTok profile.",
      "Copy the username or profile link.",
      "Paste it into the story viewer form.",
      "Wait for the setup status message."
    ],
    supportedLinks: ["Public TikTok usernames", "Public TikTok profile URLs", "Public story references when a provider is connected"],
    privacy: "No private TikTok stories, restricted profiles, or account-only content are supported.",
    relatedToolIds: ["tiktok-video-downloader"],
    relatedCrossToolIds: ["snapchat-story-viewer", "home-story-viewer"],
    faq: [
      {
        question: "Can this page view TikTok stories today?",
        answer: "No. The story processing connection has not been configured yet."
      },
      {
        question: "Does it work with private profiles?",
        answer: "No. Only public TikTok profiles are in scope."
      },
      {
        question: "Does the form require a TikTok password?",
        answer: "No. StoryViewHub should not ask for TikTok credentials."
      },
      {
        question: "Is this page the same as the TikTok video downloader?",
        answer: "No. This page is scoped to story and profile checks, while the video downloader is scoped to public video links."
      }
    ],
    sitemapPriority: "0.7",
    sitemapChangefreq: "weekly"
  },
  {
    id: "pinterest-video-downloader",
    platform: "pinterest",
    slug: "video-downloader",
    path: "/pinterest/video-downloader/",
    metaTitle: "Pinterest Video Downloader - Public Pin Videos | StoryViewHub",
    metaDescription: "Prepare public Pinterest video pin links for future processing with clear copyright and public-content guidance.",
    h1: "Pinterest Video Downloader",
    intro: "This Pinterest Video Downloader page is focused on public pin video links and clear user responsibility around saved media.",
    primaryKeyword: "Pinterest video downloader",
    supportingKeywords: ["download Pinterest video", "Pinterest video download", "Pinterest video downloader online", "Pinterest HD video download"],
    form: {
      label: "Public Pinterest video pin URL",
      inputName: "pinterest_video_url",
      placeholder: "https://www.pinterest.com/pin/...",
      maxLength: 300,
      submitLabel: "Check video setup"
    },
    integration: {
      enabled: false,
      actionUrl: null,
      provider: null
    },
    features: [
      "Prepared for public Pinterest video pin URLs",
      "Separates video handling from image handling",
      "Avoids fake media links while no provider is active",
      "Uses a central integration placeholder"
    ],
    steps: [
      "Open a public Pinterest video pin.",
      "Copy the pin link.",
      "Paste it into the form.",
      "Submit to see the current setup status."
    ],
    supportedLinks: ["Public Pinterest pin URLs", "Public video pin links", "Shared public Pinterest URLs"],
    privacy: "Private boards, logged-in-only pins, and restricted content are not supported.",
    relatedToolIds: ["pinterest-image-downloader"],
    relatedCrossToolIds: ["tiktok-video-downloader", "reddit-video-downloader"],
    faq: [
      {
        question: "Does this page download Pinterest videos now?",
        answer: "No. The processing provider has not been configured yet."
      },
      {
        question: "What Pinterest URL should I paste?",
        answer: "Use a public Pinterest pin URL that points to video content."
      },
      {
        question: "Can I use private board content?",
        answer: "No. Private or restricted Pinterest content is not supported."
      },
      {
        question: "Is Pinterest Image Downloader different?",
        answer: "Yes. The image page is for public pin images, while this page is for video pins."
      }
    ],
    sitemapPriority: "0.8",
    sitemapChangefreq: "weekly"
  },
  {
    id: "pinterest-image-downloader",
    platform: "pinterest",
    slug: "image-downloader",
    path: "/pinterest/image-downloader/",
    metaTitle: "Pinterest Image Downloader - Public Pin Images | StoryViewHub",
    metaDescription: "Prepare public Pinterest image pin links for future image handling. Simple form, public content only, no fake results.",
    h1: "Pinterest Image Downloader",
    intro: "This Pinterest Image Downloader page focuses on public pin images and keeps image-saving guidance separate from video workflows.",
    primaryKeyword: "Pinterest image downloader",
    supportingKeywords: ["download Pinterest images", "save Pinterest image", "Pinterest photo downloader"],
    form: {
      label: "Public Pinterest image pin URL",
      inputName: "pinterest_image_url",
      placeholder: "https://www.pinterest.com/pin/...",
      maxLength: 300,
      submitLabel: "Check image setup"
    },
    integration: {
      enabled: false,
      actionUrl: null,
      provider: null
    },
    features: [
      "Prepared for public Pinterest image pins",
      "Mobile-friendly input for long pin URLs",
      "No private board access",
      "Can be connected to a real image provider later"
    ],
    steps: [
      "Open the public Pinterest image pin.",
      "Copy the pin URL.",
      "Paste the URL into the image form.",
      "Submit to check whether image processing is configured."
    ],
    supportedLinks: ["Public Pinterest image pins", "Public pin URLs", "Shared Pinterest links"],
    privacy: "Users are responsible for respecting creator rights before saving or reusing images.",
    relatedToolIds: ["pinterest-video-downloader"],
    relatedCrossToolIds: ["instagram-story-downloader"],
    faq: [
      {
        question: "Can I download Pinterest images on this page now?",
        answer: "No. The provider has not been configured yet, so no fake image result is shown."
      },
      {
        question: "Which links are expected?",
        answer: "Use public Pinterest pin links that contain image content."
      },
      {
        question: "Does it support private boards?",
        answer: "No. Private boards and restricted pins are not supported."
      },
      {
        question: "Can I use saved images anywhere?",
        answer: "You are responsible for checking creator rights, platform terms, and fair-use context."
      }
    ],
    sitemapPriority: "0.8",
    sitemapChangefreq: "weekly"
  },
  {
    id: "facebook-video-downloader",
    platform: "facebook",
    slug: "video-downloader",
    path: "/facebook/video-downloader/",
    metaTitle: "Facebook Video Downloader - Public Video Links | StoryViewHub",
    metaDescription: "Prepare public Facebook video links for future processing. Private posts, locked groups, and fake results are not supported.",
    h1: "Facebook Video Downloader",
    intro: "This Facebook Video Downloader page is scoped to public video links and avoids claims about restricted posts or private groups.",
    primaryKeyword: "Facebook video downloader",
    supportingKeywords: ["Facebook video download", "download Facebook videos", "save Facebook video"],
    form: {
      label: "Public Facebook video URL",
      inputName: "facebook_video_url",
      placeholder: "https://www.facebook.com/.../videos/...",
      maxLength: 300,
      submitLabel: "Check video setup"
    },
    integration: {
      enabled: false,
      actionUrl: null,
      provider: null
    },
    features: [
      "Prepared for public Facebook video URLs",
      "Clear no-private-content policy",
      "No automatic remote fetch in this phase",
      "Central provider field for future setup"
    ],
    steps: [
      "Copy a public Facebook video link.",
      "Paste it into the form.",
      "Submit to check configuration status.",
      "Use saved media only when you have the right to do so."
    ],
    supportedLinks: ["Public Facebook video URLs", "Public page video links", "Public post video links"],
    privacy: "Locked groups, private posts, and account-only videos are not supported.",
    relatedToolIds: [],
    relatedCrossToolIds: ["tiktok-video-downloader", "reddit-video-downloader"],
    faq: [
      {
        question: "Does this page support private Facebook videos?",
        answer: "No. Only public video links are in scope."
      },
      {
        question: "Is Facebook video processing connected?",
        answer: "No. The media provider has not been configured yet."
      },
      {
        question: "Can I paste a group video link?",
        answer: "Only public group videos would be considered in a future integration. Locked or private group content is not supported."
      },
      {
        question: "Is StoryViewHub affiliated with Facebook?",
        answer: "No. StoryViewHub is independent and not affiliated with Facebook."
      }
    ],
    sitemapPriority: "0.7",
    sitemapChangefreq: "weekly"
  },
  {
    id: "reddit-video-downloader",
    platform: "reddit",
    slug: "video-downloader",
    path: "/reddit/video-downloader/",
    metaTitle: "Reddit Video Downloader - Public Post Links | StoryViewHub",
    metaDescription: "Prepare public Reddit video post links for future processing with community context and creator-rights reminders.",
    h1: "Reddit Video Downloader",
    intro: "This Reddit Video Downloader page is prepared for public post URLs that contain video media. It does not connect to Reddit or fetch remote content in this phase.",
    primaryKeyword: "Reddit video downloader",
    supportingKeywords: ["Reddit video download", "download Reddit videos", "save Reddit video"],
    form: {
      label: "Public Reddit video post URL",
      inputName: "reddit_video_url",
      placeholder: "https://www.reddit.com/r/.../comments/...",
      maxLength: 300,
      submitLabel: "Check video setup"
    },
    integration: {
      enabled: false,
      actionUrl: null,
      provider: null
    },
    features: [
      "Prepared for public Reddit video post links",
      "Keeps community context and media rights visible",
      "No scraping or third-party API in this phase",
      "Does not echo submitted URLs back into the HTML"
    ],
    steps: [
      "Open a public Reddit post containing a video.",
      "Copy the post URL.",
      "Paste it into the form.",
      "Submit to check the provider setup status."
    ],
    supportedLinks: ["Public Reddit post URLs", "Public subreddit video posts", "Shared Reddit links"],
    privacy: "Private messages, restricted communities, and account-only content are not supported.",
    relatedToolIds: [],
    relatedCrossToolIds: ["facebook-video-downloader", "telegram-video-downloader"],
    faq: [
      {
        question: "Can this page download Reddit videos now?",
        answer: "No. No Reddit media provider is configured in this phase."
      },
      {
        question: "Which Reddit links should be used?",
        answer: "Use public Reddit post URLs that contain video media."
      },
      {
        question: "Does it access private Reddit content?",
        answer: "No. Private messages and restricted communities are not supported."
      },
      {
        question: "Who is responsible for content rights?",
        answer: "The user is responsible for respecting creator rights and community rules."
      }
    ],
    sitemapPriority: "0.7",
    sitemapChangefreq: "weekly"
  },
  {
    id: "snapchat-story-viewer",
    platform: "snapchat",
    slug: "story-viewer",
    path: "/snapchat/story-viewer/",
    metaTitle: "Snapchat Story Viewer - Public Story Checks | StoryViewHub",
    metaDescription: "Prepare public Snapchat story references for future viewing checks. Private stories and account access are not supported.",
    h1: "Snapchat Story Viewer",
    intro: "This Snapchat Story Viewer page is deliberately limited to public story references and clear privacy boundaries.",
    primaryKeyword: "Snapchat story viewer",
    supportingKeywords: ["view Snapchat story anonymously", "anonymous Snapchat story viewer"],
    form: {
      label: "Public Snapchat story or profile reference",
      inputName: "snapchat_story_source",
      placeholder: "Public Snapchat profile or story reference",
      maxLength: 180,
      submitLabel: "Check story setup"
    },
    integration: {
      enabled: false,
      actionUrl: null,
      provider: null
    },
    features: [
      "Prepared for public Snapchat story references",
      "Does not claim private story access",
      "Does not request Snapchat credentials",
      "Keeps processing status transparent"
    ],
    steps: [
      "Find a public Snapchat story or public profile reference.",
      "Paste the reference into the form.",
      "Submit to check setup status.",
      "Use only public content and respect privacy."
    ],
    supportedLinks: ["Public Snapchat story references", "Public profile references"],
    privacy: "Private Snapchat stories and account-only content are not supported.",
    relatedToolIds: [],
    relatedCrossToolIds: ["tiktok-story-viewer", "home-story-viewer"],
    faq: [
      {
        question: "Can this page view private Snapchat stories?",
        answer: "No. Private Snapchat stories are not supported."
      },
      {
        question: "Is Snapchat processing connected?",
        answer: "No. The provider connection is not configured yet."
      },
      {
        question: "Does the form need a password?",
        answer: "No. StoryViewHub does not ask for Snapchat credentials."
      },
      {
        question: "Why is there a setup message?",
        answer: "The page is ready for future integration but does not show fake story results."
      }
    ],
    sitemapPriority: "0.7",
    sitemapChangefreq: "weekly"
  },
  {
    id: "telegram-video-downloader",
    platform: "telegram",
    slug: "video-downloader",
    path: "/telegram/video-downloader/",
    metaTitle: "Telegram Video Downloader - Public Post Links | StoryViewHub",
    metaDescription: "Prepare public Telegram video post links for future processing. Private chats and protected posts are not supported.",
    h1: "Telegram Video Downloader",
    intro: "This Telegram Video Downloader page is scoped to public channel or post links and avoids private chat access.",
    primaryKeyword: "Telegram video downloader",
    supportingKeywords: ["Telegram video download", "download Telegram video", "save Telegram video"],
    form: {
      label: "Public Telegram video post URL",
      inputName: "telegram_video_url",
      placeholder: "https://t.me/channel/post",
      maxLength: 260,
      submitLabel: "Check video setup"
    },
    integration: {
      enabled: false,
      actionUrl: null,
      provider: null
    },
    features: [
      "Prepared for public Telegram post links",
      "No private chat access",
      "No Telegram scraping in this phase",
      "Central provider configuration is ready for later setup"
    ],
    steps: [
      "Copy a public Telegram post link that contains video.",
      "Paste it into the form.",
      "Submit to check the current setup status.",
      "Respect channel rules and content rights."
    ],
    supportedLinks: ["Public Telegram post links", "Public channel video links", "Shared Telegram URLs"],
    privacy: "Private chats, invite-only groups, and protected content are not supported.",
    relatedToolIds: [],
    relatedCrossToolIds: ["reddit-video-downloader", "facebook-video-downloader"],
    faq: [
      {
        question: "Can this page download Telegram videos now?",
        answer: "No. The media provider has not been connected yet."
      },
      {
        question: "Which Telegram links are expected?",
        answer: "Use public Telegram post or channel links that contain video media."
      },
      {
        question: "Can private chats be accessed?",
        answer: "No. Private chats and invite-only groups are not supported."
      },
      {
        question: "Does StoryViewHub require a Telegram login?",
        answer: "No. This page does not ask for Telegram account credentials."
      }
    ],
    sitemapPriority: "0.7",
    sitemapChangefreq: "weekly"
  }
];

const specialTools = [
  {
    id: "home-story-viewer",
    title: "Instagram Story Viewer",
    href: "/",
    platform: "instagram",
    description: "The canonical StoryViewHub Instagram story viewing experience."
  }
];

const redirects = [
  {
    from: "/instagram/story-viewer/",
    to: "/",
    status: 301,
    reason: "The home page remains the canonical Instagram Story Viewer to avoid keyword cannibalization."
  }
];

module.exports = {
  platformPages,
  redirects,
  specialTools,
  toolPages
};
