# Esquema de Base de Datos

Este documento describe el esquema de base de datos actual y el propuesto para las fases futuras del proyecto.

## Estado Actual

### Tablas Implementadas

#### `users`
```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,  -- Hash bcrypt
    role TEXT DEFAULT 'user'  -- 'user', 'organizador', 'administrador'
);
```

#### `events`
```sql
CREATE TABLE events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL
);
```

---

## Esquema Propuesto (Fases Futuras)

### Fase 1-2: Ampliación Básica

#### `events` (Ampliado)
```sql
CREATE TABLE events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    location TEXT,
    club_id INTEGER,
    type TEXT,  -- 'interior', 'exterior', 'vehiculos', 'contenedores'
    level TEXT,  -- 'grado1', 'grado2', 'grado3'
    status TEXT DEFAULT 'open',  -- 'open', 'closed', 'cancelled'
    price DECIMAL(10, 2),
    registration_start_date TEXT,
    registration_end_date TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (club_id) REFERENCES clubs(id)
);
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
    social_media TEXT,  -- JSON con redes sociales
    logo_url TEXT,
    description TEXT,
    level TEXT,  -- 'organiza_pruebas', 'instructores_certificados', 'solo_entrenamiento'
    latitude REAL,
    longitude REAL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);
```

---

### Fase 3: Resultados y Galerías

#### `results`
```sql
CREATE TABLE results (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    event_id INTEGER NOT NULL,
    dog_id INTEGER NOT NULL,
    handler_id INTEGER NOT NULL,
    score DECIMAL(10, 2),
    time_seconds INTEGER,
    position INTEGER,
    level TEXT,
    category TEXT,
    notes TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES events(id),
    FOREIGN KEY (dog_id) REFERENCES dogs(id),
    FOREIGN KEY (handler_id) REFERENCES users(id)
);
```

#### `galleries`
```sql
CREATE TABLE galleries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    event_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    type TEXT,  -- 'photos', 'videos', 'mixed'
    external_url TEXT,  -- URL a Drive, Flickr, etc.
    thumbnail_url TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES events(id)
);
```

---

### Fase 4: Usuarios y Perros

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
    FOREIGN KEY (user_id) REFERENCES users(id)
);
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
    registration_number TEXT UNIQUE,
    registration_date TEXT,
    notes TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (handler_id) REFERENCES users(id)
);
```

#### `registrations`
```sql
CREATE TABLE registrations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    event_id INTEGER NOT NULL,
    dog_id INTEGER NOT NULL,
    handler_id INTEGER NOT NULL,
    level TEXT NOT NULL,
    category TEXT,
    status TEXT DEFAULT 'pending',  -- 'pending', 'confirmed', 'cancelled'
    payment_status TEXT DEFAULT 'pending',  -- 'pending', 'paid', 'refunded'
    payment_method TEXT,  -- 'transfer', 'bizum', 'stripe', 'paypal'
    payment_reference TEXT,
    notes TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES events(id),
    FOREIGN KEY (dog_id) REFERENCES dogs(id),
    FOREIGN KEY (handler_id) REFERENCES users(id),
    UNIQUE(event_id, dog_id)  -- Un perro solo puede inscribirse una vez por evento
);
```

#### `payments`
```sql
CREATE TABLE payments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    registration_id INTEGER NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    currency TEXT DEFAULT 'EUR',
    method TEXT NOT NULL,
    status TEXT DEFAULT 'pending',  -- 'pending', 'completed', 'failed', 'refunded'
    transaction_id TEXT,
    payment_date TEXT,
    notes TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (registration_id) REFERENCES registrations(id)
);
```

---

### Fase 5: Clubes y Jueces

#### `club_members`
```sql
CREATE TABLE club_members (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    club_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    role TEXT DEFAULT 'member',  -- 'member', 'organizer', 'instructor'
    joined_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (club_id) REFERENCES clubs(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    UNIQUE(club_id, user_id)
);
```

#### `judges`
```sql
CREATE TABLE judges (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL UNIQUE,
    bio TEXT,
    zone TEXT,  -- Zona de actuación
    languages TEXT,  -- JSON array: ['es', 'en', 'ca']
    certification_level TEXT,
    certification_date TEXT,
    active BOOLEAN DEFAULT 1,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

#### `judge_assignments`
```sql
CREATE TABLE judge_assignments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    event_id INTEGER NOT NULL,
    judge_id INTEGER NOT NULL,
    role TEXT DEFAULT 'main',  -- 'main', 'assistant'
    assigned_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES events(id),
    FOREIGN KEY (judge_id) REFERENCES judges(id)
);
```

---

### Fase 6: Licencias y Rankings

#### `licenses`
```sql
CREATE TABLE licenses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    license_number TEXT UNIQUE NOT NULL,
    type TEXT NOT NULL,  -- 'handler', 'judge', 'instructor'
    issued_date TEXT NOT NULL,
    expiry_date TEXT NOT NULL,
    status TEXT DEFAULT 'active',  -- 'active', 'expired', 'revoked'
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

#### `dog_registrations`
```sql
CREATE TABLE dog_registrations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    dog_id INTEGER NOT NULL UNIQUE,
    registration_number TEXT UNIQUE NOT NULL,
    issued_date TEXT NOT NULL,
    expiry_date TEXT,
    status TEXT DEFAULT 'active',  -- 'active', 'expired', 'revoked'
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (dog_id) REFERENCES dogs(id)
);
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
    level TEXT,
    category TEXT,
    total_points DECIMAL(10, 2) DEFAULT 0,
    position INTEGER,
    events_participated INTEGER DEFAULT 0,
    events_won INTEGER DEFAULT 0,
    calculated_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (dog_id) REFERENCES dogs(id),
    FOREIGN KEY (handler_id) REFERENCES users(id),
    FOREIGN KEY (club_id) REFERENCES clubs(id)
);
```

#### `titles`
```sql
CREATE TABLE titles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    dog_id INTEGER,
    handler_id INTEGER,
    title_name TEXT NOT NULL,  -- 'Grado 1', 'Grado 2', 'Campeón', etc.
    title_code TEXT NOT NULL,
    earned_date TEXT NOT NULL,
    event_id INTEGER,
    certificate_url TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (dog_id) REFERENCES dogs(id),
    FOREIGN KEY (handler_id) REFERENCES users(id),
    FOREIGN KEY (event_id) REFERENCES events(id)
);
```

---

### Fase 7: Blog y Contenido

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
    tags TEXT,  -- JSON array
    status TEXT DEFAULT 'draft',  -- 'draft', 'published', 'archived'
    published_at TEXT,
    views INTEGER DEFAULT 0,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES users(id)
);
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
```

