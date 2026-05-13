import Image from "next/image";

/**
 * Grid de tarjetas con imagen, badge esquina y texto.
 * @param {Array<{ title: string, description: string, image: string, imageAlt: string, badge: string, badgeClassName: string }>} items
 */
export default function ImageBadgeCardGrid({ items, className = "" }) {
  return (
    <section className={`py-16 md:py-20 max-w-container-max mx-auto px-6 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <article
            key={item.title}
            className="bg-white rounded-xl shadow-sm border border-surface-container overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="h-48 bg-surface-container-high relative">
              <Image
                src={item.image}
                alt={item.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <span
                className={`absolute top-3 right-3 px-3 py-1 rounded-full text-[13px] font-semibold ${item.badgeClassName}`}
              >
                {item.badge}
              </span>
            </div>
            <div className="p-6">
              <h3 className="font-montserrat text-headline-h3 font-semibold text-primary mb-2">{item.title}</h3>
              <p className="text-on-surface-variant text-body-md leading-relaxed">{item.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
