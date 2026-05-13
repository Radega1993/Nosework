import Image from "next/image";
import Link from "next/link";

/**
 * Hero split (mockup FDDN niveles): texto + CTAs + imagen y tarjeta de estadística.
 */
export default function NivelesHero({ hero, reglamentoHref, eventosHref }) {
  return (
    <section className="py-12 md:py-16 lg:py-20 flex flex-col md:flex-row items-center gap-10 lg:gap-16 max-w-container-max mx-auto px-6">
      <div className="flex-1 space-y-5 w-full">
        <span className="inline-block px-3 py-1 bg-secondary-container text-on-secondary-container text-xs font-bold uppercase tracking-wider rounded-full">
          {hero.eyebrow}
        </span>
        <h1 className="font-montserrat text-3xl md:text-4xl lg:text-5xl font-bold text-primary leading-tight tracking-tight">
          {hero.title}
        </h1>
        <p className="text-lg text-on-surface-variant max-w-xl leading-relaxed">{hero.description}</p>
        <div className="flex flex-wrap gap-3">
          <Link
            href={reglamentoHref}
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-primary text-white font-bold shadow-md hover:-translate-y-0.5 transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
          >
            Descargar reglamento
          </Link>
          <Link
            href={eventosHref}
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg border-2 border-primary text-primary font-bold hover:bg-surface-container-low transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
          >
            Calendario de pruebas
          </Link>
        </div>
      </div>
      <div className="flex-1 w-full relative">
        <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-xl border-8 border-white relative">
          <Image
            src="/images/hero-dog.webp"
            alt="Perro en una prueba de detección deportiva Nosework Trial"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
        <div className="absolute -bottom-4 -left-2 sm:-bottom-6 sm:-left-6 bg-secondary-fixed text-[#161e00] p-4 rounded-lg shadow-lg max-w-[220px]">
          <span className="block font-montserrat font-bold text-xl">{hero.statValue}</span>
          <span className="text-[11px] font-bold uppercase tracking-wide leading-snug">{hero.statLabel}</span>
        </div>
      </div>
    </section>
  );
}
