import { requireAuthUser, isOrganizerCapableUser } from "@/middlewares/auth";
import { geocodeClubLocation } from "@/utils/nominatimGeocode";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const user = requireAuthUser(req, res);
  if (!user) return;
  if (!isOrganizerCapableUser(user)) {
    return res.status(403).json({ error: "Acceso denegado" });
  }

  const body = req.body || {};
  const municipality = String(body.municipality || "").trim();
  const province = String(body.province || "").trim();
  const postalCode = String(body.postalCode || body.postal_code || "").trim();
  const addressLine = String(body.venueAddress || body.venue_address || "").trim() || null;

  if (!municipality) {
    return res.status(400).json({ error: "La localidad es obligatoria para geolocalizar" });
  }

  const geo = await geocodeClubLocation({
    countryCode: "ES",
    province,
    municipality,
    postalCode,
    addressLine,
  });

  if (geo.error) {
    return res.status(422).json({ error: geo.error });
  }
  return res.status(200).json({ lat: geo.lat, lon: geo.lon });
}
