import { authenticateToken, getOptionalUser } from "@/middlewares/auth";
import { getDBConnection } from "@/utils/db";
import { validateClubCreate } from "@/utils/validation";
import { CLUB_STATUS } from "@/utils/clubs";
import {
  allocateUniqueSlug,
  upsertClubCore,
  replacePrimaryLocation,
  replaceClubServiceTags,
  resolveTaxonomyIdsByCodes,
} from "@/utils/clubDirectory";
import { mapValidatedToClubCore, mapValidatedToLocation } from "@/utils/clubPayload";
import { geocodeClubLocation } from "@/utils/nominatimGeocode";

const listSql = `
  SELECT c.id, c.slug, c.name,
    COALESCE(NULLIF(TRIM(c.display_name), ''), c.name) AS display_name,
    c.status, c.logo_url, c.created_at, c.updated_at, c.owner_user_id,
    c.accepts_public_listing, c.short_description,
    MAX(loc.province) AS province,
    MAX(loc.municipality) AS municipality,
    GROUP_CONCAT(t.label, '|') AS service_labels,
    GROUP_CONCAT(t.code, '|') AS service_codes
  FROM clubs c
  LEFT JOIN club_locations loc ON loc.club_id = c.id AND loc.is_primary = 1
  LEFT JOIN club_service_tags cst ON cst.club_id = c.id
  LEFT JOIN service_taxonomy t ON t.id = cst.taxonomy_id
`;

const listGroupBy = ` GROUP BY c.id ORDER BY display_name COLLATE NOCASE`;

function mapListRow(row) {
  return {
    ...row,
    service_labels: row.service_labels ? row.service_labels.split("|").filter(Boolean) : [],
    service_codes: row.service_codes ? row.service_codes.split("|").filter(Boolean) : [],
  };
}

export default function handler(req, res) {
  const db = getDBConnection();

  if (req.method === "GET") {
    const user = getOptionalUser(req);
    let rows;
    if (!user) {
      rows = db
        .prepare(`${listSql} WHERE c.status = ? AND c.accepts_public_listing = 1 ${listGroupBy}`)
        .all(CLUB_STATUS.APPROVED);
    } else if (user.role === "administrador") {
      rows = db.prepare(`${listSql} WHERE 1 = 1 ${listGroupBy}`).all();
    } else {
      rows = db
        .prepare(
          `${listSql} WHERE (c.status = ? AND c.accepts_public_listing = 1) OR c.owner_user_id = ? ${listGroupBy}`
        )
        .all(CLUB_STATUS.APPROVED, user.id);
    }
    return res.status(200).json({ clubs: rows.map(mapListRow) });
  }

  if (req.method === "POST") {
    return authenticateToken(req, res, () => {
      const validation = validateClubCreate(req.body || {});
      if (validation.error) {
        return res.status(400).json({ error: validation.error });
      }
      const v = validation.value;
      const slugNorm = allocateUniqueSlug(db, v.name, null);
      const taxonomyIds = resolveTaxonomyIdsByCodes(db, v.serviceCodes);
      if (taxonomyIds == null) {
        return res.status(400).json({ error: "Hay códigos de servicio no válidos" });
      }

      const core = mapValidatedToClubCore(v, slugNorm);

      void (async () => {
        const geo = await geocodeClubLocation(v.location);
        if (geo.error) {
          return res.status(422).json({ error: geo.error });
        }
        const loc = mapValidatedToLocation(v, { lat: geo.lat, lon: geo.lon });

        try {
          const tx = db.transaction(() => {
            const newId = upsertClubCore(db, core, {
              ownerUserId: req.user.id,
              clubId: null,
              status: CLUB_STATUS.PENDING,
            });
            replacePrimaryLocation(db, newId, loc);
            replaceClubServiceTags(db, newId, taxonomyIds);
            return newId;
          });
          const newId = tx();
          const club = db.prepare(`SELECT * FROM clubs WHERE id = ?`).get(newId);
          return res.status(201).json({ message: "Club creado y enviado a revisión", club });
        } catch (e) {
          console.error("POST /api/clubs:", e);
          return res.status(500).json({ error: "No se pudo crear el club" });
        }
      })();
    });
  }

  return res.status(405).json({ error: "Método no permitido" });
}
