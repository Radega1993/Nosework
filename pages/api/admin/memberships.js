import { authenticateToken, authorizeAdmin } from "@/middlewares/auth";
import { getDBConnection } from "@/utils/db";

export default function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ error: "Método no permitido" });
  const db = getDBConnection();
  return authenticateToken(req, res, () =>
    authorizeAdmin(req, res, () => {
      const memberships = db
        .prepare(
          `SELECT m.id, m.club_id, m.user_id, m.role, m.status, m.joined_at,
                  c.name AS club_name,
                  COALESCE(up.display_name, u.email) AS user_name
           FROM club_memberships m
           JOIN clubs c ON c.id = m.club_id
           JOIN users u ON u.id = m.user_id
           LEFT JOIN user_profiles up ON up.user_id = u.id
           ORDER BY m.joined_at DESC
           LIMIT 300`
        )
        .all();
      const requests = db.prepare(`SELECT COUNT(*) AS pending_requests FROM club_join_requests WHERE status = 'pending'`).get();
      const invites = db.prepare(`SELECT COUNT(*) AS pending_invites FROM club_invitations WHERE status = 'pending'`).get();
      return res.status(200).json({ memberships, metrics: { ...requests, ...invites } });
    })
  );
}
