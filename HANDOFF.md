# Session Handoff Notes
_Last updated: 2026-05-30_

---

## Current State — Everything Working ✅

- **Production URL**: https://thinchronize.com (www → apex redirect fixed)
- **Vercel**: Auto-deploys on every push to `main` (anthonylahoudd-tech/thinchronize-website)
- **Stack**: Next.js 14 App Router · Sanity · GSAP · Lenis · PPNeueCorp font

---

## What Was Done This Session

### Header (`components/layout/Header.tsx`) — ✅ Live
- `mix-blend-mode: difference` on both mobile + desktop headers — nav text auto-inverts against any background (white bg → black text, dark bg → white text). Same effect as custom cursor.
- Red pill LET'S SYNC. button **removed**. LET'S SYNC. is now plain underlined text, always visible.
- Motto-style MENU reveal on scroll: MENU clip-wrapper expands 0→130px, pushing LET'S SYNC. left.
- Nav scaled up to Motto proportions:
  - Header height: 72 → **96px**
  - Wordmark: 20 → **30px** tall
  - Packed logo: 44 → **56px**
  - Nav links: 13px/3.5px → **15px/4px tracking**
  - LET'S SYNC. / MENU: 12px → **14px/4px tracking**
  - H-padding: 40 → **56px**, link gap: 40 → **48px**
  - Scroll trigger: 80 → **100px**
  - Animation translateY: -5 → **-8px** (more visible stagger)

### Homepage (`app/page.tsx`) — ✅ Live
- Hero image (full-screen 3D logo) **removed**
- `<About />` is now the **first section** (visible on load)
- `section-padding` min bumped 80 → **100px** to clear 96px fixed nav

### Portfolio Page (`app/portfolio/PortfolioPageClient.tsx`) — ✅ Live
Rebuilt to Motto-style:
- No hero/marquee — opens with `PORTFOLIO` label + project count
- **Sticky filter bar** at `top: 96` (below fixed nav), frosted glass
  - Left: category dropdown pill (All Projects / Brand Identity / Brand Strategy / Motion / Packaging / Web Design)
  - Right: Grid/Explore sliding white pill tabs (measured via refs)
- **Grid view**: 2-col, 1:1 square images, custom 110px circular cursor on hover
- **Explore view**: full `100vh` images, gradient overlay, counter + title + link
- **View switch**: `key={view}` → `@keyframes viewFadeIn` plays on switch
- Images use plain `<img>` tags (not Next/Image fill — was causing render issues)

### ProjectCard (`components/ProjectCard.tsx`) — ✅ New file
- 1:1 `aspectRatio` + plain `<img>` (no crop, no Next/Image fill)
- Custom 110px white circular cursor follows mouse inside card
- Scale(1.04) zoom on hover

### Project Data (`lib/projects.ts`) — ✅ Updated
- Added optional `images?: string[]` field to Project interface
- `images[0]` → Section 3 of detail page (full-width)
- `images[1]` → Section 5 of detail page (right-aligned 65%)
- Projects without `images` fall back to `coverImage` in all slots
- Categories updated: `Print Design` → `Packaging`, `Editorial Design` → `Brand Strategy`

### L'Atelier Project — ✅ Live
- Images in `public/images/work/latelier/`
- `coverImage`: `Latelier-Image-3.jpeg` (portfolio grid + hero)
- `images[0]`: `Latelier-Image-2.jpeg` (section 3)
- `images[1]`: `Latelier-Image-1.jpeg` (section 5, last)

### Whatsub Project — ✅ Live
- All 29 images compressed: PNGs → JPEG at 83% (~75% smaller), JPGs at 82% max 1920px
- `ChatGPT Image...png` renamed to `Whatsub-Image-19.jpg`
- `coverImage` updated: `truck.jpg` (removed) → `Whatsub-Image-1.jpg`
- **Full puzzle grid page** (`app/portfolio/whatsub/page.tsx`) rebuilt:
  - 15 image rows (full-width / 2-col / 3-col) — ALL images shown, zero crop
  - 5 text break sections between image groups
  - Scroll-reveal on every group
  - Layout rhythm: 2-landscape → full → 3-portrait → 2 → full → 2+3...

### globals.css — ✅ Updated
- `@keyframes viewFadeIn` added (portfolio view switch animation)
- `section-padding` min: 80 → 100px

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

### Quick wins
- [ ] `app/journal/[slug]/page.tsx` has `pt-32` — may need reducing now nav is transparent
- [ ] Menu overlay "Start A Project →" CTA — consider renaming to "LET'S SYNC."
- [ ] Confirm menu overlay Set B/C loop items are clickable at all scroll positions

### Ongoing
- [ ] Add more client projects to `lib/projects.ts` as images come in
- [ ] Check mobile layout on all pages after transparent nav change

---

## Key File Map
```
app/
  page.tsx                          ← Homepage (About first, no Hero)
  globals.css                       ← Tokens, section-padding, viewFadeIn
  portfolio/
    page.tsx                        ← Server wrapper
    PortfolioPageClient.tsx         ← Full Motto-style rebuild
    whatsub/page.tsx                ← Custom 29-image puzzle grid
    [slug]/
      page.tsx                      ← Dynamic project route
      PortfolioProjectClient.tsx    ← Detail layout (images[0], images[1])

components/
  layout/
    Header.tsx                      ← mix-blend-mode nav, Motto scroll anim
    MenuOverlay.tsx                 ← Fullscreen menu
  ProjectCard.tsx                   ← Portfolio grid card

lib/
  projects.ts                       ← All project data (coverImage + images[])
  services-data.ts                  ← Services (used on Services page)

public/images/work/
  latelier/     ← Image-1,2,3.jpeg
  whatsub/      ← 29 compressed JPEGs
  cafe-bdooz/   ← Multiple PNGs
  [others]/     ← Single cover files
```
