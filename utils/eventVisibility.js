import { CLUB_STATUS } from "@/utils/clubs";
import { EVENT_AUDIENCE } from "@/utils/eventClubMigrations";

function normalizeAudience(raw) {
  const a = String(raw || "").trim().toLowerCase();
  if (a === EVENT_AUDIENCE.MEMBERS_ONLY) return EVENT_AUDIENCE.MEMBERS_ONLY;
  return EVENT_AUDIENCE.OPEN;
}

/**
 * Fila evento + opcional status del club (LEFT JOIN).
 * @param {object} row - e.* y opcional club_status
 */
export function isEventPublicOnCalendar(row) {
  const audience = normalizeAudience(row.audience);
  if (audience !== EVENT_AUDIENCE.OPEN) return false;
  if (row.club_id == null) return true;
  const st = row.club_status;
  return st === CLUB_STATUS.APPROVED;
}

export function userHasActiveMembership(db, userId, clubId) {
  if (!userId || !clubId) return false;
  const r = db
    .prepare(
      `SELECT 1 FROM club_memberships
       WHERE club_id = ? AND user_id = ? AND status = 'active' LIMIT 1`
    )
    .get(clubId, userId);
  return Boolean(r);
}

export function userOwnsClub(db, userId, clubId) {
  if (!userId || !clubId) return false;
  const r = db.prepare(`SELECT 1 FROM clubs WHERE id = ? AND owner_user_id = ?`).get(clubId, userId);
  return Boolean(r);
}

/**
 * El usuario puede ver el evento en detalle / listados (no implica poder inscribirse).
 */
export function canUserViewEvent(db, user, eventRow) {
  if (!eventRow) return false;
  if (user?.role === "administrador" || user?.role === "organizador") return true;
  const uid = user?.id;
  if (uid != null && Number(eventRow.organizer_user_id) === Number(uid)) return true;
  if (isEventPublicOnCalendar(eventRow)) return true;
  const audience = normalizeAudience(eventRow.audience);
  if (audience === EVENT_AUDIENCE.MEMBERS_ONLY && uid != null) {
    if (userHasActiveMembership(db, uid, eventRow.club_id)) return true;
    if (userOwnsClub(db, uid, eventRow.club_id)) return true;
  }
  return false;
}

/**
 * Puede solicitar inscripción: usuario autenticado y reglas de audiencia.
 */
export function canUserRegisterForEvent(db, user, eventRow) {
  if (!user?.id || !eventRow) return false;
  if (!canUserViewEvent(db, user, eventRow)) return false;
  const audience = normalizeAudience(eventRow.audience);
  if (audience === EVENT_AUDIENCE.OPEN) return true;
  if (audience === EVENT_AUDIENCE.MEMBERS_ONLY) {
    return userHasActiveMembership(db, user.id, eventRow.club_id) || userOwnsClub(db, user.id, eventRow.club_id);
  }
  return false;
}

/**
 * Lista eventos visibles para el contexto (anon o usuario).
 * @param {{ userId?: number, role?: string }} viewer - sin id = anónimo
 */
export function listEventsVisibleToViewer(db, viewer) {
  const rows = db
    .prepare(
      `SELECT e.*, c.status AS club_status
       FROM events e
       LEFT JOIN clubs c ON c.id = e.club_id
       ORDER BY e.date ASC`
    )
    .all();

  const user = viewer?.userId != null ? { id: viewer.userId, role: viewer.role || "user" } : null;

  return rows.filter((row) => {
    if (user?.role === "administrador" || user?.role === "organizador") return true;
    return canUserViewEvent(db, user, row);
  });
}

export function normalizeAudienceInput(v) {
  return normalizeAudience(v);
}

export { EVENT_AUDIENCE };
