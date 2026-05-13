import { authenticateToken, authorizeOrganizerCapable } from "@/middlewares/auth";
import { getDBConnection } from "@/utils/db";
import { canUserMutateEvent } from "@/utils/eventAuth";

export default function handler(req, res) {
  const db = getDBConnection();

  if (req.method === "GET") {
    const events = db.prepare("SELECT * FROM events").all();
    return res.status(200).json({ events });
  }

  if (req.method === "POST") {
    return authenticateToken(req, res, () => {
      authorizeOrganizerCapable(req, res, () => {
        const { date, title, description } = req.body;
        if (!date || !title || !description) {
          return res.status(400).json({ error: "Faltan campos obligatorios" });
        }
        const uid = req.user.id;
        db.prepare(
          "INSERT INTO events (date, title, description, organizer_user_id) VALUES (?, ?, ?, ?)"
        ).run(date, title, description, uid);
        return res.status(201).json({ message: "Evento creado con éxito" });
      });
    });
  }

  if (req.method === "PUT") {
    return authenticateToken(req, res, () => {
      const { id, date, title, description } = req.body;
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
      db.prepare("UPDATE events SET date = ?, title = ?, description = ? WHERE id = ?").run(date, title, description, id);
      return res.status(200).json({ message: "Evento actualizado con éxito" });
    });
  }

  if (req.method === "DELETE") {
    return authenticateToken(req, res, () => {
      const { id } = req.query;
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
      db.prepare("DELETE FROM events WHERE id = ?").run(id);
      return res.status(200).json({ message: "Evento eliminado con éxito" });
    });
  }

  return res.status(405).json({ message: "Método no permitido" });
}
