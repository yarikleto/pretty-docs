# TASK-010: Article page CSS — sidebar and TOC styling
**Milestone:** 2 — Article Page Polish
**Status:** `TODO`
**Size:** S | **Type:** feature
**Depends on:** TASK-001
**Blocks:** TASK-013, TASK-014, TASK-015, TASK-016, TASK-017, TASK-018

**Goal:** Starlight's left sidebar and right table of contents match the design spec tokens in both light and dark mode.

**Acceptance Criteria:**
- [ ] Left sidebar active item styled: `bg-brand-50 text-brand-700 font-medium rounded-lg` (light), appropriate dark equivalents
- [ ] Right TOC active link styled: `color brand-600` with `border-left: 2px solid brand-600`
- [ ] Sidebar width is `w-64` (256px), TOC width is `w-56` (224px)
- [ ] Sidebar category labels are uppercase 12px with wider tracking
- [ ] Dark mode: sidebar bg uses `dark-surface`, borders use `dark-border`

**Visual Criteria:**
- [ ] Match prototype screenshot `3-article-light.png` sidebar appearance
- [ ] TOC visible only on xl breakpoint, with `border-l` separator
- [ ] Scroll-aware TOC highlighting works (Starlight built-in, just styled)

**Suggested Approach:** All changes go in `src/styles/custom.css`. Target Starlight's CSS classes/selectors. Use browser dev tools on the running dev server to identify exact selectors.

**Cycle:** developer → reviewer
