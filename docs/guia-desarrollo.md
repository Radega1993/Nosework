# Guía de Desarrollo

Esta guía está dirigida a desarrolladores que trabajen en el proyecto Nosework Trial Community.

## Requisitos Previos

### Software Necesario
- **Node.js:** v18 o superior
- **npm:** v9 o superior (o yarn/pnpm)
- **Git:** Para control de versiones
- **Editor:** VS Code recomendado (con extensiones de React/Next.js)

### Extensiones VS Code Recomendadas
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- ES7+ React/Redux/React-Native snippets

## Configuración del Entorno

### 1. Clonar el Repositorio
```bash
git clone [url-del-repositorio]
cd nosework-website
```

### 2. Instalar Dependencias
```bash
npm install
```

### 3. Configurar Variables de Entorno
Crear archivo `.env.local`:
```env
JWT_SECRET=tu_secret_super_seguro_aqui
NODE_ENV=development
```

**⚠️ Importante:** No commitees el archivo `.env.local` con secrets reales.

### 4. Inicializar Base de Datos
La base de datos se inicializa automáticamente al primer uso. Los archivos `database.db` y `users.db` se crearán en la raíz del proyecto.

### 5. Ejecutar en Desarrollo
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

## Estructura del Proyecto

### Convenciones de Nombres

#### Archivos y Carpetas
- **Componentes:** PascalCase (`EventCard.js`)
- **Utilidades:** camelCase (`generateToken.js`)
- **Páginas:** camelCase (`about.js`)
- **Hooks:** camelCase con prefijo `use` (`useAuth.js`)

#### Componentes React
```javascript
// Componente funcional
export default function ComponentName() {
  return <div>...</div>;
}

// Con props
export default function ComponentName({ prop1, prop2 }) {
  return <div>...</div>;
}
```

#### API Routes
```javascript
// pages/api/example.js
export default function handler(req, res) {
  if (req.method === "GET") {
    // Lógica GET
  } else if (req.method === "POST") {
    // Lógica POST
  } else {
    res.status(405).json({ message: "Método no permitido" });
  }
}
```

## Estilos con Tailwind CSS

### Uso Básico
```jsx
<div className="bg-blue-500 text-white p-4 rounded-lg">
  Contenido
</div>
```

### Clases Comunes
- **Espaciado:** `p-4`, `m-4`, `px-6`, `py-2`
- **Colores:** `bg-green-500`, `text-white`, `border-gray-300`
- **Tipografía:** `text-xl`, `font-bold`, `text-center`
- **Layout:** `flex`, `grid`, `container`, `mx-auto`
- **Responsive:** `md:`, `lg:`, `xl:` (prefijos)

### Customización
Editar `tailwind.config.js` para personalizar colores, fuentes, etc.

## Base de Datos

### Conexión
```javascript
import { getDBConnection } from "@/utils/db";

const db = getDBConnection();
```

### Consultas Básicas
```javascript
// SELECT
const events = db.prepare("SELECT * FROM events").all();

// INSERT
db.prepare("INSERT INTO events (date, title, description) VALUES (?, ?, ?)")
  .run(date, title, description);

// UPDATE
db.prepare("UPDATE events SET title = ? WHERE id = ?")
  .run(newTitle, id);

// DELETE
db.prepare("DELETE FROM events WHERE id = ?").run(id);
```

### Migraciones (Futuro)
Cuando se migre a PostgreSQL, implementar sistema de migraciones con herramientas como:
- Knex.js
- TypeORM
- Prisma

## Autenticación

### Uso del AuthContext
```javascript
import { useContext } from "react";
import AuthContext from "@/contexts/AuthContext";

function MyComponent() {
  const { user, login, logout } = useContext(AuthContext);
  
  // user contiene: { id, email, role }
  // login(email, password) - función async
  // logout() - función
}
```

### Proteger Rutas
```javascript
import { useContext } from "react";
import { useRouter } from "next/router";
import AuthContext from "@/contexts/AuthContext";

function ProtectedPage() {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  
  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user]);
  
  if (!user) return null;
  
  return <div>Contenido protegido</div>;
}
```

### Proteger API Routes
```javascript
import { authenticateToken, authorizeRoles } from "@/middlewares/auth";

export default function handler(req, res) {
  authenticateToken(req, res, () => {
    authorizeRoles("organizador", "administrador")(req, res, () => {
      // Lógica protegida
    });
  });
}
```

## Hooks Personalizados

### useAuth
```javascript
import useAuth from "@/hooks/useAuth";

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();
  // ...
}
```

### useEvents
```javascript
import useEvents from "@/hooks/useEvents";

function MyComponent() {
  const token = localStorage.getItem("token");
  const { events, saveEvent, removeEvent } = useEvents(token);
  // ...
}
```

## Llamadas a la API

### Desde el Cliente
```javascript
// GET
const response = await fetch("/api/events");
const data = await response.json();

// POST con autenticación
const response = await fetch("/api/events", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  },
  body: JSON.stringify({ date, title, description })
});
```

## Componentes Reutilizables

### Button
```jsx
import Button from "@/components/Button";

<Button className="mt-4">Click me</Button>
```

### Navbar
```jsx
import Navbar from "@/components/Navbar";

// Se incluye automáticamente en todas las páginas
<Navbar />
```

## SEO en Next.js

### Head Component
```jsx
import Head from "next/head";

export default function MyPage() {
  return (
    <>
      <Head>
        <title>Mi Página - Nosework Trial Community</title>
        <meta name="description" content="Descripción de la página" />
        <meta property="og:title" content="Mi Página" />
        <meta property="og:description" content="Descripción" />
      </Head>
      {/* Contenido */}
    </>
  );
}
```

## Testing (Pendiente)

### Configuración Futura
```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
```

### Ejemplo de Test
```javascript
import { render, screen } from "@testing-library/react";
import Home from "@/pages/index";

test("renders home page", () => {
  render(<Home />);
  const heading = screen.getByText(/Nosework Trial/i);
  expect(heading).toBeInTheDocument();
});
```

## Linting y Formateo

### ESLint
```bash
npm run lint
```

### Configuración
El proyecto usa ESLint con configuración de Next.js. Ver `eslint.config.mjs`.

## Git Workflow

### Branches
- `main` - Producción
- `develop` - Desarrollo
- `feature/nombre-feature` - Nuevas funcionalidades
- `fix/nombre-fix` - Correcciones

### Commits
Usar mensajes descriptivos:
```
feat: añadir página de reglamento
fix: corregir error en autenticación
docs: actualizar documentación
style: mejorar diseño del navbar
refactor: reorganizar estructura de componentes
```

## Deployment

### Vercel (Recomendado)
1. Conectar repositorio a Vercel
2. Configurar variables de entorno
3. Deploy automático en cada push a `main`

### Variables de Entorno en Producción
```env
JWT_SECRET=secret_produccion_super_seguro
NODE_ENV=production
DATABASE_URL=postgresql://... (si se migra)
```

## Troubleshooting

### Problemas Comunes

#### Error: "Module not found"
```bash
# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
```

#### Error de Base de Datos
- Verificar que `database.db` existe
- Verificar permisos de escritura
- Revisar logs en consola

#### Error de Autenticación
- Verificar que `JWT_SECRET` está configurado
- Verificar formato del token en localStorage
- Revisar expiración del token

## Recursos Útiles

### Documentación
- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [SQLite Docs](https://www.sqlite.org/docs.html)

### Comunidad
- [Next.js Discord](https://discord.gg/nextjs)
- [React Community](https://react.dev/community)

---

**Última actualización:** Enero 2025

