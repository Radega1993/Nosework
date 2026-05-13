/**
 * Contenido de la página Niveles y títulos (alineado con el reglamento NTC: Base, Avanzado, olores oficiales).
 * Ajusta textos aquí; la maquetación vive en components/niveles/.
 */

export const NIVELES_HERO = {
  eyebrow: "Normativa oficial",
  title: "Niveles, títulos y progresión",
  description:
    "En Nosework Trial hay dos niveles de competición: Base y Avanzado. Los olores de trabajo oficiales son Kong y aceite esencial de salvia; en Avanzado el organizador puede anunciar un olor de referencia adicional. Los títulos y requisitos concretos figuran en el reglamento y en el PDF de normativas.",
  statValue: "2",
  statLabel: "Niveles de competición oficiales (Base y Avanzado)",
};

/** Pasos del carril horizontal (progresión según reglamento). */
export const NIVELES_TIMELINE_STEPS = [
  { id: "base", title: "Nivel Base", subtitle: "Iniciación", node: "label", label: "B" },
  { id: "avanzado", title: "Nivel Avanzado", subtitle: "Mayor exigencia", node: "label", label: "A" },
  { id: "titulos", title: "Títulos", subtitle: "Por rendimiento", node: "star" },
  { id: "normativa", title: "Reglamento", subtitle: "PDF y detalle", node: "icon", icon: "menu_book" },
];

/** Tabla comparativa: primera columna categoría, resto niveles. */
export const NIVELES_COMPARATIVA = {
  columns: ["Criterio", "Nivel Base", "Nivel Avanzado"],
  rows: [
    {
      category: "Olores oficiales",
      cells: [
        "Olor objetivo: Kong + aceite esencial de salvia.",
        "Mismo olor base; el organizador puede anunciar la posibilidad de añadir un olor de referencia.",
      ],
    },
    {
      category: "Complejidad y distracciones",
      cells: [
        "Búsquedas con menor complejidad y menos distracciones.",
        "Mayor complejidad, distracciones y áreas de búsqueda.",
      ],
    },
    {
      category: "Tiempo y criterios",
      cells: [
        "Tiempo límite más amplio.",
        "Tiempos y criterios más estrictos (incluye ayuda del guía según lo que marque el reglamento por búsqueda).",
      ],
    },
    {
      category: "Enfoque del perro y la guía",
      cells: [
        "Familiarización con el formato de prueba y con el olor objetivo.",
        "Mayor precisión y autonomía del perro.",
      ],
    },
    {
      category: "Títulos y reconocimientos",
      cells: [
        "Títulos propios del nivel Base; requisitos en el reglamento y en el PDF de normativas.",
        "Títulos propios del nivel Avanzado; requisitos en el reglamento y en el PDF de normativas.",
      ],
    },
  ],
};

/** Bloques estilo bento (orden de render). */
export const NIVELES_BENTO_BLOCKS = [
  {
    id: "nivel-base",
    variant: "whiteWide",
    badge: "Nivel Base",
    title: "Iniciación en Nosework Trial",
    subtitle: "Pensado para perros y guías que se inician.",
    columns: [
      {
        heading: "Qué caracteriza el nivel",
        list: [
          "Búsquedas con menor complejidad y menos distracciones",
          "Tiempo límite más amplio",
          "Familiarización con el formato de prueba y con el olor objetivo",
        ],
      },
      {
        heading: "Olores",
        body: "Olor de trabajo oficial: Kong + aceite esencial de salvia, según reglamento.",
      },
    ],
    footer: "Para tablas de puntuación, tipos de búsqueda y tiempos por prueba, consulta el reglamento y el PDF de normativas.",
  },
  {
    id: "nivel-avanzado",
    variant: "primaryCard",
    icon: "trending_up",
    title: "Nivel Avanzado",
    body:
      "Exige mayor precisión y autonomía del perro, con más complejidad y criterios más estrictos. El organizador puede anunciar un olor de referencia además del olor base.",
    ctaLabel: "Ver reglamento",
  },
  {
    id: "olores",
    variant: "whiteBorder",
    title: "Olores oficiales",
    body: "Unifica criterios en todas las pruebas homologadas.",
    checklist: [
      "Olor base: Kong + aceite esencial de salvia",
      "En Avanzado: posible olor de referencia (anunciado por el organizador)",
      "Detalle de preparación y uso en el reglamento en PDF",
    ],
  },
  {
    id: "titulos-banner",
    variant: "imageBanner",
    title: "Títulos y reconocimientos",
    body:
      "Los títulos se otorgan según el rendimiento en las pruebas; cada nivel tiene sus requisitos en el PDF. En Nosework Trial no hay pódiums tradicionales: sí hay reconocimientos alternativos según el reglamento.",
    imageSrc: "/images/hero-dog.webp",
    imageAlt: "Equipo de detección deportiva en una prueba de Nosework Trial",
  },
];

export const NIVELES_CERTIFICADO = {
  sectionTitle: "Acreditación oficial",
  sectionSubtitle: "Las acreditaciones y registros siguen la normativa vigente publicada por la organización.",
  orgLine: "Nosework Trial Community",
  sampleTeam: 'Guía de ejemplo & "Perro de ejemplo"',
  sampleGrade: "Nivel Base — superación",
  issueDate: "Fecha de emisión según acta",
  validationNote: "Código o referencia de validación según procedimiento de la prueba",
};
