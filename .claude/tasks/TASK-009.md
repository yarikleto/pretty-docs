# TASK-009: Landing page CTA section and footer
**Milestone:** 1 — Landing Page
**Status:** `TODO`
**Size:** S | **Type:** feature
**Depends on:** TASK-002
**Blocks:** nothing

**Goal:** The bottom CTA section with category tags and action buttons, plus the site footer, complete the landing page.

**Acceptance Criteria:**
- [ ] `src/components/landing/Cta.astro` renders: heading "Start reading. Or start writing.", subtitle, category tags, and two buttons ("Browse articles" primary, "Contribution guide" secondary)
- [ ] Category tags rendered as pills: Protocols, C Libraries, Mathematics, Standards, Unix / POSIX, Cryptography, File Formats, Compression
- [ ] Tags are not clickable (cursor: default) but have hover state
- [ ] `src/components/landing/LandingFooter.astro` renders: logo, license info (CC BY-SA content, MIT code), and links to GitHub and Contribute

**Visual Criteria:**
- [ ] Tags: `rounded-full`, `border-surface-200`, `text-surface-700`, `bg-white` (light). Hover: `border-brand-200`, `color-brand-700`, `bg-brand-50`
- [ ] CTA section: `py-16`, centered content
- [ ] Footer: `bg-surface-50`, `border-t`, `py-8`, compact layout
- [ ] Dark mode: tags use `dark-surface2` bg, `dark-border` border, adjusted hover states

**Cycle:** developer → reviewer
