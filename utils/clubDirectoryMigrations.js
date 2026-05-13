import { CLUB_SERVICE_TAXONOMY_SEED } from "../data/clubServiceTaxonomy.js";

const CLUB_ALTER_STATEMENTS = [
  "ALTER TABLE clubs ADD COLUMN slug TEXT",
  "ALTER TABLE clubs ADD COLUMN legal_name TEXT",
  "ALTER TABLE clubs ADD COLUMN display_name TEXT",
  "ALTER TABLE clubs ADD COLUMN short_description TEXT",
  "ALTER TABLE clubs ADD COLUMN long_description TEXT",
  "ALTER TABLE clubs ADD COLUMN website_url TEXT",
  "ALTER TABLE clubs ADD COLUMN social_links TEXT",
  "ALTER TABLE clubs ADD COLUMN logo_url TEXT",
  "ALTER TABLE clubs ADD COLUMN cover_image_url TEXT",
  "ALTER TABLE clubs ADD COLUMN founded_year INTEGER",
  "ALTER TABLE clubs ADD COLUMN member_count_estimate INTEGER",
  "ALTER TABLE clubs ADD COLUMN visibility TEXT DEFAULT 'public'",
  "ALTER TABLE clubs ADD COLUMN source TEXT DEFAULT 'user_created'",
  "ALTER TABLE clubs ADD COLUMN locale_default TEXT DEFAULT 'es'",
  "ALTER TABLE clubs ADD COLUMN public_email TEXT",
  "ALTER TABLE clubs ADD COLUMN public_phone TEXT",
  "ALTER TABLE clubs ADD COLUMN whatsapp_url TEXT",
  "ALTER TABLE clubs ADD COLUMN contact_name TEXT",
  "ALTER TABLE clubs ADD COLUMN contact_hours TEXT",
  "ALTER TABLE clubs ADD COLUMN affiliation_status TEXT DEFAULT 'none'",
  "ALTER TABLE clubs ADD COLUMN affiliation_number TEXT",
  "ALTER TABLE clubs ADD COLUMN insurance_certificate_url TEXT",
  "ALTER TABLE clubs ADD COLUMN accepts_public_listing INTEGER NOT NULL DEFAULT 0",
  "ALTER TABLE clubs ADD COLUMN data_processing_consent_at TEXT",
  "ALTER TABLE clubs ADD COLUMN internal_notes TEXT",
  "ALTER TABLE clubs ADD COLUMN last_verified_at TEXT",
  "ALTER TABLE clubs ADD COLUMN submitted_at TEXT",
];

/**
 * Esquema directorio de clubes: columnas extendidas, ubicaciones, taxonomía de servicios.
 * Idempotente; ejecutar en cada getDBConnection.
 */
export function ensureClubDirectorySchema(conn) {
  for (const sql of CLUB_ALTER_STATEMENTS) {
    try {
      conn.prepare(sql).run();
    } catch (e) {
      // columna ya existe
    }
  }

  conn.prepare(`
            CREATE TABLE IF NOT EXISTS club_locations (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                club_id INTEGER NOT NULL,
                country_code TEXT NOT NULL DEFAULT 'ES',
                admin_area_level_1 TEXT,
                province TEXT,
                municipality TEXT,
                postal_code TEXT,
                address_line TEXT,
                latitude REAL,
                longitude REAL,
                is_primary INTEGER NOT NULL DEFAULT 1,
                training_venue_notes TEXT,
                created_at TEXT DEFAULT CURRENT_TIMESTAMP,
                updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (club_id) REFERENCES clubs(id) ON DELETE CASCADE
            )
        `).run();
  conn.prepare(`CREATE INDEX IF NOT EXISTS idx_club_locations_club ON club_locations(club_id)`).run();
  conn.prepare(`CREATE INDEX IF NOT EXISTS idx_club_locations_province ON club_locations(province)`).run();
  conn.prepare(`CREATE INDEX IF NOT EXISTS idx_club_locations_ccaa ON club_locations(admin_area_level_1)`).run();

  conn.prepare(`
            CREATE TABLE IF NOT EXISTS service_taxonomy (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                code TEXT NOT NULL UNIQUE,
                label TEXT NOT NULL,
                category TEXT NOT NULL,
                sort_order INTEGER NOT NULL DEFAULT 0
            )
        `).run();

  conn.prepare(`
            CREATE TABLE IF NOT EXISTS club_service_tags (
                club_id INTEGER NOT NULL,
                taxonomy_id INTEGER NOT NULL,
                PRIMARY KEY (club_id, taxonomy_id),
                FOREIGN KEY (club_id) REFERENCES clubs(id) ON DELETE CASCADE,
                FOREIGN KEY (taxonomy_id) REFERENCES service_taxonomy(id) ON DELETE CASCADE
            )
        `).run();
  conn.prepare(`CREATE INDEX IF NOT EXISTS idx_club_service_tags_taxonomy ON club_service_tags(taxonomy_id)`).run();

  const insertTax = conn.prepare(
    `INSERT OR IGNORE INTO service_taxonomy (code, label, category, sort_order) VALUES (?, ?, ?, ?)`
  );
  for (const row of CLUB_SERVICE_TAXONOMY_SEED) {
    insertTax.run(row.code, row.label, row.category, row.sort_order);
  }

  try {
    conn.prepare(
      `UPDATE clubs SET display_name = name WHERE display_name IS NULL OR TRIM(display_name) = ''`
    ).run();
  } catch (e) {
    // ignore
  }
  try {
    conn.prepare(`UPDATE clubs SET slug = 'club-' || id WHERE slug IS NULL OR TRIM(slug) = ''`).run();
  } catch (e) {
    // ignore
  }

  try {
    conn.prepare(`CREATE UNIQUE INDEX IF NOT EXISTS idx_clubs_slug_unique ON clubs(slug)`).run();
  } catch (e) {
    // duplicados legacy: resolver en migración manual si hiciera falta
  }
}
