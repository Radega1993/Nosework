import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import SEOHead from "@/components/SEOHead";
import { getSportsOrganizationSchema } from "@/utils/seo";
import { useLocalizedLink } from "@/hooks/useLocalizedLink";
import { useEffect, useMemo, useState } from "react";
import {
  HomeQuickAccessBento,
  HomeWhatIsTrialSection,
  HomeAthleteJourney,
  HomeUpcomingTrials,
  HomeEventsCalendarSection,
  HomeLevelsStrip,
  HomeClubFinder,
  HomeRecentResultsTeaser,
  HomeNewsCards,
  HomeCommunityCtaSection,
  HomePartnersSection,
} from "@/components/home";

export default function Home() {
  const { localizedHref } = useLocalizedLink();
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [clubQuery, setClubQuery] = useState("");

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch("/api/events");
        const data = await response.json();
        setEvents(data.events || []);
      } catch (error) {
        console.error("Error al cargar eventos:", error);
      }
    }
    fetchEvents();
  }, []);

  const upcomingTrials = useMemo(() => {
    const now = new Date();
    return [...events]
      .filter((e) => new Date(e.date) >= now)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 3);
  }, [events]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const filteredEvents = events.filter(
      (e) => new Date(e.date).toDateString() === date.toDateString()
    );
    setSelectedEvents(filteredEvents);
  };

  const handleClubSearch = (e) => {
    e.preventDefault();
    const q = clubQuery.trim();
    const path = q ? `${localizedHref("/clubs")}?q=${encodeURIComponent(q)}` : localizedHref("/clubs");
    router.push(path);
  };

  const sportsOrganizationSchema = getSportsOrganizationSchema();

  return (
    <>
      <SEOHead
        title="Nosework Trial – Deporte de olfato canino"
        description="Descubre Nosework Trial, la modalidad deportiva para perros detectores y trabajo de olfato. Pruebas oficiales, reglamento, calendario de competiciones y clubs en España."
        canonical="/"
        ogImage="/images/og-image.jpg"
        schema={sportsOrganizationSchema}
        additionalMeta={{
          keywords:
            "nosework trial, deporte perros detectores, nosework deportivo, deporte olfato canino, detección deportiva perros",
          author: "Nosework Trial Community",
        }}
      />

      <Navbar />

      <HeroSection
        primaryCTA={{
          href: localizedHref("/como-empezar"),
          label: "Empezar en Nosework",
          ariaLabel: "Ir a la guía para empezar en Nosework Trial",
        }}
        secondaryCTA={{
          href: localizedHref("/eventos"),
          label: "Ver próximas pruebas",
          ariaLabel: "Ver el calendario de pruebas",
        }}
        tertiaryCTA={{
          href: localizedHref("/reglamento"),
          label: "Consultar reglamento",
          ariaLabel: "Consultar el reglamento de Nosework Trial",
        }}
      />

      <main className="bg-surface text-on-surface">
        <HomeQuickAccessBento localizedHref={localizedHref} />
        <HomeWhatIsTrialSection localizedHref={localizedHref} />
        <HomeAthleteJourney localizedHref={localizedHref} />
        <HomeUpcomingTrials events={upcomingTrials} localizedHref={localizedHref} />
        <HomeEventsCalendarSection
          events={events}
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
          selectedEvents={selectedEvents}
          localizedHref={localizedHref}
        />
        <HomeLevelsStrip localizedHref={localizedHref} />
        <HomeClubFinder
          query={clubQuery}
          onQueryChange={(e) => setClubQuery(e.target.value)}
          onSubmit={handleClubSearch}
          localizedHref={localizedHref}
        />
        <HomeRecentResultsTeaser localizedHref={localizedHref} />
        <HomeNewsCards localizedHref={localizedHref} />
        <HomeCommunityCtaSection localizedHref={localizedHref} />
        <HomePartnersSection localizedHref={localizedHref} />
      </main>

      <Footer />
    </>
  );
}
