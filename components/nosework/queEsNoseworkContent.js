/** Contenido por defecto de la página «Qué es Nosework» (mockup FDDN + coherencia con reglamento). */

export const QUE_ES_HERO = {
  eyebrow: "INTRODUCCIÓN AL DEPORTE",
  title: "Qué es la detección deportiva Nosework",
  subtitle:
    "Descubre la disciplina que transforma el instinto natural de rastreo del perro en una actividad deportiva de alta precisión y bienestar emocional.",
};

export const QUE_ES_PILLARS_INTRO = {
  title: "Los tres pilares de la detección",
  intro: "Una disciplina basada en la cooperación mutua y el respeto por las capacidades olfativas caninas.",
};

export const QUE_ES_PILLARS = [
  {
    icon: "pets",
    title: "Perro busca",
    text: "El verdadero protagonista. Utiliza su olfato para localizar una fuente de olor específica oculta en diversos entornos, demostrando autonomía y determinación.",
  },
  {
    icon: "accessibility_new",
    title: "Guía acompaña",
    text: "El guía actúa como un apoyo logístico y emocional. Debe leer el lenguaje corporal de su perro para confirmar cuándo se ha localizado el objetivo.",
  },
  {
    icon: "gavel",
    title: "Juez evalúa",
    text: "El oficial técnico garantiza el cumplimiento del reglamento, evaluando la precisión del marcaje y la fluidez del binomio durante la búsqueda.",
  },
];

export const QUE_ES_TIMELINE = {
  title: "Cómo funciona una búsqueda",
  steps: [
    {
      title: "1. Preparación",
      text: "Se establece el área de búsqueda y se coloca la muestra de olor de forma que el perro no pueda verla.",
      textOnLeft: true,
    },
    {
      title: "2. Entrada",
      text: "El binomio cruza la línea de salida. El guía da la orden y el perro comienza a rastrear sistemáticamente.",
      textOnLeft: false,
    },
    {
      title: "3. Localización",
      text: "El perro encuentra el cono de olor y sigue el rastro hasta llegar al punto exacto donde se encuentra la fuente.",
      textOnLeft: true,
    },
    {
      title: "4. Indicación",
      text: "El perro comunica al guía que ha encontrado el olor mediante un marcaje (sentado, tumbado o mirada fija).",
      textOnLeft: false,
    },
    {
      title: "5. Validación",
      text:
        "Cuando el perro marca la fuente, el participante premia al perro; el juez anota si la indicación es válida o no según el reglamento.",
      textOnLeft: true,
    },
  ],
};

export const QUE_ES_MODALITIES_INTRO = {
  title: "Tipos de búsqueda",
  intro:
    "En Nosework Trial se trabajan cuatro modalidades oficiales (como en el reglamento): interior, exterior, vehículos y contenedores.",
};

/** Fotografías propias optimizadas (WebP); regenerar con `npm run optimize:brand-que-es`. */
const IMG = {
  contenedores: "/images/paqueteria.webp",
  interior: "/images/interior.webp",
  exterior: "/images/exterior.webp",
  vehiculos: "/images/coche.webp",
};

export const QUE_ES_MODALITIES = [
  { title: "Contenedores", image: IMG.contenedores, imageAlt: "Perro buscando entre cajas y paquetes en interior" },
  { title: "Interior", image: IMG.interior, imageAlt: "Búsqueda de olor en espacio interior" },
  { title: "Exterior", image: IMG.exterior, imageAlt: "Búsqueda de olor al aire libre sobre hierba" },
  { title: "Vehículos", image: IMG.vehiculos, imageAlt: "Perro rastreando olor en la zona de ruedas de un vehículo" },
];

export const QUE_ES_BENEFITS = {
  title: "Beneficios para el perro",
  imageSrc: "/images/exterior.webp",
  imageAlt: "Perro concentrado en una búsqueda de olor al aire libre",
  quote: "Nosework no es solo un deporte, es un lenguaje entre tú y tu perro.",
  items: [
    {
      icon: "psychology",
      title: "Concentración",
      text: "Mejora la capacidad de enfoque del perro en tareas complejas, reduciendo la impulsividad.",
    },
    {
      icon: "shield",
      title: "Autoconfianza",
      text: "Superar retos de búsqueda ayuda a perros miedosos a ganar seguridad en sí mismos.",
    },
    {
      icon: "favorite",
      title: "Gestión emocional",
      text: "Canaliza la energía de forma positiva, ayudando a perros con reactividad o estrés.",
    },
    {
      icon: "neurology",
      title: "Enriquecimiento mental",
      text: "Es una de las actividades que más fatiga mental saludable genera en el perro.",
    },
  ],
};

export const QUE_ES_AUDIENCE = {
  title: "¿Quién puede practicarlo?",
  body: "La respuesta corta es: cualquier perro y cualquier persona. El Nosework es uno de los deportes más inclusivos: no importa la raza, edad, tamaño o condición física. Incluso perros senior, con movilidad reducida o con necesidades especiales pueden disfrutarlo, ya que las búsquedas se realizan de forma individual y controlada.",
  pills: [
    "Perros de todas las edades",
    "Personas con movilidad reducida",
    "Perros en rehabilitación",
    "Cachorros (iniciación)",
  ],
};

/** FAQ alineada con /reglamento (olores Kong + salvia; referencia en avanzado). */
export const QUE_ES_FAQ = [
  {
    q: "¿Necesito experiencia previa?",
    a: "No. El Nosework se aprende desde cero, aprovechando un instinto que tu perro ya posee.",
  },
  {
    q: "Mi perro es reactivo a otros perros, ¿puede participar?",
    a: "Sí. En entrenamientos y pruebas, los perros suelen trabajar uno a uno en el área, lo que facilita un entorno seguro y predecible.",
  },
  {
    q: "¿Qué olores se utilizan?",
    a: "Según nuestro reglamento, el olor de trabajo es Kong más aceite esencial de salvia; en nivel Avanzado el organizador puede anunciar también olor de referencia. Consulta el detalle en el reglamento.",
  },
  {
    q: "¿Se puede practicar en casa?",
    a: "Sí. Es una actividad muy adecuada para días en los que no puedas salir tanto: unos minutos de búsqueda estructurada suponen un gran trabajo mental para el perro.",
  },
];
