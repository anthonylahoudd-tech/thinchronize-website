# Services Page Rebuild — Brief for Claude Code

**Goal:** Keep the top of `/services` exactly as-is. Replace the bulky stacked accordion below it with a seamless, premium index→detail interaction, and reconcile all service content to the current offer set. **No prices anywhere on the page.**

**Source of truth for offers/pricing logic:** internal canon (do not invent). This brief already contains the correct public offer set — build to it.

---

## 0. Guardrails (do not violate)

- **Do NOT touch the hero / top.** `components/ui/PageHero.tsx` and the `<PageHero title="SERVICES" …>` block in `app/services/ServicesEditorialClient.tsx` stay pixel-identical. Same marquee, same staggered subtitle, same scroll CTA.
- **Keep brand tokens:** PP Neue Corp (`PPNeueCorp`), `#292929` dark, `#D0274B` red, `#919191` neutral, `#FFFFFF`. No new colors, no rounded-card look that fights the current sharp editorial style.
- **No prices, no numbers-as-price, no "starting from."** Ever.
- **Keep the diagnostic** typewriter widget and its deep-link-to-service behavior — just update what it routes to (see §5).
- Respect `prefers-reduced-motion` on every new animation.
- Files in scope: `app/services/ServicesEditorialClient.tsx`, `lib/services-data.ts`. Add a small subcomponent file if it keeps things clean. Don't refactor unrelated pages.

---

## 0.5 Skills to use (and when)

Use the installed design skills so this rebuild is premium, not generic. Invoke each by name at the step noted. If a skill isn't registered in this environment, its raw assets are on disk at the paths given — read them directly.

- **`redesign-existing-projects`** — run **first**. Audit `ServicesEditorialClient.tsx`: list generic/AI patterns, weak typography, spacing, hierarchy, and missing states. Produce a prioritized fix list, then apply upgrades **in place** (do not rewrite; never touch the hero).
- **`ui-ux-pro-max`** — the design database. Before styling, query it for a **"premium editorial studio / minimalist monochrome"** direction on the **Next.js + Tailwind** stack. Run its search, e.g.:
  ```bash
  python3 ~/Downloads/ui-ux-pro-max-skill-main/.claude/skills/ui-ux-pro-max/scripts/search.py "premium editorial studio minimalist monochrome" --domain style --stack nextjs
  # also: --domain typography   --domain ux   --domain gsap
  ```
  Use outputs as **guidance only** — DO NOT adopt its stock hex palettes or fonts. Override every color/font with the locked brand below.
- **`emil-design-eng`** + **`apple-design`** — motion/interaction philosophy for the index→detail transition, hover states, and scroll reveals. Purposeful, tactile, interruptible — never decorative.
- **`review-animations`** — after motion is in, run it to audit the animations and fix what it flags. Respect `prefers-reduced-motion`.
- **`animation-vocabulary`** — use to name effects precisely (stage crossfade, hover underline sweep, section reveal).
- **`ui-styling`** — implementation layer: Tailwind/shadcn patterns, accessible components, focus/hover/active states.
- **`design-system`** — keep tokens consistent; **reuse the existing brand tokens**, don't invent new scales.

**Hard rule over every skill — the LOCKED brand wins.** `#292929` / `#D0274B` / `#919191` / `#FFFFFF` and PP Neue Corp. If any skill suggests other colors, fonts, gradients, heavy drop-shadows, or rounded-card styling that fights the sharp editorial look — ignore it. No prices, ever. The hero stays pixel-identical.

---

## 1. The corrected offer set (what the page must show)

**Group A — Programs**
1. **Brand Engagement** (rename from "Full Brand Engagement"). Two tracks: **Launch** (new brand) / **Rebuild** (existing brand) — same phases. Diagnosis → identity → launch, one team.
2. **Brand Guardianship** — monthly retainer, now **two tiers**: **T1 · Brand Control** (advisory/governance) and **T2 · Marketing Management** (T1 + content design + partner-run channels under thinc. direction).

