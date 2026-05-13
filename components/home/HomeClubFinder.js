import Link from "next/link";

/**
 * Bloque búsqueda de club + tarjeta mapa placeholder.
 * @param {string} query valor controlado del input
 * @param {(e: import('react').ChangeEvent<HTMLInputElement>) => void} onQueryChange
 * @param {(e: import('react').FormEvent) => void} onSubmit
 * @param {(path: string) => string} localizedHref
 */
export default function HomeClubFinder({
  query,
  onQueryChange,
  onSubmit,
  localizedHref,
  listHref = "/clubs",
  title = "Encuentra un club",
  description = "Entrenar con un club te ayuda a seguir una guía clara y a preparar pruebas con confianza.",
  placeholder = "Tu ciudad o provincia...",
  submitLabel = "Buscar clubes",
  mapBackgroundImage = "/images/hero-dog.webp",
  mapCardTitle = "Directorio de clubs",
  mapLinkLabel = "Ver listado",
}) {
  return (
    <section className="bg-surface-container-high py-16 md:py-20">
      <div className="container-redesign">
        <div className="glass-card flex flex-col gap-10 rounded-3xl border border-white p-8 md:flex-row md:items-center md:gap-12 lg:p-12">
          <div className="flex-1">
            <h2 className="font-montserrat text-3xl font-bold text-primary mb-4">{title}</h2>
            <p className="text-lg text-on-surface-variant mb-8">{description}</p>
            <form onSubmit={onSubmit} className="flex flex-col gap-4 sm:flex-row sm:items-stretch">
              <div className="relative flex-1">
                <span
                  className="material-symbols-outlined pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant"
                  aria-hidden
                >
                  location_on
                </span>
                <input
                  type="text"
                  value={query}
                  onChange={onQueryChange}
                  placeholder={placeholder}
                  className="w-full rounded-xl border border-outline-variant py-4 pl-14 pr-4 focus:border-secondary focus:ring-2 focus:ring-secondary outline-none"
                  aria-label="Buscar club por ciudad o provincia"
                />
              </div>
              <button
                type="submit"
                className="rounded-xl bg-primary px-8 py-4 font-bold text-white hover:bg-[#1a2b45] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
              >
                {submitLabel}
              </button>
            </form>
          </div>
          <div className="h-64 w-full overflow-hidden rounded-2xl bg-surface-dim shadow-inner md:w-1/3 md:shrink-0">
            <div
              className="flex h-full w-full items-center justify-center bg-cover bg-center"
              style={{ backgroundImage: `url(${mapBackgroundImage})` }}
            >
              <div className="rounded-xl border border-white bg-white/90 p-6 text-center shadow-lg">
                <span className="material-symbols-outlined mb-2 text-4xl text-secondary" aria-hidden>
                  map
                </span>
                <p className="font-bold text-primary">{mapCardTitle}</p>
                <Link
                  href={localizedHref(listHref)}
                  className="mt-2 inline-block text-sm font-semibold text-secondary hover:underline"
                >
                  {mapLinkLabel}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
