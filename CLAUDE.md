# Pretty Docs

Pretty Docs rewrites ugly technical specifications (RFCs, man pages, standards) into clear, visual, well-sourced articles. Every claim cites the original spec. Every article is a companion to the original, not a replacement.

**Live site:** https://yarikleto.github.io/pretty-docs/
**Repo:** https://github.com/yarikleto/pretty-docs

## Tech Stack

- Astro 6.x + Starlight 0.38.x (static site)
- No backend, no database
- MDX for content, Astro components for custom elements
- Sharp for image processing

## Project Structure

```
src/
  content/docs/           # Articles (MDX)
    index.mdx             # Landing page
    w3.org/protocols/     # Articles organized by source domain
    contributing/         # Contribution guides
  components/
    article/              # Article components (SourceRef, RfcToggle, etc.)
    diagrams/             # SVG diagram components
    landing/              # Landing page components
  styles/custom.css       # All Starlight CSS overrides
  pages/index.astro       # Custom landing page (outside Starlight)
astro.config.mjs          # Starlight config (sidebar, navigation)
```

## Commands

```
npm run dev       # Dev server (search won't work — use build+preview)
npm run build     # Build static site + Pagefind search index
npm run preview   # Preview production build (search works here)
```

## How to Add a New Article

### Step 1: Research the source

Use the **research** sub-agent to deeply study the original specification. Give it the URL of the source document and ask it to extract everything: structure, all sections, key technical details, important quotes for citations, any diagrams described in text.

```
Agent({
  subagent_type: "general-purpose",
  description: "Research [spec name]",
  prompt: "Fetch and thoroughly analyze [URL]. Extract: full document structure, all sections with content, key quotes worth citing with section numbers, diagrams or models described, technical details. Report everything — leave nothing out."
})
```

### Step 2: Create the article file

Create an MDX file at `src/content/docs/{source-domain}/{path}.mdx`. The file path should mirror the source URL structure.

Example: RFC 959 from w3.org → `src/content/docs/w3.org/protocols/rfc959.mdx`

Use the `slug` frontmatter field to set the URL path:
```yaml
slug: w3.org/Protocols/rfc959
```

### Step 3: Write the article

Follow the Article Writing Guide below. Use the research output to write comprehensive, accurate content. Every technical claim must cite the source section.

### Step 4: Create diagrams (if needed)

Create Astro SVG components in `src/components/diagrams/`. Follow the existing patterns in `ThreeDimensions.astro`, `BlockHeader.astro`, and `FtpModel.astro` for styling and dark mode support.

### Step 5: Register in sidebar

Add the article to `astro.config.mjs` in the `sidebar` array under the appropriate category.

### Step 6: Build and verify

Run `npm run build` to check for compilation errors. Run `npm run preview` to visually verify the article in both light and dark mode. Test search works for the new content.

---

## Article Writing Guide

### Article file template

```mdx
---
title: [Topic Name]
description: [One sentence — what this covers. Under 160 chars.]
slug: [source-domain/path]
prev: false
next: false
---

import ArticleMeta from '../../components/article/ArticleMeta.astro';
import SourceRef from '../../components/article/SourceRef.astro';
import SourceCard from '../../components/article/SourceCard.astro';
import RfcToggle from '../../components/article/RfcToggle.astro';

<ArticleMeta
  source="[Spec name, e.g. RFC 959]"
  sourceUrl="[URL to original document]"
  readingTime="[e.g. 12 min]"
/>

[Opening paragraph: 3-4 sentences. What is this? Why does it matter?]

## [Overview Section]

[Introduce the mental model. Include a diagram if it helps.]

<SourceRef section="[section number]" quote="[relevant quote from spec]" />

## [Main Sections]

[One per major concept, ordered simple-to-complex.]

## Source & Further Reading

<SourceCard
  title="[Spec title]"
  description="[Authors, date.]"
  links={[
    { label: "[Link text]", href: "[URL]" }
  ]}
/>
```

**Note on import paths:** Paths are relative from the MDX file to `src/components/`. Count the directory depth from your file. Example: a file at `src/content/docs/w3.org/protocols/rfc959.mdx` needs `../../../../components/article/...` (4 levels up to `src/`).

### Frontmatter

| Field | Required | Notes |
|-------|----------|-------|
| `title` | Yes | Under 60 chars |
| `description` | Yes | One sentence, under 160 chars |
| `slug` | Yes | URL path matching source URL structure |
| `prev` / `next` | No | Set to `false` to hide nav links |

