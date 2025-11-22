import EventForm from "./EventForm";

export default function EventModal({ isOpen, onClose, onSubmit, eventData, onChange, isEditMode }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">
                    {isEditMode ? "Editar Evento" : "Crear Nuevo Evento"}
                </h2>
                <EventForm
                    eventData={eventData}
                    onChange={onChange}
                    onSubmit={onSubmit}
                    onCancel={onClose}
                    isEditMode={isEditMode}
                />
            </div>
        </div>
    );
}
