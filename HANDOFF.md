# Session Handoff Notes
_Last updated: 2026-05-30_

---

## Current State — Everything Working ✅

- **Production URL**: https://thinchronize.com (auto-deploys on push to `main`)
- **Stack**: Next.js 14 App Router · Sanity · GSAP · Lenis · PPNeueCorp font
- **Last commit**: `b6cc41f` — full Motto-style portfolio rebuild

---

## Session 3 — What Was Done

### Portfolio detail page — full Motto-style rebuild

All 9 project pages now share one template at `app/portfolio/[slug]/PortfolioProjectClient.tsx`.

**Hero**
- Full-viewport cover image (opacity 0.75, gradient overlay)
- Watermark title: large (clamp 48–100px), opacity 0.08, bottom-left behind info bar
- Info bar: project title bottom-left, category + year bottom-right
- (Scroll) label above title

**View toggle pill** (fixed bottom-right, 60×110px)
- Eye icon → visual view
- Lines icon → reading view
- Active state: black circle + white icon
- `mix-blend-mode: difference` so it contrasts on any background
- Pill rendered as **sibling** of the scroll-resistance wrapper (not inside it) — prevents `position:fixed` from being captured by the transform

**Visual view**
- Full-bleed stacked images (negative margins −40px break out of 40px content padding)
- Landscape: `paddingTop: 71.05%` · Portrait: `paddingTop: 140%` (set per image via `portrait: boolean`)

**Reading view** (2-col grid)
- Left: all project images at 71.05% ratio, 50vw sized
- Right: 4 sections — Brief + project details metadata grid, Diagnosis, What We Built, Result

**Next project section**
- Full-viewport, dim cover (opacity 0.4)
- Counter (01/09), centred title + "View Project →" link
- ← → arrows bottom-right for prev/next nav

**Scroll resistance**
- `scale(0.98) translateY(-8px)` on main content wrapper when within 200px of bottom
- Smooth 600ms transition

### Data model — `lib/projects.ts`
All fields restructured. All 9 projects have full content.

```typescript
brief:     { headline: string, body: string }
diagnosis: { headline: string, body: string }
built:     { headline: string, body: string }
result:    { headline: string, body: string }
details:   { type, category, year, scope }
images:    { src: string, portrait?: boolean }[]
```

### Routing
- Deleted `app/portfolio/whatsub/page.tsx` (was blocking the template)
- Deleted `app/portfolio/cafe-bdooz/page.tsx` (same)
- `[slug]/page.tsx` now serves all 9 projects — no `hasDedicatedPage` check needed
- Passes `project`, `nextProject`, `prevProject`, `currentIndex` to client

### DiagnosticClient.tsx fix
Updated 4 lines: `project.brief` → `project.brief.body` etc.

### Whatsub images
24 images in `public/images/work/whatsub/` — all in `projects.ts` images array.

### Cafe BDOOZ images
14 images in `public/images/work/cafe-bdooz/` — all in `projects.ts` images array.

### ConditionalFooter
`components/layout/ConditionalFooter.tsx` — hides footer on `/portfolio/[slug]` routes (regex: `/^\/portfolio\/.+/`). Footer still shows on `/portfolio` listing and all other routes.

---

## Still To Do

- [ ] Mark portrait images in `projects.ts` — currently all images default to landscape (71.05%). Any portrait shots should have `portrait: true`
- [ ] `app/journal/[slug]/page.tsx` — `pt-32` may need reducing (nav is transparent)
- [ ] Mobile portfolio filter bar — tight at 375px, may need responsive padding
- [ ] Projects without rich images (don-bosco, tryo, nft-motivated, equisoft, societe-jabra, conundrum) — still showing only logo/cover in visual view. Add real images when photography arrives
- [ ] Add more client projects to `lib/projects.ts` as new work comes in

---

## Key File Map

```
app/
  globals.css                       ← viewFade + viewEnter keyframes
  layout.tsx                        ← ConditionalFooter (not Footer)
  portfolio/
    page.tsx                        ← Portfolio listing (server wrapper)
    PortfolioPageClient.tsx         ← Grid/Explore filter UI
    [slug]/
      page.tsx                      ← Computes next/prev/currentIndex, no dedicated-page check
      PortfolioProjectClient.tsx    ← Full Motto-style case study layout

components/
  layout/
    ConditionalFooter.tsx           ← Hides footer on /portfolio/[slug] routes
    Header.tsx                      ← mix-blend-mode nav, logo uses plain <img>
    MenuOverlay.tsx                 ← CTA = "LET'S SYNC."
  sections/
    Work.tsx                        ← Homepage horizontal scroll, uses PROJECTS[]
  ProjectCard.tsx                   ← Portfolio grid card

lib/
  projects.ts                       ← Source of truth for all project data
                                       brief/diagnosis/built/result as {headline,body}
                                       images as {src,portrait?}[]
                                       details as {type,category,year,scope}

public/images/work/
  whatsub/        ← 24 images + Whatsub-Sign.jpg (cover)
  latelier/       ← 3 images (Image-1,2,3.jpeg)
  cafe-bdooz/     ← 14 images + Cover-Bdooz.png
  [others]/       ← Single cover files only
```

---

## Workflow: Adding a New Client

1. Create `public/images/work/[id]/` and drop images in
2. Add project to `lib/projects.ts` with full data shape (see existing entries)
3. Mark any portrait-orientation images with `portrait: true`
4. Push — Vercel auto-deploys

**Compression command** (run in the project images folder):
```bash
for f in *.jpg; do sips -s format jpeg -s formatOptions 82 -Z 1920 "$f" --out "$f"; done
for f in *.png; do sips -s format jpeg -s formatOptions 83 "$f" --out "${f%.png}.jpg" && rm "$f"; done
```
