import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

/**
 * Camada de leitura de conteúdo.
 *
 * IMPORTANTE (portabilidade): este é o ÚNICO lugar que conhece a origem do
 * conteúdo (arquivos .mdx em /content). A UI (Painel, badges) consome apenas
 * as funções abaixo e os tipos `PageInfo`. No futuro, para editar anotações
 * pelo navegador, basta reimplementar estas funções lendo de um banco
 * (Neon/Postgres ou Pocketbase), sem tocar nos componentes nem nas páginas.
 */

const CONTENT_DIR = path.join(process.cwd(), 'content')

export type StatusEstudo = 'A fazer' | 'Estudando' | 'Concluído' | 'Revisar'
export type StatusProjeto = 'Em andamento' | 'Concluído' | 'Pausado' | 'Ideia'
export type Status = StatusEstudo | StatusProjeto

export interface PageInfo {
  /** Rota do site, ex: "/faculdade/terceiro-semestre/banco-de-dados-i". */
  route: string
  /** Título (frontmatter `title` ou, em fallback, o slug). */
  title: string
  /** Status do frontmatter, se houver. */
  status?: string
  /** Tags do frontmatter, se houver. */
  tags?: string[]
  description?: string
  /** Frontmatter cru, para casos avançados. */
  frontmatter: Record<string, unknown>
}

function walk(dir: string, acc: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('_')) continue // ignora _meta.* e privados
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      walk(full, acc)
    } else if (/\.mdx?$/.test(entry.name)) {
      acc.push(full)
    }
  }
  return acc
}

function fileToRoute(filePath: string): string {
  let rel = path.relative(CONTENT_DIR, filePath).replace(/\\/g, '/')
  rel = rel.replace(/\.mdx?$/, '').replace(/\/index$/, '')
  if (rel === 'index') return '/'
  return '/' + rel
}

function slugToTitle(route: string): string {
  const last = route.split('/').filter(Boolean).pop() ?? 'Início'
  return last.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

/** Lê todas as páginas e seu frontmatter. */
export function getAllPages(): PageInfo[] {
  if (!fs.existsSync(CONTENT_DIR)) return []
  return walk(CONTENT_DIR)
    .map((file) => {
      const raw = fs.readFileSync(file, 'utf8')
      const { data } = matter(raw)
      const route = fileToRoute(file)
      return {
        route,
        title: (data.title as string) ?? slugToTitle(route),
        status: data.status as string | undefined,
        tags: data.tags as string[] | undefined,
        description: data.description as string | undefined,
        frontmatter: data
      }
    })
    .sort((a, b) => a.route.localeCompare(b.route))
}

/** Filtra páginas por um ou mais status (ex: "Estudando", "Revisar"). */
export function getPagesByStatus(...statuses: string[]): PageInfo[] {
  const set = new Set(statuses)
  return getAllPages().filter((p) => p.status && set.has(p.status))
}

/** Agrupa todas as páginas pelo valor de `status`. */
export function getPagesGroupedByStatus(): Record<string, PageInfo[]> {
  const out: Record<string, PageInfo[]> = {}
  for (const p of getAllPages()) {
    if (!p.status) continue
    ;(out[p.status] ??= []).push(p)
  }
  return out
}
