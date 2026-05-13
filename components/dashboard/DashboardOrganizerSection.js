import { useState, useEffect, useCallback } from "react";
import EventCard from "@/components/Event/EventCard";
import EventModal from "@/components/Event/EventModal";
import useEvents from "@/hooks/useEvents";
import { EVENT_AUDIENCE } from "@/utils/eventClubMigrations";

const defaultEvent = {
  id: null,
  date: "",
  title: "",
  description: "",
  clubId: "",
  audience: EVENT_AUDIENCE.OPEN,
  kind: "",
};

/**
 * CRUD de eventos para organizadores / dueños de club.
 */
export default function DashboardOrganizerSection() {
  const [token, setToken] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [clubSelectOptions, setClubSelectOptions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [eventData, setEventData] = useState(defaultEvent);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setToken(localStorage.getItem("token"));
    try {
      const u = localStorage.getItem("user");
      if (u) {
        const parsed = JSON.parse(u);
        setUserRole(parsed?.role || null);
      }
    } catch {
      setUserRole(null);
    }
  }, []);

  const isStaff = userRole === "administrador" || userRole === "organizador";

  const loadClubs = useCallback(async () => {
    if (!token) return;
    try {
      const res = await fetch("/api/clubs", { headers: { Authorization: `Bearer ${token}` } });
      if (!res.ok) return;
      const data = await res.json();
      const list = data.clubs || [];
      const uid = (() => {
        try {
          return JSON.parse(localStorage.getItem("user") || "{}")?.id;
        } catch {
          return null;
        }
      })();
      if (isStaff) {
        setClubSelectOptions(list);
      } else {
        setClubSelectOptions(uid != null ? list.filter((c) => Number(c.owner_user_id) === Number(uid)) : []);
      }
    } catch {
      setClubSelectOptions([]);
    }
  }, [token, isStaff]);

  useEffect(() => {
    loadClubs();
  }, [loadClubs]);

  const { events, saveEvent, removeEvent } = useEvents(token);

  const handleEdit = (event) => {
    setEventData({
      id: event.id,
      date: event.date || "",
      title: event.title || "",
      description: event.description || "",
      clubId: event.club_id != null ? String(event.club_id) : "",
      audience: event.audience || EVENT_AUDIENCE.OPEN,
      kind: event.kind || "",
    });
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await saveEvent(eventData, isEditMode);
    setIsModalOpen(false);
  };

  return (
    <section className="rounded-xl border border-outline-variant bg-surface-container-lowest p-6 shadow-soft">
      <h3 className="font-montserrat text-xl font-semibold text-primary mb-2">Organización de eventos</h3>
      <p className="text-sm text-on-surface-variant mb-6">
        Como organizador o dueño de club puedes crear y editar eventos publicados en el calendario. Los eventos
        pueden ligarse a un club y ser abiertos (inscripción para cualquier usuario registrado) o solo para
        miembros activos del club.
      </p>
      <div className="flex justify-center mb-6">
        <button
          type="button"
          onClick={() => {
            setEventData({
              ...defaultEvent,
              clubId: !isStaff && clubSelectOptions.length === 1 ? String(clubSelectOptions[0].id) : "",
            });
            setIsEditMode(false);
            setIsModalOpen(true);
          }}
          className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-primary text-white font-bold text-sm hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
        >
          Crear evento
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event) => (
          <EventCard key={event.id} event={event} onEdit={handleEdit} onDelete={(id) => removeEvent(id)} />
        ))}
      </div>
      <EventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        eventData={eventData}
        onChange={(e) => {
          const { name, value, type, checked } = e.target;
          setEventData((prev) => ({
            ...prev,
            [name]: type === "radio" ? value : type === "checkbox" ? checked : value,
          }));
        }}
        isEditMode={isEditMode}
        clubSelectOptions={clubSelectOptions}
        allowEventWithoutClub={isStaff}
      />
    </section>
  );
}
