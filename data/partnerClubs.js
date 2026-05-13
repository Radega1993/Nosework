import manifest from "./partnerClubs.manifest.json";

/**
 * Excluidos del manifiesto (no entran como club distinto): placeholders 1024×*, PDF/AI/PSD,
 * duplicados (Perry fondo negro, Trebacan PNG, escolaCanina2). `500x500.jpg` = Rock a Dog (sí incluido).
 */

/**
 * Provincia opcional para filtros del buscador (resto null = visible en "Todas las provincias").
 * Ajusta aquí cuando tengáis sede confirmada por club.
 */
const PROVINCE_BY_SLUG = {
  "can-laura": "Barcelona",
  "cinemascotas": "Madrid",
  "detec-can": "Valencia",
  "escola-canina-anoia": "Barcelona",
  "k9j-training": "Madrid",
  "moes-dogs": "Sevilla",
  "olfato-k9": "Barcelona",
  "perry-gatos": "Madrid",
  "trebacan": "Valencia",
  "zauri": "Barcelona",
};

const EXTRA_TAGS_BY_SLUG = {
  "biomarkers-k9": ["DETECCIÓN", "PISTAS"],
  "cerk-9": ["DETECCIÓN", "FORMACIÓN"],
  "detec-can": ["DETECCIÓN", "PISTAS"],
  "escola-canina-anoia": ["FORMACIÓN", "ENTRENAMIENTO GRUPAL"],
  "k9j-training": ["FORMACIÓN", "PISTAS"],
  "moes-dogs": ["ENTRENAMIENTO GRUPAL", "FORMACIÓN"],
  "natural-dog": ["FORMACIÓN", "ENTRENAMIENTO GRUPAL"],
  "nube-k9-maliland": ["COMPETICIÓN", "PISTAS"],
  "olfato-k9": ["FORMACIÓN", "PISTAS"],
  "perros-de-busqueda": ["PISTAS", "FORMACIÓN"],
  "rock-a-dog": ["FORMACIÓN", "ENTRENAMIENTO GRUPAL"],
  "scent-dogs": ["PISTAS", "DETECCIÓN"],
  "trebacan": ["COMPETICIÓN", "PISTAS"],
  "tribu": ["FORMACIÓN", "ENTRENAMIENTO GRUPAL"],
  "zauri": ["COMPETICIÓN", "PISTAS"],
};

/** @typedef {{ slug: string, name: string, sourceFile: string, province: string | null, city: string | null, tags: string[], badge: string | null, logoSrc: string }} PartnerClub */

/** @returns {PartnerClub[]} orden alfabético por nombre (locale es). */
export function getPartnerClubs() {
  const rows = manifest.clubs.map((c) => {
    const extra = EXTRA_TAGS_BY_SLUG[c.slug] || [];
    const tags = [...new Set([...(c.tags || []), ...extra])];
    return {
      ...c,
      province: PROVINCE_BY_SLUG[c.slug] ?? c.province ?? null,
      tags,
      logoSrc: `/logos/optimized/${c.slug}.webp`,
    };
  });
  return rows.sort((a, b) => a.name.localeCompare(b.name, "es", { sensitivity: "base" }));
}

export const PARTNER_CLUBS = getPartnerClubs();

export const CLUB_PROVINCE_OPTIONS = ["Madrid", "Barcelona", "Valencia", "Sevilla"];

export const CLUB_SERVICE_FILTERS = [
  { id: "formacion", label: "Formación Grado I", test: (tags) => tags.some((t) => /FORMACI/i.test(t)) },
  { id: "pistas", label: "Pistas de examen", test: (tags) => tags.some((t) => /PISTAS/i.test(t)) },
  { id: "grupal", label: "Entrenamiento grupal", test: (tags) => tags.some((t) => /GRUPAL/i.test(t)) },
];
