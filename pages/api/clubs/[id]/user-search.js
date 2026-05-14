import { requireAuthUser } from "@/middlewares/auth";
import { getDBConnection } from "@/utils/db";
import { getClubById, canManageClub, isAdmin } from "@/utils/clubs";

function canSearchClubUsers(user, club) {
  if (!user || !club) return false;
  if (isAdmin(user) || user.role === "organizador") return true;
  return canManageClub(user, club);
}

export default function handler(req, res) {
  const db = getDBConnection();
  const clubId = Number(req.query.id);
  if (!clubId || Number.isNaN(clubId)) {
    return res.status(400).json({ error: "Club inválido" });
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const user = requireAuthUser(req, res);
  if (!user) return;

  const club = getClubById(db, clubId);
  if (!club) {
    return res.status(404).json({ error: "Club no encontrado" });
  }
  if (!canSearchClubUsers(user, club)) {
    return res.status(403).json({ error: "Acceso denegado" });
  }

  const q = String(req.query.q || "")
    .trim()
    .slice(0, 80);
  if (q.length < 2) {
    return res.status(400).json({ error: "Escribe al menos 2 caracteres para buscar" });
  }

  const like = `%${q.toLowerCase()}%`;
  const rows = db
    .prepare(
      `SELECT u.id,
              COALESCE(up.display_name, u.email) AS display_name,
              up.public_id AS public_id,
              COALESCE(u.is_judge, 0) AS is_judge
       FROM users u
       LEFT JOIN user_profiles up ON up.user_id = u.id
       WHERE LOWER(COALESCE(up.display_name, u.email)) LIKE ?
          OR LOWER(COALESCE(up.public_id, '')) LIKE ?
          OR LOWER(u.email) LIKE ?
       ORDER BY display_name COLLATE NOCASE
       LIMIT 20`
    )
    .all(like, like, like);

  return res.status(200).json({ users: rows });
}
