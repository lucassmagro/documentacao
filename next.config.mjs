import nextra from 'nextra'

// Configuração do Nextra v4. O tema (navbar, footer, dark mode) é definido
// em app/layout.tsx — aqui ficam só as opções de build/conteúdo.
const withNextra = nextra({
  defaultShowCopyCode: true,
  search: {
    codeblocks: false
  }
})

export default withNextra({
  reactStrictMode: true
})
