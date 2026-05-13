import { authenticateToken } from "@/middlewares/auth";
import { getDBConnection } from "@/utils/db";
import { canManageClub, getClubById } from "@/utils/clubs";
import { validateInvitation } from "@/utils/validation";

export default function handler(req, res) {
  const db = getDBConnection();
  const clubId = Number(req.query.id);
  if (!clubId || Number.isNaN(clubId)) return res.status(400).json({ error: "Club inválido" });

  return authenticateToken(req, res, () => {
    const club = getClubById(db, clubId);
    if (!club) return res.status(404).json({ error: "Club no encontrado" });
    if (!canManageClub(req.user, club)) {
      return res.status(403).json({ error: "Acceso denegado" });
    }

    if (req.method === "GET") {
      const invitations = db
        .prepare(
          `SELECT i.id, i.invited_user_id, i.invited_by_user_id, i.message, i.status, i.created_at, i.responded_at,
                  u.email, COALESCE(up.display_name, u.email) AS display_name
           FROM club_invitations i
           JOIN users u ON u.id = i.invited_user_id
           LEFT JOIN user_profiles up ON up.user_id = i.invited_user_id
           WHERE i.club_id = ?
           ORDER BY i.created_at DESC`
        )
        .all(clubId);
      return res.status(200).json({ invitations });
    }

    if (req.method === "POST") {
      const validation = validateInvitation(req.body || {});
      if (validation.error) return res.status(400).json({ error: validation.error });
      const invitedUserId = Number(validation.value.invitedUserId);
      if (invitedUserId === Number(club.owner_user_id)) {
        return res.status(400).json({ error: "El propietario ya pertenece al club" });
      }
      const activeMember = db
        .prepare(`SELECT 1 FROM club_memberships WHERE club_id = ? AND user_id = ? AND status = 'active'`)
        .get(clubId, invitedUserId);
      if (activeMember) return res.status(400).json({ error: "El usuario ya es miembro activo" });
      const pendingInvite = db
        .prepare(
          `SELECT id FROM club_invitations
           WHERE club_id = ? AND invited_user_id = ? AND status = 'pending'
           LIMIT 1`
        )
        .get(clubId, invitedUserId);
      if (pendingInvite) return res.status(409).json({ error: "Ya existe una invitación pendiente" });

      db.prepare(
        `INSERT INTO club_invitations (club_id, invited_user_id, invited_by_user_id, message, status, created_at, updated_at)
         VALUES (?, ?, ?, ?, 'pending', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`
      ).run(clubId, invitedUserId, req.user.id, validation.value.message || null);
      return res.status(201).json({ message: "Invitación enviada correctamente" });
    }

    if (req.method === "DELETE") {
      const invitationId = Number(req.query.invitationId || req.body?.invitationId);
      if (!invitationId || Number.isNaN(invitationId)) {
        return res.status(400).json({ error: "Invitación inválida" });
      }
      db.prepare(
        `UPDATE club_invitations
         SET status = 'cancelled', updated_at = CURRENT_TIMESTAMP
         WHERE id = ? AND club_id = ? AND status = 'pending'`
      ).run(invitationId, clubId);
      return res.status(200).json({ message: "Invitación cancelada" });
    }

    return res.status(405).json({ error: "Método no permitido" });
  });
}
