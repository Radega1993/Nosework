import Link from "next/link";
import { useContext, useEffect, useCallback, useState } from "react";
import EventCard from "@/components/Event/EventCard";
import EventModal from "@/components/Event/EventModal";
import useEvents from "@/hooks/useEvents";
import { EVENT_AUDIENCE } from "@/utils/eventClubMigrations";
import AuthContext from "@/contexts/AuthContext";
import { useLocalizedLink } from "@/hooks/useLocalizedLink";

function levelsFromEventRow(event) {
  let arr = [];
  try {
    if (event.levels_json) arr = JSON.parse(event.levels_json);
  } catch {
    arr = [];
  }
  if (!Array.isArray(arr) || arr.length === 0) {
    return { levelBasic: true, levelAdvanced: true };
  }
  return {
    levelBasic: arr.includes("basic"),
    levelAdvanced: arr.includes("advanced"),
  };
}

const emptyEventForm = {
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
};

/**
 * Listado y edición de eventos; la alta de pruebas se hace en página dedicada (Mi club o enlaces aquí).
 */
export default function DashboardOrganizerSection() {
  const { user, apiCall } = useContext(AuthContext);
  const { localizedHref } = useLocalizedLink();
  const [token, setToken] = useState(null);
  const [clubSelectOptions, setClubSelectOptions] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [eventData, setEventData] = useState(emptyEventForm);
  const [judgeUsers, setJudgeUsers] = useState([]);
  const [mapPreview, setMapPreview] = useState(null);
  const [mapError, setMapError] = useState("");
  const [mapLoading, setMapLoading] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !user) return;
    setToken(localStorage.getItem("token"));
  }, [user]);

  const isStaff = user?.role === "administrador" || user?.role === "organizador";
  const uid = user?.id != null ? Number(user.id) : null;

  const loadClubs = useCallback(async () => {
    if (!user) return;
    try {
      const res = await apiCall("/api/clubs");
      if (!res.ok) return;
      const data = await res.json().catch(() => ({}));
      const list = data.clubs || [];
      if (isStaff) {
        setClubSelectOptions(list);
      } else {
        setClubSelectOptions(uid != null ? list.filter((c) => Number(c.owner_user_id) === uid) : []);
      }
    } catch {
      setClubSelectOptions([]);
    }
  }, [user, apiCall, isStaff, uid]);

  useEffect(() => {
    loadClubs();
  }, [loadClubs]);

  const { events, saveEvent, removeEvent } = useEvents(token);

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
    } catch (e) {
      setMapError(e.message || "Error");
      setMapPreview(null);
    } finally {
      setMapLoading(false);
    }
  }, [apiCall, eventData.municipality, eventData.province, eventData.postalCode, eventData.venueAddress]);

  const handleCloseModal = () => {
    setEditModalOpen(false);
    setMapPreview(null);
    setMapError("");
    setJudgeUsers([]);
  };

  const handleEdit = async (event) => {
    setMapError("");
    let ev = event;
    try {
      const res = await apiCall(`/api/events/${event.id}`);
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.event) ev = data.event;
    } catch {
      // usar fila del listado
    }
    const lv = levelsFromEventRow(ev);
    setEventData({
      id: ev.id,
      date: ev.date || "",
      title: ev.title || "",
      description: ev.description || "",
      clubId: ev.club_id != null ? String(ev.club_id) : "",
      audience: ev.audience || EVENT_AUDIENCE.OPEN,
      kind: ev.kind || "",
      municipality: ev.municipality || "",
      province: ev.province || "",
      postalCode: ev.postal_code || "",
      venueAddress: ev.venue_address || "",
      priceEuros: ev.price_euros != null && ev.price_euros !== "" ? String(ev.price_euros) : "",
      mealPriceEuros: ev.meal_price_euros != null && ev.meal_price_euros !== "" ? String(ev.meal_price_euros) : "",
      scheduleDetails: ev.schedule_details || "",
      registrationPhone: ev.registration_phone || "",
      ...lv,
    });
    setJudgeUsers(
      Array.isArray(ev.judges)
        ? ev.judges.map((j) => ({
            id: j.id,
            display_name: j.display_name,
            is_judge: Boolean(j.is_judge),
            public_id: j.public_id || null,
          }))
        : []
    );
    if (ev.latitude != null && ev.longitude != null) {
      setMapPreview({ lat: ev.latitude, lon: ev.longitude });
    } else {
      setMapPreview(null);
    }
    setEditModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await saveEvent({ ...eventData, judgeUserIds: judgeUsers.map((j) => j.id) }, true);
    handleCloseModal();
  };

  return (
    <section className="rounded-xl border border-outline-variant bg-surface-container-lowest p-6 shadow-soft">
      <h3 className="font-montserrat text-xl font-semibold text-primary mb-2">Organización de eventos</h3>
      <p className="text-sm text-on-surface-variant mb-6">
        Como organizador o responsable de club puedes publicar pruebas en el calendario. Usa el formulario completo
        (localidad, precios, cronograma, niveles, jueces, mapa…) desde «Mi club» o desde los accesos siguientes.
      </p>

      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {clubSelectOptions.length === 1 ? (
          <Link
            href={localizedHref(`/dashboard/clubs/${clubSelectOptions[0].id}/evento/nuevo`)}
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-primary text-white font-bold text-sm hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
          >
            Crear prueba o evento
          </Link>
        ) : clubSelectOptions.length > 1 ? (
          clubSelectOptions.map((c) => (
            <Link
              key={c.id}
              href={localizedHref(`/dashboard/clubs/${c.id}/evento/nuevo`)}
              className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg border-2 border-primary text-primary font-bold text-sm hover:bg-primary/5"
            >
              Nueva prueba — {c.display_name || c.name}
            </Link>
          ))
        ) : isStaff ? (
          <p className="text-sm text-on-surface-variant text-center max-w-md">
            No hay clubs en el listado filtrado. Como administrador/organizador puedes crear eventos generales desde
            herramientas internas o asociar un club existente.
          </p>
        ) : (
          <Link
            href={localizedHref("/dashboard/club")}
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-secondary text-on-secondary font-bold text-sm hover:brightness-105"
          >
            Registrar o gestionar mi club
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onEdit={handleEdit}
            onDelete={(id) => removeEvent(id)}
            manageParticipantsHref={localizedHref(`/eventos/${event.id}#participantes`)}
          />
        ))}
      </div>

      <EventModal
        isOpen={editModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        eventData={eventData}
        onChange={(e) => {
          const { name, value, type, checked } = e.target;
          setEventData((prev) => ({
            ...prev,
            [name]: type === "radio" ? value : type === "checkbox" ? checked : value,
          }));
        }}
        isEditMode
        clubSelectOptions={clubSelectOptions}
        allowEventWithoutClub={isStaff}
        clubIdForJudgeSearch={
          eventData.clubId !== "" && eventData.clubId != null && !Number.isNaN(Number(eventData.clubId))
            ? Number(eventData.clubId)
            : null
        }
        apiCall={apiCall}
        judgeUsers={judgeUsers}
        onJudgeUsersChange={setJudgeUsers}
        mapPreview={mapPreview}
        mapError={mapError}
        mapLoading={mapLoading}
        onPreviewMap={handlePreviewMap}
      />
    </section>
  );
}
