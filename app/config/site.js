const siteConfig = {
  name: "Story Saver",
  baseUrl: process.env.SITE_URL || "https://www.storyviewhub.com", // 🔥 FIX
  primaryColor: "#d95f39",
  smmUrl: "https://example.com/smm?utm_source=storysaver&utm_medium=cta&utm_campaign=story_views",
  featuredUsernames: [
    "dailyvibes",
    "urbanframe",
    "trendpulse",
    "socialspark",
    "creatorflow",
    "viralnest"
  ]
};

module.exports = {
  siteConfig
};