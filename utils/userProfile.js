import { getDBConnection } from "@/utils/db";

/**
 * Crea fila en user_profiles tras registrar un usuario (display_name desde email, public_id estable).
 */
export function createUserProfileForUser(db, userId, email) {
  const local = String(email).split("@")[0] || "Usuario";
  const displayName = local.charAt(0).toUpperCase() + local.slice(1);
  const publicId = `NTC-${userId}`;
  db.prepare(
    `INSERT INTO user_profiles (user_id, display_name, public_id, license_number, license_status)
     VALUES (?, ?, ?, NULL, NULL)`
  ).run(userId, displayName, publicId);
}

export function userCanOrganizeEvents(db, userId, role) {
  if (role === "organizador" || role === "administrador") return true;
  const row = db.prepare("SELECT 1 AS ok FROM clubs WHERE owner_user_id = ? LIMIT 1").get(userId);
  return Boolean(row);
}
