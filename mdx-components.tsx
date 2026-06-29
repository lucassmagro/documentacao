import { useMDXComponents as getDocsMDXComponents } from 'nextra-theme-docs'
import { StatusBadge } from './components/StatusBadge'
import { Callout } from './components/Callout'
import { CodeBlock } from './components/CodeBlock'
import { Dashboard } from './components/Dashboard'

const docsComponents = getDocsMDXComponents()

/**
 * Componentes MDX globais.
 *
 * - Disponibiliza <StatusBadge>, <Callout>, <CodeBlock> e <Dashboard> em
 *   qualquer arquivo .mdx sem precisar importar.
 * - Sobrescreve o `wrapper` para injetar automaticamente o badge de status
 *   no topo de toda página que tenha `status` no frontmatter.
 */
export function useMDXComponents(components?: Record<string, unknown>) {
  return {
    ...docsComponents,
    StatusBadge,
    Callout,
    CodeBlock,
    Dashboard,
    wrapper(props: {
      metadata?: Record<string, unknown>
      children?: React.ReactNode
      [key: string]: unknown
    }) {
      const DocsWrapper =
        docsComponents.wrapper as React.ComponentType<Record<string, unknown>>
      const status =
        typeof props.metadata?.status === 'string'
          ? props.metadata.status
          : undefined
      return (
        <DocsWrapper {...props}>
          {status ? <StatusBadge status={status} /> : null}
          {props.children}
        </DocsWrapper>
      )
    },
    ...components
  }
}
