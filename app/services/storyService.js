const axios = require("axios");

const APIFY_URL = process.env.APIFY_URL || "";

// 🔥 CACHE (EN KRİTİK)
const requestCache = {};
const CACHE_TIME = 60 * 1000; // 60 saniye

async function getStories(username) {
  try {
    const cleanUsername = String(username || "").replace("@", "").trim();
    if (!cleanUsername) return [];

    if (!APIFY_URL) {
      console.log("❌ APIFY_URL missing in ENV");
      return [];
    }

    const now = Date.now();

    // 🔥 CACHE CHECK
    if (requestCache[cleanUsername] && (now - requestCache[cleanUsername].time < CACHE_TIME)) {
      return requestCache[cleanUsername].data;
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

    const items = Array.isArray(data)
      ? data
      : Array.isArray(data?.items)
      ? data.items
      : [];

    if (!items.length) {
      requestCache[cleanUsername] = { data: [], time: now };
      return [];
    }

    const result = items
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

    // 🔥 CACHE SAVE
    requestCache[cleanUsername] = {
      data: result,
      time: now
    };

    return result;

  } catch (err) {
    console.log("🔥 FINAL ERROR:", err.message);
    return [];
  }
}

module.exports = { getStoriesForUsername: getStories };