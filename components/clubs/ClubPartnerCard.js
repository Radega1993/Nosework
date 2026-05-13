import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const PLACEHOLDER = "/images/og-image.jpg";

/**
 * Tarjeta de club del directorio (logo local optimizado o remoto + enlace a contacto).
 */
export default function ClubPartnerCard({ club, contactHref, priority = false }) {
  const initialSrc = club.logoSrc || PLACEHOLDER;
  const isRemote = /^https?:\/\//i.test(club.logoSrc || "");
  const [src, setSrc] = useState(initialSrc);
  const [triedEncodedFallback, setTriedEncodedFallback] = useState(false);

  useEffect(() => {
    setSrc(club.logoSrc || PLACEHOLDER);
    setTriedEncodedFallback(false);
  }, [club.logoSrc]);

  const fallbackEncoded = club.sourceFile ? `/logos/${encodeURIComponent(club.sourceFile)}` : null;

  const handleError = () => {
    if (isRemote) {
      setSrc(PLACEHOLDER);
      return;
    }
    if (fallbackEncoded && !triedEncodedFallback) {
      setTriedEncodedFallback(true);
      setSrc(fallbackEncoded);
      return;
    }
    setSrc(PLACEHOLDER);
  };

  const tags = (club.tags || []).filter((t) => t !== "Colaborador");

  return (
    <article className="bg-white rounded-xl overflow-hidden shadow-soft border border-outline-variant hover:shadow-md transition-shadow group flex flex-col">
      <div className="h-48 relative overflow-hidden bg-surface-container flex items-center justify-center p-4">
        {isRemote ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={`Logo ${club.name}`}
            className="absolute inset-0 w-full h-full object-contain p-3 transition-transform duration-500 group-hover:scale-105"
            onError={handleError}
          />
        ) : (
          <Image
            src={src}
            alt={`Logo ${club.name}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
            priority={priority}
            onError={handleError}
          />
        )}
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
          {tags.slice(0, 4).map((tag) => (
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
