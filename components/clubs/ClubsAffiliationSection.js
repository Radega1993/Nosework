import Link from "next/link";
import Image from "next/image";
import { PROPOSAL_PHOTOS } from "@/data/visualProposal";

export default function ClubsAffiliationSection({ contactHref, clubCount }) {
  const photo = PROPOSAL_PHOTOS.clubsHero;

  return (
    <section className="py-12 md:py-16 bg-primary text-white">
      <div className="max-w-container-max mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-display text-2xl md:text-4xl font-medium mb-4 leading-tight text-white tracking-tight">
              Unir un club a la comunidad
            </h2>
            <p className="text-body-lg text-white/90 mb-8 max-w-xl">
              Únete a la red de centros y clubes que impulsan el Nosework Trial en España. Obtén reconocimiento y acceso a
              competiciones y recursos comunes.
            </p>
            <div className="space-y-8">
              <div>
                <h4 className="font-montserrat text-lg font-semibold text-gold mb-3">Beneficios</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-white/90">
                  {[
                    "Seguro de responsabilidad civil (según acuerdos vigentes)",
                    "Organización de pruebas oficiales",
                    "Formación técnica continua",
                    "Visibilidad en el directorio web",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-gold text-xl shrink-0" aria-hidden>
                        check_circle
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-montserrat text-lg font-semibold text-gold mb-3">Requisitos orientativos</h4>
                <ul className="space-y-2 text-sm text-white/90">
                  {[
                    "Estar constituido legalmente como club o entidad deportiva.",
                    "Instructorado y buenas prácticas alineadas con el reglamento.",
                    "Instalaciones adecuadas a la actividad y al bienestar animal.",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-base text-gold shrink-0" aria-hidden>
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
              className="inline-block mt-10 bg-white text-primary px-8 py-4 rounded-lg font-bold text-lg hover:bg-mint transition-all shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
            >
              Solicitar afiliación
            </Link>
          </div>
          <div className="relative">
            <div className="aspect-square max-w-md mx-auto bg-white/10 rounded-full flex items-center justify-center p-8 border border-white/25">
              <div className="relative w-full min-h-[220px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover"
                  style={{ objectPosition: photo.objectPosition }}
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </div>
            <div className="absolute -bottom-4 left-4 md:left-0 bg-white p-4 rounded-xl text-primary max-w-xs shadow-xl border-l-4 border-gold">
              <p className="font-bold text-sm mb-1 text-primary">Directorio</p>
              <p className="text-2xl font-bold text-primary">{clubCount}</p>
              <p className="text-xs text-on-surface-variant mt-1">Clubes con presencia en esta web.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
