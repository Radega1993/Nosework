/**
 * Contenido de la página Niveles y títulos (FDDN).
 * Ajusta textos aquí; la maquetación vive en components/niveles/.
 */

export const NIVELES_HERO = {
  eyebrow: "Normativa oficial",
  title: "Niveles, títulos y progresión",
  description:
    "Descubre la trayectoria competitiva: desde el reconocimiento de olor (ORT) hasta la alta competición. Cada etapa evalúa precisión, vínculo guía-perro y técnica de detección.",
  statValue: "98%",
  statLabel: "Tasa de precisión en nivel élite (referencia formativa)",
};

/** Pasos del carril horizontal “Camino a la Excelencia”. */
export const NIVELES_TIMELINE_STEPS = [
  { id: "ort", title: "ORT", subtitle: "Puerta de entrada", node: "icon", icon: "verified" },
  { id: "l1", title: "Nivel 1", subtitle: "Iniciación técnica", node: "label", label: "L1" },
  { id: "l2", title: "Nivel 2", subtitle: "Avanzado intermedio", node: "label", label: "L2" },
  { id: "l3", title: "Nivel 3", subtitle: "Expertos", node: "label", label: "L3" },
  { id: "elite", title: "Élite", subtitle: "Maestría", node: "star" },
  { id: "nacional", title: "Nacional", subtitle: "Alta competición", node: "trophy" },
];

/** Tabla comparativa: primera columna categoría, resto niveles. */
export const NIVELES_COMPARATIVA = {
  columns: ["Categoría / Nivel", "Nivel 1", "Nivel 2", "Nivel 3", "Élite"],
  rows: [
    {
      category: "Olores",
      cells: ["Abedul", "Abedul + Anís", "Abedul, Anís, Clavo", "Combinaciones exigentes"],
    },
    {
      category: "Áreas de búsqueda",
      cells: [
        "4 áreas (interior, exterior, vehículos, paquetería)",
        "4 áreas (mayor complejidad)",
        "5 áreas (incluye agua / enterrados)",
        "Entornos desconocidos",
      ],
    },
    {
      category: "Dificultad",
      cells: ["Baja — altura máx. orientativa 1,2 m", "Media — hasta ~1,5 m", "Alta — distractores físicos", "Máxima — escenarios exigentes"],
    },
    {
      category: "Requisitos",
      cells: ["ORT superado", "Título / acreditación nivel 1", "Título / acreditación nivel 2", "Título nivel 3 + trayectoria"],
    },
    {
      category: "Títulos",
      cells: ["Certificación nivel 1", "Certificación nivel 2", "Certificación nivel 3", "Reconocimiento élite"],
    },
  ],
};

/** Bloques estilo bento (orden de render). */
export const NIVELES_BENTO_BLOCKS = [
  {
    id: "n1",
    variant: "whiteWide",
    badge: "Prueba de inicio",
    title: "Nivel 1: el despegue",
    subtitle: "La base fundamental de todo equipo de detección.",
    columns: [
      {
        heading: "Objetivo",
        body:
          "Validar motivación por el olor y que el guía lea las señales básicas de indicación con claridad y bienestar.",
      },
      {
        heading: "Qué se evalúa",
        list: ["Localización precisa", "Autonomía del perro", "Ausencia de estrés"],
      },
    ],
    footer: 'Cómo avanzar: obtener calificación alta en las cuatro áreas en una misma competición oficial (según reglamento).',
  },
  {
    id: "n2",
    variant: "primaryCard",
    icon: "rocket_launch",
    title: "Nivel 2: precisión",
    body:
      "Distractores y búsquedas más exigentes en el mismo espacio. El manejo de línea y la comunicación guía-perro ganan peso.",
    ctaLabel: "Ver reglamento",
  },
  {
    id: "n3",
    variant: "whiteBorder",
    title: "Nivel 3: el desafío",
    body: "Búsquedas donde el guía no conoce el número total de fuentes; se exige criterio y control.",
    checklist: ["Distractores de comida", "Alturas y profundidades mayores", "Tiempos ajustados"],
  },
  {
    id: "elite-banner",
    variant: "imageBanner",
    title: "Grado élite",
    body: "Cumbre deportiva: escenarios realistas y exigencia máxima para equipos de alto rendimiento.",
    imageSrc: "/images/hero-dog.webp",
    imageAlt: "Entrenamiento de detección deportiva en instalaciones profesionales",
  },
];

export const NIVELES_CERTIFICADO = {
  sectionTitle: "Acreditación oficial",
  sectionSubtitle: "Cada nivel superado puede acreditarse con certificado y registro según normativa vigente.",
  orgLine: "Nosework Trial Community / federación competente",
  sampleTeam: 'Guía de ejemplo & "Perro de ejemplo"',
  sampleGrade: "Grado II — Avanzado",
  issueDate: "Fecha de emisión según acta",
  validationNote: "Código de validación emitido por la federación",
};
