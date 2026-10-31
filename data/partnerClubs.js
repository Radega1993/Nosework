import manifest from "./partnerClubs.manifest.json";
import enrichmentFile from "./partnerClubsEnrichment.json";

/**
 * Fuentes en public/logos + WebP en public/logos/optimized/{slug}.webp.
 * Datos de ficha / mapa: data/partnerClubsEnrichment.json (investigación 2026-10-31).
 */

/** Tags de servicio legacy cuando la investigación no aporta servicios. */
const FALLBACK_TAGS_BY_SLUG = {
  "biomarkers-k9": ["DETECCIÓN", "FORMACIÓN"],
  "cerk-9": ["DETECCIÓN", "FORMACIÓN"],
  "detec-can": ["DETECCIÓN", "PISTAS"],
  "escola-canina-anoia": ["FORMACIÓN", "ENTRENAMIENTO GRUPAL"],
  "k9j-training": ["FORMACIÓN", "PISTAS"],
  "moes-dogs": ["ENTRENAMIENTO GRUPAL", "FORMACIÓN"],
  "natural-dog": ["FORMACIÓN", "ENTRENAMIENTO GRUPAL"],
  "nube-k9-maliland": ["COMPETICIÓN", "PISTAS"],
  "olfato-k9": ["FORMACIÓN", "DETECCIÓN"],
  "perros-de-busqueda": ["FORMACIÓN", "DETECCIÓN"],
  "rock-a-dog": ["FORMACIÓN", "ENTRENAMIENTO GRUPAL", "DETECCIÓN", "COMPETICIÓN"],
  "scent-dogs": ["PISTAS", "DETECCIÓN"],
  "trebacan": ["DETECCIÓN", "ENTRENAMIENTO GRUPAL", "FORMACIÓN"],
  "tribu": ["FORMACIÓN", "ENTRENAMIENTO GRUPAL"],
  "zauri": ["COMPETICIÓN", "PISTAS"],
  "codo-con-pata": ["DETECCIÓN", "ENTRENAMIENTO GRUPAL", "FORMACIÓN"],
  "mooican": ["DETECCIÓN", "FORMACIÓN", "ENTRENAMIENTO GRUPAL"],
  "perry-gatos": ["DETECCIÓN", "ENTRENAMIENTO GRUPAL", "FORMACIÓN"],
  "isaylos-dogs": ["FORMACIÓN", "DETECCIÓN"],
  "can-laura": ["DETECCIÓN"],
};

/**
 * Bbox península (aprox.) → % para pines en el mapa decorativo.
 * lat 36–43.9, lng -9.5–4.5
 */
export function spainLatLngToPercent(lat, lng) {
  if (lat == null || lng == null) return null;
  const left = ((lng - -9.5) / (4.5 - -9.5)) * 100;
  const top = ((43.9 - lat) / (43.9 - 36.0)) * 100;
  return {
    left: Math.min(96, Math.max(4, left)),
    top: Math.min(92, Math.max(8, top)),
  };
}

/** @returns {Array<Record<string, unknown>>} */
export function getPartnerClubs() {
  const enrichment = enrichmentFile.clubs || {};

  const rows = manifest.clubs.map((c) => {
    const e = enrichment[c.slug] || {};
    const researchTags = e.tagsFromResearch || [];
    const fallback = FALLBACK_TAGS_BY_SLUG[c.slug] || [];
    const baseTags = (c.tags || []).filter((t) => t !== "Colaborador");
    const tags = [...new Set([...researchTags, ...(researchTags.length ? [] : fallback), ...baseTags])];

    const lat = e.lat ?? null;
    const lng = e.lng ?? null;
    const pos = spainLatLngToPercent(lat, lng);

    return {
      ...c,
      province: e.province ?? c.province ?? null,
      city: e.city ?? c.city ?? null,
      address: e.address || null,
      phone: e.phone || null,
      email: e.email || null,
      website: e.website || null,
      shortDescription: e.shortDescription || null,
      researchStatus: e.researchStatus || null,
      mapStatus: e.mapStatus || null,
      needsReview: Boolean(e.needsReview),
      locationNote: e.locationNote || null,
      tags,
      badge: c.badge || "Club participante",
      logoSrc: `/logos/optimized/${c.slug}.webp`,
      lat,
      lng,
      mapProvisional: Boolean(e.mapProvisional),
      mapLeft: pos?.left ?? null,
      mapTop: pos?.top ?? null,
    };
  });

  return rows.sort((a, b) => a.name.localeCompare(b.name, "es", { sensitivity: "base" }));
}

export const PARTNER_CLUBS = getPartnerClubs();

export const CLUB_PROVINCE_OPTIONS = [
  "Álava",
  "Barcelona",
  "Bizkaia",
  "La Rioja",
  "Lleida",
  "Madrid",
  "Segovia",
  "Sevilla",
  "Valencia",
];

export const CLUB_SERVICE_FILTERS = [
  { id: "formacion", label: "Formación Grado I", test: (tags) => tags.some((t) => /FORMACI/i.test(t)) },
  { id: "pistas", label: "Pistas de examen", test: (tags) => tags.some((t) => /PISTAS/i.test(t)) },
  { id: "grupal", label: "Entrenamiento grupal", test: (tags) => tags.some((t) => /GRUPAL/i.test(t)) },
  { id: "deteccion", label: "Detección", test: (tags) => tags.some((t) => /DETECCI/i.test(t)) },
];
