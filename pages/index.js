import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Section from "@/components/Section";
import HeroSection from "@/components/HeroSection";
import SEOHead from "@/components/SEOHead";
import { getSportsOrganizationSchema } from "@/utils/seo";
import { useLocalizedLink } from "@/hooks/useLocalizedLink";
import Calendar from "react-calendar";
import { useEffect, useState } from "react";
import "react-calendar/dist/Calendar.css";

// Lazy load FeaturedEvents component to reduce initial bundle size
const FeaturedEvents = dynamic(() => import("@/components/FeaturedEvents"), {
  ssr: false, // Client-side only since it uses useEffect for data fetching
});

export default function Home() {
  const { localizedHref } = useLocalizedLink();
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState([]);

  // Obtener todos los eventos desde la API al cargar la página
  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch("/api/events");
        const data = await response.json();
        setEvents(data.events || []);
      } catch (error) {
        console.error("Error al cargar eventos:", error);
      }
    }
    fetchEvents();
  }, []);

  // Manejar cambio de fecha en el calendario
  const handleDateChange = (date) => {
    setSelectedDate(date);
    const filteredEvents = events.filter(
      (e) => new Date(e.date).toDateString() === date.toDateString()
    );
    setSelectedEvents(filteredEvents);
  };

  // Generate Schema.org SportsOrganization with complete fields
  const sportsOrganizationSchema = getSportsOrganizationSchema();

  return (
    <>
      {/* SEO Optimization */}
      <SEOHead
        title="Nosework Trial – Deporte de olfato canino"
        description="Descubre Nosework Trial, la modalidad deportiva para perros detectores y trabajo de olfato. Pruebas oficiales, reglamento, calendario de competiciones y clubs en España."
        canonical="/"
        ogImage="/images/og-image.jpg"
        schema={sportsOrganizationSchema}
        additionalMeta={{
          keywords:
            "nosework trial, deporte perros detectores, nosework deportivo, deporte olfato canino, detección deportiva perros",
          author: "Nosework Trial Community",
        }}
      />

      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Main cards: Qué es, Cómo Empezar, Eventos — 6.1, 6.2 */}
      <Section background="white" padding="lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card
            image="/images/hero-dog.webp"
            title="¿Qué es Nosework Trial?"
            description="Modalidad deportiva inclusiva para perros detectores y trabajo de olfato. Conoce las bases y el reglamento."
            link={localizedHref("/que-es-nosework-trial")}
          />
          <Card
            image="/images/hero-dog.webp"
            title="Cómo Empezar"
            description="Guía práctica para comenzar: clubs, formación y primeros pasos en Nosework Trial."
            link={localizedHref("/como-empezar")}
          />
          <Card
            image="/images/hero-dog.webp"
            title="Eventos"
            description="Próximas pruebas y competiciones. Consulta fechas, sedes e inscripciones."
            link={localizedHref("/eventos")}
          />
        </div>
      </Section>

      {/* Featured Events — 6.4, 6.5 */}
      <FeaturedEvents />

      {/* Main Content */}
      <main>
        <div className="space-y-0">
          {/* About 50/50 — 6.3 */}
          <Section background="light" padding="lg">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-h2-redesign font-bold text-neutral-text-dark mb-6">¿Qué es Nosework Trial?</h2>
                <p className="text-body-redesign-lg text-neutral-text-medium mb-6">
                  Nosework Trial es una modalidad deportiva que combina la detección deportiva y el nosework tradicional,
                  creando un deporte inclusivo y accesible para todos los perros y sus guías. Se centra en el disfrute,
                  el aprendizaje y el bienestar del perro.
                </p>
                <p className="text-body-redesign text-neutral-text-medium mb-8">
                  Perros de todas las razas, edades y niveles pueden participar y desarrollar sus habilidades olfativas
                  de forma estructurada y divertida.
                </p>
                <Button href={localizedHref("/que-es-nosework-trial")} variant="outline">
                  Saber más
                </Button>
              </div>
              <div className="relative rounded-xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
                <Image
                  src="/images/philosophy.jpg"
                  alt="Perro en acción durante una prueba de Nosework Trial"
                  width={600}
                  height={400}
                  className="object-cover w-full h-auto"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </Section>

          {/* Calendario de eventos */}
          <Section background="white" padding="lg">
            <div className="text-center mb-12">
              <h2 className="text-h2-redesign font-bold text-neutral-text-dark mb-4">Calendario de eventos</h2>
              <p className="text-body-redesign-lg text-neutral-text-medium max-w-2xl mx-auto">
                Consulta el calendario para no perderte los próximos eventos y pruebas.
              </p>
            </div>
            <div className="flex justify-center mb-8">
              <div className="border border-neutral-border rounded-lg p-4 bg-white max-w-md">
                <Calendar
                  onChange={handleDateChange}
                  value={selectedDate}
                  className="rounded-lg"
                  tileContent={({ date }) =>
                    events.some(
                      (e) => new Date(e.date).toDateString() === date.toDateString()
                    ) && (
                      <div className="w-2 h-2 bg-gold rounded-full mx-auto mt-1" aria-hidden />
                    )
                  }
                />
              </div>
            </div>
            {selectedDate && (
              <div className="text-center mb-8">
                <h3 className="text-h3-redesign font-bold text-neutral-text-dark mb-6">
                  Eventos para {selectedDate.toLocaleDateString("es-ES", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
                </h3>
                {selectedEvents.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {selectedEvents.map((event) => (
                      <div key={event.id} className="bg-white rounded-lg p-6 shadow-[0_10px_30px_rgba(0,0,0,0.08)] text-left">
                        <h4 className="text-lg font-semibold text-navy mb-2">{event.title}</h4>
                        <p className="text-neutral-text-medium">{event.description}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-neutral-text-medium">No hay eventos para esta fecha.</p>
                )}
              </div>
            )}
            <div className="text-center">
              <Button href={localizedHref("/eventos")} variant="primary">
                Ver todos los eventos
              </Button>
            </div>
          </Section>

          {/* Únete a la Comunidad */}
          <Section background="light" padding="lg">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-h2-redesign font-bold text-neutral-text-dark mb-6">Únete a la Comunidad</h2>
              <p className="text-body-redesign-lg text-neutral-text-medium mb-8">
                Sé parte de una comunidad apasionada por la detección canina. Participa en eventos, aprende y comparte experiencias.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button href={localizedHref("/como-empezar")} variant="primary">
                  Cómo Empezar
                </Button>
                <Button href={localizedHref("/contact")} variant="dark">
                  Contactar
                </Button>
              </div>
            </div>
          </Section>

          {/* Partners — 6.6 opcional */}
          <Section background="white" padding="lg" className="border-t border-neutral-border">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-h2-redesign font-bold text-neutral-text-dark mb-4">Patrocinadores y Partners</h2>
              <p className="text-body-redesign text-neutral-text-medium mb-4">
                Próximamente anunciaremos nuestros patrocinadores y partners oficiales.
              </p>
              <p className="text-body-redesign text-neutral-text-medium">
                ¿Interesado en patrocinar?{" "}
                <Link href={localizedHref("/contact")} className="text-gold hover:text-gold-hover font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 rounded">
                  Contáctanos
                </Link>
              </p>
            </div>
          </Section>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
