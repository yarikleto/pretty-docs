# TASK-019: FTP Data Transfer article — part 1 (Overview, Data Types, Data Structures)
**Milestone:** 4 — FTP Article Content & Contributing Pages
**Status:** `TODO`
**Size:** M | **Type:** content
**Depends on:** TASK-011, TASK-012, TASK-013, TASK-014, TASK-015, TASK-016, TASK-018
**Blocks:** TASK-020, TASK-022

**Goal:** The first half of the FTP Data Transfer article is written with real content, integrating all custom components: ArticleMeta header, ThreeDimensions diagram, Data Types section with callout and RFC toggle, and Data Structures section with StructureCards.

**Acceptance Criteria:**
- [ ] `ftp-data-transfer.mdx` has proper frontmatter (title, description, sidebar badge, prev/next config) and imports all needed components
- [ ] Overview section: introductory text explaining FTP data transfer, ThreeDimensions diagram, SourceRef citation
- [ ] Data Types section (h2): explanation of ASCII, EBCDIC, Image, and Local types with a `:::note` callout and RfcToggle showing original RFC text
- [ ] Data Structures section (h2): explanation with three StructureCards (File, Record, Page)
- [ ] ArticleMeta component at top with source "RFC 959, Section 3", link to W3C version, "12 min read"
- [ ] All content is technically accurate to RFC 959 Section 3 and written in clear prose a CS student can follow

**Visual Criteria:**
- [ ] Article matches the top portion of prototype screenshot `3-article-light.png`

**Cycle:** developer → reviewer