**Group B — Diagnostics (start here)**
3. **Brand Audit** — the service. Its **deliverable is the Brand Health Report** (Brand Health Score /100 across 5 dimensions + findings + routing). Keep the nav/label word "Brand Audit"; lead the detail with the Health Report + score.
4. **Research** *(NEW — no existing content, copy provided in §4)* — evidence engine sold standalone. Deliverable: **Brand Reality Report + Insight Hypothesis**. Three depths (Standard / Field / Partner) — describe depth, never price.

**Group C — Production** (execution layer, compact — see §3C). Six families:
Social / Digital · Print & Editorial · Brand Extension · Packaging · Motion / Animation · Web / UI. Plus a one-line **partner-run** note (photography, video, brand film, web dev — directed by thinc., produced by vetted partners).

**REMOVE from the public page entirely:** `brand-clarity` and `brand-refresh`. These are internal-routing offers now — delete them from `BRANDING_SERVICES`, from the `FOMO` / `DELIVERABLES` / `KPIS` maps, from `getServiceLabel`, and from any diagnostic routing. Add 301 redirects only if standalone routes exist (they don't today — it's hash-based, so just remove).

---

## 2. The interaction model (the core change)

Current problem: every service is an always-openable accordion row stacked vertically → the page is extremely tall, heavy, and repetitive on mobile and desktop.

**Replace it with a sticky index → single detail reveal** (the pattern high-end studio/editorial sites use). Specifics:

**Desktop (≥1024px): two-column "index / stage" layout inside the existing white section.**
- **Left column (~34%, sticky):** a lean vertical **index** of services, grouped by label (Programs, Diagnostics), each row = number + name, quiet by default. The current red category header treatment (`border-left: 3px solid #D0274B`) is reused as the group label.
  - Hover: a `#D0274B` underline/line-fill sweeps in under the name (left→right, ~220ms). Active row: name goes `#292929` bold, others `#919191`.
- **Right column ("stage"):** shows **one** service's full detail at a time. Switching services **cross-fades / slides up** the stage content (~260ms, ease `cubic-bezier(0.19,1,0.22,1)` to match `PageHero`). Only one detail exists in the DOM's visible flow at a time → kills the bulk.
- Default state on load: first Program (Brand Engagement) selected, or the diagnostic's routed service if the user came via the diagnostic.
- The diagnostic and hash deep-links (`#services`) select the matching service in the stage and scroll to it (reuse existing `handleSelect` / `openServiceIds` logic, converted to a single `activeServiceId`).

**Mobile (<1024px): single-open list (not the current all-open accordion).**
- Tap a service → it expands inline with a smooth height/opacity reveal; tapping another **closes the previous** (accordion, but strictly one-at-a-time). This alone removes most of the current bulk.
- Keep the sticky category labels as small section headers.

**Cross-cutting functionality to add (all subtle, reduced-motion aware):**
- **Sticky mini category nav**: as the user scrolls the section, a slim sticky strip shows `Programs · Diagnostics · Production` and highlights the current group; click scrolls to it. (Think section-tab wayfinding, not a heavy navbar.)
- **Scroll-reveal**: each stage/detail block fades-and-rises ~12px on first enter (IntersectionObserver, once). Never re-animate on every scroll.
- **View-transition feel**: if easy, use the browser View Transitions API for the stage swap; otherwise a CSS opacity+translateY crossfade. Don't add heavy libraries — Framer Motion is acceptable only if already a dependency; otherwise CSS.

Net effect: the page reads like a calm, single-screen "menu with a live detail panel," not an endless scroll of expanded cards.

---

## 3. Detail content order (reused for every Program + Diagnostic)

Port existing copy from the `FOMO` / `DELIVERABLES` / `KPIS` maps and `services-data.ts`. Order inside the stage:

