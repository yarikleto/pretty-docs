# TASK-001: Project scaffolding and Starlight configuration
**Milestone:** 0 — Walking Skeleton
**Status:** `DONE`
**Size:** S | **Type:** setup
**Depends on:** nothing
**Blocks:** TASK-002, TASK-003, TASK-004, TASK-005, TASK-010

**Goal:** Update the Astro Starlight configuration to match the system design — correct sidebar structure, font loading, custom CSS file registered, and placeholder content files so the dev server runs with the right structure.

**Acceptance Criteria:**
- [x] `astro.config.mjs` updated: `customCss` points to `./src/styles/custom.css`, `head` includes Google Fonts links (Inter 400-800, JetBrains Mono 400-500), sidebar has "Networking" (autogenerate from `networking/`) and "Contributing" (explicit items for `write-an-article` and `style-guide`)
- [x] `src/styles/custom.css` exists with all Starlight CSS custom property overrides for light and dark mode (color tokens from design spec section 1.1 and 1.2, font families, font sizes, line heights)
- [x] `src/content/docs/networking/` directory exists with a placeholder `ftp-data-transfer.mdx` (title and description frontmatter, minimal body text)
- [x] `src/content/docs/contributing/` directory exists with placeholder `write-an-article.mdx` and `style-guide.mdx`
- [x] `npm run dev` starts successfully, Inter and JetBrains Mono fonts load, brand colors (indigo blue accent) visible in Starlight UI, dark mode toggle works

**Visual Criteria:** N/A (infrastructure task — visual verification is that fonts and colors load correctly)

**Suggested Approach:** Follow the exact config from system design section 5.5 and CSS from section 5.1. Remove old `src/content/docs/c-libraries/` and `src/content/docs/protocols/` directories. Keep `src/content/docs/index.mdx` for now (it will be replaced in TASK-005).

**Cycle:** developer → reviewer
