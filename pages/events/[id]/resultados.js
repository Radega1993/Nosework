import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import HeroSection from "@/components/HeroSection";
import { ResultsDetailTable } from "@/components/resultados";
import { useLocalizedLink } from "@/hooks/useLocalizedLink";

const PAGE_SIZE = 50;

export default function EventResultsPage() {
  const router = useRouter();
  const { id } = router.query;
  const { localizedHref } = useLocalizedLink();

  const [event, setEvent] = useState(null);
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [offset, setOffset] = useState(0);
  const [loadingEvent, setLoadingEvent] = useState(true);
  const [loadingTable, setLoadingTable] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    (async () => {
      try {
        setLoadingEvent(true);
        setError(null);
        const res = await fetch(`/api/events/${id}`);
        if (res.status === 404) {
          if (!cancelled) setError("not-found");
          return;
        }
        if (!res.ok) throw new Error("event");
        const data = await res.json();
        if (!cancelled) setEvent(data.event);
      } catch (e) {
        console.error(e);
        if (!cancelled) setError("error");
      } finally {
        if (!cancelled) setLoadingEvent(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  const fetchTable = useCallback(async () => {
    if (!id) return;
    try {
      setLoadingTable(true);
      const params = new URLSearchParams();
      params.set("eventId", String(id));
      params.set("limit", String(PAGE_SIZE));
      params.set("offset", String(offset));
      const res = await fetch(`/api/event-results?${params.toString()}`);
      if (!res.ok) throw new Error("results");
      const data = await res.json();
      setRows(data.rows || []);
      setTotal(data.total ?? 0);
    } catch (e) {
      console.error(e);
      setError("error");
    } finally {
      setLoadingTable(false);
    }
  }, [id, offset]);

  useEffect(() => {
    if (!id) return;
    fetchTable();
  }, [id, fetchTable]);

  if (loadingEvent && !event) {
    return (
      <div className="bg-surface min-h-screen pt-20">
        <Navbar />
        <main className="max-w-container-max mx-auto px-6 py-16 text-center text-on-surface-variant">
          Cargando…
        </main>
        <Footer />
      </div>
    );
  }

  if (error === "not-found" || !event) {
    return (
      <div className="bg-surface min-h-screen pt-20">
        <Navbar />
        <main className="max-w-container-max mx-auto px-6 py-16 text-center">
          <h1 className="font-montserrat text-2xl font-bold text-primary mb-4">Prueba no encontrada</h1>
          <Link href={localizedHref("/eventos")} className="text-secondary font-bold hover:underline">
            Volver al calendario
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const title = `Resultados: ${event.title}`;

  return (
    <div className="bg-surface min-h-screen text-on-surface">
      <SEOHead
        title={title}
        description={`Clasificación publicada de ${event.title}.`}
        canonical={`/eventos/${id}/resultados`}
        ogImage="/images/og-image.jpg"
        breadcrumbs={[
          { label: "Calendario", href: "/eventos" },
          { label: event.title, href: `/eventos/${id}` },
          { label: "Resultados", href: `/eventos/${id}/resultados` },
        ]}
      />
      <Navbar />

      <div className="max-w-container-max mx-auto px-6 pt-24 pb-4">
        <Breadcrumbs
          items={[
            { label: "Calendario", href: "/eventos" },
            { label: event.title, href: `/eventos/${id}` },
            { label: "Resultados", href: `/eventos/${id}/resultados` },
          ]}
        />
      </div>

      <HeroSection
        layout="compact"
        compactOverlay="soft"
        align="center"
        title="Resultados de la prueba"
        subtitle={event.title}
        backgroundImage="/images/hero-dog.webp"
      />

      <main className="max-w-container-max mx-auto px-6 py-10 md:py-12">
        {error === "error" && (
          <p className="mb-4 text-sm text-red-700">No se pudieron cargar los resultados. Intenta más tarde.</p>
        )}

        <div className="mb-6 flex flex-wrap gap-3">
          <Link
            href={localizedHref(`/eventos/${id}`)}
            className="inline-flex items-center gap-1 text-primary font-bold border border-primary rounded-lg px-4 py-2 hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-lg" aria-hidden>
              arrow_back
            </span>
            Ficha de la prueba
          </Link>
          <Link
            href={localizedHref("/resultados-rankings")}
            className="inline-flex items-center gap-1 text-secondary font-bold hover:underline"
          >
            Todos los resultados y ranking
          </Link>
        </div>

        <ResultsDetailTable
          rows={rows}
          total={total}
          limit={PAGE_SIZE}
          offset={offset}
          loading={loadingTable}
          emptyHint="No hay filas de resultado publicadas para esta prueba."
          localizedHref={localizedHref}
          showEventLink={false}
          onOffsetChange={setOffset}
        />
      </main>

      <Footer />
    </div>
  );
}
