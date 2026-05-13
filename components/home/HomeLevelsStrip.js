import Button from "@/components/Button";
import { DEFAULT_LEVEL_CARDS } from "./homeDefaults";

/**
 * Franja de tarjetas de niveles / títulos.
 * @param {(path: string) => string} localizedHref
 * @param {Array} [items] mismo shape que DEFAULT_LEVEL_CARDS
 */
export default function HomeLevelsStrip({
  localizedHref,
  items = DEFAULT_LEVEL_CARDS,
  title = "Niveles y títulos",
  intro = "Progresión clara para el binomio, alineada con nuestro reglamento.",
  detailHref = "/niveles-titulos",
  detailLabel = "Ver niveles y títulos",
}) {
  return (
    <section className="py-16 md:py-20" aria-labelledby="levels-heading">
      <div className="container-redesign text-center">
        <h2 id="levels-heading" className="font-montserrat text-3xl md:text-4xl font-bold text-primary mb-3">
          {title}
        </h2>
        <p className="text-on-surface-variant max-w-2xl mx-auto mb-10">{intro}</p>
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {items.map((item) => (
            <div
              key={item.code}
              className={`w-44 rounded-2xl border-b-4 ${item.border} bg-white p-6 text-center shadow-sm transition-transform hover:-translate-y-2 ${
                item.dark ? "bg-primary text-white border-secondary-container" : ""
              }`}
            >
              <div
                className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold ${
                  item.dark ? "bg-[#c3f400] text-primary" : "bg-outline-variant text-primary"
                }`}
              >
                {item.code === "Títulos" ? (
                  <span className="material-symbols-outlined text-primary" aria-hidden>
                    star
                  </span>
                ) : (
                  item.code.slice(0, 3)
                )}
              </div>
              <h4 className={`font-montserrat font-bold ${item.dark ? "text-white" : "text-primary"}`}>
                {item.label}
              </h4>
              <p className={`text-xs mt-2 ${item.dark ? "text-white/80" : "text-on-surface-variant"}`}>{item.sub}</p>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <Button href={localizedHref(detailHref)} variant="outline">
            {detailLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
