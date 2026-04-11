# TASK-011: Article page CSS — callout/aside overrides
**Milestone:** 2 — Article Page Polish
**Status:** `TODO`
**Size:** S | **Type:** feature
**Depends on:** TASK-001
**Blocks:** TASK-019

**Goal:** Starlight's built-in Aside component renders with the correct Note (blue) and Important (amber) styling per the design spec.

**Acceptance Criteria:**
- [ ] `:::note` asides render with: `bg #f0f4ff`, `border-left: 3px solid #4c6ef5`, `rounded-xl` (12px), info icon
- [ ] `:::caution` asides render with: `bg #fff3e0`, `border-left: 3px solid #f59f00`, `rounded-xl` (12px), warning icon
- [ ] Callout headings and body text use correct font sizes and colors per design spec
- [ ] Dark mode: note uses `rgba(76, 110, 245, 0.1)` bg with `#748ffc` border; caution uses `rgba(245, 159, 0, 0.1)` bg with `#fcc419` border

**Visual Criteria:**
- [ ] Callout padding: `1.25rem 1.5rem` (20px 24px)
- [ ] Layout: icon left (18x18), content right with `gap-3`
- [ ] Heading: `text-sm font-semibold mb-1`
- [ ] Body: `text-sm leading-relaxed`

**Suggested Approach:** Override `.starlight-aside--note` and `.starlight-aside--caution` in `custom.css`. Test by adding `:::note` and `:::caution` blocks to the placeholder FTP article.

**Cycle:** developer → reviewer
