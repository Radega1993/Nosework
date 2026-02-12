import { useEffect, useState } from "react";
import Link from "next/link";
import Button from "./Button";

// Date formatting utility function
function formatDateSpanish(dateString) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

// Skeleton loading component
function EventCardSkeleton() {
  return (
    <div className="card animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
      <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
      <div className="h-3 bg-gray-200 rounded w-2/3 mb-4"></div>
      <div className="h-8 bg-gray-200 rounded w-24"></div>
    </div>
  );
}

export default function FeaturedEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchEvents() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("/api/events");
        
        if (!response.ok) {
          throw new Error("Error al cargar eventos");
        }
        
        const data = await response.json();
        const allEvents = data.events || [];
        
        // Filter future events and sort by date
        const now = new Date();
        const upcomingEvents = allEvents
          .filter((event) => {
            const eventDate = new Date(event.date);
            return eventDate > now;
          })
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .slice(0, 5); // Limit to 5 events
        
        setEvents(upcomingEvents);
      } catch (err) {
        console.error("Error al cargar eventos:", err);
        setError("No se pudieron cargar los eventos. Por favor, intenta más tarde.");
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  // Determine grid columns based on number of events
  const getGridCols = () => {
    if (events.length === 0) return "grid-cols-1";
    if (events.length === 1) return "grid-cols-1";
    if (events.length === 2) return "grid-cols-1 md:grid-cols-2";
    return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
  };

  return (
    <section className="section-alt" aria-labelledby="featured-events-heading" data-testid="featured-events">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 id="featured-events-heading" className="text-h2 font-bold mb-4 text-gray-900">
            Próximos Eventos
          </h2>
          <p className="text-body-lg text-gray-600 max-w-2xl mx-auto">
            Descubre los próximos eventos y pruebas de Nosework Trial
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className={`grid ${getGridCols()} gap-6 mb-8`}>
            {[1, 2, 3].map((i) => (
              <EventCardSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="card text-center max-w-2xl mx-auto mb-8">
            <p className="text-body-lg text-gray-600">{error}</p>
          </div>
        )}

        {/* Events Grid */}
        {!loading && !error && events.length > 0 && (
          <div className={`grid ${getGridCols()} gap-6 mb-8`}>
            {events.map((event) => (
              <article
                key={event.id}
                className="card text-left"
                aria-labelledby={`event-title-${event.id}`}
              >
                <h3
                  id={`event-title-${event.id}`}
                  className="text-h4 font-bold mb-3 text-primary-600"
                >
                  {event.title}
                </h3>
                <div className="space-y-2 mb-4">
                  <p className="text-body text-gray-700">
                    <span className="font-semibold">Fecha:</span>{" "}
                    {formatDateSpanish(event.date)}
                  </p>
                  {event.location && (
                    <p className="text-body text-gray-700">
                      <span className="font-semibold">Ubicación:</span> {event.location}
                    </p>
                  )}
                  {event.level && (
                    <span className="inline-block px-3 py-1 text-sm font-semibold rounded-full bg-primary-100 text-primary-700">
                      {event.level === "base" ? "Base" : event.level === "avanzado" ? "Avanzado" : event.level}
                    </span>
                  )}
                </div>
                {event.description && (
                  <p className="text-body-sm text-gray-600 mb-4 line-clamp-2">
                    {event.description}
                  </p>
                )}
                <Link
                  href={`/events`}
                  className="text-primary-600 hover:text-primary-700 font-semibold text-sm inline-flex items-center"
                  aria-label={`Ver detalles de ${event.title}`}
                >
                  Ver detalles →
                </Link>
              </article>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && events.length === 0 && (
          <div className="card text-center max-w-2xl mx-auto mb-8">
            <p className="text-body-lg text-gray-600 mb-4">
              No hay eventos próximos. ¡Vuelve pronto!
            </p>
          </div>
        )}

        {/* View All Events Link */}
        {!loading && !error && events.length > 0 && (
          <div className="text-center">
            <Button href="/events" variant="primary" aria-label="Ver todos los eventos">
              Ver Todos los Eventos
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
