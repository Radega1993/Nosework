# Data Model - Nosework Trial Community Platform

Este documento define el esquema completo de base de datos para SQLite (MVP) y las notas de migración a PostgreSQL.

**Base de datos MVP:** SQLite con better-sqlite3  
**Base de datos producción:** PostgreSQL (migración futura)

---

## Esquema SQLite (MVP)

### Tablas Base (Fase 1 - Implementadas)

#### `users`
```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,  -- Hash bcrypt (mínimo 10 rounds)
    role TEXT DEFAULT 'user' NOT NULL,  -- 'user', 'organizador', 'administrador', 'juez'
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
```

#### `events` (Versión básica - Fase 1)
```sql
CREATE TABLE events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_events_date ON events(date);
```

---

### Tablas Fase 1-2: Ampliación Básica

#### `events` (Versión ampliada)
```sql
CREATE TABLE events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    location TEXT,
    address TEXT,
    city TEXT,
    postal_code TEXT,
    club_id INTEGER,
    type TEXT,  -- 'interior', 'exterior', 'vehiculos', 'contenedores'
    level TEXT,  -- 'base', 'avanzado' (según reglamento: Base y Avanzado)
    status TEXT DEFAULT 'open' NOT NULL,  -- 'open', 'closed', 'cancelled'
    price DECIMAL(10, 2),
    registration_start_date TEXT,
    registration_end_date TEXT,
    max_participants INTEGER,
    evaluation_coefficients TEXT,  -- JSON con coeficientes ajustables por organizador
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (club_id) REFERENCES clubs(id)
);

CREATE INDEX idx_events_date ON events(date);
CREATE INDEX idx_events_club ON events(club_id);
CREATE INDEX idx_events_status ON events(status);
CREATE INDEX idx_events_level ON events(level);
```

#### `clubs`
```sql
CREATE TABLE clubs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    location TEXT,
    address TEXT,
    city TEXT,
    postal_code TEXT,
    email TEXT,
    phone TEXT,
    website TEXT,
    social_media TEXT,  -- JSON con redes sociales: {"instagram": "...", "facebook": "..."}
    logo_url TEXT,
    description TEXT,
    level TEXT,  -- 'organiza_pruebas', 'instructores_certificados', 'solo_entrenamiento'
    latitude REAL,
    longitude REAL,
    active BOOLEAN DEFAULT 1,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_clubs_slug ON clubs(slug);
CREATE INDEX idx_clubs_city ON clubs(city);
CREATE INDEX idx_clubs_active ON clubs(active);
```

---

### Tablas Fase 3: Resultados y Galerías

#### `results`
**Nota importante:** Este modelo debe reflejar las reglas del deporte según normativas participantes.

```sql
CREATE TABLE results (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    event_id INTEGER NOT NULL,
    dog_id INTEGER NOT NULL,
    handler_id INTEGER NOT NULL,
    level TEXT NOT NULL,  -- 'base', 'avanzado' (según reglamento)
    
    -- Criterios de evaluación según reglamento
    score_sistematica DECIMAL(5, 2),  -- Puntuación sistemática
    score_focalizacion DECIMAL(5, 2),  -- Puntuación focalización
    score_intensidad DECIMAL(5, 2),   -- Puntuación intensidad
    score_impresion_general DECIMAL(5, 2),  -- Impresión general
    total_score DECIMAL(10, 2),  -- Puntuación total calculada
    
    -- Tiempo y marca mínima (3 segundos según reglamento)
    time_seconds INTEGER,  -- Tiempo empleado en segundos
    mark_duration_seconds INTEGER,  -- Duración de la marca (mínimo 3 segundos)
    
    -- Información adicional
    position INTEGER,  -- Posición (sin pódiums tradicionales)
    category TEXT,
    judge_notes TEXT,  -- Notas del juez
    behavior_issues_noted BOOLEAN DEFAULT 0,  -- Si el perro tenía problemas de comportamiento avisados
    
    -- Sanciones (según reglamento: juez/organizador puede sancionar)
    sanction_applied BOOLEAN DEFAULT 0,
    sanction_type TEXT,  -- Tipo de sanción
    sanction_duration_months INTEGER,  -- Duración en meses (ej: 6 meses)
    sanction_notes TEXT,
    
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (event_id) REFERENCES events(id),
    FOREIGN KEY (dog_id) REFERENCES dogs(id),
    FOREIGN KEY (handler_id) REFERENCES users(id)
);

CREATE INDEX idx_results_event ON results(event_id);
CREATE INDEX idx_results_dog ON results(dog_id);
CREATE INDEX idx_results_handler ON results(handler_id);
CREATE INDEX idx_results_level ON results(level);
CREATE INDEX idx_results_total_score ON results(total_score DESC);
```

