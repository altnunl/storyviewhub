# StoryViewHub Multi-Platform SEO Architecture Plan

Status: Technical design only
Scope: Future SEO architecture for a multi-platform social media tools hub
Implementation state: Not implemented in routes, views, sitemap, navigation, or metadata
Last reviewed codebase state: Express SSR app with `/`, `/result`, `/user/:username`, `/robots.txt`, and `/sitemap.xml`

## 1. Purpose

This document defines a future SEO architecture for expanding StoryViewHub from an Instagram story viewer focused site into a broader social media tools hub.

It is intentionally a planning document only. It does not require or imply that any route, controller, view, sitemap entry, navigation item, canonical tag, schema, or metadata is currently implemented.

The main goals are:

- Preserve the current working Instagram Story Viewer experience.
- Avoid uncontrolled programmatic SEO and profile index bloat.
- Create a clean URL hierarchy for future platform and tool pages.
- Separate platform category pages, tool pages, article pages, and profile/result flows.
- Define indexability, canonical, internal linking, breadcrumb, sitemap, and metadata rules before implementation.
- Make future tools easy to add without weakening crawl quality or creating misleading pages.

## 2. Current Codebase Observations

Current application entry:

- `server.js` loads environment variables, creates the Express app, and starts the server.
- `app/app.js` owns all current routes.

Current routes:

- `/` renders the current home page.
- `/api/story` returns story data for a validated username.
- `/api/count` returns an in-memory usage counter.
- `/result` validates a username and redirects valid searches with `303` to `/user/:username`.
- `/user/:username` renders only dataset-backed user pages and returns `404` for unknown or invalid usernames.
- `/robots.txt` allows the site and disallows `/result`.
- `/sitemap.xml` currently includes only the home page.

Current SEO helpers:

- `app/utils/seo.js` builds title, description, robots, canonical, Open Graph, Twitter Card, WebPage schema, and sitemap XML.
- `app/views/layout.js` injects the shared head, favicon links, metadata, Monetag verification, vignette script, promo bar, sticky CTA, and footer.
- `app/views/pages/home.js` renders the current Instagram Story Viewer home page and FAQ schema.
- `app/views/pages/user.js` renders user/profile pages and noindex 404 pages.

Important current constraints to preserve in future work:

- Unknown user URLs should not become unlimited indexable pages.
- `/result` should remain a noindex transitional route.
- Sitemap should include only high-quality indexable URLs.
- Feature claims must match real working tools.
- Existing Monetag code should be handled separately from SEO architecture.
- `all_keywords.txt` can inform future clustering, but keywords should not be dumped into visible pages without editorial and quality filtering.

## 3. Strategic SEO Positioning

Recommended long-term positioning:

- Brand: StoryViewHub can remain the brand.
- Product category: public social media viewer and downloader tools.
- Primary authority anchor: Instagram public story viewing.
- Expansion model: platform-specific hubs plus individual working tool pages.

The site should avoid becoming a generic keyword directory. Each indexable page should satisfy a clear search intent with one of the following:

- A working tool.
- A high-quality platform/category overview that links to working tools.
- A genuinely helpful guide explaining limitations, legality, privacy, and usage.
- A support/privacy/safety page that strengthens trust.

## 4. Proposed URL Hierarchy

The hierarchy below is a future target design. None of these routes should be created until the corresponding page has a quality plan, metadata, internal links, and indexability decision.

### 4.1 Core Pages

```text
/
/about/
/contact/
/privacy/
/terms/
/copyright/
/safety/
```

Recommended indexability:

- `/` indexable.
- `/about/`, `/privacy/`, `/terms/`, `/copyright/`, `/safety/` indexable if written with unique, useful content.
- `/contact/` indexable or noindex depending on final content quality.

### 4.2 Platform Hub Pages

```text
/instagram/
/tiktok/
/youtube/
/pinterest/
/facebook/
/twitter/
/threads/
/snapchat/
/reddit/
/telegram/
/discord/
/twitch/
/linkedin/
/spotify/
/whatsapp/
```

Purpose:

- Explain what tools are available or planned for each platform.
- Link only to live, useful, indexable tools.
- Avoid claiming unavailable functionality.
- Provide safe-use guidance and public-content limitations.

Indexability rule:

- A platform hub is indexable only if it has at least one live child tool or enough unique editorial content to stand alone.
- Empty platform hubs should not be published.
- Thin placeholder hubs should be `noindex` or not routed.

