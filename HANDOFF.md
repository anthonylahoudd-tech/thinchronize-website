# Session Handoff Notes
_Last updated: 2026-05-30_

---

## Current State — Everything Working ✅

- **Production URL**: https://thinchronize.com (auto-deploys on push to `main`)
- **Stack**: Next.js 14 App Router · Sanity · GSAP · Lenis · PPNeueCorp font
- **Last commit**: `9ecdd9f` — Whatsub page Motto-exact rebuild

---

## Session 4 — What Was Done

### Portfolio page — breathing-room hero

`app/portfolio/PortfolioPageClient.tsx` rebuilt.

- Removed the old label row header and sticky filter bar
- Full-viewport (`100vh`) hero: pure black breathing room top half
- Bottom row (`justifyContent: space-between`):
  - **Left**: intro paragraph — PP Neue Corp 400, `clamp(24px, 3.5vw, 46px)`, white, `maxWidth 640px`
  - **Right**: filter pill (white bg, height 62px) + Grid/Explore sliding tab (white pill, black sliding mask)
- Grid and Explore views are unchanged — same render logic below the hero
- Filter dropdown opens upward (`bottom: 70`) since it's at the bottom of the hero

### Project page — full Motto-exact rebuild (Whatsub locked, roll out pending)

`app/portfolio/[slug]/PortfolioProjectClient.tsx` fully rebuilt to match Motto's production layout.

#### Hero (100vh)

- Cover image: `opacity: 0.55`, gradient (dark top + dark bottom, transparent middle)
- **Project title**: `clamp(64px, 20vw, 300px)`, fontWeight 900 (ExtendedUltrabold), uppercase, `whiteSpace: nowrap` — bleeds off-screen right edge like Motto
- **Tagline**: below the title, left-aligned, `clamp(15px, 1.5vw, 20px)`, `rgba(255,255,255,0.7)`, `maxWidth 520px`
- **Bottom bar** uses CSS grid `1fr auto 1fr` to guarantee perfect centring:
  - Left: `(Scroll)` — 11px, letterSpacing 4px, uppercase, `rgba(255,255,255,0.4)`
  - Centre: white pill switcher (Visual view / Reading view), sliding black mask, height 62px, px-40
  - Right: `See all projects` — underlined, `rgba(255,255,255,0.4)`

#### Visual view

- Full-bleed image stack, `paddingTop: 70%` landscape / `130%` portrait
- `marginBottom: 8px` between images, starts immediately after hero (no top padding)
- `paddingBottom: 160px` at the end

#### Reading view (new structure — matches Motto 3rd screenshot)

- **Overview section**: warm off-white background `#f5f4f0`
  - CSS grid `200px 1fr`, gap `80px`
  - Left col: `"Project / Overview"` label — 11px, uppercase, `rgba(0,0,0,0.4)`
  - Right col:
    - `brief.headline` — `clamp(28px, 3.5vw, 52px)`, fontWeight 900, dark
    - `brief.body` — 18px, `rgba(0,0,0,0.55)`, lineHeight 1.75, maxWidth 640px
    - `(Details)` label
    - Detail rows (Type / Category / Year / Scope) — flex `space-between`, separated by `1px solid rgba(0,0,0,0.1)` horizontal rules
- **Image grid** below the overview section on black background (same as visual view)

#### Fixed toggle pill

- `position: fixed, bottom 30px, right 44px` — **sibling of the scroll-resistance wrapper**, so `position: fixed` is not captured by the transform
- Eye icon → visual, Lines icon → reading
- Active: black circle (46×46px), white icon. Inactive: transparent, `rgba(0,0,0,0.35)` icon

#### Scroll resistance

- Builds 0→1 as user enters last 400px of page
- Applied: `scale(1 - r*0.025) translateY(-r*12px)` when resistance > 0.3
- `400ms cubic-bezier(0.19,1,0.22,1)` transition

#### Next project section

- Full-viewport, cover at `opacity: 0.35`
- Centre: "Next Project" label · next project title (uppercase, ExtendedUltrabold) · `nextProject.tagline` · "Continue →" link
- Bottom-left: counter `01 / 09`
- Bottom-right: ← → prev/next links

