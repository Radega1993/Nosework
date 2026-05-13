import Image from "next/image";

/**
 * Dos columnas: beneficios con iconos + imagen con cita superpuesta.
 */
export default function BenefitsSplitWithQuote({
  title,
  items,
  imageSrc,
  imageAlt,
  quote,
}) {
  return (
    <section className="py-16 md:py-20 bg-surface-container">
      <div className="max-w-container-max mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <h2 className="font-montserrat text-headline-h1 md:text-4xl font-bold text-primary mb-10">{title}</h2>
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.title} className="flex gap-4 p-4 md:p-5 bg-white rounded-lg shadow-soft">
                  <span
                    className="material-symbols-outlined text-secondary shrink-0 text-2xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                    aria-hidden
                  >
                    {item.icon}
                  </span>
                  <div>
                    <h5 className="font-bold text-primary mb-1">{item.title}</h5>
                    <p className="text-on-surface-variant text-body-md leading-relaxed">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-xl aspect-[4/3] w-full max-w-lg mx-auto lg:max-w-none">
              <Image src={imageSrc} alt={imageAlt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
            </div>
            <div className="absolute -bottom-4 -left-2 md:-bottom-6 md:-left-6 bg-secondary p-6 rounded-xl shadow-lg max-w-xs hidden md:block">
              <p className="text-primary font-bold italic leading-snug">&ldquo;{quote}&rdquo;</p>
            </div>
          </div>
        </div>
        <p className="mt-8 md:hidden text-center text-primary font-bold italic px-2">&ldquo;{quote}&rdquo;</p>
      </div>
    </section>
  );
}
