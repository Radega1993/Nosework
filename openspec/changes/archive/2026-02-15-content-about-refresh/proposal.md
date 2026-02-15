# Proposal: content-about-refresh

## Why

La página "Sobre la asociación" (/about) debe cumplir REQ-F-029..032 y TASK-F1-015: transmitir quiénes son (equipo promotor/fundadores), visión, misión y valores, e historia que incluya el contexto respecto a FEPDE y deje claro que Nosework Trial no es FEPDE. El objetivo es una About que inspire confianza, aporte credibilidad y evite confusiones con otras entidades ("no somos FEPDE").

## What Changes

- Añadir o reforzar sección "Quiénes somos" / equipo promotor o fundadores (REQ-F-029), con tono que inspire y dé credibilidad.
- Mantener o pulir visión, misión y valores (REQ-F-030) para que refuercen identidad e inspiración.
- Actualizar la sección Historia (REQ-F-031): por qué nace la modalidad, contexto respecto a FEPDE y nosework, y mensaje explícito de que Nosework Trial es una iniciativa/comunidad independiente, no somos FEPDE.
- Incluir, si aplica, enlaces a estatutos o documentos legales (REQ-F-032, P1); si no existen, dejar preparado el hueco o texto tipo "disponibles próximamente".

## Capabilities

### New Capabilities

- `about-page`: Página pública /about con quiénes somos (equipo/fundadores), visión, misión, valores, historia (origen, contexto FEPDE/nosework, "no somos FEPDE") y enlaces a documentos legales si existen.

### Modified Capabilities

- (ninguno)

## Impact

- **Código:** `pages/about.js` (contenido y estructura de secciones).
- **Assets:** Opcional: enlaces a PDFs en `public/documents/` si se añaden estatutos u otros documentos legales.
