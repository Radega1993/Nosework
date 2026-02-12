# UI Specification - Nosework Trial Community Platform

Este documento define los componentes de interfaz de usuario, templates principales y patrones de diseño para la plataforma.

**Framework UI:** React 19 + Tailwind CSS 3.4.17  
**Patrón de componentes:** Funcionales con hooks  
**Estado global:** Context API (AuthContext)  
**Rutas protegidas:** PrivateRoute component (Pages Router)

---

## Componentes de Layout

### Navbar

**Archivo:** `components/Navbar.js`  
**Estado:** ✅ Implementado (básico)

#### Estructura


```
┌──────────────────────────────────────────────────────────────────────────────────────────────────────────┐
[Logo] [Inicio] [Qué es] [Reglamento] [Cómo empezar] [Eventos] [Clubs] [Blog] [Contacto] [Login/Dashboard] │
└──────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```


#### Comportamiento

- **Desktop:** Menú horizontal con todos los enlaces visibles
- **Mobile:** Menú hamburguesa que se expande verticalmente
- **Autenticado:** Muestra enlace a Dashboard y botón "Cerrar Sesión"
- **No autenticado:** Muestra botón "Iniciar Sesión"
- **Activo:** Resalta el enlace de la página actual (estado activo visible)

#### Selector de Idioma (Fase 2)

- Dropdown en la esquina superior derecha
- Opciones: ES (default), CA, EN, EU
- Persistencia: cookie `lang` (server-friendly) + fallback opcional en localStorage
- El idioma se resuelve por prefijo de URL. Si no hay prefijo → 301 a `/es/...`
- Fallback a español si traducción no existe

#### Props

Ninguno (usa AuthContext directamente)

#### Mejoras Pendientes

- [ ] Añadir selector de idioma
- [ ] Indicador visual de página activa
- [ ] Dropdown "Mi Cuenta" para usuarios autenticados
- [ ] Notificaciones (badge) si hay mensajes pendientes

---

### Footer

**Archivo:** `components/Footer.js`  
**Estado:** ✅ Implementado (básico)

#### Estructura


```
┌─────────────────────────────────────────────────────────┐
│ [Brand] [Enlaces] [Recursos] [Redes]                    │
│ ─────────────────────────────────────────────────────── │
│ Copyright © 2026 Nosework Trial Community               │
└─────────────────────────────────────────────────────────┘
```

#### Secciones

1. **Brand:** Logo, descripción breve, redes sociales
2. **Enlaces principales:** Inicio, Qué es, Reglamento, Cómo Empezar
3. **Recursos:** Eventos, Quiénes Somos, Contacto
4. **Legal:** Política de Privacidad, Términos, Cookies (Fase 2)

#### Mejoras Pendientes

- [ ] Añadir enlaces legales
- [ ] Newsletter signup (opcional)
- [ ] Mapa del sitio
- [ ] Selector de idioma en footer

---

## Templates Principales

### Template: Página Pública

**Estructura:**

```jsx
<>
  <SkipToContentLink />
  <Navbar />
  <main id="main">
    <Hero /> {/* Opcional */}
    <Content />
    <CTA /> {/* Opcional */}
  </main>
  <Footer />
</>

```

**Características:**

- Padding top para compensar navbar fijo
- Contenedor con max-width responsive
- Breadcrumbs (opcional, según profundidad)
- Meta tags SEO en `<Head>`

**Ejemplo de uso:**

```jsx
// pages/que-es-nosework-trial.js
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function QueEsNoseworkTrial() {
  return (
    <>
      <Head>
        <title>Qué es Nosework Trial – Nosework deportivo</title>
        <meta name="description" content="..." />
      </Head>
      <Navbar />
      <main className="pt-16 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          {/* Contenido */}
        </div>
      </main>
      <Footer />
    </>
  );
}
```

---

### Template: Dashboard (Área Privada)

  - user (guía): /dashboard
  - organizador: /dashboard/eventos
  - administrador: /dashboard/usuarios
  - juez: /dashboard/eventos-asignados

**Estructura:**

```jsx
<Layout>
  <Navbar />
  <main>
    <DashboardSidebar />
    <DashboardContent>
      {/* Contenido específico del dashboard */}
    </DashboardContent>
  </main>
  <Footer />
</Layout>
```

**Componente DashboardSidebar:**

- Navegación lateral con items según rol:
  - **Guía:** Mi Perfil, Mis Perros, Inscripciones, Resultados, Licencia
  - **Organizador:** Eventos, Inscripciones, Resultados, Mi Club
  - **Administrador:** Usuarios, Clubs, Eventos, Jueces, Rankings, Estadísticas
  - **Juez:** Eventos Asignados, Resultados, Documentos

**Estado:** ⚠️ Pendiente implementación completa

---

## Componentes de Formularios

### Input

**Props:**

```typescript
{
  label: string;
  name: string;
  type?: 'text' | 'email' | 'password' | 'date' | 'number' | 'textarea';
  value: string;
  onChange: (e: ChangeEvent) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
}
```

**Ejemplo:**

