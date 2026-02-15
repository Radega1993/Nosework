## Context

El proyecto usa Next.js 15 (Pages Router), React 19 y TailwindCSS 3.4. Ya existen componentes (Navbar, Footer, Button, SEOHead), páginas públicas (index, about, events, que-es-nosework-trial, reglamento, como-empezar, contact) y un sistema de diseño implícito (primary/secondary, container-custom, card). La spec `ui-system` define un rediseño completo: paleta navy/gold, tipografía (Inter/Montserrat/Poppins), hero full-width, header sticky, cards, footer oscuro, accesibilidad y SEO. El rediseño es cross-cutting: afecta layout global, tokens de diseño, componentes compartidos y todas las páginas públicas, sin cambiar lógica de negocio ni APIs.

## Goals / Non-Goals

**Goals:**
- Implementar el design system de la spec (colores, tipografía, espaciado) de forma centralizada y reutilizable.
- Rediseñar el layout global: contenedor 1200px, header sticky navy, hero full-width con overlay, secciones con cards y espacio en blanco.
- Actualizar Navbar, Footer, Hero y componentes reutilizables (Button, Card, Section wrapper) según la spec.
- Aplicar el nuevo look de forma consistente en todas las páginas públicas.
- Mantener WCAG 2.1 AA, SEO (meta, Schema.org, canonical) y objetivos de rendimiento (LCP, lazy loading).
- Dejar preparado el código para una futura fase de dark mode (tokens extensibles).

**Non-Goals:**
- No cambiar rutas, contenido editorial ni flujos de datos; solo presentación.
- No implementar dark mode en esta fase; solo preparar tokens.
- No añadir nuevas librerías de UI (salvo fuentes si se eligen externas); usar Tailwind y componentes propios.
- No rediseñar el dashboard de organizador ni páginas de auth en este cambio (se pueden dejar para una fase posterior).

## Decisions

### 1. Design tokens: Tailwind + CSS variables
**Decisión:** Definir la paleta y tipografía en `tailwind.config.js` (theme.extend) y, donde convenga, exponer variables CSS (e.g. `--color-navy`, `--color-gold`) en `globals.css` para uso en componentes y posible dark mode futuro.

**Rationale:** El proyecto ya usa Tailwind; extender el theme mantiene una sola fuente de verdad y permite usar clases (`bg-primary-600`, `text-accent`). Las CSS variables permiten cambiar valores en runtime (futuro dark mode) sin tocar Tailwind en cada componente.

**Alternativas:** Solo Tailwind (más simple pero menos flexible para dark mode); solo CSS variables (duplicación con utilidades Tailwind). Se elige híbrido.

### 2. Fuentes: Google Fonts (Inter o Montserrat)
**Decisión:** Cargar una familia principal (p. ej. Inter o Montserrat) vía `next/font` para evitar FOUT y cumplir rendimiento. Definir en `_app.js` o layout y usar en Tailwind (`font-sans`).

**Rationale:** La spec pide Inter / Montserrat / Poppins; una sola familia unifica el look. `next/font` optimiza la carga y evita layout shift.

**Alternativas:** Sistema (system-ui) — menos carácter; varias familias — más peso. Se elige una familia principal; títulos pueden usar la misma con distintos pesos/tamaños.

### 3. Header y navegación: componente Navbar existente
**Decisión:** Refactorizar el componente `Navbar` actual para aplicar estilo navy, altura 80px, sticky, y enlaces según rutas existentes (Inicio, Qué es, Reglamento, Cómo Empezar, Eventos, Quiénes Somos, Contacto). En móvil: menú hamburguesa con drawer deslizante desde la derecha.

**Rationale:** Reutilizar el componente evita duplicar lógica (AuthContext, LanguageSwitcher, useLocalizedLink). La spec menciona “Especialidades, Formación, Noticias”; se mapean a las rutas/páginas actuales del proyecto (Qué es, Cómo Empezar, Eventos / noticias si aplica) para no inventar rutas nuevas en este cambio.

**Alternativas:** Nuevo componente desde cero — más trabajo y riesgo de regresiones. Se elige refactor del Navbar existente.

### 4. Hero: componente dedicado reutilizable
**Decisión:** Tener un componente `HeroSection` (o ampliar el existente) que acepte props: título, subtítulo, imagen de fondo, overlay, 1–2 CTAs. Usar en la homepage y, si la spec lo indica, en otras páginas con variantes (altura, contenido).

**Rationale:** La spec exige hero full-width, 85vh, overlay, CTAs; un componente parametrizado permite consistencia y variaciones por página sin duplicar markup.

**Alternativas:** Hero hardcodeado solo en index — menos flexible. Se elige componente reutilizable.

