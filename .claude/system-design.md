# System Design
> v1 — 2026-04-11

Pretty Docs is a static documentation site built on Astro Starlight. There is no backend, no database, no authentication. The "architecture" is about content structure, Starlight customization, custom component design, and build-time concerns. This document captures every decision needed to implement the MVP.

---

## 1. Architecture Overview

### What We Are Building

A customized Astro Starlight site with:

1. A **custom landing page** (`src/pages/index.astro`) that bypasses Starlight's splash template entirely
2. **Article pages** that use Starlight's standard `docs` layout with heavy CSS overrides and MDX-imported custom components
3. **Contributing pages** (guide + style reference) that use Starlight's standard `docs` layout with minimal customization

### How Starlight Customization Works

Starlight provides three extension points, and we use all three:

**CSS Custom Properties and Custom CSS** — Starlight exposes CSS custom properties (`--sl-color-accent`, `--sl-font`, etc.) that we override in a custom CSS file registered via `customCss` in `astro.config.mjs`. This handles colors, typography, and visual overrides for all built-in Starlight elements (sidebar, TOC, nav, search, pagination, headings).

**Custom Components** — Astro components in `src/components/` that are imported directly in MDX files. These handle article-specific patterns that Starlight does not provide: RFC toggles, structure cards, source citations, before/after comparisons. They are used in MDX via standard import syntax: `import RfcToggle from '../../components/RfcToggle.astro'`.

**Component Overrides** — Starlight allows replacing its built-in components by declaring overrides in `astro.config.mjs` under `components: {}`. We use this sparingly — only when Starlight's default markup structure cannot be styled into what we need with CSS alone. The primary candidate is the `Hero` component for the splash page, but since we are building a fully custom landing page, we do not need this for MVP.

### Information Flow

```
Content authors write MDX files in src/content/docs/
    ↓
Frontmatter defines metadata (title, description, source, etc.)
    ↓
MDX body imports custom components as needed
    ↓
Astro builds static HTML at build time
    ↓
Custom CSS transforms Starlight's defaults into our design
    ↓
Static site deploys anywhere (Netlify, Vercel, GitHub Pages, etc.)
```

### Key Architectural Constraint

Starlight owns the page shell for article pages: the sidebar, header nav, search, TOC, breadcrumbs, pagination. We style these via CSS overrides. We do NOT replace them with custom components unless CSS is insufficient. This means we get Starlight's responsive behavior, accessibility, keyboard navigation, and search (Pagefind) for free. Fighting Starlight's layout system is the primary risk to avoid.

---

## 2. Tech Stack Decisions

### ADR-1: Static Site Framework — Astro Starlight

**Status:** Accepted (pre-decided)
**Decision:** Astro 6.x with Starlight 0.38.x
**Rationale:** Already scaffolded. Starlight provides sidebar navigation, search (Pagefind), dark mode toggle, table of contents, breadcrumbs, responsive layout, and content collection validation out of the box. This is boring technology for a documentation site — exactly right.
**Trade-off:** We accept Starlight's opinions about page structure in exchange for not building any of that ourselves.

### ADR-2: Landing Page Strategy — Custom Astro Page

