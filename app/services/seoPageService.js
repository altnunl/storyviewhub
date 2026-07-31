const {
  platformPages,
  redirects,
  specialTools,
  toolPages
} = require("../config/seoPages");

const platformMap = new Map(platformPages.map((page) => [page.slug, page]));
const platformPathMap = new Map(platformPages.map((page) => [page.path, page]));
const toolPathMap = new Map(toolPages.map((page) => [page.path, page]));
const toolIdMap = new Map(toolPages.map((page) => [page.id, page]));
const specialToolMap = new Map(specialTools.map((tool) => [tool.id, tool]));
const redirectPathMap = new Map(redirects.map((redirect) => [redirect.from, redirect]));

function withoutTrailingSlash(pathname) {
  if (pathname === "/") {
    return pathname;
  }

  return pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
}

function getPlatformByPath(pathname) {
  return platformPathMap.get(pathname) || null;
}

function getPlatformBySlug(slug) {
  return platformMap.get(slug) || null;
}

function getToolByPath(pathname) {
  return toolPathMap.get(pathname) || null;
}

function getToolById(id) {
  return toolIdMap.get(id) || specialToolMap.get(id) || null;
}

function getRedirectByPath(pathname) {
  return redirectPathMap.get(pathname) || null;
}

function getCanonicalSeoPaths() {
  return [
    ...platformPages.map((page) => page.path),
    ...toolPages.map((page) => page.path)
  ];
}

function getTrailingSlashRedirects() {
  return getCanonicalSeoPaths()
    .filter((pathname) => pathname !== "/")
    .map((pathname) => ({
      from: withoutTrailingSlash(pathname),
      to: pathname,
      status: 301
    }));
}

function getSitemapPages() {
  return [
    ...platformPages.map((page) => ({
      path: page.path,
      priority: page.sitemapPriority,
      changefreq: page.sitemapChangefreq
    })),
    ...toolPages.map((page) => ({
      path: page.path,
      priority: page.sitemapPriority,
      changefreq: page.sitemapChangefreq
    }))
  ];
}

function getToolsForPlatform(platformSlug) {
  return toolPages.filter((tool) => tool.platform === platformSlug);
}

function getRelatedTools(tool) {
  const ownPlatformTools = getToolsForPlatform(tool.platform)
    .filter((candidate) => candidate.id !== tool.id)
    .map((candidate) => ({
      title: candidate.h1,
      href: candidate.path,
      description: candidate.intro
    }));

  const configuredRelated = [
    ...(tool.relatedToolIds || []),
    ...(tool.relatedCrossToolIds || [])
  ]
    .map((id) => getToolById(id))
    .filter(Boolean)
    .map((related) => ({
      title: related.title || related.h1,
      href: related.href || related.path,
      description: related.description || related.intro
    }));

  const deduped = new Map();
  [...ownPlatformTools, ...configuredRelated].forEach((related) => {
    if (related.href && !deduped.has(related.href)) {
      deduped.set(related.href, related);
    }
  });

  return Array.from(deduped.values()).slice(0, 5);
}

module.exports = {
  getCanonicalSeoPaths,
  getPlatformByPath,
  getPlatformBySlug,
  getRedirectByPath,
  getRelatedTools,
  getSitemapPages,
  getToolByPath,
  getToolsForPlatform,
  getTrailingSlashRedirects,
  platformPages,
  redirects,
  toolPages
};
