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
    w3.org/Protocols/     # Articles organized by source domain
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

Adding an article is a two-phase pipeline: **Research** → **Write**. Each phase runs as a dedicated sub-agent. The research agent produces a structured extraction; the writer agent consumes it and produces the final MDX file, diagrams, and sidebar entry.

### URL → File Path → Slug Rule

The article's file path and site URL are derived directly from the source URL. Strip the scheme and `www.` prefix — the rest becomes the path.

| Source URL | File path | `slug` frontmatter |
|---|---|---|
| `https://www.w3.org/Protocols/rfc959/` | `src/content/docs/w3.org/Protocols/rfc959.mdx` | `w3.org/Protocols/rfc959` |
| `https://datatracker.ietf.org/doc/html/rfc2616` | `src/content/docs/datatracker.ietf.org/doc/html/rfc2616.mdx` | `datatracker.ietf.org/doc/html/rfc2616` |
| `https://man7.org/linux/man-pages/man2/open.2.html` | `src/content/docs/man7.org/linux/man-pages/man2/open.2.mdx` | `man7.org/linux/man-pages/man2/open.2` |

**Rules:**
- Strip `https://`, `http://`, and `www.` prefix — keep everything else as-is.
- **Preserve original case** from the URL (e.g., `/Protocols/`, not `/protocols/`).
- Strip trailing `/` and file extensions (`.html`, `.txt`) from the slug, but preserve them in the directory structure where needed.
- The `slug` frontmatter field and the file path (relative to `src/content/docs/`) must match.
- The resulting site URL will be: `https://yarikleto.github.io/pretty-docs/{slug}/`

### Phase 1: Research Sub-Agent

Launch a research agent to deeply study the original specification. The agent must fetch the full document and extract **everything** — no summarizing, no skipping sections.

```
Agent({
  subagent_type: "general-purpose",
  description: "Research [spec name]",
  prompt: `You are a technical research agent for the Pretty Docs project. Your job is to deeply analyze a source specification and extract ALL information needed to write a comprehensive, accurate article. Nothing should be lost or summarized away.

## Source to analyze
[URL of the spec]

## What to extract

### 1. Document metadata
- Full title, authors, date, status (e.g. "Proposed Standard", "Informational")
- Abstract / introduction summary
- Related documents (obsoletes, updates, see-also)

### 2. Complete document structure
List EVERY section and subsection with numbers. For example:
- 1. Introduction
- 2. Overview
- 2.1. History
- 2.2. Terminology
...and so on for the entire document.

### 3. Section-by-section content extraction
For EACH section, provide:
- **Section number and title**
- **Full technical content** — all definitions, rules, algorithms, state machines, formats, constraints. Do NOT summarize. If a section defines 15 error codes, list all 15. If it specifies a byte format, give every field with sizes and meanings.
- **Key quotes** — exact sentences worth citing. Prefix each with the section number. Prioritize: definitions of terms, design rationales ("this was chosen because..."), constraints, MUST/SHOULD/MAY requirements.
- **Tables and structured data** — reproduce any tables from the spec in markdown format.
- **Diagrams described in text** — if the spec describes a model, architecture, flow, state machine, or byte layout in words or ASCII art, capture it fully and note "DIAGRAM CANDIDATE" with a description of what the visual should show.

### 4. Technical details inventory
- All defined terms with their definitions (bold-worthy on first use)
- All constants, magic numbers, default values
- All error codes / status codes with meanings
- All commands / operations with syntax and semantics
- Any encoding rules, byte formats, or protocol grammars
- Security considerations
- Deprecation notes or historical evolution

### 5. Conceptual map
- What are the 3-5 core concepts a reader MUST understand?
- What is the best order to present them (simple → complex)?
- What analogies or mental models does the spec itself suggest?
- What common misconceptions might a reader have?

### 6. Diagram recommendations
For each diagram candidate, describe:
- What it should visualize (architecture, flow, format, state machine)
- What elements it contains (boxes, arrows, labels)
- What relationships to show
- Reference: "see section X.Y for source"

## Output format
Structure your output with clear markdown headers matching the sections above. Use code blocks for protocol examples, tables for structured data, and blockquotes for direct quotes. Mark every quote with its section number.

