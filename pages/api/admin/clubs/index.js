import { authenticateToken, authorizeAdmin } from "@/middlewares/auth";
import { getDBConnection } from "@/utils/db";

export default function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ error: "Método no permitido" });
  const db = getDBConnection();
  return authenticateToken(req, res, () =>
    authorizeAdmin(req, res, () => {
      const clubs = db
        .prepare(
          `SELECT c.id, c.slug,
                  COALESCE(NULLIF(TRIM(c.display_name), ''), c.name) AS display_name,
                  c.name, c.short_description, c.status, c.created_at, c.updated_at, c.reviewed_at,
                  c.owner_user_id, COALESCE(up.display_name, u.email) AS owner_name,
                  loc.province AS primary_province
           FROM clubs c
           JOIN users u ON u.id = c.owner_user_id
           LEFT JOIN user_profiles up ON up.user_id = u.id
           LEFT JOIN club_locations loc ON loc.club_id = c.id AND loc.is_primary = 1
           ORDER BY c.created_at DESC`
        )
        .all();

      const metrics = db
        .prepare(
          `SELECT
              SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) AS pending,
              SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) AS approved,
              SUM(CASE WHEN status = 'rejected' THEN 1 ELSE 0 END) AS rejected,
              SUM(CASE WHEN status = 'archived' THEN 1 ELSE 0 END) AS archived
           FROM clubs`
        )
        .get();

      return res.status(200).json({ clubs, metrics });
    })
  );
}
