# Session Handoff Notes
_Last updated: 2026-05-30_

---

## Current State — Everything Working ✅

- **Production URL**: https://thinchronize.com (www → apex redirect fixed)
- **Vercel**: Auto-deploys on every push to `main` (anthonylahoudd-tech/thinchronize-website)
- **Stack**: Next.js 14 App Router · Sanity · GSAP · Lenis · PPNeueCorp font

---

## Session 2 — What Was Done

### Bug Fixes
- **Portfolio mobile grid** — added `className="portfolio-grid"` to the grid container so the `@media (max-width: 767px)` CSS override actually fires → single column on mobile
- **`logo-stacked.png` console warning flood** — swapped `<Image>` → plain `<img>` in `Header.tsx` (footer + PageTransition already used plain `<img>`). Zero warnings now.
- **Menu overlay CTA** — renamed "Start A Project →" → **"LET'S SYNC."** (`components/layout/MenuOverlay.tsx`)
- **Cafe BDOOZ detail page** — added `images[]` array: `Image-2-Bdooz.png` (section 3) + `Image-5-Bdooz.png` (section 5)

### Cursor — Complete Overhaul
- **Removed** the dot + ring custom cursor (was laggy / bugged)
- **Removed** `MagneticButton` from Contact + Services → replaced with plain `<button>`
- **Removed** `cursor: none !important` from `globals.css` → **native cursor restored**
- **Removed** 110px circular hover cursor from `ProjectCard.tsx`
- **New**: single 8px white dot, `mix-blend-mode: difference`, zero latency (direct `transform` on every `mousemove`, no transitions), `pointer-events: none`, `z-index: 9999`
- File: `components/ui/CustomCursor.tsx`

### Homepage Work Section — Full Rebuild (`components/sections/Work.tsx`)
- **Before**: 2 hardcoded cards (Whatsub, CafeBdooz) + gradient placeholder cards from Sanity mock data (fake names: Lumière, Rawaa, Nour Studios, Jbal)
- **After**: single reusable `WorkCard` component driven by `PROJECTS` array — all 9 real clients with real cover images, no mock data
- "View all projects" link corrected: `/work` → `/portfolio`
- `CaseStudyCard` + mock data dependency removed entirely

### Project Order (`lib/projects.ts`)
Reordered to: **Whatsub → L'Atelier NGO → Cafe BDOOZ** → Don Bosco → Tryo → NFT Motivated → Equisoft → Societe Jabra → Conundrum
This order applies everywhere: homepage scroll, portfolio grid, diagnostic tool.

### Whatsub Cover Image
- User added new sign photo (`Whatsub-Image-19.png` → compressed to `Whatsub-Sign.jpg`, 1.7MB → 489KB)
- `Whatsub-Sign.jpg` = cover only (portfolio card + homepage card)
- Old `Whatsub-Image-19.jpg` (the sandwich render) restored from git → stays inside the detail page puzzle grid
- `projects.ts` coverImage: `Whatsub-Sign.jpg`
- `Work.tsx` homepage card: `Whatsub-Sign.jpg`
- Detail page hero (`app/portfolio/whatsub/page.tsx` line ~203): hardcoded to `Whatsub-Image-1.jpg` — sign never appears inside the page

---

## Workflow: Adding a New Client

1. Create folder: `public/images/work/[project-id]/`
2. Drop images in (JPG preferred; PNGs get converted)
3. Tell Claude → it updates `lib/projects.ts` and pushes
4. Optionally: create `app/portfolio/[project-id]/page.tsx` for a custom detail page layout (like whatsub)

**Compression command** (run in the project images folder):
```bash
# Resize + compress JPGs
for f in *.jpg; do sips -s format jpeg -s formatOptions 82 -Z 1920 "$f" --out "$f"; done
# Convert PNGs to JPEG
for f in *.png; do sips -s format jpeg -s formatOptions 83 "$f" --out "${f%.png}.jpg" && rm "$f"; done
```

---

## Still To Do

- [ ] `app/journal/[slug]/page.tsx` — `pt-32` may need reducing (nav is transparent)
- [ ] Mobile portfolio filter bar — `ALL PROJECTS (9)` dropdown + Grid/Explore tabs are tight at 375px, may need responsive padding
- [ ] Add more client projects to `lib/projects.ts` as images come in
- [ ] Projects with logo-only covers (Don Bosco, Tryo, Equisoft, Societe Jabra, Conundrum) would benefit from richer photography when available

---

## Key File Map
```
app/
  page.tsx                          ← Homepage (About first, no Hero)
  globals.css                       ← Tokens, section-padding, viewFadeIn, no cursor:none
  portfolio/
    page.tsx                        ← Server wrapper
    PortfolioPageClient.tsx         ← Motto-style grid/explore, portfolio-grid class for mobile
    whatsub/page.tsx                ← Custom 29-image puzzle grid
    cafe-bdooz/page.tsx             ← Custom detail page
    [slug]/
      page.tsx                      ← Dynamic project route
      PortfolioProjectClient.tsx    ← Detail layout (images[0], images[1])

components/
  layout/
    Header.tsx                      ← mix-blend-mode nav, logo-stacked uses plain <img>
    MenuOverlay.tsx                 ← Fullscreen menu, CTA = "LET'S SYNC."
  sections/
    Work.tsx                        ← Horizontal scroll, WorkCard driven by PROJECTS[]
    Contact.tsx                     ← Plain <button> (no MagneticButton)
    Services.tsx                    ← Plain <button> (no MagneticButton)
  ProjectCard.tsx                   ← Portfolio grid card, scale hover only (no cursor circle)
  ui/
    CustomCursor.tsx                ← 8px dot, mix-blend-mode difference, zero lag

lib/
  projects.ts                       ← All project data, ordered: whatsub, latelier, cafe-bdooz first

public/images/work/
  whatsub/
    Whatsub-Sign.jpg    ← cover only (card + homepage)
    Whatsub-Image-1.jpg ← detail page hero
    Whatsub-Image-19.jpg← sandwich render — inside detail page puzzle grid
  latelier/             ← Image-1,2,3.jpeg
  cafe-bdooz/           ← Cover-Bdooz.png + Image-2,5-Bdooz.png
  [others]/             ← Single cover files (logo shots)
```
