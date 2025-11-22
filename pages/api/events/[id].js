import { authenticateToken, authorizeRoles } from "@/middlewares/auth";
import { getDBConnection } from "@/utils/db";

export default function handler(req, res) {
    const db = getDBConnection();
    const { id } = req.query; // Obtenemos el ID del evento desde la URL

    if (req.method === "PUT") {
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
