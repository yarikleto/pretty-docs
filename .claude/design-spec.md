# Design Specification
> Extracted from approved prototype v2 | 2026-04-11

This document is the bridge between the approved prototype (`prototypes/v2/index.html`) and implementation in Astro Starlight. Developers should match these tokens, components, and layouts exactly.

The project customizes Starlight's built-in theme. We are NOT building from scratch. Starlight provides sidebar, search, dark mode toggle, navigation, and base page layouts. We add custom CSS tokens, override Starlight's color system, and create custom Astro components for article-specific patterns.

---

## 1. Design Tokens

### 1.1 Color Palette — Light Mode

**Brand (Primary/Accent) — Indigo Blue:**

| Token        | Hex       | Usage                                                 |
|-------------|-----------|-------------------------------------------------------|
| brand-50    | `#f0f4ff` | Callout note bg, hover bg, diagram row tint           |
| brand-100   | `#dbe4ff` | Feature icon bg, callout code bg                      |
| brand-200   | `#bac8ff` | Hover border on tags, diagram card strokes            |
| brand-300   | `#91a7ff` | —                                                     |
| brand-400   | `#748ffc` | Diagram label text                                    |
| brand-500   | `#5c7cfa` | —                                                     |
| brand-600   | `#4c6ef5` | **Primary accent.** Buttons, logo bg, links, active states, callout note border, TOC active |
| brand-700   | `#4263eb` | Button hover, inline code text, diagram labels        |
| brand-800   | `#3b5bdb` | —                                                     |
| brand-900   | `#364fc7` | —                                                     |

**Surface (Neutral Grays):**

| Token        | Hex       | Usage                                                 |
|-------------|-----------|-------------------------------------------------------|
| surface-50  | `#fafbfc` | Subtle bg sections (feature area)                     |
| surface-100 | `#f1f3f5` | Sidebar bg, section borders, tag bg, inline code bg   |
| surface-200 | `#e9ecef` | Borders, table outer border, dividers                 |
| surface-300 | `#dee2e6` | Secondary borders, source-ref left border             |
| surface-400 | `#ced4da` | Breadcrumb separators, placeholder text               |
| surface-500 | `#adb5bd` | Secondary text (descriptions, muted labels)           |
| surface-600 | `#868e96` | Nav links, code header text, meta text                |
| surface-700 | `#495057` | Body text, table header text                          |
| surface-800 | `#343a40` | Table cell text                                       |
| surface-900 | `#212529` | Headings, strong text, primary text                   |

**Semantic Colors:**

| Purpose       | Color     | Hex       | Usage                              |
|--------------|----------|-----------|------------------------------------|
| Note (info)  | Blue     | `#4c6ef5` | Callout border, icon stroke        |
| Important    | Amber    | `#f59f00` | Callout border, icon stroke        |
| Important    | Amber dk | `#e67700` | Callout heading icon fill          |
| Success      | Green    | `#37b24d` | Structure card label, diagram axis |
| Success lt   | Green    | `#51cf66` | Diagram STRU label text            |
| Success bg   | Green    | `#b2f2bb` | Diagram STRU card strokes          |
| Warning      | Yellow   | `#fcc419` | Diagram MODE label text            |
| Warning bg   | Yellow   | `#ffe066` | Diagram MODE card strokes          |
| Error        | Red      | `#fa5252` | "Before" dot indicator only        |

**Fixed Colors (not theme-dependent):**

| Token            | Hex       | Usage                              |
|-----------------|-----------|------------------------------------|
| code-block-bg   | `#1a1d24` | Code block background (both modes) |
| code-block-text | `#e9ecef` | Code block default text            |

### 1.2 Color Palette — Dark Mode

**Dark Surfaces:**

| Token            | Hex                        | Usage                              |
|-----------------|----------------------------|------------------------------------|
| dark-bg         | `#1a1b26`                  | Page background                    |
| dark-surface    | `#1f2133`                  | Cards, sidebar bg, elevated surface|
| dark-surface2   | `#252740`                  | Deeper surface (buttons, tags, inline code bg) |
| dark-border     | `#2e3150`                  | All borders                        |
| dark-text       | `#c8cad8`                  | Body text                          |
| dark-textBright | `#e4e6f0`                  | Headings, strong text              |
| dark-textMuted  | `#6b6e82`                  | Muted labels, captions             |
| dark-textFaint  | `#8b8ea0`                  | Tag text, table headers            |

**Dark Mode Brand Adjustments:**

| Light token   | Dark equivalent              | Notes                              |
|--------------|-----------------------------|------------------------------------|
| brand-600    | brand-400 (`#748ffc`)       | Primary links and active states    |
| brand-700    | brand-400 (`#748ffc`)       | Inline code text                   |
| brand-800    | `#91a7ff` (brand-300)       | Callout heading text               |

**Dark Mode Callouts:**

| Callout   | Background                    | Border         | Heading text | Body text  |
|----------|-------------------------------|----------------|-------------|------------|
| Note     | `rgba(76, 110, 245, 0.1)`    | `#748ffc`      | `#91a7ff`   | `#c8cad8`  |
| Important| `rgba(245, 159, 0, 0.1)`     | `#fcc419`      | `#fcc419`   | `#c8cad8`  |

**Dark Mode Table:**

