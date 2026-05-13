/**
 * Catálogo cerrado de servicios/disciplinas para clubes (seed en service_taxonomy).
 * Códigos estables para análisis y filtros.
 */
export const CLUB_SERVICE_TAXONOMY_SEED = [
  { code: "formation_grado1", label: "Formación Grado I", category: "program", sort_order: 10 },
  { code: "exam_tracks", label: "Pistas de examen", category: "facility", sort_order: 20 },
  { code: "group_training", label: "Entrenamiento grupal", category: "program", sort_order: 30 },
  { code: "detection", label: "Detección deportiva", category: "discipline", sort_order: 40 },
  { code: "nosework_trial", label: "Nosework Trial", category: "discipline", sort_order: 50 },
  { code: "competition_prep", label: "Preparación competición", category: "program", sort_order: 60 },
  { code: "private_classes", label: "Clases particulares", category: "program", sort_order: 70 },
  { code: "puppy", label: "Cachorros", category: "program", sort_order: 80 },
  { code: "senior", label: "Perros senior", category: "program", sort_order: 90 },
  { code: "scent_work", label: "Trabajo de olfato", category: "discipline", sort_order: 100 },
];

/** Mapa código → labels para cruzar con filtros legacy del directorio */
export function taxonomyCodesToFilterTags(codes) {
  const set = new Set(codes || []);
  const tags = [];
  if (set.has("formation_grado1")) tags.push("FORMACIÓN");
  if (set.has("exam_tracks")) tags.push("PISTAS");
  if (set.has("group_training")) tags.push("ENTRENAMIENTO GRUPAL");
  if (set.has("detection") || set.has("nosework_trial") || set.has("scent_work")) tags.push("DETECCIÓN");
  if (set.has("competition_prep")) tags.push("COMPETICIÓN");
  return tags.length ? [...new Set(tags)] : [];
}
