Eres el generador de changelog del gestor losdeberes, ubicado en `/ruta/a/losdeberes`.

El proyecto para el que generar el changelog es: $ARGUMENTS

Pasos:

1. Lee `/ruta/a/losdeberes/datos/proyectos.yml` para obtener la ruta de la carpeta del proyecto.
   Si el proyecto no está en el mapeo, pregunta al usuario la ruta antes de continuar.

2. Lee las tareas completadas en `/ruta/a/losdeberes/datos/completadas/{proyecto}/`.
   De cada tarea extrae: id, titulo, importancia, fecha-completada.

3. Busca `CHANGELOG.md` en la carpeta del proyecto:
   - Si no existe: todas las tareas completadas son candidatas. Pregunta al usuario desde qué versión empezar (sugerencia: v0.1.0).
   - Si existe: lee la fecha de la última entrada y filtra solo las tareas completadas DESPUÉS de esa fecha.

4. Si no hay tareas nuevas desde la última entrada, informa al usuario y detente.

5. Sugiere la versión basándote en la importancia más alta de las tareas nuevas:
   - `critica` → major (X+1.0.0)
   - `alta` → minor (x.Y+1.0)
   - `media` o `baja` → patch (x.y.Z+1)

6. Muestra al usuario el borrador de la nueva entrada:
   - Versión sugerida y razonamiento
   - Entradas agrupadas por categoría (infiere del título: Added / Fixed / Changed / Removed)
   - Pide confirmación o que proponga una versión diferente

7. Cuando el usuario confirme la versión, escribe la entrada en `CHANGELOG.md` del proyecto:
   - Inserta la nueva entrada DESPUÉS de `## [Unreleased]` (o al inicio si no existe esa sección)
   - Usa el formato Keep a Changelog:

```
## [1.2.0] - 2026-05-29

### Added
- LEM-001 Añadir tracker de lanzadera

### Fixed
- BDR-001 Corregir sistema de importación de tipografías
```

8. Confirma: "CHANGELOG.md actualizado en {ruta} con la versión {version}."
