import { readFileSync, readdirSync, statSync } from 'fs'
import { join, dirname, relative } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const TAREAS_DIR = join(__dirname, '..', 'tareas')

const IMPORTANCIA_ORDER = { critica: 0, alta: 1, media: 2, baja: 3 }
const IMPORTANCIA_LABEL = { critica: '🔴 crítica', alta: '🟠 alta', media: '🟡 media', baja: '🟢 baja' }

const C = {
    reset:  '\x1b[0m',
    bold:   '\x1b[1m',
    dim:    '\x1b[2m',
    red:    '\x1b[31m',
    yellow: '\x1b[33m',
    cyan:   '\x1b[36m',
    white:  '\x1b[37m',
    grey:   '\x1b[90m',
}

function parseFrontmatter(content) {
    const match = content.match(/^---\n([\s\S]+?)\n---/)
    if (!match) return {}
    const out = {}
    for (const line of match[1].split('\n')) {
        const colon = line.indexOf(':')
        if (colon === -1) continue
        out[line.slice(0, colon).trim()] = line.slice(colon + 1).trim()
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

const tasks = findTasks(TAREAS_DIR).sort((a, b) => {
    const ia = IMPORTANCIA_ORDER[a.importancia] ?? 9
    const ib = IMPORTANCIA_ORDER[b.importancia] ?? 9
    return ia - ib
})

if (tasks.length === 0) {
    console.log(`\n${C.grey}No hay tareas pendientes.${C.reset}\n`)
    process.exit(0)
}

const byProject = groupBy(tasks, 'proyecto')

console.log(`\n${C.bold}${C.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${C.reset}`)
console.log(`${C.bold}${C.white}  LOS DEBERES${C.reset}  ${C.grey}(${tasks.length} tarea${tasks.length !== 1 ? 's' : ''} pendiente${tasks.length !== 1 ? 's' : ''})${C.reset}`)
console.log(`${C.bold}${C.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${C.reset}\n`)

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
