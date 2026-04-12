# TASK-022: Final polish — responsiveness, accessibility, cross-browser, build verification
**Milestone:** 4 — FTP Article Content & Contributing Pages
**Status:** `IN_PROGRESS`
**Size:** M | **Type:** polish
**Depends on:** TASK-019, TASK-020, TASK-021
**Blocks:** nothing (final task)

**Goal:** Final quality pass ensuring the site is production-ready: responsive on all screen sizes, accessible, works across browsers, builds successfully, and has no visual regressions.

**Acceptance Criteria:**
- [ ] Landing page responsive: hero, before/after cards, features grid, and CTA section all look correct on mobile (375px), tablet (768px), and desktop (1280px+)
- [ ] Article page responsive: Starlight handles sidebar collapse on mobile (verify it works correctly with our CSS overrides)
- [ ] Dark mode: no flash of wrong theme on any page load, smooth 300ms transitions, no elements missed
- [ ] Accessibility: keyboard navigation works for sidebar, TOC, RFC toggles, and all links. Focus states visible. Color contrast meets WCAG AA
- [ ] `npm run build` succeeds with no errors. Built output is a static site ready for deployment
- [ ] All internal links work (landing → article, sidebar items, prev/next, contributing pages). All external links (RFC URLs, GitHub repo) are correct

**Visual Criteria:**
- [ ] Landing page matches v2 prototype screenshots at desktop width
- [ ] Article page matches v2 prototype screenshots at desktop width
- [ ] No visual regressions in dark mode compared to light mode

**Cycle:** developer → reviewer
