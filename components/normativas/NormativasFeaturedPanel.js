import Link from "next/link";

/**
 * Tarjeta destacada del bento: versión vigente, CTAs a PDFs y enlace al reglamento en línea.
 */
export default function NormativasFeaturedPanel({ featured, documents, reglamentoHref }) {
  const [primaryDoc, secondaryDoc] = documents;

  return (
    <div className="lg:col-span-1 bg-surface-container-lowest border border-outline-variant p-6 md:p-8 rounded-xl shadow-sm flex flex-col justify-between min-h-[280px]">
      <div>
        <div className="flex justify-between items-start gap-3 mb-4">
          <span className="bg-secondary-container text-on-secondary-container text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide shrink-0">
            {featured.badge}
          </span>
          <span className="material-symbols-outlined text-primary text-4xl shrink-0" aria-hidden>
            gavel
          </span>
        </div>
        <h2 className="font-montserrat text-xl md:text-2xl font-semibold text-primary mb-2">{featured.title}</h2>
        <p className="text-on-surface-variant text-sm md:text-base leading-relaxed mb-6">{featured.description}</p>
      </div>
      <div className="space-y-3">
        {primaryDoc ? (
          <a
            href={primaryDoc.href}
            download={primaryDoc.download ? true : undefined}
            className="w-full bg-primary text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:-translate-y-0.5 transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
          >
            <span className="material-symbols-outlined" aria-hidden>
              download
            </span>
            Descargar PDF (participantes)
          </a>
        ) : null}
        {secondaryDoc ? (
          <a
            href={secondaryDoc.href}
            download={secondaryDoc.download ? true : undefined}
            className="w-full border-2 border-primary text-primary py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-surface-container-low transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
          >
            <span className="material-symbols-outlined" aria-hidden>
              download
            </span>
            Guía para organizadores
          </a>
        ) : null}
        <Link
          href={reglamentoHref}
          className="w-full border-2 border-outline-variant text-primary py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-surface-container transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
        >
          <span className="material-symbols-outlined" aria-hidden>
            menu_book
          </span>
          Leer reglamento online
        </Link>
      </div>
    </div>
  );
}
