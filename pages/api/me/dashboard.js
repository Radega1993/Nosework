/**
 * GET /api/me/dashboard
 * Agrega perfil, clubes, perros, inscripciones, estadísticas y capacidades para el panel deportista.
 * MVP: `titles` puede venir de logros en event_results con handler_user_id; certificados PDF en fase posterior.
 */

import { authenticateToken } from "@/middlewares/auth";
import { getDBConnection } from "@/utils/db";
import { userCanOrganizeEvents } from "@/utils/userProfile";

export default function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  authenticateToken(req, res, () => {
    try {
      const db = getDBConnection();
      const userId = req.user.id;
      const role = req.user.role;

      const userRow = db
        .prepare(
          `SELECT u.id, u.email, u.role, COALESCE(u.is_judge, 0) AS is_judge
           FROM users u WHERE u.id = ?`
        )
        .get(userId);

      const profileRow = db
        .prepare(
          `SELECT p.display_name, p.public_id, p.license_number, p.license_status, p.delegation, p.avatar_url
           FROM user_profiles p WHERE p.user_id = ?`
        )
        .get(userId);

      const profile = {
        email: userRow.email,
        displayName: profileRow?.display_name || userRow.email.split("@")[0],
        publicId: profileRow?.public_id || `NTC-${userId}`,
        licenseNumber: profileRow?.license_number || null,
        licenseStatus: profileRow?.license_status || null,
        delegation: profileRow?.delegation || null,
        avatarUrl: profileRow?.avatar_url || null,
        role: userRow.role,
        isJudge: Boolean(userRow.is_judge),
      };

      const ownedClubs = db
        .prepare(
          `SELECT id, COALESCE(NULLIF(TRIM(display_name), ''), name) AS name, status, slug, created_at
           FROM clubs WHERE owner_user_id = ? ORDER BY name COLLATE NOCASE`
        )
        .all(userId);

      const memberClubs = db
        .prepare(
          `SELECT c.id, c.name, c.created_at
           FROM clubs c
           INNER JOIN club_memberships m ON m.club_id = c.id AND m.user_id = ? AND m.status = 'active'
           ORDER BY c.name`
        )
        .all(userId);

      const ownerPendingRequests = db
        .prepare(
          `SELECT r.id, r.club_id, c.name AS club_name, r.user_id, r.status, r.created_at,
                  COALESCE(up.display_name, u.email) AS user_name
           FROM club_join_requests r
           JOIN clubs c ON c.id = r.club_id
           JOIN users u ON u.id = r.user_id
           LEFT JOIN user_profiles up ON up.user_id = r.user_id
           WHERE c.owner_user_id = ? AND r.status = 'pending'
           ORDER BY r.created_at DESC
           LIMIT 10`
        )
        .all(userId);

      const myPendingInvitations = db
        .prepare(
          `SELECT i.id, i.club_id, c.name AS club_name, i.status, i.created_at
           FROM club_invitations i
           JOIN clubs c ON c.id = i.club_id
           WHERE i.invited_user_id = ? AND i.status = 'pending'
           ORDER BY i.created_at DESC
           LIMIT 10`
        )
        .all(userId);

      const myPendingJoinRequests = db
        .prepare(
          `SELECT r.id, r.club_id, c.name AS club_name, r.status, r.created_at
           FROM club_join_requests r
           JOIN clubs c ON c.id = r.club_id
           WHERE r.user_id = ? AND r.status = 'pending'
           ORDER BY r.created_at DESC
           LIMIT 10`
        )
        .all(userId);

      const dogs = db
        .prepare(
          `SELECT id, name, breed, birth_year, grade_label, photo_url
           FROM dogs WHERE handler_user_id = ? ORDER BY name`
        )
        .all(userId);

      const upcoming = db
        .prepare(
          `SELECT er.id, er.status, er.created_at,
                  e.id AS eventId, e.date AS eventDate, e.title AS eventTitle, e.description AS eventDescription,
                  d.name AS dogName, d.id AS dogId
           FROM event_registrations er
           JOIN events e ON e.id = er.event_id
           LEFT JOIN dogs d ON d.id = er.dog_id
           WHERE er.user_id = ? AND e.date >= date('now')
           ORDER BY e.date ASC
           LIMIT 15`
        )
        .all(userId);

      const statsRow = db
        .prepare(
          `SELECT COALESCE(SUM(points), 0) AS totalPoints,
                  COUNT(*) AS resultsCount,
                  COUNT(DISTINCT event_id) AS competitionsCount
           FROM event_results WHERE handler_user_id = ?`
        )
        .get(userId);

      const titles = db
        .prepare(
          `SELECT er.title AS name, er.dog_name AS dogName, COALESCE(er.trial_date, '') AS date
           FROM event_results er
           WHERE er.handler_user_id = ? AND er.title IS NOT NULL AND TRIM(er.title) != ''
           ORDER BY (er.trial_date IS NULL), er.trial_date DESC
           LIMIT 25`
        )
        .all(userId);

      const canOrganizeEvents = userCanOrganizeEvents(db, userId, role);
      const isAdmin = role === "administrador";

      return res.status(200).json({
        profile,
        ownedClubs,
        memberClubs,
        dogs,
        upcoming,
        stats: {
          totalPoints: statsRow?.totalPoints ?? 0,
          resultsCount: statsRow?.resultsCount ?? 0,
          competitionsCount: statsRow?.competitionsCount ?? 0,
        },
        titles,
        capabilities: {
          canOrganizeEvents,
          isAdmin,
        },
        workflows: {
          ownerPendingRequests,
          myPendingInvitations,
          myPendingJoinRequests,
        },
      });
    } catch (error) {
      console.error("Error in /api/me/dashboard:", error);
      return res.status(500).json({
        error: "Error interno del servidor",
        message: "No se pudo cargar el panel.",
      });
    }
  });
}
