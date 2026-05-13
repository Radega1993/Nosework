/**
 * Bento: requisitos (2 cols) + leyenda estados inscripción.
 * @param {string} requirementsTitle
 * @param {Array<{ icon: string, title: string, text: string, wide?: boolean }>} requirements
 * @param {string} legendTitle
 * @param {Array<{ dotClass: string, label: string, labelClass: string, hint: string }>} legendItems
 */
export default function RequirementsLegendSplit({
  requirementsTitle,
  requirements,
  legendTitle,
  legendItems,
}) {
  return (
    <section className="py-16 md:py-20 max-w-container-max mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-8 md:p-10 rounded-xl shadow-sm border border-surface-container">
          <h3 className="font-montserrat text-headline-h2 font-bold text-primary mb-8">{requirementsTitle}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {requirements.map((req) => (
              <div
                key={req.title}
                className={`flex gap-4 items-start ${req.wide ? "md:col-span-2" : ""}`}
              >
                <div className="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center text-primary shrink-0">
                  <span
                    className="material-symbols-outlined text-2xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                    aria-hidden
                  >
                    {req.icon}
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-primary mb-1">{req.title}</h4>
                  <p className="text-on-surface-variant text-body-md leading-relaxed">{req.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-primary-container p-8 rounded-xl text-white">
          <h3 className="font-montserrat text-headline-h3 font-bold mb-6 text-white">{legendTitle}</h3>
          <div className="space-y-4">
            {legendItems.map((item) => (
              <div key={item.label} className="flex items-center gap-3 p-4 bg-white/5 rounded-lg flex-wrap">
                <div className={`w-4 h-4 rounded-full shrink-0 ${item.dotClass}`} aria-hidden />
                <span className={`font-bold text-sm ${item.labelClass}`}>{item.label}</span>
                <span className="text-white/60 text-xs ml-auto">{item.hint}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
