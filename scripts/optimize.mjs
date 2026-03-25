import fs from 'fs'
import { globSync } from 'glob'
import sharp from 'sharp'

const RESPONSIVE_VARIANTS = [
  { source: 'dist/src/fotos/1.jpg', widths: [480, 768] },
  { source: 'dist/src/fotos/2.jpg', widths: [360, 440, 520, 640, 800] },
  { source: 'dist/src/fotos/3.jpg', widths: [400, 560] },
  { source: 'dist/src/fotos/4.jpg', widths: [400, 560] },
  { source: 'dist/src/fotos/5.jpg', widths: [400, 560] },
  { source: 'dist/src/fotos/6.jpg', widths: [400, 560] },
  { source: 'dist/src/fotos/7.jpg', widths: [960] },
  { source: 'dist/src/fotos/8.jpg', widths: [400, 560] },
  { source: 'dist/src/fotos/9.jpg', widths: [400, 560] },
  { source: 'dist/src/fotos/10.jpg', widths: [400, 560] },
  { source: 'dist/src/fotos/museo-del-prado.jpg', widths: [480, 768] },
  { source: 'dist/src/contratacion.jpg', widths: [480, 768] }
]

async function generateResponsiveVariants() {
  for (const { source, widths } of RESPONSIVE_VARIANTS) {
    if (!fs.existsSync(source)) continue

    const metadata = await sharp(source).metadata()
    const originalWidth = metadata.width ?? 0

    for (const width of widths) {
      if (width >= originalWidth) continue

      const variantPath = source.replace(/\.jpg$/, `-${width}.jpg`)
      if (fs.existsSync(variantPath)) continue

      await sharp(source)
        .resize({ width, withoutEnlargement: true })
        .jpeg({ quality: 82, mozjpeg: true })
        .toFile(variantPath)

      console.log(`🖼️ Generated responsive variant: ${variantPath}`)
    }
  }
}

async function optimizeImages() {
  console.log('📸 Optimizing images and generating Next-Gen AVIF formats...')
  await generateResponsiveVariants()

  // 1. Find all JPGs in the build output
  const images = globSync('dist/**/*.jpg')

  for (const imgPath of images) {
    const avifPath = imgPath.replace(/\.jpg$/, '.avif')

    // Convert to AVIF
    await sharp(imgPath)
      .avif({ quality: 45, effort: 0 })
      .toFile(avifPath)

    // Delete the original JPG from dist so we only serve the heavily optimized AVIF
    fs.unlinkSync(imgPath)
    console.log(`✅ Converted to AVIF: ${avifPath}`)
  }

  // 2. Rewrite all .jpg references in the compiled HTML, JS and CSS files to .avif
  const assets = globSync('dist/**/*.{html,js,css}')

  for (const file of assets) {
    const content = fs.readFileSync(file, 'utf-8')
    const newContent = content.replace(/\.jpg/g, '.avif')

    if (content !== newContent) {
      fs.writeFileSync(file, newContent, 'utf-8')
      console.log(`🔗 Updated references in: ${file}`)
    }
  }

  console.log('🚀 AVIF Optimization complete!')
}

optimizeImages().catch(err => {
  console.error('❌ Error optimizing images:', err)
  process.exit(1)
})
