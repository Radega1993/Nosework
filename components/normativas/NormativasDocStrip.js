/**
 * Fila tipo mock “Documentos técnicos”: tarjetas por PDF con acción descarga.
 */
export default function NormativasDocStrip({ documents }) {
  return (
    <section className="max-w-container-max mx-auto px-6">
      <div className="flex items-center gap-2 mb-6">
        <span className="material-symbols-outlined text-primary text-2xl" aria-hidden>
          folder_open
        </span>
        <h3 className="font-montserrat text-xl md:text-2xl font-semibold text-primary">Documentos técnicos</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="bg-surface-container-low border border-outline-variant p-4 md:p-5 rounded-lg flex items-center justify-between gap-4 hover:shadow-md transition-shadow group"
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className={`material-symbols-outlined text-3xl shrink-0 ${doc.id === "participantes" ? "text-primary" : "text-secondary"}`} aria-hidden>
                {doc.icon}
              </span>
              <div className="min-w-0">
                <p className="font-bold text-on-surface truncate">{doc.title}</p>
                <p className="text-xs text-on-surface-variant">{doc.meta}</p>
              </div>
            </div>
            <a
              href={doc.href}
              download={doc.download ? true : undefined}
              className="text-primary hover:bg-primary hover:text-white p-2 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 shrink-0"
              aria-label={`Descargar ${doc.title}`}
            >
              <span className="material-symbols-outlined" aria-hidden>
                download
              </span>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