| Element      | Value                        |
|-------------|------------------------------|
| Border      | `#2e3150`                    |
| Header bg   | `#1f2133`                    |
| Header text | `#8b8ea0`                    |
| Cell text   | `#c8cad8`                    |
| Row border  | `#252740`                    |
| Code bg     | `rgba(76, 110, 245, 0.15)`  |
| Code text   | `#91a7ff`                    |

**Dark Mode Diagrams (SVG):**

| Element          | CSS Class              | Dark value   |
|-----------------|------------------------|-------------|
| Background fill | `.diagram-bg`          | `#1f2133`   |
| Card fill       | `.diagram-card`        | `#252740`   |
| Card stroke     | `.diagram-card`        | `#2e3150`   |
| Primary text    | `.diagram-text-primary`| `#e4e6f0`   |
| Secondary text  | `.diagram-text-secondary`| `#6b6e82` |
| Axis card fill  | `.axis-card`           | `#252740`   |
| Axis card text  | `.axis-card-text`      | `#e4e6f0`   |
| Axis card sub   | `.axis-card-sub`       | `#6b6e82`   |
| Axis row stroke | stroke-opacity         | `0.3`       |

### 1.3 Typography

**Font Stack:**

| Role    | Family                                  | Weight(s)       |
|--------|----------------------------------------|-----------------|
| Sans   | `Inter, system-ui, sans-serif`         | 400, 500, 600, 700, 800 |
| Mono   | `JetBrains Mono, monospace`            | 400, 500        |
| RFC    | `Courier New, monospace` (for original RFC text panels only) |

**Type Scale:**

| Element                 | Size     | Weight | Line-height | Tracking        | Color (light)  | Color (dark)    |
|------------------------|----------|--------|-------------|-----------------|----------------|-----------------|
| Hero h1                | 3rem (48px) | 800 (extrabold) | 1.1 | tight (-0.025em) | surface-900 | dark-textBright |
| Hero h1 accent span    | 3rem     | 800    | 1.1         | tight           | brand-600      | brand-400       |
| Section h2 (landing)   | 1.5rem (24px) | 700 (bold) | default | tight      | surface-900    | dark-textBright |
| Article h1             | 2.25rem (36px) | 800 | tight    | tight           | surface-900    | dark-textBright |
| Article h2             | 1.5rem (24px) | 700  | default  | tight           | surface-900    | dark-textBright |
| Article h3             | 1.25rem (20px) | 700 | default  | default         | surface-900    | dark-textBright |
| Body text              | 1rem (16px) | 400   | relaxed (1.625) | default    | surface-700    | dark-text       |
| Hero subtitle          | 1.125rem (18px) | 400 | relaxed | default       | surface-600    | dark-text       |
| Article description    | 1.125rem (18px) | 400 | relaxed | default       | surface-500    | dark-text       |
| Small text / captions  | 0.875rem (14px) | 400 | relaxed | default       | surface-500    | dark-text       |
| Label (uppercase)      | 0.75rem (12px) | 600 | default  | wider (0.05em) | surface-400    | dark-text/50    |
| Inline code            | 0.875rem (14px) | 400 | default | default       | brand-700      | brand-400       |
| Code block             | 0.875rem (14px) | 400 | 1.7     | default        | `#e9ecef`      | `#e9ecef`       |
| RFC original text      | 0.8125rem (13px) | 400 | 1.5   | default        | surface-700    | dark-text       |
| Table header           | 0.8125rem (13px) | 600 | default | 0.05em uppercase | surface-700 | `#8b8ea0`     |
| Table cell             | 0.9375rem (15px) | 400 | default | default       | surface-800    | dark-text       |

**Rendering:**
- `-webkit-font-smoothing: antialiased`
- `-moz-osx-font-smoothing: grayscale`

### 1.4 Spacing Scale

Based on an 8px grid. Use Tailwind spacing utilities:

| Token | Value  | Tailwind | Usage examples                           |
|-------|--------|----------|------------------------------------------|
| 1     | 4px    | `p-1`   | Fine adjustments, icon gaps              |
| 1.5   | 6px    | `p-1.5` | Tag vertical padding, search input py    |
| 2     | 8px    | `p-2`   | Small gaps, related elements             |
| 2.5   | 10px   | `p-2.5` | Button vertical padding, tag px          |
| 3     | 12px   | `p-3`   | Sidebar link padding, breadcrumb gaps    |
| 4     | 16px   | `p-4`   | RFC text panel padding                   |
| 5     | 20px   | `p-5`   | Sidebar section padding, card padding, comparison header px |
| 6     | 24px   | `p-6`   | Page horizontal padding, comparison body, diagram container |
| 8     | 32px   | `p-8`   | Article px, feature grid gap, diagram large padding |
| 10    | 40px   | `p-10`  | —                                        |
| 12    | 48px   | `p-12`  | Article py                               |
| 14    | 56px   | —       | —                                        |
| 16    | 64px   | `py-16` | CTA section py                           |
| 20    | 80px   | `py-20` | Section py (before/after, features)      |
| 24    | 96px   | `pt-24` | Hero pt                                  |

**Key spacing relationships:**
- Nav height (landing): `h-16` (64px)
- Nav height (article): `h-14` (56px)
- Sidebar width (left): `w-64` (256px)
- TOC sidebar width (right): `w-56` (224px)
- Article content max-width: `max-w-3xl` (768px)
- Landing content max-width: `max-w-6xl` (1152px)
- Section spacing: `mb-12` (48px) between article sections
- Element spacing within section: `mb-6` (24px) for paragraphs, `mb-4` (16px) for tighter groups

