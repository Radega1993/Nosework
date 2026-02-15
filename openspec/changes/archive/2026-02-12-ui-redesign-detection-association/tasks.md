## 1. Design tokens y base

- [x] 1.1 Añadir paleta en tailwind.config.js: navy (#0F2A44, #091C2E), gold (#F5B400, #E0A100), neutros (white, #F4F6F8, #E2E8F0, #1A202C, #4A5568)
- [x] 1.2 Añadir tipografía en tailwind.config.js (tamaños H1 56px/36px, H2 36px, H3 24px, body 16px, highlight 18px) y line-height 1.2 / 1.6
- [x] 1.3 Configurar una familia de fuentes (Inter o Montserrat) con next/font en _app.js y asignarla a font-sans en Tailwind
- [x] 1.4 Añadir CSS variables en globals.css para colores clave (--color-navy, --color-gold, etc.) para posible dark mode futuro
- [x] 1.5 Definir clase de contenedor global: max-width 1200px, padding horizontal 24px, centrado
- [x] 1.6 Verificar que los nuevos tokens no rompen páginas existentes (revisión visual rápida)

## 2. Navbar

- [x] 2.1 Aplicar fondo navy sólido y altura 80px al Navbar
- [x] 2.2 Hacer el Navbar sticky (fixed top) con z-index adecuado
- [x] 2.3 Ajustar estructura: logo a la izquierda, enlaces de navegación centrados/derecha, iconos sociales a la derecha
- [x] 2.4 Aplicar enlaces actuales del proyecto (Inicio, Qué es, Reglamento, Cómo Empezar, Eventos, Quiénes Somos, Contacto) con useLocalizedLink
- [x] 2.5 Añadir hover: subrayado animado y transición a color accent (gold)
- [x] 2.6 Implementar menú hamburguesa en vista móvil (<768px) con botón que abre/cierra
- [x] 2.7 Implementar drawer deslizante desde la derecha en móvil con los mismos enlaces
- [x] 2.8 Verificar contraste texto sobre navy y estados de foco (accesibilidad)

## 3. Footer

- [x] 3.1 Aplicar fondo navy oscuro y texto blanco al Footer
- [x] 3.2 Estructurar columnas: navegación, contacto, legal según spec
- [x] 3.3 Añadir barra inferior con enlaces: Aviso legal, Política de privacidad, Política de cookies
- [x] 3.4 Mantener enlaces y datos actuales del Footer (rutas, useLocalizedLink)
- [x] 3.5 Verificar contraste y focus en todos los enlaces del footer

## 4. Componentes reutilizables

- [x] 4.1 Actualizar Button: variantes primary (gold), secondary (outline blanco), dark (navy), ghost según spec
- [x] 4.2 Añadir estados hover, active y disabled al Button con transiciones 200ms
- [x] 4.3 Crear o actualizar Card: props image, title, description, link; sombra 0 10px 30px rgba(0,0,0,0.08); hover translateY(-6px)
- [x] 4.4 Crear Section wrapper (o clases): opciones de fondo (light gray #F4F6F8, white), padding sm/md/lg, opción centrado
- [x] 4.5 Asegurar que Button y Card usan los nuevos tokens (navy, gold) y no rompen páginas que ya los usan

## 5. Hero (homepage)

- [x] 5.1 Crear o ampliar HeroSection con props: title, subtitle, backgroundImage, overlay (rgba 0,0,0,0.55), primaryCTA, secondaryCTA
- [x] 5.2 Aplicar layout: full width, altura 85vh, background cover, overlay encima
- [x] 5.3 Contenido alineado a la izquierda: H1, subtítulo, espaciado 24px entre elementos
- [x] 5.4 Integrar en homepage con textos/CTAs actuales de NTC (p. ej. Cómo Empezar, Ver Reglamento) o los definidos por product owner
- [x] 5.5 Usar imagen hero en WebP y prioridad de carga para LCP; lazy loading en imágenes no above-the-fold
- [x] 5.6 Ajustar hero en móvil: reducir tamaño H1, apilar botones verticalmente si hace falta

## 6. Homepage – secciones

- [x] 6.1 Sección de cards principal: grid 3 columnas desktop, 1 móvil; cards con imagen arriba, fondo blanco, sombra ligera, hover translateY(-6px)
- [x] 6.2 Contenido de cards según spec/homepage (p. ej. Qué es Nosework Trial, Cómo Empezar, Eventos o equivalentes)
- [x] 6.3 Sección About: layout 50/50, izquierda H2 + texto + botón secundario, derecha imagen grande border-radius 12px; fondo gris claro #F4F6F8
- [x] 6.4 Sección Noticias/Eventos: grid 3 columnas; cada card con imagen, etiqueta fecha, título, enlace "Leer más"; hover zoom suave en imagen y transición color título
- [x] 6.5 Botón centrado "Ver todas las noticias" o equivalente enlazando a eventos/noticias
- [x] 6.6 Sección Partners (opcional): fila horizontal de logos, opacidad 0.7 por defecto, 1 en hover; fondo blanco, borde superior sutil
- [x] 6.7 Asegurar una sola H1 en la página y jerarquía H2/H3 correcta (SEO)

## 7. Páginas internas – layout y tipografía

- [x] 7.1 Aplicar contenedor 1200px y padding 24px a página qué-es-nosework-trial
- [x] 7.2 Aplicar contenedor y tipografía del design system a página reglamento
- [x] 7.3 Aplicar contenedor y tipografía a página como-empezar
- [x] 7.4 Aplicar contenedor y tipografía a página events (listado y detalle si aplica)
- [x] 7.5 Aplicar contenedor y tipografía a página about
- [x] 7.6 Aplicar contenedor y tipografía a página contact
- [x] 7.7 Usar Section wrapper y Card donde encaje en cada página para consistencia visual
- [x] 7.8 Verificar en cada página: un H1, meta title/description y canonical correctos (SEO)

## 8. Estados de página y errores

- [x] 8.1 Revisar o añadir estado de loading con spinner/placeholder usando colores navy/gold
- [x] 8.2 Revisar o añadir estado de error con mensaje y posible retry usando el design system
- [x] 8.3 Revisar o añadir estado vacío (sin resultados) con ilustración o texto y CTA si aplica
- [x] 8.4 Página 404 personalizada con diseño navy/gold y enlace a inicio
- [x] 8.5 Página 500 personalizada con diseño navy/gold y mensaje de error genérico
- [x] 8.6 Asegurar que todos los estados tienen contraste y focus visibles (WCAG 2.1 AA)

## 9. Responsive y accesibilidad

- [x] 9.1 Verificar breakpoints: móvil <768px, tablet 768–1024px, desktop >1024px en todos los componentes tocados
- [x] 9.2 Verificar grids: 3 → 2 → 1 columnas según viewport en secciones de cards
- [x] 9.3 Comprobar contraste mínimo 4.5:1 en texto normal y 3:1 en texto grande; corregir si gold sobre navy no cumple
- [x] 9.4 Comprobar focus visible en todos los elementos interactivos (botones, enlaces, menú)
- [x] 9.5 Añadir aria-labels donde haga falta (iconos, menú hamburguesa)
- [x] 9.6 Verificar que todas las imágenes tienen alt adecuado
- [x] 9.7 Comprobar navegación completa por teclado (Tab, Enter, Escape para cerrar drawer)

## 10. Rendimiento y SEO

- [x] 10.1 Optimizar imagen hero: WebP, tamaños responsive, priority en above-the-fold
- [x] 10.2 Lazy loading en imágenes que no están above-the-fold
- [x] 10.3 Verificar que Schema.org SportsOrganization y meta por página se mantienen tras el rediseño
- [x] 10.4 Verificar canonical y meta title/description dinámicos en páginas públicas
- [x] 10.5 Ejecutar Lighthouse: Performance >90, Accessibility >95, SEO >90; documentar y corregir incidencias
- [x] 10.6 Revisar que no hay regresiones en Core Web Vitals (LCP <2.5s objetivo)

## 11. Validación final

- [x] 11.1 Revisión visual en desktop de todas las páginas públicas con el nuevo diseño
- [x] 11.2 Revisión visual en tablet y móvil de homepage, una página interna y Navbar/Footer
- [x] 11.3 Ejecutar tests E2E existentes y corregir fallos debidos al rediseño (selectores, textos)
- [x] 11.4 Comprobar que i18n (LanguageSwitcher, useLocalizedLink) sigue funcionando en Navbar y Footer
- [x] 11.5 Documentar en README o docs los nuevos tokens (colores, fuentes) y cómo usarlos
