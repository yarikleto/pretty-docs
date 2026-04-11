# TASK-004: Walking skeleton end-to-end — diagram + source citation in article
**Milestone:** 0 — Walking Skeleton
**Status:** `DONE`
**Size:** S | **Type:** feature
**Depends on:** TASK-003
**Blocks:** nothing (completes Milestone 0)

**Goal:** The thinnest vertical slice of the article reading experience: one SVG diagram and one source citation rendered in the FTP article, proving the custom component pipeline works end-to-end (MDX imports Astro component, component renders, dark mode adapts).

**Acceptance Criteria:**
- [x] A minimal `SourceRef.astro` component renders an inline source citation with left border, section reference text, and optional quote
- [x] A minimal SVG diagram Astro component (can be a simplified version of ThreeDimensions or BlockHeader) renders inline SVG in the article
- [x] The diagram adapts to dark mode via CSS classes (`.diagram-bg`, `.diagram-card`, `.diagram-text-primary`)
- [x] Both components are imported and used in `ftp-data-transfer.mdx`

**Visual Criteria:**
- [x] Source citation has `border-left: 2px solid surface-300`, `font-size: 0.75rem`, `color: surface-600`
- [x] Diagram sits inside a `bg-surface-50 rounded-2xl` container with padding

**Suggested Approach:** Build minimal versions of SourceRef and one diagram component. These will be refined in later tasks (TASK-015 for SourceRef polish, TASK-017/TASK-018 for full diagrams). The goal here is proving the pipeline, not pixel-perfection.

**Cycle:** developer → reviewer