**Status:** Accepted
**Context:** The landing page design (hero, before/after comparison, features grid, category tags, CTA) is significantly different from anything Starlight's `splash` template supports. The splash template is a centered hero with optional image and action buttons — that is it.
**Decision:** Build the landing page as `src/pages/index.astro` with its own layout. Remove `src/content/docs/index.mdx`. The landing page imports a standalone layout component (`src/layouts/Landing.astro`) that shares font loading and meta tags with Starlight but does not use Starlight's page frame.
**Alternatives Considered:**
- Override Starlight's `Hero` component and use splash template — rejected because the before/after section, features grid, and CTA section are outside the hero area. We would need to override multiple Starlight components and fight its layout. More work, more fragile.
- Use `splash` template with heavy CSS and inject sections via MDX — rejected because MDX in the content collection uses Starlight's layout, and hiding/restyling the sidebar, header, and footer for just one page is a maintenance burden.
**Consequences:** The landing page is fully controlled — we can match the prototype exactly. But we must manually handle dark mode detection (reading Starlight's `data-theme` attribute or `localStorage`) and ensure visual consistency with Starlight pages. Font loading must be shared.

### ADR-3: Diagrams — Inline SVG in Astro Components

**Status:** Accepted
**Context:** The design calls for two SVG diagrams: "Three Dimensions of a Transfer" and "Block Header Format." Both need dark mode support (color swaps on fills, strokes, text). Future articles may use Mermaid, PNG, or other formats.
**Decision:** For the MVP FTP article, create diagrams as Astro components that render inline SVG. Use CSS classes (`.diagram-bg`, `.diagram-card`, `.diagram-text-primary`, `.diagram-text-secondary`) targeted by `:root[data-theme='dark']` selectors in the custom CSS file. Each diagram is a self-contained `.astro` component in `src/components/diagrams/`.
**Alternatives Considered:**
- Mermaid — rejected for MVP because Mermaid's visual output cannot match the prototype's custom-designed diagrams. Mermaid is appropriate for future community-contributed articles where custom SVG design is impractical.
- Separate light/dark SVG files — rejected because maintaining two copies is error-prone and the CSS class approach is cleaner.
- External `.svg` files with `<img>` tags — rejected because `<img>` SVGs cannot be styled with page CSS for dark mode.
**Consequences:** Diagrams are pixel-perfect and theme-aware. But each custom diagram requires hand-crafted SVG, which is higher effort. This is acceptable for the MVP (2 diagrams). For scale, we should document how to create theme-aware SVGs and consider Mermaid as a lower-effort option for contributors.

### ADR-4: Font Loading — Google Fonts via Starlight Head Config

**Status:** Accepted
**Decision:** Load Inter (400, 500, 600, 700, 800) and JetBrains Mono (400, 500) from Google Fonts via `<link>` tags in Starlight's `head` configuration. The landing page layout also includes these same link tags.
**Alternatives Considered:**
- Self-hosted fonts via `@font-face` in CSS — considered but deferred. Self-hosting eliminates the Google Fonts dependency and improves privacy/performance, but adds complexity (font files in `public/fonts/`, `@font-face` declarations, subsetting). This is a good Type 2 improvement for later.
- `fontsource` npm packages — good option but adds build-time dependencies. Deferred for same reason.
**Consequences:** Fast to implement. Slight privacy concern (Google Fonts request). Performance is good due to Google's CDN, but self-hosting would be marginally better for LCP. Accept this for MVP; upgrade to self-hosted later if it matters.

### ADR-5: Additional Integrations — None for MVP

**Status:** Accepted
**Decision:** No additional Astro integrations beyond what is already installed (`@astrojs/starlight`, `sharp`).
**Rationale:** We do not need Tailwind (CSS custom properties and vanilla CSS are sufficient for overrides and component styles). We do not need MDX plugins (Starlight handles MDX natively). We do not need a sitemap integration (Starlight generates one). We do not need an image optimization integration (`sharp` is already present for Starlight's asset pipeline).
**Consequences:** Minimal dependency surface. No Tailwind utility classes in component code — all styling is done via scoped styles in Astro components or the global custom CSS file. This means contributors need to write CSS, not Tailwind, but for a small number of custom components this is fine.

### ADR-6: Callouts — Override Starlight's Built-in Aside CSS

**Status:** Accepted
**Context:** The design specifies "Note" (blue) and "Important" (amber) callout styles. Starlight provides a built-in `<Aside>` component with `note`, `tip`, `caution`, and `danger` variants.
**Decision:** Use Starlight's `<Aside>` component (available as a Starlight user component, imported via `@astrojs/starlight/components`) and override its CSS to match the design spec tokens. Map Starlight's `note` type to our blue Note style and `caution` type to our amber Important style.
**Alternatives Considered:**
- Custom callout components (`CalloutNote.astro`, `CalloutImportant.astro`) — rejected because Starlight's Aside already handles the markup structure (icon, heading, body) and is accessible. Reimplementing this is accidental complexity.
**Consequences:** Less code. Callouts work with Starlight's existing MDX syntax (`:::note` / `:::caution`). But we are constrained to Starlight's Aside markup structure — if the design diverges significantly from what CSS can achieve on that markup, we would need custom components. For the current design, CSS overrides are sufficient.

---

## 3. Content Architecture

### Directory Structure

```
src/
├── content/
│   └── docs/
│       ├── networking/
│       │   └── ftp-data-transfer.mdx      # MVP article
│       └── contributing/
│           ├── write-an-article.mdx        # Contribution guide
│           └── style-guide.mdx             # Style reference for contributors
├── components/
│   ├── landing/
│   │   ├── Hero.astro                      # Landing hero section
│   │   ├── BeforeAfter.astro               # Before/after comparison section
│   │   ├── Features.astro                  # Value props grid section
│   │   ├── Cta.astro                       # Bottom CTA with category tags
│   │   ├── LandingNav.astro                # Landing page navigation bar
│   │   └── LandingFooter.astro             # Landing page footer
│   ├── article/
│   │   ├── RfcToggle.astro                 # "See original RFC text" collapsible
│   │   ├── StructureCard.astro             # Card with letter icon + description
│   │   ├── SourceRef.astro                 # Inline source citation with left border
│   │   ├── SourceCard.astro                # Source & further reading card
│   │   └── FtpSession.astro                # Custom code block for FTP sessions
│   └── diagrams/
│       ├── ThreeDimensions.astro           # TYPE/STRU/MODE overview diagram
│       └── BlockHeader.astro               # 3-byte block header format diagram
├── layouts/
│   └── Landing.astro                       # Landing page layout (standalone)
├── styles/
│   └── custom.css                          # Starlight CSS overrides + component tokens
└── pages/
    └── index.astro                         # Landing page (bypasses Starlight)
```

### Article Frontmatter Schema

Starlight's built-in schema provides: `title`, `description`, `template`, `hero`, `sidebar`, `prev`, `next`, `editUrl`, `head`, `draft`, `lastUpdated`.

For Pretty Docs articles, we use these built-in fields plus custom data. Since extending Starlight's Zod schema adds complexity, we encode article-specific metadata in the MDX body itself rather than frontmatter. This is the simpler approach.

**Standard frontmatter (Starlight-native):**

```yaml
---
title: FTP Data Transfer
description: How FTP moves files between computers — data types, structures, and transfer modes explained with diagrams.
prev: false
next:
  label: "FTP Commands"
  link: "/networking/ftp-commands/"
sidebar:
  badge:
    text: New
    variant: tip
---
```

**Article metadata rendered via components in MDX body:**

Source attribution, reading time, and "view original" links are rendered by importing custom components at the top of the MDX body. This avoids schema extension while keeping the visual result identical.

```mdx
import SourceRef from '../../components/article/SourceRef.astro';
import SourceCard from '../../components/article/SourceCard.astro';

{/* Article meta rendered by a component at the top */}
<ArticleMeta
  source="RFC 959, Section 3"
  sourceUrl="https://www.w3.org/Protocols/rfc959/4_FileTransfer.html"
  readingTime="12 min"
/>
```

**Why not extend the schema?** Extending Starlight's Zod schema in `content.config.ts` is possible via `docsSchema({ extend })` but requires Zod knowledge and creates a coupling point. For MVP with one article, encoding metadata as component props in MDX is simpler, works today, and can be migrated to schema-level validation later if the number of articles grows and consistency enforcement becomes important.

### Sidebar Configuration

Use Starlight's `autogenerate` for article categories and explicit items for contributing pages. This matches the current config pattern but updates the directory name from `protocols` to `networking` to allow broader content within the category.

```js
sidebar: [
  {
    label: 'Networking',
    autogenerate: { directory: 'networking' },
  },
  {
    label: 'Contributing',
    items: [
      { label: 'Write an article', slug: 'contributing/write-an-article' },
      { label: 'Style guide', slug: 'contributing/style-guide' },
    ],
  },
],
```

**Why `autogenerate` for articles?** As more articles are added to a category, they appear in the sidebar automatically. No config file edits per article. The `label` in sidebar comes from the file's frontmatter `title` (or `sidebar.label` if overridden).

**Why explicit items for Contributing?** There are only two pages and their order matters. Explicit items give full control.

### Source Citations in MDX

Two patterns, used at different levels:

**Inline citation** — after a diagram, table, or specific claim. Uses the `<SourceRef>` component:

```mdx
<SourceRef section="3.1.1" quote="Data types are defined by the TYPE command." />
```

Renders as a small left-bordered quote with "RFC 959, Section 3.1.1" and the quoted text.

**End-of-article citation** — in the "Source & Further Reading" section. Uses the `<SourceCard>` component:

```mdx
## Source & Further Reading

<SourceCard
  title="RFC 959 — File Transfer Protocol"
  description="J. Postel and J. Reynolds, October 1985. The specification this article is based on."
  links={[
    { label: "Read RFC 959", href: "https://www.rfc-editor.org/rfc/rfc959" },
    { label: "W3C HTML version", href: "https://www.w3.org/Protocols/rfc959/" },
  ]}
/>
```

---

## 4. Custom Components

Every custom component below is an Astro component (`.astro` file). No client-side JavaScript framework is used. The only client JS is a small `<script>` tag in the `RfcToggle` component for the expand/collapse behavior and in the landing page for dark mode detection.

### 4.1 Landing Page Components

These are used exclusively by `src/pages/index.astro`.

#### `LandingNav.astro`

**Purpose:** Top navigation bar for the landing page. Matches the prototype's nav with logo, links (Articles, Contribute), GitHub icon, and dark mode toggle.
**Props:** None (static content).
**Where used:** `Landing.astro` layout.
**Notes:** Must read Starlight's theme from `localStorage` (key: `starlight-theme`) and the `data-theme` attribute on `<html>` to stay in sync with Starlight's theme toggle. The dark mode toggle on the landing page must write to the same localStorage key so article pages pick it up.

#### `LandingFooter.astro`

**Purpose:** Footer for the landing page with logo, license info, and links.
**Props:** None (static content).
**Where used:** `Landing.astro` layout.

#### `Hero.astro` (landing)

**Purpose:** Hero section with headline, subtitle, and CTA buttons.
**Props:** None (static content, all text is hardcoded for the landing page).
**Where used:** `src/pages/index.astro`.

#### `BeforeAfter.astro`

**Purpose:** Two side-by-side cards showing RFC plaintext vs. Pretty Docs version.
**Props:** None (content is hardcoded for the MVP landing page — the before/after shows RFC 959 specifically as a concrete proof of concept).
**Where used:** `src/pages/index.astro`.
**Notes:** The "Before" card renders monospaced RFC text. The "After" card renders a styled preview. Both are static HTML, no toggle behavior.

#### `Features.astro`

**Purpose:** Three-column grid of value propositions (Curated, Visual, Sourced).
**Props:** None (static content).
**Where used:** `src/pages/index.astro`.

#### `Cta.astro`

**Purpose:** Bottom CTA section with headline, category tags, and action buttons.
**Props:** None (static content).
**Where used:** `src/pages/index.astro`.
**Notes:** Category tags are static pills (Protocols, C Libraries, Mathematics, Standards, Unix/POSIX, Cryptography, File Formats, Compression). Not clickable in MVP, but have hover states.

### 4.2 Article Components

These are imported in MDX article files.

#### `ArticleMeta.astro`

**Purpose:** Renders the source badge, "view original" link, and reading time below the article description. Placed at the top of the MDX body.
**Props:**
- `source: string` — e.g., "RFC 959, Section 3"
- `sourceUrl: string` — URL to the original document
- `readingTime: string` — e.g., "12 min read"
**Where used:** Top of every article MDX file.
**Notes:** This is positioned visually after the article description (which Starlight renders from frontmatter). It needs CSS to integrate into Starlight's article header flow.

#### `RfcToggle.astro`

**Purpose:** A button that expands/collapses a panel showing the original RFC text for a section.
**Props:**
- `section: string` — e.g., "3.1.1" — displayed in the panel header as "RFC 959, Section 3.1.1"
- `label?: string` — optional custom button text (defaults to "See original RFC text")
**Slot:** Default slot receives the pre-formatted RFC text content.
**Where used:** After major article sections (Data Types, Transfer Modes, etc.).
**Notes:** Requires a small client-side `<script>` for toggle behavior. Use Astro's built-in `<script>` tag (bundled automatically). No framework needed — vanilla JS `addEventListener` on button click, toggling a `hidden` attribute or `display` style.

#### `StructureCard.astro`

**Purpose:** A card showing a data structure option with a letter icon, title, and description.
**Props:**
- `letter: string` — single character displayed in the icon (e.g., "F" for File)
- `title: string` — card heading
- `description: string` — card body text
**Where used:** "Data Structures" section of the FTP article (File, Record, Page).

#### `SourceRef.astro`

**Purpose:** Inline source citation rendered as a left-bordered quote.
**Props:**
- `section: string` — RFC section number (e.g., "3.1.1")
- `quote?: string` — optional quoted text from the RFC
**Where used:** After diagrams and significant claims in article body.

#### `SourceCard.astro`

**Purpose:** Full source/further reading card at the bottom of each article.
**Props:**
- `title: string` — source document title
- `description: string` — brief description
- `links: Array<{ label: string; href: string }>` — external links
**Where used:** "Source & Further Reading" section of every article.

#### `FtpSession.astro`

**Purpose:** Custom code block for FTP protocol session examples. Standard Shiki syntax highlighting does not support FTP session syntax, so this component renders pre-formatted HTML with manual CSS classes for syntax coloring.
**Props:**
- `title?: string` — header label (e.g., "FTP Session Example")
- `context?: string` — right-side context label (e.g., "Control connection (port 21)")
**Slot:** Default slot receives the session text (or the component accepts raw HTML string).
**Where used:** "Example Session" section of the FTP article.
**Notes:** Uses the custom syntax highlight tokens from the design spec (syn-keyword, syn-string, syn-command, syn-response, syn-number, syn-comment). Background is always dark (`#1a1d24`) regardless of theme.

### 4.3 Diagram Components

#### `ThreeDimensions.astro`

**Purpose:** SVG diagram showing the three axes of an FTP transfer: TYPE (data types), STRU (data structures), MODE (transfer modes). Three horizontal colored rows with inline option cards.
**Props:** None (content is specific to FTP).
**Where used:** Overview section of the FTP Data Transfer article.
**Notes:** Uses CSS classes for dark mode adaptation. All text, fills, and strokes are set via CSS custom properties or class-based selectors under `:root[data-theme='dark']`.

#### `BlockHeader.astro`

**Purpose:** SVG diagram showing the 3-byte block header format (Descriptor 8 bits + Byte Count 16 bits).
**Props:** None (content is specific to FTP Block Mode).
**Where used:** "Block Mode" subsection of the FTP Data Transfer article.
**Notes:** Same dark mode approach as ThreeDimensions.

---

## 5. Starlight Customization Plan

### 5.1 CSS Custom Properties Override

All Starlight visual overrides go in a single file: `src/styles/custom.css`. This file is registered in `astro.config.mjs` via the `customCss` array.

**Color overrides (light mode):**

```css
:root {
  --sl-color-accent-low: 219 79% 93%;      /* brand-50: #f0f4ff */
  --sl-color-accent: 231 82% 63%;          /* brand-600: #4c6ef5 */
  --sl-color-accent-high: 231 54% 28%;     /* brand-900: #364fc7 */

  --sl-color-white: 210 17% 9%;            /* surface-900: #212529 */
  --sl-color-gray-1: 210 14% 22%;          /* surface-800: #343a40 */
  --sl-color-gray-2: 210 10% 33%;          /* surface-700: #495057 */
  --sl-color-gray-3: 210 7% 56%;           /* surface-500: #adb5bd */
  --sl-color-gray-4: 210 14% 89%;          /* surface-200: #e9ecef */
  --sl-color-gray-5: 210 17% 95%;          /* surface-100: #f1f3f5 */
  --sl-color-gray-6: 210 25% 98%;          /* surface-50: #fafbfc */
  --sl-color-black: 0 0% 100%;             /* white */

  --sl-font: 'Inter', system-ui, sans-serif;
  --sl-font-mono: 'JetBrains Mono', monospace;

  --sl-text-h1: 2.25rem;
  --sl-text-h2: 1.5rem;
  --sl-text-h3: 1.25rem;
  --sl-text-body: 1rem;
  --sl-text-sm: 0.875rem;
  --sl-text-xs: 0.75rem;

  --sl-line-height: 1.625;
  --sl-line-height-headings: 1.2;
}
```

**Color overrides (dark mode):**

```css
:root[data-theme='dark'] {
  --sl-color-accent-low: 231 52% 20%;
  --sl-color-accent: 231 82% 72%;          /* brand-400: #748ffc */
  --sl-color-accent-high: 231 86% 82%;     /* brand-300: #91a7ff */

  --sl-color-white: 231 20% 90%;           /* dark-textBright: #e4e6f0 */
  --sl-color-gray-1: 231 12% 80%;          /* dark-text: #c8cad8 */
  --sl-color-gray-2: 231 8% 52%;
  --sl-color-gray-3: 231 10% 46%;          /* #6b6e82 */
  --sl-color-gray-4: 231 24% 25%;          /* dark-border: #2e3150 */
  --sl-color-gray-5: 231 24% 20%;          /* dark-surface2: #252740 */
  --sl-color-gray-6: 231 26% 17%;          /* dark-surface: #1f2133 */
  --sl-color-black: 231 27% 13%;           /* dark-bg: #1a1b26 */
}
```

### 5.2 Additional CSS Overrides (Beyond Custom Properties)

These target Starlight's actual DOM elements and classes to match the design spec:

**Font rendering:**
- `-webkit-font-smoothing: antialiased` and `-moz-osx-font-smoothing: grayscale` on `body`

**Heading styles:**
- `h2` in article content: add `border-bottom`, `padding-bottom: 0.75rem`, `margin-bottom: 1.5rem`, `font-weight: 700`, `letter-spacing: -0.025em`

**Sidebar:**
- Active item: override to `background: var(--sl-color-accent-low)`, `color: brand-700`, `border-radius: 8px`, `font-weight: 500`

**TOC (right sidebar):**
- Active link: `color: brand-600`, `border-left: 2px solid brand-600`

**Aside (callout) overrides:**
- Override Starlight's `.starlight-aside--note` to use our blue tokens (bg `#f0f4ff`, border-left `#4c6ef5`, rounded `12px`)
- Override `.starlight-aside--caution` to use our amber tokens (bg `#fff3e0`, border-left `#f59f00`, rounded `12px`)
- Dark mode variants of both

**Inline code:**
- Override `code:not(pre code)` to use `font-family: var(--sl-font-mono)`, `background: var(--sl-color-gray-5)`, `color: #4263eb` (light) / `#91a7ff` (dark), `padding: 0.125rem 0.375rem`, `border-radius: 4px`, `font-size: 0.875rem`

**Diagram dark mode classes:**
- `.diagram-bg`, `.diagram-card`, `.diagram-text-primary`, `.diagram-text-secondary`, `.axis-card`, `.axis-card-text`, `.axis-card-sub` with `:root[data-theme='dark']` selectors

### 5.3 CSS File Structure

Single file: `src/styles/custom.css`. No splitting for MVP.

The file is organized in sections with clear comments:

```
/* ========================================
   1. Starlight Custom Property Overrides
   ======================================== */

/* ========================================
   2. Global Styles (font rendering, body)
   ======================================== */

/* ========================================
   3. Sidebar Overrides
   ======================================== */

/* ========================================
   4. TOC Overrides
   ======================================== */

/* ========================================
   5. Content Area (headings, body, links)
   ======================================== */

/* ========================================
   6. Aside / Callout Overrides
   ======================================== */

/* ========================================
   7. Inline Code Overrides
   ======================================== */

/* ========================================
   8. Diagram Dark Mode Classes
   ======================================== */

/* ========================================
   9. Custom Component Shared Tokens
   ======================================== */
```

### 5.4 Component Overrides

For MVP, no Starlight component overrides are needed. All visual changes are achievable via CSS. If we later find that CSS is insufficient (e.g., we need to change the breadcrumb markup or add elements to the article header), we can override specific Starlight components via:

```js
components: {
  Hero: './src/components/overrides/Hero.astro',
  // etc.
}
```

But we start without this.

### 5.5 Theme Configuration Summary

The complete `astro.config.mjs` for MVP:

```js
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  integrations: [
    starlight({
      title: 'Pretty Docs',
      customCss: ['./src/styles/custom.css'],
      head: [
        { tag: 'link', attrs: { rel: 'preconnect', href: 'https://fonts.googleapis.com' } },
        { tag: 'link', attrs: { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true } },
        { tag: 'link', attrs: { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap' } },
      ],
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/YaroslavPakhaliuk/pretty-docs' }],
      sidebar: [
        {
          label: 'Networking',
          autogenerate: { directory: 'networking' },
        },
        {
          label: 'Contributing',
          items: [
            { label: 'Write an article', slug: 'contributing/write-an-article' },
            { label: 'Style guide', slug: 'contributing/style-guide' },
          ],
        },
      ],
    }),
  ],
});
```

---

## 6. Landing Page Strategy

### Approach

The landing page is a fully custom Astro page at `src/pages/index.astro` with its own layout. It does not use Starlight at all. This gives us complete control over the design.

### Layout Structure

`src/layouts/Landing.astro` provides:

- `<html>` tag with `lang="en"` and `data-theme` attribute (read from Starlight's localStorage key `starlight-theme`, defaulting to system preference)
- Font loading (same Google Fonts links as Starlight config)
- Meta tags (title, description, Open Graph)
- Global CSS variables (same design tokens as custom.css, extracted as CSS custom properties)
- `<slot />` for page content

`src/pages/index.astro` uses this layout and renders the four sections in order:

1. `<LandingNav />` — sticky navigation with backdrop blur
2. `<Hero />` — headline, subtitle, CTA buttons with hero gradient background
3. `<BeforeAfter />` — side-by-side RFC vs Pretty Docs comparison
4. `<Features />` — three-column value prop grid on subtle background
5. `<Cta />` — category tags, call-to-action, action buttons
6. `<LandingFooter />` — license info, links

### Dark Mode Sync

The landing page must stay in sync with Starlight's dark mode. Starlight stores the theme choice in `localStorage` under the key `starlight-theme` and sets `data-theme="dark"` on the `<html>` element.

The landing layout includes a small inline `<script>` in `<head>` (render-blocking, before first paint) that:
1. Reads `localStorage.getItem('starlight-theme')`
2. If no value, checks `window.matchMedia('(prefers-color-scheme: dark)')`
3. Sets `document.documentElement.dataset.theme` accordingly

The dark mode toggle button on the landing nav writes to the same localStorage key and toggles `data-theme` on `<html>`, using the same behavior as Starlight's built-in `ThemeSelect`.

### Navigation Links

- "Browse articles" links to `/networking/ftp-data-transfer/` (the first and only article in MVP)
- "View on GitHub" links to the repo
- "Contribution guide" links to `/contributing/write-an-article/`
- Category tags are not links (not clickable in MVP)

---

## 7. Implementation Plan

### Task Dependency Graph

```
TASK-1: CSS Foundation (tokens, fonts, global overrides)
    ↓
TASK-2: Landing Page          TASK-3: Article Page Styles
    (depends on TASK-1)           (depends on TASK-1)
                                      ↓
                              TASK-4: Custom Article Components
                                  (depends on TASK-3)
                                      ↓
                              TASK-5: SVG Diagrams
                                  (depends on TASK-4)
                                      ↓
                              TASK-6: FTP Data Transfer Article (content)
                                  (depends on TASK-4, TASK-5)
    ↓                             ↓
TASK-7: Contributing Pages    TASK-8: Polish & Cross-browser
    (depends on TASK-3)           (depends on all above)
```

### Parallelization

After TASK-1 completes:
- TASK-2 (Landing Page) and TASK-3 (Article Page Styles) can run in parallel — they are independent pages with independent CSS concerns.
- TASK-7 (Contributing Pages) can start as soon as TASK-3 is done, and runs in parallel with TASK-5/TASK-6.

### Task Breakdown

#### TASK-1: CSS Foundation

**Goal:** Establish the visual foundation so all subsequent work builds on correct tokens.

- Create `src/styles/custom.css` with all Starlight CSS custom property overrides (light + dark)
- Update `astro.config.mjs` with `customCss`, `head` (fonts), and updated `sidebar` config
- Remove `src/content/docs/index.mdx` (landing page moves to `src/pages/`)
- Create `src/content/docs/networking/` and `src/content/docs/contributing/` directories with placeholder `.mdx` files so the sidebar renders
- Verify: `npm run dev` shows Starlight with correct fonts, colors, and sidebar structure

**Acceptance:** Dev server runs. Inter and JetBrains Mono load. Brand colors (indigo blue) are visible in sidebar and accent elements. Dark mode toggle works and uses correct dark tokens.

#### TASK-2: Landing Page

**Goal:** A standalone landing page that matches the v2 prototype, with working dark mode and navigation to articles.

- Create `src/layouts/Landing.astro` with HTML shell, font loading, dark mode script, shared CSS variables
- Create `src/pages/index.astro`
- Create all landing components: `LandingNav.astro`, `Hero.astro`, `BeforeAfter.astro`, `Features.astro`, `Cta.astro`, `LandingFooter.astro` in `src/components/landing/`
- Implement dark mode toggle that syncs with Starlight's localStorage
- All sections responsive (mobile hamburger menu is NOT needed for landing in MVP — the landing nav can collapse to a simpler mobile layout)

**Acceptance:** Landing page at `/` matches the v2 prototype screenshots (`1-landing-light.png`, `2-landing-dark.png`). Dark mode toggles correctly. "Browse articles" navigates to the article page. "View on GitHub" opens the repo.

#### TASK-3: Article Page Styles

**Goal:** Starlight article pages look correct — sidebar, TOC, headings, body text, links, nav all match the design spec.

- Add CSS overrides to `custom.css` for: sidebar active item, TOC active link, heading borders, link colors, nav height/backdrop, search bar styling, breadcrumb styling, pagination (prev/next) styling
- Override aside/callout styles for `note` and `caution` types
- Override inline code styles
- Verify with a minimal test article in `networking/ftp-data-transfer.mdx`

**Acceptance:** A test article page matches the v2 prototype screenshots for sidebar, TOC, headings, and body text (`3-article-light.png`, `4-article-dark.png`). Asides render with correct blue/amber styles. Dark mode is correct.

#### TASK-4: Custom Article Components

**Goal:** All reusable MDX components for articles are built, styled, and tested.

- Build `ArticleMeta.astro` — source badge + view original link + reading time
- Build `RfcToggle.astro` — collapsible RFC text panel with toggle button and client-side JS
- Build `StructureCard.astro` — letter icon card
- Build `SourceRef.astro` — inline citation
- Build `SourceCard.astro` — end-of-article source card
- Build `FtpSession.astro` — custom FTP code block with syntax coloring
- Test each component in the test article MDX

**Acceptance:** Each component renders correctly in light and dark mode. RfcToggle expands/collapses. FtpSession shows colored syntax. All match the design spec tokens.

#### TASK-5: SVG Diagrams

**Goal:** Two article-specific diagrams that are accurate to the FTP spec and adapt to dark mode.

- Build `ThreeDimensions.astro` — the TYPE/STRU/MODE overview diagram
- Build `BlockHeader.astro` — the 3-byte block header format diagram
- Implement dark mode via CSS classes in `custom.css`
- Verify accurate representation of RFC 959 content

**Acceptance:** Both diagrams render correctly in the article. Dark mode swaps colors cleanly with no flash. Diagram content is technically accurate to RFC 959.

#### TASK-6: FTP Data Transfer Article

**Goal:** The complete, well-written article that demonstrates the Pretty Docs vision.

- Write `src/content/docs/networking/ftp-data-transfer.mdx` with all sections:
  - Overview with ThreeDimensions diagram
  - Data Types (ASCII, EBCDIC, Image, Local) with note callout and RFC toggle
  - Data Structures (File, Record, Page) with StructureCard components
  - Transfer Modes (Stream, Block, Compressed) with BlockHeader diagram, data table for descriptor flags, important callout, RFC toggle
  - Example Session with FtpSession code block
  - Source & Further Reading with SourceCard
- All content accurately represents RFC 959 Section 3
- Source citations throughout
- Clear prose that a CS student can follow

**Acceptance:** The article is technically accurate, well-structured, and uses all custom components. Reading experience is dramatically better than the original RFC. All source citations link to the correct RFC sections.

#### TASK-7: Contributing Pages

**Goal:** Guide for community contributors and the CLAUDE.md style guide.

- Write `src/content/docs/contributing/write-an-article.mdx` — how to choose a topic, structure an article, use components, submit a PR
- Write `src/content/docs/contributing/style-guide.mdx` — tone, depth, formatting rules, diagram guidelines, source citation requirements
- Update the project's root `CLAUDE.md` with the AI-readable style guide for Claude-assisted article writing

**Acceptance:** A contributor can read the guide, understand the expected format, and produce a new article (or use Claude to help write one) that matches the FTP article's quality and structure.

#### TASK-8: Polish & Cross-browser Testing

**Goal:** Final quality pass before the site is ready to ship.

- Responsive testing: landing page and article page on mobile, tablet, desktop
- Cross-browser: Chrome, Firefox, Safari (at minimum)
- Dark mode: no flash of wrong theme on page load, smooth transitions, no elements missed
- Accessibility: keyboard navigation works for sidebar, TOC, RFC toggles. Focus states visible. Color contrast meets WCAG AA
- Performance: run `npm run build` and verify build succeeds. Check that fonts load without layout shift (verify `display=swap` behavior)
- Links: all internal links work, all external links (RFC URLs, GitHub) are correct

**Acceptance:** Site builds successfully. No visual bugs on the three target browsers. Lighthouse accessibility score is 90+. All links work.

---

## 8. Risks

**Starlight CSS specificity battles.** Starlight uses `@layer` for its styles, which should make overrides straightforward. But if we encounter specificity issues where our CSS does not take effect, the fix is to increase specificity or use `!important` judiciously. Monitor this during TASK-3.

**Landing page dark mode desync.** If the landing page's theme detection script has a bug, users could see a flash of wrong theme or the landing page could be in light mode while the article page is in dark mode. Mitigation: test the localStorage sync thoroughly. The inline script must execute before first paint.

**SVG diagram complexity.** Hand-crafted SVGs for the FTP diagrams could take significant time. The Three Dimensions diagram is particularly complex (three rows, multiple cards, gradients, text labels). Mitigation: the prototype already has working SVGs that can be extracted and adapted. Do not design from scratch — extract from `v2/index.html`.

**Content accuracy.** The FTP Data Transfer article must accurately represent RFC 959. Inaccuracy would undermine the entire project's credibility. Mitigation: every claim cites a specific RFC section. RFC toggles let readers verify against the original text. Review by someone who has read RFC 959.

**Starlight version updates.** We are on Starlight 0.38.x (pre-1.0). Breaking changes in CSS class names or custom property names could require CSS updates. Mitigation: pin the version in `package.json`. This is already done (`^0.38.3` — we should consider pinning exactly if stability is a concern, but semver range is fine for now).
