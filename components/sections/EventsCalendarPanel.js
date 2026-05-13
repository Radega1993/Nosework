import Calendar from "react-calendar";

/**
 * Calendario mensual con marcas en días con eventos (estilo acorde a FDDN).
 */
export default function EventsCalendarPanel({
  events = [],
  selectedDate,
  onChange,
  footer,
  title = "Calendario de eventos",
}) {
  return (
    <section className="bg-white rounded-xl shadow-sm border border-surface-container p-6 md:p-8">
      <h2 className="font-montserrat text-headline-h2 font-bold text-primary text-center mb-6">{title}</h2>
      <div className="flex justify-center mb-6">
        <div className="border border-outline-variant rounded-xl p-4 bg-surface-container-lowest max-w-md w-full shadow-sm">
          <Calendar
            onChange={onChange}
            value={selectedDate}
            className="rounded-lg w-full border-0 !font-sans"
            tileContent={({ date }) =>
              events.some((e) => e.date && new Date(e.date).toDateString() === date.toDateString()) && (
                <div className="w-2 h-2 bg-secondary-container rounded-full mx-auto mt-1" aria-hidden />
              )
            }
          />
        </div>
      </div>
      {footer}
    </section>
  );
}