### 1.5 Border Radius

| Token          | Value   | Tailwind       | Usage                                    |
|---------------|---------|----------------|------------------------------------------|
| Small         | 4px     | `rounded`      | Inline code, bit flag indicators         |
| Medium        | 6px     | `rounded-md`   | Toggle button, small logo                |
| Default       | 8px     | `rounded-lg`   | Buttons, search bar, theme toggle, sidebar links, diagram cards |
| Large         | 12px    | `rounded-xl`   | Cards, tables, callouts, code blocks, structure cards, RFC panels |
| XL            | 16px    | `rounded-2xl`  | Comparison cards, diagram containers     |
| Full          | 9999px  | `rounded-full` | Category tags (pill shape), status dots  |

### 1.6 Shadows

Shadows are used very sparingly. The design relies on borders and surface color changes for depth, not shadows.

| Usage                | Value                                  | Tailwind                           |
|---------------------|----------------------------------------|------------------------------------|
| Primary button      | `shadow-sm shadow-brand-600/20`       | `shadow-sm shadow-brand-600/20`    |
| After card (light)  | `shadow-sm shadow-brand-100`          | `shadow-sm shadow-brand-100`       |
| After card (dark)   | none (`shadow-none`)                  | `dark:shadow-none`                 |

**No other shadows in the design.** Everything else uses border + background color changes for elevation.

### 1.7 Transitions

| Property          | Duration | Easing    | Usage                              |
|------------------|----------|-----------|------------------------------------|
| Theme change     | 300ms    | ease      | Background, color, border, box-shadow |
| Interactive hover| 200ms    | ease-out  | Links, buttons, cards              |
| Toggle button    | 150ms    | ease-out  | RFC original text toggle           |
| TOC translate    | default  | default   | "Next" arrow hover translateX      |

### 1.8 Backdrop

| Element  | Value                                      |
|---------|--------------------------------------------|
| Nav bar | `backdrop-blur-sm` + `bg-white/80` (light) or `bg-dark-bg/80` (dark) |

---

## 2. Component Inventory

These are the custom components needed BEYOND what Starlight provides out of the box. Each should be built as an Astro component.

### 2.1 Before/After Comparison Cards (Landing Page Only)

Two side-by-side cards showing RFC original vs. Pretty Docs version.

**Before Card:**
- Container: `rounded-2xl`, `border border-surface-200`, overflow hidden
- Header bar: `bg-surface-100`, `border-b border-surface-200`, `px-5 py-3`
  - Red dot: `w-3 h-3 rounded-full bg-red-400`
  - Label: uppercase, `text-xs font-medium text-surface-500`, tracking `wider`
  - URL hint: `text-xs text-surface-400` right-aligned
- Body: RFC-style monospaced text (`font-family: Courier New`), `text-xs` (11px), `line-height: 1.5`, color `surface-700`, bg `#f8f9fa`, `white-space: pre-wrap`

**After Card:**
- Container: `rounded-2xl`, `border border-brand-200`, `shadow-sm shadow-brand-100`
- Header bar: `bg-brand-50`, `border-b border-brand-100`
  - Blue dot: `w-3 h-3 rounded-full bg-brand-500`
  - Label: uppercase, `text-xs font-medium text-brand-600`, tracking `wider`
  - URL hint: `text-xs text-brand-400`
- Body: Clean formatted content with icon badges (`w-8 h-8 rounded-lg bg-brand-50`), proper hierarchy

**Dark mode:** Borders shift to `dark-border`, header bgs to `dark-surface`, after card border becomes `rgba(76, 110, 245, 0.3)`.

### 2.2 Category Tags / Pills (Landing Page Only)

Pill-shaped tags showing content categories.

- Shape: `rounded-full` (9999px)
- Padding: `0.375rem 0.875rem` (6px 14px)
- Font: `0.8125rem` (13px), weight 500
- Light: `border border-surface-200`, `color surface-700`, `bg white`
- Hover (light): `border-color brand-200`, `color brand-700`, `bg brand-50`
- Dark: `border dark-border`, `color #8b8ea0`, `bg dark-surface2`
- Hover (dark): `border brand-600`, `color #91a7ff`, `bg rgba(76, 110, 245, 0.1)`
- Cursor: `default` (not clickable in MVP)

**Tags shown:** Protocols, C Libraries, Mathematics, Standards, Unix / POSIX, Cryptography, File Formats, Compression

### 2.3 Article Header

Appears at the top of every article page.

**Structure (top to bottom):**
1. **Breadcrumb:** `Home / {Category} / {Title}` — `text-xs text-surface-400`, separator is `/` in `surface-400`, current page in `surface-600`. Home is a link. Dark: `dark-text/50` for inactive, `dark-text` for current.
2. **Title:** `text-4xl font-extrabold tracking-tight leading-tight` in `surface-900`
3. **Description:** `text-lg text-surface-500 leading-relaxed`, `mt-3`
4. **Meta row:** `mt-5`, `flex flex-wrap items-center gap-3`
   - **Source badge:** Pill with icon + text "Based on RFC 959, Section 3" — `text-xs text-surface-400 bg-surface-100 px-2.5 py-1 rounded-md`, with a document icon (12x12)
   - **View original link:** `text-xs text-brand-600` with external link icon (10x10). Opens RFC URL.
   - **Separator:** `|` in `text-surface-300`
   - **Reading time:** `text-xs text-surface-400`, e.g., "12 min read"

### 2.4 Callout / Admonition Boxes

