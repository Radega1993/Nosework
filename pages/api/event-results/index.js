import { getDBConnection } from "@/utils/db";

const DEFAULT_LIMIT = 50;
const MAX_LIMIT = 200;

function parseIntSafe(v, fallback) {
  const n = parseInt(String(v), 10);
  return Number.isFinite(n) ? n : fallback;
}

/**
 * GET /api/event-results
 * Query: eventId, year, level, q (search), limit, offset
 */
export default function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Método no permitido" });
  }

  const db = getDBConnection();
  const { eventId, year, level, province, q, club, dog, handler, limit: limitRaw, offset: offsetRaw } = req.query;

  const limit = Math.min(Math.max(parseIntSafe(limitRaw, DEFAULT_LIMIT), 1), MAX_LIMIT);
  const offset = Math.max(parseIntSafe(offsetRaw, 0), 0);

  const conditions = ["1=1"];
  const params = [];

  if (eventId) {
    conditions.push("er.event_id = ?");
    params.push(eventId);
  }
  if (year) {
    conditions.push(`strftime('%Y', COALESCE(NULLIF(TRIM(er.trial_date), ''), e.date)) = ?`);
    params.push(String(year));
  }
  if (level && String(level).trim() !== "" && String(level).toLowerCase() !== "todos") {
    conditions.push("er.level = ?");
    params.push(String(level).trim());
  }
  if (province && String(province).trim() !== "" && String(province).toLowerCase() !== "todas") {
    conditions.push("IFNULL(er.province,'') = ?");
    params.push(String(province).trim());
  }
  if (q && String(q).trim() !== "") {
    const safe = String(q).trim().replace(/%/g, "").replace(/_/g, "");
    if (safe.length > 0) {
      const term = `%${safe}%`;
      conditions.push(
        "(er.dog_name LIKE ? COLLATE NOCASE OR er.handler_name LIKE ? COLLATE NOCASE OR IFNULL(er.club,'') LIKE ? COLLATE NOCASE OR e.title LIKE ? COLLATE NOCASE)"
      );
      params.push(term, term, term, term);
    }
  }
  const likeField = (val, col) => {
    if (val == null || String(val).trim() === "") return;
    const safe = String(val).trim().replace(/%/g, "").replace(/_/g, "");
    if (safe.length === 0) return;
    conditions.push(`${col} LIKE ? COLLATE NOCASE`);
    params.push(`%${safe}%`);
  };
  likeField(dog, "er.dog_name");
  likeField(handler, "er.handler_name");
  likeField(club, "IFNULL(er.club,'')");

  const whereSql = conditions.join(" AND ");

  const countRow = db
    .prepare(
      `SELECT COUNT(*) AS total
       FROM event_results er
       INNER JOIN events e ON e.id = er.event_id
       WHERE ${whereSql}`
    )
    .get(...params);

  const total = countRow?.total ?? 0;

  const rows = db
    .prepare(
      `SELECT
         er.id,
         er.event_id,
         er.trial_date,
         er.level,
         er.dog_name,
         er.handler_name,
         er.club,
         er.province,
         er.time_text,
         er.penalties,
         er.position,
         er.title,
         er.points,
         e.title AS trial_title,
         e.date AS event_date
       FROM event_results er
       INNER JOIN events e ON e.id = er.event_id
       WHERE ${whereSql}
       ORDER BY COALESCE(NULLIF(TRIM(er.trial_date), ''), e.date) DESC, e.id DESC, er.position ASC, er.id ASC
       LIMIT ? OFFSET ?`
    )
    .all(...params, limit, offset);

  return res.status(200).json({
    rows,
    total,
    limit,
    offset,
  });
}
