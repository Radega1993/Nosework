#!/usr/bin/env node
/**
 * Rellena database.db con usuarios, clubes, eventos, membresías, invitaciones,
 * solicitudes, perros e inscripciones de demostración (dominio @demo.nosework.local).
 *
 * Uso:
 *   node scripts/seed-demo-db.mjs --force
 *
 * Requisitos: ejecutar desde la raíz del repo (donde está database.db).
 * Elimina antes todas las filas ligadas a emails *@demo.nosework.local.
 */

import path from "node:path";
import { fileURLToPath } from "node:url";
import bcrypt from "bcryptjs";
import { getDBConnection } from "../utils/db.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

process.chdir(ROOT);

const DEMO_EMAIL_LIKE = "%@demo.nosework.local";
const PASSWORD_PLAIN = "SeedDemo2026!";

const USERS = [
  { email: "admin@demo.nosework.local", role: "administrador", display: "Admin Demo" },
  { email: "organizer@demo.nosework.local", role: "organizador", display: "Organizador Demo" },
  { email: "owner@demo.nosework.local", role: "user", display: "Dueño Club Demo" },
  { email: "member@demo.nosework.local", role: "user", display: "Miembro Activo" },
  { email: "applicant@demo.nosework.local", role: "user", display: "Solicitante Club" },
  { email: "invitee@demo.nosework.local", role: "user", display: "Invitado Pendiente" },
  { email: "solo@demo.nosework.local", role: "user", display: "Usuario Solo" },
];

function wipeDemoData(db) {
  const rows = db.prepare(`SELECT id FROM users WHERE email LIKE ?`).all(DEMO_EMAIL_LIKE);
  const ids = rows.map((r) => r.id);
  if (ids.length === 0) return;

  const ph = ids.map(() => "?").join(",");
  const clubRows = db.prepare(`SELECT id FROM clubs WHERE owner_user_id IN (${ph})`).all(...ids);
  const clubIds = clubRows.map((r) => r.id);

  const eventByDemo = db.prepare(`SELECT id FROM events WHERE organizer_user_id IN (${ph})`).all(...ids);
  const eventIdsFromOrg = eventByDemo.map((r) => r.id);
  let eventIdsFromClubs = [];
  if (clubIds.length) {
    const cph = clubIds.map(() => "?").join(",");
    eventIdsFromClubs = db.prepare(`SELECT id FROM events WHERE club_id IN (${cph})`).all(...clubIds).map((r) => r.id);
  }
  const eventIdSet = new Set([...eventIdsFromOrg, ...eventIdsFromClubs]);
  const allEventIds = [...eventIdSet];

  db.prepare(`DELETE FROM event_registrations WHERE user_id IN (${ph})`).run(...ids);

  if (allEventIds.length) {
    const eph = allEventIds.map(() => "?").join(",");
    db.prepare(`DELETE FROM event_results WHERE event_id IN (${eph})`).run(...allEventIds);
    db.prepare(`DELETE FROM events WHERE id IN (${eph})`).run(...allEventIds);
  }

  if (clubIds.length) {
    const cph = clubIds.map(() => "?").join(",");
    db.prepare(`DELETE FROM club_service_tags WHERE club_id IN (${cph})`).run(...clubIds);
    db.prepare(`DELETE FROM club_locations WHERE club_id IN (${cph})`).run(...clubIds);
    db.prepare(`DELETE FROM club_invitations WHERE club_id IN (${cph})`).run(...clubIds);
    db.prepare(`DELETE FROM club_join_requests WHERE club_id IN (${cph})`).run(...clubIds);
    db.prepare(`DELETE FROM club_memberships WHERE club_id IN (${cph})`).run(...clubIds);
    db.prepare(`DELETE FROM club_members WHERE club_id IN (${cph})`).run(...clubIds);
    db.prepare(`DELETE FROM clubs WHERE id IN (${cph})`).run(...clubIds);
  }

  db.prepare(`DELETE FROM dogs WHERE handler_user_id IN (${ph})`).run(...ids);
  db.prepare(`DELETE FROM refresh_tokens WHERE user_id IN (${ph})`).run(...ids);
  db.prepare(`DELETE FROM audit_logs WHERE user_id IN (${ph})`).run(...ids);
  db.prepare(`DELETE FROM user_profiles WHERE user_id IN (${ph})`).run(...ids);
  db.prepare(`DELETE FROM users WHERE id IN (${ph})`).run(...ids);
}

