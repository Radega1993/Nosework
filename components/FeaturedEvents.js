import { useEffect, useState } from "react";
import Button from "./Button";
import Section from "./Section";
import EventCardPublic from "./Event/EventCardPublic";
import { useLocalizedLink } from "@/hooks/useLocalizedLink";

// Skeleton loading — design system navy/gold tones
function EventCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-6 animate-pulse">
      <div className="h-32 bg-navy-100 rounded-lg mb-4" aria-hidden />
      <div className="h-4 bg-navy-100 rounded w-3/4 mb-3" aria-hidden />
      <div className="h-3 bg-navy-50 rounded w-1/2 mb-2" aria-hidden />
      <div className="h-3 bg-navy-50 rounded w-2/3 mb-4" aria-hidden />
      <div className="h-8 bg-gold-200 rounded w-24" aria-hidden />
    </div>
  );
}

export default function FeaturedEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/events");
      if (!response.ok) throw new Error("Error al cargar eventos");
      const data = await response.json();
      const allEvents = data.events || [];
      const now = new Date();
      const upcomingEvents = allEvents
        .filter((event) => new Date(event.date) > now)
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .slice(0, 5);
      setEvents(upcomingEvents);
    } catch (err) {
      console.error("Error al cargar eventos:", err);
      setError("No se pudieron cargar los eventos. Por favor, intenta más tarde.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const { localizedHref } = useLocalizedLink();

  return (
    <Section background="light" padding="lg">
      <section aria-labelledby="featured-events-heading" data-testid="featured-events">
        <div className="text-center mb-12">
          <h2 id="featured-events-heading" className="text-h2-redesign font-bold text-neutral-text-dark mb-4">
            Próximos Eventos
          </h2>
          <p className="text-body-redesign-lg text-neutral-text-medium max-w-2xl mx-auto">
            Descubre los próximos eventos y pruebas de Nosework Trial
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[1, 2, 3].map((i) => (
              <EventCardSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Error State — 8.2 retry */}
        {error && !loading && (
          <div className="bg-white rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-8 text-center max-w-2xl mx-auto mb-8">
            <p className="text-body-redesign text-neutral-text-medium mb-6">{error}</p>
            <Button onClick={fetchEvents} variant="primary" aria-label="Reintentar cargar eventos">
              Reintentar
            </Button>
          </div>
        )}

        {/* Events Grid — 3 cols, card con imagen/fecha/título/Leer más */}
        {!loading && !error && events.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {events.map((event) => (
              <EventCardPublic
                key={event.id}
                event={event}
                compact={false}
                showImage={true}
                linkText="Leer más"
                variant="featured"
              />
            ))}
          </div>
        )}

        {/* Empty State — 8.3 CTA */}
        {!loading && !error && events.length === 0 && (
          <div className="bg-white rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-8 text-center max-w-2xl mx-auto mb-8">
            <p className="text-body-redesign text-neutral-text-medium mb-6">
              No hay eventos próximos. ¡Vuelve pronto!
            </p>
            <Button href={localizedHref("/eventos")} variant="outline" aria-label="Ver calendario de eventos">
              Ver calendario de eventos
            </Button>
          </div>
        )}

        {/* Ver todos los eventos — 6.5 */}
        {!loading && !error && events.length > 0 && (
          <div className="text-center">
            <Button href={localizedHref("/eventos")} variant="primary" aria-label="Ver todos los eventos">
              Ver todos los eventos
            </Button>
          </div>
        )}
      </section>
    </Section>
  );
}
