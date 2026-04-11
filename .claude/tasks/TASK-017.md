# TASK-017: FtpSession component — custom code block for FTP protocol examples
**Milestone:** 3 — Custom Article Components & Diagrams
**Status:** `TODO`
**Size:** S | **Type:** feature
**Depends on:** TASK-010
**Blocks:** TASK-019

**Goal:** A custom code block component that renders FTP session examples with manual syntax highlighting, since Shiki does not support FTP session syntax.

**Acceptance Criteria:**
- [ ] `src/components/article/FtpSession.astro` accepts props: optional `title` (string), optional `context` (string for right-side label)
- [ ] Renders pre-formatted HTML with CSS classes for syntax coloring: `syn-keyword`, `syn-string`, `syn-command`, `syn-response`, `syn-number`, `syn-comment`
- [ ] Code block background is always dark (`#1a1d24`) regardless of site theme
- [ ] Header shows title on left, context on right

**Visual Criteria:**
- [ ] Container: `bg #1a1d24`, `rounded-xl`, overflow hidden
- [ ] Header: `bg rgba(255, 255, 255, 0.05)`, `0.8125rem` text, `color #868e96`, bottom border `rgba(255, 255, 255, 0.06)`
- [ ] Body: `padding 1.5rem`, `font-size 0.875rem`, `line-height 1.7`
- [ ] Syntax colors: keyword `#c792ea`, string `#c3e88d`, number `#f78c6c`, comment `#546e7a`, response `#82aaff`, command `#ffcb6b`

**Cycle:** developer → reviewer
