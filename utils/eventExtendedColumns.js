/**
 * Campos ampliados de prueba/evento (ubicación, precio, niveles, cronograma, contacto).
 * Idempotente vía ALTER ignorando error de columna duplicada.
 */

const COLUMNS = [
  ["municipality", "TEXT"],
  ["province", "TEXT"],
  ["postal_code", "TEXT"],
  ["venue_address", "TEXT"],
  ["price_euros", "REAL"],
  ["meal_price_euros", "REAL"],
  ["levels_json", "TEXT"],
  ["schedule_details", "TEXT"],
  ["registration_phone", "TEXT"],
  ["judge_organizer_name", "TEXT"],
  ["latitude", "REAL"],
  ["longitude", "REAL"],
];

export function ensureEventExtendedColumns(conn) {
  for (const [name, sqlType] of COLUMNS) {
    try {
      conn.prepare(`ALTER TABLE events ADD COLUMN ${name} ${sqlType}`).run();
    } catch {
      // columna ya existe
    }
  }
}
