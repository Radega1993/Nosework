export default function ComoEmpezarMaterialsGrid({ items }) {
  return (
    <section id="material" className="py-16 md:py-20 bg-surface-bright">
      <div className="max-w-container-max mx-auto px-6">
        <h2 className="font-montserrat text-headline-h1 font-bold text-primary mb-10 text-center">Material basico</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {items.map((item) => (
            <article
              key={item.title}
              className="bg-white p-4 rounded-xl shadow-sm border border-surface-container hover:shadow-md transition-shadow flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 bg-surface-container-low rounded-full flex items-center justify-center mb-3">
                <span className="material-symbols-outlined text-primary text-display">{item.icon}</span>
              </div>
              <h3 className="font-semibold text-headline-h3 text-primary">{item.title}</h3>
              <p className="text-on-surface-variant text-label-caps mt-1">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
