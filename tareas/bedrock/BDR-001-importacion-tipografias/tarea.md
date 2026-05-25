---
id: BDR-001
titulo: Corregir sistema de importación de tipografías en Bedrock
proyecto: Bedrock
fecha: 2026-05-25
importancia: alta
estado: pendiente
---

## Descripción

No hay un sistema claro para importar y configurar tipografías en Bedrock. Actualmente cada proyecto que usa Bedrock consume las tipografías de manera distinta:

- **mixes.0057** define las tipos fuera de `bedrock-config` mediante variables SCSS privadas (`$_f-base`, `$_f-heading`) referenciadas en el bloque `@forward`.
- **blog.omata** carga las tipos desde Nuxt.
- **plantillas** consume también las tipos de manera distinta.

Hay que aunar criterios y corregir en todos los proyectos la manera en la que se importan las fuentes.

## Criterios a definir

- ¿Dónde se declara el `<link>` de Google Fonts (HTML, Nuxt config, `@import` CSS)?
- ¿Cómo se pasa la font-family a Bedrock (`$font-family` en `bedrock-config`)?
- ¿Deben los typesets declarar `font-family` explícitamente o heredar?
- Documentar el patrón canónico en el README de Bedrock.

## Proyectos afectados

- `css_bedrock` (definición del patrón)
- `mixes.0057`
- `blog.omata`
- `plantillas`
