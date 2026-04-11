# Task Breakdown
> Generated from system design v1 — 2026-04-11

## Summary
- Total milestones: 5
- Total tasks: 22

## Task Statuses

| Status | Meaning | Next Step |
|--------|---------|-----------|
| `TODO` | Not started | Developer picks it up |
| `IN_PROGRESS` | Developer is implementing | Wait for developer |
| `IN_REVIEW` | Developer done, reviewer checking | Wait for reviewer |
| `CHANGES_REQUESTED` | Reviewer found issues | Developer fixes |
| `DONE` | Reviewer approved, all criteria met | Move to next task |
| `BLOCKED` | Waiting on dependency | Resolve blocker first |

## Definition of Done (applies to ALL tasks)
- [ ] Developer implemented the feature
- [ ] All acceptance criteria met
- [ ] Reviewer approved
- [ ] No linter/typecheck warnings
- [ ] Status updated to `DONE`

---

## Milestone 0: Walking Skeleton
> Goal: A user can visit the site, see a landing page, click through to the FTP article, and read basic content with one diagram and one source citation — end-to-end flow works
> Tasks: TASK-001, TASK-002, TASK-003, TASK-004

## Milestone 1: Landing Page
> Goal: Landing page matches the v2 prototype with all sections (hero, before/after, features, CTA, footer) in both light and dark mode
> Tasks: TASK-005, TASK-006, TASK-007, TASK-008, TASK-009

## Milestone 2: Article Page Polish
> Goal: Starlight article pages match the design spec — sidebar, TOC, headings, callouts, inline code, and tables all styled correctly
> Tasks: TASK-010, TASK-011, TASK-012

## Milestone 3: Custom Article Components & Diagrams
> Goal: All custom MDX components (RfcToggle, StructureCard, SourceRef, SourceCard, FtpSession, ArticleMeta) and both SVG diagrams are built and working in light/dark mode
> Tasks: TASK-013, TASK-014, TASK-015, TASK-016, TASK-017, TASK-018

## Milestone 4: FTP Article Content & Contributing Pages
> Goal: The complete FTP Data Transfer article is written with all components and diagrams integrated, and the contributing guide + style guide are in place
> Tasks: TASK-019, TASK-020, TASK-021, TASK-022

---

## Critical Path
TASK-001 → TASK-002 → TASK-003 → TASK-004 (walking skeleton)
                ↓
TASK-001 → TASK-010 → TASK-011 → TASK-013 → TASK-019 → TASK-020 → TASK-022 (article content critical path)

## Parallelization Opportunities
- After TASK-001: TASK-005 (landing layout) and TASK-010 (article CSS) can run in parallel
- After TASK-005: TASK-006, TASK-007, TASK-008, TASK-009 can all run in parallel (landing page sections)
- After TASK-010: TASK-011 and TASK-012 can run in parallel (different CSS concerns)
- After TASK-011: TASK-013 through TASK-018 are all independent components — can run in parallel
- After TASK-019: TASK-020 (article part 2) and TASK-021 (contributing pages) can run in parallel
- TASK-022 waits for everything

## Nice-to-Haves (~)
- ~TASK-XXX: Self-hosted fonts (replace Google Fonts CDN with local font files)
- ~TASK-XXX: Mobile hamburger menu on landing page (landing nav can use simpler mobile layout for MVP)
- ~TASK-XXX: Pagefind search styling polish (Starlight defaults are acceptable for MVP)
