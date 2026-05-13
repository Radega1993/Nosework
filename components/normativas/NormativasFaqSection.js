import { useState } from "react";

export default function NormativasFaqSection({ title, items }) {
  const [openId, setOpenId] = useState(null);

  return (
    <section className="max-w-container-max mx-auto px-6 pb-6 md:pb-10">
      <div className="bg-white border border-outline-variant rounded-xl shadow-lg p-6 md:p-10">
        <h2 className="font-montserrat text-2xl md:text-3xl font-semibold text-primary text-center mb-8">{title}</h2>
        <div className="space-y-3 max-w-3xl mx-auto">
          {items.map((item) => {
            const expanded = openId === item.id;
            return (
              <div key={item.id} className="border border-outline-variant rounded-lg overflow-hidden">
                <button
                  type="button"
                  id={`faq-trigger-${item.id}`}
                  aria-expanded={expanded}
                  aria-controls={`faq-panel-${item.id}`}
                  onClick={() => setOpenId(expanded ? null : item.id)}
                  className="w-full flex items-center justify-between gap-4 text-left px-4 py-4 bg-surface-container-low hover:bg-surface-container transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-secondary"
                >
                  <span className="font-montserrat font-semibold text-primary pr-2">{item.question}</span>
                  <span className="material-symbols-outlined text-primary shrink-0 transition-transform" style={{ transform: expanded ? "rotate(180deg)" : undefined }} aria-hidden>
                    expand_more
                  </span>
                </button>
                <div
                  id={`faq-panel-${item.id}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${item.id}`}
                  hidden={!expanded}
                  className="px-4 pb-4 border-t border-outline-variant/60 bg-white"
                >
                  <p className="text-on-surface-variant text-sm md:text-base leading-relaxed pt-4">{item.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
