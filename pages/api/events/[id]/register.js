import { authenticateToken } from "@/middlewares/auth";
import { getDBConnection } from "@/utils/db";
import { canUserRegisterForEvent } from "@/utils/eventVisibility";

function loadEventWithClub(db, eventId) {
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

  if (req.method === "POST") {
    return authenticateToken(req, res, () => {
      const row = loadEventWithClub(db, eventId);
      if (!row) {
        return res.status(404).json({ error: "Evento no encontrado" });
      }
      if (!canUserRegisterForEvent(db, req.user, row)) {
        return res.status(403).json({ error: "No puedes inscribirte en este evento" });
      }

      const dup = db
        .prepare(`SELECT id FROM event_registrations WHERE event_id = ? AND user_id = ?`)
        .get(eventId, req.user.id);
      if (dup) {
        return res.status(409).json({ error: "Ya estás inscrito en este evento" });
      }

      const dogRaw = req.body?.dog_id ?? req.body?.dogId;
      let dogId = null;
      if (dogRaw !== null && dogRaw !== undefined && dogRaw !== "") {
        dogId = Number(dogRaw);
        if (Number.isNaN(dogId)) {
          return res.status(400).json({ error: "Perro no válido" });
        }
        const dog = db
          .prepare(`SELECT id FROM dogs WHERE id = ? AND handler_user_id = ?`)
          .get(dogId, req.user.id);
        if (!dog) {
          return res.status(400).json({ error: "Perro no encontrado o no te pertenece" });
        }
      }

      const ins = db
        .prepare(
          `INSERT INTO event_registrations (user_id, dog_id, event_id, status)
           VALUES (?, ?, ?, 'pendiente')`
        )
        .run(req.user.id, dogId, eventId);

      return res.status(201).json({ message: "Inscripción registrada", id: ins.lastInsertRowid });
    });
  }

  if (req.method === "DELETE") {
    return authenticateToken(req, res, () => {
      const row = loadEventWithClub(db, eventId);
      if (!row) {
        return res.status(404).json({ error: "Evento no encontrado" });
      }
      const result = db
        .prepare(`DELETE FROM event_registrations WHERE event_id = ? AND user_id = ?`)
        .run(eventId, req.user.id);
      if (result.changes === 0) {
        return res.status(404).json({ error: "No había inscripción para este evento" });
      }
      return res.status(200).json({ message: "Inscripción cancelada" });
    });
  }

  return res.status(405).json({ message: "Método no permitido" });
}
