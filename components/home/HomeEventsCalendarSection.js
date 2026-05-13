import Calendar from "react-calendar";
import Section from "@/components/Section";
import Button from "@/components/Button";
import { isEventOnSameLocalDay } from "@/utils/eventDates";

/**
 * Calendario interactivo de eventos con listado por fecha seleccionada.
 * @param {Array<{ id: string|number, date: string, title: string, description?: string }>} events
 * @param {Date|null} selectedDate
 * @param {(date: Date) => void} onDateChange
 * @param {Array} selectedEvents eventos del día seleccionado
 * @param {(path: string) => string} localizedHref
 */
export default function HomeEventsCalendarSection({
  events,
  selectedDate,
  onDateChange,
  selectedEvents,
  localizedHref,
  title = "Calendario de eventos",
  intro = "Consulta el calendario para no perderte los próximos eventos y pruebas.",
  allEventsHref = "/eventos",
  allEventsLabel = "Ver todos los eventos",
  emptyDayMessage = "No hay eventos para esta fecha.",
}) {
  return (
    <Section background="white" padding="lg">
      <div className="text-center mb-12">
        <h2 className="font-montserrat text-3xl font-bold text-primary mb-4">{title}</h2>
        <p className="text-lg text-on-surface-variant max-w-2xl mx-auto">{intro}</p>
      </div>
      <div className="flex justify-center mb-8">
        <div className="border border-outline-variant rounded-xl p-4 bg-white max-w-md shadow-sm">
          <Calendar
            onChange={onDateChange}
            value={selectedDate}
            locale="es-ES"
            calendarType="iso8601"
            className="rounded-lg"
            tileContent={({ date }) =>
              events.some((e) => e.date && isEventOnSameLocalDay(e.date, date)) && (
                <div className="w-2 h-2 bg-secondary-container rounded-full mx-auto mt-0.5 shrink-0" aria-hidden />
              )
            }
          />
        </div>
      </div>
      {selectedDate && (
        <div className="text-center mb-8">
          <h3 className="font-montserrat text-xl font-bold text-primary mb-6">
            Eventos para{" "}
            {selectedDate.toLocaleDateString("es-ES", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </h3>
          {selectedEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {selectedEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-xl border border-outline-variant p-6 shadow-sm text-left"
                >
                  <h4 className="text-lg font-semibold text-primary mb-2">{event.title}</h4>
                  <p className="text-on-surface-variant">{event.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-on-surface-variant">{emptyDayMessage}</p>
          )}
        </div>
      )}
      <div className="text-center">
        <Button href={localizedHref(allEventsHref)} variant="accent">
          {allEventsLabel}
        </Button>
      </div>
    </Section>
  );
}
