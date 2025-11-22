import { authenticateToken, authorizeRoles } from "../../middlewares/auth";
import { getDBConnection } from "@/utils/db";

export default function handler(req, res) {
    const db = getDBConnection();

    if (req.method === "GET") {
        const events = db.prepare("SELECT * FROM events").all();
        return res.status(200).json({ events });
    } else if (req.method === "POST") {
        authenticateToken(req, res, () => {
            authorizeRoles("organizador", "administrador")(req, res, () => {
                const { date, title, description } = req.body;
                if (!date || !title || !description) {
                    return res.status(400).json({ error: "Faltan campos obligatorios" });
                }
                db.prepare("INSERT INTO events (date, title, description) VALUES (?, ?, ?)").run(date, title, description);
                res.status(201).json({ message: "Evento creado con éxito" });
            });
        });
    } else if (req.method === "PUT") {
        authenticateToken(req, res, () => {
            authorizeRoles("organizador", "administrador")(req, res, () => {
                const { id, date, title, description } = req.body;
                if (!id || !date || !title || !description) {
                    return res.status(400).json({ error: "Faltan campos obligatorios" });
                }
                db.prepare(
                    "UPDATE events SET date = ?, title = ?, description = ? WHERE id = ?"
                ).run(date, title, description, id);
                res.status(200).json({ message: "Evento actualizado con éxito" });
            });
        });
    } else if (req.method === "DELETE") {
        authenticateToken(req, res, () => {
            authorizeRoles("organizador", "administrador")(req, res, () => {
                const { id } = req.query;
                if (!id) {
                    return res.status(400).json({ error: "Falta el ID del evento" });
                }
                db.prepare("DELETE FROM events WHERE id = ?").run(id);
                res.status(200).json({ message: "Evento eliminado con éxito" });
            });
        });
    } else {
        res.status(405).json({ message: "Método no permitido" });
    }
}
