import { getDBConnection } from "@/utils/db";
import { requireAuthUser, authenticateToken, getOptionalUser } from "@/middlewares/auth";
import { canUserMutateEvent } from "@/utils/eventAuth";
import { canUserViewEvent } from "@/utils/eventVisibility";
import { validateAndNormalizeFullEvent } from "@/utils/eventBody";
import { geocodeClubLocation } from "@/utils/nominatimGeocode";
import { replaceEventJudges, listJudgesForEvent } from "@/utils/eventJudges";
import { isEventDateBeforeToday } from "@/utils/eventDates";

function loadEventWithClub(db, id) {
  return db
    .prepare(
      `SELECT e.*, c.status AS club_status
       FROM events e
       LEFT JOIN clubs c ON c.id = e.club_id
       WHERE e.id = ?`
    )
    .get(id);
}

function mapEventRow(row) {
  if (!row) return null;
  const { club_status: _cs, ...rest } = row;
  return rest;
}

export default async function handler(req, res) {
  const db = getDBConnection();
  const { id } = req.query;

  if (req.method === "GET") {
    if (!id) {
      return res.status(400).json({ error: "Falta el ID del evento" });
    }
    const row = loadEventWithClub(db, id);
    if (!row) {
      return res.status(404).json({ error: "Evento no encontrado" });
    }
    const user = getOptionalUser(req);
    const u = user?.id != null ? { id: user.id, role: user.role || "user" } : null;
    if (!canUserViewEvent(db, u, row)) {
      return res.status(404).json({ error: "Evento no encontrado" });
    }
    const mapped = mapEventRow(row);
    mapped.judges = listJudgesForEvent(db, Number(id));
    if (u?.id != null) {
      const reg = db
        .prepare(`SELECT id, status FROM event_registrations WHERE event_id = ? AND user_id = ?`)
        .get(Number(id), u.id);
      mapped.my_registration = reg ? { id: reg.id, status: reg.status } : null;
    } else {
      mapped.my_registration = null;
    }
    mapped.can_manage_registrations = Boolean(u && canUserMutateEvent(db, u.id, u.role, row));
    mapped.is_past = isEventDateBeforeToday(mapped.date);
    return res.status(200).json({ event: mapped });
  }

  if (req.method === "PUT") {
    const user = requireAuthUser(req, res);
    if (!user) return;

    if (!id) {
      return res.status(400).json({ error: "Falta el ID del evento" });
    }

    const event = loadEventWithClub(db, id);
    if (!event) {
      return res.status(404).json({ error: "Evento no encontrado" });
    }
    if (!canUserMutateEvent(db, user.id, user.role, event)) {
      return res.status(403).json({ error: "Acceso denegado" });
    }

    const v = validateAndNormalizeFullEvent(db, user, { ...req.body, id });
    if (v.error) {
      return res.status(400).json({ error: v.error });
    }

    const geo = await geocodeClubLocation({
      countryCode: "ES",
      province: v.province || "",
      municipality: v.municipality,
      postalCode: v.postal_code || "",
      addressLine: v.venue_address,
    });
    if (geo.error) {
      return res.status(422).json({ error: geo.error });
    }

    const result = db
      .prepare(
        `UPDATE events SET date = ?, title = ?, description = ?, club_id = ?, audience = ?, kind = ?,
         municipality = ?, province = ?, postal_code = ?, venue_address = ?, price_euros = ?, meal_price_euros = ?,
         levels_json = ?, schedule_details = ?, registration_phone = ?, judge_organizer_name = ?,
         latitude = ?, longitude = ?
         WHERE id = ?`
      )
      .run(
        v.date,
        v.title,
        v.description,
        v.clubId,
        v.audience,
        v.kind,
        v.municipality,
        v.province,
        v.postal_code,
        v.venue_address,
        v.price_euros,
        v.meal_price_euros,
        v.levels_json,
        v.schedule_details,
        v.registration_phone,
        null,
        geo.lat,
        geo.lon,
        id
      );

    if (result.changes === 0) {
      return res.status(404).json({ error: "Evento no encontrado" });
    }

    replaceEventJudges(db, Number(id), v.judgeUserIds);

    return res.status(200).json({ message: "Evento actualizado con éxito" });
  }

  if (req.method === "DELETE") {
    return authenticateToken(req, res, () => {
      if (!id) {
        return res.status(400).json({ error: "Falta el ID del evento" });
      }

      const event = db.prepare("SELECT * FROM events WHERE id = ?").get(id);
      if (!event) {
        return res.status(404).json({ error: "Evento no encontrado" });
      }
      if (!canUserMutateEvent(db, req.user.id, req.user.role, event)) {
        return res.status(403).json({ error: "Acceso denegado" });
      }

      const result = db.prepare("DELETE FROM events WHERE id = ?").run(id);

      if (result.changes === 0) {
        return res.status(404).json({ error: "Evento no encontrado" });
      }

      return res.status(200).json({ message: "Evento eliminado con éxito" });
    });
  }

  return res.status(405).json({ message: "Método no permitido" });
}