---

## Índices Recomendados

```sql
-- Índices para mejorar rendimiento
CREATE INDEX idx_events_date ON events(date);
CREATE INDEX idx_events_club ON events(club_id);
CREATE INDEX idx_events_status ON events(status);
CREATE INDEX idx_results_event ON results(event_id);
CREATE INDEX idx_results_dog ON results(dog_id);
CREATE INDEX idx_results_handler ON results(handler_id);
CREATE INDEX idx_registrations_event ON registrations(event_id);
CREATE INDEX idx_registrations_dog ON registrations(dog_id);
CREATE INDEX idx_rankings_year ON rankings(year);
CREATE INDEX idx_rankings_dog ON rankings(dog_id);
CREATE INDEX idx_rankings_handler ON rankings(handler_id);
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_status ON blog_posts(status);
CREATE INDEX idx_clubs_slug ON clubs(slug);
```

---

## Migración desde SQLite a PostgreSQL

### Consideraciones

1. **Tipos de Datos:**
   - `TEXT` → `VARCHAR` o `TEXT`
   - `INTEGER` → `INTEGER` o `BIGINT`
   - `REAL` → `DECIMAL` o `NUMERIC`
   - `AUTOINCREMENT` → `SERIAL` o `BIGSERIAL`

2. **Funciones:**
   - `CURRENT_TIMESTAMP` funciona igual
   - `UNIQUE` funciona igual
   - `FOREIGN KEY` funciona igual

3. **Herramientas de Migración:**
   - Knex.js
   - TypeORM
   - Prisma
   - Migraciones manuales con SQL

### Ejemplo de Migración con Knex

```javascript
// migrations/001_create_users.js
exports.up = function(knex) {
  return knex.schema.createTable('users', function(table) {
    table.increments('id').primary();
    table.string('email').notNullable().unique();
    table.string('password').notNullable();
    table.string('role').defaultTo('user');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
```

---

## Backup y Restore

### SQLite
```bash
# Backup
cp database.db database.db.backup

# Restore
cp database.db.backup database.db
```

### PostgreSQL
```bash
# Backup
pg_dump -U username -d database_name > backup.sql

# Restore
psql -U username -d database_name < backup.sql
```

---

## Notas de Implementación

1. **Timestamps:** Usar formato ISO 8601 (`YYYY-MM-DD HH:MM:SS`)
2. **IDs:** Usar auto-incremento para desarrollo, considerar UUIDs para producción
3. **Soft Deletes:** Considerar campo `deleted_at` en lugar de borrar registros
4. **Auditoría:** Considerar tablas de auditoría para cambios importantes
5. **Normalización:** Mantener normalización 3NF, pero considerar denormalización para rendimiento si es necesario

---

**Última actualización:** Enero 2025

