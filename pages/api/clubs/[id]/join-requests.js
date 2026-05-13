import { authenticateToken } from "@/middlewares/auth";
import { getDBConnection } from "@/utils/db";
import { canManageClub, createOrActivateMembership, getClubById } from "@/utils/clubs";
import { validateJoinRequest, validateReview } from "@/utils/validation";

export default function handler(req, res) {
  const db = getDBConnection();
  const clubId = Number(req.query.id);
  if (!clubId || Number.isNaN(clubId)) {
    return res.status(400).json({ error: "Club inválido" });
  }

  return authenticateToken(req, res, () => {
    const club = getClubById(db, clubId);
    if (!club) return res.status(404).json({ error: "Club no encontrado" });
    const manager = canManageClub(req.user, club);

    if (req.method === "GET") {
      if (manager) {
        const requests = db
          .prepare(
            `SELECT r.id, r.user_id, r.message, r.status, r.rejection_reason, r.created_at, r.reviewed_at,
                    u.email, COALESCE(up.display_name, u.email) AS display_name
             FROM club_join_requests r
             JOIN users u ON u.id = r.user_id
             LEFT JOIN user_profiles up ON up.user_id = u.id
             WHERE r.club_id = ?
             ORDER BY r.created_at DESC`
          )
          .all(clubId);
        return res.status(200).json({ requests });
      }
      const requests = db
        .prepare(
          `SELECT id, club_id, user_id, message, status, rejection_reason, created_at, reviewed_at
           FROM club_join_requests
           WHERE club_id = ? AND user_id = ?
           ORDER BY created_at DESC`
        )
        .all(clubId, req.user.id);
      return res.status(200).json({ requests });
    }

    if (req.method === "POST") {
      const validation = validateJoinRequest(req.body || {});
      if (validation.error) return res.status(400).json({ error: validation.error });
      const existsMembership = db
        .prepare(`SELECT 1 FROM club_memberships WHERE club_id = ? AND user_id = ? AND status = 'active'`)
        .get(clubId, req.user.id);
      if (existsMembership) {
        return res.status(400).json({ error: "Ya eres miembro activo de este club" });
      }
      const pending = db
        .prepare(
          `SELECT id FROM club_join_requests
           WHERE club_id = ? AND user_id = ? AND status = 'pending'
           LIMIT 1`
        )
        .get(clubId, req.user.id);
      if (pending) return res.status(409).json({ error: "Ya tienes una solicitud pendiente" });
      db.prepare(
        `INSERT INTO club_join_requests (club_id, user_id, message, status, created_at, updated_at)
         VALUES (?, ?, ?, 'pending', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`
      ).run(clubId, req.user.id, validation.value.message || null);
      return res.status(201).json({ message: "Solicitud enviada correctamente" });
    }

    if (req.method === "PATCH") {
      const requestId = Number(req.body?.requestId);
      if (!requestId || Number.isNaN(requestId)) {
        return res.status(400).json({ error: "Solicitud inválida" });
      }
      const row = db.prepare(`SELECT * FROM club_join_requests WHERE id = ? AND club_id = ?`).get(requestId, clubId);
      if (!row) return res.status(404).json({ error: "Solicitud no encontrada" });
      if (row.status !== "pending") {
        return res.status(400).json({ error: "La solicitud ya fue procesada" });
      }

      if (manager) {
        const review = validateReview(req.body || {});
        if (review.error) return res.status(400).json({ error: review.error });
        const approved = review.value.action === "approve";
        db.prepare(
          `UPDATE club_join_requests
           SET status = ?, reviewed_by_user_id = ?, reviewed_at = CURRENT_TIMESTAMP, rejection_reason = ?, updated_at = CURRENT_TIMESTAMP
           WHERE id = ?`
        ).run(approved ? "approved" : "rejected", req.user.id, approved ? null : review.value.reason || null, requestId);
        if (approved) {
          createOrActivateMembership(db, {
            clubId,
            userId: row.user_id,
            approvedByUserId: req.user.id,
            role: "member",
          });
        }
        return res.status(200).json({ message: approved ? "Solicitud aprobada" : "Solicitud rechazada" });
      }

      if (Number(row.user_id) !== Number(req.user.id)) {
        return res.status(403).json({ error: "Acceso denegado" });
      }
      db.prepare(
        `UPDATE club_join_requests
         SET status = 'cancelled', updated_at = CURRENT_TIMESTAMP
         WHERE id = ?`
      ).run(requestId);
      return res.status(200).json({ message: "Solicitud cancelada" });
    }

    return res.status(405).json({ error: "Método no permitido" });
  });
}
