/**
 * Línea vertical central y pasos numerados alternando columnas (desktop).
 * @param {string} title
 * @param {Array<{ title: string, text: string, textOnLeft: boolean }>} steps
 */
export default function AlternatingTimeline({ title, steps }) {
  return (
    <section className="py-16 md:py-20 bg-primary-container text-white">
      <div className="max-w-container-max mx-auto px-6">
        <h2 className="font-montserrat text-headline-h1 md:text-4xl font-bold text-center text-white mb-12 md:mb-16">
          {title}
        </h2>
        <div className="relative">
          <div
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-secondary -translate-x-1/2 opacity-30"
            aria-hidden
          />
          <div className="space-y-10 md:space-y-12 relative">
            {steps.map((step, i) => {
              const n = i + 1;
              const isLeft = step.textOnLeft;
              const body = (
                <>
                  <h4 className="font-montserrat text-headline-h3 font-semibold text-secondary mb-2">{step.title}</h4>
                  <p className="text-on-primary-container leading-relaxed">{step.text}</p>
                </>
              );
              const circle = (
                <div className="w-12 h-12 shrink-0 bg-secondary rounded-full flex items-center justify-center font-bold text-primary border-4 border-primary-container shadow-lg z-10">
                  {n}
                </div>
              );

              return (
                <div
                  key={step.title}
                  className="flex flex-col md:flex-row md:items-center gap-4 md:gap-0"
                >
                  {isLeft ? (
                    <>
                      <div className="md:w-1/2 md:text-right md:pr-8 order-2 md:order-1 text-center">
                        {body}
                      </div>
                      <div className="flex justify-center md:justify-center md:px-2 order-1 md:order-2">{circle}</div>
                      <div className="hidden md:block md:w-1/2 md:order-3" aria-hidden />
                    </>
                  ) : (
                    <>
                      <div className="hidden md:block md:w-1/2 md:order-1" aria-hidden />
                      <div className="flex justify-center md:px-2 order-1 md:order-2">{circle}</div>
                      <div className="md:w-1/2 md:pl-8 order-2 md:order-3 text-center md:text-left">{body}</div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
