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
 * Short date for label (e.g. "15 Mar 2025")
 */
function formatDateShort(dateString) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

/**
 * Public EventCard component for displaying events in list/grid views
 * @param {Object} event - Event object with id, title, date, location, level, etc.
 * @param {boolean} compact - If true, displays in compact mode for list view
 * @param {boolean} showImage - If true, displays event image (only in full mode)
 * @param {string} linkText - Link text (e.g. "Leer más", "Ver detalles")
 * @param {string} variant - "default" | "featured" (homepage: image, date label, title, link; hover zoom + title color)
 */
function EventCardPublic({ event, compact = false, showImage = true, linkText = "Ver detalles →", variant = "default" }) {
  if (!event) return null;

  const isFeatured = variant === "featured";
  const detailHref = `/events/${event.id}`;

  if (isFeatured) {
    return (
      <Link
        href={detailHref}
        className="group block bg-white rounded-lg overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:shadow-xl hover:-translate-y-[6px] transition-all duration-200 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
        aria-labelledby={`event-title-${event.id}`}
      >
        <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#F4F6F8]">
          <div className="absolute inset-0 flex items-center justify-center transition-transform duration-200 group-hover:scale-105 bg-gradient-to-br from-navy-50 to-navy-100">
            <span className="text-navy-400 text-4xl" aria-hidden>🐕</span>
          </div>
        </div>
        <div className="p-5">
          <span className="inline-block text-xs font-semibold text-neutral-text-medium mb-2">
            {formatDateShort(event.date)}
          </span>
          <h3
            id={`event-title-${event.id}`}
            className="text-lg font-semibold text-neutral-text-dark mb-2 transition-colors duration-200 group-hover:text-gold"
          >
            {event.title}
          </h3>
          {event.description && (
            <p className="text-body-redesign text-neutral-text-medium line-clamp-2 mb-3">
              {event.description}
            </p>
          )}
          <span className="text-gold font-semibold text-sm inline-flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded">
            {linkText}
          </span>
        </div>
      </Link>
    );
  }

  const cardClasses = compact
    ? "card text-left hover:shadow-lg transition-shadow"
    : "card text-left hover:shadow-lg transition-shadow";

  return (
    <article
      className={cardClasses}
      aria-labelledby={`event-title-${event.id}`}
    >
      {showImage && !compact && (
        <div className="relative w-full h-48 mb-4 rounded-t-lg overflow-hidden">
          <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
            <span className="text-primary-400 text-4xl">🐕</span>
          </div>
        </div>
      )}

      <div className={compact ? "p-3" : "p-4"}>
        <h3
          id={`event-title-${event.id}`}
          className={`font-bold mb-2 text-primary-600 ${compact ? "text-base" : "text-h4"}`}
        >
          {event.title}
        </h3>

        <div className={`space-y-2 mb-3 ${compact ? "text-sm" : ""}`}>
          <p className="text-gray-700">
            <span className="font-semibold">Fecha:</span> {formatDateSpanish(event.date)}
          </p>
          {event.location && (
            <p className="text-gray-700">
              <span className="font-semibold">Ubicación:</span> {event.location}
            </p>
          )}
          {event.city && !event.location && (
            <p className="text-gray-700">
              <span className="font-semibold">Ciudad:</span> {event.city}
            </p>
          )}
          {event.level && (
            <span className="inline-block px-3 py-1 text-sm font-semibold rounded-full bg-primary-100 text-primary-700">
              {event.level === "base" || event.level === "Base" ? "Base" : event.level === "avanzado" || event.level === "Avanzado" ? "Avanzado" : event.level}
            </span>
          )}
          {event.type && (
            <span className="inline-block px-3 py-1 text-sm font-semibold rounded-full bg-secondary-100 text-secondary-700 ml-2">
              {event.type}
            </span>
          )}
        </div>

        {!compact && event.description && (
          <p className="text-body-sm text-gray-600 mb-4 line-clamp-2">{event.description}</p>
        )}

        <Link
          href={detailHref}
          className="text-primary-600 hover:text-primary-700 font-semibold text-sm inline-flex items-center focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded"
          aria-label={`Ver detalles de ${event.title}`}
        >
          {linkText}
        </Link>
      </div>
    </article>
  );
}

export default memo(EventCardPublic);