#### `recognitions` (Reconocimientos alternativos - sin pódiums)
```sql
CREATE TABLE recognitions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    event_id INTEGER NOT NULL,
    result_id INTEGER NOT NULL,
    recognition_type TEXT NOT NULL,  -- 'excelencia', 'mejor_tiempo', 'mejor_puntuacion', 'especial'
    recognition_name TEXT NOT NULL,
    description TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES events(id),
    FOREIGN KEY (result_id) REFERENCES results(id)
);

CREATE INDEX idx_recognitions_event ON recognitions(event_id);
```

#### `galleries`
```sql
CREATE TABLE galleries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    event_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    type TEXT NOT NULL,  -- 'photos', 'videos', 'mixed'
    external_url TEXT,  -- URL a Drive, Flickr, YouTube, Instagram
    thumbnail_url TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES events(id)
);

CREATE INDEX idx_galleries_event ON galleries(event_id);
```

---

### Tablas Fase 4: Usuarios y Perros

#### `user_profiles`
```sql
CREATE TABLE user_profiles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL UNIQUE,
    first_name TEXT,
    last_name TEXT,
    phone TEXT,
    address TEXT,
    city TEXT,
    postal_code TEXT,
    photo_url TEXT,
    bio TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_user_profiles_user ON user_profiles(user_id);
```

#### `dogs`
```sql
CREATE TABLE dogs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    handler_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    breed TEXT,
    birth_date TEXT,
    gender TEXT,  -- 'male', 'female'
    photo_url TEXT,
    registration_number TEXT UNIQUE,  -- Número de licencia/registro del perro
    registration_date TEXT,
    behavior_issues BOOLEAN DEFAULT 0,  -- Si el perro tiene problemas de comportamiento (según reglamento)
    behavior_issues_notes TEXT,  -- Notas sobre problemas de comportamiento
    notes TEXT,
    active BOOLEAN DEFAULT 1,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (handler_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_dogs_handler ON dogs(handler_id);
CREATE INDEX idx_dogs_registration_number ON dogs(registration_number);
CREATE INDEX idx_dogs_active ON dogs(active);
```

#### `registrations`
```sql
CREATE TABLE registrations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    event_id INTEGER NOT NULL,
    dog_id INTEGER NOT NULL,
    handler_id INTEGER NOT NULL,
    level TEXT NOT NULL,  -- 'base', 'avanzado'
    category TEXT,
    status TEXT DEFAULT 'pending' NOT NULL,  -- 'pending', 'confirmed', 'cancelled'
    payment_status TEXT DEFAULT 'pending' NOT NULL,  -- 'pending', 'paid', 'refunded'
    payment_method TEXT,  -- 'transfer', 'bizum', 'stripe', 'paypal'
    payment_reference TEXT,
    behavior_issues_noted BOOLEAN DEFAULT 0,  -- Si se indicó problemas de comportamiento
    behavior_issues_notes TEXT,
    notes TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES events(id),
    FOREIGN KEY (dog_id) REFERENCES dogs(id),
    FOREIGN KEY (handler_id) REFERENCES users(id),
    UNIQUE(event_id, dog_id)  -- Un perro solo puede inscribirse una vez por evento
);

CREATE INDEX idx_registrations_event ON registrations(event_id);
CREATE INDEX idx_registrations_dog ON registrations(dog_id);
CREATE INDEX idx_registrations_handler ON registrations(handler_id);
CREATE INDEX idx_registrations_status ON registrations(status);
CREATE INDEX idx_registrations_payment_status ON registrations(payment_status);
```

