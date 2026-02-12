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

  // Fetch events from API
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
        setEvents(data.events || []);
      } catch (err) {
        console.error("Error al cargar eventos:", err);
        setError("No se pudieron cargar los eventos. Por favor, intenta más tarde.");
      } finally {
        setLoading(false);
      }
    }
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
    <div className="bg-gray-50 min-h-screen pt-16">
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
      <header className="bg-gradient-to-r from-secondary-600 to-secondary-700 text-white py-16 md:py-20 text-center">
        <div className="container-custom">
          <h1 className="text-h1 font-bold mb-4">Eventos y Pruebas</h1>
          <p className="text-xl md:text-2xl text-secondary-50">Explora y participa en nuestras actividades</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="section">
        <div className="container-custom">
          {/* View Toggle */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex rounded-lg border border-gray-300 bg-white p-1" role="tablist">
              <button
                onClick={() => handleViewChange("calendar")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                  view === "calendar"
                    ? "bg-primary-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                aria-selected={view === "calendar"}
                role="tab"
              >
                Calendario
              </button>
              <button
                onClick={() => handleViewChange("list")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                  view === "list"
                    ? "bg-primary-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                aria-selected={view === "list"}
                role="tab"
              >
                Lista
              </button>
              <button
                onClick={() => handleViewChange("grid")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                  view === "grid"
                    ? "bg-primary-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
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
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
              <p className="mt-4 text-gray-600">Cargando eventos...</p>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="card text-center max-w-2xl mx-auto">
              <p className="text-body-lg text-gray-600">{error}</p>
            </div>
          )}

          {/* Calendar View */}
          {!loading && !error && view === "calendar" && (
            <section className="card">
              <h2 className="text-h2 font-bold text-center mb-6">Calendario de Eventos</h2>
              <div className="flex justify-center mb-6">
                <div className="card-bordered">
                  <Calendar
                    onChange={handleDateChange}
                    value={selectedDate}
                    className="rounded-lg"
                    tileContent={({ date }) =>
                      events.some(
                        (e) => new Date(e.date).toDateString() === date.toDateString()
                      ) && (
                        <div className="mt-1 w-2 h-2 bg-primary-500 rounded-full mx-auto"></div>
                      )
                    }
                  />
                </div>
              </div>
              <p className="text-center text-body text-gray-600">
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
                      <p className="text-sm text-gray-600">
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
                          } focus:outline-none focus:ring-2 focus:ring-primary-500`}
                        >
                          Anterior
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <button
                            key={page}
                            onClick={() => goToPage(page)}
                            className={`px-4 py-2 rounded-lg border ${
                              currentPage === page
                                ? "bg-primary-600 border-primary-600 text-white"
                                : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                            } focus:outline-none focus:ring-2 focus:ring-primary-500`}
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
                          } focus:outline-none focus:ring-2 focus:ring-primary-500`}
                        >
                          Siguiente
                        </button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="card text-center max-w-2xl mx-auto">
                  <p className="text-body-lg text-gray-600 mb-4">
                    No se encontraron eventos que coincidan con los filtros seleccionados.
                  </p>
                  {Object.values(filters).some((v) => (Array.isArray(v) ? v.length > 0 : v)) ||
                  searchQuery ? (
                    <button
                      onClick={() => {
                        clearFilters();
                        clearSearch();
                      }}
                      className="text-primary-600 hover:text-primary-700 font-semibold"
                    >
                      Limpiar filtros
                    </button>
                  ) : null}
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
