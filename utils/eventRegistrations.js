/** Estados de inscripción gestionables por el organizador (TEXT en BD). */

export const REGISTRATION_STATUS = {
  PENDIENTE: "pendiente",
  PENDIENTE_PAGO: "pendiente_pago",
  ACEPTADO: "aceptado",
  RECHAZADO: "rechazado",
};

const ORGANIZER_SET = new Set(Object.values(REGISTRATION_STATUS));

export function isAllowedOrganizerRegistrationStatus(s) {
  return ORGANIZER_SET.has(String(s || "").trim());
}

export function registrationStatusLabelEs(status) {
  switch (String(status || "").trim()) {
    case REGISTRATION_STATUS.PENDIENTE:
      return "Pendiente de revisión";
    case REGISTRATION_STATUS.PENDIENTE_PAGO:
      return "Pendiente de pago";
    case REGISTRATION_STATUS.ACEPTADO:
      return "Plaza confirmada";
    case REGISTRATION_STATUS.RECHAZADO:
      return "No admitido";
    default:
      return status ? String(status) : "—";
  }
}