1. **Eyebrow** — group label (e.g. "Program" / "Diagnostic").
2. **Name** (H2, PP 900) + **tagline** (one line).
3. **The tension** — the `FOMO[id]` line, in the red-left-border voice treatment.
4. **Overview** — the `description`.
5. **Deliverable callout** *(diagnostics only)* — a dark `#292929` block. For **Brand Audit**: label "The deliverable", title "Brand Health Report", one line, and a `/100` "Health Score" chip. For **Research**: title "Brand Reality Report + Insight Hypothesis".
6. **What's included** — the `DELIVERABLES[id]` list, two columns on desktop.
7. **Impact** — the `KPIS[id]` stat blocks (keep the 4-up grid).
8. **Who this is for** — the existing 5 "–…" lines.
9. **CTA row** — primary `#D0274B` button ("Take the diagnostic" / "Book the audit" / "Start a conversation"), plus a **next-step cross-link** (e.g. Engagement → "Consider Guardianship after launch"; Audit → "Ready to build? Brand Engagement" and "Want more depth? Research"). For **Brand Audit** add the line: "The fee credits toward any program you take next." For **Brand Engagement** note the Audit/Research credit-in.

### 3C. Production block (compact, NOT full accordions)
Render Production as a **compact responsive grid of 6 family tiles** below the Programs/Diagnostics index/stage. Each tile: family name + one-line intent; on hover/tap reveal 3–5 representative items (from the mapped deliverables). Close with the one-line **partner-run** note. Keep the existing "Execution built on the brand" section intro and the "Brand Alumni pricing applies to production" caption. This keeps execution present but visually light — production is not the hero of a strategy-led studio.

---

## 4. New content — Research service (write into `lib/services-data.ts` + the maps)

Add to `BRANDING_SERVICES`-equivalent (or a new `DIAGNOSTIC_SERVICES` group — your call, but it must render in the Diagnostics group):

```
id: 'research'
name: 'Research'
shortName: 'Research'
tagline: 'Evidence before opinion.'
description: 'A standalone study of where your brand actually stands today — its point A. We gather the evidence (audience, market, category, competitors, and your own materials) and turn it into a clear read of reality plus the single insight that should drive what comes next. Sold at three depths, from a focused standard study to full-field interviews to partner-led research.'
deliverables: ['Brand Reality Report (the current-state read)', 'Insight Hypothesis (the one idea that should drive the work)', 'Evidence base — audience, market, category, competitor signals', 'Depth options: Standard · Field · Partner', 'Routes directly into an Engagement (credits in)']
```

- `FOMO['research']`: "Opinions are cheap and everywhere. Without evidence, you're rebranding on a hunch — and betting the budget on it."
- `KPIS['research']` (4): `Point A / TRUE STARTING LINE`, `Evidence / OVER INSTINCT`, `Focus / ONE INSIGHT`, `Credits in / TOWARD YOUR BUILD`.
- Add "Research" to `getServiceLabel`.
- Diagnostic: route "diagnose / research / not sure / where do we stand" → `['brand-audit','research']`.

Also reframe **Brand Audit** deliverables so the **Brand Health Report** and the **/100 Brand Health Score** are explicit (currently it lists "Written Diagnosis Report" — rename to "Brand Health Report" and add a "Brand Health Score /100" line).

---

## 5. Diagnostic routing updates (`diagnosticOptions` + `DIAGNOSTIC_ANSWERS_SERVICES`)

Update the option→service map (remove clarity/refresh, add diagnostics):

```
01 "My brand no longer reflects what we've built"      → ['brand-engagement']
02 "I'm building a brand from scratch"                 → ['brand-engagement']
03 "I'm not sure what's wrong — I need a read"         → ['brand-audit','research']   (NEW)
04 "I need print or digital design assets"             → ['print-editorial','digital-design'] (or new production families)
05 "I need animation, motion or video content"         → ['animation-editing','photography-videography']
06 "My brand is solid — I need ongoing guidance"       → ['brand-guardianship']
07 "Other — describe what you need"                    → isOther
```

