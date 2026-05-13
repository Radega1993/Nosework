export const CLUB_STATUS = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
  ARCHIVED: "archived",
};

export function isAdmin(user) {
  return user?.role === "administrador";
}

export function getClubById(db, clubId) {
  return db
    .prepare(
      `SELECT c.*,
              up.display_name AS owner_name, u.email AS owner_email
       FROM clubs c
       JOIN users u ON u.id = c.owner_user_id
       LEFT JOIN user_profiles up ON up.user_id = c.owner_user_id
       WHERE c.id = ?`
    )
    .get(clubId);
}

export function canViewClub(user, club) {
  if (!club) return false;
  if (club.status === CLUB_STATUS.APPROVED) return true;
  if (!user) return false;
  return isAdmin(user) || Number(club.owner_user_id) === Number(user.id);
}

export function canManageClub(user, club) {
  if (!user || !club) return false;
  return isAdmin(user) || Number(club.owner_user_id) === Number(user.id);
}

export function createOrActivateMembership(db, { clubId, userId, approvedByUserId, role = "member" }) {
  db.prepare(
    `INSERT INTO club_memberships (club_id, user_id, role, status, approved_by_user_id, joined_at, updated_at)
     VALUES (?, ?, ?, 'active', ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
     ON CONFLICT(club_id, user_id) DO UPDATE SET
       role = excluded.role,
       status = 'active',
       approved_by_user_id = excluded.approved_by_user_id,
       updated_at = CURRENT_TIMESTAMP`
  ).run(clubId, userId, role, approvedByUserId || null);
}
