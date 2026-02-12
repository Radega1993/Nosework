import { useState, useEffect, memo } from "react";

/**
 * EventSearch component for searching events by title and description
 * @param {string} searchQuery - Current search query
 * @param {Function} onUpdateSearch - Callback to update search query (debounced)
 * @param {Function} onClearSearch - Callback to clear search
 */
function EventSearch({ searchQuery, onUpdateSearch, onClearSearch }) {
  const [localQuery, setLocalQuery] = useState(searchQuery);

  // Sync local state with prop
  useEffect(() => {
    setLocalQuery(searchQuery);
  }, [searchQuery]);

  const handleChange = (e) => {
    const value = e.target.value;
    setLocalQuery(value);
    onUpdateSearch(value);
  };

  const handleClear = () => {
    setLocalQuery("");
    onClearSearch();
  };

  return (
    <div className="mb-6">
      <div className="relative">
        <input
          type="text"
          placeholder="Buscar eventos por título o descripción..."
          value={localQuery}
          onChange={handleChange}
          className="w-full px-4 py-3 pl-10 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          aria-label="Buscar eventos"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        {localQuery && (
          <button
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-3 flex items-center focus:outline-none focus:ring-2 focus:ring-primary-500 rounded"
            aria-label="Limpiar búsqueda"
          >
            <svg
              className="h-5 w-5 text-gray-400 hover:text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

export default memo(EventSearch);
