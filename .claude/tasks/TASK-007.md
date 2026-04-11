# TASK-007: Landing page before/after comparison section
**Milestone:** 1 — Landing Page
**Status:** `DONE`
**Size:** M | **Type:** feature
**Depends on:** TASK-002
**Blocks:** nothing

**Goal:** The before/after comparison section shows RFC 959 plaintext vs Pretty Docs formatted version side-by-side, demonstrating the core value proposition.

**Acceptance Criteria:**
- [x] `src/components/landing/BeforeAfter.astro` renders: centered heading "Same content. Radically different experience.", subtitle, and two side-by-side cards
- [x] "Before" card shows monospaced RFC 959 text with red dot indicator, "BEFORE" label, and URL hint
- [x] "After" card shows the Pretty Docs formatted version with blue dot indicator, "AFTER" label, and URL hint
- [x] Cards are in a 2-column grid on desktop, stack on mobile
- [x] Section has `border-top` separator and `py-20` spacing

**Visual Criteria:**
- [x] Before card: `rounded-2xl`, `border-surface-200`, header `bg-surface-100`. RFC text in `Courier New`, `text-xs` (11px), `white-space: pre-wrap`, bg `#f8f9fa`
- [x] After card: `rounded-2xl`, `border-brand-200`, `shadow-sm shadow-brand-100`, header `bg-brand-50`
- [x] Red dot: `w-3 h-3 rounded-full bg-red-400`. Blue dot: `w-3 h-3 rounded-full bg-brand-500`
- [x] Dark mode: borders shift to `dark-border`, headers to `dark-surface`, after card border becomes `rgba(76, 110, 245, 0.3)`

**Cycle:** developer → reviewer
