# Tasks: routing-redirects-i18n-base

## 1. Decisión /es

- [x] 1.1 Documentar en design.md la decisión adoptada: prefijo /es obligatorio (URLs canónicas con /es) u opcional (canónicas sin prefijo)
- [x] 1.2 Si se elige "sin prefijo canónico": invertir redirects para que /es/... redirija 301 a rutas sin prefijo. Si se elige "con /es obligatorio": asegurar que todas las rutas sin prefijo redirigen 301 a /es/...

## 2. Redirects 301

- [x] 2.1 Comprobar redirects existentes en next.config.mjs (/events → /es/eventos, /que-es-nosework-trial → /es/que-es-nosework-trial)
- [x] 2.2 Añadir redirects 301 para el resto de páginas principales hacia la forma canónica elegida: about, reglamento, como-empezar, contact, normativas, community, join; y si aplica events/[id] o eventos/[id]
- [x] 2.3 Asegurar que /eventos (si existe como ruta) redirige a la URL canónica de eventos según la decisión

## 3. Coherencia canonical y sitemap

- [x] 3.1 Revisar que las páginas usan canonical coherente con la decisión (con o sin /es)
- [x] 3.2 Revisar que el sitemap genera URLs coherentes con la decisión

## 4. Verificación

- [x] 4.1 Probar manualmente que los redirects devuelven 301 y llevan a la URL esperada
- [x] 4.2 Documentar en README o en openspec la convención de URLs adoptada
