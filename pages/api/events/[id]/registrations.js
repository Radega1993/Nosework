import { requireAuthUser } from "@/middlewares/auth";
import { getDBConnection } from "@/utils/db";
import { canUserMutateEvent } from "@/utils/eventAuth";
import { isAllowedOrganizerRegistrationStatus } from "@/utils/eventRegistrations";

function loadEvent(db, eventId) {
  return db
    .prepare(
      `SELECT e.*, c.status AS club_status
       FROM events e
       LEFT JOIN clubs c ON c.id = e.club_id
       WHERE e.id = ?`
    )
    .get(eventId);
}

export default function handler(req, res) {
  const db = getDBConnection();
  const idRaw = req.query.id;
  const eventId = Number(idRaw);
  if (!idRaw || Number.isNaN(eventId)) {
    return res.status(400).json({ error: "ID de evento inválido" });
  }

  const user = requireAuthUser(req, res);
  if (!user) return;

  const event = loadEvent(db, eventId);
  if (!event) {
    return res.status(404).json({ error: "Evento no encontrado" });
  }
  if (!canUserMutateEvent(db, user.id, user.role, event)) {
    return res.status(403).json({ error: "Acceso denegado" });
  }

  if (req.method === "GET") {
    const rows = db
      .prepare(
        `SELECT er.id,
                er.status,
                er.created_at,
                er.user_id,
                u.email AS user_email,
                COALESCE(up.display_name, u.email) AS display_name,
                d.id AS dog_id,
                d.name AS dog_name
         FROM event_registrations er
         JOIN users u ON u.id = er.user_id
         LEFT JOIN user_profiles up ON up.user_id = u.id
         LEFT JOIN dogs d ON d.id = er.dog_id
         WHERE er.event_id = ?
         ORDER BY er.created_at ASC`
      )
      .all(eventId);
    return res.status(200).json({ registrations: rows });
  }

  if (req.method === "PATCH") {
    const regId = Number(req.body?.registrationId ?? req.body?.registration_id);
    const status = String(req.body?.status || "").trim();
    if (!regId || Number.isNaN(regId)) {
      return res.status(400).json({ error: "Falta registrationId" });
    }
    if (!isAllowedOrganizerRegistrationStatus(status)) {
      return res.status(400).json({ error: "Estado no válido" });
    }
    const row = db
      .prepare(`SELECT id FROM event_registrations WHERE id = ? AND event_id = ?`)
      .get(regId, eventId);
    if (!row) {
      return res.status(404).json({ error: "Inscripción no encontrada" });
    }
    db.prepare(`UPDATE event_registrations SET status = ? WHERE id = ? AND event_id = ?`).run(status, regId, eventId);
    return res.status(200).json({ message: "Estado actualizado" });
  }

  return res.status(405).json({ message: "Método no permitido" });
}