```jsx
<Input
  label="Email"
  name="email"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error={errors.email}
  required
/>
```

**Estado:** ❌ Pendiente crear componente reutilizable

---

### Button

**Archivo:** `components/Button.js`  
**Estado:** ✅ Implementado (básico)

**Variantes:**

- `primary` - Botón principal (azul)
- `secondary` - Botón secundario (gris)
- `danger` - Botón de acción destructiva (rojo)
- `outline` - Botón con borde

**Props:**

```typescript
{
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  className?: string;
}
```

---

### Form de Login

**Archivo:** `pages/login.js`  
**Estado:** ✅ Implementado (básico)

**Campos:**

- Email (input type="email")
- Password (input type="password")
- Botón "Iniciar Sesión"
- Enlace "¿Olvidaste tu contraseña?" (Fase 4)

**Validación:**

- Cliente: HTML5 validation básica
- Servidor: Validación completa en API

**Mejoras Pendientes:**

- [ ] Validación en tiempo real
- [ ] Mensajes de error más descriptivos
- [ ] Loading state durante submit
- [ ] Recuperación de contraseña

---

### Form de Registro

**Archivo:** `pages/register.js`  
**Estado:** ✅ Implementado (básico)

**Campos:**

- Email
- Password
- Confirm Password
- Checkbox "Acepto términos y condiciones" (Fase 2)

**Mejoras Pendientes:**

- [ ] Validación de fortaleza de contraseña
- [ ] Verificación de email (Fase 4)
- [ ] Términos y condiciones clickeables

---

### Form de Evento (Organizador)

**Archivo:** `components/Event/EventForm.js`  
**Estado:** ✅ Implementado (básico)

**Campos actuales:**

- Fecha
- Título
- Descripción

**Campos pendientes (Fase 3):**

- Localidad, dirección, código postal
- Tipo de prueba (select: interior, exterior, vehículos, contenedores)
- Nivel (select: Base, Avanzado)
- Precio
- Fechas de inscripción (inicio y fin)
- Máximo de participantes
- Coeficientes de evaluación (si son diferentes)

**Mejoras Pendientes:**

- [ ] Validación de fechas (inscripción < evento)
- [ ] Selector de club (si el organizador pertenece a uno)
- [ ] Asignación de jueces (Fase 6)

---

## Componentes de Contenido

### EventCard

**Archivo:** `components/Event/EventCard.js`  
**Estado:** ✅ Implementado (básico)

**Información mostrada:**

- Título
- Fecha
- Descripción (truncada)
- Botón "Ver más" / "Inscribirse"

**Mejoras Pendientes:**

- [ ] Badge de estado (abierto, cerrado, cancelado)
- [ ] Información de club organizador
- [ ] Nivel y tipo de prueba
- [ ] Precio
- [ ] Número de plazas disponibles

---

### Calendario de Eventos

**Librería:** `react-calendar`  
**Estado:** ✅ Implementado (básico)

**Funcionalidades:**

- Vista mensual con eventos marcados
- Click en fecha muestra eventos del día
- Navegación entre meses

**Mejoras Pendientes:**

- [ ] Filtros (por nivel, tipo, localidad)
- [ ] Vista de lista alternativa
- [ ] Exportar a calendario personal (iCal)

---

## Componentes de Dashboard

### Dashboard Stats Cards

**Estado:** ❌ Pendiente

**Uso:** Mostrar estadísticas rápidas en dashboard

**Ejemplo para Organizador:**

```
┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│ Mis Eventos │ │ Inscripciones│ │ Próximo     │
│     5       │ │     23       │ │  15 Mar     │
└─────────────┘ └─────────────┘ └─────────────┘
```

---

### Tabla de Inscripciones

**Estado:** ❌ Pendiente (Fase 4)

**Columnas:**

- Perro
- Guía
- Nivel
- Estado de pago
- Acciones (marcar como pagado, cancelar)

**Funcionalidades:**

- Filtros
- Búsqueda
- Exportar a CSV/Excel
- Paginación

---

## Patrones de Diseño

### Colores (Tailwind)

**Primarios:**
- `primary-600` - Color principal (azul)
- `primary-700` - Hover
- `primary-50` - Background claro

**Secundarios:**
- `secondary-600` - Color secundario
- `gray-*` - Escala de grises

**Estados:**
- `green-*` - Éxito
- `red-*` - Error/Danger
- `yellow-*` - Advertencia
- `blue-*` - Información

---

### Tipografía

**Fuentes:**

- Headings: Font bold
- Body: Font normal
- Small: Font medium, tamaño reducido

**Tamaños:**

- `text-h1` - Títulos principales (2xl)
- `text-h2` - Subtítulos (xl)
- `text-h3` - Subtítulos menores (lg)
- `text-body` - Texto normal (base)
- `text-sm` - Texto pequeño

---

### Espaciado

**Sistema Tailwind:**

- Padding: `p-4`, `px-6`, `py-8`
- Margin: `m-4`, `mt-8`, `mb-4`
- Gap: `gap-4`, `gap-8`

