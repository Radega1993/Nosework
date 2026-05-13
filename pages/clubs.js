import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import HeroSection from "@/components/HeroSection";
import Link from "next/link";
import { useLocalizedLink } from "@/hooks/useLocalizedLink";
import {
  ClubsAffiliationSection,
  ClubsFiltersMap,
  ClubsOrganizeStepsSection,
  ClubsPartnerGrid,
} from "@/components/clubs";
import { CLUB_SERVICE_FILTERS, CLUB_PROVINCE_OPTIONS, PARTNER_CLUBS } from "@/data/partnerClubs";
import { taxonomyCodesToFilterTags } from "@/data/clubServiceTaxonomy";

const initialServices = () =>
  CLUB_SERVICE_FILTERS.reduce((acc, f) => {
    acc[f.id] = false;
    return acc;
  }, {});

function clubMatchesApplied(club, province, services, searchTerm) {
  const term = searchTerm.trim().toLowerCase();
  if (term && !club.name.toLowerCase().includes(term)) return false;
  if (province !== "Todas") {
    if (club.province !== province) return false;
  }
  const activeFilters = CLUB_SERVICE_FILTERS.filter((f) => services[f.id]);
  if (activeFilters.length === 0) return true;
  return activeFilters.every((f) => f.test(club.tags));
}

export default function Clubs() {
  const router = useRouter();
  const { localizedHref } = useLocalizedLink();
  const contactHref = localizedHref("/contact");
  const competicionesHref = localizedHref("/competiciones");

  const [search, setSearch] = useState("");
  const [draftProvince, setDraftProvince] = useState("Todas");
  const [draftServices, setDraftServices] = useState(initialServices);
  const [appliedProvince, setAppliedProvince] = useState("Todas");
  const [appliedServices, setAppliedServices] = useState(initialServices);
  const [apiClubRows, setApiClubRows] = useState([]);

  useEffect(() => {
    const q = router.query.q;
    if (typeof q === "string" && q) setSearch(q);
  }, [router.query.q]);

  useEffect(() => {
    fetch("/api/clubs")
      .then((r) => r.json())
      .then((d) => setApiClubRows(Array.isArray(d.clubs) ? d.clubs : []))
      .catch(() => setApiClubRows([]));
  }, []);

  const allDirectoryClubs = useMemo(() => {
    const staticPart = PARTNER_CLUBS.map((c) => ({
      directoryKey: `static-${c.slug}`,
      source: "static",
      ...c,
    }));
    const dbPart = apiClubRows.map((c) => {
      const codes = c.service_codes || [];
      const tags = taxonomyCodesToFilterTags(codes);
      const rawLogo = (c.logo_url && String(c.logo_url).trim()) || "";
      return {
        directoryKey: `db-${c.id}`,
        source: "database",
        slug: c.slug,
        name: c.display_name || c.name,
        province: c.province || null,
        city: c.municipality || null,
        tags,
        logoSrc: rawLogo || "/images/og-image.jpg",
        badge: "Registrado",
        sourceFile: `${c.slug}.webp`,
      };
    });
    return [...staticPart, ...dbPart].sort((a, b) =>
      a.name.localeCompare(b.name, "es", { sensitivity: "base" })
    );
  }, [apiClubRows]);

  const provinceOptions = useMemo(() => {
    const s = new Set(CLUB_PROVINCE_OPTIONS);
    for (const c of allDirectoryClubs) {
      if (c.province) s.add(c.province);
    }
    return [...s].sort((a, b) => a.localeCompare(b, "es", { sensitivity: "base" }));
  }, [allDirectoryClubs]);

  const handleApply = () => {
    setAppliedProvince(draftProvince);
    setAppliedServices({ ...draftServices });
  };

  const toggleDraftService = (id) => {
    setDraftServices((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredClubs = useMemo(
    () => allDirectoryClubs.filter((c) => clubMatchesApplied(c, appliedProvince, appliedServices, search)),
    [allDirectoryClubs, appliedProvince, appliedServices, search]
  );

  return (
    <div className="bg-surface min-h-screen text-on-surface overflow-x-hidden">
      <SEOHead
        title="Clubes oficiales – Nosework Trial"
        description="Directorio de clubes participantes, afiliación y cómo organizar una prueba oficial."
        canonical="/clubs"
        ogImage="/images/og-image.jpg"
      />
      <Navbar />

      <HeroSection
        layout="compact"
        compactOverlay="soft"
        align="center"
        title="Clubes oficiales"
        subtitle="Forma parte de la red de centros especializados en detección deportiva. Encuentra un club y comienza tu camino en el Nosework Trial."
        backgroundImage="/images/hero-dog.webp"
      />

      <ClubsFiltersMap
        draftProvince={draftProvince}
        draftServices={draftServices}
        onProvinceChange={setDraftProvince}
        onServiceToggle={toggleDraftService}
        onApply={handleApply}
        provinceOptions={provinceOptions}
      />

      <div className="max-w-container-max mx-auto px-6 -mt-4 pb-6">
        <label className="block max-w-xl mx-auto lg:mx-0">
          <span className="sr-only">Buscar club por nombre</span>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nombre de club…"
            className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-white text-sm focus:ring-2 focus:ring-secondary focus:border-secondary"
          />
        </label>
      </div>

      <ClubsPartnerGrid clubs={filteredClubs} contactHref={contactHref} />

      <ClubsAffiliationSection contactHref={contactHref} clubCount={allDirectoryClubs.length} />

      <ClubsOrganizeStepsSection />

      <section className="py-12 bg-surface-container-low border-t border-outline-variant">
        <div className="max-w-container-max mx-auto px-6 text-center">
          <p className="text-on-surface-variant mb-4">¿Quieres proponer una prueba o resolver dudas de organización?</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href={competicionesHref}
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg border-2 border-primary text-primary font-bold hover:bg-primary hover:text-on-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
            >
              Competiciones
            </Link>
            <Link
              href={contactHref}
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-secondary text-on-secondary font-bold hover:brightness-110 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
            >
              Contacto
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
