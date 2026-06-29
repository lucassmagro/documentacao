import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'

export const metadata: Metadata = {
  title: {
    default: 'Wiki de Estudos',
    template: '%s · Wiki de Estudos'
  },
  description:
    'Wiki pessoal de estudos: faculdade (UNOESC), estudos por conta e projetos.'
}

const navbar = <Navbar logo={<b>Wiki de Estudos</b>} />

const footer = (
  <Footer>
    {new Date().getFullYear()} © Wiki de Estudos. Anotações pessoais.
  </Footer>
)

export default async function RootLayout({
  children
}: {
  children: ReactNode
}) {
  return (
    <html lang="pt-BR" dir="ltr" suppressHydrationWarning>
      <Head />
      <body>
        <Layout
          navbar={navbar}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/lucassmagro/documentacao/tree/main"
          editLink="Editar esta página"
          footer={footer}
          sidebar={{ defaultMenuCollapseLevel: 1, toggleButton: true }}
          // Dark mode por padrão, com toggle disponível.
          nextThemes={{ defaultTheme: 'dark' }}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
