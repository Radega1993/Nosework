/**
 * Grid de tarjetas con icono circular (estilo pilares FDDN).
 * @param {{ title: string, intro?: string }} heading
 * @param {Array<{ icon: string, title: string, text: string }>} items
 */
export default function IconFeatureGrid({ heading, items }) {
  return (
    <section className="py-16 md:py-20 max-w-container-max mx-auto px-6">
      <div className="text-center mb-12 md:mb-16">
        <h2 className="font-montserrat text-headline-h1 md:text-4xl font-bold text-primary mb-3">{heading.title}</h2>
        {heading.intro && (
          <p className="text-on-surface-variant max-w-2xl mx-auto text-body-lg">{heading.intro}</p>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {items.map((item) => (
          <div
            key={item.title}
            className="bg-white p-8 rounded-xl shadow-soft hover:shadow-hover transition-shadow"
          >
            <div className="w-16 h-16 bg-secondary-container rounded-full flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-primary text-4xl" aria-hidden>
                {item.icon}
              </span>
            </div>
            <h3 className="font-montserrat text-headline-h2 font-semibold text-primary mb-3">{item.title}</h3>
            <p className="text-on-surface-variant leading-relaxed">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
