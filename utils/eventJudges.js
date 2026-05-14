/**
 * Jueces de prueba: usuarios de la plataforma (N:N con events).
 */

export function ensureEventJudgesTable(conn) {
  conn.prepare(
    `CREATE TABLE IF NOT EXISTS event_judges (
      event_id INTEGER NOT NULL,
      user_id INTEGER NOT NULL,
      PRIMARY KEY (event_id, user_id),
      FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )`
  ).run();
  conn.prepare(`CREATE INDEX IF NOT EXISTS idx_event_judges_user ON event_judges(user_id)`).run();
}

/**
 * @param {import("better-sqlite3").Database} db
 * @param {number} eventId
 * @param {number[]} userIds
 */
export function replaceEventJudges(db, eventId, userIds) {
  const del = db.prepare(`DELETE FROM event_judges WHERE event_id = ?`);
  const ins = db.prepare(`INSERT INTO event_judges (event_id, user_id) VALUES (?, ?)`);
  const tx = db.transaction(() => {
    del.run(eventId);
    for (const uid of userIds) {
      if (uid != null && Number.isFinite(Number(uid))) {
        ins.run(eventId, Number(uid));
      }
    }
  });
  tx();
}

export function listJudgesForEvent(db, eventId) {
  return db
    .prepare(
      `SELECT u.id,
              COALESCE(up.display_name, u.email) AS display_name,
              COALESCE(u.is_judge, 0) AS is_judge
       FROM event_judges ej
       JOIN users u ON u.id = ej.user_id
       LEFT JOIN user_profiles up ON up.user_id = u.id
       WHERE ej.event_id = ?
       ORDER BY display_name COLLATE NOCASE`
    )
    .all(eventId);
}

/**
 * @param {import("better-sqlite3").Database} db
 * @param {number[]} ids
 * @returns {{ ok: true } | { error: string }}
 */
export function validateJudgeUserIdsExist(db, rawIds) {
  const unique = [...new Set((rawIds || []).map(Number).filter((n) => Number.isInteger(n) && n > 0))];
  if (unique.length === 0) {
    return { error: "Debes asignar al menos un juez (usuario registrado en la plataforma)" };
  }
  if (unique.length > 12) {
    return { error: "Máximo 12 jueces por prueba" };
  }
  const placeholders = unique.map(() => "?").join(",");
  const rows = db.prepare(`SELECT id FROM users WHERE id IN (${placeholders})`).all(...unique);
  if (rows.length !== unique.length) {
    return { error: "Algún juez no existe o no es un usuario válido" };
  }
  return { ok: true, ids: unique };
}
