import { getDBConnection } from "@/utils/db";
import { userCanOrganizeEvents } from "@/utils/userProfile";

/**
 * Puede editar/borrar un evento: staff global o dueño de club sobre eventos que él creó (organizer_user_id).
 */
export function canUserMutateEvent(db, userId, role, event) {
  if (!event) return false;
  if (role === "administrador" || role === "organizador") return true;
  if (!userCanOrganizeEvents(db, userId, role)) return false;
  return event.organizer_user_id === userId;
}
