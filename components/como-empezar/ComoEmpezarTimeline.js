export default function ComoEmpezarTimeline({ timeline }) {
  return (
    <section className="py-16 md:py-20 bg-surface">
      <div className="max-w-container-max mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-montserrat text-headline-h1 font-bold text-primary mb-3">{timeline.title}</h2>
          <p className="text-on-surface-variant max-w-2xl mx-auto">{timeline.intro}</p>
        </div>

        <div className="space-y-8 md:space-y-10">
          {timeline.steps.map((step, index) => {
            const rightAligned = step.side === "right";
            const numberTone =
              step.tone === "secondary"
                ? "bg-secondary text-white"
                : "bg-primary text-white";

            return (
              <article
                key={step.title}
                className={`flex flex-col gap-4 md:gap-0 md:flex-row ${
                  rightAligned ? "md:flex-row-reverse" : ""
                } md:items-center md:justify-between`}
              >
                <div className={`hidden md:block md:w-[45%] ${rightAligned ? "text-left pl-6" : "text-right pr-6"}`}>
                  <h3 className="font-montserrat text-headline-h2 font-semibold text-primary">{step.title}</h3>
                  <p className="text-on-surface-variant mt-2">{step.description}</p>
                </div>

                <div
                  className={`z-10 w-12 h-12 rounded-full ${numberTone} font-bold shadow-xl flex items-center justify-center shrink-0`}
                >
                  {index + 1}
                </div>

                <div
                  className={`w-full md:w-[45%] ${
                    rightAligned ? "md:pr-6 text-left md:text-right" : "md:pl-6"
                  }`}
                >
                  <div className="md:hidden">
                    <h3 className="font-montserrat text-headline-h3 font-semibold text-primary">{step.title}</h3>
                    <p className="text-on-surface-variant mt-1">{step.description}</p>
                  </div>
                  <div
                    className={`mt-3 md:mt-0 rounded-xl p-4 border shadow-sm ${
                      step.highlighted
                        ? "bg-primary text-white border-primary"
                        : "bg-white border-surface-container-highest"
                    }`}
                  >
                    {step.badge && (
                      <span className="inline-flex text-[11px] uppercase tracking-wide font-semibold bg-primary text-white rounded-full px-2 py-1">
                        {step.badge}
                      </span>
                    )}
                    <p className={`${step.badge ? "mt-3" : ""} ${step.highlighted ? "text-white" : "text-on-surface"}`}>
                      {step.cardText}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
