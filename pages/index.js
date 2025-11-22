import Head from "next/head";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import Calendar from "react-calendar";
import { useEffect, useState } from "react";
import "react-calendar/dist/Calendar.css";

export default function Home() {
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

  return (
    <>
      {/* SEO Optimization */}
      <Head>
        <title>Nosework Trial – Deporte de perros detectores y olfato canino</title>
        <meta
          name="description"
          content="Descubre Nosework Trial, la modalidad deportiva para perros detectores y trabajo de olfato. Pruebas oficiales, reglamento, calendario de competiciones y clubs en España."
        />
        <meta
          name="keywords"
          content="nosework trial, deporte perros detectores, nosework deportivo, deporte olfato canino, detección deportiva perros"
        />
        <meta name="author" content="Nosework Trial Community" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="Nosework Trial – Deporte de perros detectores y olfato canino" />
        <meta
          property="og:description"
          content="Descubre Nosework Trial, la modalidad deportiva para perros detectores y trabajo de olfato."
        />
        <meta property="og:image" content="/images/og-image.jpg" />
        <meta property="og:url" content="https://www.noseworktrialcommunity.com" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://www.noseworktrialcommunity.com" />
      </Head>

      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SportsOrganization",
            "name": "Nosework Trial Community",
            "description": "Organización deportiva de Nosework Trial en España",
            "url": "https://www.noseworktrialcommunity.com",
            "sport": "Nosework Trial"
          })
        }}
      />

      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <header className="relative bg-gradient-to-r from-primary-600 to-primary-700 text-white py-20 md:py-24 lg:py-28">
        <div className="absolute inset-0 bg-black opacity-20"></div>
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
            <Button href="/como-empezar" variant="secondary" size="large">
              Cómo Empezar
            </Button>
            <Button href="/reglamento" variant="outline" size="large" className="bg-white/10 border-white text-white hover:bg-white hover:text-primary-700">
              Ver Reglamento
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="section">
        <div className="container-custom space-y-16">
          {/* Explicación Corta */}
          <section className="card text-center max-w-4xl mx-auto">
            <h2 className="text-h2 font-bold mb-6 text-gray-900">¿Qué es Nosework Trial?</h2>
            <p className="text-body-lg text-gray-700 mb-4">
              Nosework Trial es una modalidad deportiva que combina la detección deportiva y el nosework tradicional,
              creando un deporte inclusivo y accesible para todos los perros y sus guías. A diferencia de otras modalidades
              como la detección deportiva FEPDE o el nosework clásico, Nosework Trial se centra en el disfrute, el
              aprendizaje y el bienestar del perro.
            </p>
            <p className="text-body-lg text-gray-700 mb-8">
              Este deporte permite que perros de todas las razas, edades y niveles de experiencia puedan participar y
              desarrollar sus habilidades olfativas de forma estructurada y divertida.
            </p>
            <Button href="/que-es-nosework-trial" variant="primary">
              Saber Más
            </Button>
          </section>

          {/* Próximos Eventos */}
          <section className="section-alt">
            <div className="container-custom">
              <div className="text-center mb-12">
                <h2 className="text-h2 font-bold mb-4 text-gray-900">Próximos Eventos</h2>
                <p className="text-body-lg text-gray-600 max-w-2xl mx-auto">
                  ¡Consulta nuestro calendario para no perderte los próximos eventos y pruebas!
                </p>
              </div>
              <div className="flex justify-center mb-8">
                <div className="card-bordered max-w-md">
                  <Calendar
                    onChange={handleDateChange}
                    value={selectedDate}
                    className="rounded-lg"
                    tileContent={({ date }) =>
                      events.some(
                        (e) => new Date(e.date).toDateString() === date.toDateString()
                      ) && (
                        <div className="w-2 h-2 bg-primary-500 rounded-full mx-auto mt-1"></div>
                      )
                    }
                  />
                </div>
              </div>

              {selectedDate && (
                <div className="text-center mb-8">
                  <h3 className="text-h3 font-bold mb-6 text-gray-900">
                    Eventos para {selectedDate.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </h3>
                  {selectedEvents.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                      {selectedEvents.map((event) => (
                        <div key={event.id} className="card text-left">
                          <h4 className="text-h4 font-bold mb-2 text-primary-600">{event.title}</h4>
                          <p className="text-gray-700">{event.description}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600">No hay eventos para esta fecha.</p>
                  )}
                </div>
              )}
              <div className="text-center">
                <Button href="/events" variant="primary">
                  Ver Todos los Eventos
                </Button>
              </div>
            </div>
          </section>

          {/* Filosofía NTC */}
          <section className="section">
            <div className="container-custom">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-h2 font-bold mb-6 text-gray-900">Nuestra Filosofía</h2>
                <p className="text-body-lg text-gray-700 mb-8">
                  La originalidad y el aprendizaje son el núcleo de nuestras actividades. Damos
                  la bienvenida a todos los guías y perros, sin importar su experiencia.
                </p>
                <div className="rounded-xl overflow-hidden shadow-lg">
                  <img
                    src="/images/philosophy.jpg"
                    alt="Perro en acción durante una prueba"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Únete a la Comunidad */}
          <section className="section-alt">
            <div className="container-custom">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-h2 font-bold mb-6 text-gray-900">Únete a la Comunidad</h2>
                <p className="text-body-lg text-gray-700 mb-8">
                  Sé parte de una comunidad apasionada por la detección canina. Participa en
                  eventos, aprende y comparte experiencias únicas.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button href="/como-empezar" variant="primary">
                    Cómo Empezar
                  </Button>
                  <Button href="/contact" variant="secondary">
                    Contactar
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Patrocinadores */}
          <section className="section">
            <div className="container-custom">
              <div className="card text-center max-w-2xl mx-auto">
                <h2 className="text-h2 font-bold mb-4 text-gray-900">Patrocinadores y Partners</h2>
                <p className="text-body-lg text-gray-600 mb-4">
                  Próximamente anunciaremos nuestros patrocinadores y partners oficiales.
                </p>
                <p className="text-body-sm text-gray-500">
                  ¿Interesado en patrocinar?{" "}
                  <Link href="/contact" className="text-primary-600 hover:text-primary-700 font-semibold">
                    Contáctanos
                  </Link>
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
