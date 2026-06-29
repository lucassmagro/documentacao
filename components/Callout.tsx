import type { CSSProperties, ReactNode } from 'react'

/**
 * Callout reutilizável (bloco de destaque).
 *
 * Tipos suportados: 'nota' | 'aviso' | 'dica' | 'info' | 'erro'.
 * É também o componente-alvo para a conversão dos callouts do Obsidian
 * (`> [!note]`, `> [!warning]`, `> [!tip]`, etc.) durante a importação.
 *
 * Uso em MDX:
 *   <Callout type="dica" title="Atenção">Conteúdo aqui.</Callout>
 */

type CalloutType = 'nota' | 'aviso' | 'dica' | 'info' | 'erro'

const TYPES: Record<CalloutType, { border: string; bg: string; label: string }> = {
  nota: { border: '#71717a', bg: 'rgba(113,113,122,0.12)', label: 'Nota' },
  info: { border: '#3b82f6', bg: 'rgba(59,130,246,0.12)', label: 'Info' },
  dica: { border: '#22c55e', bg: 'rgba(34,197,94,0.12)', label: 'Dica' },
  aviso: { border: '#f59e0b', bg: 'rgba(245,158,11,0.12)', label: 'Aviso' },
  erro: { border: '#ef4444', bg: 'rgba(239,68,68,0.12)', label: 'Erro' }
}

export function Callout({
  type = 'nota',
  title,
  children
}: {
  type?: CalloutType
  title?: string
  children: ReactNode
}) {
  const t = TYPES[type] ?? TYPES.nota

  const box: CSSProperties = {
    margin: '1.25rem 0',
    padding: '0.9rem 1rem',
    borderRadius: '0.5rem',
    borderInlineStart: `3px solid ${t.border}`,
    background: t.bg
  }

  return (
    <div style={box} role="note">
      <div style={{ fontWeight: 600, marginBottom: title ? '0.25rem' : 0 }}>
        {title ?? t.label}
      </div>
      <div style={{ margin: 0 }}>{children}</div>
    </div>
  )
}
