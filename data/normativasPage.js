/**
 * Contenido de la página Normativas (FDDN).
 * Changelog: rellena `NORMATIVAS_CHANGELOG` cuando haya fechas oficiales; si está vacío, la UI muestra un mensaje.
 */

export const NORMATIVAS_HERO = {
  title: "Reglamento y normativa",
  subtitle:
    "Reglas y criterios de evaluación de Nosework Trial Community. Documentos descargables y respuestas a las dudas más habituales.",
};

export const NORMATIVAS_FEATURED = {
  badge: "Versión vigente",
  title: "Documentos oficiales",
  description:
    "Normativa para participantes y guía para organizadores. Para el texto completo del reglamento (niveles, áreas, puntuación, código ético) usa la lectura en línea.",
};

/** PDFs públicos (mismas rutas que la página anterior). */
export const NORMATIVAS_DOCUMENTS = [
  {
    id: "participantes",
    title: "Normativas para participantes",
    meta: "PDF · descarga",
    href: "/documents/normativas_participantes.pdf",
    download: true,
    icon: "description",
  },
  {
    id: "organizadores",
    title: "Guía para organizadores",
    meta: "PDF · descarga",
    href: "/documents/normativas_organizadores.pdf",
    download: true,
    icon: "verified",
  },
];

/** @type {{ date: string, article: string, summary: string }[]} */
export const NORMATIVAS_CHANGELOG = [];

export const NORMATIVAS_PRINCIPLES_TITLE = "Conoce las normativas";

export const NORMATIVAS_PRINCIPLES_INTRO =
  "Conoce las reglas y criterios de evaluación que garantizan la transparencia y la equidad en nuestros eventos.";

export const NORMATIVAS_PRINCIPLES = [
  "Todos los participantes deben cumplir con las normativas específicas del evento.",
  "Los perros deben estar siempre bajo el control de su guía.",
  "El respeto entre guías, jueces y organizadores es obligatorio.",
  "Los criterios de evaluación se basan en precisión, tiempo y comportamiento del perro.",
];

export const NORMATIVAS_FAQ_TITLE = "Preguntas frecuentes";

export const NORMATIVAS_FAQ = [
  {
    id: "criterios",
    question: "¿Qué pasa si mi perro no cumple con los criterios?",
    answer:
      "Si tu perro no cumple con los criterios de un evento específico, puedes optar por inscribirlo en otra categoría o recibir asesoramiento.",
  },
  {
    id: "cancelar",
    question: "¿Qué sucede si no puedo asistir después de registrarme?",
    answer: "Puedes cancelar tu inscripción con un aviso previo de 72 horas. Revisa nuestras políticas para más detalles.",
  },
];

export const NORMATIVAS_CHANGELOG_EMPTY_MESSAGE =
  "Aún no publicamos un historial de cambios aquí. Las actualizaciones relevantes se comunicarán por los canales oficiales.";