### 4.3 Instagram Tool Pages

Instagram should be the first expansion area because the current product already matches this topic.

```text
/instagram/story-viewer/
/instagram/story-downloader/
/instagram/profile-viewer/
/instagram/reel-downloader/
/instagram/photo-downloader/
/instagram/video-downloader/
/instagram/highlight-viewer/
/instagram/anonymous-viewer/
```

Priority:

1. `/instagram/story-viewer/`
2. `/instagram/story-downloader/`
3. `/instagram/reel-downloader/`
4. `/instagram/profile-viewer/`
5. `/instagram/photo-downloader/`
6. `/instagram/video-downloader/`
7. `/instagram/highlight-viewer/`
8. `/instagram/anonymous-viewer/`

Implementation condition:

- Publish as indexable only when the page has a working tool or a clearly scoped function.
- If a feature is not supported, do not frame the page as a working tool.

### 4.4 TikTok Tool Pages

```text
/tiktok/video-downloader/
/tiktok/profile-viewer/
/tiktok/story-viewer/
/tiktok/photo-downloader/
/tiktok/sound-downloader/
```

Priority:

1. `/tiktok/video-downloader/`
2. `/tiktok/profile-viewer/`
3. `/tiktok/sound-downloader/`
4. `/tiktok/story-viewer/`
5. `/tiktok/photo-downloader/`

Risk note:

- TikTok downloader pages should clearly explain public content, copyright, and user responsibility.
- Do not publish a TikTok story viewer unless the tool actually supports that use case.

### 4.5 YouTube Tool Pages

```text
/youtube/thumbnail-downloader/
/youtube/shorts-downloader/
/youtube/video-downloader/
/youtube/title-generator/
/youtube/description-generator/
```

Priority:

1. `/youtube/thumbnail-downloader/`
2. `/youtube/title-generator/`
3. `/youtube/description-generator/`
4. `/youtube/shorts-downloader/`
5. `/youtube/video-downloader/`

Risk note:

- Video download intent can be copyright-sensitive. Prefer thumbnail, metadata, and creator utility tools before full video download tools.

### 4.6 Pinterest Tool Pages

```text
/pinterest/image-downloader/
/pinterest/video-downloader/
/pinterest/board-viewer/
/pinterest/pin-downloader/
```

Priority:

1. `/pinterest/image-downloader/`
2. `/pinterest/video-downloader/`
3. `/pinterest/pin-downloader/`
4. `/pinterest/board-viewer/`

### 4.7 Facebook Tool Pages

```text
/facebook/video-downloader/
/facebook/story-viewer/
/facebook/reel-downloader/
/facebook/profile-viewer/
```

Priority:

1. `/facebook/video-downloader/`
2. `/facebook/reel-downloader/`
3. `/facebook/story-viewer/`
4. `/facebook/profile-viewer/`

Risk note:

- Strong privacy and public-content disclaimers are required.
- Private profiles, locked posts, or account-bypass language should be avoided.

### 4.8 X/Twitter Tool Pages

Recommended path uses `/twitter/` for readability and keyword recognition. Copy can mention X.

```text
/twitter/video-downloader/
/twitter/profile-viewer/
/twitter/thread-reader/
/twitter/media-downloader/
```

Priority:

1. `/twitter/video-downloader/`
2. `/twitter/thread-reader/`
3. `/twitter/media-downloader/`
4. `/twitter/profile-viewer/`

### 4.9 Other Platform Pages

These should be lower priority unless keyword and tool feasibility data justify them:

```text
/threads/profile-viewer/
/snapchat/story-viewer/
/reddit/video-downloader/
/telegram/channel-viewer/
/discord/server-tools/
/twitch/clip-downloader/
/linkedin/profile-tools/
/spotify/playlist-tools/
/whatsapp/status-tools/
```

Publish only if:

- The tool is real.
- The legal and platform policy risks are understood.
- The page has unique value beyond a thin keyword match.

## 5. Page Type Model

Future pages should be typed before implementation.

### 5.1 Home Page

Path:

```text
/
```

Role:

- Primary brand and current Instagram Story Viewer entry point.
- Should remain focused, fast, and conversion-oriented.
- Should link to only the highest-priority live platform/tool pages.

SEO role:

- Brand + primary tool intent.
- Not a bulk keyword index.

### 5.2 Platform Hub Page

Example:

```text
/instagram/
```

