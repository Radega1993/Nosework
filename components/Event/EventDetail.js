import Button from "@/components/Button";
import { memo } from "react";
import { useLocalizedLink } from "@/hooks/useLocalizedLink";

/**
 * EventDetail component for displaying complete event information
 * @param {Object} event - Event object with all details (title, date, location, organizer, etc.)
 */

// Date formatting utility function
function formatDateSpanish(dateString) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function formatDateOnly(dateString) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

function EventDetail({ event }) {
  const { localizedHref } = useLocalizedLink();
  if (!event) return null;

  const isRegistrationOpen =
    event.status === "open" &&
    (!event.registration_end_date || new Date(event.registration_end_date) > new Date());

  const locationLine = event.location || event.city || event.address || null;
  const registerPath = `/eventos/${event.id}/register`;

  return (
    <article id="detalle-evento" className="space-y-8 scroll-mt-24">
      {/* Event Header */}
      <header>
        <h1 className="text-h1 font-bold mb-4 text-gray-900">{event.title}</h1>

        {/* Level and Type Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          {event.level && (
            <span className="inline-block px-4 py-2 text-sm font-semibold rounded-full bg-primary-100 text-primary-700">
              {event.level === "base" || event.level === "Base"
                ? "Base"
                : event.level === "avanzado" || event.level === "Avanzado"
                  ? "Avanzado"
                  : event.level}
            </span>
          )}
          {event.type && (
            <span className="inline-block px-4 py-2 text-sm font-semibold rounded-full bg-secondary-100 text-secondary-700">
              {event.type}
            </span>
          )}
          {event.status && (
            <span
              className={`inline-block px-4 py-2 text-sm font-semibold rounded-full ${
                event.status === "open"
                  ? "bg-green-100 text-green-700"
                  : event.status === "closed"
                    ? "bg-gray-100 text-gray-700"
                    : "bg-red-100 text-red-700"
              }`}
            >
              {event.status === "open" ? "Abierto" : event.status === "closed" ? "Cerrado" : "Cancelado"}
            </span>
          )}
        </div>
      </header>

      {/* Event Description — siempre visible si el organizador la rellenó */}
      <section>
        <h2 className="text-h3 font-bold mb-3 text-gray-900">Información publicada por el organizador</h2>
        {event.description ? (
          <div className="prose max-w-none rounded-xl border border-gray-200 bg-white p-6">
            <p className="text-body text-gray-700 whitespace-pre-line">{event.description}</p>
          </div>
        ) : (
          <p className="text-body text-gray-600">El organizador aún no ha publicado una descripción detallada.</p>
        )}
      </section>

      {/* Event Details Grid — campos que el creador puede completar en el futuro; hoy con fallbacks */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-h4 font-bold mb-3 text-gray-900">Fecha y hora</h3>
          <p className="text-body text-gray-700">{formatDateSpanish(event.date)}</p>
        </div>

        <div className="card">
          <h3 className="text-h4 font-bold mb-3 text-gray-900">Ubicación</h3>
          {locationLine ? (
            <div className="space-y-1 text-body text-gray-700">
              {event.location && <p>{event.location}</p>}
              {event.address && <p>{event.address}</p>}
              {event.city && event.postal_code && (
                <p>
                  {event.postal_code} {event.city}
                </p>
              )}
              {event.city && !event.postal_code && <p>{event.city}</p>}
            </div>
          ) : (
            <p className="text-body text-gray-600">Por confirmar. Consulta la descripción o contacta con el organizador.</p>
          )}
        </div>
      </section>

      {/* Registration Information */}
      {(event.price || event.registration_start_date || event.registration_end_date || event.max_participants) && (
        <section className="card">
          <h2 className="text-h3 font-bold mb-4 text-gray-900">Información de Inscripción</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {event.price && (
              <div>
                <p className="text-sm text-gray-600 mb-1">Precio</p>
                <p className="text-body-lg font-semibold text-gray-900">{event.price} €</p>
              </div>
            )}
            {event.max_participants && (
              <div>
                <p className="text-sm text-gray-600 mb-1">Plazas</p>
                <p className="text-body-lg font-semibold text-gray-900">
                  {event.registrations_count || 0} / {event.max_participants}
                </p>
              </div>
            )}
            {event.registration_start_date && (
              <div>
                <p className="text-sm text-gray-600 mb-1">Inicio de inscripciones</p>
                <p className="text-body text-gray-700">{formatDateOnly(event.registration_start_date)}</p>
              </div>
            )}
            {event.registration_end_date && (
              <div>
                <p className="text-sm text-gray-600 mb-1">Fin de inscripciones</p>
                <p className="text-body text-gray-700">{formatDateOnly(event.registration_end_date)}</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Organizer Information */}
      {event.organizer && (
        <section className="card">
          <h2 className="text-h3 font-bold mb-4 text-gray-900">Organizador</h2>
          <div className="space-y-2">
            {event.organizer.name && (
              <p className="text-body-lg font-semibold text-gray-900">{event.organizer.name}</p>
            )}
            {event.organizer.email && (
              <p className="text-body text-gray-700">
                <span className="font-semibold">Email:</span>{" "}
                <a href={`mailto:${event.organizer.email}`} className="text-primary-600 hover:text-primary-700">
                  {event.organizer.email}
                </a>
              </p>
            )}
            {event.organizer.phone && (
              <p className="text-body text-gray-700">
                <span className="font-semibold">Teléfono:</span>{" "}
                <a href={`tel:${event.organizer.phone}`} className="text-primary-600 hover:text-primary-700">
                  {event.organizer.phone}
                </a>
              </p>
            )}
            {event.organizer.website && (
              <p className="text-body text-gray-700">
                <a href={event.organizer.website} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700">
                  {event.organizer.website}
                </a>
              </p>
            )}
          </div>
        </section>
      )}

      {/* Registration CTA */}
      {isRegistrationOpen && (
        <div id="inscripcion" className="flex justify-center scroll-mt-24">
          <Button
            href={localizedHref(registerPath)}
            variant="primary"
            size="large"
            aria-label={`Inscribirse en ${event.title}`}
          >
            Inscribirse
          </Button>
        </div>
      )}

      {!isRegistrationOpen && event.status === "open" && event.registration_end_date && (
        <div className="card text-center">
          <p className="text-body text-gray-600">
            Las inscripciones han cerrado el {formatDateOnly(event.registration_end_date)}
          </p>
        </div>
      )}
    </article>
  );
}

export default memo(EventDetail);
