import { authenticateToken } from "@/middlewares/auth";
import { getDBConnection } from "@/utils/db";
import { canManageClub, getClubById } from "@/utils/clubs";

export default function handler(req, res) {
  const db = getDBConnection();
  const clubId = Number(req.query.id);
  const memberUserId = Number(req.query.userId || req.body?.userId);
  if (!clubId || Number.isNaN(clubId)) {
    return res.status(400).json({ error: "Club inválido" });
  }

  return authenticateToken(req, res, () => {
    const club = getClubById(db, clubId);
    if (!club) return res.status(404).json({ error: "Club no encontrado" });
    if (!canManageClub(req.user, club)) {
      return res.status(403).json({ error: "Acceso denegado" });
    }

    if (req.method === "GET") {
      const members = db
        .prepare(
          `SELECT m.user_id, m.role, m.status, m.joined_at,
                  u.email, COALESCE(up.display_name, u.email) AS display_name
           FROM club_memberships m
           JOIN users u ON u.id = m.user_id
           LEFT JOIN user_profiles up ON up.user_id = u.id
           WHERE m.club_id = ? AND m.status = 'active'
           ORDER BY display_name`
        )
        .all(clubId);
      return res.status(200).json({ members });
    }

    if (req.method === "DELETE") {
      if (!memberUserId || Number.isNaN(memberUserId)) {
        return res.status(400).json({ error: "Miembro inválido" });
      }
      if (memberUserId === Number(club.owner_user_id)) {
        return res.status(400).json({ error: "No puedes eliminar al propietario del club" });
      }
      db.prepare(
        `UPDATE club_memberships
         SET status = 'inactive', updated_at = CURRENT_TIMESTAMP
         WHERE club_id = ? AND user_id = ?`
      ).run(clubId, memberUserId);
      return res.status(200).json({ message: "Miembro eliminado correctamente" });
    }

    return res.status(405).json({ error: "Método no permitido" });
  });
}
