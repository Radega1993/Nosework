/** Contenido página Competiciones (mockup FDDN + alineación reglamento / niveles NTC). */

export const COMPETICIONES_HERO = {
  title: "Competiciones oficiales de Nosework",
  subtitle:
    "Tipos de pruebas, cómo se desarrolla un día de competición y qué necesitas para participar, según nuestro reglamento y niveles Base y Avanzado.",
};

const IMG = {
  a: "/images/hero-dog.webp",
  b: "/images/philosophy.jpg",
};

export const COMPETICIONES_EVENT_CARDS = [
  {
    title: "Prueba oficial",
    description:
      "Jornadas puntuables con jueces y reglamento Nosework Trial: áreas de interior, exterior, contenedores y vehículos, según nivel convocado.",
    image: IMG.b,
    imageAlt: "Prueba oficial al aire libre",
    badge: "Base / Avanzado",
    badgeClassName: "bg-primary text-on-primary",
  },
  {
    title: "Campeonato regional",
    description:
      "Eventos territoriales para ganar experiencia y consolidar resultados. Las bases concretas las publica cada organización en la ficha de la prueba.",
    image: IMG.a,
    imageAlt: "Área de competición amplia",
    badge: "Regional",
    badgeClassName: "bg-secondary-fixed text-primary font-bold",
  },
  {
    title: "Campeonato nacional",
    description:
      "Cita de mayor alcance en el calendario cuando se convoca. Requisitos y clasificaciones se anuncian con antelación junto al reglamento aplicable.",
    image: IMG.b,
    imageAlt: "Celebración tras una prueba",
    badge: "Gran final",
    badgeClassName: "bg-secondary text-on-secondary",
  },
  {
    title: "Seminarios y jornadas",
    description:
      "Formación técnica para guías y clubs: lectura de búsquedas, preparación a prueba y buenas prácticas de bienestar, sin sustituir al reglamento.",
    image: IMG.a,
    imageAlt: "Taller con guías y perros",
    badge: "Formación",
    badgeClassName: "bg-surface-dim text-on-surface-variant",
  },
];

export const COMPETICIONES_PROCESS = {
  title: "Cómo se estructura una prueba",
  steps: [
    {
      title: "Recepción",
      hint: "Check-in y dorsales",
      mobileDetail: "Check-in de binomios, documentación y entrega de dorsales según organización.",
    },
    {
      title: "Briefing",
      hint: "Instrucciones del juez",
      mobileDetail: "Reunión breve con normas del día, recorridos y criterios de seguridad.",
    },
    {
      title: "Búsquedas",
      hint: "Fase competitiva",
      mobileDetail: "Rotación por las áreas convocadas (interior, exterior, contenedores, vehículos).",
    },
    {
      title: "Resultados",
      hint: "Publicación actas",
      mobileDetail: "Cierre de puntuaciones y publicación de resultados según el organizador.",
    },
    {
      title: "Premios",
      hint: "Reconocimientos",
      mobileDetail: "Entrega de reconocimientos o diplomas según la filosofía del evento (sin pódium tradicional obligatorio).",
    },
  ],
};

export const COMPETICIONES_REQUIREMENTS = {
  title: "Requisitos para competir",
  items: [
    {
      icon: "badge",
      title: "Inscripción válida",
      text: "Alta en la prueba dentro de plazo y cumplimiento de las bases publicadas por el organizador.",
    },
    {
      icon: "pets",
      title: "Identificación del perro",
      text: "Identificación conforme a lo exija la convocatoria (p. ej. microchip) y datos del binomio correctos.",
    },
    {
      icon: "trending_up",
      title: "Nivel acorde",
      text: "Participar en la categoría anunciada (Base o Avanzado) y haber cumplido los requisitos previos que indique la convocatoria.",
    },
    {
      icon: "gavel",
      title: "Reglamento",
      text: "Aceptación de la normativa Nosework Trial, criterios de evaluación y código ético aplicable a la prueba.",
      wide: true,
    },
  ],
};

export const COMPETICIONES_LEGEND = {
  title: "Estados de inscripción",
  items: [
    {
      dotClass: "bg-secondary-fixed",
      label: "Abierta",
      labelClass: "text-secondary-fixed",
      hint: "Plazas disp.",
    },
    {
      dotClass: "bg-[#FF8C00]",
      label: "Lista de espera",
      labelClass: "text-[#FF8C00]",
      hint: "Cupo lleno",
    },
    {
      dotClass: "bg-surface-dim",
      label: "Cerrada",
      labelClass: "text-white",
      hint: "Finalizado",
    },
    {
      dotClass: "bg-primary-fixed",
      label: "Resultados",
      labelClass: "text-primary-fixed",
      hint: "Publicado",
    },
  ],
};

export const COMPETICIONES_LEVELS_TABLE = {
  title: "Estructura de niveles competitivos",
  columns: ["Nivel", "Olores", "Enfoque", "Requisitos previos", "Título / hito"],
  rows: [
    [
      "Base",
      "Kong + salvia; búsquedas con menor complejidad y tiempo más amplio.",
      "Interior, exterior, contenedores y vehículos con criterios de Base.",
      "Los que marque la convocatoria (consulta bases de cada prueba).",
      "Título de nivel Base (acumulación de resultados)",
    ],
    [
      "Avanzado",
      "Kong + salvia; puede añadirse olor de referencia si el organizador lo anuncia.",
      "Mayor complejidad, distractores y criterios más estrictos.",
      "Experiencia en Base o requisitos de la convocatoria.",
      "Título de nivel Avanzado y ranking cuando aplique",
    ],
  ],
};

export const COMPETICIONES_CTA = {
  title: "¿Listo para el desafío?",
  subtitle: "Consulta fechas y sedes en el calendario y revisa el reglamento antes de inscribirte.",
};