#### `payments`
```sql
CREATE TABLE payments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    registration_id INTEGER NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    currency TEXT DEFAULT 'EUR' NOT NULL,
    method TEXT NOT NULL,  -- 'transfer', 'bizum', 'stripe', 'paypal'
    status TEXT DEFAULT 'pending' NOT NULL,  -- 'pending', 'completed', 'failed', 'refunded'
    transaction_id TEXT UNIQUE,
    payment_date TEXT,
    notes TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (registration_id) REFERENCES registrations(id)
);

CREATE INDEX idx_payments_registration ON payments(registration_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_transaction_id ON payments(transaction_id);
```

---

### Tablas Fase 5: Clubes y Jueces

#### `club_members`
```sql
CREATE TABLE club_members (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    club_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    role TEXT DEFAULT 'member' NOT NULL,  -- 'member', 'organizer', 'instructor'
    joined_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (club_id) REFERENCES clubs(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE(club_id, user_id)
);

CREATE INDEX idx_club_members_club ON club_members(club_id);
CREATE INDEX idx_club_members_user ON club_members(user_id);
```

#### `judges`
```sql
CREATE TABLE judges (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL UNIQUE,
    bio TEXT,
    zone TEXT,  -- Zona de actuación geográfica
    languages TEXT,  -- JSON array: ['es', 'en', 'ca', 'eu']
    certification_level TEXT,
    certification_date TEXT,
    active BOOLEAN DEFAULT 1,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_judges_user ON judges(user_id);
CREATE INDEX idx_judges_active ON judges(active);
CREATE INDEX idx_judges_zone ON judges(zone);
```

#### `judge_assignments`
```sql
CREATE TABLE judge_assignments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    event_id INTEGER NOT NULL,
    judge_id INTEGER NOT NULL,
    role TEXT DEFAULT 'main' NOT NULL,  -- 'main', 'assistant' (según reglamento: puede tener ayudantes)
    assigned_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
    FOREIGN KEY (judge_id) REFERENCES judges(id),
    UNIQUE(event_id, judge_id, role)  -- Un juez solo puede tener un rol por evento
);

CREATE INDEX idx_judge_assignments_event ON judge_assignments(event_id);
CREATE INDEX idx_judge_assignments_judge ON judge_assignments(judge_id);
```

---

### Tablas Fase 6: Licencias y Rankings

#### `licenses`
```sql
CREATE TABLE licenses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    license_number TEXT UNIQUE NOT NULL,
    type TEXT NOT NULL,  -- 'handler', 'judge', 'instructor'
    issued_date TEXT NOT NULL,
    expiry_date TEXT NOT NULL,
    status TEXT DEFAULT 'active' NOT NULL,  -- 'active', 'expired', 'revoked'
    qr_code TEXT,  -- Código QR para carnet digital
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_licenses_user ON licenses(user_id);
CREATE INDEX idx_licenses_number ON licenses(license_number);
CREATE INDEX idx_licenses_status ON licenses(status);
CREATE INDEX idx_licenses_expiry ON licenses(expiry_date);
```

#### `dog_registrations`
```sql
CREATE TABLE dog_registrations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    dog_id INTEGER NOT NULL UNIQUE,
    registration_number TEXT UNIQUE NOT NULL,
    issued_date TEXT NOT NULL,
    expiry_date TEXT,
    status TEXT DEFAULT 'active' NOT NULL,  -- 'active', 'expired', 'revoked'
    qr_code TEXT,  -- Código QR para carnet digital del perro
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (dog_id) REFERENCES dogs(id) ON DELETE CASCADE
);

CREATE INDEX idx_dog_registrations_dog ON dog_registrations(dog_id);
CREATE INDEX idx_dog_registrations_number ON dog_registrations(registration_number);
CREATE INDEX idx_dog_registrations_status ON dog_registrations(status);
```

