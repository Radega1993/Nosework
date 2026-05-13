/**
 * Columnas de evento ligadas a club y audiencia (SQLite idempotente).
 */

export const EVENT_AUDIENCE = {
  OPEN: "open",
  MEMBERS_ONLY: "members_only",
};

export function ensureEventClubColumns(conn) {
  try {
    conn.prepare(`ALTER TABLE events ADD COLUMN club_id INTEGER REFERENCES clubs(id)`).run();
  } catch (e) {
    // ya existe
  }
  try {
    conn.prepare(`ALTER TABLE events ADD COLUMN audience TEXT`).run();
  } catch (e) {
    // ya existe
  }
  try {
    conn.prepare(
      `UPDATE events SET audience = 'open' WHERE audience IS NULL OR TRIM(COALESCE(audience, '')) = ''`
    ).run();
  } catch (e) {
    // ignorar
  }
  try {
    conn.prepare(`ALTER TABLE events ADD COLUMN kind TEXT`).run();
  } catch (e) {
    // ya existe
  }
  try {
    conn.prepare(`CREATE INDEX IF NOT EXISTS idx_events_club_id ON events(club_id)`).run();
  } catch (e) {
    // ignorar
  }
  try {
    conn.prepare(`CREATE INDEX IF NOT EXISTS idx_events_audience ON events(audience)`).run();
  } catch (e) {
    // ignorar
  }
}
