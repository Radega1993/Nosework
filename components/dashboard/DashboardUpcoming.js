import Link from "next/link";
import { useLocalizedLink } from "@/hooks/useLocalizedLink";

const STATUS_STYLES = {
  confirmada: "bg-secondary-container text-on-secondary-container",
  inscripción_confirmada: "bg-secondary-container text-on-secondary-container",
  pendiente: "bg-amber-100 text-amber-900",
  pendiente_pago: "bg-amber-100 text-amber-900",
};

function formatEventDate(dateStr) {
  if (!dateStr) return { month: "", day: "—" };
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return { month: "", day: "—" };
  return {
    month: d.toLocaleString("es-ES", { month: "short" }).toUpperCase(),
    day: String(d.getDate()).padStart(2, "0"),
  };
}

export default function DashboardUpcoming({ upcoming }) {
  const { localizedHref } = useLocalizedLink();

  return (
    <section className="lg:col-span-4">
      <h3 className="font-montserrat text-xl font-semibold text-primary mb-4 flex items-center gap-2">
        <span className="material-symbols-outlined" aria-hidden>
          calendar_month
        </span>
        Próximas citas
      </h3>
      <div className="space-y-2">
        {upcoming?.length > 0 ? (
          upcoming.map((row) => {
            const { month, day } = formatEventDate(row.eventDate);
            const st = (row.status || "").toLowerCase().replace(/\s+/g, "_");
            const badgeClass = STATUS_STYLES[st] || "bg-surface-variant text-on-surface-variant";
            return (
              <div
                key={row.id}
                className="bg-white p-3 rounded-xl shadow-soft border-l-4 border-secondary flex gap-3 items-center"
              >
                <div className="text-center min-w-[48px]">
                  <p className="text-[11px] font-bold text-secondary uppercase">{month}</p>
                  <p className="text-2xl font-montserrat font-bold text-primary leading-none">{day}</p>
                </div>
                <div className="flex-1 min-w-0">
                  <h5 className="font-bold text-primary truncate">{row.eventTitle}</h5>
                  <p className="text-xs text-on-surface-variant truncate">
                    {row.dogName ? `Perro: ${row.dogName}` : "Sin perro vinculado"}
                  </p>
                  <span className={`inline-block mt-1 text-[10px] font-bold px-1.5 py-0.5 rounded ${badgeClass}`}>
                    {row.status || "Pendiente"}
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-sm text-on-surface-variant bg-white border border-outline-variant rounded-xl p-4">
            No tienes inscripciones próximas. Las citas aparecerán aquí según `event_registrations` en la base de datos.
          </p>
        )}
        <div className="bg-surface-container-low border border-dashed border-outline-variant p-4 rounded-xl text-center">
          <p className="text-on-surface-variant text-sm mb-1">¿Buscas nuevas pruebas?</p>
          <Link href={localizedHref("/eventos")} className="text-primary font-bold hover:underline text-sm">
            Explorar calendario
          </Link>
        </div>
      </div>
    </section>
  );
}
