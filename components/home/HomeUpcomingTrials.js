import Link from "next/link";
import Image from "next/image";

function formatDateCaps(dateString) {
  const d = new Date(dateString);
  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
    .format(d)
    .toUpperCase();
}

function levelLabel(event) {
  if (event.level) return String(event.level);
  if (event.type) return String(event.type);
  return "Base, Avanzado";
}

/**
 * Bloque "Próximas pruebas" estilo mockup FDDN (fondo primary, grid 3 tarjetas).
 */
export default function HomeUpcomingTrials({ events, localizedHref }) {
  const list = events?.length ? events : [];

  return (
    <section className="bg-primary py-16 md:py-20" aria-labelledby="home-upcoming-trials-heading">
      <div className="container-redesign">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-10">
          <h2 id="home-upcoming-trials-heading" className="font-montserrat text-3xl md:text-4xl font-bold text-white">
            Próximas pruebas
          </h2>
          <Link
            href={localizedHref("/eventos")}
            className="text-secondary-container font-bold inline-flex items-center gap-1 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary-container focus-visible:ring-offset-2 focus-visible:ring-offset-primary rounded"
          >
            Ver calendario completo
            <span className="material-symbols-outlined text-base" aria-hidden>
              open_in_new
            </span>
          </Link>
        </div>

        {list.length === 0 ? (
          <div className="rounded-xl border border-white/20 bg-white/5 p-10 text-center">
            <p className="text-white/85 mb-6">
              No hay pruebas próximas publicadas. Consulta el calendario para novedades.
            </p>
            <Link
              href={localizedHref("/eventos")}
              className="inline-flex items-center justify-center rounded-lg bg-secondary-container px-6 py-3 text-sm font-bold text-on-secondary-container hover:shadow-lg transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary-container focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
            >
              Ir al calendario
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {list.map((event, index) => {
              const href = localizedHref(`/eventos/${event.id}`);
              const badge =
                index === 1 ? (
                  <span className="absolute top-3 right-3 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-900">
                    Consulta plazas
                  </span>
                ) : (
                  <span className="absolute top-3 right-3 rounded-full bg-secondary-container px-3 py-1 text-xs font-semibold text-on-secondary-container">
                    Inscripción / info
                  </span>
                );

              return (
                <article
                  key={event.id}
                  className="group overflow-hidden rounded-xl bg-white shadow-xl border border-white/10"
                >
                  <div className="relative h-48 overflow-hidden bg-surface-container">
                    <Image
                      src="/images/hero-dog.webp"
                      alt=""
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    {badge}
                  </div>
                  <div className="p-6">
                    <div className="mb-2 flex items-center gap-2 text-on-surface-variant text-sm">
                      <span className="material-symbols-outlined text-base" aria-hidden>
                        calendar_month
                      </span>
                      <span className="text-xs font-bold uppercase tracking-wide">{formatDateCaps(event.date)}</span>
                    </div>
                    <h3 className="font-montserrat text-lg font-semibold text-primary mb-4 line-clamp-2">
                      {event.title}
                    </h3>
                    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-outline-variant pt-4">
                      <span className="rounded bg-[#d6e3ff] px-2 py-1 text-xs font-bold text-primary">
                        {levelLabel(event)}
                      </span>
                      <Link
                        href={href}
                        className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white hover:bg-[#1a2b45] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary-container focus-visible:ring-offset-2"
                      >
                        Ver detalles
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
