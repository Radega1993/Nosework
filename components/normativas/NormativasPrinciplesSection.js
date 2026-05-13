export default function NormativasPrinciplesSection({ title, intro, items }) {
  return (
    <section className="max-w-container-max mx-auto px-6">
      <div className="bg-white border border-outline-variant rounded-xl shadow-lg p-6 md:p-10">
        <h2 className="font-montserrat text-2xl md:text-3xl font-semibold text-primary text-center mb-6">{title}</h2>
        <p className="text-on-surface-variant text-center mb-8 max-w-2xl mx-auto leading-relaxed">{intro}</p>
        <ul className="space-y-4 list-disc pl-6 md:pl-8 text-on-surface-variant max-w-3xl mx-auto leading-relaxed">
          {items.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
