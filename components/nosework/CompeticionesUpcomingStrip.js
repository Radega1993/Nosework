"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useLocalizedLink } from "@/hooks/useLocalizedLink";
import { EventListingCardFddn } from "@/components/sections";
import { isEventDateBeforeToday } from "@/utils/eventDates";

/**
 * Franja con próximas pruebas reales (API) para la página informativa de competiciones.
 */
export default function CompeticionesUpcomingStrip() {
  const { localizedHref } = useLocalizedLink();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const r = await fetch("/api/events");
        const d = await r.json().catch(() => ({}));
        if (!r.ok) throw new Error(d.error || "fetch");
        if (!cancelled) setEvents(Array.isArray(d.events) ? d.events : []);
      } catch {
        if (!cancelled) setErr("No se pudo cargar el calendario.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const upcoming = useMemo(
    () =>
      events
        .filter((e) => e.date && !isEventDateBeforeToday(e.date))
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .slice(0, 3),
    [events]
  );

  if (loading) {
    return (
      <section className="py-10 md:py-12 border-b border-outline-variant bg-surface-container-lowest">
        <div className="max-w-container-max mx-auto px-6 text-center text-on-surface-variant text-sm">Cargando pruebas…</div>
      </section>
    );
  }

  if (err || upcoming.length === 0) {
    return null;
  }

  return (
    <section className="py-10 md:py-14 border-b border-outline-variant bg-surface-container-lowest">
      <div className="max-w-container-max mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <h2 className="font-montserrat text-headline-h2 font-bold text-primary">Próximas pruebas</h2>
            <p className="text-on-surface-variant mt-2 max-w-2xl">
              Convocatorias publicadas en el calendario: sede, club, jueces e inscripción cuando la prueba lo permite.
            </p>
          </div>
          <Link
            href={localizedHref("/eventos")}
            className="inline-flex items-center justify-center gap-2 shrink-0 rounded-lg border-2 border-primary px-5 py-2.5 text-sm font-bold text-primary hover:bg-primary hover:text-white transition-colors"
          >
            Ver calendario completo
            <span className="material-symbols-outlined text-lg" aria-hidden>
              calendar_month
            </span>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcoming.map((event) => (
            <EventListingCardFddn
              key={event.id}
              event={event}
              detailHref={localizedHref(`/eventos/${event.id}`)}
              inscripcionHref={localizedHref(`/eventos/${event.id}/register`)}
              localizedHref={localizedHref}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
