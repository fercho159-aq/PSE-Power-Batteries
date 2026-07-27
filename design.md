# Design — PSE Power Batteries

Locked design system. Every page reads this file before emitting code. Do not
regenerate per page — extend or amend when the system needs to grow.

Direction: **Blueprint técnico claro** — an engineering datasheet you can shop
from. Cool near-white paper, deep-navy ink, hairline rules, mono numbered
labels, a single electric-blue accent used sparingly. Reads as a type-foundry /
spec-sheet, not a templated SaaS page.

/ Hallmark · genre: editorial · design-system: design.md · designed-as-app /

## Genre
editorial (technical/blueprint register — hairline rules, numbered mono labels, roman sans display; single cool accent)

## Macrostructure family
Pages share the dark system; they vary shape by page type.

- Marketing (home):   **Stat-Led** — real numbers lead (30+ años · 71 modelos · 4 marcas · 24–48 h). Figure + worded qualifier, never a bare number.
- Catalog / marca:    **Catalogue** — visual index of inventory, uniform SKU cards, category band per brand/serie.
- Product ficha:      **Split Studio** — diptych: image half / spec-table half.
- Content (calculadora): **Long Document** — single column, prose + the tool inline.

## Theme (light blueprint, OKLCH)
- `--color-paper`     oklch(98.6% 0.004 250)   cool near-white paper
- `--color-paper-2`   oklch(96.4% 0.006 252)   faint panel / card
- `--color-paper-3`   oklch(93.6% 0.009 254)   raised / input fill
- `--color-rule`      oklch(24% 0.045 260 / 0.16)  navy hairline
- `--color-ink`       oklch(23% 0.05 260)      deep-navy ink (headings/body)
- `--color-ink-2`     oklch(48% 0.045 258)     steel (secondary text/labels)
- `--color-accent`    oklch(49% 0.187 262)     electric blue (#1E56C8) — the single accent
- `--color-accent-ink` oklch(99% 0 0)          white on accent
- `--color-royal`     oklch(49% 0.187 262)     = accent (interactive/links/focus)
- `--color-wa`        oklch(58% 0.15 152)      WhatsApp green (brand-functional only)
- `--color-focus`     oklch(49% 0.187 262)

Accent budget: electric blue ≤ 5% of any viewport — eyebrows/labels, links,
active states, key numerals, the drawn underline. No blooms, no gradients.
Optional faint navy blueprint grid on the hero only.

## Typography
- Display: Geist Sans, weight 600, style normal (roman — no italic headers). Tracking −0.03em on large display.
- Body:    Geist Sans, weight 400. `--color-ink-2` on paper.
- Mono:    JetBrains Mono, weight 400–500 — spec values, numerals (tabular), eyebrows, breadcrumbs, badges. The blueprint annotation voice.
- Type scale anchor: `--text-display` = clamp(2.75rem, 6vw + 1rem, 6rem).

## Spacing
4-point named scale mirrored into Tailwind v4 `@theme`. Pages use `p-*`/`gap-*`
utilities or `var(--space-*)`; never raw magic numbers for section rhythm.

## Motion (motion-cut project — CSS only)
- Reveal pattern: **fade-in only**, ≤ 220ms, `--ease-out` cubic-bezier(0.16,1,0.3,1). No slide, no bounce.
- Stat-Led hero figure: number-tick from 0 → target over ~500ms (respect reduced-motion: show final value).
- Reduced-motion: opacity-only ≤ 150ms.
- Hover: hairline card darkens its rule + a whisper shadow (≤ 4px). No glow.

## Microinteractions stance
- Silent success by default; toast on "agregar al carrito" is allowed (sonner), no celebratory confetti.
- Focus ring: 2px `--color-focus`, offset 2px, always visible on keyboard.
- No hover-only affordances on touch.

## CTA voice
- Primary CTA: pill (`--radius-pill`), fill `--color-royal`, ink white, weight 600. Copy = a verb: "Ver catálogo", "Agregar al pedido".
- WhatsApp CTA: pill, fill `--color-wa`, WhatsApp glyph + verb. Only for WhatsApp.
- Secondary CTA: outlined chip, 1px `--color-rule`, mono label, hover fills `--color-paper-3`.

## Nav & footer
- Nav: **N6 masthead bar** — full-width, hairline bottom rule, thin mono promo line above. Brands dropdown persists (client requirement). Mobile: sheet + accordion.
- Footer: **Ft5 Statement** — closes on a sentence, then contact + brand links, hairline dividers.

## Chrome discipline (editorial / blueprint)
- Hairline rules on paper carry structure — 1px navy at ~16% alpha (`--color-rule`). Cards are hairline-bordered panels, NOT elevated dark blocks and NOT glassmorphism.
- Generous whitespace; numbered mono labels (`01 / …`) open sections.
- No radial blooms, no gradient text, no fake browser/phone chrome. Optional faint navy blueprint grid on the hero only.
- Product images sit on a faint panel plate (`--color-paper-3`) with a hairline — a specimen frame, not a bright band.

## Per-page allowances
- Marketing (home) MAY use enrichment: the canvas blooms, a spec ticker, a pulse line.
- Catalog/app pages: function carries them — SKU cards + filters, no decorative enrichment beyond the card glow.
- Content (calculadora): typography + the tool. No blooms competing with the form.

## What pages MUST share
- Wordmark, the electric-blue accent and its ≤5% placement, Geist display + JetBrains mono spec voice, the pill CTA shapes, the numbered/mono section-eyebrow rhythm, the light paper + hairline language.

## What pages MAY differ on
- Macrostructure within the family above, hero archetype, enrichment (marketing only).

## Slop guardrails locked for this project
- Honest copy: only real numbers (30+ años, 71 modelos, 4 marcas, 24–48h). No invented conversion/% claims.
- Roman headers only. Electric blue never as a gradient over display text; emphasis via a drawn underline or weight.
- Every interactive element ships all states incl. focus-visible.
- Mobile clean at 320/375/414/768; `overflow-x: clip` on html+body; image grid tracks `minmax(0,1fr)`.