Update `DIAGNOSTIC_ANSWERS_SERVICES` keywords + each service's `diagnosticAnswers` so audit/research match "diagnose, audit, score, health, research, evidence, where do we stand, not sure." Remove any keyword rows that only pointed at clarity/refresh.

---

## 6. Alumni section fix (`#alumni-section`)

The current copy is **wrong**. Replace the two-path "Path A / Path B ($3,000 production spend)" structure with the **single current rule**:

- Headline stays: "The longer we work together, the less you pay for production."
- Body: Brand Alumni is a permanent **25–30% discount on all production**, earned once — then it never expires.
- Replace the two cards with **"How you qualify"**:
  - **One threshold:** $10,000 in cumulative spend with thinc., **any mix** (branding, Guardianship, or production combined). A full Brand Engagement clears it on its own.
  - **Member perk:** any active **Brand Guardianship** member gets the Alumni production rate from day one (and converts to permanent once they cross the threshold).
- Keep: "Applies to production — Social/Digital, Print & Editorial, Brand Extension, Packaging, Motion, Web/UI." "Not applicable to Brand Engagement, Guardianship, or advisory."
- **No dollar figure shown as a price** — the $10,000 is a loyalty *threshold*, which is fine to state; do not display any service prices.

---

## 7. Acceptance criteria

- [ ] Hero/top is byte-identical to current.
- [ ] Only one service detail is visible/expanded at a time (desktop stage + mobile single-open).
- [ ] Page height and scroll length are dramatically reduced vs. current all-accordion.
- [ ] Clarity and Refresh appear nowhere on the page or in routing.
- [ ] Research exists as a full detail; Brand Audit leads with Brand Health Report + /100 score; Guardianship shows T1/T2.
- [ ] Production renders as a compact 6-family grid, not 4–6 tall accordions.
- [ ] Alumni shows the single $10k-any-mix rule + Guardianship member perk; the "$3,000" path is gone.
- [ ] No prices anywhere.
- [ ] Sticky category wayfinding + scroll-reveal work and respect reduced-motion.
- [ ] Diagnostic still routes and deep-links to the correct service in the new layout.
- [ ] Mobile: clean single-open list, no horizontal overflow, PP Neue Corp intact.

---

## 8. Suggested build order (skills woven in — see §0.5)

1. **Audit** — invoke `redesign-existing-projects` on `ServicesEditorialClient.tsx`. Output a prioritized fix list (typography, spacing, hierarchy, states). This informs everything below. Present it before editing.
2. **Design system** — query `ui-ux-pro-max` (style / typography / ux / gsap, `--stack nextjs`) for the editorial-monochrome direction, then translate to the **locked brand tokens** via `design-system`. No new palette or fonts.
3. **Data** — edit `lib/services-data.ts` (rename Engagement, remove Clarity/Refresh, add Research, regroup Production families, update diagnostic maps). Update the `FOMO`/`DELIVERABLES`/`KPIS`/`getServiceLabel` maps in the client to match.
4. **Component** — extract the detail body into a `ServiceDetail` subcomponent (reused by desktop stage + mobile expand); build with `ui-styling`.
5. **Desktop** — build the index/stage layout + state (`activeServiceId`); wire the diagnostic + hash to it.
6. **Mobile** — single-open list from the same subcomponent.
7. **Motion** — apply the index→detail crossfade, hover underline sweep, sticky category wayfinding, and scroll-reveal using `emil-design-eng` + `apple-design`. Reduced-motion aware.
8. **Production grid** — rebuild as the compact six-family grid (§3C).
9. **Alumni** — fix the copy/structure (§6).
10. **Review** — run `review-animations` on the motion; re-run the `redesign-existing-projects` audit checklist; run `ui-ux-pro-max` accessibility/UX checks (contrast, touch targets, focus states). Then verify §7 acceptance criteria on desktop + mobile. Fix and re-check.
