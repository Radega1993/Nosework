import { validateEventClubAudiencePayload } from "@/utils/eventWrite";
import { validateJudgeUserIdsExist } from "@/utils/eventJudges";

const trim = (s) => (s == null ? "" : String(s).trim());

function normalizeLevels(body) {
  const raw = body?.levels;
  if (Array.isArray(raw)) {
    return [...new Set(raw.map(String).filter((x) => x === "basic" || x === "advanced"))];
  }
  if (raw === "basic" || raw === "advanced") return [raw];
  if (typeof raw === "string" && raw) {
    try {
      const j = JSON.parse(raw);
      if (Array.isArray(j)) {
        return [...new Set(j.map(String).filter((x) => x === "basic" || x === "advanced"))];
      }
    } catch {
      // ignore
    }
  }
  const a = body?.levelBasic === true || body?.levelBasic === "true";
  const b = body?.levelAdvanced === true || body?.levelAdvanced === "true";
  const out = [];
  if (a) out.push("basic");
  if (b) out.push("advanced");
  return out;
}

function parseOptionalEuros(val) {
  if (val == null || String(val).trim() === "") return null;
  const n = Number(val);
  if (!Number.isFinite(n) || n < 0) return NaN;
  return n;
}

/**
 * Valida cuerpo completo de alta/edición de prueba (incl. ubicación, precio, niveles, cronograma).
 * @returns {object} campos listos para SQL o { error: string }
 */
export function validateAndNormalizeFullEvent(db, user, body) {
  const v0 = validateEventClubAudiencePayload(db, user, body || {});
  if (v0.error) return v0;

  const date = trim(body?.date);
  const title = trim(body?.title);
  const description = trim(body?.description);
  if (!date || !title || !description) {
    return { error: "Faltan fecha, título o descripción" };
  }
  if (title.length < 3) {
    return { error: "El título debe tener al menos 3 caracteres" };
  }
  if (description.length < 10) {
    return { error: "La descripción debe tener al menos 10 caracteres (normativa, avisos, etc.)" };
  }

  const levels = normalizeLevels(body);
  if (levels.length === 0) {
    return { error: "Selecciona al menos un nivel de prueba (Básico y/o Avanzado)" };
  }

  const municipality = trim(body?.municipality);
  if (!municipality) {
    return { error: "La localidad es obligatoria" };
  }

  const province = trim(body?.province) || null;
  const postal_code = trim(body?.postalCode ?? body?.postal_code) || null;
  const venue_address = trim(body?.venueAddress ?? body?.venue_address) || null;
  const schedule_details = trim(body?.scheduleDetails ?? body?.schedule_details) || null;
  const registration_phone = trim(body?.registrationPhone ?? body?.registration_phone) || null;

  const rawJudgeIds = Array.isArray(body?.judgeUserIds) ? body.judgeUserIds : [];
  const isStaff = user?.role === "organizador" || user?.role === "administrador";
  let judgeUserIds = [];
  if (v0.clubId != null || !isStaff) {
    const judgeCheck = validateJudgeUserIdsExist(db, rawJudgeIds);
    if (judgeCheck.error) {
      return { error: judgeCheck.error };
    }
    judgeUserIds = judgeCheck.ids;
  } else if (rawJudgeIds.length > 0) {
    const judgeCheck = validateJudgeUserIdsExist(db, rawJudgeIds);
    if (judgeCheck.error) {
      return { error: judgeCheck.error };
    }
    judgeUserIds = judgeCheck.ids;
  }

  const price_euros = parseOptionalEuros(body?.priceEuros ?? body?.price_euros);
  if (Number.isNaN(price_euros)) {
    return { error: "Precio de la prueba no válido" };
  }
  const meal_price_euros = parseOptionalEuros(body?.mealPriceEuros ?? body?.meal_price_euros);
  if (Number.isNaN(meal_price_euros)) {
    return { error: "Precio de la comida no válido" };
  }

  return {
    clubId: v0.clubId,
    audience: v0.audience,
    kind: v0.kind,
    date,
    title,
    description,
    municipality,
    province,
    postal_code,
    venue_address,
    price_euros,
    meal_price_euros,
    levels_json: JSON.stringify(levels),
    schedule_details,
    registration_phone,
    judge_organizer_name: null,
    judgeUserIds,
  };
}
