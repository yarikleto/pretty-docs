# TASK-012: Article page CSS — inline code, tables, links, and nav
**Milestone:** 2 — Article Page Polish
**Status:** `TODO`
**Size:** M | **Type:** feature
**Depends on:** TASK-001
**Blocks:** TASK-019

**Goal:** Remaining Starlight CSS overrides for inline code, markdown tables, link colors, nav bar, breadcrumbs, and prev/next navigation all match the design spec.

**Acceptance Criteria:**
- [ ] Inline code (`code:not(pre code)`) styled: JetBrains Mono, 0.875rem, `bg surface-100`, `color brand-700` (light) / `bg rgba(76, 110, 245, 0.15)`, `color #91a7ff` (dark), `px-1.5 py-0.5 rounded`
- [ ] Markdown tables: `border-radius: 12px`, overflow hidden, header bg `surface-100`, header text uppercase 13px weight 600, body cells 15px, proper dark mode colors
- [ ] Links in article body: `color brand-600` (light) / `brand-400` (dark)
- [ ] Nav bar: backdrop blur, sticky, correct height
- [ ] Breadcrumbs: correct text colors and separator styling
- [ ] Prev/Next navigation: styled per design spec with hover arrow animation

**Visual Criteria:**
- [ ] Table container has `border: 1px solid surface-200`, `border-collapse: separate`, `border-spacing: 0`
- [ ] Inline code in tables: `bg brand-50`, `color brand-700`, smaller font
- [ ] Dark mode: all elements respond correctly

**Suggested Approach:** Add remaining CSS override sections to `custom.css`. Test with markdown content in the placeholder article (add a table, inline code, and links).

**Cycle:** developer → reviewer
