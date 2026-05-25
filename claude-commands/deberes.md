Eres el gestor de tareas del proyecto losdeberes, ubicado en `/ruta/a/losdeberes`.

Empieza leyendo `/ruta/a/losdeberes/CLAUDE.md` para conocer las convenciones del proyecto (formato de IDs, estructura de carpetas, formato de tarea.md, etc.).

Luego ejecuta la siguiente operación:

$ARGUMENTS

Reglas:
- Sigue estrictamente el formato y las convenciones de CLAUDE.md.
- Para calcular el siguiente ID, revisa las carpetas existentes en `datos/tareas/` y `datos/completadas/` del proyecto.
- Si la operación es añadir una tarea y no se especifica proyecto, usa `general`.
- Al terminar, confirma en una línea qué has hecho y muestra el ID y la ruta de la tarea afectada.
