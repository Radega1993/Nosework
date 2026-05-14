import { userCanOrganizeEvents } from "@/utils/userProfile";

/** Filas antiguas / migración: sin creador ni club asociado (no aplican reglas de organizer_user_id). */
function isLegacyOrphanEvent(event) {
  const oid = event.organizer_user_id;
  const cid = event.club_id;
  const noOrganizer = oid == null || String(oid).trim() === "" || Number(oid) === 0;
  const noClub = cid == null || String(cid).trim() === "" || Number(cid) === 0;
  return noOrganizer && noClub;
}

/**
 * Puede editar/borrar un evento: staff global; o usuario con capacidad de organización que sea
 * el creador del evento (organizer_user_id) o responsable del club al que pertenece la prueba.
 * Eventos huérfanos (sin organizer ni club) los puede limpiar quien ya puede organizar (dueño de club o staff).
 */
export function canUserMutateEvent(db, userId, role, event) {
  if (!event) return false;
  if (role === "administrador" || role === "organizador") return true;
  if (isLegacyOrphanEvent(event)) {
    return userCanOrganizeEvents(db, userId, role);
  }
  if (!userCanOrganizeEvents(db, userId, role)) return false;
  const uid = Number(userId);
  if (Number(event.organizer_user_id) === uid) return true;
  const clubId = event.club_id != null ? Number(event.club_id) : null;
  if (clubId != null && !Number.isNaN(clubId)) {
    const row = db.prepare(`SELECT owner_user_id FROM clubs WHERE id = ?`).get(clubId);
    if (row && Number(row.owner_user_id) === uid) return true;
  }
  return false;
}
