import { authenticateToken, authorizeAdmin } from "@/middlewares/auth";
import { getDBConnection } from "@/utils/db";

export default function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ error: "Método no permitido" });
  const db = getDBConnection();
  return authenticateToken(req, res, () =>
    authorizeAdmin(req, res, () => {
      const users = db
        .prepare(
          `SELECT u.id, u.email, u.role, COALESCE(u.is_judge, 0) AS is_judge,
                  COALESCE(up.display_name, u.email) AS display_name,
                  (SELECT COUNT(*) FROM clubs c WHERE c.owner_user_id = u.id) AS owned_clubs,
                  (SELECT COUNT(*) FROM club_memberships m WHERE m.user_id = u.id AND m.status = 'active') AS active_memberships
           FROM users u
           LEFT JOIN user_profiles up ON up.user_id = u.id
           ORDER BY u.id DESC`
        )
        .all();
      return res.status(200).json({ users });
    })
  );
}
