/**
 * Carril horizontal “Camino a la Excelencia” (6 pasos).
 * @param {{ id: string, title: string, subtitle: string, node: string, icon?: string, label?: string }[]} steps
 */
export default function NivelesExcellenceTimeline({ steps }) {
  return (
    <section className="py-12 md:py-16 max-w-container-max mx-auto px-6">
      <div className="text-center mb-10 md:mb-14">
        <h2 className="font-montserrat text-2xl md:text-3xl font-semibold text-primary">Camino a la excelencia</h2>
        <div className="w-24 h-1.5 bg-secondary-fixed mx-auto mt-3 rounded-full" aria-hidden />
      </div>
      <div className="relative px-2 md:px-8">
        <div
          className="absolute top-8 left-0 w-full h-1 bg-surface-container-highest -translate-y-1/2 hidden md:block rounded-full"
          aria-hidden
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-8 md:gap-4 relative">
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col items-center text-center group">
              <TimelineDisc step={step} />
              <h3 className="font-montserrat text-lg font-semibold text-primary mt-2">{step.title}</h3>
              <p className="text-[11px] md:text-xs font-bold uppercase tracking-wider text-on-surface-variant max-w-[140px]">
                {step.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineDisc({ step }) {
  const base =
    "w-16 h-16 rounded-full flex items-center justify-center z-10 shadow-lg transition-transform group-hover:scale-110";

  if (step.node === "icon") {
    return (
      <div className={`${base} bg-primary text-white`}>
        <span className="material-symbols-outlined text-2xl" aria-hidden>
          {step.icon}
        </span>
      </div>
    );
  }

  if (step.node === "label") {
    return (
      <div className={`${base} bg-primary text-white`}>
        <span className="font-montserrat font-bold text-lg">{step.label}</span>
      </div>
    );
  }

  if (step.node === "star") {
    return (
      <div className={`${base} bg-secondary-fixed text-[#161e00] border-2 border-primary`}>
        <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }} aria-hidden>
          star
        </span>
      </div>
    );
  }

  if (step.node === "trophy") {
    return (
      <div className={`${base} bg-primary-container text-secondary-fixed`}>
        <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }} aria-hidden>
          emoji_events
        </span>
      </div>
    );
  }

  return <div className={`${base} bg-primary text-white`} aria-hidden />;
}
