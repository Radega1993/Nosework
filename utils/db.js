import Database from "better-sqlite3";
import { ensureClubDirectorySchema } from "./clubDirectoryMigrations.js";
import { ensureEventClubColumns } from "./eventClubMigrations.js";

let db;

/**
 * Migraciones idempotentes de clubs / membresías.
 * Se ejecuta en cada getDBConnection para reparar BDs antiguas o init a medias
 * (p. ej. índice sobre status antes de existir la columna).
 */
function ensureClubsMembershipMigrations(conn) {
    try {
        conn.prepare(`ALTER TABLE clubs ADD COLUMN status TEXT NOT NULL DEFAULT 'approved'`).run();
    } catch (e) {
        // columna ya existe
    }
    try {
        conn.prepare(`ALTER TABLE clubs ADD COLUMN reviewed_by INTEGER REFERENCES users(id)`).run();
    } catch (e) {
        // columna ya existe
    }
    try {
        conn.prepare(`ALTER TABLE clubs ADD COLUMN reviewed_at TEXT`).run();
    } catch (e) {
        // columna ya existe
    }
    try {
        conn.prepare(`ALTER TABLE clubs ADD COLUMN rejection_reason TEXT`).run();
    } catch (e) {
        // columna ya existe
    }
    try {
        conn.prepare(`ALTER TABLE clubs ADD COLUMN updated_at TEXT DEFAULT CURRENT_TIMESTAMP`).run();
    } catch (e) {
        // columna ya existe
    }
    try {
        conn.prepare(`CREATE INDEX IF NOT EXISTS idx_clubs_status ON clubs(status)`).run();
    } catch (e) {
        // p. ej. columna aún no aplicable en casos extremos
    }

    conn.prepare(`
            CREATE TABLE IF NOT EXISTS club_memberships (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                club_id INTEGER NOT NULL,
                user_id INTEGER NOT NULL,
                role TEXT NOT NULL DEFAULT 'member',
                status TEXT NOT NULL DEFAULT 'active',
                approved_by_user_id INTEGER,
                joined_at TEXT DEFAULT CURRENT_TIMESTAMP,
                updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
                UNIQUE (club_id, user_id),
                FOREIGN KEY (club_id) REFERENCES clubs(id) ON DELETE CASCADE,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                FOREIGN KEY (approved_by_user_id) REFERENCES users(id) ON DELETE SET NULL
            )
        `).run();
    conn.prepare(`CREATE INDEX IF NOT EXISTS idx_club_memberships_club ON club_memberships(club_id)`).run();
    conn.prepare(`CREATE INDEX IF NOT EXISTS idx_club_memberships_user ON club_memberships(user_id)`).run();
    conn.prepare(`CREATE INDEX IF NOT EXISTS idx_club_memberships_status ON club_memberships(status)`).run();

    conn.prepare(`
            CREATE TABLE IF NOT EXISTS club_join_requests (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                club_id INTEGER NOT NULL,
                user_id INTEGER NOT NULL,
                message TEXT,
                status TEXT NOT NULL DEFAULT 'pending',
                reviewed_by_user_id INTEGER,
                reviewed_at TEXT,
                rejection_reason TEXT,
                created_at TEXT DEFAULT CURRENT_TIMESTAMP,
                updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (club_id) REFERENCES clubs(id) ON DELETE CASCADE,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                FOREIGN KEY (reviewed_by_user_id) REFERENCES users(id) ON DELETE SET NULL
            )
        `).run();
    conn.prepare(`CREATE INDEX IF NOT EXISTS idx_join_requests_club_status ON club_join_requests(club_id, status)`).run();
    conn.prepare(`CREATE INDEX IF NOT EXISTS idx_join_requests_user_status ON club_join_requests(user_id, status)`).run();

    conn.prepare(`
            CREATE TABLE IF NOT EXISTS club_invitations (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                club_id INTEGER NOT NULL,
                invited_user_id INTEGER NOT NULL,
                invited_by_user_id INTEGER NOT NULL,
                message TEXT,
                status TEXT NOT NULL DEFAULT 'pending',
                responded_at TEXT,
                created_at TEXT DEFAULT CURRENT_TIMESTAMP,
                updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (club_id) REFERENCES clubs(id) ON DELETE CASCADE,
                FOREIGN KEY (invited_user_id) REFERENCES users(id) ON DELETE CASCADE,
                FOREIGN KEY (invited_by_user_id) REFERENCES users(id) ON DELETE CASCADE
            )
        `).run();
    conn.prepare(`CREATE INDEX IF NOT EXISTS idx_club_invites_user_status ON club_invitations(invited_user_id, status)`).run();
    conn.prepare(`CREATE INDEX IF NOT EXISTS idx_club_invites_club_status ON club_invitations(club_id, status)`).run();

    try {
        conn.prepare(
            `INSERT OR IGNORE INTO club_memberships (club_id, user_id, role, status, joined_at, updated_at)
             SELECT club_id, user_id, 'member', 'active', created_at, CURRENT_TIMESTAMP
             FROM club_members`
        ).run();
    } catch (e) {
        // club_members puede no existir en BDs muy antiguas
    }
}