Two types: Note (blue) and Important (amber).

**Shared:**
- `border-radius: 12px` (`rounded-xl`)
- `padding: 1.25rem 1.5rem` (20px 24px)
- `border-left: 3px solid {color}`
- Layout: `flex gap-3` (icon left, content right)
- Icon: 18x18 SVG, `flex-shrink-0 mt-0.5`
- Heading: `text-sm font-semibold mb-1`
- Body: `text-sm leading-relaxed`

**Note (blue):**
- Light: bg `#f0f4ff`, border `#4c6ef5`, heading `text-brand-800`, body `text-brand-900/70`
- Dark: bg `rgba(76, 110, 245, 0.1)`, border `#748ffc`, heading `#91a7ff`, body `#c8cad8`
- Icon: Circle with "i" — stroke `#4c6ef5`

**Important (amber):**
- Light: bg `#fff3e0`, border `#f59f00`, heading `text-yellow-900`, body `text-yellow-900/70`
- Dark: bg `rgba(245, 159, 0, 0.1)`, border `#fcc419`, heading `#fcc419`, body `#c8cad8`
- Icon: Triangle with "!" — stroke `#e67700`
- Code inside: `bg-yellow-100 text-yellow-800` (light), `bg-yellow-900/20 text-yellow-300` (dark)

**Starlight note:** Starlight has built-in `<Aside>` with `note`, `tip`, `caution`, `danger` types. We should override Starlight's aside CSS to match these tokens rather than creating separate components. Map `note` to our blue style, `caution` to our amber style.

### 2.5 "See Original RFC Text" Toggle

A collapsible section that reveals the original RFC text for a given section.

**Toggle button:**
- `font-size: 0.75rem` (12px)
- Light: `color surface-600`, `border 1px solid surface-300`, `bg white`, `rounded-md` (6px), `px-3 py-1`
- Hover: `border-color surface-500`, `color surface-700`
- Active (open): `bg brand-50`, `border-color brand-200`, `color brand-600`
- Dark: `bg dark-surface2`, `border dark-border`, `color #6b6e82`
- Dark hover: `border #3e4170`, `color dark-text`
- Dark active: `bg rgba(76, 110, 245, 0.15)`, `border brand-600`, `color #748ffc`

**Panel (collapsed by default):**
- Container: `rounded-xl`, `border border-surface-200`, `overflow-hidden`, `mt-3`
- Header: `px-4 py-2`, `bg-surface-100`, `border-b border-surface-200`, `text-xs text-surface-500 font-mono` — shows "RFC 959, Section X.X.X"
- Body: `p-4`, RFC-style text (Courier New, 13px, `line-height: 1.5`, `white-space: pre-wrap`, color `surface-700`, bg `#f8f9fa`)
- Dark: header bg `dark-surface`, border `dark-border`, text bg `dark-bg`, text color `dark-text`

**Behavior:** Click toggles visibility. Button text alternates between "See original RFC text" and "Hide original RFC text".

### 2.6 Code Block

Styled code blocks for protocol examples.

**Container:**
- Background: `#1a1d24` (same in both themes — code blocks are always dark)
- `border-radius: 12px` (`rounded-xl`)
- `overflow: hidden`

**Header:**
- Background: `rgba(255, 255, 255, 0.05)`
- Padding: `0.625rem 1.5rem` (10px 24px)
- Font: `0.8125rem` (13px), color `#868e96`
- Border bottom: `1px solid rgba(255, 255, 255, 0.06)`
- Left side: descriptive label. Right side: context label (e.g., "Control connection (port 21)") in `text-surface-600 text-xs`

**Body:**
- Padding: `1.5rem` (24px)
- Font: `0.875rem` (14px), `line-height: 1.7`
- Overflow-x: auto

**Syntax highlight colors (custom, not a standard theme):**

| Token        | Hex       | Usage            |
|-------------|-----------|------------------|
| syn-keyword | `#c792ea` | Keywords         |
| syn-string  | `#c3e88d` | String values    |
| syn-number  | `#f78c6c` | Numbers          |
| syn-comment | `#546e7a` | Comments         |
| syn-response| `#82aaff` | Server responses |
| syn-command | `#ffcb6b` | FTP commands     |

**Starlight note:** Starlight uses Shiki for syntax highlighting. For standard languages (JS, Python, etc.) use Starlight's built-in Shiki theming with a custom theme matching these colors. For FTP session examples (which are not a standard Shiki language), we need a custom Astro component that wraps pre-formatted HTML with these CSS classes.

### 2.7 Structure Cards (File / Record / Page)

Cards showing data structure options. Used in the "Data Structures" section.

**Card:**
- Container: `rounded-xl`, `border border-surface-200`, `p-5`
- Layout: `flex items-start gap-3`
- Icon container: `w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0 mt-0.5`
  - Letter: `text-xs font-bold text-green-600`
- Title: `text-base font-semibold text-surface-900`
- Description: `text-sm text-surface-600 leading-relaxed mt-1`
- Stack: `space-y-4` between cards

**Dark mode:**
- Border: `dark-border`
- Icon bg: `rgba(55, 178, 77, 0.12)`
- Icon letter: `#51cf66`
- Title: `dark-textBright`
- Description: `dark-text`

### 2.8 Block Header Diagram (SVG)

Technical diagram showing the 3-byte block header format (Descriptor 8 bits + Byte Count 16 bits).

