const axios = require("axios");

// 🔥 ANA FONKSİYON
async function getStoriesForUsername(username) {
  const apiStories = await tryFetchStoriesFromApi(username);

  // ✅ sadece gerçek veri varsa döndür
  if (apiStories && apiStories.length > 0) {
    return apiStories;
  }

  // ❌ fake story üretme
  return null;
}


// 🔥 RAPIDAPI ENTEGRASYON
async function tryFetchStoriesFromApi(username) {
  try {
    const response = await axios.get(
      "https://instagram-downloader-download-instagram-stories-videos4.p.rapidapi.com/ig/story",
      {
        params: { username },
        headers: {
          "X-RapidAPI-Key": "BURAYA_API_KEY",
          "X-RapidAPI-Host": "instagram-downloader-download-instagram-stories-videos4.p.rapidapi.com"
        },
        timeout: 4000
      }
    );

    const data = response.data;

    if (!data || !data.data || data.data.length === 0) {
      return [];
    }

    return data.data.slice(0, 12).map((item, index) => ({
      id: `${username}-${index + 1}`,
      type: item.type || "story",
      timestamp: new Date().toISOString(),
      thumbnail: item.thumbnail || item.video_url
    }));

  } catch (error) {
    console.log("API ERROR:", error.message);
    return [];
  }
}

module.exports = {
  getStoriesForUsername
};