## Critical rules
- NEVER summarize or abbreviate. If the spec has 50 status codes, list all 50.
- NEVER skip "boring" sections — appendices, security considerations, and edge cases matter.
- ALWAYS include section numbers for traceability.
- If the document is too large to fetch in one pass, fetch it in multiple parts and combine.
- If the spec references other documents for critical definitions, note what needs to be looked up.
- Prefer the canonical/official URL (RFC Editor, W3C, IETF) when fetching.`
})
```

**What the research agent returns:** A structured document with all the raw material. This output is passed directly to the writer agent — nothing is added or removed in between.

### Phase 2: Writer Sub-Agent

After the research agent returns, launch the writer agent. Pass it the FULL research output and let it produce the article.

```
Agent({
  subagent_type: "general-purpose",
  description: "Write [article name] article",
  prompt: `You are the article writer for the Pretty Docs project. You take structured research output and produce a complete, publication-ready MDX article with diagrams and sidebar registration. You write code directly — no planning, no asking for confirmation.

## Research data
[PASTE THE FULL RESEARCH OUTPUT HERE — do not summarize or truncate it]

## Article file location — URL-derived path (CRITICAL)
The file path and slug are derived directly from the source URL by stripping the scheme and www. prefix. Preserve original case.

Source URL: https://www.w3.org/Protocols/rfc959/
→ File: src/content/docs/w3.org/Protocols/rfc959.mdx
→ Slug: w3.org/Protocols/rfc959
→ Site URL: https://yarikleto.github.io/pretty-docs/w3.org/Protocols/rfc959/

Source URL: https://datatracker.ietf.org/doc/html/rfc2616
→ File: src/content/docs/datatracker.ietf.org/doc/html/rfc2616.mdx
→ Slug: datatracker.ietf.org/doc/html/rfc2616

Strip https://, http://, www. prefix. Keep everything else. Strip trailing / and file extensions (.html, .txt) from slug. The slug and file path (relative to src/content/docs/) must match.

## MDX article template

---
title: [Under 60 chars]
description: [One sentence, under 160 chars]
slug: [derived from source URL: strip scheme + www., preserve case, strip trailing / and extensions]
prev: false
next: false
---

import ArticleMeta from '[relative-path]/components/article/ArticleMeta.astro';
import SourceRef from '[relative-path]/components/article/SourceRef.astro';
import SourceCard from '[relative-path]/components/article/SourceCard.astro';
import RfcToggle from '[relative-path]/components/article/RfcToggle.astro';

<ArticleMeta
  source="[Spec name, e.g. RFC 959]"
  sourceUrl="[URL to original document]"
  readingTime="[estimate based on word count]"
/>

[Opening paragraph: 3-4 sentences. What is this? Why does it matter?]

## [Overview Section]
[Mental model + diagram if applicable]
<SourceRef section="X.Y" quote="relevant quote" />

## [Main Sections — one per major concept, simple → complex]
[Content with inline citations]

## Source & Further Reading
<SourceCard
  title="[Spec title]"
  description="[Authors, date]"
  links={[
    { label: "[Link text]", href: "[URL]" }
  ]}
/>

## Import path calculation
Count directory levels from your MDX file to src/. Each level = one "../".
- File at src/content/docs/x/y/file.mdx → 4 levels → ../../../../components/article/...
- File at src/content/docs/x/file.mdx → 3 levels → ../../../components/article/...

## Available components and their props

**ArticleMeta** — Source badge + "View original" link + reading time.
Props: source (string), sourceUrl (string), readingTime (string)

**SourceRef** — Inline citation. Place AFTER every diagram, table, and technical claim.
Props: section (string), quote (string, optional)

**SourceCard** — End-of-article card with links. Goes in "Source & Further Reading" section.
Props: title (string), description (string), links ({ label: string, href: string }[])

