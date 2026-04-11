# Product Vision
> Draft v1 — 2026-04-11

## Press Release (Working Backwards)

**"Pretty Docs turns unreadable technical specs into beautiful, understandable documentation — and it's open source."**

For developers and students who need to understand protocols, standards, and low-level libraries but can't stomach reading RFC plaintext or man pages, Pretty Docs is an open-source documentation platform that rewrites ugly technical content into modern, visual, well-structured articles with diagrams, examples, and real explanations. Unlike asking a chatbot, Pretty Docs offers curated, community-reviewed content that's always available, SEO-indexed, and cites its sources. Unlike existing tutorials, it doesn't water down the material — it makes the hard stuff accessible without losing accuracy.

## The Problem

Technical documentation for foundational technologies is unreadable.

RFC 959 (FTP) was written in 1985 and its HTML version is from 1996 — `<PRE>` tags wrapping monospaced walls of text. No diagrams. No navigation. No visual hierarchy. ASCII art instead of proper illustrations. Cross-references that aren't hyperlinks. The W3C's own hosted version of this document makes your eyes bleed.

And it's not just FTP. C library man pages, POSIX standards, protocol specifications, mathematical references — the foundational knowledge that everything is built on is trapped in formats designed for 1970s line printers.

The result: developers either suffer through the originals, rely on scattered blog posts of varying quality, or ask a chatbot and hope it doesn't hallucinate. None of these are good.

## Target User

**Misha, 22, CS student.** He's taking a networking course and needs to understand how FTP actually transfers data. His professor assigned RFC 959. Misha opens the W3C page and sees a wall of monospaced text with no formatting. He tries reading it for 10 minutes, understands maybe 30%, and gives up. He asks ChatGPT — gets a decent answer but isn't sure if it's accurate, and it doesn't have the diagrams he needs to really understand Block Mode's bit flags. He finds a blog post that's too shallow. He finds another that's outdated.

What Misha wants: a single, well-structured, accurate article that explains FTP Data Transfer with proper diagrams, real examples, and a clear progression from simple to complex. Something he can bookmark, come back to, and trust. Something that cites the original RFC so he can verify anything that seems off.

## Core User Flows

### Flow 1: Reading documentation
1. User searches "FTP data transfer explained" or browses Pretty Docs directly
2. Finds a well-structured article with a table of contents, clear sections, diagrams
3. Reads at their own pace — complex concepts have visual aids, analogies, examples
4. Follows links to source material (original RFC) when they want to verify or go deeper
5. Navigates to related articles via sidebar or cross-references

### Flow 2: Contributing an article
1. Contributor finds ugly documentation they want to rewrite (e.g., TCP congestion control)
2. Reads the contribution guide and CLAUDE.md style guide
3. Writes (or uses Claude to help write) a new article following the established format
4. Opens a PR with the article — includes diagrams, examples, source citations
5. Community reviews for accuracy, clarity, and style consistency
6. Article gets merged and published

### Flow 3: Improving existing content
1. Reader notices an error, unclear explanation, or missing diagram in an article
2. Opens a PR with the fix
3. Community reviews and merges

## The 11-Star Experience

**1-star:** The RFC text, copy-pasted into a page with a different font. Still unreadable.

**5-star:** Clean, well-formatted articles with proper typography, a sidebar, dark mode, and search. The text is reorganized into clear sections. Decent.

**11-star:** Every concept has an interactive visualization. You can step through an FTP data transfer frame by frame, seeing bytes flow between client and server. Block Mode headers are an interactive widget where you toggle bit flags and see what happens. There's a "playground" where you connect to a real FTP server and try commands. Every article has a "5-minute version" and a "deep dive" toggle.

**Our MVP (the 3-star version we're not embarrassed by):** One beautifully written article that demonstrates the vision. Clean formatting, proper diagrams, source citations, good navigation. Not interactive, not animated — but undeniably better than the RFC. The contribution pipeline (guide + CLAUDE.md) is in place so the next article can come from the community.

## What Makes This Different

1. **Curated quality.** Not AI-generated-on-the-fly. Every article is reviewed, accurate, and sourced. Like Wikipedia — you trust it because humans checked it.
2. **Structure over single answers.** A chatbot gives you one response. Pretty Docs gives you a structured learning path — table of contents, related pages, progression from simple to complex.
3. **Visual artifacts that matter.** Diagrams, tables, and illustrations are designed, not generated on the fly. They're precise, labeled, and integrated into the explanation.
4. **Sources always cited.** Every article links back to the original specification. You can verify anything. This is documentation, not opinion.
5. **SEO-indexed.** Google "FTP block mode explained" and find the article. Chat responses aren't indexed.
6. **Community-driven.** Articles improve over time through PRs. The best explanation wins.
7. **AI-assisted contributions.** CLAUDE.md style guide means contributors can use Claude to help write articles that match the established quality standard.

## What This Is NOT

- **Not a tutorial site.** We don't teach you to code. We explain the specs and standards that underpin the code you write.
- **Not a wiki.** Articles have a consistent style and quality bar. Not anyone can edit — PRs are reviewed.
- **Not a chatbot wrapper.** Content is authored and curated, not generated on demand.
- **Not limited to protocols.** FTP is first. C++ standards, math references, POSIX — anything with ugly docs is fair game.
- **Not an alternative to the original specs.** We complement them. Every article cites the source. We're the "companion guide," not the replacement.

## MVP Definition

Ship the smallest thing that demonstrates the vision and enables the community:

1. **One complete article: FTP Data Transfer** (rewrite of RFC 959 Section 3)
   - Clean prose with proper formatting
   - Diagrams replacing ASCII art (data types, block headers, compression formats)
   - Real-world examples and analogies
   - Source citations linking back to the original RFC
   - Table of contents and clear navigation

2. **Contribution guide**
   - How to write an article
   - Style expectations (tone, depth, structure)
   - How to submit a PR

3. **CLAUDE.md**
   - AI-readable style guide so contributors can use Claude to help write articles
   - Ensures consistency across community contributions

4. **Landing page**
   - Explains what Pretty Docs is
   - Shows the first article as proof of concept
   - Links to GitHub for contributions

That's it. No multiple protocols, no C libraries section yet, no fancy features. One perfect article that says "this is what every article on this site will feel like."

## Pre-Mortem

Imagine we built Pretty Docs and nobody used it. Why?

1. **"I'll just ask ChatGPT."** Risk: the convenience of chatbots makes a static site feel unnecessary. Mitigation: our value is curation, accuracy, and visual quality that a chatbot can't match. But we have to PROVE this — the first article must be dramatically better than a chat response.

2. **No contributions come in.** Risk: it stays a one-person project with 3 articles forever. Mitigation: CLAUDE.md lowers the barrier — you don't have to be a great writer, Claude helps. The contribution guide makes it clear and easy. But ultimately, the first articles must be so good that people WANT to contribute.

3. **Content gets stale.** Risk: specs get updated, articles fall behind. Mitigation: source citations make it clear what version of the spec is covered. Community PRs can update content. But this is a real long-term risk.

## Decisions Made

- **License:** CC BY-SA for content (like Wikipedia), MIT for code
- **Diagrams:** Flexible per article — Mermaid, SVG, PNG, whatever fits the content best
- **Difficulty levels:** Per-article decision, not a site-wide system

## Open Questions

- Should articles have a "last verified against" date for the source spec?
- How to handle disagreements in PR reviews about content accuracy?
- Naming/branding — is "Pretty Docs" the final name?
