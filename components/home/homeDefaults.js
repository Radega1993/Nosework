/** Contenido por defecto de las secciones tipo home (sobrescribible por props). */

export const DEFAULT_JOURNEY_STEPS = [
  { icon: "school", title: "Aprende", text: "Iníciate con la guía y un club" },
  { icon: "fitness_center", title: "Entrena", text: "Bases de olfato y bienestar" },
  { icon: "app_registration", title: "Registra", text: "Prepara tu primera prueba" },
  { icon: "verified", title: "Normativa", text: "Consulta niveles y reglamento" },
  { icon: "stadium", title: "Compite", text: "Participa en eventos" },
  { icon: "workspace_premium", title: "Títulos", text: "Progresa y disfruta" },
];

export const DEFAULT_NEWS_CARDS = [
  {
    tag: "Reglamento",
    title: "Consulta el reglamento y normativa",
    excerpt: "Niveles Base y Avanzado, búsquedas y criterios de evaluación en un solo lugar.",
    href: "/reglamento",
    image: "/images/philosophy.jpg",
  },
  {
    tag: "Eventos",
    title: "Próximas pruebas en el calendario",
    excerpt: "Fechas, sedes e información para participar en Nosework Trial.",
    href: "/eventos",
    image: "/images/hero-dog.webp",
  },
  {
    tag: "Comunidad",
    title: "Cómo empezar con tu perro",
    excerpt: "Pasos, material básico y preguntas frecuentes para nuevos guías.",
    href: "/como-empezar",
    image: "/images/philosophy.jpg",
  },
];

export const DEFAULT_LEVEL_CARDS = [
  { code: "ORT", label: "Test olor", sub: "Referencia reglamento", border: "border-outline" },
  { code: "Base", label: "Nivel Base", sub: "Iniciación", border: "border-cyan-600" },
  { code: "Avanzado", label: "Nivel Avanzado", sub: "Mayor exigencia", border: "border-emerald-600" },
  {
    code: "Títulos",
    label: "Reconocimientos",
    sub: "Según reglamento",
    border: "border-amber-500",
    dark: true,
  },
];

export const DEFAULT_RESULTS_TEASER_ROWS = [
  {
    event: "Ejemplo — Open regional",
    date: "Próximamente",
    team: "—",
    category: "Avanzado",
    categoryClass: "rounded bg-primary px-2 py-0.5 text-xs font-bold text-white",
    linkHref: "/resultados-rankings",
    linkLabel: "Ver rankings",
  },
  {
    event: "Pruebas publicadas en calendario",
    date: "—",
    team: "—",
    category: "Base",
    categoryClass: "rounded bg-emerald-600 px-2 py-0.5 text-xs font-bold text-white",
    linkHref: "/eventos",
    linkLabel: "Eventos",
  },
];
