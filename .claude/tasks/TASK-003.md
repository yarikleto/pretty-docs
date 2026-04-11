# TASK-003: Minimal article page with heading styles and body text
**Milestone:** 0 — Walking Skeleton
**Status:** `DONE`
**Size:** S | **Type:** feature
**Depends on:** TASK-001
**Blocks:** TASK-004

**Goal:** The FTP Data Transfer article page renders with correct heading styles, body text formatting, and basic Starlight layout (sidebar, TOC, nav) using the custom CSS tokens.

**Acceptance Criteria:**
- [x] `ftp-data-transfer.mdx` has frontmatter with title "FTP Data Transfer", description, and at least two h2 sections with body text
- [x] h2 headings have bottom border, correct font weight (700), and tracking per design spec
- [x] Body text renders in Inter at 1rem with line-height 1.625
- [x] Sidebar shows "Networking" category with the FTP article listed
- [x] Right-side table of contents appears on desktop with the article's headings

**Visual Criteria:**
- [x] h2 sections have `border-bottom` with `surface-100` color, `padding-bottom: 0.75rem`, `margin-bottom: 1.5rem`
- [x] Body text color is `surface-700` (light) / `dark-text` (dark)

**Suggested Approach:** Add heading and content area overrides to `custom.css` (system design section 5.2). Write 2-3 sections of placeholder article content to verify the layout.

**Cycle:** developer → reviewer
