# losdeberes

Gestor de tareas pendientes basado en archivos Markdown, organizado por proyectos. Diseñado para usarse con [Claude Code](https://claude.ai/code).

---

## Instalación

**1. Clona el repositorio** en una carpeta de tu máquina:

```bash
git clone https://github.com/Katamo/losdeberes.git
cd losdeberes
npm install
```

**2. Crea la carpeta de datos** donde vivirán tus tareas:

```bash
mkdir -p datos/tareas datos/completadas
```

> Si quieres guardar tus tareas en un repo privado de Git, clónalo en `datos/` en lugar del paso anterior:
> ```bash
> git clone https://github.com/tu-usuario/tu-repo-privado.git datos
> ```

**3. Anota la ruta absoluta** a la carpeta `losdeberes` en tu máquina. La necesitarás en el paso siguiente:

```
# Ejemplos:
/Users/tunombre/proyectos/losdeberes      ← macOS / Linux
C:\Users\tunombre\proyectos\losdeberes    ← Windows
```

**4. Instala los slash commands** copiando las plantillas a tu carpeta global de Claude Code y sustituyendo `/ruta/a/losdeberes` por la ruta del paso anterior:

```bash
# macOS / Linux
mkdir -p ~/.claude/commands
cp claude-commands/deberes.md ~/.claude/commands/deberes.md
cp claude-commands/tarea.md ~/.claude/commands/tarea.md
```

```powershell
# Windows (PowerShell)
New-Item -ItemType Directory -Force "$env:USERPROFILE\.claude\commands"
Copy-Item "claude-commands\deberes.md" "$env:USERPROFILE\.claude\commands\deberes.md"
Copy-Item "claude-commands\tarea.md"   "$env:USERPROFILE\.claude\commands\tarea.md"
```

Abre los dos archivos copiados y reemplaza `/ruta/a/losdeberes` por tu ruta real. Esto es imprescindible — sin este cambio los comandos no funcionarán.

---

## Uso con Claude Code

### Desde el propio proyecto

Abre la carpeta `losdeberes` en Claude Code y usa lenguaje natural directamente:

```
añade una tarea al proyecto Bedrock: revisar el sistema de colores, importancia alta
marca como completada la tarea BDR-001
¿qué tareas hay pendientes del proyecto Bedrock?
lista los proyectos activos
```

### Comando /deberes (recomendado)

Gestiona tareas desde **cualquier proyecto** abierto en Claude Code, sin cambiar de carpeta.

```
/deberes añade una tarea al proyecto Bedrock: revisar tipografías, importancia alta
/deberes marca como completada BDR-001
/deberes lista las tareas pendientes
/deberes tareas de Bedrock
/deberes tareas críticas
/deberes ¿qué proyectos tienen tareas?
/deberes ¿qué se ha completado?
```

### Comando /tarea

Carga una tarea concreta y analiza cómo implementarla en el proyecto que tienes abierto en ese momento.

```
/tarea BDR-001
/tarea MIX-001
```

Claude leerá la tarea, mostrará un resumen y analizará cómo abordar cada criterio en el contexto del proyecto actual.

---

## Ver tareas en terminal

```bash
npm start
```

Lista todas las tareas pendientes agrupadas por proyecto y ordenadas por importancia. Las tareas de rutina (transversales a varios proyectos) aparecen primero.

---

## Estructura de carpetas

```
losdeberes/
├── datos/                         ← no incluido en git; gestiona tú este repo
│   ├── tareas/
│   │   ├── general/               ← tareas sin proyecto específico
│   │   ├── rutina/                ← tareas transversales a varios proyectos
│   │   └── {proyecto}/
│   │       └── {ID}-{slug}/
│   │           ├── tarea.md       ← descripción principal
│   │           └── ...
│   └── completadas/               ← misma estructura, tareas terminadas
├── claude-commands/
│   ├── deberes.md                 ← plantilla del comando /deberes
│   └── tarea.md                  ← plantilla del comando /tarea
├── scripts/
│   └── list.js                    ← script de listado en terminal
├── CLAUDE.md                      ← instrucciones para Claude
└── README.md
```

---

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

## Criterios / pasos
- Paso 1
- Paso 2
```

| importancia | cuándo |
|---|---|
| `critica` | bloquea algo en producción |
| `alta` | importante, abordar pronto |
| `media` | relevante pero no urgente |
| `baja` | nice-to-have |

### Tareas de rutina

Las tareas de rutina son tareas transversales que deben aplicarse en varios proyectos. Viven en `datos/tareas/rutina/` y aparecen al inicio del listado, antes del resto.

Se identifican porque tienen el campo `proyectos` con la lista de proyectos donde aún está pendiente. Cuando la completas en un proyecto, eliminas ese proyecto de la lista. Cuando la lista queda vacía, la tarea se mueve a completadas.

```
/deberes añade una rutina: configurar prettier en bedrock, mixes.0057 y plantillas
/deberes he aplicado RUT-001 en bedrock
```

### Tareas vinculadas

El campo `desbloquea` permite vincular dos tareas de proyectos distintos cuando una depende de que la otra esté terminada.

```markdown
---
id: PLT-003
titulo: Componente tabla ordenable
proyecto: plantillas
desbloquea: MIG-007
---
```

Cuando completas PLT-003, Claude te avisa: *"Esta tarea desbloquea MIG-007"* y te pregunta si quieres empezar con ella ahora. Puedes crear la tarea destino desde el principio o en el momento de completar la origen.

```
/deberes añade tarea a plantillas: componente tabla ordenable,
         que al terminar desbloquea una tarea en migas para integrarlo
/deberes completa PLT-003
→ Esta tarea desbloquea MIG-007 (Integrar tabla ordenable de plantillas). ¿La empezamos?
```

---

## Prefijos de proyecto

El ID de cada tarea es un prefijo de 3 letras + número secuencial (`BDR-001`, `GEN-002`…). Para nuevos proyectos usa las 3 primeras letras en mayúsculas.

| Proyecto | Prefijo |
|---|---|
| General | GEN |
| MiProyecto | MIP |
| OtroProyecto | OTR |

Personaliza esta tabla en tu `CLAUDE.md` con tus propios proyectos.
