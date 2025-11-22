export const fetchEvents = async (token) => {
    const response = await fetch("/api/events", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (!response.ok) throw new Error("Error al cargar eventos");
    return response.json();
};

export const createOrUpdateEvent = async (token, eventData, isEditMode) => {
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
    if (!response.ok) throw await response.json();
    return response.json();
};

export const deleteEvent = async (token, id) => {
    const response = await fetch(`/api/events/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (!response.ok) throw await response.json();
};