Required content:

- Platform overview.
- List of available tools.
- Limitations and public-content policy.
- Internal links to child tools.
- FAQ specific to the platform.

Indexability:

- Index only if unique and useful.

### 5.3 Tool Page

Example:

```text
/instagram/story-viewer/
```

Required content:

- Working tool interface.
- Clear H1 matching the tool.
- One primary CTA.
- How it works.
- Supported inputs.
- Public/private limitations.
- FAQ.
- Related tools.
- Safety and copyright note where relevant.

Indexability:

- Index if the tool works and page has unique value.
- Noindex if the tool is disabled, unsupported, or placeholder.

### 5.4 Guide Page

Example:

```text
/guides/how-to-view-instagram-stories-anonymously/
```

Role:

- Informational content that supports tool pages.
- Should not masquerade as a tool.

Indexability:

- Index only for substantial evergreen guides.

### 5.5 User/Profile Page

Current pattern:

```text
/user/:username
```

Recommendation:

- Keep strict validation.
- Keep unknown users as `404` and `noindex`.
- Do not add arbitrary profile pages to sitemap.
- Consider noindex for all user pages unless real profile data and unique content quality can be guaranteed.

## 6. URL Naming Rules

Use stable, lowercase, hyphenated URLs:

- Good: `/instagram/story-viewer/`
- Good: `/youtube/thumbnail-downloader/`
- Avoid: `/InstagramStoryViewer`
- Avoid: `/instagram_story_viewer`
- Avoid query URLs for indexable tools.

Trailing slash strategy:

- Prefer trailing slashes for content/tool pages.
- Pick one format and enforce it with redirects in a future implementation.
- Canonicals should match the chosen trailing slash format.

No indexable search-result URLs:

- Keep `/result` noindex.
- Do not index query URLs like `/?username=...`.
- Do not add query URLs to sitemap.

## 7. Internal Linking Structure

### 7.1 Header Navigation

Future top-level navigation should remain small:

```text
Home
Instagram
TikTok
YouTube
Pinterest
Tools
Guides
```

Do not list every tool in the main nav. Use platform pages and tool hubs for deeper discovery.

### 7.2 Home Page Links

The home page should link to:

- Current primary tool.
- 3-6 highest-priority platform/tool pages only after they exist.
- Safety/privacy pages if relevant.

Avoid:

- Massive keyword blocks.
- Footer-only link dumps.
- Links to placeholder pages.

### 7.3 Platform Hub Links

Each platform hub should link to:

- Its live child tool pages.
- Closely related guides.
- Adjacent platform hubs only where useful.

Example Instagram hub links:

```text
/instagram/story-viewer/
/instagram/story-downloader/
/instagram/reel-downloader/
/guides/instagram-public-vs-private-stories/
```

### 7.4 Tool Page Links

Each tool page should link to:

- Parent platform hub.
- 2-5 related tools.
- 1-3 relevant guides.
- Privacy/safety/copyright page where relevant.

### 7.5 Footer Links

Footer should include:

- Home
- Primary tools
- Privacy
- Terms
- Copyright
- Safety
- Contact

Avoid:

- Hundreds of keyword links.
- Links to noindex pages.
- Links to non-existent platform pages.

## 8. Breadcrumb Strategy

Use breadcrumbs for platform hubs, tools, and guides.

Home page:

```text
No breadcrumb required
```

Platform hub:

```text
Home > Instagram
```

Tool page:

```text
Home > Instagram > Instagram Story Viewer
```

Guide page:

```text
Home > Guides > How to View Instagram Stories Anonymously
```

Future structured data:

- Add `BreadcrumbList` schema only when breadcrumb UI is visible.
- Do not add breadcrumb schema for pages without visible breadcrumbs.
- Breadcrumb URLs must match canonical URLs.

## 9. Canonical Strategy

### 9.1 Self-Canonical Pages

All indexable stable pages should self-canonical:

```text
/
/instagram/
/instagram/story-viewer/
/tiktok/video-downloader/
```

### 9.2 No Canonical on 404/Noindex Error Pages

Current Phase 1 behavior is correct:

- Unknown user pages should be `404`.
- Error pages should be `noindex, nofollow`.
- Error pages should not canonical to home.

### 9.3 Query and Transitional URLs

Rules:

- `/result` remains noindex.
- Query URLs are not canonical targets.
- Tool input/result states should not create indexable URLs unless they represent a curated static content page.

