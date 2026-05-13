import { authenticateToken, authorizeOrganizerCapable, getOptionalUser } from "@/middlewares/auth";
import { getDBConnection } from "@/utils/db";
import { listEventsVisibleToViewer } from "@/utils/eventVisibility";
import { validateEventClubAudiencePayload } from "@/utils/eventWrite";

function mapEventRow(row) {
  const { club_status: _cs, ...rest } = row;
  return rest;
}

export default function handler(req, res) {
  const db = getDBConnection();

  if (req.method === "GET") {
    const user = getOptionalUser(req);
    const viewer =
      user?.id != null ? { userId: user.id, role: user.role || "user" } : { userId: undefined };
    const rows = listEventsVisibleToViewer(db, viewer);
    return res.status(200).json({ events: rows.map(mapEventRow) });
  }

  if (req.method === "POST") {
    return authenticateToken(req, res, () => {
      authorizeOrganizerCapable(req, res, () => {
        const { date, title, description } = req.body || {};
        if (!date || !title || !description) {
          return res.status(400).json({ error: "Faltan campos obligatorios" });
        }
        const v = validateEventClubAudiencePayload(db, req.user, req.body || {});
        if (v.error) {
          return res.status(400).json({ error: v.error });
        }
        const uid = req.user.id;
        db.prepare(
          `INSERT INTO events (date, title, description, organizer_user_id, club_id, audience, kind)
           VALUES (?, ?, ?, ?, ?, ?, ?)`
        ).run(date, title, description, uid, v.clubId, v.audience, v.kind);
        return res.status(201).json({ message: "Evento creado con éxito" });
      });
    });
  }

  return res.status(405).json({ message: "Método no permitido" });
}
