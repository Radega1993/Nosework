import Link from "next/link";
import { memo } from "react";

/**
 * Date formatting utility function
 * Formats a date string to Spanish locale format (e.g., "15 de marzo de 2025")
 */
function formatDateSpanish(dateString) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

/**
 * Public EventCard component for displaying events in list/grid views
 * @param {Object} event - Event object with id, title, date, location, level, etc.
 * @param {boolean} compact - If true, displays in compact mode for list view
 * @param {boolean} showImage - If true, displays event image (only in full mode)
 */
function EventCardPublic({ event, compact = false, showImage = true }) {
  if (!event) return null;

  const cardClasses = compact
    ? "card text-left hover:shadow-lg transition-shadow"
    : "card text-left hover:shadow-lg transition-shadow";

  return (
    <article
      className={cardClasses}
      aria-labelledby={`event-title-${event.id}`}
    >
      {/* Optional Image */}
      {showImage && !compact && (
        <div className="relative w-full h-48 mb-4 rounded-t-lg overflow-hidden">
          {/* Placeholder or actual image if available */}
          <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
            <span className="text-primary-400 text-4xl">🐕</span>
          </div>
        </div>
      )}

      {/* Event Content */}
      <div className={compact ? "p-3" : "p-4"}>
        {/* Title */}
        <h3
          id={`event-title-${event.id}`}
          className={`font-bold mb-2 text-primary-600 ${
            compact ? "text-base" : "text-h4"
          }`}
        >
          {event.title}
        </h3>

        {/* Event Details */}
        <div className={`space-y-2 mb-3 ${compact ? "text-sm" : ""}`}>
          {/* Date */}
          <p className="text-gray-700">
            <span className="font-semibold">Fecha:</span>{" "}
            {formatDateSpanish(event.date)}
          </p>

          {/* Location */}
          {event.location && (
            <p className="text-gray-700">
              <span className="font-semibold">Ubicación:</span> {event.location}
            </p>
          )}

          {/* City */}
          {event.city && !event.location && (
            <p className="text-gray-700">
              <span className="font-semibold">Ciudad:</span> {event.city}
            </p>
          )}

          {/* Level Badge */}
          {event.level && (
            <span className="inline-block px-3 py-1 text-sm font-semibold rounded-full bg-primary-100 text-primary-700">
              {event.level === "base" || event.level === "Base"
                ? "Base"
                : event.level === "avanzado" || event.level === "Avanzado"
                ? "Avanzado"
                : event.level}
            </span>
          )}

          {/* Type Badge */}
          {event.type && (
            <span className="inline-block px-3 py-1 text-sm font-semibold rounded-full bg-secondary-100 text-secondary-700 ml-2">
              {event.type}
            </span>
          )}
        </div>

        {/* Description (only in full mode) */}
        {!compact && event.description && (
          <p className="text-body-sm text-gray-600 mb-4 line-clamp-2">
            {event.description}
          </p>
        )}

        {/* Link to Detail Page */}
        <Link
          href={`/events/${event.id}`}
          className="text-primary-600 hover:text-primary-700 font-semibold text-sm inline-flex items-center focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded"
          aria-label={`Ver detalles de ${event.title}`}
        >
          Ver detalles →
        </Link>
      </div>
    </article>
  );
}

export default memo(EventCardPublic);
