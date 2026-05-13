/**
 * Bloque centrado: título, párrafo y pastillas.
 */
export default function AudiencePillsSection({ title, body, pills }) {
  return (
    <section className="py-16 md:py-20 max-w-container-max mx-auto px-6 text-center">
      <h2 className="font-montserrat text-headline-h1 md:text-4xl font-bold text-primary mb-4">{title}</h2>
      <p className="text-on-surface-variant max-w-3xl mx-auto mb-10 text-body-lg leading-relaxed">{body}</p>
      <div className="inline-flex flex-wrap justify-center gap-3">
        {pills.map((label) => (
          <span
            key={label}
            className="bg-surface-container-high px-5 py-2 rounded-full font-bold text-primary text-sm md:text-base"
          >
            {label}
          </span>
        ))}
      </div>
    </section>
  );
}
