# Prototypes

## Current: v2
Client feedback iteration. Two targeted changes, everything else preserved.

**Change 1 -- Platform-focused CTA (landing page):**
- Hero CTA: "Read the first article" changed to "Browse articles"
- Bottom CTA section: "Start with FTP. Then everything else." replaced with "Start reading. Or start writing."
- "Read FTP Data Transfer" button replaced with "Browse articles"
- Added category tags (Protocols, C Libraries, Mathematics, Standards, Unix/POSIX, Cryptography, File Formats, Compression) to communicate platform breadth
- Before/after comparison with RFC 959 example kept as-is (good concrete example)

**Change 2 -- Light/dark theme toggle:**
- Sun/moon toggle button in both landing and article navbars
- Full dark theme using Tailwind `dark:` class variant with `darkMode: 'class'`
- Dark background: #1a1b26, surfaces: #1f2133 / #252740, borders: #2e3150
- SVG diagrams adapt via JavaScript (card fills, text colors, gradient swaps)
- Callouts, tables, code blocks, sidebar, footer all properly themed
- Persists to localStorage, respects system prefers-color-scheme on first visit
- Smooth 300ms CSS transitions on background/color/border changes

**File:** `v2/index.html` (self-contained, Tailwind CDN, no build step)
**Screenshots:** `v2/screenshots/` (landing light, landing dark, article light, article dark)

## Previous: v1
Initial prototype showing the two core pages of Pretty Docs.

**Page 1 -- Landing Page:** Hero with tagline, before/after comparison showing RFC 959 text vs. Pretty Docs version, value props, and CTA to read the first article.

**Page 2 -- Article Page (FTP Data Transfer):** Full article layout demonstrating the Pretty Docs reading experience. Includes:
- Article header with title, description, source citation, reading time
- Left sidebar with navigation (Starlight-style)
- Right sidebar with table of contents (scroll-aware)
- SVG diagram: "Three Dimensions of a Transfer" (TYPE, STRU, MODE)
- Block Mode header format diagram
- Descriptor flags table (EOR=128, EOF=64, Errors=32, Restart=16)
- Blue "Note" and amber "Important" callout boxes
- Syntax-highlighted FTP session code example
- "See original RFC text" toggle buttons for before/after comparison
- Source citation and further reading section

**Design direction:** Clean, spacious, premium documentation feel. Inter font, blue accent (#4c6ef5), 8px spacing grid, generous whitespace. Dark code blocks, subtle borders over hard lines.

**File:** `v1/index.html` (self-contained, Tailwind CDN, no build step)

## History
- **v2** -- client feedback: platform-focused CTA (remove FTP-specific framing), light/dark theme toggle
- **v1** -- initial prototype: landing page + FTP Data Transfer article page