**Container:** `bg-surface-50 rounded-2xl p-6` (dark: `bg-dark-surface`)
**Label:** `text-xs font-semibold text-surface-400 uppercase tracking-wider mb-4` — "Block Header Format"

**SVG (600x130 viewBox):**
- Two rectangles side by side:
  - Descriptor box: `fill #f0f4ff`, `stroke #4c6ef5`, `stroke-width 1.5`, `rx 4`
  - Byte Count box: same styling, wider (300px vs 150px)
- Labels inside boxes: 13px font-weight 600 for name, 11px for "8 bits" / "16 bits"
- Bit position markers above boxes: 10px, `fill #adb5bd`
- Dashed separator line below: `stroke #dee2e6`, `stroke-dasharray 4,3`
- Caption below line: 11px, `fill #868e96`

**Dark mode:** Cards fill `#252740`, text `#e4e6f0` / `#6b6e82`, stroke via `axis-card` class.

### 2.9 Three Dimensions Diagram (SVG)

The main overview diagram showing TYPE, STRU, and MODE as three horizontal rows.

**Container:** `bg-surface-50 rounded-2xl p-8` (dark: `bg-dark-surface`)

**SVG (700x320 viewBox):**
Three horizontal rows, each a rounded rect with gradient fill:

| Row   | Label color | Gradient tint | Stroke color | Card stroke |
|-------|------------|---------------|-------------|-------------|
| TYPE  | `#4263eb` / `#748ffc` | Blue `#4c6ef5` at 0.1 opacity | `#bac8ff` | `#dbe4ff` |
| STRU  | `#2b8a3e` / `#51cf66` | Green `#37b24d` at 0.1 opacity | `#b2f2bb` | `#b2f2bb` |
| MODE  | `#e67700` / `#fcc419` | Amber `#f59f00` at 0.1 opacity | `#ffe066` | `#ffe066` |

Each row has:
- Left label: command name in 11px bold + category name in 11px
- Inline cards (white fill, colored stroke, `rx 8`): each option as `name (12px bold) + subtitle (10px gray)`

**Dark mode adaptation:** JavaScript swaps gradient defs to `*Dark` variants (opacity 0.15 instead of 0.1), card fills to `#252740`, text to `#e4e6f0` / `#6b6e82`, stroke-opacity to 0.3.

### 2.10 Data Table

Used for the descriptor flags table and similar structured data.

**Container:**
- `border-collapse: separate`, `border-spacing: 0`
- `border-radius: 12px`, `overflow: hidden`
- `border: 1px solid surface-200`

**Header cells:**
- `bg-surface-100` (`#f8f9fa` — note: prototype uses `#f8f9fa`, not surface-100 `#f1f3f5`)
- Font: 0.8125rem (13px), weight 600, uppercase, `letter-spacing: 0.05em`
- Color: `surface-700`
- Padding: `0.75rem 1.25rem`
- Border bottom: `1px solid surface-200`

**Body cells:**
- Padding: `0.75rem 1.25rem`
- Font: 0.9375rem (15px)
- Color: `surface-800`
- Border bottom: `1px solid surface-100`
- Last row: no bottom border

**Inline code in tables:**
- `bg brand-50`, `color brand-700`, `px-1.5 py-0.5`, `rounded` (4px), font-size 0.8125rem, JetBrains Mono

**Dark mode:** See section 1.2 dark mode table tokens.

### 2.11 Source Citation Reference

Inline citation that appears after diagram/content sections.

- `font-size: 0.75rem` (12px)
- `color: surface-600` (light) / `#6b6e82` (dark)
- `border-left: 2px solid surface-300` (light) / `dark-border` (dark)
- `padding-left: 0.75rem`
- `margin-top: 1rem`

Content format: "RFC 959, Section X.X -- {quote from RFC}"

### 2.12 Source & Further Reading Section

A card at the bottom of each article linking to the original specification.

**Card:**
- `rounded-xl`, `border border-surface-200`, `p-6`
- Layout: `flex items-start gap-4`
- Icon: `w-10 h-10 rounded-xl bg-surface-100 flex items-center justify-center` — document icon in `text-surface-500`
- Title: `font-semibold text-surface-900` (dark: `dark-textBright`)
- Description: `text-sm text-surface-500 mt-1`
- Links row: `mt-3`, `flex items-center gap-3`
  - Link style: `text-sm text-brand-600 font-medium` with external icon
  - Separator: `|` in `text-surface-300`

### 2.13 Article Navigation (Prev/Next)

Bottom navigation between articles.

- Container: `mt-16 pt-8 border-t border-surface-100`, `flex items-center justify-between`
- Link: `text-sm font-medium text-surface-500 hover:text-brand-600` (dark: `dark-text` / `brand-400`)
- Arrow icon: 16x16 chevron, `group-hover:translate-x-0.5 transition-transform`

### 2.14 Inline Code

Used throughout article body text.

- Font: `JetBrains Mono`, 0.875rem (14px)
- Light: `bg surface-100`, `color brand-700`, `px-1.5 py-0.5`, `rounded` (4px)
- Dark: `bg rgba(76, 110, 245, 0.15)`, `color #91a7ff`

### 2.15 Logo / Brand Mark

- Icon container: `w-7 h-7 bg-brand-600 rounded-lg` (landing nav), `w-6 h-6 rounded-md` (article nav), `w-5 h-5 rounded` (footer)
- SVG inside: document icon with text lines (white strokes)
- Text: "Pretty Docs", `font-semibold tracking-tight text-surface-900` (dark: `dark-textBright`)
- Landing nav: text-base, Article nav: text-sm

