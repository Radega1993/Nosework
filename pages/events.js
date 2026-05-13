import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import HeroSection from "@/components/HeroSection";
import EventSearch from "@/components/Event/EventSearch";
import { useLocalizedLink } from "@/hooks/useLocalizedLink";
import { useEventFilters } from "@/hooks/useEventFilters";
import { useEventSearch } from "@/hooks/useEventSearch";
import {
  EventFiltersPanel,
  ListCalendarViewToggle,
  EventListingCardFddn,
  EventsCalendarPanel,
} from "@/components/sections";
import {
  CALENDARIO_HERO,
  CALENDARIO_SECTIONS,
} from "@/components/nosework/calendarioPruebasLabels";
import { isEventDateBeforeToday, isEventOnSameLocalDay } from "@/utils/eventDates";

const LIST_CHUNK = 6;

export default function Events() {
  const { localizedHref } = useLocalizedLink();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [view, setView] = useState("list");
  const [selectedDate, setSelectedDate] = useState(null);
  const [listLimit, setListLimit] = useState(LIST_CHUNK);

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

  const availableData = useMemo(() => {
    const levels = [...new Set(events.map((e) => e.level).filter(Boolean))];
    const types = [...new Set(events.map((e) => e.type).filter(Boolean))];
    const locations = [...new Set(events.map((e) => e.location || e.city).filter(Boolean))];
    return { levels, types, locations, statuses: ["open", "closed", "cancelled"] };
  }, [events]);

  const { filters, updateFilters, clearFilters, filteredEvents } = useEventFilters(events);

  /** Sin rango de fechas en URL: solo próximos (hoy o futuro). Con mes/día elegido: respeta el filtro del hook. */
  const timeFilteredEvents = useMemo(() => {
    const hasExplicitDateRange = Boolean(filters.dateFrom || filters.dateTo);
    if (hasExplicitDateRange) return filteredEvents;
    return filteredEvents.filter((e) => !isEventDateBeforeToday(e.date));
  }, [filteredEvents, filters.dateFrom, filters.dateTo]);

  const { searchQuery, updateSearch, clearSearch, searchedEvents } = useEventSearch(timeFilteredEvents);

  const eventsOnSelectedDay = useMemo(() => {
    if (!selectedDate) return [];
    return searchedEvents.filter((e) => isEventOnSameLocalDay(e.date, selectedDate));
  }, [searchedEvents, selectedDate]);

  useEffect(() => {
    setListLimit(LIST_CHUNK);
  }, [searchedEvents.length, filters.dateFrom, filters.dateTo, filters.location, searchQuery]);

  useEffect(() => {
    if (view !== "calendar") return;
    if (filters.dateFrom && filters.dateTo && filters.dateFrom === filters.dateTo) {
      setSelectedDate(new Date(`${filters.dateFrom}T12:00:00`));
    }
  }, [view, filters.dateFrom, filters.dateTo]);

  const visibleList = useMemo(() => searchedEvents.slice(0, listLimit), [searchedEvents, listLimit]);
  const hasMore = listLimit < searchedEvents.length;

  const handleFilterApply = (patch) => {
    setSelectedDate(null);
    updateFilters(patch);
  };

  const handleCalendarDateChange = (date) => {
    setSelectedDate(date);
    if (date) {
      const y = date.getFullYear();
      const m = String(date.getMonth() + 1).padStart(2, "0");
      const d = String(date.getDate()).padStart(2, "0");
      const dateStr = `${y}-${m}-${d}`;
      updateFilters({ dateFrom: dateStr, dateTo: dateStr });
    } else {
      updateFilters({ dateFrom: "", dateTo: "" });
    }
  };

  const handleViewChange = (next) => {
    setView(next);
    if (next === "list") {
      setSelectedDate(null);
    }
  };

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: searchedEvents.slice(0, 10).map((event, index) => ({
      "@type": "SportsEvent",
      position: index + 1,
      name: event.title,
      startDate: event.date,
      location: event.location || event.city || undefined,
    })),
  };

  const searchSlot = (
    <div className="[&_input]:border-outline-variant [&_input]:rounded-lg [&_input]:focus:ring-secondary">
      <EventSearch searchQuery={searchQuery} onUpdateSearch={updateSearch} onClearSearch={clearSearch} />
    </div>
  );

  return (
    <div className="bg-surface min-h-screen text-on-surface">
      <SEOHead
        title="Calendario de pruebas – Nosework Trial"
        description="Calendario de eventos y pruebas Nosework Trial: filtra por fecha, sede y nivel, y consulta el detalle de cada jornada."
        canonical="/eventos"
        ogImage="/images/og-image.jpg"
        schema={schemaMarkup}
        additionalMeta={{
          keywords:
            "calendario nosework, pruebas nosework, eventos nosework trial, competiciones nosework España",
        }}
      />

      <Navbar />

      <HeroSection
        layout="compact"
        compactOverlay="soft"
        align="center"
        title={CALENDARIO_HERO.title}
        subtitle={CALENDARIO_HERO.subtitle}
        backgroundImage="/images/hero-dog.webp"
      />

      <main className="max-w-container-max mx-auto px-6 py-10 md:py-12">
        <EventFiltersPanel
          dateFrom={filters.dateFrom}
          dateTo={filters.dateTo}
          filters={filters}
          locations={availableData.locations}
          typeOptions={availableData.types}
          onApply={handleFilterApply}
          searchSlot={searchSlot}
        />

        <div className="flex flex-col gap-4 mb-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <h2 className="font-montserrat text-headline-h2 md:text-3xl font-bold text-primary">
              {CALENDARIO_SECTIONS.upcomingTitle}
            </h2>
            <div className="flex flex-wrap items-center gap-3 justify-end">
              <Link
                href={localizedHref("/resultados-rankings")}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border-2 border-secondary text-secondary font-bold hover:bg-secondary hover:text-on-secondary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
              >
                <span className="material-symbols-outlined text-xl" aria-hidden>
                  emoji_events
                </span>
                Resultados
              </Link>
              <ListCalendarViewToggle view={view} onViewChange={handleViewChange} />
            </div>
          </div>
        </div>

        {loading && (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary" aria-hidden />
            <p className="mt-4 text-on-surface-variant">Cargando eventos...</p>
          </div>
        )}

        {error && !loading && (
          <div className="bg-white rounded-xl shadow-soft border border-outline-variant p-8 text-center max-w-2xl mx-auto">
            <p className="text-body-lg text-on-surface-variant mb-6">{error}</p>
            <button
              type="button"
              onClick={fetchEvents}
              className="px-6 py-3 bg-secondary text-on-secondary font-bold rounded-lg hover:brightness-110 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
            >
              Reintentar
            </button>
          </div>
        )}

        {!loading && !error && view === "list" && (
          <>
            {visibleList.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                  {visibleList.map((event) => (
                    <EventListingCardFddn
                      key={event.id}
                      event={event}
                      detailHref={localizedHref(`/eventos/${event.id}`)}
                      localizedHref={localizedHref}
                    />
                  ))}
                </div>
                {hasMore && (
                  <div className="flex justify-center">
                    <button
                      type="button"
                      onClick={() => setListLimit((n) => n + LIST_CHUNK)}
                      className="inline-flex items-center gap-2 px-8 py-3 border-2 border-primary text-primary font-bold rounded-lg hover:bg-primary hover:text-on-primary transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
                    >
                      {CALENDARIO_SECTIONS.loadMore}
                      <span className="material-symbols-outlined" aria-hidden>
                        expand_more
                      </span>
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="bg-white rounded-xl shadow-soft border border-outline-variant p-10 text-center max-w-2xl mx-auto">
                <p className="font-montserrat text-lg font-bold text-primary mb-2">{CALENDARIO_SECTIONS.emptyTitle}</p>
                <p className="text-on-surface-variant mb-6">{CALENDARIO_SECTIONS.emptyHint}</p>
                <button
                  type="button"
                  onClick={() => {
                    clearFilters();
                    clearSearch();
                    setSelectedDate(null);
                  }}
                  className="text-secondary font-bold hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded"
                >
                  Limpiar filtros y búsqueda
                </button>
              </div>
            )}
          </>
        )}

        {!loading && !error && view === "calendar" && (
          <div className="space-y-8">
            <EventsCalendarPanel
              events={searchedEvents}
              selectedDate={selectedDate}
              onChange={handleCalendarDateChange}
              footer={
                <p className="text-center text-on-surface-variant text-sm max-w-xl mx-auto">
                  {CALENDARIO_SECTIONS.calendarHint}
                </p>
              }
            />
            {selectedDate && eventsOnSelectedDay.length > 0 && (
              <div>
                <h3 className="font-montserrat text-headline-h3 font-bold text-primary mb-4 text-center">
                  Eventos el{" "}
                  {selectedDate.toLocaleDateString("es-ES", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {eventsOnSelectedDay.map((event) => (
                    <EventListingCardFddn
                      key={event.id}
                      event={event}
                      detailHref={localizedHref(`/eventos/${event.id}`)}
                      localizedHref={localizedHref}
                    />
                  ))}
                </div>
              </div>
            )}
            {selectedDate && eventsOnSelectedDay.length === 0 && (
              <p className="text-center text-on-surface-variant">{CALENDARIO_SECTIONS.emptyTitle}</p>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
