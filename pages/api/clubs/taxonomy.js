import { getDBConnection } from "@/utils/db";

/**
 * GET /api/clubs/taxonomy — catálogo de servicios/disciplinas (público).
 */
export default function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método no permitido" });
  }
  const db = getDBConnection();
  const items = db
    .prepare(`SELECT id, code, label, category, sort_order FROM service_taxonomy ORDER BY sort_order, label`)
    .all();
  return res.status(200).json({ taxonomy: items });
}
