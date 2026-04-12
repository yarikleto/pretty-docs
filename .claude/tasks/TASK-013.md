# TASK-013: ArticleMeta component — source badge, view original link, reading time
**Milestone:** 3 — Custom Article Components & Diagrams
**Status:** `DONE`
**Size:** S | **Type:** feature
**Depends on:** TASK-010
**Blocks:** TASK-019

**Goal:** An Astro component that renders the article metadata row (source badge, "view original" link, reading time) below the article description, integrating visually with Starlight's article header.

**Acceptance Criteria:**
- [x] `src/components/article/ArticleMeta.astro` accepts props: `source` (string), `sourceUrl` (string), `readingTime` (string)
- [x] Renders: source badge pill with document icon + text (e.g., "Based on RFC 959, Section 3"), "View original" link with external icon opening `sourceUrl`, pipe separator, reading time text
- [x] Component integrates into the article header flow (appears after Starlight's auto-rendered description)
- [x] Dark mode: correct colors per design spec

**Visual Criteria:**
- [x] Source badge: `text-xs text-surface-400 bg-surface-100 px-2.5 py-1 rounded-md` with 12x12 document icon
- [x] View original: `text-xs text-brand-600` with 10x10 external link icon
- [x] Separator: `|` in `text-surface-300`
- [x] Reading time: `text-xs text-surface-400`
- [x] Meta row: `mt-5`, `flex flex-wrap items-center gap-3`

**Cycle:** developer → reviewer
