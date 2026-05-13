/**
 * Timeline horizontal (desktop) con conectores; lista vertical en móvil.
 * @param {string} title
 * @param {Array<{ title: string, hint: string, mobileDetail?: string }>} steps
 */
export default function HorizontalProcessTimeline({ title, steps }) {
  return (
    <section className="bg-primary text-white py-16 md:py-20">
      <div className="max-w-container-max mx-auto px-6">
        <h2 className="font-montserrat text-headline-h2 md:text-3xl font-bold mb-12 md:mb-14 text-center text-white">
          {title}
        </h2>

        <div className="hidden md:flex justify-between items-start gap-2">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className={`fddn-process-step flex flex-col items-center flex-1 min-w-0 ${
                i < steps.length - 1 ? "fddn-process-step--connector" : ""
              }`}
            >
              <div className="w-12 h-12 rounded-full bg-secondary text-primary flex items-center justify-center font-bold z-10 shrink-0">
                {i + 1}
              </div>
              <p className="mt-4 font-bold text-center text-sm lg:text-base px-1">{step.title}</p>
              <p className="text-white/70 text-xs uppercase tracking-wide mt-1 text-center px-1">{step.hint}</p>
            </div>
          ))}
        </div>

        <div className="md:hidden space-y-6">
          {steps.map((step, i) => (
            <div key={step.title} className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-secondary text-primary flex items-center justify-center shrink-0 font-bold text-sm">
                {i + 1}
              </div>
              <div>
                <h4 className="font-bold text-white">{step.title}</h4>
                <p className="text-white/75 text-sm mt-1">{step.mobileDetail || step.hint}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
