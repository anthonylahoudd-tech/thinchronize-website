import sharp from 'sharp'
import { readdir, stat } from 'fs/promises'
import { join, extname, basename } from 'path'

const ROOT = 'public/images'
const JPEG_QUALITY = 82
const PNG_QUALITY  = 80  // sharp PNG uses compressionLevel 0-9; we'll convert PNGs to JPEG instead
const MAX_WIDTH    = 2400

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []
  for (const e of entries) {
    const full = join(dir, e.name)
    if (e.isDirectory()) files.push(...await walk(full))
    else files.push(full)
  }
  return files
}

const files = await walk(ROOT)
const images = files.filter(f => /\.(jpe?g|png)$/i.test(f))

let totalBefore = 0
let totalAfter  = 0

for (const file of images) {
  const ext = extname(file).toLowerCase()
  const before = (await stat(file)).size
  totalBefore += before

  try {
    const img = sharp(file).rotate() // rotate() preserves EXIF orientation then strips it

    const meta = await img.metadata()
    if (meta.width > MAX_WIDTH) img.resize(MAX_WIDTH)

    let buf
    if (ext === '.png') {
      // Convert PNG → JPEG for photos; keep PNG only for logos/assets with transparency
      // Check if image has alpha channel
      if (meta.hasAlpha) {
        // Keep as PNG but compress
        buf = await img.png({ compressionLevel: 9, effort: 10 }).toBuffer()
      } else {
        // No alpha — convert to JPEG (massive savings)
        buf = await img.jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toBuffer()
        // We'll write back to the .png path as JPEG bytes — but that breaks the extension.
        // Instead: write to same path as JPEG content, rename handled below.
        // Actually for simplicity, just write compressed PNG.
        buf = await img.png({ compressionLevel: 9, effort: 10 }).toBuffer()
      }
    } else {
      buf = await img.jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toBuffer()
    }

    const after = buf.length
    totalAfter += after

    // Only overwrite if we actually made it smaller
    if (after < before) {
      const { writeFile } = await import('fs/promises')
      await writeFile(file, buf)
      const saved = ((before - after) / before * 100).toFixed(1)
      console.log(`✓ ${file.replace('public/images/', '')} — ${(before/1024).toFixed(0)}KB → ${(after/1024).toFixed(0)}KB (${saved}% saved)`)
    } else {
      totalAfter -= after
      totalAfter += before
      console.log(`  ${file.replace('public/images/', '')} — already optimal, skipped`)
    }
  } catch (e) {
    console.error(`✗ ${file}: ${e.message}`)
    totalAfter += before - before // don't double-count
  }
}

console.log(`\nTotal: ${(totalBefore/1024/1024).toFixed(1)}MB → ${(totalAfter/1024/1024).toFixed(1)}MB`)
