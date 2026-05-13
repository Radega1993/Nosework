/**
 * Genera WebP optimizados (max ~400px ancho) desde data/partnerClubs.manifest.json
 * Salida: public/logos/optimized/{slug}.webp
 *
 * Uso: npm run optimize:club-logos
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const manifestPath = path.join(root, "data", "partnerClubs.manifest.json");
const logosDir = path.join(root, "public", "logos");
const outDir = path.join(root, "public", "logos", "optimized");

const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

fs.mkdirSync(outDir, { recursive: true });

for (const club of manifest.clubs) {
  const input = path.join(logosDir, club.sourceFile);
  const output = path.join(outDir, `${club.slug}.webp`);
  if (!fs.existsSync(input)) {
    console.error("Missing file:", club.sourceFile);
    process.exitCode = 1;
    continue;
  }
  try {
    await sharp(input)
      .rotate()
      .resize({ width: 400, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(output);
    console.log("OK", club.slug);
  } catch (err) {
    console.error("FAIL", club.slug, err.message);
    process.exitCode = 1;
  }
}
