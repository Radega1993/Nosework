import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSplit from "@/components/HeroSplit";
import SEOHead from "@/components/SEOHead";
import { getSportsOrganizationSchema } from "@/utils/seo";
import { useLocalizedLink } from "@/hooks/useLocalizedLink";
import { useEffect, useMemo, useState } from "react";
import {
  HomeDiscoverCards,
  HomeCommunityBanner,
  HomeUpcomingTrials,
  HomeEventsCalendarSection,
  HomeLevelsStrip,
  HomeClubFinder,
  HomeRecentResultsTeaser,
  HomePartnersSection,
} from "@/components/home";
import { PROPOSAL_PHOTOS } from "@/data/visualProposal";
import { isEventOnSameLocalDay, parseEventLocalDate } from "@/utils/eventDates";

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
        const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
        const response = await fetch("/api/events", {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        const data = await response.json();
        setEvents(data.events || []);
      } catch (error) {
        console.error("Error al cargar eventos:", error);
      }
    }
    fetchEvents();
  }, []);

  const upcomingTrials = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return [...events]
      .filter((e) => {
        const d = parseEventLocalDate(e.date);
        return d && d >= today;
      })
      .sort((a, b) => {
        const da = parseEventLocalDate(a.date);
        const db = parseEventLocalDate(b.date);
        if (!da || !db) return 0;
        return da.getTime() - db.getTime();
      })
      .slice(0, 3);
  }, [events]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedEvents(events.filter((e) => e.date && isEventOnSameLocalDay(e.date, date)));
  };

  const handleClubSearch = (e) => {
    e.preventDefault();
    const q = clubQuery.trim();
    const path = q ? `${localizedHref("/clubs")}?q=${encodeURIComponent(q)}` : localizedHref("/clubs");
    router.push(path);
  };

  const sportsOrganizationSchema = getSportsOrganizationSchema();
  const heroPhoto = PROPOSAL_PHOTOS.homeHero;

  return (
    <>
      <SEOHead
        title="Nosework Trial – Deporte de olfato canino"
        description="Descubre Nosework Trial, la modalidad deportiva para perros detectores y trabajo de olfato. Pruebas oficiales, reglamento, calendario de competiciones y clubs en España."
        canonical="/"
        ogImage={heroPhoto.src}
        schema={sportsOrganizationSchema}
        additionalMeta={{
          keywords:
            "nosework trial, deporte perros detectores, nosework deportivo, deporte olfato canino, detección deportiva perros",
          author: "Nosework Trial Community",
        }}
      />

      <Navbar />

      <HeroSplit
        title="Un mundo por descubrir con su olfato"
        description="Transformamos el instinto de búsqueda en una experiencia compartida. Un deporte accesible donde cada perro y su guía crecen a su ritmo."
        imageSrc={heroPhoto.src}
        imageAlt={heroPhoto.alt}
        objectPosition={heroPhoto.objectPosition}
        primaryCTA={{
          href: localizedHref("/como-empezar"),
          label: "Empezar en Nosework",
          ariaLabel: "Ir a la guía para empezar en Nosework Trial",
        }}
        secondaryCTA={{
          href: localizedHref("/eventos"),
          label: "Consultar pruebas",
          ariaLabel: "Ver el calendario de pruebas",
        }}
        micro="UNA DISCIPLINA · MUCHAS FORMAS DE DISFRUTAR"
      />

      <main className="bg-surface text-on-surface">
        <HomeDiscoverCards localizedHref={localizedHref} />
        <HomeCommunityBanner localizedHref={localizedHref} />
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
        <HomePartnersSection localizedHref={localizedHref} />
      </main>

      <Footer />
    </>
  );
}