**Contenedores:**

- Max-width: `container mx-auto`
- Padding horizontal: `px-4 md:px-6`

---

### Responsive Design

**Breakpoints Tailwind:**

- `sm:` - 640px+
- `md:` - 768px+
- `lg:` - 1024px+
- `xl:` - 1280px+

**Estrategia:**

- Mobile-first
- Menú hamburguesa en mobile
- Grid adaptativo (1 col mobile, 2-3 cols desktop)

---

## Selector de Idioma (i18n)

### Comportamiento

**Componente:** `components/LanguageSwitcher.js` (pendiente)

**Ubicación:**

- Navbar (desktop: esquina superior derecha)
- Footer (opcional)

**Funcionalidad:**

1. Si la URL no tiene prefijo (/es|/ca|/en|/eu) → redirección 301 a /es/...
1.1. (Opcional) si existe cookie lang y estás en / o ruta sin prefijo → redirigir a ese idioma.
2. Muestra selector dropdown con banderas/idiomas
3. Al cambiar idioma:
   - Actualiza URL con prefijo `/es/`, `/ca/`, etc.
   - Guarda preferencia en localStorage
   - Recarga contenido en nuevo idioma

**Fallback:**

- Si traducción no existe → mostrar en español
- Mostrar banner indicando "Contenido disponible solo en español"

**Implementación:**

```jsx
// Ejemplo de uso
<LanguageSwitcher 
  currentLanguage="es"
  availableLanguages={['es', 'ca', 'en', 'eu']}
  onChange={(lang) => {
    const path = router.asPath.replace(/^\/(es|ca|en|eu)(\/|$)/, '/');
    router.push(`/${lang}${path.startsWith('/') ? path : `/${path}`}`);
  }}

/>
```

---

## Navegación del Dashboard por Rol

### Guía (User)

```
Dashboard
├── Mi Perfil
├── Mis Perros
│   └── [Perro Individual]
├── Mis Inscripciones
│   └── [Detalle Inscripción]
├── Mis Resultados
└── Mi Licencia
    └── Carnet Digital
```

### Organizador

```
Dashboard
├── Mis Eventos
│   ├── Nuevo Evento
│   └── [Evento Individual]
│       ├── Inscripciones
│       └── Resultados
├── Mi Club (si aplica)
└── Estadísticas
```

### Administrador

```
Dashboard
├── Usuarios
├── Clubs
├── Eventos (todos)
├── Jueces
├── Rankings
├── Contenido
│   ├── Blog
│   └── Documentos
└── Estadísticas
```

### Juez (Fase 6)

```
Dashboard
├── Eventos Asignados
│   └── [Evento]
│       └── Introducir Resultados
└── Documentos Internos
```

---

## Componentes Pendientes

### Por Crear

1. **Input** - Componente reutilizable de input
2. **Select** - Componente de select/dropdown
3. **Textarea** - Componente de textarea
4. **Checkbox** - Componente de checkbox
5. **Radio** - Componente de radio button
6. **Modal** - Componente modal reutilizable
7. **Alert** - Componente de alertas/notificaciones
8. **Loading** - Spinner/loading state
9. **Pagination** - Componente de paginación
10. **Breadcrumbs** - Navegación breadcrumb
11. **LanguageSwitcher** - Selector de idioma
12. **DashboardSidebar** - Sidebar del dashboard
13. **StatsCard** - Tarjeta de estadísticas
14. **DataTable** - Tabla de datos con filtros
15. **FileUpload** - Componente de subida de archivos

---

## Accesibilidad (WCAG 2.1 AA)

### Requisitos

- **Contraste:** Mínimo 4.5:1 para texto normal, 3:1 para texto grande
- **Navegación por teclado:** Todas las funciones accesibles con teclado
- **ARIA labels:** En botones iconos y elementos interactivos
- **Alt text:** Todas las imágenes con texto alternativo
- **Focus visible:** Indicadores claros de foco
- **Lectores de pantalla:** Estructura semántica correcta (header, main, footer, nav)

### Checklist por Componente

**Navbar:**
- [x] ARIA label en botón hamburguesa
- [ ] SkipToContentLink (en todas las páginas)
- [ ] Focus trap en menú móvil

**Formularios:**
- [ ] Labels asociados a inputs
- [ ] Mensajes de error accesibles
- [ ] Indicadores de campos requeridos

**Botones:**
- [ ] Texto descriptivo o ARIA label
- [ ] Estado disabled visible
- [ ] Focus visible

---

## Estado de Implementación

### ✅ Implementados

- Navbar (básico)
- Footer (básico)
- Button
- EventCard
- EventForm (básico)
- Calendario (react-calendar)
- Login form
- Register form

### ⚠️ Parcialmente Implementados

- Dashboard (estructura básica, falta sidebar y navegación completa)

### ❌ Pendientes

- Todos los componentes listados en "Componentes Pendientes"
- Selector de idioma
- Componentes de dashboard avanzados
- Componentes de formularios reutilizables
- Mejoras de accesibilidad

---

**Última actualización:** Enero 2025
