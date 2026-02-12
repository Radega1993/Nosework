import { useState, memo } from "react";
import Button from "@/components/Button";

/**
 * EventFilters component for filtering events by date, level, type, location, and status
 * @param {Object} filters - Current filter state
 * @param {Function} onUpdateFilters - Callback to update filters
 * @param {Function} onClearFilters - Callback to clear all filters
 * @param {Object} availableData - Available filter options (levels, types, locations, statuses)
 */
function EventFilters({ filters, onUpdateFilters, onClearFilters, availableData = {} }) {
  const [isOpen, setIsOpen] = useState(false);

  // Get unique values from available events data
  const availableLevels = availableData.levels || [];
  const availableTypes = availableData.types || [];
  const availableLocations = availableData.locations || [];
  const availableStatuses = availableData.statuses || ["open", "closed", "cancelled"];

  const handleLevelChange = (level) => {
    const newLevels = filters.level.includes(level)
      ? filters.level.filter((l) => l !== level)
      : [...filters.level, level];
    onUpdateFilters({ level: newLevels });
  };

  const handleTypeChange = (type) => {
    const newTypes = filters.type.includes(type)
      ? filters.type.filter((t) => t !== type)
      : [...filters.type, type];
    onUpdateFilters({ type: newTypes });
  };

  const handleStatusChange = (status) => {
    const newStatuses = filters.status.includes(status)
      ? filters.status.filter((s) => s !== status)
      : [...filters.status, status];
    onUpdateFilters({ status: newStatuses });
  };

  const handleLocationChange = (e) => {
    onUpdateFilters({ location: e.target.value });
  };

  const handleDateFromChange = (e) => {
    onUpdateFilters({ dateFrom: e.target.value });
  };

  const handleDateToChange = (e) => {
    onUpdateFilters({ dateTo: e.target.value });
  };

  const hasActiveFilters =
    filters.dateFrom ||
    filters.dateTo ||
    filters.level.length > 0 ||
    filters.type.length > 0 ||
    filters.location ||
    filters.status.length > 0;

  return (
    <div className="mb-6">
      {/* Mobile: Collapsible Button */}
      <div className="md:hidden mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
          aria-expanded={isOpen}
          aria-controls="filters-content"
        >
          <span className="font-semibold text-gray-700">
            Filtros {hasActiveFilters && `(${filters.level.length + filters.type.length + filters.status.length + (filters.location ? 1 : 0) + (filters.dateFrom || filters.dateTo ? 1 : 0)})`}
          </span>
          <span className={`transform transition-transform ${isOpen ? "rotate-180" : ""}`}>
            ▼
          </span>
        </button>
      </div>

      {/* Filters Content */}
      <div
        id="filters-content"
        className={`${isOpen ? "block" : "hidden"} md:block bg-white border border-gray-200 rounded-lg p-6 shadow-sm`}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">Filtros</h3>
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="text-sm text-primary-600 hover:text-primary-700 font-semibold focus:outline-none focus:ring-2 focus:ring-primary-500 rounded"
            >
              Limpiar todo
            </button>
          )}
        </div>

        <div className="space-y-6">
          {/* Date Range Filter */}
          <fieldset className="space-y-2">
            <legend className="text-sm font-semibold text-gray-700 mb-2">Rango de Fechas</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="dateFrom" className="block text-sm text-gray-600 mb-1">
                  Desde
                </label>
                <input
                  type="date"
                  id="dateFrom"
                  value={filters.dateFrom}
                  onChange={handleDateFromChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label htmlFor="dateTo" className="block text-sm text-gray-600 mb-1">
                  Hasta
                </label>
                <input
                  type="date"
                  id="dateTo"
                  value={filters.dateTo}
                  onChange={handleDateToChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
          </fieldset>

          {/* Level Filter */}
          {availableLevels.length > 0 && (
            <fieldset className="space-y-2">
              <legend className="text-sm font-semibold text-gray-700 mb-2">Nivel</legend>
              <div className="flex flex-wrap gap-2">
                {availableLevels.map((level) => (
                  <label
                    key={level}
                    className="flex items-center px-3 py-2 border rounded-lg cursor-pointer hover:bg-gray-50 focus-within:ring-2 focus-within:ring-primary-500"
                  >
                    <input
                      type="checkbox"
                      checked={filters.level.includes(level)}
                      onChange={() => handleLevelChange(level)}
                      className="mr-2"
                    />
                    <span className="text-sm">
                      {level === "base" || level === "Base" ? "Base" : level === "avanzado" || level === "Avanzado" ? "Avanzado" : level}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          )}

          {/* Type Filter */}
          {availableTypes.length > 0 && (
            <fieldset className="space-y-2">
              <legend className="text-sm font-semibold text-gray-700 mb-2">Tipo</legend>
              <div className="flex flex-wrap gap-2">
                {availableTypes.map((type) => (
                  <label
                    key={type}
                    className="flex items-center px-3 py-2 border rounded-lg cursor-pointer hover:bg-gray-50 focus-within:ring-2 focus-within:ring-primary-500"
                  >
                    <input
                      type="checkbox"
                      checked={filters.type.includes(type)}
                      onChange={() => handleTypeChange(type)}
                      className="mr-2"
                    />
                    <span className="text-sm capitalize">{type}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          )}

          {/* Location Filter */}
          <fieldset className="space-y-2">
            <legend className="text-sm font-semibold text-gray-700 mb-2">Ubicación</legend>
            <input
              type="text"
              placeholder="Buscar por ciudad o ubicación..."
              value={filters.location}
              onChange={handleLocationChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </fieldset>

          {/* Status Filter */}
          {availableStatuses.length > 0 && (
            <fieldset className="space-y-2">
              <legend className="text-sm font-semibold text-gray-700 mb-2">Estado</legend>
              <div className="flex flex-wrap gap-2">
                {availableStatuses.map((status) => (
                  <label
                    key={status}
                    className="flex items-center px-3 py-2 border rounded-lg cursor-pointer hover:bg-gray-50 focus-within:ring-2 focus-within:ring-primary-500"
                  >
                    <input
                      type="checkbox"
                      checked={filters.status.includes(status)}
                      onChange={() => handleStatusChange(status)}
                      className="mr-2"
                    />
                    <span className="text-sm capitalize">
                      {status === "open" ? "Abierto" : status === "closed" ? "Cerrado" : status === "cancelled" ? "Cancelado" : status}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(EventFilters);
