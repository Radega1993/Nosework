/**
 * FAQ estática en cajas con borde.
 * @param {string} title
 * @param {Array<{ q: string, a: string }>} items
 */
export default function BorderedFaqList({ title, items }) {
  return (
    <section className="py-16 md:py-20 bg-white border-t border-outline-variant">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="font-montserrat text-headline-h2 md:text-3xl font-bold text-primary text-center mb-10 md:mb-12">
          {title}
        </h2>
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.q} className="border border-outline-variant rounded-lg p-5 md:p-6">
              <h3 className="font-bold text-primary mb-2 text-base md:text-lg">{item.q}</h3>
              <p className="text-on-surface-variant leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
