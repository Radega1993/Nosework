import Button from "@/components/Button";

/**
 * CTA ancho completo sobre fondo primary con patrón decorativo.
 */
export default function HomeCommunityCtaSection({
  localizedHref,
  title = "Únete a la comunidad",
  description = "Sé parte de una comunidad apasionada por la detección canina. Participa en eventos, aprende y comparte experiencias.",
  primaryHref = "/como-empezar",
  primaryLabel = "Cómo empezar",
  secondaryHref = "/clubs",
  secondaryLabel = "Buscar mi club más cercano",
}) {
  return (
    <section className="relative overflow-hidden bg-primary py-16 md:py-24">
      <div className="pointer-events-none absolute inset-0 opacity-10" aria-hidden>
        <div className="grid h-full w-full rotate-12 scale-150 grid-cols-6 grid-rows-2 gap-6">
          <div className="rounded-full bg-secondary" />
          <div className="rounded-full bg-secondary" />
          <div className="rounded-full bg-secondary" />
        </div>
      </div>
      <div className="container-redesign relative z-10 text-center">
        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-white mb-4">{title}</h2>
        <p className="text-lg text-white/85 max-w-2xl mx-auto mb-10">{description}</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button href={localizedHref(primaryHref)} variant="accent" size="large" className="rounded-xl text-lg">
            {primaryLabel}
          </Button>
          <Button
            href={localizedHref(secondaryHref)}
            variant="secondary"
            size="large"
            className="rounded-xl border-0 bg-white !text-black text-lg hover:bg-surface hover:!text-black"
          >
            {secondaryLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
