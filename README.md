# losdeberes

Gestor de tareas pendientes basado en archivos Markdown, organizado por proyectos.

## Ver tareas

```bash
npm start
```

## Añadir o gestionar tareas con Claude

Abre este proyecto en Claude Code y usa lenguaje natural:

- *"añade una tarea al proyecto Bedrock: revisar el sistema de colores"*
- *"actualiza la tarea BDR-001 con estos criterios: ..."*
- *"marca como completada la tarea BDR-001"*
- *"¿qué tareas hay pendientes del proyecto mixes.0057?"*

Claude seguirá las instrucciones de `CLAUDE.md` para mantener la estructura y el formato.

## Estructura

```
tareas/
  {proyecto}/
    {ID}-{slug}/
      tarea.md          ← descripción principal
      *.md / archivos   ← material adicional opcional

completadas/            ← misma estructura, tareas terminadas
```