#### `rankings`
```sql
CREATE TABLE rankings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    dog_id INTEGER,
    handler_id INTEGER,
    club_id INTEGER,
    year INTEGER NOT NULL,
    season TEXT,  -- 'spring', 'summer', 'fall', 'winter', 'annual'
    level TEXT,  -- 'base', 'avanzado'
    category TEXT,
    total_points DECIMAL(10, 2) DEFAULT 0,
    position INTEGER,
    events_participated INTEGER DEFAULT 0,
    events_won INTEGER DEFAULT 0,
    calculated_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (dog_id) REFERENCES dogs(id) ON DELETE SET NULL,
    FOREIGN KEY (handler_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (club_id) REFERENCES clubs(id) ON DELETE SET NULL
);

CREATE INDEX idx_rankings_year ON rankings(year);
CREATE INDEX idx_rankings_dog ON rankings(dog_id);
CREATE INDEX idx_rankings_handler ON rankings(handler_id);
CREATE INDEX idx_rankings_club ON rankings(club_id);
CREATE INDEX idx_rankings_level ON rankings(level);
CREATE INDEX idx_rankings_position ON rankings(position);
```

#### `titles`
```sql
CREATE TABLE titles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    dog_id INTEGER,
    handler_id INTEGER,
    title_name TEXT NOT NULL,  -- 'Grado Base', 'Grado Avanzado', 'Campeón', etc.
    title_code TEXT NOT NULL,
    earned_date TEXT NOT NULL,
    event_id INTEGER,
    certificate_url TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (dog_id) REFERENCES dogs(id) ON DELETE SET NULL,
    FOREIGN KEY (handler_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE SET NULL
);

CREATE INDEX idx_titles_dog ON titles(dog_id);
CREATE INDEX idx_titles_handler ON titles(handler_id);
CREATE INDEX idx_titles_code ON titles(title_code);
```

---

### Tablas Fase 7: Blog y Contenido

#### `blog_posts`
```sql
CREATE TABLE blog_posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,  -- Markdown o HTML
    author_id INTEGER NOT NULL,
    featured_image_url TEXT,
    category TEXT,
    tags TEXT,  -- JSON array: ["nosework", "entrenamiento", "competiciones"]
    status TEXT DEFAULT 'draft' NOT NULL,  -- 'draft', 'published', 'archived'
    published_at TEXT,
    views INTEGER DEFAULT 0,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_status ON blog_posts(status);
CREATE INDEX idx_blog_posts_author ON blog_posts(author_id);
CREATE INDEX idx_blog_posts_published ON blog_posts(published_at);
```

#### `blog_categories`
```sql
CREATE TABLE blog_categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_blog_categories_slug ON blog_categories(slug);
```

---

## Notas de Migración a PostgreSQL

### 1. Cambios de Tipos de Datos

| SQLite | PostgreSQL |
|--------|------------|
| `INTEGER PRIMARY KEY AUTOINCREMENT` | `SERIAL PRIMARY KEY` o `BIGSERIAL PRIMARY KEY` |
| `TEXT` | `VARCHAR(n)` o `TEXT` |
| `REAL` | `DECIMAL(10, 2)` o `NUMERIC` |
| `BOOLEAN` | `BOOLEAN` (mismo) |
| `CURRENT_TIMESTAMP` | `CURRENT_TIMESTAMP` (mismo) |

### 2. Ejemplo de Migración de Tabla `users`

**SQLite:**
```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'user' NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);
```

**PostgreSQL:**
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user' NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 3. Consideraciones Especiales

#### JSON en PostgreSQL
- SQLite almacena JSON como TEXT
- PostgreSQL tiene tipo nativo `JSONB` (mejor rendimiento)
- Migrar campos JSON: `social_media`, `evaluation_coefficients`, `tags`, `languages`

