import Image from "next/image";
import Button from "@/components/Button";

/**
 * Bloque "Qué es" con texto, lista de beneficios e imagen con badge.
 * @param {(path: string) => string} localizedHref
 * @param {object} [copy]
 */
export default function HomeWhatIsTrialSection({
  localizedHref,
  moreHref = "/que-es-nosework-trial",
  title = "¿Qué es Nosework Trial?",
  paragraphs = [
    "Nosework Trial es una modalidad deportiva que combina la detección deportiva y el nosework tradicional, creando un deporte inclusivo y accesible para todos los perros y sus guías. Se centra en el disfrute, el aprendizaje y el bienestar del perro.",
    "Perros de todas las razas, edades y niveles pueden participar y desarrollar sus habilidades olfativas de forma estructurada y divertida.",
  ],
  bullets = [
    {
      icon: "psychology",
      title: "Estimulación y aprendizaje",
      text: "Trabajo de olfato estructurado que motiva al perro de forma positiva.",
    },
    {
      icon: "favorite",
      title: "Vínculo perro-guía",
      text: "Refuerza la confianza y la comunicación en equipo.",
    },
    {
      icon: "all_inclusive",
      title: "Deporte inclusivo",
      text: "Pensado para distintos niveles y realidades de cada binomio.",
    },
  ],
  imageSrc = "/images/philosophy.jpg",
  imageAlt = "Perro en acción durante una prueba de Nosework Trial",
  badgeTitle = "100%",
  badgeText = "enfoque en bienestar y disfrute del binomio.",
  moreLabel = "Saber más",
}) {
  return (
    <section className="bg-surface-container py-16 md:py-20">
      <div className="container-redesign">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-primary mb-6">{title}</h2>
            {paragraphs.map((p, i) => (
              <p key={i} className="text-lg text-on-surface-variant mb-6 last:mb-8 leading-relaxed">
                {p}
              </p>
            ))}
            <ul className="space-y-6">
              {bullets.map((b) => (
                <li key={b.title} className="flex gap-4">
                  <div className="shrink-0 rounded-lg bg-white p-3 shadow-sm">
                    <span className="material-symbols-outlined text-secondary" aria-hidden>
                      {b.icon}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-montserrat font-semibold text-primary">{b.title}</h4>
                    <p className="text-on-surface-variant text-sm mt-1">{b.text}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Button href={localizedHref(moreHref)} variant="outline">
                {moreLabel}
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl shadow-xl">
              <Image
                src={imageSrc}
                alt={imageAlt}
                width={800}
                height={500}
                className="h-[420px] w-full object-cover lg:h-[500px]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="absolute -bottom-2 -left-2 max-w-[200px] rounded-2xl bg-secondary p-6 text-white shadow-lg md:-bottom-4 md:-left-4">
              <p className="font-montserrat text-2xl font-bold">{badgeTitle}</p>
              <p className="text-sm text-white/90">{badgeText}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
