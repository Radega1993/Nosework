import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

/**
 * Tarjeta de club del directorio (logo optimizado WebP + enlace a contacto).
 */
export default function ClubPartnerCard({ club, contactHref, priority = false }) {
  const [useFallback, setUseFallback] = useState(false);
  const encodedPath = `/logos/${encodeURIComponent(club.sourceFile)}`;
  const src = useFallback ? encodedPath : club.logoSrc;

  return (
    <article className="bg-white rounded-xl overflow-hidden shadow-soft border border-outline-variant hover:shadow-md transition-shadow group flex flex-col">
      <div className="h-48 relative overflow-hidden bg-surface-container flex items-center justify-center p-4">
        <Image
          src={src}
          alt={`Logo ${club.name}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
          priority={priority}
          onError={() => setUseFallback(true)}
        />
        {club.badge && (
          <div className="absolute top-3 right-3 bg-secondary text-on-secondary px-3 py-1 rounded-full text-[13px] font-semibold max-w-[70%] truncate">
            {club.badge}
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-montserrat text-lg font-semibold text-primary mb-1">{club.name}</h3>
        <p className="text-on-surface-variant text-sm flex items-center gap-1 mb-3">
          <span className="material-symbols-outlined text-lg shrink-0" aria-hidden>
            location_on
          </span>
          {club.city && club.province
            ? `${club.city}, ${club.province}`
            : club.province
              ? club.province
              : "Ubicación por confirmar"}
        </p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {club.tags
            .filter((t) => t !== "Colaborador")
            .slice(0, 4)
            .map((tag) => (
              <span
                key={tag}
                className="bg-surface-container text-on-surface-variant px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wide"
              >
                {tag}
              </span>
            ))}
        </div>
        <Link
          href={contactHref}
          className="mt-auto w-full border-2 border-primary text-primary font-bold py-2.5 rounded-lg text-center hover:bg-primary hover:text-on-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
        >
          Ver club
        </Link>
      </div>
    </article>
  );
}