**Ejemplo:**
```sql
-- SQLite
social_media TEXT  -- Almacena como string JSON

-- PostgreSQL
social_media JSONB  -- Tipo nativo JSON
```

#### Índices
- PostgreSQL soporta índices más avanzados (GIN para JSONB, full-text search)
- Considerar índices adicionales para búsquedas complejas

#### Foreign Keys y Constraints
- PostgreSQL tiene mejor soporte para constraints complejos
- Considerar `ON DELETE CASCADE` más estricto
- Añadir `CHECK` constraints para validación

**Ejemplo:**
```sql
-- PostgreSQL: Añadir constraint para validar nivel
ALTER TABLE results ADD CONSTRAINT check_level 
CHECK (level IN ('base', 'avanzado'));

ALTER TABLE events ADD CONSTRAINT check_status 
CHECK (status IN ('open', 'closed', 'cancelled'));
```

### 4. Herramientas de Migración

#### Opción 1: Knex.js
```javascript
// migrations/001_create_users.js
exports.up = function(knex) {
  return knex.schema.createTable('users', function(table) {
    table.increments('id').primary();
    table.string('email', 255).notNullable().unique();
    table.string('password', 255).notNullable();
    table.string('role', 50).defaultTo('user').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
```

#### Opción 2: Prisma
```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  password  String
  role      String   @default("user")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

#### Opción 3: Migración Manual con SQL
1. Exportar datos de SQLite a CSV/JSON
2. Crear esquema en PostgreSQL
3. Importar datos con transformaciones necesarias

### 5. Script de Migración de Datos

```javascript
// Ejemplo con better-sqlite3 y pg
const Database = require('better-sqlite3');
const { Client } = require('pg');

const sqliteDb = new Database('database.db');
const pgClient = new Client({
  host: 'localhost',
  database: 'nosework_db',
  user: 'postgres',
  password: 'password'
});

async function migrate() {
  await pgClient.connect();
  
  // Migrar usuarios
  const users = sqliteDb.prepare('SELECT * FROM users').all();
  for (const user of users) {
    await pgClient.query(
      'INSERT INTO users (email, password, role, created_at, updated_at) VALUES ($1, $2, $3, $4, $5)',
      [user.email, user.password, user.role, user.created_at, user.updated_at]
    );
  }
  
  // Repetir para otras tablas...
  
  await pgClient.end();
}
```

### 6. Validaciones Post-Migración

1. **Contar registros:** Verificar que el número de registros coincide
2. **Verificar foreign keys:** Asegurar integridad referencial
3. **Probar queries críticos:** Verificar rendimiento
4. **Validar constraints:** Verificar que funcionan correctamente

---

## Consideraciones de Diseño

### 1. IDs: Auto-increment vs UUID

**MVP (SQLite):** Auto-increment es suficiente  
**Producción (PostgreSQL):** Considerar UUIDs para:
- Escalabilidad horizontal
- Seguridad (no exponer secuencias)
- Sincronización entre sistemas

**Ejemplo con UUID:**
```sql
-- PostgreSQL
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) NOT NULL UNIQUE,
    ...
);
```

### 2. Soft Deletes

Considerar añadir `deleted_at` en lugar de borrar físicamente:
```sql
ALTER TABLE users ADD COLUMN deleted_at TIMESTAMP NULL;
CREATE INDEX idx_users_deleted_at ON users(deleted_at);
```

### 3. Auditoría

Considerar tablas de auditoría para cambios importantes:
```sql
CREATE TABLE audit_logs (
    id SERIAL PRIMARY KEY,
    table_name VARCHAR(100) NOT NULL,
    record_id INTEGER NOT NULL,
    action VARCHAR(50) NOT NULL,  -- 'INSERT', 'UPDATE', 'DELETE'
    user_id INTEGER,
    changes JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 4. Normalización

- Mantener normalización 3NF para integridad
- Considerar denormalización para rendimiento en:
  - Rankings (cachear cálculos)
  - Estadísticas (pre-calcular)

---

**Última actualización:** Enero 2025
