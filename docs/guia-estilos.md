# Guía de Estilos - Nosework Trial Community

Esta guía define el sistema de diseño completo del proyecto, incluyendo colores, tipografía, espaciado, componentes y principios de diseño.

## Filosofía de Diseño

### Principios
1. **Claridad:** Información clara y fácil de entender
2. **Accesibilidad:** Cumplir con WCAG 2.1 AA mínimo
3. **Consistencia:** Mismos patrones en todo el sitio
4. **Profesionalismo:** Diseño serio y confiable para una federación
5. **Modernidad:** Estética actual sin ser excesiva

### Personalidad de Marca
- **Confiable:** Transmite seguridad y profesionalismo
- **Inclusiva:** Acogedora para todos los niveles
- **Deportiva:** Refleja la naturaleza competitiva pero amigable
- **Natural:** Conecta con el trabajo con perros y naturaleza

---

## Paleta de Colores

### Colores Primarios

#### Verde Principal (Primary Green)
- **500:** `#10b981` - Color principal de marca
- **600:** `#059669` - Hover y estados activos
- **700:** `#047857` - Estados pressed
- **400:** `#34d399` - Estados hover suaves
- **50:** `#ecfdf5` - Fondos suaves
- **100:** `#d1fae5` - Fondos de secciones

**Uso:** Botones principales, enlaces, acentos, navbar

#### Azul Secundario (Secondary Blue)
- **500:** `#3b82f6` - Acciones secundarias
- **600:** `#2563eb` - Hover
- **700:** `#1d4ed8` - Estados activos
- **50:** `#eff6ff` - Fondos suaves
- **100:** `#dbeafe` - Fondos de secciones

**Uso:** Botones secundarios, información, enlaces externos

#### Púrpura (Accent Purple)
- **500:** `#8b5cf6` - Acentos especiales
- **600:** `#7c3aed` - Hover
- **50:** `#f5f3ff` - Fondos suaves

**Uso:** Elementos destacados, CTAs especiales, guías

### Colores Neutros

#### Grises
- **900:** `#111827` - Texto principal
- **800:** `#1f2937` - Texto secundario
- **700:** `#374151` - Texto terciario
- **600:** `#4b5563` - Texto deshabilitado
- **500:** `#6b7280` - Bordes
- **400:** `#9ca3af` - Bordes suaves
- **300:** `#d1d5db` - Bordes muy suaves
- **200:** `#e5e7eb` - Fondos de cards
- **100:** `#f3f4f6` - Fondos de secciones
- **50:** `#f9fafb` - Fondos de página

### Colores de Estado

#### Éxito (Success)
- **500:** `#10b981` (verde)
- **50:** `#ecfdf5`

#### Error (Error)
- **500:** `#ef4444`
- **50:** `#fef2f2`

#### Advertencia (Warning)
- **500:** `#f59e0b`
- **50:** `#fffbeb`

#### Información (Info)
- **500:** `#3b82f6` (azul)
- **50:** `#eff6ff`

---

## Tipografía

### Fuentes

**Familia Principal:** System fonts stack (optimizado para rendimiento)
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
```

**Fuente Monospace:** Para código
```css
font-family: 'Courier New', Courier, monospace;
```

### Escala Tipográfica

#### Títulos
- **H1:** `3rem` (48px) - `font-weight: 700` - Páginas principales
- **H2:** `2.25rem` (36px) - `font-weight: 700` - Secciones principales
- **H3:** `1.875rem` (30px) - `font-weight: 600` - Subsecciones
- **H4:** `1.5rem` (24px) - `font-weight: 600` - Subtítulos
- **H5:** `1.25rem` (20px) - `font-weight: 600` - Títulos pequeños
- **H6:** `1.125rem` (18px) - `font-weight: 600` - Títulos muy pequeños

#### Texto
- **Body Large:** `1.125rem` (18px) - `font-weight: 400` - Texto destacado
- **Body:** `1rem` (16px) - `font-weight: 400` - Texto normal
- **Body Small:** `0.875rem` (14px) - `font-weight: 400` - Texto secundario
- **Caption:** `0.75rem` (12px) - `font-weight: 400` - Notas, captions

#### Línea de Altura (Line Height)
- **Títulos:** `1.2` - Compacto
- **Texto:** `1.6` - Legible
- **Párrafos largos:** `1.75` - Cómodo para lectura

---

## Espaciado

### Sistema de Espaciado (8px base)

- **0:** `0px`
- **1:** `0.25rem` (4px)
- **2:** `0.5rem` (8px)
- **3:** `0.75rem` (12px)
- **4:** `1rem` (16px)
- **5:** `1.25rem` (20px)
- **6:** `1.5rem` (24px)
- **8:** `2rem` (32px)
- **10:** `2.5rem` (40px)
- **12:** `3rem` (48px)
- **16:** `4rem` (64px)
- **20:** `5rem` (80px)
- **24:** `6rem` (96px)

### Aplicación
- **Padding de secciones:** `p-8` (32px) o `p-12` (48px)
- **Gap entre elementos:** `gap-6` (24px) o `gap-8` (32px)
- **Margin entre secciones:** `mb-12` (48px) o `mb-16` (64px)

---

## Componentes Base

### Botones

#### Botón Primario
```jsx
<button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg">
  Texto
