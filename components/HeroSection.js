import Image from "next/image";
import Link from "next/link";
import Button from "./Button";

const DEFAULT_OVERLAY_OPACITY = 0.55;

/**
 * @param {'default' | 'interior' | 'compact'} [layout] interior = FDDN interior; compact = hero ~400px
 * @param {'multiply' | 'soft'} [compactOverlay] solo layout compact: multiply (default) o soft (bg-primary/40, p. ej. calendario)
 * @param {'left' | 'center'} [align] alineación del bloque de texto
 * @param {boolean} [showActions] mostrar fila de CTAs (por defecto true salvo layout compact, que usa false)
 */
export default function HeroSection({
    title = "Federación de Detección Deportiva Nosework",
    subtitle = "El deporte canino donde perro y guía trabajan juntos para localizar olores en entornos reales, seguros y progresivos.",
    description = "",
    backgroundImage,
    overlay = DEFAULT_OVERLAY_OPACITY,
    primaryCTA = { href: "/como-empezar", label: "Empezar en Nosework", ariaLabel: "Aprende cómo empezar con Nosework Trial" },
    secondaryCTA = { href: "/eventos", label: "Ver próximas pruebas", ariaLabel: "Ver el calendario de pruebas" },
    tertiaryCTA = null,
    eyebrow,
    layout = "default",
    primaryCtaShowIcon = true,
    showActions,
    compactOverlay = "multiply",
    align = "left",
}) {
    const imageSrc = backgroundImage || "/images/hero-dog.webp";
    const isInterior = layout === "interior";
    const isCompact = layout === "compact";
    const showCtas = showActions ?? !isCompact;

    return (
        <header
            className={
                isCompact
                    ? "relative w-full min-h-[400px] pt-20 flex flex-col justify-center text-white overflow-hidden"
                    : isInterior
                      ? "relative w-full min-h-[560px] md:min-h-[600px] pt-20 flex flex-col justify-center text-white overflow-hidden"
                      : "relative w-full min-h-[85vh] pt-20 flex flex-col justify-center text-white overflow-hidden"
            }
            role="banner"
        >
            {imageSrc && (
                <div className="absolute inset-0 z-0">
                    <Image
                        src={imageSrc}
                        alt="Perro en acción durante una prueba de Nosework Trial"
                        fill
                        priority
                        className={isInterior ? "object-cover opacity-60" : "object-cover"}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
                    />
                    {isInterior ? (
                        <div
                            className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent"
                            aria-hidden
                        />
                    ) : isCompact ? (
                        compactOverlay === "soft" ? (
                            <div className="absolute inset-0 bg-primary/40" aria-hidden />
                        ) : (
                            <div className="absolute inset-0 bg-primary/60 mix-blend-multiply" aria-hidden />
                        )
                    ) : (
                        <div
                            className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/40 to-transparent"
                            style={{ opacity: overlay }}
                            aria-hidden
                        />
                    )}
                </div>
            )}

            <div
                className={`container-redesign relative z-10 max-w-container-max mx-auto w-full ${
                    align === "center" ? "text-center" : "text-left"
                }`}
            >
                {eyebrow && (
                    <span
                        className={`inline-block bg-secondary text-on-secondary px-3 py-1 rounded-full text-[13px] font-semibold mb-4 ${
                            align === "center" ? "mx-auto" : ""
                        }`}
                    >
                        {eyebrow}
                    </span>
                )}
                <h1
                    className={`font-montserrat text-4xl md:text-[2.5rem] lg:text-display font-bold leading-tight tracking-tight mb-6 text-white ${
                        align === "center" ? "max-w-3xl mx-auto" : "max-w-3xl"
                    }`}
                >
                    {title}
                </h1>
                <p
                    className={
                        isInterior
                            ? `text-body-lg mb-8 max-w-2xl text-on-primary-container leading-relaxed ${
                                  align === "center" ? "mx-auto" : ""
                              }`
                            : isCompact
                              ? `text-body-lg mt-2 max-w-2xl text-white/90 leading-relaxed mb-0 ${
                                    align === "center" ? "mx-auto" : ""
                                }`
                              : `text-lg md:text-xl mb-8 max-w-2xl text-white/85 leading-relaxed ${
                                    align === "center" ? "mx-auto" : ""
                                }`
                    }
                >
                    {subtitle}
                </p>
                {description && (
                    <p className="text-lg md:text-xl text-white/90 mb-6 max-w-xl">
                        {description}
                    </p>
                )}
                {showCtas && (
                <div
                    className={`flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-4 ${
                        align === "center" ? "justify-center" : ""
                    }`}
                >
                    {primaryCTA && (
                        <Button
                            href={primaryCTA.href}
                            variant={isInterior ? "secondary" : "accent"}
                            size="large"
                            className={
                                isInterior
                                    ? "inline-flex items-center justify-center gap-2 rounded-lg !border-0 !bg-secondary !text-on-secondary shadow-md hover:!bg-secondary hover:!text-on-secondary hover:!brightness-110 focus-visible:ring-white focus-visible:ring-offset-primary"
                                    : "inline-flex items-center justify-center gap-2 rounded-xl"
                            }
                            aria-label={primaryCTA.ariaLabel || primaryCTA.label}
                        >
                            {primaryCTA.label}
                            {!isInterior && primaryCtaShowIcon && (
                                <span className="material-symbols-outlined text-xl" aria-hidden>
                                    arrow_forward
                                </span>
                            )}
                        </Button>
                    )}
                    {secondaryCTA && (
                        <Button
                            href={secondaryCTA.href}
                            variant="secondary"
                            size="large"
                            aria-label={secondaryCTA.ariaLabel || secondaryCTA.label}
                            className={
                                isInterior
                                    ? "rounded-lg border-2 border-white text-white bg-transparent hover:bg-white hover:text-primary"
                                    : "rounded-xl border border-white/20 bg-white/10 backdrop-blur-md hover:bg-white/20"
                            }
                        >
                            {secondaryCTA.label}
                        </Button>
                    )}
                    {tertiaryCTA?.href && (
                        <Link
                            href={tertiaryCTA.href}
                            className="font-bold text-white underline underline-offset-4 decoration-white/60 hover:text-secondary-container hover:decoration-secondary-container transition-colors px-1 py-3 sm:py-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary-container focus-visible:ring-offset-2 focus-visible:ring-offset-primary rounded"
                            aria-label={tertiaryCTA.ariaLabel || tertiaryCTA.label}
                        >
                            {tertiaryCTA.label}
                        </Link>
                    )}
                </div>
                )}
            </div>
        </header>
    );
}
