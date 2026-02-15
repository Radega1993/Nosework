import { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import Calendar from "react-calendar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import EventCardPublic from "@/components/Event/EventCardPublic";
import { useEventFilters } from "@/hooks/useEventFilters";
import { useEventSearch } from "@/hooks/useEventSearch";
import { useEventPagination } from "@/hooks/useEventPagination";

// Lazy load filters and search components (not critical for initial render)
const EventFilters = dynamic(() => import("@/components/Event/EventFilters"), {
  ssr: false,
});
const EventSearch = dynamic(() => import("@/components/Event/EventSearch"), {
  ssr: false,
});

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [view, setView] = useState("calendar"); // 'calendar', 'list', 'grid'
  const [selectedDate, setSelectedDate] = useState(null);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/events");
      if (!response.ok) throw new Error("Error al cargar eventos");
      const data = await response.json();
      setEvents(data.events || []);
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

  // Get unique values for filters
  const availableData = useMemo(() => {
    const levels = [...new Set(events.map((e) => e.level).filter(Boolean))];
    const types = [...new Set(events.map((e) => e.type).filter(Boolean))];
    const locations = [...new Set(events.map((e) => e.location || e.city).filter(Boolean))];
    return { levels, types, locations, statuses: ["open", "closed", "cancelled"] };
  }, [events]);

  // Use custom hooks for filtering, searching, and pagination
  const { filters, updateFilters, clearFilters, filteredEvents } = useEventFilters(events);
  const { searchQuery, updateSearch, clearSearch, searchedEvents } = useEventSearch(filteredEvents);
  const {
    currentPage,
    totalPages,
    paginatedEvents,
    goToPage,
    nextPage,
    prevPage,
    hasNextPage,
    hasPrevPage,
    startIndex,
    endIndex,
    totalItems,
  } = useEventPagination(searchedEvents, 12);

  // Handle calendar date selection
  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (date) {
      const dateStr = date.toISOString().split("T")[0];
      updateFilters({ dateFrom: dateStr, dateTo: dateStr });
      setView("grid"); // Switch to grid view when date is selected
    }
  };

  // View toggle handler
  const handleViewChange = (newView) => {
    setView(newView);
    if (newView !== "calendar") {
      setSelectedDate(null);
      updateFilters({ dateFrom: "", dateTo: "" });
    }
  };

  // Schema.org JSON-LD for events list
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: paginatedEvents.slice(0, 10).map((event, index) => ({
      "@type": "SportsEvent",
      position: index + 1,
      name: event.title,
      startDate: event.date,
      location: event.location || event.city || undefined,
    })),
  };

  return (
    <div className="bg-[#F4F6F8] min-h-screen pt-20">
      <SEOHead
        title="Calendario de Eventos Nosework Trial – Pruebas y Competiciones 2025"
        description="Consulta el calendario completo de eventos y competiciones de Nosework Trial. Encuentra pruebas cerca de ti e inscríbete online."
        canonical="/events"
        ogImage="/images/og-image.jpg"
        schema={schemaMarkup}
        additionalMeta={{
          keywords:
            "calendario nosework, pruebas nosework 2025, eventos nosework, competiciones nosework España",
        }}
      />

      <Navbar />

      {/* Hero Section */}
      <header className="bg-navy text-white py-16 md:py-20 text-center">
        <div className="container-redesign">
          <h1 className="text-h1-redesign-mobile md:text-h1-redesign font-bold mb-4">Eventos y Pruebas</h1>
          <p className="text-xl md:text-2xl text-white/90">Explora y participa en nuestras actividades</p>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <div className="container-redesign py-12">
          {/* View Toggle */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex rounded-lg border border-gray-300 bg-white p-1" role="tablist">
              <button
                onClick={() => handleViewChange("calendar")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-gold ${
                  view === "calendar"
                    ? "bg-navy text-white"
                    : "text-neutral-text-medium hover:bg-[#F4F6F8]"
                }`}
                aria-selected={view === "calendar"}
                role="tab"
              >
                Calendario
              </button>
              <button
                onClick={() => handleViewChange("list")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-gold ${
                  view === "list"
                    ? "bg-navy text-white"
                    : "text-neutral-text-medium hover:bg-[#F4F6F8]"
                }`}
                aria-selected={view === "list"}
                role="tab"
              >
                Lista
              </button>
              <button
                onClick={() => handleViewChange("grid")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-gold ${
                  view === "grid"
                    ? "bg-navy text-white"
                    : "text-neutral-text-medium hover:bg-[#F4F6F8]"
                }`}
                aria-selected={view === "grid"}
                role="tab"
              >
                Grid
              </button>
            </div>
          </div>

          {/* Filters and Search */}
          {view !== "calendar" && (
            <div className="mb-6">
              <EventSearch searchQuery={searchQuery} onUpdateSearch={updateSearch} onClearSearch={clearSearch} />
              <EventFilters
                filters={filters}
                onUpdateFilters={updateFilters}
                onClearFilters={clearFilters}
                availableData={availableData}
              />
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-navy"></div>
              <p className="mt-4 text-neutral-text-medium">Cargando eventos...</p>
            </div>
          )}

          {/* Error State — 8.2 retry */}
          {error && !loading && (
            <div className="bg-white rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-8 text-center max-w-2xl mx-auto">
              <p className="text-body-redesign-lg text-neutral-text-medium mb-6">{error}</p>
              <button
                type="button"
                onClick={fetchEvents}
                className="px-6 py-3 bg-gold hover:bg-gold-hover text-navy font-semibold rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
                aria-label="Reintentar cargar eventos"
              >
                Reintentar
              </button>
            </div>
          )}

          {/* Calendar View */}
          {!loading && !error && view === "calendar" && (
            <section className="card">
              <h2 className="text-h2-redesign font-bold text-neutral-text-dark text-center mb-6">Calendario de Eventos</h2>
              <div className="flex justify-center mb-6">
                <div className="border border-neutral-border rounded-lg bg-white p-4">
                  <Calendar
                    onChange={handleDateChange}
                    value={selectedDate}
                    className="rounded-lg"
                    tileContent={({ date }) =>
                      events.some(
                        (e) => new Date(e.date).toDateString() === date.toDateString()
                      ) && (
                        <div className="mt-1 w-2 h-2 bg-gold rounded-full mx-auto" aria-hidden></div>
                      )
                    }
                  />
                </div>
              </div>
              <p className="text-center text-body-redesign text-neutral-text-medium">
                {selectedDate
                  ? `Eventos para: ${selectedDate.toLocaleDateString("es-ES", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}`
                  : "Selecciona una fecha para ver los eventos disponibles."}
              </p>
            </section>
          )}

          {/* List and Grid Views */}
          {!loading && !error && (view === "list" || view === "grid") && (
            <>
              {/* Events Display */}
              {paginatedEvents.length > 0 ? (
                <>
                  <div
                    className={
                      view === "list"
                        ? "space-y-4 mb-8"
                        : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
                    }
                  >
                    {paginatedEvents.map((event) => (
                      <EventCardPublic
                        key={event.id}
                        event={event}
                        compact={view === "list"}
                        showImage={view === "grid"}
                      />
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex flex-col items-center space-y-4">
                      <p className="text-sm text-neutral-text-medium">
                        Mostrando {startIndex}-{endIndex} de {totalItems} eventos
                      </p>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={prevPage}
                          disabled={!hasPrevPage}
                          className={`px-4 py-2 rounded-lg border ${
                            hasPrevPage
                              ? "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                              : "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
                          } focus:outline-none focus:ring-2 focus:ring-gold`}
                        >
                          Anterior
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <button
                            key={page}
                            onClick={() => goToPage(page)}
                            className={`px-4 py-2 rounded-lg border ${
                              currentPage === page
                                ? "bg-navy border-navy text-white"
                                : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                            } focus:outline-none focus:ring-2 focus:ring-gold`}
                          >
                            {page}
                          </button>
                        ))}
                        <button
                          onClick={nextPage}
                          disabled={!hasNextPage}
                          className={`px-4 py-2 rounded-lg border ${
                            hasNextPage
                              ? "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                              : "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
                          } focus:outline-none focus:ring-2 focus:ring-gold`}
                        >
                          Siguiente
                        </button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="bg-white rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-8 text-center max-w-2xl mx-auto">
                  <p className="text-body-redesign-lg text-neutral-text-medium mb-4">
                    No se encontraron eventos que coincidan con los filtros seleccionados.
                  </p>
                  {(Object.values(filters).some((v) => (Array.isArray(v) ? v.length > 0 : v)) || searchQuery) && (
                    <button
                      type="button"
                      onClick={() => {
                        clearFilters();
                        clearSearch();
                      }}
                      className="text-navy hover:text-gold font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 rounded px-3 py-1"
                      aria-label="Limpiar filtros de búsqueda"
                    >
                      Limpiar filtros
                    </button>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
