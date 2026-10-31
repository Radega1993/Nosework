# Nosework Trial Community — Propuesta de imágenes y diseño

**Fecha de análisis:** 31/10/2026. **Material recibido:** 46 fotos (JPG/HEIC) y tres archivos ajenos a la selección fotográfica. Las imágenes de este paquete son copias optimizadas para previsualización, no los originales a máxima resolución.

## Qué hay en esta entrega
- `pantallas/`: 13 mockups de las primeras pantallas (ancho 1440 px) usando las fotos auténticas.
- `vista_general_01.jpg` a `vista_general_04.jpg`: resúmenes visuales.
- `catalogo/`: cuatro hojas de contacto numeradas para encontrar cada foto.
- `inventario_46_fotos.csv`: todas las fotos, valoración A/B/C, utilidad y archivo exportado.
- `asignaciones_por_pagina.csv`: selecciones concretas por sección, encuadre CSS y prioridad.
- `img/`: copias web optimizadas, con ID estable (foto-01.jpg...foto-46.jpg).
- 13 páginas `.html`: propuesta estática y navegable de estructura visual (enlaces/CTA decorativos, NO es el producto en funcionamiento). Abrir `index.html` en navegador, con los otros archivos y la carpeta `img/` en la misma carpeta.

## Referencia de los 13 mockups
1. `01_inicio` → https://nosework.radega.com/es
2. `02_que_es_nosework` → /es/que-es-nosework-trial
3. `03_competiciones` → /es/competiciones
4. `04_calendario` → /es/eventos
5. `05_resultados` → /es/resultados-rankings
6. `06_clubes` → /es/clubs
7. `07_niveles` → /es/niveles-titulos
8. `08_como_empezar` → /es/como-empezar
9. `09_reglamento` → /es/reglamento
10. `10_normativas` → /es/normativas
11. `11_contacto` → /es/contact
12. `12_login` → /login
13. `13_registro` → /register

## Recomendación visual principal
**Portada: foto 12 (`_DSC4695.jpg`)** con una maqueta de texto y foto en columnas, evitando superponer texto sobre caras. Muy buenas alternativas: foto 10 (`_DSC4394.jpg`) o foto 11 (`_DSC4419.jpg`). La fotografía 9 (`_DSC4306.jpg`) es especialmente valiosa como imagen de identidad porque aparece el nombre real de la comunidad.

### Evitar
- Estirar fotos verticales para ocupar banners horizontales.
- Utilizar capturas de WhatsApp/galerías de móvil con barras negras en las cabeceras (13, 14, 16, 17, 46).
- Usar una foto de un perro cualquiera como imagen de un club concreto si no pertenece a ese club.
- Inventar fotos de premios, ganadores, jueces oficiales, nacionales o resultados si aún no se han celebrado.
- Repetir la misma foto en cinco páginas distintas: reutilización moderada (hero excepcional y tarjetas secundarias).
- Subir los originales de 5–15 MB tal cual; generar WebP/AVIF y responsive `srcset`.

## Diseño sugerido
- Identidad: verde oscuro + verde salvia + fondo crema, acento cálido. Solo propuesta de color, no copia fiel del estilo actual.
- Cabeceras: columnas 45/55 para fotos horizontales; cabeceras compactas de 2 columnas en páginas de datos/documentos.
- Fotos verticales: tarjetas 4:5 o 3:4; usar `object-fit:cover` y `object-position` por foto. Nunca cambiar la relación de aspecto intrínseca.
- Calendario/Resultados: interfaz de datos y filtros, fotos secundarias. Estados vacíos elegantes.
- Clubes: logos verdaderos, no sustituir identidad de terceros. Conservar directorio existente.
- Reglamento y Normativas: dar prioridad a documentos, versiones, fechas y descargas. Evitar duplicar mucho contenido.
- Seguridad y autorización: confirmar cesión de uso web, derechos de autor e imagen de guías/personas; texto alternativo descriptivo sin datos personales.

## Observaciones de contenido durante la auditoría
- Página de clubes emplea «afiliar un club a la federación», pero `como-empezar` dice que Nosework Trial Community **no es una federación**. Unificar terminología institucional.
- Portada pública mostró un calendario del mes de **mayo de 2026** en la lectura realizada el **31 de octubre de 2026**; revisar fecha inicial del calendario frente a la fecha actual.
- Portada contiene filas de resultados etiquetadas como ejemplos y la página específica de resultados estaba cargando; conviene diseñar estado vacío real sin filas ficticias.
- En títulos y páginas normativas hay referencias a documentación de 2025; comprobar que las versiones mostradas son las vigentes y congruentes.

## Cómo implementarlo
1. Mantener las fotos originales guardadas; escoger los ID del CSV.
2. Generar derivados `webp` o `avif` adecuados al contenedor (escritorio y móvil), más fallback JPEG si interesa.
3. Sustituir URLs de placeholders a nivel de los componentes reales de la aplicación.
4. Ajustar `object-position` de forma distinta en escritorio y móvil, evitando cortar perros, nariz, Kong y caras humanas.
5. Confirmar responsive, accesibilidad, contraste y LCP de la hero image.
6. Verificar que los CTA apuntan a rutas reales, que los filtros funcionan y que no aparecen eventos o ranking inventados.

**Limitación:** Los mockups son propuestas creativas basadas en los contenidos visibles de las rutas públicas y el ZIP de fotos. No son capturas del CSS actual ni tienen los datos de componentes privados o dinámicos. Las imágenes muestran fotos auténticas, sin personas ni perros generados. 
