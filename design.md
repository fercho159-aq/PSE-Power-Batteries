# Design — PSE Power Batteries

Locked design system. Every page reads this file before emitting code. Do not
regenerate per page — extend or amend when the system needs to grow.

Direction: **Industrial oscuro** — a dark instrument for people who keep critical
equipment alive. Deep navy canvas, phosphor-mono spec labels, one warm amber
accent that behaves like a charge indicator, royal-blue as the interactive hue.

/ Hallmark · genre: atmospheric · design-system: design.md · designed-as-app /

## Genre
atmospheric (adapted industrial — dark canvas, warm bloom, mono spec voice; not the AI-creative register)

## Macrostructure family
Pages share the dark system; they vary shape by page type.

- Marketing (home):   **Stat-Led** — real numbers lead (30+ años · 71 modelos · 4 marcas · 24–48 h). Figure + worded qualifier, never a bare number.
- Catalog / marca:    **Catalogue** — visual index of inventory, uniform SKU cards, category band per brand/serie.
- Product ficha:      **Split Studio** — diptych: image half / spec-table half.
- Content (calculadora): **Long Document** — single column, prose + the tool inline.

## Theme (dark industrial, OKLCH)
- `--color-paper`     oklch(16% 0.035 258)     deep navy canvas
- `--color-paper-2`   oklch(22.3% 0.052 258)   elevated card (#0B1B33)
- `--color-paper-3`   oklch(27.5% 0.067 260)   raised surface (#122647)
- `--color-rule`      oklch(33.5% 0.087 261)   border / divider (used at low alpha)
- `--color-ink`       oklch(94.7% 0.014 258)   high text
- `--color-ink-2`     oklch(75.2% 0.041 258)   mid text
- `--color-accent`    oklch(76.2% 0.160 66)    amber — warm bloom, eyebrows, tags, charge cue
- `--color-accent-ink` oklch(22% 0.05 258)     dark text on amber
- `--color-royal`     oklch(63.4% 0.171 261)   interactive: links, primary CTA fill, focus
- `--color-wa`        oklch(63.3% 0.154 153)   WhatsApp green (brand-functional only)
- `--color-focus`     oklch(63.4% 0.171 261)

Accent budget: amber ≤ 5% of any viewport. Two blooms max on the canvas
(amber + a cooler royal), ~25% footprint, fixed, no animation.

## Typography
- Display: Geist Sans, weight 600, style normal (roman — no italic headers). Tracking −0.03em on large display.
- Body:    Geist Sans, weight 400. `--color-ink-2` on canvas.
- Mono:    JetBrains Mono, weight 400–500 — spec values, numerals (tabular), eyebrows, breadcrumbs, badges. The "phosphor" voice.
- Type scale anchor: `--text-display` = clamp(2.75rem, 6vw + 1rem, 6rem).

## Spacing
4-point named scale mirrored into Tailwind v4 `@theme`. Pages use `p-*`/`gap-*`
utilities or `var(--space-*)`; never raw magic numbers for section rhythm.

## Motion (motion-cut project — CSS only)
- Reveal pattern: **fade-in only**, ≤ 220ms, `--ease-out` cubic-bezier(0.16,1,0.3,1). No slide, no bounce.
- Stat-Led hero figure: number-tick from 0 → target over ~500ms (respect reduced-motion: show final value).
- Reduced-motion: opacity-only ≤ 150ms; ticker + blooms static.
- Hover: cards lift with a soft warm **glow shadow** (amber-tinted), ≤ 8px.

## Microinteractions stance
- Silent success by default; toast on "agregar al carrito" is allowed (sonner), no celebratory confetti.
- Focus ring: 2px `--color-focus`, offset 2px, always visible on keyboard.
- No hover-only affordances on touch.

## CTA voice
- Primary CTA: pill (`--radius-pill`), fill `--color-royal`, ink white, weight 600. Copy = a verb: "Ver catálogo", "Agregar al pedido".
- WhatsApp CTA: pill, fill `--color-wa`, WhatsApp glyph + verb. Only for WhatsApp.
- Secondary CTA: outlined chip, 1px `--color-rule`, mono label, hover fills `--color-paper-3`.

## Nav & footer
- Nav: **N5 Floating pill** — blurred backdrop over the canvas, blooms show through. Brands dropdown persists (client requirement). Mobile: sheet + accordion.
- Footer: **Ft5 Statement** — closes on a sentence, then contact + brand links.

## Chrome discipline (atmospheric)
- Elevated cards (`paper-2`/`paper-3`) instead of hairline-on-white. Borders allowed at low alpha for spec tables only.
- No light-paper sections. The whole site is dark — do not sneak white bands in.
- No glassmorphism, no gradient text, no fake browser/phone chrome.
- Product images sit on a near-white plate inside the card (WebP assets have white ground) — this is the ONE bright surface, framed like a specimen photo, not a page section.

## Per-page allowances
- Marketing (home) MAY use enrichment: the canvas blooms, a spec ticker, a pulse line.
- Catalog/app pages: function carries them — SKU cards + filters, no decorative enrichment beyond the card glow.
- Content (calculadora): typography + the tool. No blooms competing with the form.

## What pages MUST share
- Wordmark, the amber accent and its ≤5% placement, Geist display + JetBrains mono spec voice, the pill CTA shapes, the numbered/mono section-eyebrow rhythm, the dark canvas.

## What pages MAY differ on
- Macrostructure within the family above, hero archetype, enrichment (marketing only).

## Slop guardrails locked for this project
- Honest copy: only real numbers (30+ años, 71 modelos, 4 marcas, 24–48h). No invented conversion/% claims.
- Roman headers only. Amber never on display text (no gradient text).
- Every interactive element ships all states incl. focus-visible.
- Mobile clean at 320/375/414/768; `overflow-x: clip` on html+body; image grid tracks `minmax(0,1fr)`.
