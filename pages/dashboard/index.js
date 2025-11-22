import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import AuthContext from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventCard from "@/components/Event/EventCard";
import EventModal from "@/components/Event/EventModal";
import useEvents from "@/hooks/useEvents";

export default function OrganizerDashboard() {
    const { user } = useContext(AuthContext);
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [eventData, setEventData] = useState({ id: null, date: "", title: "", description: "" });

    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const { events, saveEvent, removeEvent } = useEvents(token);

    // Redirige al usuario al login si no tiene acceso, pero solo en el cliente
    useEffect(() => {
        if (!user || user.role !== "organizador") {
            router.push("/login");
        }
    }, [user, router]);

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

    if (!user || user.role !== "organizador") {
        // Muestra un estado vacío mientras se redirige
        return null;
    }

    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar />
            <main className="p-6 mt-16">
                <h1 className="text-4xl font-bold text-center mb-6">Dashboard del Organizador</h1>
                <div className="flex justify-center mb-6">
                    <button
                        onClick={() => {
                            setEventData({ id: null, date: "", title: "", description: "" });
                            setIsEditMode(false);
                            setIsModalOpen(true);
                        }}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
                    >
                        Crear Nuevo Evento
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {events.map((event) => (
                        <EventCard
                            key={event.id}
                            event={event}
                            onEdit={handleEdit}
                            onDelete={(id) => removeEvent(id)}
                        />
                    ))}
                </div>
                <EventModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleSubmit}
                    eventData={eventData}
                    onChange={(e) =>
                        setEventData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
                    }
                    isEditMode={isEditMode}
                />
            </main>
            <Footer />
        </div>
    );
}
