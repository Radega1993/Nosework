/**
 * WebP optimizado para fotos «qué es» (modalidades).
 * Requiere: public/images/{coche,exterior,interior,paqueteria}.jpeg
 * Uso: npm run optimize:brand-que-es
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

async function jpegToWebp(relIn, relOut, maxWidth, quality) {
  const input = path.join(root, relIn);
  const output = path.join(root, relOut);
  if (!fs.existsSync(input)) {
    console.error("Missing:", relIn);
    process.exitCode = 1;
    return;
  }
  await sharp(input)
    .rotate()
    .resize({ width: maxWidth, withoutEnlargement: true })
    .webp({ quality, effort: 4 })
    .toFile(output);
  console.log("OK", relOut);
}

for (const [relIn, relOut, w, q] of [
  ["public/images/coche.jpeg", "public/images/coche.webp", 1280, 80],
  ["public/images/exterior.jpeg", "public/images/exterior.webp", 1280, 80],
  ["public/images/interior.jpeg", "public/images/interior.webp", 1280, 80],
  ["public/images/paqueteria.jpeg", "public/images/paqueteria.webp", 1280, 80],
]) {
  await jpegToWebp(relIn, relOut, w, q);
}