### 9.4 Duplicate Tool Intent

Some queries overlap:

- `instagram story viewer`
- `anonymous instagram story viewer`
- `ig story viewer`
- `story viewer instagram`

Recommendation:

- One canonical tool page should target the main intent.
- Variations should be handled in page copy, FAQ, and internal anchors, not separate near-duplicate pages.

Example:

```text
Canonical page: /instagram/story-viewer/
Do not create: /instagram/anonymous-story-viewer/ unless meaningfully different
```

## 10. Metadata Strategy

Metadata should be generated from a structured page registry in the future.

Recommended fields:

```text
id
type
platform
slug
pathname
canonicalPathname
indexable
title
description
h1
primaryIntent
secondaryIntents
schemaTypes
sitemapGroup
priority
changefreq
requiresWorkingTool
status
```

### 10.1 Title Rules

Pattern for platform hubs:

```text
{Platform} Tools - View, Download and Explore Public Content
```

Pattern for tool pages:

```text
{Platform} {Tool Name} - {Primary Benefit}
```

Examples:

```text
Instagram Story Viewer - View Stories Anonymously
TikTok Video Downloader - Save Public TikTok Videos
YouTube Thumbnail Downloader - Get Video Thumbnails
```

Rules:

- Keep titles under roughly 55-65 characters when possible.
- Do not stuff every platform into one title.
- Match the real page function.

### 10.2 Meta Description Rules

Descriptions should:

- State the exact tool or page purpose.
- Mention public-content limitations where relevant.
- Avoid unsupported claims.
- Avoid private account, hacking, password, or fake engagement claims.

### 10.3 H1 Rules

One H1 per page.

Examples:

```text
Instagram Story Viewer
TikTok Video Downloader
Pinterest Image Downloader
```

### 10.4 Open Graph and Twitter

Future improvements:

- Add platform/tool-specific `og:image`.
- Keep `og:type=website` for tools and hubs.
- Use the canonical URL as `og:url`.

Do not add OG images until assets exist.

## 11. Schema Strategy

Current schema:

- `WebPage` via shared SEO helper.
- `FAQPage` on home page.

Future schema by page type:

Platform hub:

- `WebPage`
- Optional `FAQPage` if visible FAQ exists.
- Optional `BreadcrumbList` if visible breadcrumbs exist.

Tool page:

- `WebApplication` or `SoftwareApplication` only if the tool is genuinely functional.
- `FAQPage` if visible FAQ exists.
- `BreadcrumbList` if visible breadcrumbs exist.

Guide page:

- `Article` or `BlogPosting`.
- `FAQPage` only if visible FAQ exists.
- `BreadcrumbList` if visible breadcrumbs exist.

Avoid:

- Fake product ratings.
- Fake reviews.
- Schema for hidden content.
- FAQ schema without visible FAQ.

## 12. Sitemap Architecture

Current sitemap:

```text
/sitemap.xml
```

Current content:

- Home page only.

Future architecture should move to a sitemap index when the site grows.

### 12.1 Sitemap Index

```text
/sitemap.xml
```

As sitemap index:

```text
/sitemaps/core.xml
/sitemaps/platforms.xml
/sitemaps/tools.xml
/sitemaps/guides.xml
```

Do not add:

- `/result`
- `/api/*`
- Unknown `/user/*`
- Noindex pages
- 404 pages
- Placeholder tool pages
- Query URLs

### 12.2 Core Sitemap

```text
/
/about/
/privacy/
/terms/
/copyright/
/safety/
```

### 12.3 Platform Sitemap

Only live, indexable platform hubs:

```text
/instagram/
/tiktok/
/youtube/
/pinterest/
```

### 12.4 Tool Sitemap

Only live, indexable tool pages:

```text
/instagram/story-viewer/
/instagram/story-downloader/
/youtube/thumbnail-downloader/
```

### 12.5 Guide Sitemap

Only substantial indexable guides:

```text
/guides/how-to-view-instagram-stories-anonymously/
/guides/public-vs-private-social-media-content/
```

### 12.6 Lastmod Rules

Do not dynamically set `lastmod` to the current request time.

Allowed sources:

- Git commit date.
- Build timestamp for a changed content bundle.
- Manual updated date in page registry.

If reliable update date is unavailable, omit `lastmod`.

## 13. Robots and Indexability Matrix

