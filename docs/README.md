# Documentación del Proyecto - Nosework Trial Community

## Índice de Documentación

Esta documentación está organizada en varios documentos que cubren todos los aspectos del proyecto:

1. **[Estado Actual del Proyecto](./estado-actual.md)** - Revisión del código existente y funcionalidades implementadas
2. **[Arquitectura y Stack Técnico](./arquitectura.md)** - Tecnologías, estructura y decisiones técnicas
3. **[Estructura de Páginas y Contenido](./estructura-paginas.md)** - Definición completa de todas las páginas y secciones
4. **[Fases de Desarrollo](./fases-desarrollo.md)** - Roadmap completo con fases y entregables
5. **[Estrategia SEO](./seo-estrategia.md)** - Plan de posicionamiento y optimización SEO
6. **[Guía de Desarrollo](./guia-desarrollo.md)** - Instrucciones para desarrolladores
7. **[Esquema de Base de Datos](./esquema-base-datos.md)** - Esquema actual y propuesto para fases futuras

## Visión General del Proyecto

**Nosework Trial Community** es una plataforma web para la gestión y promoción de la modalidad deportiva de Nosework Trial (deporte de perros detectores y olfato canino).

### Objetivo Principal

Crear una web que evolucione desde un sitio estático informativo hasta una aplicación web completa que permita:

- Informar sobre la modalidad deportiva
- Gestionar competiciones y eventos
- Administrar usuarios, clubs, jueces y rankings
- Facilitar inscripciones online
- Proporcionar recursos y documentación

### Enfoque de Desarrollo

El proyecto se desarrolla en **fases incrementales**, comenzando con un MVP estático y evolucionando hacia una aplicación web completa con funcionalidades avanzadas de gestión federativa.

## Estado del Proyecto

**Fase Actual:** Fase 1 - Web estática MVP (en desarrollo)

El proyecto tiene implementado:
- ✅ Estructura base Next.js
- ✅ Sistema de autenticación básico
- ✅ Gestión de eventos (CRUD)
- ✅ Páginas principales (Inicio, About, Events, etc.)
- ✅ Base de datos SQLite

**Próximos pasos:** Ver [Fases de Desarrollo](./fases-desarrollo.md) para el roadmap completo.

## Estructura del Proyecto

```
nosework-website/
├── components/          # Componentes React reutilizables
├── contexts/            # Contextos de React (Auth, etc.)
├── hooks/               # Custom hooks
├── middlewares/         # Middlewares de autenticación/autorización
├── pages/               # Páginas de Next.js (Pages Router)
│   ├── api/            # API routes
│   └── dashboard/      # Área privada
├── public/              # Archivos estáticos
├── styles/              # Estilos CSS
├── utils/               # Utilidades y helpers
└── docs/                # Documentación del proyecto
```

## Documentos de Referencia

### Para Desarrolladores
- [Guía de Desarrollo](./guia-desarrollo.md)
- [Arquitectura y Stack Técnico](./arquitectura.md)
- [Esquema de Base de Datos](./esquema-base-datos.md)

### Para Planificación
- [Fases de Desarrollo](./fases-desarrollo.md)
- [Estructura de Páginas y Contenido](./estructura-paginas.md)

### Para Marketing/SEO
- [Estrategia SEO](./seo-estrategia.md)

### Para Revisión
- [Estado Actual del Proyecto](./estado-actual.md)

## Contacto y Contribuciones

Para más información sobre el proyecto o para contribuir, consulta la documentación específica en cada documento.

---

**Última actualización:** Enero 2025
**Versión del proyecto:** 0.1.0

