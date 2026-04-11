# TASK-016: StructureCard component — letter icon cards for data structures
**Milestone:** 3 — Custom Article Components & Diagrams
**Status:** `TODO`
**Size:** S | **Type:** feature
**Depends on:** TASK-010
**Blocks:** TASK-019

**Goal:** A card component showing a data structure option with a colored letter icon, title, and description — used for the File/Record/Page data structures section.

**Acceptance Criteria:**
- [ ] `src/components/article/StructureCard.astro` accepts props: `letter` (string), `title` (string), `description` (string)
- [ ] Renders a card with: green letter icon in rounded container, bold title, and description text
- [ ] Multiple cards stack vertically with `space-y-4`
- [ ] Dark mode: border, icon bg, and text colors adapt

**Visual Criteria:**
- [ ] Card: `rounded-xl`, `border border-surface-200`, `p-5`, `flex items-start gap-3`
- [ ] Icon: `w-8 h-8 rounded-lg bg-green-50` with `text-xs font-bold text-green-600` letter. Dark: `bg rgba(55, 178, 77, 0.12)`, letter `#51cf66`
- [ ] Title: `text-base font-semibold text-surface-900`. Description: `text-sm text-surface-600 leading-relaxed mt-1`

**Cycle:** developer → reviewer