</button>
```

#### Botón Secundario
```jsx
<button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg">
  Texto
</button>
```

#### Botón Outline
```jsx
<button className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200">
  Texto
</button>
```

#### Botón Ghost
```jsx
<button className="text-green-600 hover:bg-green-50 font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
  Texto
</button>
```

**Tamaños:**
- **Small:** `py-2 px-4 text-sm`
- **Medium:** `py-3 px-6` (default)
- **Large:** `py-4 px-8 text-lg`

### Cards

#### Card Básica
```jsx
<div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6">
  Contenido
</div>
```

#### Card con Borde
```jsx
<div className="bg-white rounded-lg border border-gray-200 hover:border-green-300 transition-colors duration-200 p-6">
  Contenido
</div>
```

### Inputs

#### Input Estándar
```jsx
<input
  type="text"
  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors outline-none"
  placeholder="Placeholder"
/>
```

#### Textarea
```jsx
<textarea
  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors outline-none resize-vertical"
  rows="5"
/>
```

### Badges

#### Badge Primario
```jsx
<span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
  Texto
</span>
```

#### Badge Secundario
```jsx
<span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
  Texto
</span>
```

---

## Layout

### Contenedor Principal
```jsx
<div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
  Contenido
</div>
```

### Grid System

#### Grid 2 Columnas
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
  Elementos
</div>
```

#### Grid 3 Columnas
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
  Elementos
</div>
```

### Secciones

#### Sección Estándar
```jsx
<section className="py-12 md:py-16 lg:py-20">
  Contenido
</section>
```

#### Sección con Fondo
```jsx
<section className="py-12 md:py-16 lg:py-20 bg-gray-50">
  Contenido
</section>
```

---

## Efectos y Transiciones

### Transiciones
- **Duración estándar:** `duration-200` (200ms)
- **Duración larga:** `duration-300` (300ms)
- **Easing:** `ease-in-out` (default de Tailwind)

### Sombras
- **Small:** `shadow-sm`
- **Medium:** `shadow-md` (default)
- **Large:** `shadow-lg`
- **Hover:** `hover:shadow-xl`

### Hover Effects
- **Botones:** Cambio de color + sombra
- **Cards:** Elevación de sombra
- **Enlaces:** Cambio de color + underline

---

## Responsive Design

### Breakpoints
- **Mobile:** `< 640px` (default)
- **Tablet:** `≥ 640px` (sm:)
- **Desktop:** `≥ 768px` (md:)
- **Large Desktop:** `≥ 1024px` (lg:)
- **XL Desktop:** `≥ 1280px` (xl:)

### Estrategia
- **Mobile First:** Diseñar primero para móvil
- **Progressive Enhancement:** Añadir funcionalidades en pantallas grandes
- **Touch Friendly:** Mínimo 44x44px para elementos táctiles

---

## Accesibilidad

### Contraste
- **Texto normal:** Mínimo 4.5:1
- **Texto grande:** Mínimo 3:1
- **Elementos interactivos:** Mínimo 3:1

### Navegación por Teclado
- **Focus visible:** `focus:ring-2 focus:ring-green-500`
- **Tab order:** Lógico y predecible
- **Skip links:** Para saltar navegación

### ARIA Labels
- Usar cuando sea necesario
- Iconos sin texto deben tener aria-label
- Formularios con labels asociados

---

## Iconografía

### Estilo
- **Línea simple:** Outline style
- **Tamaño estándar:** 20px o 24px
- **Color:** Hereda del texto o color primario

### Librería Recomendada
- Heroicons (outline)
- Lucide React
- React Icons

---

## Animaciones

### Micro-interacciones
- **Hover:** Transición suave de color/sombra
- **Click:** Feedback visual inmediato
- **Loading:** Spinner o skeleton
- **Transiciones de página:** Fade suave

### Principios
- **Sutiles:** No distraer
- **Funcionales:** Comunican estado
- **Rápidas:** < 300ms para interacciones

---

## Ejemplos de Uso

### Hero Section
```jsx
<header className="bg-gradient-to-r from-green-600 to-green-700 text-white py-20 md:py-24">
  <div className="container mx-auto px-6 text-center">
    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
      Título Principal
    </h1>
    <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
      Descripción
    </p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Button>CTA Principal</Button>
      <Button variant="secondary">CTA Secundario</Button>
    </div>
  </div>
</header>
```

### Card de Contenido
```jsx
<div className="bg-white rounded-lg shadow-md p-8">
  <h3 className="text-2xl font-bold mb-4 text-gray-900">
    Título
  </h3>
  <p className="text-gray-700 mb-6">
    Contenido
  </p>
  <Button>Acción</Button>
</div>
```

---

## Checklist de Implementación

- [x] Paleta de colores definida
- [x] Tipografía establecida
- [x] Sistema de espaciado
- [x] Componentes base documentados
- [x] Layout patterns
- [x] Responsive breakpoints
- [x] Accesibilidad
- [x] Guía de uso

---

**Última actualización:** Enero 2025
**Versión:** 1.0

