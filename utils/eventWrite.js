import { userOwnsClub, normalizeAudienceInput, EVENT_AUDIENCE } from "@/utils/eventVisibility";

export function resolveClubIdFromBody(body) {
  const raw = body?.club_id ?? body?.clubId;
  if (raw === null || raw === undefined || raw === "") return null;
  const n = Number(raw);
  if (Number.isNaN(n)) return NaN;
  return n;
}

/**
 * Valida club_id y audiencia para crear o actualizar un evento.
 * @returns {{ clubId: number|null, audience: string, kind: string|null, error?: string }}
 */
export function validateEventClubAudiencePayload(db, reqUser, body) {
  const { role, id: uid } = reqUser;
  const isStaff = role === "administrador" || role === "organizador";
  const clubId = resolveClubIdFromBody(body);
  if (Number.isNaN(clubId)) {
    return { error: "Club inválido" };
  }
  const audience = normalizeAudienceInput(body?.audience);

  if (audience === EVENT_AUDIENCE.MEMBERS_ONLY && !clubId) {
    return { error: "Los eventos solo para miembros deben estar ligados a un club" };
  }

  if (!isStaff) {
    if (!clubId) {
      return { error: "Selecciona el club al que pertenece el evento" };
    }
    if (!userOwnsClub(db, uid, clubId)) {
      return { error: "No puedes crear eventos para un club que no gestionas" };
    }
  } else if (clubId) {
    const c = db.prepare(`SELECT id FROM clubs WHERE id = ?`).get(clubId);
    if (!c) {
      return { error: "Club no encontrado" };
    }
  }

  const kindRaw = body?.kind;
  const kind =
    kindRaw != null && String(kindRaw).trim() !== "" ? String(kindRaw).trim().slice(0, 120) : null;

  return { clubId, audience, kind };
}
