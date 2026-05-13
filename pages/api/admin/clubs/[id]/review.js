import { authenticateToken, authorizeAdmin } from "@/middlewares/auth";
import { getDBConnection } from "@/utils/db";
import { validateReview } from "@/utils/validation";

export default function handler(req, res) {
  if (req.method !== "PATCH") return res.status(405).json({ error: "Método no permitido" });
  const db = getDBConnection();
  const clubId = Number(req.query.id);
  if (!clubId || Number.isNaN(clubId)) return res.status(400).json({ error: "Club inválido" });

  return authenticateToken(req, res, () =>
    authorizeAdmin(req, res, () => {
      const validation = validateReview(req.body || {});
      if (validation.error) return res.status(400).json({ error: validation.error });
      const club = db.prepare(`SELECT id, status FROM clubs WHERE id = ?`).get(clubId);
      if (!club) return res.status(404).json({ error: "Club no encontrado" });
      if (club.status !== "pending") {
        return res.status(400).json({ error: "Solo se pueden revisar clubs pendientes" });
      }
      const approve = validation.value.action === "approve";
      db.prepare(
        `UPDATE clubs
         SET status = ?, reviewed_by = ?, reviewed_at = CURRENT_TIMESTAMP,
             rejection_reason = ?, updated_at = CURRENT_TIMESTAMP
         WHERE id = ?`
      ).run(approve ? "approved" : "rejected", req.user.id, approve ? null : validation.value.reason || null, clubId);
      return res.status(200).json({ message: approve ? "Club aprobado" : "Club rechazado" });
    })
  );
}
