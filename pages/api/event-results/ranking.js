import { getDBConnection } from "@/utils/db";

function parseIntSafe(v, fallback) {
  const n = parseInt(String(v), 10);
  return Number.isFinite(n) ? n : fallback;
}

/**
 * GET /api/event-results/ranking
 * Query: year, level, topBinomios (default 5), topClubs (default 3)
 */
export default function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Método no permitido" });
  }

  const db = getDBConnection();
  const { year, level, province } = req.query;
  const topBinomios = Math.min(Math.max(parseIntSafe(req.query.topBinomios, 5), 1), 50);
  const topClubs = Math.min(Math.max(parseIntSafe(req.query.topClubs, 3), 1), 20);

  const baseConditions = ["1=1"];
  const baseParams = [];

  if (year) {
    baseConditions.push(`strftime('%Y', COALESCE(NULLIF(TRIM(er.trial_date), ''), e.date)) = ?`);
    baseParams.push(String(year));
  }
  if (level && String(level).trim() !== "" && String(level).toLowerCase() !== "todos") {
    baseConditions.push("er.level = ?");
    baseParams.push(String(level).trim());
  }
  if (province && String(province).trim() !== "" && String(province).toLowerCase() !== "todas") {
    baseConditions.push("IFNULL(er.province,'') = ?");
    baseParams.push(String(province).trim());
  }

  const whereSql = baseConditions.join(" AND ");

  const binomios = db
    .prepare(
      `SELECT
         er.handler_name,
         er.dog_name,
         MAX(er.club) AS club,
         SUM(er.points) AS total_points,
         COUNT(*) AS trials_count
       FROM event_results er
       INNER JOIN events e ON e.id = er.event_id
       WHERE ${whereSql}
       GROUP BY er.handler_name, er.dog_name
       ORDER BY total_points DESC, trials_count DESC, er.dog_name ASC
       LIMIT ?`
    )
    .all(...baseParams, topBinomios);

  const clubs = db
    .prepare(
      `SELECT
         er.club AS club,
         SUM(er.points) AS total_points
       FROM event_results er
       INNER JOIN events e ON e.id = er.event_id
       WHERE ${whereSql}
         AND er.club IS NOT NULL
         AND TRIM(er.club) != ''
       GROUP BY er.club
       ORDER BY total_points DESC
       LIMIT ?`
    )
    .all(...baseParams, topClubs);

  const filterYears = db
    .prepare(
      `SELECT y FROM (
         SELECT DISTINCT strftime('%Y', COALESCE(NULLIF(TRIM(er.trial_date), ''), e.date)) AS y
         FROM event_results er
         INNER JOIN events e ON e.id = er.event_id
       )
       WHERE y IS NOT NULL AND y != ''
       ORDER BY y DESC`
    )
    .all()
    .map((r) => r.y)
    .filter(Boolean);

  const filterLevels = db
    .prepare(`SELECT DISTINCT level FROM event_results ORDER BY level COLLATE NOCASE`)
    .all()
    .map((r) => r.level)
    .filter(Boolean);

  const filterProvinces = db
    .prepare(
      `SELECT DISTINCT TRIM(province) AS p FROM event_results WHERE province IS NOT NULL AND TRIM(province) != '' ORDER BY p COLLATE NOCASE`
    )
    .all()
    .map((r) => r.p)
    .filter(Boolean);

  return res.status(200).json({ binomios, clubs, filterYears, filterLevels, filterProvinces });
}
