import { getDBConnection } from "@/utils/db";
import { authenticateToken, getOptionalUser } from "@/middlewares/auth";
import { canUserMutateEvent } from "@/utils/eventAuth";
import { canUserViewEvent } from "@/utils/eventVisibility";
import { validateEventClubAudiencePayload } from "@/utils/eventWrite";

function loadEventWithClub(db, id) {
  return db
    .prepare(
      `SELECT e.*, c.status AS club_status
       FROM events e
       LEFT JOIN clubs c ON c.id = e.club_id
       WHERE e.id = ?`
    )
    .get(id);
}

function mapEventRow(row) {
  if (!row) return null;
  const { club_status: _cs, ...rest } = row;
  return rest;
}

export default function handler(req, res) {
  const db = getDBConnection();
  const { id } = req.query;

  if (req.method === "GET") {
    if (!id) {
      return res.status(400).json({ error: "Falta el ID del evento" });
    }
    const row = loadEventWithClub(db, id);
    if (!row) {
      return res.status(404).json({ error: "Evento no encontrado" });
    }
    const user = getOptionalUser(req);
    const u = user?.id != null ? { id: user.id, role: user.role || "user" } : null;
    if (!canUserViewEvent(db, u, row)) {
      return res.status(404).json({ error: "Evento no encontrado" });
    }
    return res.status(200).json({ event: mapEventRow(row) });
  }

  if (req.method === "PUT") {
    return authenticateToken(req, res, () => {
      const { date, title, description } = req.body || {};
      if (!id || !date || !title || !description) {
        return res.status(400).json({ error: "Faltan campos obligatorios" });
      }

      const event = loadEventWithClub(db, id);
      if (!event) {
        return res.status(404).json({ error: "Evento no encontrado" });
      }
      if (!canUserMutateEvent(db, req.user.id, req.user.role, event)) {
        return res.status(403).json({ error: "Acceso denegado" });
      }

      const v = validateEventClubAudiencePayload(db, req.user, req.body || {});
      if (v.error) {
        return res.status(400).json({ error: v.error });
      }

      const result = db
        .prepare(
          `UPDATE events SET date = ?, title = ?, description = ?, club_id = ?, audience = ?, kind = ?
           WHERE id = ?`
        )
        .run(date, title, description, v.clubId, v.audience, v.kind, id);

      if (result.changes === 0) {
        return res.status(404).json({ error: "Evento no encontrado" });
      }

      return res.status(200).json({ message: "Evento actualizado con éxito" });
    });
  }

  if (req.method === "DELETE") {
    return authenticateToken(req, res, () => {
      if (!id) {
        return res.status(400).json({ error: "Falta el ID del evento" });
      }

      const event = db.prepare("SELECT * FROM events WHERE id = ?").get(id);
      if (!event) {
        return res.status(404).json({ error: "Evento no encontrado" });
      }
      if (!canUserMutateEvent(db, req.user.id, req.user.role, event)) {
        return res.status(403).json({ error: "Acceso denegado" });
      }

      const result = db.prepare("DELETE FROM events WHERE id = ?").run(id);

      if (result.changes === 0) {
        return res.status(404).json({ error: "Evento no encontrado" });
      }

      return res.status(200).json({ message: "Evento eliminado con éxito" });
    });
  }

  return res.status(405).json({ message: "Método no permitido" });
}