```text
Page type                   Status     Robots
Home                        200        index, follow
Platform hub with content    200        index, follow
Platform placeholder         404/none   not published
Working tool page            200        index, follow
Disabled tool page           200/503    noindex, nofollow
Guide page                   200        index, follow
Thin guide                   none       not published
Result route                 303/404    noindex via header
API route                    200        not in sitemap
Unknown user                 404        noindex, nofollow
Known user, weak content      200        consider noindex
Known user, unique content    200        index only after quality review
```

## 14. Keyword and Content Clustering

`all_keywords.txt` should be treated as research input, not as direct page copy.

Recommended clustering dimensions:

- Platform.
- Tool type.
- Search intent.
- Risk level.
- Language.
- Required feature.
- Content type: tool, guide, support, no-go.

### 14.1 Platform Clusters

```text
Instagram
TikTok
YouTube
Pinterest
Facebook
Twitter/X
Threads
Snapchat
Reddit
Telegram
Discord
Twitch
LinkedIn
Spotify
WhatsApp
Other
```

### 14.2 Intent Clusters

```text
Viewer
Story
Profile
Downloader
Video downloader
Image/photo downloader
Reels/Shorts
Followers/likes/comments/views
Free engagement
Login/account
Analytics/statistics
How-to guide
Navigational
Risky or unsupported
Unclear
```

### 14.3 No-Go or Noindex Clusters

Queries involving the following should not become tool pages unless there is a compliant, truthful, and safe implementation:

- Password access.
- Hacking.
- Private profile viewing.
- Private story viewing.
- Fake followers.
- Free followers.
- Free likes.
- Buying followers or subscribers.
- Bots or generators promising artificial engagement.

These can be handled only in safety/education content if useful and compliant.

## 15. Future Tool Integration Model

Each new tool should pass a launch checklist before routing.

### 15.1 Tool Registry

Create a future central registry rather than hardcoding scattered route metadata.

Recommended registry fields:

```text
id
platform
toolType
slug
pathname
title
description
h1
summary
status: draft | live | disabled
indexable
requiresApi
apiProvider
inputType
outputType
riskLevel
canonicalPathname
sitemapGroup
relatedTools
relatedGuides
faqItems
schemaTypes
```

### 15.2 Tool Launch Requirements

A tool should not be indexable until all are true:

- Route exists.
- SSR page exists.
- Metadata exists.
- Self-canonical exists.
- Tool interface works or limitation is clearly explained.
- No unsupported claims.
- Internal links exist from parent hub.
- Breadcrumb exists.
- FAQ exists where useful.
- Sitemap inclusion is intentional.
- Error and empty states are noindex or not crawlable where appropriate.

### 15.3 Tool Failure Behavior

If a tool depends on an external provider:

- Temporary upstream outage: show a useful 200 page if the tool page itself remains useful, but tool result state should not be indexed.
- Permanently unavailable feature: noindex or remove route.
- Unsupported input: validation error, no indexable result URL.

## 16. Result and Dynamic State Strategy

Current `/result` and `/user/:username` patterns should remain isolated from the future SEO content system.

Rules:

- Tool result states should be rendered in-place or via noindex result routes.
- Do not create crawlable URLs for arbitrary user-entered values.
- Do not add generated result pages to sitemap.
- Do not allow query parameters to create duplicate indexable pages.

If future static curated examples are needed, use manually reviewed pages:

```text
/examples/instagram-public-story-viewer/
```

But only if the content is evergreen and unique.

## 17. Internationalization Strategy

Do not mix all languages on one SEO page.

Future options:

### 17.1 Single-Language Initial Launch

Start with English-only platform and tool pages.

Use:

```text
<html lang="en">
```

No hreflang needed until localized pages exist.

### 17.2 Future Localized Hubs

Potential structure:

```text
/es/instagram/visor-de-historias/
/pt/instagram/visualizador-de-stories/
/de/instagram/story-viewer/
/fr/instagram/visionneuse-story/
/tr/instagram/hikaye-goruntuleyici/
```

Rules:

- Only publish localized pages with human-reviewed copy.
- Add hreflang clusters only when equivalent pages exist.
- Canonical should point to the same-language URL, not English.
- Do not machine-translate unsupported tool claims.

## 18. Navigation Rollout Phases

### Phase A: Preserve Current Home

- Keep current home as primary Instagram Story Viewer.
- No new navigation links until pages exist.

### Phase B: Add Instagram Hub and Tool Pages

