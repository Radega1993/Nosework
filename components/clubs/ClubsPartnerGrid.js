import ClubPartnerCard from "./ClubPartnerCard";

export default function ClubsPartnerGrid({ clubs, contactHref }) {
  return (
    <section className="bg-surface-container-low py-12 md:py-16">
      <div className="max-w-container-max mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-8">
          <div>
            <h2 className="font-montserrat text-2xl md:text-3xl font-bold text-primary">Clubes registrados</h2>
            <p className="text-on-surface-variant mt-1">
              Mostrando {clubs.length} club{clubs.length === 1 ? "" : "es"} participantes
            </p>
          </div>
        </div>
        {clubs.length === 0 ? (
          <p className="text-center text-on-surface-variant py-16 bg-white rounded-xl border border-outline-variant">
            No hay clubes que coincidan con los filtros. Prueba a ampliar provincia o servicios.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {clubs.map((club, index) => (
              <ClubPartnerCard key={club.slug} club={club} contactHref={contactHref} priority={index < 4} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
