# Wiki de Estudos

Wiki/documentação pessoal para centralizar estudos (faculdade na UNOESC,
estudos por conta e projetos). Feita com **Nextra v4** + **Next.js (App
Router)** + **TypeScript**, com visual inspirado nas docs do Next.js: sidebar à
esquerda, busca no topo, índice da página à direita e **dark mode por padrão**.

Todo o conteúdo vive em arquivos `.mdx` versionáveis em `content/`, sem banco
de dados (por enquanto).

## Rodar localmente

```bash
npm install
npm run dev      # http://localhost:3000
```

Outros scripts:

```bash
npm run build    # build de produção (gera também o índice de busca Pagefind)
npm run start    # serve o build de produção
```

> A busca (Pagefind) é indexada no `postbuild`. Em `npm run dev` a busca pode
> aparecer vazia; rode `npm run build && npm run start` para testá-la completa.

## Estrutura do projeto

```
app/                       Layout e rota catch-all do Nextra (App Router)
  layout.tsx               Navbar, footer, dark mode, sidebar
  [[...mdxPath]]/page.tsx  Renderiza qualquer página de content/
mdx-components.tsx         Componentes MDX globais + injeção do badge de status
components/
  StatusBadge.tsx          Badge de status (estudo e projeto)
  Callout.tsx              Blocos de destaque (nota/info/dica/aviso/erro)
  CodeBlock.tsx            Bloco de código com rótulo de linguagem
  Dashboard.tsx            Lista páginas por status (usado no Painel e no Início)
lib/
  content.ts               *Camada única de leitura de conteúdo* (ver Portabilidade)
content/                   TODO o conteúdo (.mdx + _meta.ts)
templates/_template.mdx    Modelo para criar páginas novas (fora do build)
materiais-fonte/           (você cria; ignorado no Git/build) PDFs/slides p/ resumir
obsidian-import/           (você cria; ignorado no Git/build) notas do curso.dev
```

## Como adicionar uma página nova

1. Copie `templates/_template.mdx` para dentro de `content/...` com um nome em
   **slug** (sem espaços/acentos), ex: `content/faculdade/terceiro-semestre/nova.mdx`.
2. Preencha o frontmatter (pelo menos `title` e `status`).
3. Para que apareça no menu na ordem certa, adicione o slug no `_meta.ts` da
   pasta. Sem isso a página existe, mas entra no fim do menu em ordem alfabética.
4. Salve, o `npm run dev` recarrega sozinho.

### Sobre o `_meta.ts`

Cada pasta tem um `_meta.ts` que define **ordem** e **rótulos** do menu:

```ts
export default {
  index: 'Visão geral',
  'meu-slug': 'Rótulo bonito no menu'
}
```

## Sistema de status

O status de cada página vem do campo `status` no frontmatter e é renderizado
automaticamente como um **badge colorido no topo** (via `mdx-components.tsx` →
`StatusBadge`).

| Contexto | Valores aceitos                                   |
| -------- | ------------------------------------------------- |
| Estudo   | `A fazer`, `Estudando`, `Concluído`, `Revisar`    |
| Projeto  | `Em andamento`, `Concluído`, `Pausado`, `Ideia`   |

- A **[/painel](http://localhost:3000/painel)** lista sozinha tudo que está
  `Estudando` ou `Revisar`.
- A página **Início** mostra um bloco "Estudando agora".
- Ambos leem o frontmatter via `lib/content.ts`, não há lista manual a manter.

Para mudar o status de uma página, basta editar o campo `status` no frontmatter.

## Componentes MDX disponíveis (sem importar)

```mdx
<StatusBadge status="Estudando" />

<Callout type="dica" title="Atenção">Texto do destaque.</Callout>
<!-- type: nota | info | dica | aviso | erro -->

<CodeBlock language="bash" title="terminal">
npm run dev
</CodeBlock>

<Dashboard statuses={['Estudando', 'Revisar']} />
```

Blocos de código com crase tripla (` ```ts `) têm syntax highlight nativo (Shiki).

## Materiais do 3º semestre e importação do Obsidian

Duas pastas são lidas pelo Claude mas **ficam fora do Git e do build**
(já no `.gitignore`):

- `materiais-fonte/<disciplina>/`, coloque PDFs/slides dos professores do 3º
  semestre. Ao avisar o Claude, ele gera resumo e anotações na página da
  disciplina correspondente.
- `obsidian-import/`, coloque suas notas `.md` do Obsidian (curso.dev). Ao
  avisar, o Claude converte wikilinks, embeds, callouts e frontmatter para o
  formato Nextra e importa em **Estudos por conta → curso.dev**, espelhando a
  estrutura de subpastas.

## Portabilidade futura (banco / autenticação)

O conteúdo é **desacoplado da apresentação**:

- `lib/content.ts` é o **único** lugar que sabe que o conteúdo vem de arquivos.
  A UI (Painel, badges) só consome `getAllPages()` / `getPagesByStatus()` e o
  tipo `PageInfo`.
- Para futuramente editar anotações pelo navegador, basta reimplementar essas
  funções lendo de **Neon/Postgres** ou **Pocketbase**, sem tocar nos
  componentes nem nas páginas.
- O frontmatter é consistente entre páginas (`title`, `status`, `tags`),
  facilitando a migração para colunas de um banco.

Autenticação simples (só para você) pode ser adicionada depois via middleware
do Next sem reescrever o conteúdo.

## Deploy na Vercel

1. Suba o repositório no GitHub.
2. Importe na [Vercel](https://vercel.com/new), ela detecta Next.js sozinha.
3. Sem variáveis de ambiente necessárias. O build (`npm run build`) já roda o
   `postbuild` do Pagefind.

> Ajuste `docsRepositoryBase` em `app/layout.tsx` para a URL real do seu
> repositório (controla o link "Editar esta página").