function insertUser(db, { email, role, display }) {
  const hash = bcrypt.hashSync(PASSWORD_PLAIN, 10);
  const r = db
    .prepare(
      `INSERT INTO users (email, password, role, failed_login_attempts, is_judge)
       VALUES (?, ?, ?, 0, 0)`
    )
    .run(email, hash, role);
  const userId = Number(r.lastInsertRowid);
  const publicId = `SEED-${userId}-${email.split("@")[0]}`.slice(0, 48);
  db.prepare(
    `INSERT INTO user_profiles (user_id, display_name, public_id, license_number, license_status)
     VALUES (?, ?, ?, NULL, NULL)`
  ).run(userId, display, publicId);
  return userId;
}

function main() {
  if (!process.argv.includes("--force")) {
    console.error(`
Uso: node scripts/seed-demo-db.mjs --force

Esto BORRÁ datos previos del dominio @demo.nosework.local en database.db.
Haz copia de seguridad de database.db si la necesitas.
`);
    process.exit(1);
  }

  const db = getDBConnection();
  const tax = db.prepare(`SELECT id FROM service_taxonomy WHERE code = ?`).get("nosework_trial");
  if (!tax) {
    console.error("No se encontró taxonomía nosework_trial. Abre la app una vez para migrar.");
    process.exit(1);
  }
  const taxonomyId = tax.id;

  const tx = db.transaction(() => {
    wipeDemoData(db);

    const byEmail = {};
    for (const u of USERS) {
      byEmail[u.email] = insertUser(db, u);
    }

    const id = (email) => byEmail[email];

    const ownerId = id("owner@demo.nosework.local");
    const memberId = id("member@demo.nosework.local");
    const applicantId = id("applicant@demo.nosework.local");
    const inviteeId = id("invitee@demo.nosework.local");
    const organizerId = id("organizer@demo.nosework.local");

    const rClubApproved = db
      .prepare(
        `INSERT INTO clubs (name, owner_user_id, status, slug, display_name, short_description, accepts_public_listing, reviewed_at, created_at)
         VALUES (?, ?, 'approved', 'club-seed-demo-madrid', 'Club Demo Madrid', 'Club de prueba aprobado y listado en directorio.', 1, datetime('now'), datetime('now'))`
      )
      .run("Club Demo Madrid", ownerId);
    const clubApprovedId = Number(rClubApproved.lastInsertRowid);

    const rClubPending = db
      .prepare(
        `INSERT INTO clubs (name, owner_user_id, status, slug, display_name, short_description, accepts_public_listing, created_at)
         VALUES (?, ?, 'pending', 'club-seed-demo-pendiente', 'Club Demo Pendiente', 'Club en revisión administrativa.', 0, datetime('now'))`
      )
      .run("Club Demo Pendiente", ownerId);
    const clubPendingId = Number(rClubPending.lastInsertRowid);

    db.prepare(
      `INSERT INTO club_locations (club_id, country_code, admin_area_level_1, province, municipality, postal_code, address_line, latitude, longitude, is_primary)
       VALUES (?, 'ES', 'Comunidad de Madrid', 'Madrid', 'Madrid', '28001', 'Calle Demo del Olfato 1', 40.4168, -3.7038, 1)`
    ).run(clubApprovedId);

    db.prepare(`INSERT INTO club_service_tags (club_id, taxonomy_id) VALUES (?, ?)`).run(clubApprovedId, taxonomyId);

    db.prepare(
      `INSERT INTO club_memberships (club_id, user_id, role, status, approved_by_user_id)
       VALUES (?, ?, 'member', 'active', ?)`
    ).run(clubApprovedId, memberId, ownerId);

    db.prepare(
      `INSERT INTO club_join_requests (club_id, user_id, message, status)
       VALUES (?, ?, 'Me gustaría entrenar con vosotros los fines de semana.', 'pending')`
    ).run(clubApprovedId, applicantId);

    db.prepare(
      `INSERT INTO club_invitations (club_id, invited_user_id, invited_by_user_id, message, status)
       VALUES (?, ?, ?, 'Te invitamos a unirte al club demo.', 'pending')`
    ).run(clubApprovedId, inviteeId, ownerId);

    const dogIns = db
      .prepare(
        `INSERT INTO dogs (handler_user_id, name, breed, birth_year, grade_label)
         VALUES (?, 'Rex Seed', 'Border Collie', 2020, 'Grado I')`
      )
      .run(memberId);
    const dogId = Number(dogIns.lastInsertRowid);

    const insEvent = db.prepare(
      `INSERT INTO events (date, title, description, organizer_user_id, club_id, audience, kind)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    );

    const evPast = insEvent.run(
      "2025-03-15T10:00:00.000Z",
      "Prueba pasada (resultados)",
      "Evento histórico para probar la página de resultados y listados pasados.",
      ownerId,
      clubApprovedId,
      "open",
      "competición"
    );
    const eventPastId = Number(evPast.lastInsertRowid);

    db.prepare(
      `INSERT INTO event_results (event_id, trial_date, level, dog_name, handler_name, club, province, time_text, penalties, position, title, points, handler_user_id)
       VALUES (?, '2025-03-15', 'Grado I', 'Rex Seed', 'Miembro Activo', 'Club Demo Madrid', 'Madrid', '2:15', 0, 1, 'Excelente', 95, ?)`
    ).run(eventPastId, memberId);

    const evGlobal = insEvent.run(
      "2027-08-20T09:00:00.000Z",
      "Jornada abierta nacional (demo)",
      "Evento sin club asociado; audiencia abierta. Cualquier usuario registrado puede inscribirse.",
      organizerId,
      null,
      "open",
      "jornada"
    );
    const eventGlobalId = Number(evGlobal.lastInsertRowid);

    const evOpenClub = insEvent.run(
      "2027-09-10T09:00:00.000Z",
      "Taller abierto Club Madrid (demo)",
      "Evento del club aprobado con audiencia abierta.",
      ownerId,
      clubApprovedId,
      "open",
      "taller"
    );
    const eventOpenClubId = Number(evOpenClub.lastInsertRowid);

    const evMembers = insEvent.run(
      "2027-10-05T09:00:00.000Z",
      "Entreno solo socios Club Madrid (demo)",
      "Solo miembros con membresía activa pueden inscribirse.",
      ownerId,
      clubApprovedId,
      "members_only",
      "entreno"
    );
    const eventMembersId = Number(evMembers.lastInsertRowid);

    const evPendingClub = insEvent.run(
      "2027-11-01T09:00:00.000Z",
      "Evento club pendiente de aprobación",
      "Club aún no aprobado: no debe salir en calendario público hasta aprobar el club.",
      ownerId,
      clubPendingId,
      "open",
      "prueba"
    );
    void Number(evPendingClub.lastInsertRowid);

    db.prepare(`INSERT INTO event_registrations (user_id, dog_id, event_id, status) VALUES (?, ?, ?, 'pendiente')`).run(
      memberId,
      dogId,
      eventOpenClubId
    );
    db.prepare(`INSERT INTO event_registrations (user_id, dog_id, event_id, status) VALUES (?, NULL, ?, 'pendiente')`).run(
      id("solo@demo.nosework.local"),
      eventGlobalId
    );
  });

  tx();
  console.log("Seed demo aplicado correctamente.");
  console.log("Contraseña común:", PASSWORD_PLAIN);
  console.log("Cuentas:", USERS.map((u) => u.email).join(", "));
}

main();
