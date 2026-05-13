import Image from "next/image";

export default function NormativasHero({ hero }) {
  return (
    <section className="max-w-container-max mx-auto px-6 pt-6 md:pt-8">
      <div className="relative h-[320px] md:h-[400px] rounded-xl overflow-hidden shadow-xl flex items-center px-6 md:px-10">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-dog.webp"
            alt="Perro en prueba de detección deportiva"
            fill
            className="object-cover brightness-[0.45]"
            sizes="(max-width: 1280px) 100vw, 1280px"
            priority
          />
        </div>
        <div className="relative z-10 max-w-2xl text-white">
          <h1 className="font-montserrat text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight mb-4">
            {hero.title}
          </h1>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed">{hero.subtitle}</p>
        </div>
      </div>
    </section>
  );
}
