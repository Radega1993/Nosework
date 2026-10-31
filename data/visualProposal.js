/**
 * Asignaciones de foto de public/Nosework_Propuesta_Visual (IDs estables).
 * Rutas servidas desde /images/proposal/
 */

const foto = (id) => `/images/proposal/foto-${String(id).padStart(2, "0")}.jpg`;

/** @typedef {{ src: string, objectPosition?: string, alt: string }} ProposalPhoto */

/** @type {Record<string, ProposalPhoto>} */
export const PROPOSAL_PHOTOS = {
  homeHero: {
    src: foto(12),
    objectPosition: "51% 50%",
    alt: "Guía y perro trabajando juntos en una búsqueda de nosework",
  },
  homeDiscover: {
    src: foto(10),
    objectPosition: "48% 46%",
    alt: "Binomio de nosework en entrenamiento",
  },
  homeStart: {
    src: foto(7),
    objectPosition: "50% 40%",
    alt: "Perro frente a un Kong rojo durante un ejercicio de olfato",
  },
  homeCommunity: {
    src: foto(11),
    objectPosition: "50% 52%",
    alt: "Personas y perro trabajando en comunidad",
  },
  homeBanner: {
    src: foto(9),
    objectPosition: "50% 42%",
    alt: "Identidad Nosework Trial Community en entrenamiento",
  },
  noseworkHero: {
    src: foto(10),
    objectPosition: "50% 48%",
    alt: "Guía y perro en trabajo de detección deportiva",
  },
  noseworkContainers: { src: foto(28), objectPosition: "50% 51%", alt: "Perro buscando en un contenedor" },
  noseworkInterior: { src: foto(27), objectPosition: "50% 42%", alt: "Área de entrenamiento interior" },
  noseworkExterior: { src: foto(1), objectPosition: "50% 50%", alt: "Búsqueda exterior entre ladrillos" },
  noseworkVehicles: { src: foto(4), objectPosition: "50% 48%", alt: "Perro revisando un vehículo" },
  noseworkMark: { src: foto(43), objectPosition: "50% 47%", alt: "Primer plano de olfato sobre madera" },
  competitionsHero: {
    src: foto(6),
    objectPosition: "50% 49%",
    alt: "Guía, perro y observador en una jornada de práctica",
  },
  calendarHero: {
    src: foto(5),
    objectPosition: "50% 49%",
    alt: "Escena de trabajo de olfato al aire libre",
  },
  resultsHero: {
    src: foto(9),
    objectPosition: "50% 52%",
    alt: "Comunidad Nosework Trial en entrenamiento",
  },
  clubsHero: {
    src: foto(11),
    objectPosition: "50% 50%",
    alt: "Comunidad de guías y perros en colaboración",
  },
  levelsHero: {
    src: foto(8),
    objectPosition: "50% 37%",
    alt: "Perro concentrado junto a un Kong rojo",
  },
  levelsBase: { src: foto(7), objectPosition: "50% 40%", alt: "Ejercicio de nivel base con Kong" },
  levelsAdvanced: { src: foto(3), objectPosition: "50% 48%", alt: "Búsqueda avanzada en pared" },
  startHero: {
    src: foto(12),
    objectPosition: "50% 50%",
    alt: "Guía y perro en una sesión didáctica de nosework",
  },
  startMaterials: { src: foto(24), objectPosition: "50% 50%", alt: "Piezas del Kong rojo para entrenamiento" },
  startExercise: { src: foto(25), objectPosition: "50% 50%", alt: "Primer ejercicio de búsqueda en recipiente" },
  startCompanion: { src: foto(2), objectPosition: "50% 50%", alt: "Guía acompañando al perro" },
  rulesHero: {
    src: foto(9),
    objectPosition: "50% 50%",
    alt: "Identidad Nosework Trial Community",
  },
  normasHero: {
    src: foto(6),
    objectPosition: "50% 50%",
    alt: "Jornada de práctica de nosework",
  },
  contactHero: {
    src: foto(11),
    objectPosition: "50% 50%",
    alt: "Comunidad Nosework Trial",
  },
  contactSide: {
    src: foto(12),
    objectPosition: "55% 50%",
    alt: "Guía y perro en primer plano",
  },
  loginSide: {
    src: foto(10),
    objectPosition: "55% 50%",
    alt: "Guía y perro juntos",
  },
  registerSide: {
    src: foto(8),
    objectPosition: "50% 35%",
    alt: "Perro en una sesión de iniciación",
  },
};
