import { useState, useEffect } from "react";
import Swal from "sweetalert2";

const useEvents = (token) => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        if (token) fetchEvents();
    }, [token]);

    const fetchEvents = async () => {
        try {
            const response = await fetch("/api/events", {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                const data = await response.json();
                setEvents(data.events || []);
            } else {
                throw new Error("Error al cargar eventos");
            }
        } catch (error) {
            Swal.fire("Error", error.message, "error");
        }
    };

    const saveEvent = async (eventData, isEditMode) => {
        try {
            const method = isEditMode ? "PUT" : "POST";
            const url = isEditMode ? `/api/events/${eventData.id}` : "/api/events";

            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(eventData),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || "Error al guardar el evento");
            }

            fetchEvents();
        } catch (error) {
            Swal.fire("Error", error.message, "error");
        }
    };

    const removeEvent = async (id) => {
        try {
            const response = await fetch(`/api/events/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!response.ok) throw new Error("Error al eliminar el evento");

            fetchEvents();
        } catch (error) {
            Swal.fire("Error", error.message, "error");
        }
    };

    return { events, fetchEvents, saveEvent, removeEvent };
};

export default useEvents;
