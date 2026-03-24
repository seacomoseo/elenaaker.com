import fs from 'fs';
import path from 'path';
import { globSync } from 'glob';
import sharp from 'sharp';

async function optimizeImages() {
  console.log('📸 Optimizing images and generating Next-Gen AVIF formats...');

  // 1. Find all JPGs in the build output
  const images = globSync('dist/**/*.jpg');
  
  for (const imgPath of images) {
    const avifPath = imgPath.replace(/\.jpg$/, '.avif');
    
    // Convert to AVIF
    await sharp(imgPath)
      .avif({ quality: 75, effort: 4 })
      .toFile(avifPath);
    
    // Delete the original JPG from dist so we only serve the heavily optimized AVIF
    fs.unlinkSync(imgPath);
    console.log(`✅ Converted to AVIF: ${avifPath}`);
  }

  // 2. Rewrite all .jpg references in the compiled HTML, JS and CSS files to .avif
  const assets = globSync('dist/**/*.{html,js,css}');
  
  for (const file of assets) {
    let content = fs.readFileSync(file, 'utf-8');
    const newContent = content.replace(/\.jpg/g, '.avif');
    
    if (content !== newContent) {
      fs.writeFileSync(file, newContent, 'utf-8');
      console.log(`🔗 Updated references in: ${file}`);
    }
  }

  console.log('🚀 AVIF Optimization complete!');
}

optimizeImages().catch(err => {
  console.error('❌ Error optimizing images:', err);
  process.exit(1);
});
