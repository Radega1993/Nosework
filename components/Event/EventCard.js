export default function EventCard({ event, onEdit, onDelete }) {
    return (
        <div className="bg-white p-4 shadow rounded">
            <h3 className="text-lg font-bold">{event.title}</h3>
            <p>{event.description}</p>
            <p className="text-sm text-gray-500">{event.date}</p>
            <div className="flex justify-between mt-4">
                <button
                    onClick={() => onEdit(event)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
                >
                    Editar
                </button>
                <button
                    onClick={() => onDelete(event.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                >
                    Eliminar
                </button>
            </div>
        </div>
    );
}
