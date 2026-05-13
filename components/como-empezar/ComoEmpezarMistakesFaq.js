export default function ComoEmpezarMistakesFaq({ mistakes, faqItems }) {
  return (
    <section className="py-16 md:py-20 max-w-container-max mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          <h2 className="font-montserrat text-headline-h1 font-bold text-primary mb-6">Errores comunes</h2>
          <ul className="space-y-4">
            {mistakes.map((item) => (
              <li
                key={item.title}
                className="flex items-start gap-3 bg-white p-4 rounded-lg border-l-4 border-error shadow-sm"
              >
                <span className="material-symbols-outlined text-error mt-1">warning</span>
                <div>
                  <h3 className="font-semibold text-primary">{item.title}</h3>
                  <p className="text-on-surface-variant">{item.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-montserrat text-headline-h1 font-bold text-primary mb-6">Preguntas frecuentes</h2>
          <div className="space-y-2">
            {faqItems.map((item) => (
              <details key={item.question} className="group bg-surface-container-low rounded-xl p-4">
                <summary className="flex justify-between items-center font-semibold text-primary cursor-pointer list-none">
                  {item.question}
                  <span className="material-symbols-outlined transition-transform group-open:rotate-180">
                    expand_more
                  </span>
                </summary>
                <p className="mt-3 text-on-surface-variant">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
