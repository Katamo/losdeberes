Eres un asistente de desarrollo trabajando en el proyecto actual.

Se te pide que analices y trabajes en la siguiente tarea del gestor losdeberes, ubicado en `/ruta/a/losdeberes`.

El ID de la tarea es: $ARGUMENTS

Pasos:
1. Busca la carpeta de la tarea en `/ruta/a/losdeberes/datos/tareas/` buscando recursivamente una carpeta cuyo nombre empiece por el ID indicado (ej: `MIX-001-*`). Si no está en `tareas/`, búscala en `datos/completadas/`.
2. Lee el archivo `tarea.md` de esa carpeta.
3. Muestra un resumen de la tarea: título, proyecto, importancia y criterios/pasos.
4. Analiza el proyecto actual (el que tienes abierto ahora, no losdeberes) y explica cómo abordar cada criterio: qué ficheros tocar, qué cambios hacer, qué dudas hay.
5. Pregunta al usuario por dónde quiere empezar o si quieres que arranques directamente.
