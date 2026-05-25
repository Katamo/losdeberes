# losdeberes — instrucciones para Claude

Este proyecto es un gestor de tareas basado en archivos Markdown. Cada tarea vive en su propia carpeta dentro de `tareas/{proyecto}/{ID}-{slug}/`.

---

## Estructura de carpetas

```
losdeberes/
├── tareas/
│   ├── general/               ← tareas sin proyecto específico
│   └── {proyecto}/            ← una carpeta por proyecto
│       └── {ID}-{slug}/       ← una carpeta por tarea
│           ├── tarea.md       ← descripción principal (obligatorio)
│           └── *.md / *.png   ← archivos adicionales opcionales
└── completadas/               ← misma estructura; tareas terminadas
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
| Bedrock | BDR |
| General | GEN |
| mixes.0057 | MIX |
| blog.omata | BLG |
| plantillas | PLT |
| alicates | ALC |
| (nuevo proyecto) | 3 primeras letras en mayúsculas |

Para calcular el siguiente número: revisar todas las carpetas en `tareas/{proyecto}/` **y** `completadas/{proyecto}/` y usar el número más alto + 1.

---

## Cómo añadir una tarea nueva

> Comando de ejemplo al usuario: *"añade una tarea al proyecto Bedrock: revisar el sistema de colores"*

1. Determinar el proyecto. Si no se indica → `general`.
2. Calcular el siguiente ID (ver regla de prefijo + secuencial).
3. Crear el slug: título en minúsculas, palabras separadas por guiones, sin acentos ni caracteres especiales.
4. Crear la carpeta: `tareas/{proyecto}/{ID}-{slug}/`
5. Crear `tarea.md` con el frontmatter completo y una descripción clara.
6. Confirmar: *"Tarea {ID} creada: tareas/{proyecto}/{ID}-{slug}/"*

---

## Cómo actualizar una tarea existente

> *"añade información a la tarea BDR-001"* / *"actualiza BDR-001 con..."*

1. Localizar la tarea por ID buscando en `tareas/` y `completadas/`.
2. Editar el cuerpo del `tarea.md` (añadir sección, corregir criterios, etc.).
3. Si cambia la importancia o el estado, actualizar el frontmatter.
4. Confirmar qué se ha cambiado.

---

## Cómo completar una tarea

> *"marca como completada la tarea BDR-001"*

1. Localizar la carpeta de la tarea en `tareas/{proyecto}/{ID}-{slug}/`.
2. Mover la carpeta entera a `completadas/{proyecto}/{ID}-{slug}/`.
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
