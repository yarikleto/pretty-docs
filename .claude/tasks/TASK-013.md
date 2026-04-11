# TASK-013: ArticleMeta component — source badge, view original link, reading time
**Milestone:** 3 — Custom Article Components & Diagrams
**Status:** `TODO`
**Size:** S | **Type:** feature
**Depends on:** TASK-010
**Blocks:** TASK-019

**Goal:** An Astro component that renders the article metadata row (source badge, "view original" link, reading time) below the article description, integrating visually with Starlight's article header.

**Acceptance Criteria:**
- [ ] `src/components/article/ArticleMeta.astro` accepts props: `source` (string), `sourceUrl` (string), `readingTime` (string)
- [ ] Renders: source badge pill with document icon + text (e.g., "Based on RFC 959, Section 3"), "View original" link with external icon opening `sourceUrl`, pipe separator, reading time text
- [ ] Component integrates into the article header flow (appears after Starlight's auto-rendered description)
- [ ] Dark mode: correct colors per design spec

**Visual Criteria:**
- [ ] Source badge: `text-xs text-surface-400 bg-surface-100 px-2.5 py-1 rounded-md` with 12x12 document icon
- [ ] View original: `text-xs text-brand-600` with 10x10 external link icon
- [ ] Separator: `|` in `text-surface-300`
- [ ] Reading time: `text-xs text-surface-400`
- [ ] Meta row: `mt-5`, `flex flex-wrap items-center gap-3`

**Cycle:** developer → reviewer
