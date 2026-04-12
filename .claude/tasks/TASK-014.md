# TASK-014: RfcToggle component — collapsible original RFC text panel
**Milestone:** 3 — Custom Article Components & Diagrams
**Status:** `DONE`
**Size:** S | **Type:** feature
**Depends on:** TASK-010
**Blocks:** TASK-019

**Goal:** A button that expands/collapses a panel showing the original RFC text for a given section, allowing readers to compare the Pretty Docs explanation with the source material.

**Acceptance Criteria:**
- [x] `src/components/article/RfcToggle.astro` accepts props: `section` (string), optional `label` (string, defaults to "See original RFC text")
- [x] Default slot receives the pre-formatted RFC text content
- [x] Click toggles panel visibility. Button text alternates between "See original RFC text" and "Hide original RFC text"
- [x] Panel is collapsed by default
- [x] Client-side toggle works via vanilla JS `<script>` tag (no framework)

**Visual Criteria:**
- [x] Toggle button: `text-xs`, `border border-surface-300`, `bg white`, `rounded-md`, `px-3 py-1`. Active (open): `bg brand-50`, `border-brand-200`, `color brand-600`
- [x] Panel: `rounded-xl`, `border border-surface-200`, header shows "RFC 959, Section {X.X.X}" in mono font, body has RFC text in `Courier New` 13px, bg `#f8f9fa`
- [x] Dark mode: button and panel adapt per design spec section 2.5

**Cycle:** developer → reviewer
