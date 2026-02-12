# Hero Image Optimization Guide

**Date:** February 12, 2026  
**Task:** 7.2.1 - Optimize hero background image (compress to < 100 KiB if possible)

## Current Status

**File:** `public/images/hero-dog.jpg`  
**Current Size:** 529 KB (529,000 bytes)  
**Target Size:** < 100 KB  
**Reduction Needed:** ~81% compression

## Optimization Steps

### Step 1: Compress Image

**Option A: Using ImageMagick (Command Line)**
```bash
# Install ImageMagick if not already installed
# Ubuntu/Debian: sudo apt-get install imagemagick
# macOS: brew install imagemagick

# Compress JPEG
convert public/images/hero-dog.jpg -quality 75 -strip public/images/hero-dog-optimized.jpg

# Or use mozjpeg for better compression
# Install: npm install -g mozjpeg
cjpeg -quality 75 -optimize public/images/hero-dog.jpg > public/images/hero-dog-optimized.jpg
```

**Option B: Using Online Tools**
- [Squoosh](https://squoosh.app/) - Recommended, supports WebP
- [TinyPNG](https://tinypng.com/) - Good JPEG compression
- [ImageOptim](https://imageoptim.com/) - macOS app

**Option C: Using Sharp (Node.js)**
```bash
npm install --save-dev sharp
```

Create `scripts/optimize-hero.js`:
```javascript
const sharp = require('sharp');

sharp('public/images/hero-dog.jpg')
  .jpeg({ quality: 75, mozjpeg: true })
  .toFile('public/images/hero-dog-optimized.jpg')
  .then(() => console.log('Image optimized!'));
```

### Step 2: Convert to WebP Format

**Using Sharp:**
```javascript
const sharp = require('sharp');

sharp('public/images/hero-dog.jpg')
  .webp({ quality: 80 })
  .toFile('public/images/hero-dog.webp')
  .then(() => console.log('WebP created!'));
```

**Using Squoosh.app:**
1. Upload `hero-dog.jpg`
2. Select WebP format
3. Adjust quality slider (aim for 80-85%)
4. Download optimized image

### Step 3: Update Component

After optimization, update `components/HeroSection.js` to use the optimized image:

```jsx
// Use WebP with JPEG fallback
<HeroSection backgroundImage="/images/hero-dog.webp" />
```

Or update the component to support both formats:
```jsx
// In HeroSection.js, add picture element for format fallback
<picture>
  <source srcSet="/images/hero-dog.webp" type="image/webp" />
  <source srcSet="/images/hero-dog-optimized.jpg" type="image/jpeg" />
  <Image src="/images/hero-dog-optimized.jpg" ... />
</picture>
```

## Expected Results

**After Optimization:**
- JPEG: ~80-100 KB (75% quality)
- WebP: ~50-70 KB (80% quality)
- **LCP Improvement:** 6.2s → 4.0-4.5s (estimated)

## Verification

After optimization:
1. Check file size: `ls -lh public/images/hero-dog*`
2. Verify image quality visually
3. Test LCP with Lighthouse
4. Ensure image loads correctly in browser

## Notes

- Keep original image as backup
- Test on different devices/screen sizes
- Ensure image maintains visual quality after compression
- Consider responsive image sizes for different viewports
