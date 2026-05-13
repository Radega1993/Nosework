import { getDBConnection } from "@/utils/db";
import { authenticateToken } from "@/middlewares/auth";
import { canUserMutateEvent } from "@/utils/eventAuth";

export default function handler(req, res) {
  const db = getDBConnection();
  const { id } = req.query;

  if (req.method === "GET") {
    if (!id) {
      return res.status(400).json({ error: "Falta el ID del evento" });
    }

    const event = db.prepare("SELECT * FROM events WHERE id = ?").get(id);

    if (!event) {
      return res.status(404).json({ error: "Evento no encontrado" });
    }

    return res.status(200).json({ event });
  }

  if (req.method === "PUT") {
    return authenticateToken(req, res, () => {
      const { date, title, description } = req.body;
      if (!id || !date || !title || !description) {
        return res.status(400).json({ error: "Faltan campos obligatorios" });
      }

      const event = db.prepare("SELECT * FROM events WHERE id = ?").get(id);
      if (!event) {
        return res.status(404).json({ error: "Evento no encontrado" });
      }
      if (!canUserMutateEvent(db, req.user.id, req.user.role, event)) {
        return res.status(403).json({ error: "Acceso denegado" });
      }

      const result = db
        .prepare("UPDATE events SET date = ?, title = ?, description = ? WHERE id = ?")
        .run(date, title, description, id);

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
