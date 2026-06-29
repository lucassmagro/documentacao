import type { CSSProperties, ReactNode } from 'react'

/**
 * Bloco de código com rótulo de linguagem e título opcional.
 *
 * Para syntax highlight completo, use os blocos de código com crase tripla
 * (```ts ... ```), que o Nextra já destaca via Shiki. Este componente é para
 * quando você quer um cabeçalho explícito com a linguagem/arquivo, por exemplo
 * em snippets soltos ou comandos de terminal.
 *
 * Uso em MDX:
 *   <CodeBlock language="bash" title="terminal">
 *   npm run dev
 *   </CodeBlock>
 */
export function CodeBlock({
  language,
  title,
  children
}: {
  language?: string
  title?: string
  children: ReactNode
}) {
  const wrap: CSSProperties = {
    margin: '1.25rem 0',
    borderRadius: '0.5rem',
    border: '1px solid var(--nextra-border, #3f3f46)',
    overflow: 'hidden'
  }
  const header: CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.35rem 0.75rem',
    fontSize: '0.75rem',
    background: 'rgba(127,127,127,0.12)',
    borderBottom: '1px solid var(--nextra-border, #3f3f46)'
  }
  const pre: CSSProperties = {
    margin: 0,
    padding: '0.85rem 1rem',
    overflowX: 'auto',
    fontSize: '0.85rem',
    lineHeight: 1.6
  }

  return (
    <div style={wrap}>
      <div style={header}>
        <span style={{ opacity: 0.8 }}>{title ?? language ?? 'código'}</span>
        {language ? (
          <span
            style={{
              fontFamily: 'monospace',
              opacity: 0.7,
              textTransform: 'lowercase'
            }}
          >
            {language}
          </span>
        ) : null}
      </div>
      <pre style={pre}>
        <code>{children}</code>
      </pre>
    </div>
  )
}
