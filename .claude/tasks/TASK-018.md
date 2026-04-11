# TASK-018: SVG diagrams — ThreeDimensions and BlockHeader
**Milestone:** 3 — Custom Article Components & Diagrams
**Status:** `TODO`
**Size:** M | **Type:** feature
**Depends on:** TASK-010
**Blocks:** TASK-019

**Goal:** Two SVG diagram components that accurately visualize FTP concepts from RFC 959 and adapt to dark mode via CSS classes.

**Acceptance Criteria:**
- [ ] `src/components/diagrams/ThreeDimensions.astro` renders the TYPE/STRU/MODE overview diagram: three horizontal colored rows with inline option cards showing data types, structures, and modes
- [ ] `src/components/diagrams/BlockHeader.astro` renders the 3-byte block header format diagram: Descriptor (8 bits) and Byte Count (16 bits) as side-by-side labeled rectangles with bit position markers
- [ ] Both diagrams adapt to dark mode via CSS classes in `custom.css` (`.diagram-bg`, `.diagram-card`, `.diagram-text-primary`, `.diagram-text-secondary`, `.axis-card`, etc.)
- [ ] Diagram content is technically accurate to RFC 959 Section 3
- [ ] Diagrams are responsive (use viewBox for SVG scaling)

**Visual Criteria:**
- [ ] ThreeDimensions: TYPE row blue tint, STRU row green tint, MODE row amber tint. Card backgrounds white (light) / `#252740` (dark)
- [ ] BlockHeader: `fill #f0f4ff`, `stroke #4c6ef5`, bit position markers above, dashed separator, caption below
- [ ] Container: `bg-surface-50 rounded-2xl` with padding. Dark: `bg-dark-surface`

**Suggested Approach:** Extract SVG structure from the v2 prototype HTML (`prototypes/v2/index.html`) and adapt into Astro components. Replace inline styles with CSS classes for dark mode. Do NOT design from scratch.

**Cycle:** developer → reviewer