---

## 3. Screen Map

### 3.1 Landing Page

```
+------------------------------------------------------------------+
| NAV: [Logo Pretty Docs]          [Articles] [Contribute] [GH] [D]|
+------------------------------------------------------------------+
|                                                                    |
|  HERO (hero-gradient bg)                                          |
|  max-w-2xl left-aligned                                           |
|  h1: "Old docs are ugly.\nThese aren't." (accent on 2nd line)    |
|  p: subtitle                                                      |
|  [Browse articles ->]  [View on GitHub]                           |
|  pt-24 pb-20                                                      |
|                                                                    |
+------------------------------------------------------------------+
|                                                                    |
|  BEFORE/AFTER (bg-white, border-t)                                |
|  Centered h2 + subtitle                                           |
|  2-col grid (max-w-5xl):                                          |
|    [Before: RFC 959 monospace]  [After: Pretty Docs formatted]    |
|  py-20                                                            |
|                                                                    |
+------------------------------------------------------------------+
|                                                                    |
|  FEATURES (bg-surface-50, border-t)                               |
|  Centered h2 + description paragraph                              |
|  3-col grid (max-w-4xl):                                          |
|    [icon] Curated    [icon] Visual    [icon] Sourced              |
|  py-20                                                            |
|                                                                    |
+------------------------------------------------------------------+
|                                                                    |
|  CTA (bg-white, border-t)                                         |
|  Centered h2 + subtitle                                           |
|  Category tags (flex-wrap, gap-2.5, centered)                     |
|  [Browse articles ->]  [Contribution guide]                       |
|  py-16                                                            |
|                                                                    |
+------------------------------------------------------------------+
| FOOTER: [Logo] CC BY-SA / MIT         [GitHub] [Contribute]      |
+------------------------------------------------------------------+
```

**Visual acceptance criteria:**
- [ ] Hero gradient: `linear-gradient(135deg, #f0f4ff 0%, #ffffff 50%, #f0f4ff 100%)` (dark: `#1f2133` to `#1a1b26` to `#1f2133`)
- [ ] Nav: sticky top-0, backdrop-blur, 80% opacity bg, border-b, h-16
- [ ] Before/After cards: equal height in 2-col grid, proper header bars with colored dots
- [ ] Feature icons: `w-10 h-10 rounded-xl bg-brand-100` with blue SVG icons
- [ ] Category tags: pill-shaped, wrap naturally, hover state changes border+text color
- [ ] Primary buttons: `bg-brand-600 text-white rounded-lg shadow-sm`, hover `bg-brand-700`
- [ ] Secondary buttons: `border border-surface-300 text-surface-700 rounded-lg`, hover bg
- [ ] Footer: `bg-surface-50`, `border-t`, compact `py-8`
- [ ] All text is Inter. No lorem ipsum.
- [ ] Dark mode: all sections respond correctly. No white flashes.

### 3.2 Article Page

```
+------------------------------------------------------------------+
| NAV: [Logo] | FTP Data Transfer    [Search docs... Ctrl K] [D][GH]|
+-------+------------------------------------------+---------------+
| SIDE  | MAIN (max-w-3xl centered, px-8 py-12)   | TOC           |
| w-64  |                                          | w-56          |
| ------| Breadcrumb: Home / Networking / FTP...   | (xl: only)    |
| Net.  | h1: FTP Data Transfer                    |               |
|  * FTP| p: description                           | On this page  |
|    ...|                                          |  * Overview   |
|  TCP  | Meta: [RFC badge] [View original] | 12m  |  * Data Types |
|       |                                          |  * Structures |
| Contr.| --- Article body ---                     |  * Modes      |
|  Write| Overview text                            |    - Stream   |
|  Style| Three Dimensions diagram (SVG)           |    - Block    |
|       | Source citation                          |    - Compress |
|       |                                          |  * Example    |
|       | h2: Data Types (border-b)                |  * Source     |
|       | Body text + Note callout                 |               |
|       | [See original RFC text] toggle           |               |
|       |                                          |               |
|       | h2: Data Structures (border-b)           |               |
|       | 3x Structure cards (File, Record, Page)  |               |
|       |                                          |               |
|       | h2: Transfer Modes (border-b)            |               |
|       |   h3: Stream Mode                        |               |
|       |   h3: Block Mode                         |               |
|       |   Block header diagram (SVG)             |               |
|       |   Descriptor flags table                 |               |
|       |   Important callout                      |               |
|       |   Source citation                        |               |
|       |   [See original RFC text] toggle         |               |
|       |   h3: Compressed Mode                    |               |
|       |   Numbered list (3 encoding types)       |               |
|       |                                          |               |
|       | h2: Example Session (border-b)           |               |
|       | Code block (FTP session)                 |               |
|       | Note callout                             |               |
|       |                                          |               |
|       | h2: Source & Further Reading (border-b)  |               |
|       | Source card (RFC 959 link)                |               |
|       |                                          |               |
|       | --- Prev/Next nav (border-t) ---         |               |
+-------+------------------------------------------+---------------+
```

