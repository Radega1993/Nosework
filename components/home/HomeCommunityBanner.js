import Image from "next/image";
import Link from "next/link";
import { PROPOSAL_PHOTOS } from "@/data/visualProposal";

export default function HomeCommunityBanner({
  localizedHref,
  href = "/about",
  title = "Más que un deporte, una comunidad",
  description = "Cada búsqueda cuenta una historia. Aquí las celebramos todas.",
  ctaLabel = "Conoce la asociación",
}) {
  const photo = PROPOSAL_PHOTOS.homeBanner;

  return (
    <section className="container-redesign py-10 md:py-14" aria-label="Comunidad">
      <div className="relative h-[325px] overflow-hidden rounded-[23px] bg-primary text-white">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          className="object-cover"
          style={{ objectPosition: photo.objectPosition }}
          sizes="(max-width: 1340px) 100vw, 1340px"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-[rgba(10,34,23,0.93)] via-[rgba(10,34,23,0.65)] to-transparent"
          aria-hidden
        />
        <div className="absolute left-6 top-8 z-10 max-w-md md:left-14 md:top-10">
          <span className="proposal-eyebrow !text-[#b8d3c1]">
            <span className="proposal-eyebrow-dot" aria-hidden />
            Comunidad
          </span>
          <h2 className="mt-3 font-display text-[1.9rem] font-medium tracking-tight text-white md:text-[2.3rem]">
            {title}
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-[#d2e1d6]">{description}</p>
          <Link
            href={localizedHref(href)}
            className="mt-4 inline-flex items-center gap-3 rounded-[11px] bg-white px-4 py-3 text-[13px] font-bold text-navy transition hover:bg-mint focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
          >
            {ctaLabel} <span aria-hidden>↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