### 5. Cards y secciones: clases Tailwind + componentes
**Decisión:** Definir estilos de card (sombra, hover translateY, imagen arriba) mediante clases Tailwind reutilizables y, si hay varias variantes, un componente `Card` con props (image, title, description, link). Section wrapper: componente o clase de contenedor (max-width, padding sm/md/lg, fondo claro/oscuro) según spec.

**Rationale:** La spec describe cards y section wrapper de forma clara; componentes + utilidades Tailwind equilibran reutilización y simplicidad.

**Alternativas:** Solo clases — puede haber repetición; solo componentes para todo — más archivos. Se elige combinación.

### 6. Migración incremental por página
**Decisión:** Aplicar el rediseño por fases: (1) design tokens y globals; (2) Navbar y Footer; (3) Hero y homepage; (4) resto de páginas públicas. Cada paso es desplegable y reversible.

**Rationale:** Un único PR con todo el sitio cambiado es difícil de revisar y arriesgado. Incremental permite validar diseño y accesibilidad por partes y hacer rollback por sección si hace falta.

**Alternativas:** Big bang — todo de golpe; más riesgo. Se elige incremental.

### 7. Footer: refactor del existente
**Decisión:** Rediseñar el `Footer` actual con fondo navy, texto blanco, columnas (navegación, contacto, legal) y barra inferior (aviso legal, privacidad, cookies) según spec, manteniendo enlaces y datos actuales.

**Rationale:** Misma lógica que Navbar: reutilizar componente y solo cambiar presentación.

### 8. Estados de página y errores
**Decisión:** Revisar que existan o añadir estados de loading, error, vacío y 404/500 con el nuevo design system (mismos colores y tipografía), sin cambiar comportamiento de errores.

**Rationale:** La spec los incluye; asegura coherencia visual en todos los estados.

## Risks / Trade-offs

- **[Riesgo] Romper estilos en páginas no tocadas en la primera iteración:** Si se cambian solo tokens globales (p. ej. `primary` a navy), páginas que usen `primary` pueden verse distintas de golpe.  
  **Mitigación:** Definir nuevas claves en Tailwind (e.g. `navy`, `gold`) y migrar componentes explícitamente a esas clases; o hacer el cambio de `primary` en un solo commit y revisar todas las páginas en una pasada.

- **[Riesgo] Regresiones de accesibilidad o SEO:** Cambiar estructura o clases puede afectar contraste, focus o jerarquía de encabezados.  
  **Mitigación:** Comprobar contraste 4.5:1 (gold sobre navy si se usa), focus visible, un H1 por página y meta/Schema en cada entrega; automatizar con Lighthouse en CI si es posible.

- **[Trade-off] Spec escrita para “Asociación de Perros Detectores”:** Algunos textos de la spec (hero “Expertos en Detección Canina”, “Hazte socio”) no coinciden con NTC.  
  **Decisión:** Aplicar el diseño (layout, colores, componentes) y mantener los textos y CTAs actuales del proyecto (Nosework Trial, “Cómo Empezar”, “Ver Reglamento”, etc.) salvo que el product owner pida cambiar copy; documentar la diferencia en tasks.

- **[Riesgo] Imágenes hero y rendimiento:** Imágenes grandes pueden empeorar LCP.  
  **Mitigación:** Hero en WebP, tamaños responsive, prioridad de carga en la imagen above-the-fold; lazy loading en el resto de imágenes según spec.

## Migration Plan

1. **Fase 1 – Tokens y base:** Actualizar `tailwind.config.js` con paleta (navy, gold, neutros) y tipografía; opcionalmente CSS variables en `globals.css`. Sin cambiar aún componentes visibles.
2. **Fase 2 – Layout y navegación:** Refactorizar Navbar (sticky, navy, drawer móvil) y Footer (navy, columnas). Comprobar en todas las páginas.
3. **Fase 3 – Homepage:** Hero full-width, sección de cards principal, about y resto de secciones de la homepage según spec.
4. **Fase 4 – Páginas internas:** Aplicar contenedor, tipografía y cards a qué-es-nosework-trial, reglamento, como-empezar, events, about, contact.
5. **Fase 5 – Pulido:** Estados loading/error/404/500, contraste y focus, Lighthouse (Performance, Accessibility, SEO) y ajustes finales.
6. **Rollback:** Cada fase en uno o varios commits; revertir commits de la fase afectada si surge un problema. No hay cambios de datos ni API; rollback es solo front-end.

## Open Questions

- ¿Se confirma una única familia de fuentes (Inter vs Montserrat) para todo el sitio?
- ¿Los textos y CTAs del hero/homepage deben alinearse con la spec (“Expertos en Detección Canina”, “Hazte socio”) o se mantienen los actuales de NTC? Nantener los actuales
- ¿Incluir en este cambio la página 404/500 personalizadas o dejarlas para un cambio aparte? incluirla
- ¿Hay restricciones de branding (logo, nombre “Nosework Trial” / “NTC”) que deban reflejarse en el header/footer además de lo ya definido en la spec? no hay restricciones
