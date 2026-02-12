import { useEffect, useState } from "react";
import Button from "./Button";
import EventCardPublic from "./Event/EventCardPublic";

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
              <EventCardPublic
                key={event.id}
                event={event}
                compact={false}
                showImage={false}
              />
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
