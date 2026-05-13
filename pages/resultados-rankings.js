import { useCallback, useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import HeroSection from "@/components/HeroSection";
import { useLocalizedLink } from "@/hooks/useLocalizedLink";
import {
  ResultsBento,
  ResultsDetailTable,
  ResultsFiltersPanel,
  ResultsPastTrialsSection,
} from "@/components/resultados";

const PAGE_SIZE = 15;

const EMPTY_HINT = "Aún no hay resultados publicados para estos criterios.";

const defaultApplied = {
  year: "",
  level: "Todos",
  province: "Todas",
  club: "",
  dog: "",
  handler: "",
};

export default function ResultadosRankings() {
  const { localizedHref } = useLocalizedLink();

  const [draft, setDraft] = useState(defaultApplied);
  const [applied, setApplied] = useState(defaultApplied);
  const [offset, setOffset] = useState(0);

  const [binomios, setBinomios] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [yearOptions, setYearOptions] = useState([]);
  const [levelOptions, setLevelOptions] = useState([]);
  const [provinceOptions, setProvinceOptions] = useState([]);

  const [eventsWithResults, setEventsWithResults] = useState([]);
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);

  const [loadingRanking, setLoadingRanking] = useState(true);
  const [loadingTable, setLoadingTable] = useState(true);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [error, setError] = useState(null);

  const fetchRanking = useCallback(async () => {
    try {
      setLoadingRanking(true);
      const params = new URLSearchParams();
      if (applied.year) params.set("year", applied.year);
      if (applied.level && applied.level !== "Todos") params.set("level", applied.level);
      if (applied.province && applied.province !== "Todas") params.set("province", applied.province);
      const res = await fetch(`/api/event-results/ranking?${params.toString()}`);
      if (!res.ok) throw new Error("ranking");
      const data = await res.json();
      setBinomios(data.binomios || []);
      setClubs(data.clubs || []);
      setYearOptions(data.filterYears || []);
      setLevelOptions(data.filterLevels || []);
      setProvinceOptions(data.filterProvinces || []);
    } catch (e) {
      console.error(e);
      setError("No se pudo cargar el ranking.");
    } finally {
      setLoadingRanking(false);
    }
  }, [applied.year, applied.level, applied.province]);

  const fetchTable = useCallback(async () => {
    try {
      setLoadingTable(true);
      const params = new URLSearchParams();
      if (applied.year) params.set("year", applied.year);
      if (applied.level && applied.level !== "Todos") params.set("level", applied.level);
      if (applied.province && applied.province !== "Todas") params.set("province", applied.province);
      if (applied.club.trim()) params.set("club", applied.club.trim());
      if (applied.dog.trim()) params.set("dog", applied.dog.trim());
      if (applied.handler.trim()) params.set("handler", applied.handler.trim());
      params.set("limit", String(PAGE_SIZE));
      params.set("offset", String(offset));
      const res = await fetch(`/api/event-results?${params.toString()}`);
      if (!res.ok) throw new Error("table");
      const data = await res.json();
      setRows(data.rows || []);
      setTotal(data.total ?? 0);
    } catch (e) {
      console.error(e);
      setError("No se pudo cargar la tabla de resultados.");
    } finally {
      setLoadingTable(false);
    }
  }, [applied, offset]);

  const fetchEventsList = useCallback(async () => {
    try {
      setLoadingEvents(true);
      const res = await fetch("/api/event-results/events");
      if (!res.ok) throw new Error("events");
      const data = await res.json();
      setEventsWithResults(data.events || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingEvents(false);
    }
  }, []);

  useEffect(() => {
    fetchEventsList();
  }, [fetchEventsList]);

  useEffect(() => {
    fetchRanking();
  }, [fetchRanking]);

  useEffect(() => {
    fetchTable();
  }, [fetchTable]);

  const handleFilterChange = (key, value) => {
    setDraft((prev) => ({ ...prev, [key]: value }));
  };

  const handleApply = () => {
    setApplied({ ...draft });
    setOffset(0);
  };

  const handleOffsetChange = (next) => {
    setOffset(next);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-surface min-h-screen text-on-surface">
      <SEOHead
        title="Resultados oficiales y ranking – Nosework Trial"
        description="Consulta clasificaciones por prueba y el ranking acumulado en todas las pruebas con resultados publicados."
        canonical="/resultados-rankings"
        ogImage="/images/og-image.jpg"
      />
      <Navbar />

      <HeroSection
        layout="compact"
        compactOverlay="soft"
        align="center"
        eyebrow="Histórico nacional"
        title="Resultados oficiales"
        subtitle="Consulta las clasificaciones publicadas por prueba y el acumulado general de puntos."
        backgroundImage="/images/hero-dog.webp"
      />

      <main className="max-w-container-max mx-auto px-6 py-10 md:py-12">
        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-50 text-red-900 border border-red-200 text-sm font-medium">
            {error}
          </div>
        )}

        {loadingRanking ? (
          <div className="h-48 flex items-center justify-center text-on-surface-variant mb-10">Cargando ranking…</div>
        ) : (
          <ResultsBento binomios={binomios} clubs={clubs} emptyHint={EMPTY_HINT} />
        )}

        <ResultsPastTrialsSection
          events={eventsWithResults}
          localizedHref={localizedHref}
          loading={loadingEvents}
        />

        <ResultsFiltersPanel
          year={draft.year}
          level={draft.level}
          province={draft.province}
          club={draft.club}
          dog={draft.dog}
          handler={draft.handler}
          yearOptions={yearOptions}
          levelOptions={levelOptions}
          provinceOptions={provinceOptions}
          onChange={handleFilterChange}
          onApply={handleApply}
        />

        <ResultsDetailTable
          rows={rows}
          total={total}
          limit={PAGE_SIZE}
          offset={offset}
          loading={loadingTable}
          emptyHint={EMPTY_HINT}
          localizedHref={localizedHref}
          showEventLink
          onOffsetChange={handleOffsetChange}
        />
      </main>

      <Footer />
    </div>
  );
}
