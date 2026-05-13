import Link from "next/link";

export default function ComoEmpezarQuickActions({ items, localizedHref }) {
  return (
    <section className="py-12 bg-primary-container">
      <div className="max-w-container-max mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {items.map((item) => {
            const secondaryTone = item.tone === "secondary";
            return (
              <Link
                key={item.title}
                href={localizedHref(item.href)}
                className={`flex flex-col items-center text-center gap-2 p-6 rounded-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                  secondaryTone
                    ? "bg-secondary text-white hover:shadow-xl hover:-translate-y-1 focus-visible:ring-secondary"
                    : "bg-surface-container-lowest text-primary hover:bg-secondary-container focus-visible:ring-primary"
                }`}
              >
                <span className="material-symbols-outlined text-5xl">{item.icon}</span>
                <span className="font-semibold text-headline-h3">{item.title}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
