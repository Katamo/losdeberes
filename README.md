# losdeberes

Gestor de tareas pendientes basado en archivos Markdown, organizado por proyectos. Diseñado para usarse con [Claude Code](https://claude.ai/code).

## Instalación

```bash
git clone https://github.com/Katamo/losdeberes.git
cd losdeberes
npm install
```

Crea la carpeta donde vivirán tus tareas:

```bash
mkdir -p datos/tareas datos/completadas
```

> Si quieres tener tus tareas en un repo privado de Git, puedes usar un submodulo:
> ```bash
> git submodule add https://github.com/tu-usuario/tu-repo-privado.git datos
> ```

---

## Uso con Claude Code

### Opción A — desde el propio proyecto

Abre `losdeberes` en Claude Code y usa lenguaje natural directamente:

```
añade una tarea al proyecto Bedrock: revisar el sistema de colores, importancia alta
marca como completada la tarea BDR-001
¿qué tareas hay pendientes del proyecto Bedrock?
lista los proyectos activos
```

Claude sigue las instrucciones de `CLAUDE.md` para mantener la estructura y el formato.

### Opción B — comando /deberes (recomendado)

Instala el slash command global para gestionar tareas desde **cualquier proyecto** abierto en Claude Code, sin cambiar de carpeta.

**1. Copia el archivo de comando:**

```bash
# macOS / Linux
mkdir -p ~/.claude/commands
cp claude-commands/deberes.md ~/.claude/commands/deberes.md

# Windows (PowerShell)
New-Item -ItemType Directory -Force "$env:USERPROFILE\.claude\commands"
Copy-Item "claude-commands\deberes.md" "$env:USERPROFILE\.claude\commands\deberes.md"
```

**2. Edita `~/.claude/commands/deberes.md`** y ajusta la ruta al proyecto en la primera línea:

```
...ubicado en `/ruta/a/tu/losdeberes`.
```

**Uso:**

```
/deberes añade una tarea al proyecto Bedrock: revisar tipografías, importancia alta
/deberes marca como completada BDR-001
/deberes lista las tareas pendientes
/deberes tareas de Bedrock
/deberes tareas críticas
/deberes ¿qué proyectos tienen tareas?
/deberes ¿qué se ha completado?
```

---

## Ver tareas en terminal

```bash
npm start
```

Lista todas las tareas pendientes agrupadas por proyecto y ordenadas por importancia.

---

## Estructura de carpetas

```
losdeberes/
├── datos/
│   ├── tareas/
│   │   ├── general/           ← tareas sin proyecto específico
│   │   └── {proyecto}/
│   │       └── {ID}-{slug}/
│   │           ├── tarea.md   ← descripción principal
│   │           └── ...        ← archivos adicionales opcionales
│   └── completadas/           ← misma estructura, tareas terminadas
├── claude-commands/
│   └── deberes.md             ← plantilla del slash command
├── scripts/
│   └── list.js                ← script de listado en terminal
├── CLAUDE.md                  ← instrucciones para Claude
└── README.md
```

## Formato de una tarea

```markdown
---
id: BDR-001
titulo: Título de la tarea
proyecto: Bedrock
fecha: 2026-05-25
importancia: alta
estado: pendiente
---

## Descripción
...
```

| importancia | cuándo |
|---|---|
| `critica` | bloquea algo en producción |
| `alta` | importante, abordar pronto |
| `media` | relevante pero no urgente |
| `baja` | nice-to-have |

---

## Prefijos de proyecto

El ID de cada tarea se compone de un prefijo de 3 letras + número secuencial (`WEB-001`, `GEN-002`…). Para nuevos proyectos usa las 3 primeras letras en mayúsculas.

| Proyecto | Prefijo |
|---|---|
| General | GEN |
| MiProyecto | MIP |
| OtroProyecto | OTR |

Personaliza esta tabla en tu `CLAUDE.md` con tus propios proyectos.
