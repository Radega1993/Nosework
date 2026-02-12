# Sistema de Internacionalización (i18n)

Este documento describe el sistema de internacionalización implementado en Nosework Trial Community, incluyendo cómo funciona, cómo usarlo y cómo añadir nuevos idiomas.

**Última actualización:** 2026-02-12

---

## Visión General

El sistema de i18n proporciona:

- **Routing con prefijos de idioma**: URLs con formato `/es/...` y `/ca/...`
- **Detección automática de idioma**: Detecta el idioma preferido del navegador
- **Persistencia de preferencia**: Guarda la selección del usuario en cookie y localStorage
- **Redirecciones legacy**: Redirige URLs antiguas a sus equivalentes con prefijo de idioma
- **Componente selector de idioma**: UI para cambiar entre idiomas disponibles

---

## Idiomas Soportados

Actualmente soportados:
- **Español (es)**: Idioma por defecto
- **Catalán (ca)**: Disponible

Idiomas planificados para el futuro:
- **Inglés (en)**
- **Euskera (eu)**

---

## Arquitectura

### Componentes Principales

1. **`utils/i18n.js`**: Utilidades para manejo de idiomas
   - Detección de idioma desde URL, cookie, o navegador
   - Funciones para añadir/remover prefijos de idioma
   - Validación de idiomas soportados

2. **`middleware.js`**: Middleware de Next.js para routing
   - Redirige URLs sin prefijo a `/es/...`
   - Detecta idioma del navegador en primera visita
   - Establece cookie de preferencia de idioma
   - Excluye rutas de API y dashboard

3. **`components/LanguageSwitcher.js`**: Componente UI para cambio de idioma
   - Muestra idiomas disponibles
   - Permite cambiar idioma preservando la página actual
   - Establece cookie y localStorage

4. **`hooks/useLocalizedLink.js`**: Hook para generar links localizados
   - Detecta idioma actual automáticamente
   - Añade prefijo de idioma a rutas

---

## Uso en Componentes

### Generar Links Localizados

Usa el hook `useLocalizedLink` para generar links que preserven el idioma actual:

```jsx
import { useLocalizedLink } from '@/hooks/useLocalizedLink';
import Link from 'next/link';

function MyComponent() {
  const { localizedHref } = useLocalizedLink();
  
  return (
    <Link href={localizedHref('/eventos')}>
      Ver Eventos
    </Link>
  );
}
```

### Detectar Idioma Actual

```jsx
import { useRouter } from 'next/router';
import { getLanguageFromPath } from '@/utils/i18n';

function MyComponent() {
  const router = useRouter();
  const currentLang = getLanguageFromPath(router.asPath) || 'es';
  
  return <div>Idioma actual: {currentLang}</div>;
}
```

### Usar LanguageSwitcher

El componente `LanguageSwitcher` ya está integrado en el `Navbar`. Para usarlo en otros lugares:

```jsx
import LanguageSwitcher from '@/components/LanguageSwitcher';

function MyComponent() {
  return (
    <div>
      <LanguageSwitcher />
    </div>
  );
}
```

---

## Utilidades i18n

### Funciones Principales

#### `getSupportedLanguages()`
Retorna array de idiomas soportados: `['es', 'ca']`

#### `getDefaultLanguage()`
Retorna idioma por defecto: `'es'`

#### `isValidLanguage(lang)`
Valida si un código de idioma es soportado.

#### `getLanguageFromPath(path)`
Extrae el prefijo de idioma de una URL.
```js
getLanguageFromPath('/es/eventos') // 'es'
getLanguageFromPath('/eventos') // null
```

#### `addLanguagePrefix(path, lang)`
Añade prefijo de idioma a una ruta.
```js
addLanguagePrefix('/eventos', 'es') // '/es/eventos'
addLanguagePrefix('/eventos', 'ca') // '/ca/eventos'
```

#### `removeLanguagePrefix(path)`
Remueve prefijo de idioma de una ruta.
```js
removeLanguagePrefix('/es/eventos') // '/eventos'
```

#### `getPreferredLanguage(req)`
Obtiene idioma preferido combinando cookie y detección de navegador.
- Prioridad: cookie > navegador > default

---

## Redirecciones Legacy

Las siguientes URLs legacy redirigen automáticamente:

- `/events` → `/es/eventos`
- `/que-es-nosework-trial` → `/es/que-es-nosework-trial`

Las redirecciones están configuradas en `next.config.mjs` y preservan query parameters y hash fragments.

---

## Routing y Middleware

### Comportamiento del Middleware

1. **URLs sin prefijo**: Redirige a `/es/...` (301 permanente)
2. **URLs con prefijo válido**: Procesa normalmente
3. **URLs con prefijo inválido**: Redirige a `/es/...`
4. **Rutas excluidas**: `/api/*`, `/dashboard/*`, archivos estáticos

### Rewrites para Rutas Dinámicas

