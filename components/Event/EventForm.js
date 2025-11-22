export default function EventForm({ eventData, onChange, onSubmit, onCancel, isEditMode }) {
    return (
        <form onSubmit={onSubmit} className="space-y-4">
            <div>
                <label htmlFor="date" className="block text-sm font-bold mb-2">
                    Fecha
                </label>
                <input
                    type="date"
                    id="date"
                    name="date"
                    value={eventData.date}
                    onChange={onChange}
                    className="border p-2 w-full rounded"
                    required
                />
            </div>
            <div>
                <label htmlFor="title" className="block text-sm font-bold mb-2">
                    Título
                </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={eventData.title}
                    onChange={onChange}
                    className="border p-2 w-full rounded"
                    required
                />
            </div>
            <div>
                <label htmlFor="description" className="block text-sm font-bold mb-2">
                    Descripción
                </label>
                <textarea
                    id="description"
                    name="description"
                    value={eventData.description}
                    onChange={onChange}
                    className="border p-2 w-full rounded"
                    required
                />
            </div>
            <div className="flex justify-between">
                <button
                    type="button"
                    onClick={onCancel}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                    {isEditMode ? "Actualizar" : "Crear"}
                </button>
            </div>
        </form>
    );
}
