#!/usr/bin/env node

/**
 * Hero Image Optimization Script
 * Optimizes hero-dog.jpg to WebP and compressed JPEG formats
 * 
 * Usage: node scripts/optimize-hero-image.js
 */

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const inputPath = path.join(__dirname, '../public/images/hero-dog.jpg');
const outputWebP = path.join(__dirname, '../public/images/hero-dog.webp');
const outputJPEG = path.join(__dirname, '../public/images/hero-dog-optimized.jpg');

async function optimizeImage() {
  try {
    // Check if input file exists
    if (!fs.existsSync(inputPath)) {
      console.error(`Error: Input file not found: ${inputPath}`);
      process.exit(1);
    }

    console.log('Optimizing hero image...');
    console.log(`Input: ${inputPath}`);

    // Get original file size
    const originalStats = fs.statSync(inputPath);
    const originalSizeKB = (originalStats.size / 1024).toFixed(2);
    console.log(`Original size: ${originalSizeKB} KB`);

    // Optimize to WebP (80% quality)
    console.log('\nCreating WebP version...');
    await sharp(inputPath)
      .webp({ quality: 80 })
      .toFile(outputWebP);
    
    const webpStats = fs.statSync(outputWebP);
    const webpSizeKB = (webpStats.size / 1024).toFixed(2);
    const webpReduction = ((1 - webpStats.size / originalStats.size) * 100).toFixed(1);
    console.log(`WebP size: ${webpSizeKB} KB (${webpReduction}% reduction)`);

    // Optimize to JPEG (75% quality, mozjpeg)
    console.log('\nCreating optimized JPEG version...');
    await sharp(inputPath)
      .jpeg({ quality: 75, mozjpeg: true })
      .toFile(outputJPEG);
    
    const jpegStats = fs.statSync(outputJPEG);
    const jpegSizeKB = (jpegStats.size / 1024).toFixed(2);
    const jpegReduction = ((1 - jpegStats.size / originalStats.size) * 100).toFixed(1);
    console.log(`Optimized JPEG size: ${jpegSizeKB} KB (${jpegReduction}% reduction)`);

    console.log('\n✅ Optimization complete!');
    console.log(`\nFiles created:`);
    console.log(`  - ${outputWebP}`);
    console.log(`  - ${outputJPEG}`);
    console.log(`\nRecommendation: Use WebP format for best performance.`);
    
  } catch (error) {
    console.error('Error optimizing image:', error);
    process.exit(1);
  }
}

optimizeImage();
