import Database from "better-sqlite3";

let db;

export function getDBConnection() {
    if (!db) {
        db = new Database("./database.db", { verbose: console.log });

        // Inicializar tabla de eventos
        db.prepare(`
            CREATE TABLE IF NOT EXISTS events (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                date TEXT NOT NULL,
                title TEXT NOT NULL,
                description TEXT NOT NULL
            )
        `).run();

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
    return db;
}
