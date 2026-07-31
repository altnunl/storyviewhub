const USERNAME_PATTERN = /^[a-z0-9._]{1,30}$/;

function normalizeUsername(value) {
  if (typeof value !== "string") {
    return { ok: false, username: "", reason: "missing" };
  }

  const username = value.trim().replace(/^@+/, "").toLowerCase();

  if (!username) {
    return { ok: false, username: "", reason: "empty" };
  }

  if (username.length > 30) {
    return { ok: false, username: "", reason: "too_long" };
  }

  if (!USERNAME_PATTERN.test(username)) {
    return { ok: false, username: "", reason: "invalid_characters" };
  }

  return { ok: true, username, reason: "" };
}

module.exports = {
  USERNAME_PATTERN,
  normalizeUsername
};
