import { readFileSync, readdirSync, statSync } from 'fs'
import { join, dirname, relative } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const TAREAS_DIR = join(__dirname, '..', 'datos', 'tareas')

const IMPORTANCIA_ORDER = { critica: 0, alta: 1, media: 2, baja: 3 }
const IMPORTANCIA_LABEL = { critica: '🔴 crítica', alta: '🟠 alta', media: '🟡 media', baja: '🟢 baja' }

const C = {
    reset:   '\x1b[0m',
    bold:    '\x1b[1m',
    dim:     '\x1b[2m',
    red:     '\x1b[31m',
    yellow:  '\x1b[33m',
    cyan:    '\x1b[36m',
    white:   '\x1b[37m',
    grey:    '\x1b[90m',
    magenta: '\x1b[35m',
}

function parseFrontmatter(content) {
    const match = content.replace(/\r\n/g, '\n').match(/^---\n([\s\S]+?)\n---/)
    if (!match) return {}
    const out = {}
    for (const line of match[1].split('\n')) {
        const colon = line.indexOf(':')
        if (colon === -1) continue
        const key = line.slice(0, colon).trim()
        const value = line.slice(colon + 1).trim()
        if (value.startsWith('[') && value.endsWith(']')) {
            out[key] = value.slice(1, -1).split(',').map(s => s.trim()).filter(Boolean)
        } else {
            out[key] = value
        }
    }
    return out
}

function findTasks(dir) {
    const tasks = []
    try {
        for (const entry of readdirSync(dir)) {
            const full = join(dir, entry)
            if (!statSync(full).isDirectory()) continue
            const taskFile = join(full, 'tarea.md')
            try {
                const content = readFileSync(taskFile, 'utf8')
                tasks.push({ ...parseFrontmatter(content), _path: relative(TAREAS_DIR, full) })
            } catch {
                // No tarea.md at this level — go deeper (project folders)
                tasks.push(...findTasks(full))
            }
        }
    } catch { /* dir doesn't exist */ }
    return tasks
}

function groupBy(arr, key) {
    return arr.reduce((acc, item) => {
        const k = item[key] || 'general'
        ;(acc[k] = acc[k] || []).push(item)
        return acc
    }, {})
}

const allTasks = findTasks(TAREAS_DIR).sort((a, b) => {
    const ia = IMPORTANCIA_ORDER[a.importancia] ?? 9
    const ib = IMPORTANCIA_ORDER[b.importancia] ?? 9
    return ia - ib
})

if (allTasks.length === 0) {
    console.log(`\n${C.grey}No hay tareas pendientes.${C.reset}\n`)
    process.exit(0)
}

const rutinaTasks  = allTasks.filter(t => t.proyecto === 'rutina')
const regularTasks = allTasks.filter(t => t.proyecto !== 'rutina')

console.log(`\n${C.bold}${C.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${C.reset}`)
console.log(`${C.bold}${C.white}  LOS DEBERES${C.reset}  ${C.grey}(${allTasks.length} tarea${allTasks.length !== 1 ? 's' : ''} pendiente${allTasks.length !== 1 ? 's' : ''})${C.reset}`)
console.log(`${C.bold}${C.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${C.reset}\n`)

if (rutinaTasks.length > 0) {
    console.log(`${C.bold}${C.magenta}  ◆ RUTINA${C.reset}`)
    for (const t of rutinaTasks) {
        const imp = IMPORTANCIA_LABEL[t.importancia] || t.importancia || '—'
        const proyectos = Array.isArray(t.proyectos) ? t.proyectos.join(', ') : (t.proyectos || 'todos')
        console.log(`${C.grey}  ┌${C.reset} ${C.bold}[${t.id}]${C.reset} ${t.titulo}`)
        console.log(`${C.grey}  │  ${imp}   ${t.fecha || ''}${C.reset}`)
        console.log(`${C.grey}  └  Pendiente en: ${C.reset}${proyectos}`)
    }
    console.log()
}

const byProject = groupBy(regularTasks, 'proyecto')

for (const [proyecto, ptasks] of Object.entries(byProject)) {
    console.log(`${C.bold}${C.yellow}  ${proyecto.toUpperCase()}${C.reset}`)
    for (const t of ptasks) {
        const imp = IMPORTANCIA_LABEL[t.importancia] || t.importancia || '—'
        console.log(`${C.grey}  ┌${C.reset} ${C.bold}[${t.id}]${C.reset} ${t.titulo}`)
        console.log(`${C.grey}  │  ${imp}   ${t.fecha || ''}${C.reset}`)
        console.log(`${C.grey}  └  ${t._path}${C.reset}`)
    }
    console.log()
}
