const STEPS = [
  { n: 1, title: "Reserva de fecha", text: "Solicitud en el calendario oficial con la antelación requerida." },
  { n: 2, title: "Designación juez", text: "Confirmación del juez oficial según criterios del comité técnico." },
  { n: 3, title: "Publicación bases", text: "Publicación de horarios, ubicación y reglamento específico de la prueba." },
  { n: 4, title: "Apertura inscripción", text: "Gestión de plazas y comunicación a participantes." },
  { n: 5, title: "Validación pistas", text: "Inspección técnica de los escenarios de búsqueda." },
  { n: 6, title: "Ejecución prueba", text: "Desarrollo de la competición según horario oficial." },
  { n: 7, title: "Envío acta", text: "Firma y envío digital de resultados al comité." },
  { n: 8, title: "Actualización ranking", text: "Carga de puntos oficiales en el historial del binomio." },
];

export default function ClubsOrganizeStepsSection() {
  return (
    <section className="py-12 md:py-16 bg-surface">
      <div className="max-w-container-max mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-montserrat text-2xl md:text-3xl font-bold text-primary mb-2">Organizar una prueba</h2>
          <p className="text-on-surface-variant">
            Pasos orientativos para una competición oficial válida para el ranking nacional.
          </p>
        </div>
        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-surface-container -translate-y-1/2 z-0" aria-hidden />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {STEPS.map((s) => (
              <div key={s.n} className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-primary text-on-primary rounded-full flex items-center justify-center font-bold text-xl mb-4 border-4 border-surface hover:bg-secondary hover:text-on-secondary transition-colors">
                  {s.n}
                </div>
                <h4 className="font-bold text-primary mb-1">{s.title}</h4>
                <p className="text-sm text-on-surface-variant max-w-[14rem]">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
