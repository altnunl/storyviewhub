const adjectives = [
  "daily",
  "urban",
  "social",
  "viral",
  "golden",
  "bright",
  "rapid",
  "fresh",
  "prime",
  "bold",
  "smart",
  "pixel",
  "silent",
  "lunar",
  "solar",
  "modern",
  "secret",
  "vivid",
  "royal",
  "epic",
  "magic",
  "neon",
  "story",
  "trend",
  "ultra",
  "global",
  "native",
  "socially",
  "viralx",
  "hyper"
];

const nouns = [
  "vibes",
  "pulse",
  "frame",
  "spark",
  "nest",
  "boost",
  "studio",
  "stream",
  "focus",
  "loop",
  "scope",
  "vision",
  "cloud",
  "wave",
  "glow",
  "signal",
  "daily",
  "media",
  "gram",
  "stories",
  "social",
  "motion",
  "avenue",
  "spot",
  "hub",
  "circle",
  "flow",
  "lane",
  "space",
  "world",
  "lab",
  "edge",
  "track",
  "house",
  "craft",
  "market",
  "feed",
  "reach",
  "crew",
  "zone"
];

function titleCase(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function buildDataset() {
  const users = [];

  for (let adjectiveIndex = 0; adjectiveIndex < adjectives.length; adjectiveIndex += 1) {
    for (let nounIndex = 0; nounIndex < nouns.length; nounIndex += 1) {
      const slug = `${adjectives[adjectiveIndex]}${nouns[nounIndex]}`;
      users.push({
        slug,
        displayName: `${titleCase(adjectives[adjectiveIndex])} ${titleCase(nouns[nounIndex])}`
      });
    }
  }

  return users;
}

const usernames = buildDataset();

module.exports = {
  usernames
};
