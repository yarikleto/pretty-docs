# TASK-020: FTP Data Transfer article — part 2 (Transfer Modes, Example Session, Source)
**Milestone:** 4 — FTP Article Content & Contributing Pages
**Status:** `TODO`
**Size:** M | **Type:** content
**Depends on:** TASK-019
**Blocks:** TASK-022

**Goal:** The second half of the FTP Data Transfer article is written: Transfer Modes section (Stream, Block with diagram and table, Compressed), Example Session with FtpSession code block, and Source & Further Reading with SourceCard.

**Acceptance Criteria:**
- [ ] Transfer Modes section (h2) with h3 subsections:
  - Stream Mode: explanation text
  - Block Mode: BlockHeader diagram, descriptor flags table (EOR=128, EOF=64, Errors=32, Restart=16), `:::caution` (Important) callout, SourceRef, RfcToggle
  - Compressed Mode: explanation with numbered list of three encoding types
- [ ] Example Session section (h2): FtpSession component showing a realistic FTP session with syntax highlighting, followed by a `:::note` callout
- [ ] Source & Further Reading section (h2): SourceCard with RFC 959 title, description, and links to RFC editor and W3C versions
- [ ] All content technically accurate to RFC 959 and clearly written

**Visual Criteria:**
- [ ] Article matches the bottom portion of prototype screenshot `3-article-light.png`
- [ ] Descriptor flags table has proper styling (rounded corners, uppercase headers, inline code for values)

**Cycle:** developer → reviewer
