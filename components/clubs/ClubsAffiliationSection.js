import Link from "next/link";
import Image from "next/image";

export default function ClubsAffiliationSection({ contactHref, clubCount }) {
  return (
    <section className="py-12 md:py-16 bg-primary text-on-primary">
      <div className="max-w-container-max mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-montserrat text-2xl md:text-4xl font-bold mb-4 leading-tight">
              Afiliar un club a la federación
            </h2>
            <p className="text-body-lg opacity-85 mb-8 max-w-xl">
              Únete a la red de centros y clubes que impulsan el Nosework Trial en España. Obtén reconocimiento y acceso a
              competiciones y recursos comunes.
            </p>
            <div className="space-y-8">
              <div>
                <h4 className="font-montserrat text-lg font-semibold text-secondary mb-3">Beneficios</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  {[
                    "Seguro de responsabilidad civil (según acuerdos vigentes)",
                    "Organización de pruebas oficiales",
                    "Formación técnica continua",
                    "Visibilidad en el directorio web",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-secondary text-xl shrink-0" aria-hidden>
                        check_circle
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-montserrat text-lg font-semibold text-secondary mb-3">Requisitos orientativos</h4>
                <ul className="space-y-2 text-sm opacity-90">
                  {[
                    "Estar constituido legalmente como club o entidad deportiva.",
                    "Instructorado y buenas prácticas alineadas con el reglamento.",
                    "Instalaciones adecuadas a la actividad y al bienestar animal.",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-base shrink-0" aria-hidden>
                        arrow_forward
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <Link
              href={contactHref}
              className="inline-block mt-10 bg-secondary text-on-secondary px-8 py-4 rounded-lg font-bold text-lg hover:brightness-110 transition-all shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
            >
              Solicitar afiliación
            </Link>
          </div>
          <div className="relative">
            <div className="aspect-square max-w-md mx-auto bg-white/10 rounded-full flex items-center justify-center p-8 border border-white/20">
              <div className="relative w-full min-h-[220px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/hero-dog.webp"
                  alt="Comunidad de clubes y guías"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </div>
            <div className="absolute -bottom-4 left-4 md:left-0 bg-white/95 backdrop-blur-md p-4 rounded-xl text-primary max-w-xs shadow-xl border-l-4 border-secondary">
              <p className="font-bold text-sm mb-1">Directorio</p>
              <p className="text-2xl font-bold text-secondary">{clubCount}</p>
              <p className="text-xs text-on-surface-variant mt-1">Clubes con presencia en esta web.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
