# TASK-002: Landing page layout shell and dark mode sync
**Milestone:** 0 — Walking Skeleton
**Status:** `TODO`
**Size:** S | **Type:** feature
**Depends on:** TASK-001
**Blocks:** TASK-003, TASK-005, TASK-006, TASK-007, TASK-008, TASK-009

**Goal:** Create the standalone landing page at `src/pages/index.astro` with its own layout that shares fonts and dark mode state with Starlight. The page should render a minimal placeholder hero with a working link to the article page.

**Acceptance Criteria:**
- [ ] `src/layouts/Landing.astro` exists with HTML shell, font loading (same Google Fonts as Starlight config), meta tags, and inline dark mode detection script that reads from `localStorage` key `starlight-theme` and falls back to `prefers-color-scheme`
- [ ] `src/pages/index.astro` uses the Landing layout and renders a placeholder hero with the headline "Old docs are ugly. These aren't." and a "Browse articles" link that navigates to `/networking/ftp-data-transfer/`
- [ ] Dark mode state persists between the landing page and Starlight article pages (toggling on one is reflected on the other)
- [ ] `src/content/docs/index.mdx` is removed (landing page is now at `src/pages/index.astro`)

**Visual Criteria:** N/A (skeleton — visual polish comes in TASK-005 through TASK-009)

**Suggested Approach:** Follow system design section 6. The inline dark mode script must be render-blocking (in `<head>`) to prevent flash of wrong theme. Share CSS custom properties with the same design tokens as `custom.css`.

**Cycle:** developer → reviewer