Future implementation:

```text
/instagram/
/instagram/story-viewer/
/instagram/story-downloader/
```

Internal links:

- Home links to Instagram Story Viewer and Instagram hub.
- Instagram hub links to child tools.
- Tool pages link back to Instagram hub.

### Phase C: Add YouTube and TikTok Tools

Future implementation:

```text
/youtube/thumbnail-downloader/
/tiktok/video-downloader/
```

Only after working tool logic or clear compliant functionality exists.

### Phase D: Expand Platform Hubs

Add more platform hubs only when each has real content and at least one useful child.

### Phase E: Add Localized Pages

Only after English architecture is stable.

## 19. Page Priority Roadmap

Recommended priority order:

1. Strengthen `/` as the current Instagram Story Viewer.
2. `/instagram/story-viewer/`
3. `/instagram/story-downloader/`
4. `/instagram/`
5. `/youtube/thumbnail-downloader/`
6. `/tiktok/video-downloader/`
7. `/pinterest/image-downloader/`
8. `/instagram/reel-downloader/`
9. `/guides/public-vs-private-social-media-content/`
10. `/safety/`

Lower priority:

- Threads tools.
- Snapchat tools.
- Telegram tools.
- Discord tools.
- Spotify tools.
- LinkedIn tools.
- WhatsApp tools.

Avoid until compliance is clear:

- Private viewer pages.
- Free follower pages.
- Fake engagement pages.
- Password/login bypass pages.
- Hack/generator pages.

## 20. Quality Gates

Before any future SEO route is shipped, require:

- Unique purpose.
- Clear primary intent.
- Working feature or honest editorial page.
- No unsupported claims.
- Unique title and description.
- One H1.
- Self-canonical if indexable.
- Noindex if placeholder, unsupported, or thin.
- Breadcrumb if nested.
- Internal links from relevant parent.
- Sitemap inclusion only if indexable.
- Mobile usability review.
- HTML payload size review.
- Monetization review.
- Legal/privacy risk review.

## 21. Suggested Technical Implementation Approach

When implementation is approved, prefer incremental changes:

1. Create a page registry module.
2. Create route handlers from registry entries.
3. Create platform hub renderer.
4. Create tool page renderer.
5. Extend SEO helper to accept page registry metadata.
6. Add breadcrumb renderer.
7. Add sitemap builders by page type.
8. Add tests for metadata, canonical, robots, and sitemap inclusion.

Do not:

- Add all routes manually in an unstructured way.
- Create pages from raw keyword lists.
- Add sitemap URLs before pages are reviewed.
- Add navigation links to pages that do not exist.

## 22. Testing Plan for Future Implementation

Future tests should verify:

- Every indexable page has status 200.
- Every indexable page has exactly one H1.
- Every indexable page has canonical matching pathname.
- No noindex page appears in sitemap.
- No 404 appears in sitemap.
- No redirect URL appears in sitemap.
- `/result` remains noindex.
- Unknown `/user/*` remains 404 noindex.
- Platform hub breadcrumbs match URL hierarchy.
- Tool pages link to parent hub.
- Page titles are unique.
- Meta descriptions are unique.
- Sitemap index references only existing sitemap files.

## 23. Metrics to Monitor After Future Launch

Search Console:

- Indexed pages by sitemap group.
- Crawled but not indexed.
- Duplicate without user-selected canonical.
- Soft 404.
- Alternate page with proper canonical.
- Page with redirect.
- Not found 404.

Analytics:

- Tool usage by platform.
- Search-to-tool conversion rate.
- Ad interaction by page type.
- Bounce rate by intent.
- Mobile conversion.

Performance:

- HTML size.
- LCP.
- INP.
- CLS.
- Third-party script impact.

## 24. Summary Recommendation

StoryViewHub should expand through a controlled platform-and-tool hierarchy rather than keyword dumps or arbitrary dynamic pages.

Recommended first future architecture:

```text
/
/instagram/
/instagram/story-viewer/
/instagram/story-downloader/
/instagram/reel-downloader/
/youtube/thumbnail-downloader/
/tiktok/video-downloader/
/pinterest/image-downloader/
/guides/public-vs-private-social-media-content/
/safety/
```

The current home page should remain the primary Instagram Story Viewer entry point until new tool pages are implemented and verified.

The strongest architectural rule is simple:

Only index pages that are useful, truthful, working, internally linked, and intentionally included in sitemap.