### Data model — `lib/projects.ts`

Added `tagline: string` field to the `Project` interface and populated all 9 projects.

```typescript
// New field
tagline: string   // short punchy line used in next-project section + hero

// Existing fields unchanged
brief:     { headline: string, body: string }
diagnosis: { headline: string, body: string }
built:     { headline: string, body: string }
result:    { headline: string, body: string }
details:   { type, category, year, scope }
images:    { src: string, portrait?: boolean }[]
```

---

## Still To Do

- [ ] **USER APPROVAL NEEDED**: Check Whatsub page on production, approve, then roll template out to all 9 projects (it's the same template — no per-project work needed, it's already live for all 9)
- [ ] Mark portrait images in `projects.ts` — all currently default to landscape (70%). Any portrait shots need `portrait: true`
- [ ] Projects without rich images (don-bosco, tryo, nft-motivated, equisoft, societe-jabra, conundrum) — showing only cover in visual view. Add images when photography arrives
- [ ] `app/journal/[slug]/page.tsx` — `pt-32` may need reducing (nav is transparent)
- [ ] Mobile responsiveness pass — portfolio hero bottom row (filter + tabs) may be tight at 375px
- [ ] Add more client projects to `lib/projects.ts` as new work comes in

---

## Key File Map

```
app/
  globals.css                       ← viewFade + viewEnter keyframes
  layout.tsx                        ← ConditionalFooter (not Footer)
  portfolio/
    page.tsx                        ← Portfolio listing (server wrapper)
    PortfolioPageClient.tsx         ← Breathing-room hero + Grid/Explore
    [slug]/
      page.tsx                      ← Computes next/prev/currentIndex
      PortfolioProjectClient.tsx    ← Motto-exact project page template

components/
  layout/
    ConditionalFooter.tsx           ← Hides footer on /portfolio/[slug] routes
    Header.tsx                      ← mix-blend-mode nav
    MenuOverlay.tsx                 ← CTA = "LET'S SYNC."
  sections/
    Work.tsx                        ← Homepage horizontal scroll, uses PROJECTS[]
  ProjectCard.tsx                   ← Portfolio grid card

lib/
  projects.ts                       ← Source of truth for all 9 projects
                                       tagline field added (session 4)
                                       brief/diagnosis/built/result as {headline,body}
                                       images as {src,portrait?}[]
                                       details as {type,category,year,scope}

public/images/work/
  whatsub/        ← 24 images + Whatsub-Sign.jpg (cover)
  latelier/       ← 3 images
  cafe-bdooz/     ← 14 images + Cover-Bdooz.png
  [others]/       ← Single cover file only
```

---

## Font Reference

All three PP Neue Corp weights are self-hosted in `public/fonts/`:

| CSS fontWeight | File                              | Use                         |
|----------------|-----------------------------------|-----------------------------|
| 900            | PPNeueCorp-ExtendedUltrabold      | Hero titles, section headers |
| 800            | PPNeueCorp-NormalUltrabold        | (available, rarely used)    |
| 400            | PPNeueCorp-NormalMedium           | Body, labels, UI elements   |

---

## Workflow: Adding a New Client

1. Create `public/images/work/[id]/` and drop images in
2. Add project to `lib/projects.ts` with full data shape:
   ```typescript
   {
     id, title, tagline, subtitle, category,
     coverImage, images: [{ src, portrait? }],
     brief, diagnosis, built, result,   // each: { headline, body }
     details: { type, category, year, scope },
     diagnosticAnswers, keywords, services, year, market
   }
   ```
3. Mark any portrait-orientation images with `portrait: true`
4. Push — Vercel auto-deploys

**Image compression** (run inside the project folder):
```bash
for f in *.jpg; do sips -s format jpeg -s formatOptions 82 -Z 1920 "$f" --out "$f"; done
for f in *.png; do sips -s format jpeg -s formatOptions 83 "$f" --out "${f%.png}.jpg" && rm "$f"; done
```
