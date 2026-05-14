"use client";

import { useCallback, useEffect, useState } from "react";
import { REGISTRATION_STATUS, registrationStatusLabelEs, isAllowedOrganizerRegistrationStatus } from "@/utils/eventRegistrations";

const STATUS_OPTIONS = [
  { value: REGISTRATION_STATUS.PENDIENTE, label: registrationStatusLabelEs(REGISTRATION_STATUS.PENDIENTE) },
  { value: REGISTRATION_STATUS.PENDIENTE_PAGO, label: registrationStatusLabelEs(REGISTRATION_STATUS.PENDIENTE_PAGO) },
  { value: REGISTRATION_STATUS.ACEPTADO, label: registrationStatusLabelEs(REGISTRATION_STATUS.ACEPTADO) },
  { value: REGISTRATION_STATUS.RECHAZADO, label: registrationStatusLabelEs(REGISTRATION_STATUS.RECHAZADO) },
];

/**
 * Panel para el organizador: listado de inscritos y cambio de estado (pendiente / pendiente de pago / aceptado / rechazado).
 */
export default function EventOrganizerRegistrationsPanel({ eventId }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [savingId, setSavingId] = useState(null);

  const load = useCallback(async () => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token || !eventId) return;
    setLoading(true);
    setErr("");
    try {
      const res = await fetch(`/api/events/${eventId}/registrations`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "No se pudo cargar el listado");
      setRows(data.registrations || []);
    } catch (e) {
      setErr(e.message || "Error");
      setRows([]);
    } finally {
      setLoading(false);
    }
  }, [eventId]);

  useEffect(() => {
    load();
  }, [load]);

  const updateStatus = async (registrationId, status) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    setSavingId(registrationId);
    setErr("");
    try {
      const res = await fetch(`/api/events/${eventId}/registrations`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ registrationId, status }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "No se pudo guardar");
      setRows((prev) => prev.map((r) => (r.id === registrationId ? { ...r, status } : r)));
    } catch (e) {
      setErr(e.message || "Error al guardar");
    } finally {
      setSavingId(null);
    }
  };

  if (loading) {
    return (
      <section id="participantes" className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm scroll-mt-24">
        <p className="text-gray-600 text-sm">Cargando participantes…</p>
      </section>
    );
  }

  return (
    <section id="participantes" className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm scroll-mt-24">
      <h2 className="text-h3 font-bold text-gray-900 mb-2">Participantes e inscripciones</h2>
      <p className="text-sm text-gray-600 mb-4">
        Revisa cada solicitud y marca el estado: pendiente de pago hasta que confirmes el ingreso, o plaza confirmada cuando
        esté todo listo.
      </p>
      {err ? <p className="text-sm text-red-600 mb-3">{err}</p> : null}
      {rows.length === 0 ? (
        <p className="text-gray-600 text-sm">Aún no hay inscripciones para esta prueba.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-gray-600">
                <th className="py-2 pr-4 font-semibold">Participante</th>
                <th className="py-2 pr-4 font-semibold">Email</th>
                <th className="py-2 pr-4 font-semibold">Perro</th>
                <th className="py-2 pr-4 font-semibold">Estado</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-b border-gray-100">
                  <td className="py-2 pr-4 text-gray-900 font-medium">{r.display_name}</td>
                  <td className="py-2 pr-4 text-gray-700">{r.user_email}</td>
                  <td className="py-2 pr-4 text-gray-700">{r.dog_name || "—"}</td>
                  <td className="py-2 pr-4">
                    <select
                      className="border border-gray-300 rounded px-2 py-1.5 bg-white max-w-[220px]"
                      value={r.status}
                      disabled={savingId === r.id}
                      onChange={(e) => updateStatus(r.id, e.target.value)}
                      aria-label={`Estado de ${r.display_name}`}
                    >
                      {!isAllowedOrganizerRegistrationStatus(r.status) ? (
                        <option value={r.status}>{registrationStatusLabelEs(r.status)}</option>
                      ) : null}
                      {STATUS_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <button type="button" onClick={() => load()} className="mt-4 text-sm font-semibold text-primary hover:underline">
        Actualizar listado
      </button>
    </section>
  );
}