export function getDBConnection() {
    if (!db) {
        const dbPath = process.env.SQLITE_DATABASE_PATH || "./database.db";
        db = new Database(dbPath, { verbose: process.env.NODE_ENV !== "production" ? console.log : undefined });

        // Inicializar tabla de eventos
        db.prepare(`
            CREATE TABLE IF NOT EXISTS events (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                date TEXT NOT NULL,
                title TEXT NOT NULL,
                description TEXT NOT NULL
            )
        `).run();

        // Resultados publicados por prueba (clasificaciones)
        db.prepare(`
            CREATE TABLE IF NOT EXISTS event_results (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                event_id INTEGER NOT NULL,
                trial_date TEXT,
                level TEXT NOT NULL,
                dog_name TEXT NOT NULL,
                handler_name TEXT NOT NULL,
                club TEXT,
                province TEXT,
                time_text TEXT,
                penalties INTEGER NOT NULL DEFAULT 0,
                position INTEGER,
                title TEXT,
                points REAL NOT NULL DEFAULT 0,
                FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
            )
        `).run();
        db.prepare(`CREATE INDEX IF NOT EXISTS idx_event_results_event_id ON event_results(event_id)`).run();
        db.prepare(`CREATE INDEX IF NOT EXISTS idx_event_results_trial_date ON event_results(trial_date)`).run();
        db.prepare(`CREATE INDEX IF NOT EXISTS idx_event_results_level ON event_results(level)`).run();

        // Inicializar tabla de usuarios
        db.prepare(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL,
                role TEXT DEFAULT 'user',
                failed_login_attempts INTEGER DEFAULT 0,
                account_locked_until TEXT
            )
        `).run();

        // Añadir campos de bloqueo de cuenta si la tabla ya existe sin ellos
        try {
            db.prepare(`ALTER TABLE users ADD COLUMN failed_login_attempts INTEGER DEFAULT 0`).run();
        } catch (e) {
            // Campo ya existe, ignorar error
        }
        try {
            db.prepare(`ALTER TABLE users ADD COLUMN account_locked_until TEXT`).run();
        } catch (e) {
            // Campo ya existe, ignorar error
        }
        try {
            db.prepare(`ALTER TABLE users ADD COLUMN is_judge INTEGER NOT NULL DEFAULT 0`).run();
        } catch (e) {
            // Campo ya existe
        }

        try {
            db.prepare(`ALTER TABLE events ADD COLUMN organizer_user_id INTEGER REFERENCES users(id)`).run();
        } catch (e) {
            // Campo ya existe
        }

        try {
            db.prepare(
                `ALTER TABLE event_results ADD COLUMN handler_user_id INTEGER REFERENCES users(id)`
            ).run();
        } catch (e) {
            // Campo ya existe
        }

        db.prepare(`
            CREATE TABLE IF NOT EXISTS user_profiles (
                user_id INTEGER PRIMARY KEY,
                display_name TEXT NOT NULL,
                public_id TEXT NOT NULL UNIQUE,
                license_number TEXT,
                license_status TEXT,
                delegation TEXT,
                avatar_url TEXT,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )
        `).run();

        db.prepare(`
            CREATE TABLE IF NOT EXISTS clubs (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                owner_user_id INTEGER NOT NULL,
                status TEXT NOT NULL DEFAULT 'approved',
                reviewed_by INTEGER,
                reviewed_at TEXT,
                rejection_reason TEXT,
                updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
                created_at TEXT DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (owner_user_id) REFERENCES users(id) ON DELETE CASCADE,
                FOREIGN KEY (reviewed_by) REFERENCES users(id) ON DELETE SET NULL
            )
        `).run();
        db.prepare(`CREATE INDEX IF NOT EXISTS idx_clubs_owner ON clubs(owner_user_id)`).run();

        try {
            db.prepare(`ALTER TABLE clubs ADD COLUMN status TEXT NOT NULL DEFAULT 'approved'`).run();
        } catch (e) {
            // Campo ya existe
        }
        try {
            db.prepare(`ALTER TABLE clubs ADD COLUMN reviewed_by INTEGER REFERENCES users(id)`).run();
        } catch (e) {
            // Campo ya existe
        }
        try {
            db.prepare(`ALTER TABLE clubs ADD COLUMN reviewed_at TEXT`).run();
        } catch (e) {
            // Campo ya existe
        }
        try {
            db.prepare(`ALTER TABLE clubs ADD COLUMN rejection_reason TEXT`).run();
        } catch (e) {
            // Campo ya existe
        }
        try {
            db.prepare(`ALTER TABLE clubs ADD COLUMN updated_at TEXT DEFAULT CURRENT_TIMESTAMP`).run();
        } catch (e) {
            // Campo ya existe
        }
        db.prepare(`CREATE INDEX IF NOT EXISTS idx_clubs_status ON clubs(status)`).run();

        db.prepare(`
            CREATE TABLE IF NOT EXISTS club_members (
                club_id INTEGER NOT NULL,
                user_id INTEGER NOT NULL,
                created_at TEXT DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (club_id, user_id),
                FOREIGN KEY (club_id) REFERENCES clubs(id) ON DELETE CASCADE,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )
        `).run();
        db.prepare(`CREATE INDEX IF NOT EXISTS idx_club_members_user ON club_members(user_id)`).run();

        db.prepare(`
            CREATE TABLE IF NOT EXISTS club_memberships (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                club_id INTEGER NOT NULL,
                user_id INTEGER NOT NULL,
                role TEXT NOT NULL DEFAULT 'member',
                status TEXT NOT NULL DEFAULT 'active',
                approved_by_user_id INTEGER,
                joined_at TEXT DEFAULT CURRENT_TIMESTAMP,
                updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
                UNIQUE (club_id, user_id),
                FOREIGN KEY (club_id) REFERENCES clubs(id) ON DELETE CASCADE,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                FOREIGN KEY (approved_by_user_id) REFERENCES users(id) ON DELETE SET NULL
            )
        `).run();
        db.prepare(`CREATE INDEX IF NOT EXISTS idx_club_memberships_club ON club_memberships(club_id)`).run();
        db.prepare(`CREATE INDEX IF NOT EXISTS idx_club_memberships_user ON club_memberships(user_id)`).run();
        db.prepare(`CREATE INDEX IF NOT EXISTS idx_club_memberships_status ON club_memberships(status)`).run();

        db.prepare(`
            CREATE TABLE IF NOT EXISTS club_join_requests (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                club_id INTEGER NOT NULL,
                user_id INTEGER NOT NULL,
                message TEXT,
                status TEXT NOT NULL DEFAULT 'pending',
                reviewed_by_user_id INTEGER,
                reviewed_at TEXT,
                rejection_reason TEXT,
                created_at TEXT DEFAULT CURRENT_TIMESTAMP,
                updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (club_id) REFERENCES clubs(id) ON DELETE CASCADE,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                FOREIGN KEY (reviewed_by_user_id) REFERENCES users(id) ON DELETE SET NULL
            )
        `).run();
        db.prepare(`CREATE INDEX IF NOT EXISTS idx_join_requests_club_status ON club_join_requests(club_id, status)`).run();
        db.prepare(`CREATE INDEX IF NOT EXISTS idx_join_requests_user_status ON club_join_requests(user_id, status)`).run();

        db.prepare(`
            CREATE TABLE IF NOT EXISTS club_invitations (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                club_id INTEGER NOT NULL,
                invited_user_id INTEGER NOT NULL,
                invited_by_user_id INTEGER NOT NULL,
                message TEXT,
                status TEXT NOT NULL DEFAULT 'pending',
                responded_at TEXT,
                created_at TEXT DEFAULT CURRENT_TIMESTAMP,
                updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (club_id) REFERENCES clubs(id) ON DELETE CASCADE,
                FOREIGN KEY (invited_user_id) REFERENCES users(id) ON DELETE CASCADE,
                FOREIGN KEY (invited_by_user_id) REFERENCES users(id) ON DELETE CASCADE
            )
        `).run();
        db.prepare(`CREATE INDEX IF NOT EXISTS idx_club_invites_user_status ON club_invitations(invited_user_id, status)`).run();
        db.prepare(`CREATE INDEX IF NOT EXISTS idx_club_invites_club_status ON club_invitations(club_id, status)`).run();

        // Migración legacy club_members -> club_memberships
        db.prepare(
            `INSERT OR IGNORE INTO club_memberships (club_id, user_id, role, status, joined_at, updated_at)
             SELECT club_id, user_id, 'member', 'active', created_at, CURRENT_TIMESTAMP
             FROM club_members`
        ).run();

        db.prepare(`
            CREATE TABLE IF NOT EXISTS dogs (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                handler_user_id INTEGER NOT NULL,
                name TEXT NOT NULL,
                breed TEXT,
                birth_year INTEGER,
                grade_label TEXT,
                photo_url TEXT,
                FOREIGN KEY (handler_user_id) REFERENCES users(id) ON DELETE CASCADE
            )
        `).run();
        db.prepare(`CREATE INDEX IF NOT EXISTS idx_dogs_handler ON dogs(handler_user_id)`).run();

        db.prepare(`
            CREATE TABLE IF NOT EXISTS event_registrations (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                dog_id INTEGER,
                event_id INTEGER NOT NULL,
                status TEXT NOT NULL DEFAULT 'pendiente',
                created_at TEXT DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                FOREIGN KEY (dog_id) REFERENCES dogs(id) ON DELETE SET NULL,
                FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
            )
        `).run();
        db.prepare(`CREATE INDEX IF NOT EXISTS idx_event_regs_user ON event_registrations(user_id)`).run();
        db.prepare(`CREATE INDEX IF NOT EXISTS idx_event_regs_event ON event_registrations(event_id)`).run();

        db.prepare(`CREATE INDEX IF NOT EXISTS idx_event_results_handler_user ON event_results(handler_user_id)`).run();

        // Perfiles faltantes (usuarios creados antes de user_profiles)
        const usersMissingProfile = db
            .prepare(
                `SELECT u.id, u.email FROM users u
         LEFT JOIN user_profiles p ON p.user_id = u.id
         WHERE p.user_id IS NULL`
            )
            .all();
        const insertProfile = db.prepare(
            `INSERT INTO user_profiles (user_id, display_name, public_id, license_number, license_status)
       VALUES (?, ?, ?, NULL, NULL)`
        );
        for (const row of usersMissingProfile) {
            const local = row.email.split("@")[0] || "Usuario";
            const displayName = local.charAt(0).toUpperCase() + local.slice(1);
            const publicId = `NTC-${row.id}`;
            try {
                insertProfile.run(row.id, displayName, publicId);
            } catch (e) {
                // ignore duplicate public_id edge case
            }
        }

        // Inicializar tabla de token blacklist
        db.prepare(`
            CREATE TABLE IF NOT EXISTS token_blacklist (
                token_hash TEXT PRIMARY KEY,
                expires_at TEXT NOT NULL,
                created_at TEXT DEFAULT CURRENT_TIMESTAMP
            )
        `).run();

        // Inicializar tabla de refresh tokens
        db.prepare(`
            CREATE TABLE IF NOT EXISTS refresh_tokens (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                token_hash TEXT UNIQUE NOT NULL,
                expires_at TEXT NOT NULL,
                created_at TEXT DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )
        `).run();

        // Inicializar tabla de audit logs
        db.prepare(`
            CREATE TABLE IF NOT EXISTS audit_logs (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                event_type TEXT NOT NULL,
                user_id INTEGER,
                ip_address TEXT,
                user_agent TEXT,
                details TEXT,
                created_at TEXT DEFAULT CURRENT_TIMESTAMP
            )
        `).run();

        // Crear índices para mejorar rendimiento
        db.prepare(`CREATE INDEX IF NOT EXISTS idx_token_blacklist_expires ON token_blacklist(expires_at)`).run();
        db.prepare(`CREATE INDEX IF NOT EXISTS idx_refresh_tokens_user ON refresh_tokens(user_id)`).run();
        db.prepare(`CREATE INDEX IF NOT EXISTS idx_refresh_tokens_expires ON refresh_tokens(expires_at)`).run();
        db.prepare(`CREATE INDEX IF NOT EXISTS idx_audit_logs_event_type ON audit_logs(event_type)`).run();
        db.prepare(`CREATE INDEX IF NOT EXISTS idx_audit_logs_user ON audit_logs(user_id)`).run();
        db.prepare(`CREATE INDEX IF NOT EXISTS idx_audit_logs_created ON audit_logs(created_at)`).run();
        db.prepare(`CREATE INDEX IF NOT EXISTS idx_users_locked_until ON users(account_locked_until)`).run();
    }
    ensureClubsMembershipMigrations(db);
    ensureClubDirectorySchema(db);
    ensureEventClubColumns(db);
    return db;
}
