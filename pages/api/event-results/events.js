import { getDBConnection } from "@/utils/db";

/**
 * GET /api/event-results/events
 * Eventos que tienen al menos una fila de resultados (para enlaces al detalle).
 */
export default function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Método no permitido" });
  }

  const db = getDBConnection();

  const events = db
    .prepare(
      `SELECT e.id, e.date, e.title, COUNT(er.id) AS result_count
       FROM events e
       INNER JOIN event_results er ON er.event_id = e.id
       GROUP BY e.id
       ORDER BY e.date DESC, e.id DESC`
    )
    .all();

  return res.status(200).json({ events });
}
