import Link from "next/link";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import AuthContext from "@/contexts/AuthContext";
import { DashboardLayout } from "@/components/dashboard";
import EventForm from "@/components/Event/EventForm";
import { useLocalizedLink } from "@/hooks/useLocalizedLink";
import { EVENT_AUDIENCE } from "@/utils/eventClubMigrations";

const defaultEvent = () => ({
  id: null,
  date: "",
  title: "",
  description: "",
  clubId: "",
  audience: EVENT_AUDIENCE.OPEN,
  kind: "",
  municipality: "",
  province: "",
  postalCode: "",
  venueAddress: "",
  priceEuros: "",
  mealPriceEuros: "",
  scheduleDetails: "",
  registrationPhone: "",
  levelBasic: true,
  levelAdvanced: true,
});

export default function NuevoEventoClubPage() {
  const { user, loading, apiCall, logout } = useContext(AuthContext);
  const router = useRouter();
  const { localizedHref } = useLocalizedLink();
  const clubIdNum = Number(router.query.clubId);
  const [ownedClubs, setOwnedClubs] = useState([]);
  const [clubDetail, setClubDetail] = useState(null);
  const [eventData, setEventData] = useState(() => defaultEvent());
  const [judgeUsers, setJudgeUsers] = useState([]);
  const [mapPreview, setMapPreview] = useState(null);
  const [mapError, setMapError] = useState("");
  const [mapLoading, setMapLoading] = useState(false);
  const [submitErr, setSubmitErr] = useState("");
  const [busy, setBusy] = useState(false);

  const isAdmin = user?.role === "administrador";

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [loading, user, router]);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await apiCall("/api/me/dashboard");
        const data = await res.json().catch(() => ({}));
        if (res.ok && !cancelled) setOwnedClubs(data.ownedClubs || []);
      } catch {
        if (!cancelled) setOwnedClubs([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [user, apiCall]);

  useEffect(() => {
    if (!user || !router.isReady || !clubIdNum || Number.isNaN(clubIdNum)) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await apiCall(`/api/clubs/${clubIdNum}`);
        const data = await res.json().catch(() => ({}));
        if (res.ok && !cancelled) setClubDetail(data.club || null);
      } catch {
        if (!cancelled) setClubDetail(null);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [user, router.isReady, clubIdNum, apiCall]);

  useEffect(() => {
    if (router.isReady && clubIdNum && !Number.isNaN(clubIdNum)) {
      setEventData((p) => ({ ...p, clubId: String(clubIdNum) }));
    }
  }, [router.isReady, clubIdNum]);

  const canCreate = useMemo(() => {
    if (!user || !clubIdNum || Number.isNaN(clubIdNum)) return false;
    if (isAdmin) return true;
    return ownedClubs.some((c) => Number(c.id) === clubIdNum);
  }, [user, clubIdNum, isAdmin, ownedClubs]);

  const clubSelectOptions = useMemo(() => {
    if (!clubDetail) return [];
    return [
      {
        id: clubDetail.id,
        name: clubDetail.name,
        display_name: clubDetail.display_name || clubDetail.name,
        status: clubDetail.status,
        owner_user_id: clubDetail.owner_user_id,
      },
    ];
  }, [clubDetail]);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEventData((prev) => ({
      ...prev,
      [name]: type === "radio" ? value : type === "checkbox" ? checked : value,
    }));
  };

  const handlePreviewMap = useCallback(async () => {
    setMapError("");
    setMapLoading(true);
    try {
      const res = await apiCall("/api/events/geocode-preview", {
        method: "POST",
        body: JSON.stringify({
          municipality: eventData.municipality,
          province: eventData.province,
          postalCode: eventData.postalCode,
          venueAddress: eventData.venueAddress,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "No se pudo geolocalizar");
      setMapPreview({ lat: data.lat, lon: data.lon });
    } catch (err) {
      setMapError(err.message || "Error");
      setMapPreview(null);
    } finally {
      setMapLoading(false);
    }
  }, [apiCall, eventData.municipality, eventData.province, eventData.postalCode, eventData.venueAddress]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitErr("");
    setBusy(true);
    try {
      const payload = {
        ...eventData,
        clubId: String(clubIdNum),
        judgeUserIds: judgeUsers.map((j) => j.id),
      };
      const res = await apiCall("/api/events", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "No se pudo crear la prueba");
      await router.push(localizedHref("/dashboard"));
    } catch (err) {
      setSubmitErr(err.message || "Error al guardar");
    } finally {
      setBusy(false);
    }
  };

  if (loading || (!user && router.isReady)) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center text-on-surface-variant">
        Cargando…
      </div>
    );
  }

  if (!user) return null;

  if (!router.isReady || !clubIdNum || Number.isNaN(clubIdNum)) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center text-on-surface-variant">
        Cargando…
      </div>
    );
  }

  if (!canCreate) {
    return (
      <DashboardLayout onLogout={logout} isJudge={Boolean(user?.is_judge)} isAdmin={isAdmin}>
        <main className="flex-1 p-6">
          <p className="text-red-700">No tienes permiso para crear eventos en este club.</p>
          <Link href={localizedHref("/dashboard/club")} className="text-primary font-semibold mt-4 inline-block">
            Volver a Mi club
          </Link>
        </main>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout onLogout={logout} isJudge={Boolean(user?.is_judge)} isAdmin={isAdmin}>
      <main className="flex-1 p-6 lg:p-8 max-w-3xl">
        <Link href={localizedHref("/dashboard/club")} className="text-sm font-semibold text-primary hover:underline">
          ← Volver a Mi club
        </Link>
        <h1 className="font-montserrat text-2xl font-bold text-primary mt-4 mb-2">Nueva prueba / evento</h1>
        <p className="text-sm text-on-surface-variant mb-6 max-w-2xl">
          Completa la convocatoria con la información que verán los guías (localidad, precios, cronograma, niveles,
          contacto). Puedes inspirarte en el modelo de hoja de prueba de la comunidad (recepción, sorteos, horarios de
          cada nivel, comida opcional, etc.).
        </p>

        {submitErr ? (
          <p className="mb-4 rounded border border-red-200 bg-red-50 p-3 text-red-700" role="alert">
            {submitErr}
          </p>
        ) : null}

        {clubDetail ? (
          <div className="rounded-xl border border-outline-variant bg-white p-6 shadow-sm">
            <EventForm
              eventData={eventData}
              onChange={onChange}
              onSubmit={onSubmit}
              onCancel={() => router.push(localizedHref("/dashboard/club"))}
              isEditMode={false}
              clubSelectOptions={clubSelectOptions}
              allowEventWithoutClub={false}
              clubLocked
              apiCall={apiCall}
              clubIdForJudgeSearch={clubIdNum}
              judgeUsers={judgeUsers}
              onJudgeUsersChange={setJudgeUsers}
              mapPreview={mapPreview}
              mapError={mapError}
              mapLoading={mapLoading}
              onPreviewMap={handlePreviewMap}
            />
            {busy ? <p className="text-sm text-on-surface-variant mt-3">Guardando…</p> : null}
          </div>
        ) : (
          <p className="text-on-surface-variant">Cargando datos del club…</p>
        )}
      </main>
    </DashboardLayout>
  );
}
