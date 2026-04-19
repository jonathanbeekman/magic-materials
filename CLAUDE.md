# Magic Materials Website — Claude Code Briefing

## Project Overview

Static HTML/CSS/JS website for **Magic Materials** (brand of ILB Biosciences). The site targets oral care brand partners who want to license genuinely marine-biodegradable product material ("Magic Materials PHA/PHB"). The business model is a co-branding partnership ("Powered by Magic Materials") similar to Intel Inside.

**Deploy target:** Vercel (static). `vercel.json` is already configured with `cleanUrls: true` so `/about` serves `about.html`.

**No framework. No build step. No npm.** Pure HTML + CSS + vanilla JS. Do not introduce React, Next.js, or any bundler.

---

## File Structure

```
website/
├── index.html              # Homepage
├── material.html           # The Material (science / Magic Materials PHA/PHB)
├── products.html           # Products (tongue scrapers + floss picks)
├── partners.html           # Partner Program ("Powered by Magic Materials")
├── certifications.html     # Certifications & testing roadmap
├── about.html              # About / Founder / ILB Biosciences
├── contact.html            # Contact (no form yet — just mailto links)
├── vercel.json             # { "cleanUrls": true, "trailingSlash": false }
├── css/
│   └── style.css           # All styles (~780 lines, single file)
└── js/
    └── components.js       # Shared nav + footer injection, FAQ accordion, animations
```

---

## Design System

### CSS Custom Properties (defined in `:root`)

```css
--dark:     #1A2E35   /* primary dark background */
--teal:     #028090   /* primary brand color */
--seafoam:  #02C39A   /* accent / highlight */
--light:    #E8F4F6   /* light section backgrounds */
--mid:      #4A6B72   /* secondary text */
--muted:    #8AADB4   /* tertiary / placeholder text */
--red:      #E05A4B   /* negative / cross indicators */
--white:    #FFFFFF

--font-head: 'Trebuchet MS', Tahoma, Geneva, sans-serif
--font-body: system-ui stack

--radius:    10px
--radius-lg: 16px
--radius-sm: 6px
--shadow:    0 4px 24px rgba(0,0,0,.08)
--shadow-sm: 0 2px 12px rgba(0,0,0,.06)
--transition: .2s ease
```

### Layout Classes

| Class | Behavior |
|---|---|
| `.container` | max-width 1160px, centered, padding 0 24px |
| `.section` | padding 80px 24px, max-width 1160px, centered |
| `.section-alt` | same padding, background `var(--light)` |
| `.section-dark` | same padding, background `var(--dark)`, light text |
| `.page-hero` | inner page header, dark bg with radial gradient, teal `.section-label` |
| `.grid-2` | 2-col CSS grid, 40px gap |
| `.grid-3` | 3-col CSS grid, 28px gap |
| `.grid-4` | 4-col CSS grid, 24px gap |
| `.text-center` | text-align center |

All grids collapse to single column at ≤760px (`.grid-2`, `.grid-3`) or ≤640px (`.grid-4`).

### Component Classes

**Cards:** `.card` (white, shadow, border-radius, padding 28px 32px), `.card-accent` (teal left border + light bg icon), `.callout` (teal bg), `.callout-dark` (dark bg + seafoam left border)

**Buttons:** `.btn` base + `.btn-primary` (seafoam), `.btn-teal` (teal), `.btn-outline` (white border, transparent)

**Tables:** `.data-table` — full-width, striped. Status cells: `.check` (green), `.cross` (red), `.badge-progress` (amber pill), `.badge-good` (green pill)

**Process steps:** `.steps` (3-col grid) > `.step` > `.step-header` (teal bg) + `.step-body`

**Certification cards:** `.cert-grid` (2-col) > `.cert-card` (teal left border)

**Product cards:** `.product-card` > `.product-card-header` (dark bg) + `.product-card-body`; spec rows use `.spec-row` / `.spec-label` / `.spec-value`

**Feature list:** `.feature-list` > `.feature-item` (flex row) > `.feature-dot` (seafoam bullet) + content div

**FAQ accordion:** `.faq` > `.faq-item` > `button.faq-q` + `div.faq-a` — JS in `components.js` toggles `.open` class on both

**Founder card:** `.founder-card` (2-col grid: 280px dark left + white right) > `.founder-left` / `.founder-right`

**Contact method card:** `.contact-method` (flex-column card) — uses `.contact-icon` (52px emoji block) + `h3` + `p` + btn

