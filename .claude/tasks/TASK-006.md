# TASK-006: Landing page hero section
**Milestone:** 1 — Landing Page
**Status:** `TODO`
**Size:** S | **Type:** feature
**Depends on:** TASK-002
**Blocks:** nothing

**Goal:** The landing page hero section displays the headline, subtitle, and two CTA buttons matching the v2 prototype.

**Acceptance Criteria:**
- [ ] `src/components/landing/Hero.astro` renders: h1 with "Old docs are ugly." on first line and "These aren't." on second line (second line in brand accent color), subtitle paragraph, and two buttons
- [ ] Primary button: "Browse articles" with right arrow, links to `/networking/ftp-data-transfer/`
- [ ] Secondary button: "View on GitHub" links to the GitHub repo
- [ ] Hero has gradient background per design spec

**Visual Criteria:**
- [ ] h1: `3rem` (48px), weight 800, line-height 1.1, tracking tight. Accent line in `brand-600` (light) / `brand-400` (dark)
- [ ] Subtitle: `1.125rem` (18px), weight 400, `color surface-600`
- [ ] Hero gradient: `linear-gradient(135deg, #f0f4ff 0%, #ffffff 50%, #f0f4ff 100%)` (light), `#1f2133 → #1a1b26 → #1f2133` (dark)
- [ ] Primary button: `bg-brand-600 text-white rounded-lg shadow-sm`, hover `bg-brand-700`
- [ ] Secondary button: `border border-surface-300 text-surface-700 rounded-lg`, hover bg change
- [ ] Padding: `pt-24 pb-20`, content `max-w-2xl` left-aligned

**Cycle:** developer → reviewer
