const axios = require("axios");

// 🔥 ENV'den alıyoruz
const APIFY_URL = process.env.APIFY_URL;

async function getStories(username) {
  try {
    const cleanUsername = String(username || "").replace("@", "").trim();
    if (!cleanUsername) return [];

    console.log("APIFY USERNAME:", cleanUsername);

    const payload = {
      usernames: [cleanUsername],
    };

    const response = await axios.post(APIFY_URL, payload, {
      headers: { "Content-Type": "application/json" },
      timeout: 180000,
    });

    const data = response.data;

    console.log("RAW DATA:", data);
    console.log(
      "RAW DATA LENGTH:",
      Array.isArray(data) ? data.length : "not array"
    );

    if (!Array.isArray(data)) return [];

    return data
      .map((item) => {
        const url = item.link || "";

        const type = String(item.mediaType || "")
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
    console.log("STORY API ERROR:", err.response?.data || err.message);
    return [];
  }
}

// 🔥 BURASI ÇOK ÖNEMLİ (app.js ile uyumlu)
module.exports = { getStoriesForUsername: getStories };