**WSU badge:** `.wsu-badge` (flex row, teal border-left, emoji + text)

**Comparison pills:** `.pill-row` > `.pill.pill-green` / `.pill.pill-red`

**Section label:** `.section-label` — small caps, seafoam, used above headings

---

## Shared Components (js/components.js)

Nav and footer are injected via JS into `<nav id="nav"></nav>` and `<footer id="footer"></footer>`. Every page must have both elements and `<script src="/js/components.js"></script>` before `</body>`.

**Active nav state:** set by matching `window.location.pathname` slug against `data-page` attributes on nav links.

**Interactive behaviors wired up in `components.js`:**
- Mobile hamburger toggle (`.nav-toggle` button)
- FAQ accordion (toggle `.open` on `.faq-q` and `.faq-a`)
- Smooth scroll for `a[href^="#"]`
- IntersectionObserver fade-in on `.card, .step, .product-card, .cert-card, .founder-card`

---

## Content & Copy Notes

### Brand voice
Science-first, direct, no greenwashing. Claims are always qualified with test status. Avoid superlatives without evidence. Preferred phrasing: "testing in progress" not "will be certified."

### Key product facts
- **Material:** Magic Materials PHA/PHB — PHB (Polyhydroxybutyrate) + Nylon-6 (current); Nylon-4 is the target long-term formulation as commercial-scale production develops with manufacturing partners
- **Resin supplier:** PHABuilders (China-based, commercial-scale fermentation)
- **Products:** Tongue scrapers (30-ct) and Floss picks (50-ct)
- **MSRP:** Scrapers $8.99–$10.99 / Picks $9.99–$11.99
- **MOQ:** 100,000 units per SKU
- **Lead time:** 90–120 days from PO
- **Gross margin:** 60–70% at partner pricing
- **Testing partner:** Washington State University (WSU)
- **Certifications in progress:** ASTM D6691 (marine), ISO 17088 (home compost), USDA BioPreferred, FDA 21 CFR

### Founder
- **Jon Beekman** — Founder, ILB Biosciences
- Stanford Graduate School of Business
- LinkedIn: https://linkedin.com/in/jonbeekman
- Contact: jon@magicmaterials.com

---

## Known Placeholders (to be filled in)

| Location | Placeholder | Notes |
|---|---|---|
| `about.html` line 72 | `[2–3 sentence bio — to be added]` | Jon's founder bio |
| `about.html` line 79 | `[Prior company / exit — to be added]` | Prior exits/ventures |
| `about.html` line 87 | `[NFX, H2F, GovX, others — to be listed]` | Advisor/investor network |
| All pages | `jon@magicmaterials.com` | Confirm this is the live email |
| All pages | Logo / "Powered by Magic Materials" badge | Badge image arriving; currently rendered as text |

---

## TODO / Known Missing Features

1. **Contact form** — `contact.html` currently has mailto links only. A working form (Formspree, Netlify Forms, or similar) needs to be added when ready.

2. **Logo / badge image** — When the logo arrives, add `<img>` to the nav (replacing the text logo in `components.js`) and to the co-brand badge mockup in `products.html` and `partners.html`.

3. **Real WSU test results** — When ASTM D6691 data is available, update `certifications.html` status badges from "Testing in progress" → "Certified" and add a results summary section.

4. **Analytics** — Add a `<script>` tag (Plausible, Fathom, or GA4) to `components.js` or each page `<head>` once a domain is confirmed.

5. **Favicon** — Add `<link rel="icon">` to each page's `<head>` once brand assets arrive.

---

## Deployment (Vercel)

```bash
# Option A: CLI
cd path/to/website
npx vercel

# Option B: Drag-and-drop
# Go to vercel.com → Add New Project → drag the website/ folder
```

`vercel.json` is already present:
```json
{ "cleanUrls": true, "trailingSlash": false }
```

This makes `/about` serve `about.html`, `/contact` serve `contact.html`, etc.

---

## Do Not

- Do not add a build system, bundler, or package.json
- Do not inline styles that duplicate what's already in `style.css` — use existing utility classes
- Do not use `<table>` for layout — only for actual tabular data (comparison tables, spec tables)
- Do not remove "testing in progress" qualifiers from certification claims — this is intentional legal/marketing caution
- Do not add pricing specifics (per-unit costs) to any page — pricing is only available under NDA
