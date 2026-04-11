# CEO Knowledge Base
> Last updated: 2026-04-11

## Mission
Turn unreadable technical documentation into beautiful, understandable articles — open source, community-driven, always sourced.

## Current State
Day zero. Vision and prototype approved by client. Handing off to architect for technical planning.

## The Bet
The world's most important technical knowledge (RFCs, standards, man pages) is trapped in formats from the 1970s. AI chatbots can explain it on the fly, but their answers are ephemeral, unverified, and lack proper diagrams. A curated, community-reviewed, beautifully presented alternative will become the go-to reference — the "Wikipedia of ugly docs."

## Strategic Priorities
1. Architect designs the technical approach (Starlight customization, content structure)
2. Build the landing page and first article (FTP Data Transfer)
3. Create contribution guide + CLAUDE.md for AI-assisted writing
4. Get client feedback on working product

## Product Vision
See .claude/product-vision.md

## Approved Prototype
See .claude/prototypes/ (v1 approved with two changes: de-FTP landing page CTA, add dark mode toggle — addressed in v2)

## Target User
Misha, 22, CS student. Needs to understand FTP/TCP for a networking course. Can't read RFCs. Wants accurate, well-structured, visual explanations he can trust and bookmark.

## MVP Scope
1. One complete article: FTP Data Transfer (rewrite of RFC 959 Section 3)
2. Landing page (platform-focused, not FTP-focused)
3. Contribution guide
4. CLAUDE.md style guide for AI-assisted contributions

## Pre-Mortem: Why This Could Fail
1. "I'll just ask ChatGPT" — must prove curation + visuals are dramatically better
2. No contributions come in — CLAUDE.md must lower the barrier enough
3. Content gets stale — source citations + community PRs mitigate this

## Constraints
- Astro Starlight as the framework (already scaffolded)
- CC BY-SA for content, MIT for code
- Must work as a static site (no backend)
- Diagrams are flexible per article (Mermaid, SVG, PNG)

## Key Decisions Log
[2026-04-11] Project kickoff. Vision and prototype approved by client. (Type 2)
[2026-04-11] License: CC BY-SA for content, MIT for code. (Type 1)
[2026-04-11] Landing page should be platform-focused, not FTP-specific. Client feedback. (Type 2)
[2026-04-11] Dark mode toggle required. Client feedback. (Type 2)
[2026-04-11] Scope is any technical documentation, not just protocols. Categories are dynamic. (Type 2)
[2026-04-11] Contributors will use CLAUDE.md + Claude to write articles. AI-assisted workflow. (Type 2)

## Open Questions
- Final branding — is "Pretty Docs" the name?
- "Last verified against" dates on articles?
- PR review process for content accuracy disputes?
