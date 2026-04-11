# TASK-008: Landing page features grid section
**Milestone:** 1 — Landing Page
**Status:** `DONE`
**Size:** S | **Type:** feature
**Depends on:** TASK-002
**Blocks:** nothing

**Goal:** The features section displays three value propositions (Curated, Visual, Sourced) in a responsive grid.

**Acceptance Criteria:**
- [x] `src/components/landing/Features.astro` renders: centered heading "Documentation, reimagined.", description paragraph, and three feature cards in a grid
- [x] Each card has: icon in a rounded container, title (bold), and description text
- [x] Three features: "Curated, not generated", "Visual where it matters", "Always sourced"
- [x] Section has `bg-surface-50` background, `border-top`, and `py-20`

**Visual Criteria:**
- [x] Feature icons: `w-10 h-10 rounded-xl bg-brand-100` with blue SVG icons inside
- [x] 3-column grid on desktop (`max-w-4xl`), responsive stack on mobile
- [x] Dark mode: `bg-dark-surface` background, icon bg adjusts

**Cycle:** developer → reviewer
