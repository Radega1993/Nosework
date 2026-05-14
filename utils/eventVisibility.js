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

function buildEventsListSql(includeMyRegistration) {
  const judgesSub = `(SELECT GROUP_CONCAT(COALESCE(up.display_name, u.email), ' · ')
               FROM event_judges ej
               JOIN users u ON u.id = ej.user_id
               LEFT JOIN user_profiles up ON up.user_id = u.id
               WHERE ej.event_id = e.id)`;
  const myReg = includeMyRegistration
    ? `(SELECT er.status FROM event_registrations er WHERE er.event_id = e.id AND er.user_id = ? LIMIT 1) AS my_registration_status`
    : `NULL AS my_registration_status`;
  return `SELECT e.*,
              c.status AS club_status,
              COALESCE(NULLIF(TRIM(c.display_name), ''), NULLIF(TRIM(c.name), '')) AS club_display_name,
              (SELECT COUNT(*) FROM event_registrations er WHERE er.event_id = e.id) AS registrations_count,
              ${judgesSub} AS judges_summary,
              COALESCE(oup.display_name, ou.email) AS organizer_display_name,
              ${myReg}
       FROM events e
       LEFT JOIN clubs c ON c.id = e.club_id
       LEFT JOIN users ou ON ou.id = e.organizer_user_id
       LEFT JOIN user_profiles oup ON oup.user_id = ou.id
       ORDER BY e.date ASC`;
}

/**
 * Lista eventos visibles para el contexto (anon o usuario).
 * @param {{ userId?: number, role?: string }} viewer - sin id = anónimo
 */
export function listEventsVisibleToViewer(db, viewer) {
  const uid = viewer?.userId;
  const sql = buildEventsListSql(uid != null);
  const rows = uid != null ? db.prepare(sql).all(uid) : db.prepare(sql).all();

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