**Visual acceptance criteria:**
- [ ] Nav: h-14, backdrop-blur, sticky. Logo smaller than landing (w-6). Pipe separator `|`. Search bar mock with `Ctrl K` badge.
- [ ] Left sidebar: `w-64`, `bg-surface-50`, `border-r`, sticky below nav. Category labels uppercase 12px. Active item: `bg-brand-50 text-brand-700 font-medium rounded-lg`. "Soon" labels in `text-surface-300`.
- [ ] Right TOC: `w-56`, visible only on `xl:` breakpoint. `border-l` (invisible in light, `dark-border` in dark). Scroll-aware active state: `color brand-600`, `border-l-2 border-brand-600`. Nested items indented with `pl-6`.
- [ ] Article header: breadcrumb above title, source badge + reading time below description
- [ ] h2 sections: `border-b border-surface-100` with `pb-3 mb-6`
- [ ] Diagrams: contained in `bg-surface-50 rounded-2xl` with generous padding
- [ ] Callouts: match exact colors per type (blue note, amber important)
- [ ] Code block: always dark bg regardless of theme. Header with label + context.
- [ ] Tables: rounded corners via `border-radius: 12px` with overflow hidden
- [ ] RFC toggle: collapsed by default, smooth show/hide
- [ ] Structure cards: vertically stacked with `space-y-4`
- [ ] Source card: at bottom with document icon and external links
- [ ] Prev/Next: right-aligned "Next: FTP Commands" with hover arrow animation
- [ ] Main content area: horizontally centered with `max-w-3xl`
- [ ] Dark mode: every element responds. Diagrams update via JS or CSS.

---

## 4. Starlight Customization Notes

### 4.1 What Starlight Provides (Use As-Is or With CSS Overrides)

| Feature                | Starlight built-in | Our customization                     |
|-----------------------|-------------------|---------------------------------------|
| Left sidebar          | Yes               | Override colors to match our tokens   |
| Right TOC ("On this page") | Yes          | Override colors, active state styling |
| Dark mode toggle      | Yes               | Override icon and button styling      |
| Search (Pagefind)     | Yes               | Override search bar styling           |
| Breadcrumbs           | Yes (optional)    | Enable; override text/link colors     |
| Prev/Next navigation  | Yes               | Override styling to match spec        |
| Page layout           | Yes               | Use default 3-column layout           |
| Mobile responsive     | Yes               | Starlight handles hamburger/collapse  |
| Head/meta tags        | Yes               | Configure in frontmatter              |

### 4.2 What Needs CSS Overrides (Starlight Custom CSS)

Create a custom CSS file and reference it in `astro.config.mjs` via `customCss`:

```js
starlight({
  title: 'Pretty Docs',
  customCss: ['./src/styles/custom.css'],
  // ...
})
```

**CSS custom properties to override (Starlight uses CSS custom properties):**

```css
/* In src/styles/custom.css */

:root {
  /* Brand colors */
  --sl-color-accent-low: 219 79% 93%;      /* brand-50: #f0f4ff */
  --sl-color-accent: 231 82% 63%;          /* brand-600: #4c6ef5 */
  --sl-color-accent-high: 231 54% 28%;     /* brand-900: #364fc7 */

  /* Text colors */
  --sl-color-white: 210 17% 9%;            /* surface-900: #212529 */
  --sl-color-gray-1: 210 14% 22%;          /* surface-800: #343a40 */
  --sl-color-gray-2: 210 10% 33%;          /* surface-700: #495057 */
  --sl-color-gray-3: 210 7% 56%;           /* surface-500: #adb5bd */
  --sl-color-gray-4: 210 14% 89%;          /* surface-200: #e9ecef */
  --sl-color-gray-5: 210 17% 95%;          /* surface-100: #f1f3f5 */
  --sl-color-gray-6: 210 25% 98%;          /* surface-50: #fafbfc */
  --sl-color-black: 0 0% 100%;             /* white bg */

  /* Font families */
  --sl-font: 'Inter', system-ui, sans-serif;
  --sl-font-mono: 'JetBrains Mono', monospace;

  /* Font sizes — match our type scale */
  --sl-text-h1: 2.25rem;    /* 36px */
  --sl-text-h2: 1.5rem;     /* 24px */
  --sl-text-h3: 1.25rem;    /* 20px */
  --sl-text-body: 1rem;     /* 16px */
  --sl-text-sm: 0.875rem;   /* 14px */
  --sl-text-xs: 0.75rem;    /* 12px */

  /* Line height */
  --sl-line-height: 1.625;
  --sl-line-height-headings: 1.2;
}

/* Dark mode overrides */
:root[data-theme='dark'] {
  --sl-color-accent-low: 231 52% 20%;      /* dark brand bg */
  --sl-color-accent: 231 82% 72%;          /* brand-400: #748ffc */
  --sl-color-accent-high: 231 86% 82%;     /* brand-300: #91a7ff */

  --sl-color-white: 231 20% 90%;           /* dark-textBright: #e4e6f0 */
  --sl-color-gray-1: 231 12% 80%;          /* dark-text: #c8cad8 */
  --sl-color-gray-2: 231 8% 52%;           /* dark-textMuted adjusted */
  --sl-color-gray-3: 231 10% 46%;          /* #6b6e82 */
  --sl-color-gray-4: 231 24% 25%;          /* dark-border: #2e3150 */
  --sl-color-gray-5: 231 24% 20%;          /* dark-surface2: #252740 */
  --sl-color-gray-6: 231 26% 17%;          /* dark-surface: #1f2133 */
  --sl-color-black: 231 27% 13%;           /* dark-bg: #1a1b26 */
}
```

