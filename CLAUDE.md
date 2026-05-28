# losdeberes — instrucciones para Claude

Este proyecto es un gestor de tareas basado en archivos Markdown. Cada tarea vive en su propia carpeta dentro de `datos/tareas/{proyecto}/{ID}-{slug}/`.

---

## Estructura de carpetas

```
losdeberes/
├── datos/                     ← ignorado en git; repo privado independiente
│   ├── tareas/
│   │   ├── general/           ← tareas sin proyecto específico
│   │   └── {proyecto}/        ← una carpeta por proyecto
│   │       └── {ID}-{slug}/   ← una carpeta por tarea
│   │           ├── tarea.md   ← descripción principal (obligatorio)
│   │           └── *.md / *.png
│   └── completadas/           ← misma estructura; tareas terminadas
└── scripts/ / CLAUDE.md / ...  ← herramienta pública
```

---

## Formato de tarea.md

```markdown
---
id: BDR-001
titulo: Título claro de la tarea
proyecto: NombreProyecto
fecha: YYYY-MM-DD
importancia: alta
estado: pendiente
desbloquea: MIG-004
---
```

El campo `desbloquea` es opcional. Indica que al completar esta tarea, la tarea referenciada queda desbloqueada. Puede ser un ID único (`MIG-004`) o una lista (`[MIG-004, BLG-003]`).

Las tareas de rutina añaden el campo `proyectos`:

```markdown
---
id: RUT-001
titulo: Título de la tarea transversal
proyecto: rutina
proyectos: [bedrock, mixes.0057, blog.omata]
fecha: YYYY-MM-DD
importancia: alta
estado: pendiente
---
```

El cuerpo (`## Descripción`, `## Criterios / pasos`) sigue el mismo formato que el resto de tareas.

Cuando se completa la tarea en un proyecto, se elimina ese proyecto de la lista `proyectos`. Cuando la lista queda vacía, la tarea se mueve a `completadas/`.

### Valores de importancia

| Valor | Cuándo usarlo |
|---|---|
| `critica` | Bloquea algo en producción |
| `alta` | Importante, abordar pronto |
| `media` | Relevante pero no urgente |
| `baja` | Nice-to-have |

---

## ID de tarea

El ID se compone de un prefijo de 3 letras derivado del nombre del proyecto + número secuencial de 3 dígitos:

| Proyecto | Prefijo |
|---|---|
| General | GEN |
| MiProyecto | MIP |
| OtroProyecto | OTR |
| (nuevo proyecto) | 3 primeras letras en mayúsculas |

Para calcular el siguiente número: revisar todas las carpetas en `datos/tareas/{proyecto}/` **y** `datos/completadas/{proyecto}/` y usar el número más alto + 1.

---

## Cómo añadir una tarea nueva

> Comando de ejemplo al usuario: *"añade una tarea al proyecto Bedrock: revisar el sistema de colores"*

1. Determinar el proyecto. Si no se indica → `general`.
2. Calcular el siguiente ID (ver regla de prefijo + secuencial).
3. Crear el slug: título en minúsculas, palabras separadas por guiones, sin acentos ni caracteres especiales.
4. Crear la carpeta: `datos/tareas/{proyecto}/{ID}-{slug}/`
5. Crear `tarea.md` con el frontmatter completo y una descripción clara.
6. Confirmar: *"Tarea {ID} creada: datos/tareas/{proyecto}/{ID}-{slug}/"*

---

## Cómo añadir una tarea de rutina (transversal)

> *"añade una rutina: aplicar actualización de Bedrock en todos los proyectos"*

Las tareas de rutina son tareas que deben aplicarse en varios proyectos. Viven en el proyecto especial `rutina` (prefijo `RUT`) y aparecen al inicio de la lista.

1. Proyecto = `rutina`, prefijo = `RUT`.
2. Calcular siguiente ID revisando `datos/tareas/rutina/` y `datos/completadas/rutina/`.
3. Crear la carpeta: `datos/tareas/rutina/{ID}-{slug}/`
4. Crear `tarea.md` con el campo `proyectos: [proyecto1, proyecto2, ...]` listando todos los proyectos donde aplica.
5. Confirmar: *"Rutina {ID} creada: datos/tareas/rutina/{ID}-{slug}/"*

## Cómo marcar una rutina como aplicada en un proyecto

> *"he aplicado RUT-001 en bedrock"*

1. Localizar la tarea en `datos/tareas/rutina/`.
2. Eliminar el proyecto de la lista `proyectos:` en el frontmatter.
3. Si la lista `proyectos:` queda vacía → mover la carpeta a `datos/completadas/rutina/` y actualizar `estado: completada`.
4. Confirmar qué proyecto se eliminó y si la tarea quedó completada.

---

## Cómo actualizar una tarea existente

> *"añade información a la tarea BDR-001"* / *"actualiza BDR-001 con..."*

1. Localizar la tarea por ID buscando en `datos/tareas/` y `datos/completadas/`.
2. Editar el cuerpo del `tarea.md` (añadir sección, corregir criterios, etc.).
3. Si cambia la importancia o el estado, actualizar el frontmatter.
4. Confirmar qué se ha cambiado.

---

## Cómo completar una tarea

> *"marca como completada la tarea BDR-001"*

1. Localizar la carpeta de la tarea en `datos/tareas/{proyecto}/{ID}-{slug}/`.
2. Mover la carpeta entera a `datos/completadas/{proyecto}/{ID}-{slug}/`.
3. Actualizar `estado: completada` y añadir `fecha-completada: YYYY-MM-DD` en el frontmatter.
4. Si la tarea tiene el campo `desbloquea`, avisar al usuario: *"Esta tarea desbloquea {ID}: {titulo}"* y preguntar si quiere crear ahora la tarea en el proyecto destino.
5. Confirmar el movimiento.

---

## Ver las tareas pendientes

```bash
npm start
# o
node scripts/list.js
```

Lista agrupada por proyecto, ordenada por importancia.

---

## Listar con Claude

Cuando el usuario pide listar tareas o proyectos, leer todas las carpetas de `datos/tareas/` y mostrar una lista clara en texto. Formatos de respuesta:

### Lista completa
> *"lista las tareas pendientes"* / *"¿qué deberes hay?"*

Mostrar todas las tareas agrupadas por proyecto con formato:

```
BEDROCK
  [BDR-001] Corregir sistema de importación de tipografías — 🟠 alta — 2026-05-25

GENERAL
  [GEN-001] Nombre de la tarea — 🟡 media — 2026-05-20
```

### Por proyecto
> *"tareas de Bedrock"* / *"¿qué hay pendiente en mixes.0057?"*

Filtrar y mostrar solo las del proyecto indicado.

### Por importancia
> *"tareas críticas"* / *"tareas de importancia alta"*

Filtrar por el campo `importancia` del frontmatter.

### Proyectos activos
> *"¿qué proyectos tienen tareas?"* / *"lista los proyectos"*

Listar los nombres de carpeta dentro de `datos/tareas/` que contengan al menos una tarea, con el número de tareas de cada uno.

### Tareas completadas
> *"¿qué se ha completado?"* / *"historial de Bedrock"*

Leer las carpetas dentro de `datos/completadas/` y mostrar de la misma manera.

### Dependencias entre tareas
> *"qué desbloquea PLT-002"* / *"qué tareas tienen dependencias"*

Buscar en todas las tareas el campo `desbloquea` y mostrar las relaciones: qué tarea desbloquea a cuál.
