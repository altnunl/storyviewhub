const { usernames } = require("../data/usernames");

const userMap = new Map(usernames.map((user) => [user.slug, user]));

function findUserByUsername(username) {
  return userMap.get(username) || null;
}

function getRelatedUsers(username, limit) {
  const safeLimit = Math.max(1, limit || 12);
  const startIndex = Math.abs(hashString(username)) % usernames.length;
  const results = [];

  for (let index = 0; index < usernames.length && results.length < safeLimit; index += 1) {
    const candidate = usernames[(startIndex + index) % usernames.length];
    if (candidate.slug !== username) {
      results.push(candidate);
    }
  }

  return results;
}

function hashString(value) {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(index);
    hash |= 0;
  }
  return hash;
}

module.exports = {
  findUserByUsername,
  getRelatedUsers,
  usernames
};