Las rutas dinámicas usan rewrites en `next.config.mjs`:

- `/es/eventos/[id]` → `/events/[id]`
- `/ca/eventos/[id]` → `/events/[id]`

Esto permite que las páginas dinámicas funcionen con prefijos de idioma sin duplicar código.

---

## Persistencia de Idioma

### Cookie `NEXT_LOCALE`

- **Nombre**: `NEXT_LOCALE`
- **Valor**: Código de idioma (`es`, `ca`)
- **Duración**: 1 año
- **Path**: `/`
- **SameSite**: `Lax`

### localStorage

También se guarda en `localStorage` con la misma clave para compatibilidad con código cliente.

### Prioridad

1. Cookie `NEXT_LOCALE` (si existe)
2. Detección de navegador (`Accept-Language` header)
3. Idioma por defecto (`es`)

---

## Añadir Nuevos Idiomas

### Paso 1: Actualizar Constantes

En `utils/i18n.js`:

```javascript
export const SUPPORTED_LANGUAGES = ['es', 'ca', 'en']; // Añadir 'en'

export const LANGUAGE_NAMES = {
  es: 'Español',
  ca: 'Català',
  en: 'English', // Añadir nombre del idioma
};
```

### Paso 2: Añadir Rewrites

En `next.config.mjs`, añadir rewrites para rutas dinámicas:

```javascript
{
  source: '/en/events/:id',
  destination: '/events/:id',
}
```

### Paso 3: Actualizar Sitemap

En `pages/sitemap.xml.js`, añadir URLs del nuevo idioma cuando haya contenido traducido.

### Paso 4: Traducir Contenido

Añadir traducciones del contenido (esto se implementará en una fase futura).

---

## SEO y Canonical URLs

### getCanonicalUrl

La función `getCanonicalUrl()` en `utils/seo.js` detecta automáticamente el idioma y añade el prefijo:

```jsx
import { getCanonicalUrl } from '@/utils/seo';
import { useRouter } from 'next/router';

function MyPage() {
  const router = useRouter();
  const canonical = getCanonicalUrl('/eventos', router);
  // Retorna: 'https://domain.com/es/eventos' o '/ca/eventos' según el idioma actual
}
```

### Sitemap

El sitemap genera URLs con prefijos de idioma. Actualmente solo incluye español (`/es/...`), pero la estructura está preparada para añadir más idiomas cuando haya contenido traducido.

---

## Breaking Changes

### URLs Sin Prefijo Redirigen

**ANTES:**
- `/events` → Página de eventos (sin redirección)

**DESPUÉS:**
- `/events` → Redirige 301 a `/es/eventos`

**Impacto:**
- Bookmarks antiguos seguirán funcionando (redirigen automáticamente)
- Enlaces externos seguirán funcionando (redirigen automáticamente)
- URLs sin prefijo ahora siempre redirigen a `/es/...`

### Recomendaciones

- Actualizar enlaces internos para usar prefijos de idioma
- Usar `useLocalizedLink` hook para generar links
- Verificar que todos los links funcionan correctamente

---

## Testing

### Tests Unitarios

- `utils/__tests__/i18n.test.js`: Tests para utilidades i18n (39 tests)
- `utils/__tests__/seo.test.js`: Tests para getCanonicalUrl (12 tests)
- `components/__tests__/LanguageSwitcher.test.js`: Tests para LanguageSwitcher

### Tests E2E

- `tests/e2e/i18n-language-switching.spec.ts`: Tests E2E para cambio de idioma

Ejecutar tests:
```bash
# Tests unitarios
npm test

# Tests E2E
npm run test:e2e -- tests/e2e/i18n-language-switching.spec.ts
```

---

## Troubleshooting

### El idioma no se detecta correctamente

1. Verificar que la cookie `NEXT_LOCALE` está establecida
2. Verificar que el middleware está ejecutándose (no está excluyendo la ruta)
3. Verificar que el prefijo de idioma en la URL es válido

### Los links no preservan el idioma

1. Usar `useLocalizedLink` hook en lugar de links estáticos
2. Verificar que `localizedHref()` está siendo llamado correctamente

### Las redirecciones no funcionan

1. Verificar configuración en `next.config.mjs`
2. Verificar que el middleware está configurado correctamente
3. Verificar que las rutas no están excluidas del middleware

---

## Referencias

- [Next.js Middleware Documentation](https://nextjs.org/docs/app/building-your-application/routing/middleware)
- [Next.js i18n Routing](https://nextjs.org/docs/advanced-features/i18n-routing)
- [RFC 5646 Language Tags](https://tools.ietf.org/html/rfc5646)

---

## Changelog

### 2026-02-12: Implementación Inicial
- Sistema de routing con prefijos de idioma (`/es/`, `/ca/`)
- Middleware para detección y redirección
- Componente LanguageSwitcher
- Redirecciones legacy
- Actualización de SEO y sitemap
