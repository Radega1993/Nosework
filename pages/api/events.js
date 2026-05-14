import { requireAuthUser, isOrganizerCapableUser, getOptionalUser } from "@/middlewares/auth";
import { getDBConnection } from "@/utils/db";
import { listEventsVisibleToViewer } from "@/utils/eventVisibility";
import { validateAndNormalizeFullEvent } from "@/utils/eventBody";
import { geocodeClubLocation } from "@/utils/nominatimGeocode";
import { replaceEventJudges } from "@/utils/eventJudges";

function mapEventRow(row) {
  const { club_status: _cs, ...rest } = row;
  return rest;
}

export default async function handler(req, res) {
  const db = getDBConnection();

  if (req.method === "GET") {
    const user = getOptionalUser(req);
    const viewer =
      user?.id != null ? { userId: user.id, role: user.role || "user" } : { userId: undefined };
    const rows = listEventsVisibleToViewer(db, viewer);
    return res.status(200).json({ events: rows.map(mapEventRow) });
  }

  if (req.method === "POST") {
    const user = requireAuthUser(req, res);
    if (!user) return;
    if (!isOrganizerCapableUser(user)) {
      return res.status(403).json({ error: "Acceso denegado" });
    }

    const v = validateAndNormalizeFullEvent(db, user, req.body || {});
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

    const uid = user.id;
    const insert = db
      .prepare(
        `INSERT INTO events (
          date, title, description, organizer_user_id, club_id, audience, kind,
          municipality, province, postal_code, venue_address, price_euros, meal_price_euros,
          levels_json, schedule_details, registration_phone, judge_organizer_name, latitude, longitude
        ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
      )
      .run(
        v.date,
        v.title,
        v.description,
        uid,
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
        geo.lon
      );

    const newId = Number(insert.lastInsertRowid);
    replaceEventJudges(db, newId, v.judgeUserIds);

    return res.status(201).json({ message: "Evento creado con éxito", eventId: newId });
  }

  return res.status(405).json({ message: "Método no permitido" });
}
