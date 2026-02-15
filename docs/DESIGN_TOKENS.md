# Design tokens – UI redesign

Este documento describe los tokens de diseño usados en el rediseño (paleta navy/gold, tipografía, contenedor). Definidos en `tailwind.config.js` y `styles/globals.css`.

## Colores

### Paleta principal
- **navy** (fondo header/footer, botones dark): `#0F2A44` (DEFAULT), `#091C2E` (dark)
- **gold** (CTAs, acentos, hover): `#F5B400` (DEFAULT), `#E0A100` (hover)

### Uso en Tailwind
- Fondo: `bg-navy`, `bg-navy-dark`
- Texto: `text-white` sobre navy; `text-gold`, `text-gold-hover` para acentos
- Botones: `bg-gold hover:bg-gold-hover text-navy` (primary), `bg-navy text-white` (dark)
- Outline: `border-navy`, `border-gold`

### Neutros
- `neutral-text-dark` (#1A202C), `neutral-text-medium` (#4A5568)
- Fondo claro: `#F4F6F8` (clase arbitraria `bg-[#F4F6F8]` o variable `--color-neutral-bg`)
- Borde: `neutral-border` (#E2E8F0)

## Tipografía

- **Fuente:** Inter (Google Fonts, cargada en `_document.js`).
- **Clases de tamaño (Tailwind):**
  - H1: `text-h1-redesign` (56px desktop), `text-h1-redesign-mobile` (36px móvil)
  - H2: `text-h2-redesign` (36px)
  - H3: `text-h3-redesign` (24px)
  - Cuerpo: `text-body-redesign` (16px), `text-body-redesign-lg` (18px)

## Contenedor

- **Clase:** `container-redesign`
- **Definición:** max-width 1200px, padding horizontal 24px, centrado.
- Definida en `globals.css`; usar en layout de páginas y en Navbar/Footer.

## Componentes que usan los tokens

- **Navbar:** `bg-navy`, `text-white`/`text-gold`, `container-redesign`
- **Footer:** `bg-navy-dark`, enlaces con `hover:text-gold`, `container-redesign`
- **Button:** variantes `primary` (gold), `secondary` (outline blanco), `dark` (navy), `outline` (navy), `ghost`
- **Card:** sombra `shadow-[0_10px_30px_rgba(0,0,0,0.08)]`, hover `-translate-y-[6px]`
- **Section:** fondos `light` (#F4F6F8) o `white`, padding sm/md/lg

## Variables CSS (globals.css)

Para posibles extensiones (p. ej. dark mode):
- `--color-navy`, `--color-navy-dark`, `--color-gold`, `--color-gold-hover`
- `--container-max`, `--container-padding`
- `--font-inter`
