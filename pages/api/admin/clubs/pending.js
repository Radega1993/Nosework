import { authenticateToken, authorizeAdmin } from "@/middlewares/auth";
import { getDBConnection } from "@/utils/db";

export default function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ error: "Método no permitido" });
  const db = getDBConnection();
  return authenticateToken(req, res, () =>
    authorizeAdmin(req, res, () => {
      const pending = db
        .prepare(
          `SELECT c.id, c.name, c.created_at, c.owner_user_id,
                  COALESCE(up.display_name, u.email) AS owner_name, u.email AS owner_email
           FROM clubs c
           JOIN users u ON u.id = c.owner_user_id
           LEFT JOIN user_profiles up ON up.user_id = u.id
           WHERE c.status = 'pending'
           ORDER BY c.created_at ASC`
        )
        .all();
      return res.status(200).json({ pending });
    })
  );
}
