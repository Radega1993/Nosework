import { useState, useEffect } from "react";
import EventCard from "@/components/Event/EventCard";
import EventModal from "@/components/Event/EventModal";
import useEvents from "@/hooks/useEvents";

/**
 * CRUD de eventos para organizadores / dueños de club (misma API que antes).
 */
export default function DashboardOrganizerSection() {
  const [token, setToken] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [eventData, setEventData] = useState({ id: null, date: "", title: "", description: "" });

  useEffect(() => {
    setToken(typeof window !== "undefined" ? localStorage.getItem("token") : null);
  }, []);

  const { events, saveEvent, removeEvent } = useEvents(token);

  const handleEdit = (event) => {
    setEventData(event);
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
        Como organizador o dueño de club puedes crear y editar eventos publicados en el calendario.
      </p>
      <div className="flex justify-center mb-6">
        <button
          type="button"
          onClick={() => {
            setEventData({ id: null, date: "", title: "", description: "" });
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
        onChange={(e) => setEventData((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
        isEditMode={isEditMode}
      />
    </section>
  );
}
