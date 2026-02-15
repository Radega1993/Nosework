import Image from "next/image";
import Button from "./Button";

const DEFAULT_OVERLAY_OPACITY = 0.55;

export default function HeroSection({
    title = "Nosework Trial",
    subtitle = "Deporte de perros detectores y nosework deportivo",
    description = "Una modalidad inclusiva para perros de todas las razas y edades",
    backgroundImage,
    overlay = DEFAULT_OVERLAY_OPACITY,
    primaryCTA = { href: "/como-empezar", label: "Cómo Empezar", ariaLabel: "Aprende cómo empezar con Nosework Trial" },
    secondaryCTA = { href: "/reglamento", label: "Ver Reglamento", ariaLabel: "Ver el reglamento de Nosework Trial" },
}) {
    const imageSrc = backgroundImage || "/images/hero-dog.webp";

    return (
        <header
            className="relative w-full min-h-[85vh] flex flex-col justify-center text-white"
            role="banner"
        >
            {/* Background image - full width, cover */}
            {imageSrc && (
                <div className="absolute inset-0 z-0">
                    <Image
                        src={imageSrc}
                        alt="Perro en acción durante una prueba de Nosework Trial"
                        fill
                        priority
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
                    />
                    <div
                        className="absolute inset-0 bg-black"
                        style={{ opacity: overlay }}
                        aria-hidden
                    />
                </div>
            )}

            {/* Content - left aligned, 24px spacing */}
            <div className="container-redesign relative z-10 text-left">
                <h1 className="text-h1-redesign-mobile md:text-h1-redesign font-bold mb-6 max-w-3xl">
                    {title}
                </h1>
                <p className="text-xl md:text-2xl font-semibold mb-6 max-w-2xl">
                    {subtitle}
                </p>
                {description && (
                    <p className="text-lg md:text-xl text-white/90 mb-6 max-w-xl">
                        {description}
                    </p>
                )}
                <div className="flex flex-col sm:flex-row gap-6">
                    {primaryCTA && (
                        <Button
                            href={primaryCTA.href}
                            variant="primary"
                            size="large"
                            aria-label={primaryCTA.ariaLabel || primaryCTA.label}
                        >
                            {primaryCTA.label}
                        </Button>
                    )}
                    {secondaryCTA && (
                        <Button
                            href={secondaryCTA.href}
                            variant="secondary"
                            size="large"
                            aria-label={secondaryCTA.ariaLabel || secondaryCTA.label}
                        >
                            {secondaryCTA.label}
                        </Button>
                    )}
                </div>
            </div>
        </header>
    );
}
