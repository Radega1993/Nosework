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
                role TEXT DEFAULT 'user'
            )
        `).run();
    }
    return db;
}
