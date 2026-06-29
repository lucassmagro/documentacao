import type { CSSProperties } from 'react'

/**
 * Badge de status reutilizável.
 *
 * Cobre tanto os status de ESTUDO (A fazer, Estudando, Concluído, Revisar)
 * quanto os de PROJETO (Em andamento, Concluído, Pausado, Ideia).
 *
 * É renderizado automaticamente no topo de cada página a partir do campo
 * `status` do frontmatter (ver mdx-components.tsx), mas também pode ser usado
 * manualmente dentro de um .mdx: `<StatusBadge status="Estudando" />`.
 */

type StatusStyle = { bg: string; fg: string; border: string }

const STATUS_STYLES: Record<string, StatusStyle> = {
  // Status de estudo
  'A fazer': { bg: '#3f3f46', fg: '#e4e4e7', border: '#52525b' },
  Estudando: { bg: '#1e3a5f', fg: '#bfdbfe', border: '#3b82f6' },
  Concluído: { bg: '#14532d', fg: '#bbf7d0', border: '#22c55e' },
  Revisar: { bg: '#5c4209', fg: '#fde68a', border: '#f59e0b' },
  // Status de projeto
  'Em andamento': { bg: '#312e81', fg: '#c7d2fe', border: '#6366f1' },
  Pausado: { bg: '#3f3f46', fg: '#d4d4d8', border: '#71717a' },
  Ideia: { bg: '#4a1d52', fg: '#f5d0fe', border: '#c026d3' }
}

const FALLBACK: StatusStyle = { bg: '#3f3f46', fg: '#e4e4e7', border: '#52525b' }

export function StatusBadge({ status }: { status: string }) {
  const style = STATUS_STYLES[status] ?? FALLBACK

  const css: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0.2em 0.7em',
    marginTop: '0.5rem',
    borderRadius: '9999px',
    fontSize: '0.8rem',
    fontWeight: 600,
    lineHeight: 1.4,
    color: style.fg,
    background: style.bg,
    border: `1px solid ${style.border}`
  }

  return (
    <span style={css} data-status={status}>
      {status}
    </span>
  )
}

/** Lista de status válidos, exportada para reuso (painel, validações). */
export const STATUS_ESTUDO = [
  'A fazer',
  'Estudando',
  'Concluído',
  'Revisar'
] as const
export const STATUS_PROJETO = [
  'Em andamento',
  'Concluído',
  'Pausado',
  'Ideia'
] as const
