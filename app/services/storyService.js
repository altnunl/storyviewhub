const axios = require("axios");

// 🔥 ENV'den alıyoruz (güvenli fallback ile)
const APIFY_URL = process.env.APIFY_URL || "";

async function getStories(username) {
  try {
    const cleanUsername = String(username || "").replace("@", "").trim();
    if (!cleanUsername) return [];

    // 🔥 ENV kontrol (CRASH ENGELLEME)
    if (!APIFY_URL) {
      console.log("❌ APIFY_URL missing in ENV");
      return [];
    }

    console.log("APIFY USERNAME:", cleanUsername);

    const payload = {
      usernames: [cleanUsername],
    };

    let response;

    try {
      response = await axios.post(APIFY_URL, payload, {
        headers: { "Content-Type": "application/json" },
        timeout: 180000,
      });
    } catch (err) {
      console.log("❌ AXIOS ERROR:", err.response?.data || err.message);
      return [];
    }

    const data = response?.data;

    console.log("RAW DATA:", data);
    console.log(
      "RAW DATA LENGTH:",
      Array.isArray(data) ? data.length : "not array"
    );

    // 🔥 BAZEN OBJECT DÖNEBİLİR → FIX
    const items = Array.isArray(data)
      ? data
      : Array.isArray(data?.items)
      ? data.items
      : [];

    if (!items.length) return [];

    return items
      .map((item) => {
        const url =
          item.link ||
          item.url ||
          item.mediaUrl ||
          "";

        const type = String(item.mediaType || item.type || "")
          .toLowerCase()
          .includes("video")
          ? "video"
          : "image";

        return {
          url,
          type,
          thumbnail: item.thumbnail || "",
        };
      })
      .filter((x) => x.url);

  } catch (err) {
    console.log("🔥 FINAL ERROR:", err.message);
    return [];
  }
}

// 🔥 EXPORT (app.js ile uyumlu)
module.exports = { getStoriesForUsername: getStories };