**RfcToggle** — Collapsible panel showing original spec text. Use for important sections where readers may want to see the raw spec.
Props: section (string), label (string, optional)
Slot: original text as template literal {⁠\`...\`⁠}

**StructureCard** — Card with colored letter icon, for listing options/variants.
Props: letter (string), title (string), description (string)

**FtpSession** — Styled protocol session block. For protocol examples with manual syntax highlighting.
Props: title (string, optional), context (string, optional)
Slot: HTML spans with classes: syn-keyword (purple), syn-string (green), syn-command (amber), syn-response (blue), syn-number (orange), syn-comment (gray)

## MDX whitespace rules (CRITICAL)
MDX/JSX strips whitespace between HTML elements. Inside <FtpSession>, <RfcToggle>, and similar slot-based components:
- Use {'\n'} for line breaks between spans
- Use {' '} for spaces between same-line spans
Without these, <pre> content renders as one long line.

## Diagram creation
If the research identifies diagram candidates, create Astro SVG components in src/components/diagrams/.

Visual rules:
- Container: background #fafbfc (light) / #1f2133 (dark), border-radius 1rem, padding 2rem
- Color palette: indigo #4c6ef5, green #37b24d, amber #f59f00
- Card fills: white (light) / #252740 (dark)
- Font: Inter, system-ui, sans-serif
- Dark mode via :root[data-theme='dark'] CSS selectors
- Reuse CSS classes from custom.css: .axis-card, .axis-card-text, .axis-card-sub, .diagram-bg, .diagram-card, .diagram-text-primary, .diagram-text-secondary
- SVG marker orient attribute: use "auto", not "auto-start-auto"
- Light mode colors go as inline SVG attributes; dark mode overrides via CSS classes

Reference existing diagrams for patterns:
- ThreeDimensions.astro — row-based grid with colored gradients
- BlockHeader.astro — proportional byte/field layout
- FtpModel.astro — architecture diagram with labeled arrows

## Writing rules

### Tone
- Clear but not dumbed down. Plain language, full technical precision.
- Direct and active voice. "FTP uses two connections" not "It should be noted that..."
- Define terms on first use in **bold**.
- No filler ("In this section we will discuss...", "Basically,...").
- No casual/jokey tone. Documentation, not a blog post.
- Analogies only when they genuinely clarify.

### Source citations (NON-NEGOTIABLE)
1. Every diagram → <SourceRef> immediately below it.
2. Every table from the spec → <SourceRef> below it.
3. Every technical claim → cite the relevant spec section.
4. End every article with <SourceCard>.
5. Valid sources only: RFC Editor, IETF, W3C, ISO, official specs. Never blogs or Stack Overflow.

### Structure
1. Opening paragraph: 3-4 sentences.
2. Overview section with mental model / diagram.
3. Main sections: one per concept, simple → complex, common → rare.
4. H2 sections: 200-500 words. Use H3 for subsections within longer sections.
5. End with "Source & Further Reading".
6. :::note (blue) for tips. :::caution (amber) for warnings. Use sparingly.

### Formatting
- ## H2 for major sections, ### H3 for subsections. Never skip heading levels.
- **Bold** for key terms on first introduction.
- \`Inline code\` for commands, values, field names.
- Markdown tables for structured comparisons.
- Fenced code blocks with language identifiers.
- Short headings: "Data Types" not "A Discussion of Various Data Types."

### Completeness
- Do NOT skip technical details from the research. If the research lists 15 error codes, the article includes all 15.
- Use tables for large sets of codes/commands/options.
- Use RfcToggle for particularly important original text.
- Every section from the spec should be represented unless truly irrelevant.

## Sidebar registration
After creating the article, add it to astro.config.mjs in the sidebar array. If an appropriate category group exists, add there. If not, create a new group.

Format:
{ label: '[Article title]', slug: '[same as frontmatter slug]' }

## Build verification
After all files are created, run:
1. npm run build — check for compilation errors
2. If build succeeds, report the article as ready for preview

## Critical reminders
- Read existing article src/content/docs/w3.org/Protocols/rfc959.mdx as a reference for quality and style before writing.
- Count import path depth carefully — wrong paths = build failure.
- Every claim needs a citation. No uncited technical statements.
- Preserve ALL technical details from the research. The article is a companion to the spec, not a summary.`
})
```

### Phase 3: Review Sub-Agent

After the writer agent finishes and the build passes, launch a review agent. This agent independently re-reads the original source and fact-checks every claim in the article. **This phase is non-optional** — it exists to catch hallucinations, inaccuracies, and missing details.

```
Agent({
  subagent_type: "general-purpose",
  description: "Review [article name] article",
  prompt: `You are a fact-checking reviewer for the Pretty Docs project. Your job is to verify that a written article is accurate, complete, and free of hallucinations by checking it against the original source specification. You are the last line of defense before publication.

## Original source URL
[URL of the spec — the SAME URL given to the research agent]

## Article to review
[PASTE THE FULL MDX ARTICLE CONTENT HERE]

## Your review process

### Step 1: Fetch and read the original source
Fetch the original specification from the URL above. Read it fully. This is your ground truth — everything in the article must be verifiable against this document.

### Step 2: Claim-by-claim verification
Go through the article paragraph by paragraph. For EVERY factual claim, technical statement, number, code, command, status code, or definition:

1. **Find the corresponding section in the original spec.**
2. **Verify the claim is accurate.** Does the article say exactly what the spec says? Not "close enough" — exactly.
3. **Check for subtle distortions.** Common problems:
   - Correct fact attributed to the wrong section number
   - "MUST" in the spec softened to "should" or "can" in the article
   - Omitted qualifiers ("except when..." clauses dropped)
   - Two separate concepts merged into one statement
   - Numbers or sizes slightly wrong (e.g. "16-bit" written as "8-bit")
   - Status codes or reply codes with wrong descriptions
   - Commands with wrong syntax or wrong number of parameters
   - Invented details that sound plausible but are not in the spec

### Step 3: Citation audit
For every <SourceRef section="X.Y"> in the article:
1. Verify that section X.Y exists in the source.
2. Verify that the claim above the citation actually comes from that section.
3. If a quote prop is provided, verify the quote is verbatim or a faithful paraphrase.
4. Flag any technical claims that LACK a citation.

### Step 4: Completeness check
Compare the article against the spec's table of contents:
- Are any major sections of the spec missing from the article?
- Are any important technical details skipped?
- Are tables/lists complete? (If the spec defines 10 reply codes and the article shows 8, flag it.)

### Step 5: Hallucination scan
Look specifically for content that seems plausible but CANNOT be found anywhere in the source:
- Historical claims ("this was introduced in...")
- Rationale claims ("this was designed because...")
- Implementation details not in the spec
- Cross-references to other specs not mentioned in the source
- "Common" or "typical" usage patterns that the spec doesn't describe

## Output format

Structure your review as:

### ERRORS (must fix before publishing)
List each error with:
- **Location:** line/section in the article
- **Claim in article:** what the article says
- **What the spec actually says:** the correct information with section number
- **Fix:** specific correction needed

### WARNINGS (should fix)
- Missing citations
- Incomplete lists/tables
- Minor imprecisions that could mislead

### UNVERIFIABLE CLAIMS
Claims that are not in the source spec and may be hallucinated. For each:
- The claim
- Why you could not find it in the source
- Whether it should be removed or needs a different source

### COMPLETENESS GAPS
Spec sections or details not covered by the article that should be.

### VERIFIED OK
Summary of what you checked and found accurate (so we know the review was thorough).

## Critical rules
- If you CANNOT fetch or read the original source, STOP and report that. Do NOT review from memory.
- Every claim needs verification against the source. Do not assume anything is correct.
- "I didn't find it in the spec" is a valid and important finding — report it.
- Be specific. "Section 4.2 seems wrong" is useless. "Article says 4 transfer modes but Section 3.4 defines only 3" is useful.
- Zero tolerance for hallucinations. If something is not in the source, it must be flagged.`
})
```

**What to do with the review output:**
- **ERRORS** → fix immediately in the article. Every error is a potential lie to the reader.
- **WARNINGS** → fix unless there's a good reason not to.
- **UNVERIFIABLE CLAIMS** → remove them or find a legitimate source. If no source exists, the claim doesn't belong in the article.
- **COMPLETENESS GAPS** → add the missing content if it's significant.

After fixing, re-run the build. If significant changes were made, run the review agent again on the updated article.

### Orchestration

When adding a new article, run these three phases sequentially:

1. **Launch research agent** with the source URL. Wait for it to return.
2. **Review the research output** — verify it's comprehensive. If sections are missing, send the agent back for more detail.
3. **Launch writer agent** with the full research output pasted into the prompt.
4. **After the writer finishes**, run `npm run build` to verify compilation.
5. **Launch review agent** with the original source URL and the full article MDX. Wait for it to return.
6. **Fix all errors and warnings** from the review. Remove any unverifiable claims.
7. If fixes were significant, **re-run the review agent** on the updated article.
8. Run `npm run preview` to visually verify in both light and dark mode.

---

## Article Writing Guide

### Article file template

```mdx
---
title: [Topic Name]
description: [One sentence — what this covers. Under 160 chars.]
slug: [derived from source URL: strip scheme + www., preserve case]
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

**Note on import paths:** Paths are relative from the MDX file to `src/components/`. Count the directory depth from your file. Example: a file at `src/content/docs/w3.org/Protocols/rfc959.mdx` needs `../../../../components/article/...` (4 levels up to `src/`).

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
