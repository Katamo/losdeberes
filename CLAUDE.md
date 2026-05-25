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
---

## Descripción

Texto libre explicando qué hay que hacer y por qué.

## Criterios / pasos

- Paso o criterio 1
- Paso o criterio 2
```

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
4. Confirmar el movimiento.

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
