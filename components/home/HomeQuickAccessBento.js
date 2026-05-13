import Link from "next/link";

const linkClass =
  "inline-flex items-center gap-1 font-bold text-primary hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 rounded";

/**
 * Grid de accesos rápidos (perfiles: nuevo, competir, club, normativa).
 * @param {(path: string) => string} localizedHref
 * @param {{ newbiesHref: string, eventsHref: string, clubsHref: string, normativasHref: string }} [paths] rutas sin prefijo idioma
 */
export default function HomeQuickAccessBento({
  localizedHref,
  paths = {
    newbiesHref: "/que-es-nosework-trial",
    eventsHref: "/eventos",
    clubsHref: "/clubs",
    normativasHref: "/normativas",
  },
}) {
  return (
    <section className="py-16 md:py-20" aria-label="Accesos rápidos">
      <div className="container-redesign">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col justify-between rounded-xl border border-outline-variant bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
            <div>
              <span className="material-symbols-outlined mb-3 text-4xl text-secondary" aria-hidden>
                rocket_launch
              </span>
              <h3 className="font-montserrat text-xl font-semibold text-primary mb-2">Soy nuevo</h3>
              <p className="text-on-surface-variant mb-6">Conoce qué es Nosework Trial y cómo dar los primeros pasos.</p>
            </div>
            <Link href={localizedHref(paths.newbiesHref)} className={linkClass}>
              Información
              <span className="material-symbols-outlined text-lg" aria-hidden>
                chevron_right
              </span>
            </Link>
          </div>

          <div className="flex flex-col justify-between rounded-xl bg-primary p-8 text-white shadow-sm transition-shadow hover:shadow-md">
            <div>
              <span
                className="material-symbols-outlined mb-3 text-4xl text-[#c3f400]"
                aria-hidden
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                emoji_events
              </span>
              <h3 className="font-montserrat text-xl font-semibold text-white mb-2">Quiero competir</h3>
              <p className="mb-6 text-white/80">Próximas pruebas y calendario de eventos.</p>
            </div>
            <Link
              href={localizedHref(paths.eventsHref)}
              className="inline-block w-fit rounded-lg bg-secondary-container px-4 py-2 text-sm font-bold text-on-secondary-container hover:shadow-md transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary-container focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
            >
              Ver pruebas
            </Link>
          </div>

          <div className="flex flex-col justify-between rounded-xl border border-outline-variant bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
            <div>
              <span className="material-symbols-outlined mb-3 text-4xl text-secondary" aria-hidden>
                groups
              </span>
              <h3 className="font-montserrat text-xl font-semibold text-primary mb-2">Soy club</h3>
              <p className="text-on-surface-variant mb-6">Directorio de clubs y afiliaciones.</p>
            </div>
            <Link href={localizedHref(paths.clubsHref)} className={linkClass}>
              Acceso club
              <span className="material-symbols-outlined text-lg" aria-hidden>
                chevron_right
              </span>
            </Link>
          </div>

          <div className="flex flex-col justify-between rounded-xl border border-outline-variant bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
            <div>
              <span className="material-symbols-outlined mb-3 text-4xl text-secondary" aria-hidden>
                gavel
              </span>
              <h3 className="font-montserrat text-xl font-semibold text-primary mb-2">Normativa y documentos</h3>
              <p className="text-on-surface-variant mb-6">PDFs oficiales, reglamento y preguntas frecuentes.</p>
            </div>
            <Link href={localizedHref(paths.normativasHref)} className={linkClass}>
              Consultar normativa
              <span className="material-symbols-outlined text-lg" aria-hidden>
                chevron_right
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
