import Link from "next/link";
import { DEFAULT_JOURNEY_STEPS } from "./homeDefaults";

/**
 * Timeline horizontal del camino del deportista.
 * @param {(path: string) => string} localizedHref
 * @param {Array<{ icon: string, title: string, text: string }>} [steps]
 * @param {number[]} [accentStepIndexes] índices (0-based) con círculo secundario (destacado)
 * @param {number[]} [mutedStepIndexes] índices con estilo apagado
 */
export default function HomeAthleteJourney({
  localizedHref,
  steps = DEFAULT_JOURNEY_STEPS,
  title = "El camino del deportista",
  guideHref = "/como-empezar",
  guideLinkLabel = "Ver guía paso a paso",
  accentStepIndexes = [3],
  mutedStepIndexes = [4, 5],
}) {
  const isAccent = (i) => accentStepIndexes.includes(i);
  const isMuted = (i) => mutedStepIndexes.includes(i);

  return (
    <section className="py-16 md:py-20 overflow-hidden" aria-labelledby="journey-heading">
      <div className="container-redesign">
        <h2
          id="journey-heading"
          className="font-montserrat text-center text-3xl md:text-4xl font-bold text-primary mb-12 md:mb-16"
        >
          {title}
        </h2>
        <div className="relative">
          <div
            className="absolute left-0 top-1/2 hidden h-1 w-full -translate-y-1/2 bg-surface-container-highest md:block z-0"
            aria-hidden
          />
          <div className="relative z-10 grid grid-cols-1 gap-8 md:grid-cols-6 md:gap-4">
            {steps.map((step, i) => {
              const circleClass = isAccent(i)
                ? "bg-secondary text-white border-surface"
                : isMuted(i)
                  ? "bg-surface-container-highest text-on-surface-variant border-surface"
                  : "bg-primary text-white border-surface";
              return (
                <div key={`${step.title}-${i}`} className="flex flex-col items-center text-center">
                  <div
                    className={`mb-4 flex h-16 w-16 items-center justify-center rounded-full border-4 shadow-lg ${circleClass}`}
                  >
                    <span className="material-symbols-outlined" aria-hidden>
                      {step.icon}
                    </span>
                  </div>
                  <h4 className="font-montserrat font-bold text-primary mb-1">{step.title}</h4>
                  <p className="text-xs text-on-surface-variant max-w-[140px]">{step.text}</p>
                </div>
              );
            })}
          </div>
        </div>
        <p className="text-center mt-10">
          <Link
            href={localizedHref(guideHref)}
            className="font-semibold text-secondary hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded"
          >
            {guideLinkLabel}
          </Link>
        </p>
      </div>
    </section>
  );
}
