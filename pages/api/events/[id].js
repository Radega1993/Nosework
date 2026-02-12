import { getDBConnection } from "@/utils/db";

export default function handler(req, res) {
  const db = getDBConnection();
  const { id } = req.query;

  if (req.method === "GET") {
    // GET: Fetch single event by ID (public endpoint)
    if (!id) {
      return res.status(400).json({ error: "Falta el ID del evento" });
    }

    const event = db.prepare("SELECT * FROM events WHERE id = ?").get(id);

    if (!event) {
      return res.status(404).json({ error: "Evento no encontrado" });
    }

    // TODO: Include organizer/club information when clubs table is available
    // const organizer = db.prepare("SELECT * FROM clubs WHERE id = ?").get(event.club_id);
    // event.organizer = organizer || null;

    // TODO: Include registration count when registrations table is available
    // const registrationsCount = db.prepare("SELECT COUNT(*) as count FROM registrations WHERE event_id = ?").get(event.id);
    // event.registrations_count = registrationsCount?.count || 0;

    return res.status(200).json({ event });
  } else if (req.method === "PUT") {
    // PUT: Update event (requires authentication)
    const { authenticateToken, authorizeRoles } = require("@/middlewares/auth");
    authenticateToken(req, res, () => {
      authorizeRoles("organizador", "administrador")(req, res, () => {
        const { date, title, description } = req.body;
        if (!id || !date || !title || !description) {
          return res.status(400).json({ error: "Faltan campos obligatorios" });
        }

        const result = db
          .prepare("UPDATE events SET date = ?, title = ?, description = ? WHERE id = ?")
          .run(date, title, description, id);

        if (result.changes === 0) {
          return res.status(404).json({ error: "Evento no encontrado" });
        }

        res.status(200).json({ message: "Evento actualizado con éxito" });
      });
    });
  } else if (req.method === "DELETE") {
    // DELETE: Delete event (requires authentication)
    const { authenticateToken, authorizeRoles } = require("@/middlewares/auth");
    authenticateToken(req, res, () => {
      authorizeRoles("organizador", "administrador")(req, res, () => {
        if (!id) {
          return res.status(400).json({ error: "Falta el ID del evento" });
        }

        const result = db.prepare("DELETE FROM events WHERE id = ?").run(id);

        if (result.changes === 0) {
          return res.status(404).json({ error: "Evento no encontrado" });
        }

        res.status(200).json({ message: "Evento eliminado con éxito" });
      });
    });
  } else {
    res.status(405).json({ message: "Método no permitido" });
  }
}