**Additional CSS overrides needed:**
- Nav height and backdrop-blur styling
- Sidebar active item: match `bg-brand-50 text-brand-700 rounded-lg`
- TOC active link: `color brand-600` with `border-left-2px brand-600`
- h2 bottom borders: `border-b border-surface-100 pb-3`
- Search bar: match the prototype's pill-shaped search with `Ctrl K` badge
- Link colors: `brand-600` (light) / `brand-400` (dark)
- Font imports: add Inter and JetBrains Mono via `<link>` in head config

### 4.3 What Needs Custom Astro Components

These components do not exist in Starlight and must be created from scratch as `.astro` files in `src/components/`:

| Component              | File                      | Usage                                      |
|-----------------------|--------------------------|--------------------------------------------|
| Callout (Note)        | `CalloutNote.astro`      | Blue info box with icon                    |
| Callout (Important)   | `CalloutImportant.astro` | Amber warning box with icon                |
| RFC Toggle            | `RfcToggle.astro`        | Collapsible original RFC text panel        |
| Structure Card        | `StructureCard.astro`    | Card with letter icon + title + description|
| Source Citation        | `SourceRef.astro`        | Inline RFC quote with left border          |
| Source Card           | `SourceCard.astro`       | Full source/further reading card           |
| Code Block (FTP)      | `FtpSession.astro`       | Custom code block for FTP session syntax   |
| Data Table            | `DataTable.astro`        | Styled table with rounded corners          |
| Inline Code           | — (CSS only)             | Override Starlight's default `<code>` style|

**Note on Starlight Asides:** Alternatively, instead of custom Callout components, override Starlight's built-in `<Aside>` component CSS to match our color tokens. This is simpler if the Aside markup supports it. Test first.

### 4.4 What Needs Custom Page Overrides

**Landing page:** Starlight's `splash` template is basic. The landing page in the prototype has a custom hero, before/after section, features grid, CTA with category tags, and footer. This requires either:
- A fully custom `index.astro` page that does NOT use Starlight's layout (recommended for landing), OR
- Heavy overrides of Starlight's splash template

**Recommendation:** Build the landing page as a standalone Astro page (`src/pages/index.astro`) that imports its own layout. Use Starlight only for documentation pages (articles, contribution guide).

**Article pages:** Use Starlight's `docs` layout. Add custom components via MDX imports. All custom components are imported per-article in the MDX frontmatter/body.

### 4.5 SVG Diagrams

Diagrams should be created as standalone `.svg` files or inline SVG in custom Astro components. They need to support dark mode via:

**Option A (recommended): CSS classes + Starlight's data-theme attribute.**
Use CSS classes on SVG elements (`.diagram-bg`, `.diagram-card`, `.diagram-text-primary`, `.diagram-text-secondary`) and target `[data-theme='dark']` in CSS to swap fills/strokes.

**Option B: Separate light/dark SVG files.**
Less elegant but simpler. Use Starlight's theme detection to conditionally render the right file.

**Diagram color reference for authors creating new diagrams:**

| Element             | Light fill  | Light stroke | Dark fill   | Dark stroke  |
|--------------------|------------|-------------|------------|-------------|
| Container bg       | `#fafbfc`  | —           | `#1f2133`  | —           |
| Card/box           | `white`    | varies      | `#252740`  | `#2e3150`   |
| Primary text       | `#212529`  | —           | `#e4e6f0`  | —           |
| Secondary text     | `#868e96`  | —           | `#6b6e82`  | —           |
| Blue accent tint   | `#f0f4ff`  | `#bac8ff`   | rgba(76,110,245,0.15) | rgba(186,200,255,0.4) |
| Green accent tint  | `#ebfbee`  | `#b2f2bb`   | rgba(55,178,77,0.15) | rgba(178,242,187,0.4) |
| Amber accent tint  | `#fff9db`  | `#ffe066`   | rgba(245,159,0,0.15) | rgba(255,224,102,0.4) |

### 4.6 Font Loading

Add to Starlight's `head` config in `astro.config.mjs`:

```js
starlight({
  head: [
    { tag: 'link', attrs: { rel: 'preconnect', href: 'https://fonts.googleapis.com' } },
    { tag: 'link', attrs: { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true } },
    { tag: 'link', attrs: { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap' } },
  ],
})
```

### 4.7 Starlight Config Updates Needed

```js
// astro.config.mjs
starlight({
  title: 'Pretty Docs',
  customCss: ['./src/styles/custom.css'],
  head: [/* font links above */],
  social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/...' }],
  sidebar: [
    {
      label: 'Networking',
      autogenerate: { directory: 'networking' },
    },
    {
      label: 'Contributing',
      items: [
        { label: 'Write an article', slug: 'contributing/write' },
        { label: 'Style guide', slug: 'contributing/style-guide' },
      ],
    },
  ],
  components: {
    // Override Starlight components if needed:
    // Hero: './src/components/overrides/Hero.astro',
  },
})
```

---

## 5. Implementation Priority

For MVP, implement in this order:

1. **Custom CSS tokens** (colors, fonts, spacing) — everything else depends on this
2. **Landing page** (standalone Astro page outside Starlight)
3. **Article page styles** (Starlight CSS overrides for sidebar, TOC, nav, headings)
4. **Custom article components** (callouts, RFC toggle, structure cards, source citation, code block, data table)
5. **SVG diagrams** (Three Dimensions diagram, Block Header diagram) with dark mode support
6. **Polish** (transitions, hover states, focus states, responsive behavior)
