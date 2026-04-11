# TASK-015: SourceRef and SourceCard components — source citations
**Milestone:** 3 — Custom Article Components & Diagrams
**Status:** `TODO`
**Size:** S | **Type:** feature
**Depends on:** TASK-010
**Blocks:** TASK-019

**Goal:** Two source citation components — an inline citation for use after diagrams/claims, and an end-of-article source card with links to the original specification.

**Acceptance Criteria:**
- [ ] `src/components/article/SourceRef.astro` accepts props: `section` (string), optional `quote` (string). Renders "RFC 959, Section X.X" with optional quoted text, left-bordered
- [ ] `src/components/article/SourceCard.astro` accepts props: `title` (string), `description` (string), `links` (array of `{label, href}`). Renders a card with document icon, title, description, and external links
- [ ] Both components render correctly in light and dark mode

**Visual Criteria:**
- [ ] SourceRef: `border-left: 2px solid surface-300`, `pl-3`, `text-xs`, `color surface-600`. Dark: `border dark-border`, `color #6b6e82`
- [ ] SourceCard: `rounded-xl`, `border border-surface-200`, `p-6`, document icon `w-10 h-10 rounded-xl bg-surface-100`. Links in `text-brand-600 font-medium` with external icons and pipe separators

**Suggested Approach:** If a minimal SourceRef was created in TASK-004 (walking skeleton), refine it here to match the full design spec. Build SourceCard fresh.

**Cycle:** developer → reviewer
