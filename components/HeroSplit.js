import Image from "next/image";
import Link from "next/link";

/**
 * Hero de dos columnas (propuesta visual): texto a la izquierda, foto a la derecha sin overlay sobre caras.
 */
export default function HeroSplit({
  eyebrow = "Bienestar · Detección · Comunidad",
  title,
  description,
  imageSrc,
  imageAlt = "",
  objectPosition = "50% 50%",
  primaryCTA,
  secondaryCTA,
  micro,
  compact = false,
}) {
  return (
    <header className="bg-surface pt-24 pb-8 md:pt-28 md:pb-10" role="banner">
      <div className="container-redesign">
        <div
          className={`grid overflow-hidden rounded-[27px] border border-[#e3ebe2] bg-mint ${
            compact
              ? "md:grid-cols-[61%_39%] md:min-h-[325px]"
              : "md:grid-cols-[45%_55%] md:min-h-[550px]"
          }`}
        >
          <div
            className={`flex flex-col justify-center ${
              compact ? "px-6 py-10 md:px-12 md:py-12" : "px-7 py-12 md:px-12 lg:px-[49px] md:py-[70px]"
            }`}
          >
            {eyebrow ? (
              <span className="proposal-eyebrow">
                <span className="proposal-eyebrow-dot" aria-hidden />
                {eyebrow}
              </span>
            ) : null}
            <h1
              className={`font-display font-medium tracking-tight text-navy ${
                compact
                  ? "mt-4 text-[2.2rem] leading-[1.07] md:text-[3.2rem]"
                  : "mt-6 text-[2.6rem] leading-[1.07] md:text-[3.5rem] lg:text-[4.25rem]"
              }`}
            >
              {title}
            </h1>
            {description ? (
              <p
                className={`mt-5 max-w-xl text-[16px] leading-[1.75] text-[#52675c] md:text-[17px] ${
                  compact ? "mt-4" : ""
                }`}
              >
                {description}
              </p>
            ) : null}
            {(primaryCTA || secondaryCTA) && (
              <div className="mt-7 flex flex-wrap gap-3">
                {primaryCTA ? (
                  <Link
                    href={primaryCTA.href}
                    className="inline-flex items-center justify-between gap-4 rounded-[11px] bg-primary px-[18px] py-3.5 text-[13px] font-bold text-white transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
                    aria-label={primaryCTA.ariaLabel || primaryCTA.label}
                  >
                    {primaryCTA.label}
                    <span aria-hidden>↗</span>
                  </Link>
                ) : null}
                {secondaryCTA ? (
                  <Link
                    href={secondaryCTA.href}
                    className="inline-flex items-center justify-between gap-4 rounded-[11px] border border-[#cbdcce] bg-white px-[18px] py-3.5 text-[13px] font-bold text-[#284f3d] transition hover:bg-mint focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
                    aria-label={secondaryCTA.ariaLabel || secondaryCTA.label}
                  >
                    {secondaryCTA.label}
                    <span aria-hidden>↗</span>
                  </Link>
                ) : null}
              </div>
            )}
            {micro ? (
              <p className="mt-9 text-[10px] font-extrabold tracking-[0.1em] text-[#64826c]">{micro}</p>
            ) : null}
          </div>
          <div className={`relative min-h-[280px] ${compact ? "md:min-h-full" : "md:min-h-[550px]"}`}>
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              priority
              className="object-cover"
              style={{ objectPosition }}
              sizes="(max-width: 768px) 100vw, 55vw"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
