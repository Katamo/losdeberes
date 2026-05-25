# losdeberes

Gestor de tareas pendientes basado en archivos Markdown, organizado por proyectos. Diseñado para usarse con [Claude Code](https://claude.ai/code).

## Ver tareas en terminal

```bash
npm start
```

Lista todas las tareas pendientes agrupadas por proyecto y ordenadas por importancia.

---

## Uso con Claude Code

### Opción A — desde el propio proyecto

Abre `losdeberes` en Claude Code y usa lenguaje natural directamente:

```
añade una tarea al proyecto Bedrock: revisar el sistema de colores, importancia alta
marca como completada la tarea BDR-001
¿qué tareas hay pendientes del proyecto mixes.0057?
lista los proyectos activos
```

Claude sigue las instrucciones de `CLAUDE.md` para mantener la estructura y el formato.

### Opción B — comando /deberes (recomendado)

Instala el slash command global para poder gestionar tareas desde **cualquier proyecto** abierto en Claude Code, sin necesidad de cambiar de carpeta.

#### Instalación

1. Copia el archivo de comando a tu carpeta global de Claude Code:

```bash
# macOS / Linux
mkdir -p ~/.claude/commands
cp claude-commands/deberes.md ~/.claude/commands/deberes.md

# Windows (PowerShell)
New-Item -ItemType Directory -Force "$env:USERPROFILE\.claude\commands"
Copy-Item "claude-commands\deberes.md" "$env:USERPROFILE\.claude\commands\deberes.md"
```

2. Edita `~/.claude/commands/deberes.md` y ajusta la ruta al proyecto en la primera línea:

```
...ubicado en `/ruta/a/tu/losdeberes`.
```

#### Uso

Una vez instalado, escribe `/deberes` seguido de tu instrucción desde cualquier proyecto:

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

## Estructura de carpetas

```
losdeberes/
├── tareas/
│   ├── general/               ← tareas sin proyecto específico
│   └── {proyecto}/
│       └── {ID}-{slug}/
│           ├── tarea.md       ← descripción principal
│           └── ...            ← archivos adicionales opcionales
├── completadas/               ← misma estructura, tareas terminadas
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

| Proyecto | Prefijo |
|---|---|
| General | GEN |
| Bedrock | BDR |
| mixes.0057 | MIX |
| blog.omata | BLG |
| plantillas | PLT |
| alicates | ALC |

Para nuevos proyectos: 3 primeras letras en mayúsculas.