### Components

**ArticleMeta** — Source badge + "View original" link + reading time.
```
Props: source (string), sourceUrl (string), readingTime (string)
```

**SourceRef** — Inline citation. Place after every diagram, table, and technical claim.
```
Props: section (string), quote (string, optional)
```

**SourceCard** — End-of-article source card with external links.
```
Props: title (string), description (string), links ({ label, href }[])
```

**RfcToggle** — Collapsible panel showing original spec text.
```
Props: section (string), label (string, optional)
Slot:  Original text as template literal {`...`}
```

**StructureCard** — Card with colored letter icon.
```
Props: letter (string), title (string), description (string)
```

**FtpSession** — Styled protocol session block with manual syntax highlighting.
```
Props: title (string, optional), context (string, optional)
Slot:  HTML spans with classes: syn-keyword, syn-string, syn-command, syn-response, syn-number, syn-comment
```

### MDX whitespace pitfall

MDX/JSX strips whitespace between HTML elements. Inside `<FtpSession>` and similar slot-based components, you MUST use explicit JSX expressions for whitespace:
- `{'\n'}` for line breaks between spans
- `{' '}` for spaces between same-line spans

Without these, `<pre>` content renders as one long line.

### Tone

- **Clear but not dumbed down.** Plain language, full technical precision.
- **Direct and active.** "FTP uses two connections" not "It should be noted that FTP utilizes two connections."
- **Define terms on first use** in **bold**.
- **No filler.** Cut "In this section, we will discuss..." and "Basically,..."
- **No casual/jokey tone.** Documentation, not a blog post.
- Analogies only when they genuinely clarify.

### Source Citations (non-negotiable)

1. Every diagram → `<SourceRef>` immediately below it.
2. Every table from the spec → `<SourceRef>` below it.
3. Technical claims → cite the relevant spec section.
4. End every article with `<SourceCard>`.
5. Valid sources only: RFC Editor, IETF, W3C, ISO, official specs, official man pages. Never blog posts or Stack Overflow.

### Structure

1. Opening paragraph: 3-4 sentences.
2. Overview section with mental model / diagram.
3. Main sections: one per concept, simple → complex, common → rare.
4. `##` sections: 200-500 words. Use `###` for longer sections.
5. End with "Source & Further Reading".
6. `:::note` (blue) for tips. `:::caution` (amber) for warnings. Use sparingly.

### Formatting

- `## H2` for major sections, `### H3` for subsections. Never skip levels.
- **Bold** for key terms on first introduction.
- `Inline code` for commands, values, field names.
- Markdown tables for structured comparisons.
- Fenced code blocks with language identifiers.
- Short headings: "Data Types" not "A Discussion of Various Data Types."

---

## Diagram Conventions

Create Astro SVG components in `src/components/diagrams/`.

**Visual rules:**
- Container: `background: #fafbfc` (light) / `#1f2133` (dark), `border-radius: 1rem`, `padding: 2rem`
- Color palette: indigo `#4c6ef5`, green `#37b24d`, amber `#f59f00`
- Card fills: `white` (light) / `#252740` (dark)
- Font: `Inter`, system-ui, sans-serif
- Dark mode via `:root[data-theme='dark']` CSS selectors
- Reuse existing CSS classes: `.axis-card`, `.axis-card-text`, `.axis-card-sub` (defined in custom.css)
- SVG marker `orient` attribute: use `"auto"`, not `"auto-start-auto"` (browser compat)

**Existing diagrams to reference:**
- `ThreeDimensions.astro` — Row-based layout with colored gradients
- `BlockHeader.astro` — Proportional field layout
- `FtpModel.astro` — Architecture diagram with arrows and connection types

---

## CSS Pitfall: Dual-Context Components

The Search component runs in two CSS environments:
1. **Starlight pages** — full CSS layer ordering, inherited body styles
2. **Landing page** (`src/pages/index.astro`) — standalone, no Starlight layers

Pagefind CSS is imported via `@layer starlight.core`. Layered styles have lower cascade priority than unlayered styles. On the landing page, layered styles silently lose to browser defaults.

**Rule:** Any component shared between landing and Starlight pages must explicitly set every visual property — never rely on inherited Starlight variables or layer ordering. Always test shared components on BOTH pages, in BOTH themes.

---

## Deployment

GitHub Pages via GitHub Actions. Push to `main` → auto-deploys.

Workflow: `.github/workflows/deploy.yml`
Site: https://yarikleto.github.io/pretty-docs/
