import Link from 'next/link'
import { getPagesByStatus, type PageInfo } from '../lib/content'
import { StatusBadge } from './StatusBadge'

/**
 * Painel: lista automaticamente tudo que está marcado como "Estudando" e
 * "Revisar", lendo o frontmatter das páginas (via lib/content.ts).
 *
 * Server Component — roda no build/servidor e lê os arquivos diretamente.
 */
function Section({ status, pages }: { status: string; pages: PageInfo[] }) {
  return (
    <section style={{ marginTop: '2rem' }}>
      <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        <StatusBadge status={status} />
        <span style={{ fontSize: '0.9rem', opacity: 0.6, fontWeight: 400 }}>
          {pages.length} {pages.length === 1 ? 'página' : 'páginas'}
        </span>
      </h2>
      {pages.length === 0 ? (
        <p style={{ opacity: 0.6 }}>Nada por aqui no momento.</p>
      ) : (
        <ul>
          {pages.map((p) => (
            <li key={p.route}>
              <Link href={p.route}>{p.title}</Link>
              {p.tags?.length ? (
                <span style={{ opacity: 0.5, fontSize: '0.8rem' }}>
                  {' '}
                  · {p.tags.join(', ')}
                </span>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export function Dashboard({
  statuses = ['Estudando', 'Revisar']
}: {
  statuses?: string[]
}) {
  return (
    <>
      {statuses.map((status) => (
        <Section
          key={status}
          status={status}
          pages={getPagesByStatus(status)}
        />
      ))}
    </>
  )
}
