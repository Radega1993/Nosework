import Image from "next/image";
import Button from "./Button";

export default function HeroSection({ backgroundImage }) {
  // Default to optimized WebP hero image if no backgroundImage prop provided
  const imageSrc = backgroundImage || "/images/hero-dog.webp";
  
  return (
    <header className="relative bg-gradient-to-r from-primary-600 to-primary-700 text-white py-20 md:py-24 lg:py-28">
      {/* Background Image */}
      {imageSrc && (
        <div className="absolute inset-0 z-0">
          <Image
            src={imageSrc}
            alt="Perro en acción durante una prueba de Nosework Trial"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black opacity-40"></div>
        </div>
      )}
      
      {/* Overlay for gradient fallback or additional contrast */}
      {!backgroundImage && (
        <div className="absolute inset-0 bg-black opacity-20"></div>
      )}

      {/* Content */}
      <div className="container-custom relative z-10 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          Nosework Trial
        </h1>
        <p className="text-xl md:text-2xl mb-4 font-semibold max-w-3xl mx-auto">
          Deporte de perros detectores y nosework deportivo
        </p>
        <p className="text-lg md:text-xl mb-8 text-primary-50 max-w-2xl mx-auto">
          Una modalidad inclusiva para perros de todas las razas y edades
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            href="/como-empezar" 
            variant="secondary" 
            size="large"
            aria-label="Aprende cómo empezar con Nosework Trial"
          >
            Cómo Empezar
          </Button>
          <Button 
            href="/reglamento" 
            variant="outline" 
            size="large" 
            className="bg-white/10 border-white text-white hover:bg-white hover:text-primary-700"
            aria-label="Ver el reglamento de Nosework Trial"
          >
            Ver Reglamento
          </Button>
        </div>
      </div>
    </header>
  );
}
