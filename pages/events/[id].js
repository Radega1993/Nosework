import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import EventDetail from "@/components/Event/EventDetail";

// Lazy load EventCardPublic for related events (below the fold)
const EventCardPublic = dynamic(() => import("@/components/Event/EventCardPublic"), {
  ssr: false,
});

export default function EventDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [event, setEvent] = useState(null);
  const [relatedEvents, setRelatedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch event data
  useEffect(() => {
    if (!id) return;

    async function fetchEvent() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`/api/events/${id}`);
        
        if (response.status === 404) {
          setError("not-found");
          return;
        }
        
        if (!response.ok) {
          throw new Error("Error al cargar el evento");
        }
        
        const data = await response.json();
        setEvent(data.event);

        // Fetch related events (exclude current event)
        const allEventsResponse = await fetch("/api/events");
        if (allEventsResponse.ok) {
          const allEventsData = await allEventsResponse.json();
          const now = new Date();
          const upcoming = allEventsData.events
            .filter((e) => e.id !== parseInt(id) && new Date(e.date) > now)
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .slice(0, 3);
          setRelatedEvents(upcoming);
        }
      } catch (err) {
        console.error("Error al cargar evento:", err);
        setError("error");
      } finally {
        setLoading(false);
      }
    }

    fetchEvent();
  }, [id]);

  // Schema.org JSON-LD for single event
  const schemaMarkup = event
    ? {
        "@context": "https://schema.org",
        "@type": "SportsEvent",
        name: event.title,
        startDate: event.date,
        description: event.description || undefined,
        location: event.location || event.city
          ? {
              "@type": "Place",
              name: event.location || event.city,
              address: event.address
                ? {
                    "@type": "PostalAddress",
                    streetAddress: event.address,
                    addressLocality: event.city,
                    postalCode: event.postal_code,
                  }
                : undefined,
            }
          : undefined,
        organizer: event.organizer
          ? {
              "@type": "Organization",
              name: event.organizer.name,
              email: event.organizer.email,
              telephone: event.organizer.phone,
            }
          : undefined,
      }
    : null;

  // Social sharing URLs
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareTitle = event ? event.title : "";
  const shareText = event ? event.description?.substring(0, 100) : "";

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen pt-16">
        <Navbar />
        <main className="section">
          <div className="container-custom">
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
              <p className="mt-4 text-gray-600">Cargando evento...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error === "not-found") {
    return (
      <div className="bg-gray-50 min-h-screen pt-16">
        <Head>
          <title>Evento no encontrado - Nosework Trial</title>
        </Head>
        <Navbar />
        <main className="section">
          <div className="container-custom">
            <div className="card text-center max-w-2xl mx-auto">
              <h1 className="text-h1 font-bold mb-4 text-gray-900">Evento no encontrado</h1>
              <p className="text-body-lg text-gray-600 mb-6">
                El evento que buscas no existe o ha sido eliminado.
              </p>
              <Link
                href="/events"
                className="text-primary-600 hover:text-primary-700 font-semibold"
              >
                ← Volver a eventos
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="bg-gray-50 min-h-screen pt-16">
        <Head>
          <title>Error - Nosework Trial</title>
        </Head>
        <Navbar />
        <main className="section">
          <div className="container-custom">
            <div className="card text-center max-w-2xl mx-auto">
              <h1 className="text-h1 font-bold mb-4 text-gray-900">Error</h1>
              <p className="text-body-lg text-gray-600 mb-6">
                No se pudo cargar el evento. Por favor, intenta más tarde.
              </p>
              <Link
                href="/events"
                className="text-primary-600 hover:text-primary-700 font-semibold"
              >
                ← Volver a eventos
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Breadcrumb items
  const breadcrumbItems = [
    { label: "Inicio", href: "/" },
    { label: "Eventos", href: "/events" },
    { label: event.title, href: `/events/${id}` },
  ];

  return (
    <div className="bg-gray-50 min-h-screen pt-16">
      <SEOHead
        title={`${event.title} - Nosework Trial`}
        description={
          event.description?.substring(0, 160) || `Evento de Nosework Trial: ${event.title}`
        }
        canonical={`/events/${id}`}
        ogImage="/images/og-image.jpg"
        schema={schemaMarkup}
        breadcrumbs={breadcrumbItems}
      />

      <Navbar />

      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbItems} />

      {/* Main Content */}
      <main className="section">
        <div className="container-custom">
          <EventDetail event={event} />

          {/* Related Events */}
          {relatedEvents.length > 0 && (
            <section className="mt-12">
              <h2 className="text-h2 font-bold mb-6 text-gray-900">Próximos Eventos</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedEvents.map((relatedEvent) => (
                  <EventCardPublic key={relatedEvent.id} event={relatedEvent} showImage={true} />
                ))}
              </div>
            </section>
          )}

          {/* Social Sharing */}
          <section className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-h4 font-bold mb-4 text-gray-900">Compartir evento</h3>
            <div className="flex items-center space-x-4">
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Compartir en Facebook"
              >
                Facebook
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                aria-label="Compartir en Twitter"
              >
                Twitter
              </a>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`${shareTitle} - ${shareUrl}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                aria-label="Compartir en WhatsApp"
              >
                WhatsApp
              </a>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
