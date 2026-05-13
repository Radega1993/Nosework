import Link from "next/link";
import Image from "next/image";
import { DEFAULT_NEWS_CARDS } from "./homeDefaults";

/**
 * Grid de tarjetas tipo noticia (enlace + imagen + texto).
 * `items[].href` sin prefijo idioma; se pasa por localizedHref.
 */
export default function HomeNewsCards({
  localizedHref,
  items = DEFAULT_NEWS_CARDS,
  title = "Noticias y actualidad",
}) {
  return (
    <section className="bg-surface py-16 md:py-20" aria-labelledby="news-heading">
      <div className="container-redesign">
        <h2 id="news-heading" className="font-montserrat text-2xl md:text-3xl font-bold text-primary mb-10">
          {title}
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {items.map((item) => (
            <Link
              key={item.title}
              href={localizedHref(item.href)}
              className="group flex flex-col overflow-hidden rounded-2xl border border-outline-variant bg-white shadow-sm transition-shadow hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6 text-left">
                <span className="text-xs font-bold uppercase tracking-widest text-secondary">{item.tag}</span>
                <h3 className="font-montserrat mt-2 mb-3 text-lg font-semibold text-primary transition-colors group-hover:text-secondary">
                  {item.title}
                </h3>
                <p className="text-sm text-on-surface-variant line-clamp-2">{item.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
