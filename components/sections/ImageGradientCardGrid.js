import Image from "next/image";

/**
 * Grid de tarjetas con imagen, hover scale y título sobre gradiente.
 * @param {{ title: string, intro?: string }} heading
 * @param {Array<{ title: string, image: string, imageAlt: string }>} items
 */
export default function ImageGradientCardGrid({ heading, items }) {
  return (
    <section className="py-16 md:py-20 max-w-container-max mx-auto px-6">
      <div className="mb-10">
        <h2 className="font-montserrat text-headline-h1 md:text-4xl font-bold text-primary mb-3">{heading.title}</h2>
        {heading.intro && <p className="text-on-surface-variant text-body-lg max-w-2xl">{heading.intro}</p>}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item.title}
            className="group relative overflow-hidden rounded-xl h-64 shadow-soft hover:shadow-hover transition-shadow"
          >
            <Image
              src={item.image}
              alt={item.imageAlt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent p-6 flex flex-col justify-end pointer-events-none">
              <h4 className="text-white font-montserrat font-bold text-headline-h3">{item.title}</h4>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
