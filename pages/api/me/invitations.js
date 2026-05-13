import { authenticateToken } from "@/middlewares/auth";
import { getDBConnection } from "@/utils/db";
import { createOrActivateMembership } from "@/utils/clubs";

export default function handler(req, res) {
  const db = getDBConnection();

  return authenticateToken(req, res, () => {
    const userId = req.user.id;

    if (req.method === "GET") {
      const invitations = db
        .prepare(
          `SELECT i.id, i.club_id, i.invited_by_user_id, i.message, i.status, i.created_at, i.responded_at,
                  c.name AS club_name,
                  COALESCE(up.display_name, u.email) AS invited_by_name
           FROM club_invitations i
           JOIN clubs c ON c.id = i.club_id
           JOIN users u ON u.id = i.invited_by_user_id
           LEFT JOIN user_profiles up ON up.user_id = i.invited_by_user_id
           WHERE i.invited_user_id = ?
           ORDER BY i.created_at DESC`
        )
        .all(userId);
      return res.status(200).json({ invitations });
    }

    if (req.method === "PATCH") {
      const invitationId = Number(req.body?.invitationId);
      const action = String(req.body?.action || "");
      if (!invitationId || Number.isNaN(invitationId)) {
        return res.status(400).json({ error: "Invitación inválida" });
      }
      if (!["accept", "reject"].includes(action)) {
        return res.status(400).json({ error: "Acción inválida" });
      }
      const invitation = db
        .prepare(
          `SELECT * FROM club_invitations
           WHERE id = ? AND invited_user_id = ?`
        )
        .get(invitationId, userId);
      if (!invitation) return res.status(404).json({ error: "Invitación no encontrada" });
      if (invitation.status !== "pending") {
        return res.status(400).json({ error: "La invitación ya fue procesada" });
      }
      const accepted = action === "accept";
      db.prepare(
        `UPDATE club_invitations
         SET status = ?, responded_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP
         WHERE id = ?`
      ).run(accepted ? "accepted" : "rejected", invitationId);

      if (accepted) {
        createOrActivateMembership(db, {
          clubId: invitation.club_id,
          userId,
          approvedByUserId: invitation.invited_by_user_id,
          role: "member",
        });
      }
      return res.status(200).json({ message: accepted ? "Invitación aceptada" : "Invitación rechazada" });
    }

    return res.status(405).json({ error: "Método no permitido" });
  });
}
