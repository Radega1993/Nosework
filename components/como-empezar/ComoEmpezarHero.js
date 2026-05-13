import Image from "next/image";
import Button from "@/components/Button";

export default function ComoEmpezarHero({ hero, startHref, rulesHref }) {
  return (
    <section className="relative min-h-[520px] md:min-h-[600px] flex items-center overflow-hidden bg-primary">
      <div className="absolute inset-0 z-0">
        <Image
          src={hero.imageSrc}
          alt={hero.imageAlt}
          fill
          className="object-cover opacity-45"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/85 to-transparent" />
      </div>

      <div className="relative z-10 max-w-container-max mx-auto px-6 w-full">
        <div className="max-w-2xl">
          <h1 className="font-montserrat text-display font-bold text-white mb-4">{hero.title}</h1>
          <p className="text-body-lg text-white/85 mb-8">{hero.subtitle}</p>
          <div className="flex flex-wrap gap-4">
            <Button href={startHref} variant="primary">
              {hero.primaryCtaLabel}
            </Button>
            <Button
              href={rulesHref}
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-primary"
            >
              {hero.secondaryCtaLabel}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
