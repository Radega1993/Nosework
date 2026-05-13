import jwt from "jsonwebtoken";
import { authenticateToken } from "@/middlewares/auth";
import { getDBConnection } from "@/utils/db";
import { isTokenBlacklisted } from "@/utils/tokenBlacklist";
import { validateClubCreate } from "@/utils/validation";
import { canManageClub, canViewClub, getClubById, isAdmin, CLUB_STATUS } from "@/utils/clubs";
import {
  allocateUniqueSlug,
  upsertClubCore,
  replacePrimaryLocation,
  replaceClubServiceTags,
  resolveTaxonomyIdsByCodes,
  getClubDetailPayload,
} from "@/utils/clubDirectory";
import { mapValidatedToClubCore, mapValidatedToLocation } from "@/utils/clubPayload";
import { geocodeClubLocation } from "@/utils/nominatimGeocode";

function getOptionalUser(req) {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token || isTokenBlacklisted(token)) return null;
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
}

function stripPrivateFields(detail, user) {
  if (!detail) return null;
  const copy = { ...detail };
  if (!user || !isAdmin(user)) {
    delete copy.internal_notes;
  }
  return copy;
}

export default function handler(req, res) {
  const db = getDBConnection();
  const clubId = Number(req.query.id);
  if (!clubId || Number.isNaN(clubId)) {
    return res.status(400).json({ error: "ID de club inválido" });
  }

  if (req.method === "GET") {
    const club = getClubById(db, clubId);
    if (!club) return res.status(404).json({ error: "Club no encontrado" });
    const user = getOptionalUser(req);
    if (user) {
      if (!canViewClub(user, club)) {
        return res.status(403).json({ error: "Acceso denegado" });
      }
    } else if (club.status !== CLUB_STATUS.APPROVED || !club.accepts_public_listing) {
      return res.status(404).json({ error: "Club no encontrado" });
    }
    const detail = getClubDetailPayload(db, clubId);
    return res.status(200).json({ club: stripPrivateFields(detail, user) });
  }

  if (req.method === "PUT") {
    return authenticateToken(req, res, () => {
      const club = getClubById(db, clubId);
      if (!club) return res.status(404).json({ error: "Club no encontrado" });
      if (!canManageClub(req.user, club)) {
        return res.status(403).json({ error: "Acceso denegado" });
      }
      const validation = validateClubCreate(req.body || {});
      if (validation.error) return res.status(400).json({ error: validation.error });
      const v = validation.value;
      const slugNorm = allocateUniqueSlug(db, v.name, clubId);
      const taxonomyIds = resolveTaxonomyIdsByCodes(db, v.serviceCodes);
      if (taxonomyIds == null) {
        return res.status(400).json({ error: "Hay códigos de servicio no válidos" });
      }

      const core = mapValidatedToClubCore(v, slugNorm);

      let internalNotes = club.internal_notes ?? null;
      if (isAdmin(req.user) && req.body && Object.prototype.hasOwnProperty.call(req.body, "internalNotes")) {
        internalNotes = String(req.body.internalNotes ?? "").trim().slice(0, 2000) || null;
      }

      void (async () => {
        const geo = await geocodeClubLocation(v.location);
        if (geo.error) {
          return res.status(422).json({ error: geo.error });
        }
        const loc = mapValidatedToLocation(v, { lat: geo.lat, lon: geo.lon });

        try {
          const tx = db.transaction(() => {
            upsertClubCore(db, { ...core, internalNotes }, { ownerUserId: req.user.id, clubId, status: club.status });
            replacePrimaryLocation(db, clubId, loc);
            replaceClubServiceTags(db, clubId, taxonomyIds);
          });
          tx();
          const detail = getClubDetailPayload(db, clubId);
          return res.status(200).json({
            message: "Club actualizado correctamente",
            club: stripPrivateFields(detail, req.user),
          });
        } catch (e) {
          console.error("PUT /api/clubs/[id]:", e);
          return res.status(500).json({ error: "No se pudo actualizar el club" });
        }
      })();
    });
  }

  if (req.method === "DELETE") {
    return authenticateToken(req, res, () => {
      const club = getClubById(db, clubId);
      if (!club) return res.status(404).json({ error: "Club no encontrado" });
      if (!canManageClub(req.user, club)) {
        return res.status(403).json({ error: "Acceso denegado" });
      }
      db.prepare(`UPDATE clubs SET status = 'archived', updated_at = CURRENT_TIMESTAMP WHERE id = ?`).run(clubId);
      return res.status(200).json({ message: "Club archivado correctamente" });
    });
  }

  return res.status(405).json({ error: "Método no permitido" });
}
