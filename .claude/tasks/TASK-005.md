# TASK-005: Landing page navigation bar
**Milestone:** 1 — Landing Page
**Status:** `DONE`
**Size:** S | **Type:** feature
**Depends on:** TASK-002
**Blocks:** nothing

**Goal:** The landing page has a sticky navigation bar with logo, links, GitHub icon, and dark mode toggle that matches the v2 prototype.

**Acceptance Criteria:**
- [x] `src/components/landing/LandingNav.astro` renders: logo (icon + "Pretty Docs" text), "Articles" link, "Contribute" link, GitHub icon link, and dark mode toggle button
- [x] Nav is sticky (`position: sticky; top: 0`), has backdrop blur (`backdrop-blur-sm`), 80% opacity background, and bottom border
- [x] Dark mode toggle writes to `localStorage` key `starlight-theme` and toggles `data-theme` on `<html>` (syncs with Starlight)
- [x] Nav height is 64px (`h-16`)

**Visual Criteria:**
- [x] Logo: `w-7 h-7 bg-brand-600 rounded-lg` icon container with document SVG, "Pretty Docs" text in `font-semibold`
- [x] Nav background: `bg-white/80` (light) / `bg-dark-bg/80` (dark) with `backdrop-blur-sm`
- [x] Border bottom: `border-surface-200` (light) / `dark-border` (dark)
- [x] Links: `text-surface-600` with hover `text-surface-900` (light)

**Suggested Approach:** Create as a self-contained component used in `src/pages/index.astro`. Use scoped styles or inline styles. The toggle should use sun/moon icons.

**Cycle:** developer → reviewer
