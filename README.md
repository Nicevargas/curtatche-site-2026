# curtatche-site-2026

Site institucional da **Curtatchê** — criação de sites, e-commerce, sistemas e marketing digital.
Produção: [curtatche.com.br](https://curtatche.com.br)

Stack: React 19 · Vite 6 · Tailwind CSS 4 · Motion · Lucide.
O projeto nasceu no Google AI Studio; este repositório é a fonte de verdade do código.

---

## Estado atual

O código da aplicação (`package.json`, `index.html`, componentes) **ainda não está neste
repositório** — vem do push do AI Studio. O que já está versionado é a infraestrutura da Fase 1:

| Arquivo | Para que serve |
|---|---|
| `vercel.json` | Build, rewrite de SPA, cabeçalhos de segurança e cache imutável dos assets |
| `public/portfolio/*.webp` | Prints do portfólio otimizados: 24,0 MB → 1,52 MB (−93,7%) |
| `public/og-image.jpg` | Imagem de compartilhamento 1200×630 (hoje o link não gera preview) |
| `public/robots.txt`, `public/sitemap.xml` | Hoje dão 404 em produção |
| `public/favicon.png` | Passa a ser servido pelo próprio domínio |
| `docs/fase1-index-head.html` | Bloco de `<head>` com Open Graph, canonical e JSON-LD, pronto para aplicar |
| `scripts/optimize-images.py` | Regera os WebP a partir dos originais |
| `scripts/gerar-og-image.py` | Regera a imagem de compartilhamento |

---

## Desenvolvimento

```bash
npm ci
npm run dev
```

Build de produção e conferência local:

```bash
npm run build && npx vite preview
```

## Variáveis de ambiente

Copie `.env.example` para `.env` e preencha. Em produção, cadastre as mesmas chaves como
Environment Variables no projeto da Vercel. **Nunca comite o `.env`.**

## Imagens do portfólio

Os originais são prints de página inteira (até 1920×11160) e ficam **fora do git**, em
`assets/portfolio-originais/` (ver `.gitignore`), porque somam 25 MB. A altura é intencional:
as molduras de notebook e celular animam a rolagem da imagem. Para regerar os WebP:

```bash
python scripts/optimize-images.py
```

Pendências conhecidas das imagens:

- O print mobile do **NalineLotus** não existe — `naline_cel.png` retorna 404 na origem.
- O logo é um JPEG com fundo escuro chapado, o que faz aparecer um retângulo sobre o fundo
  preto do site. O ideal é substituir por **SVG ou PNG com transparência**. Enquanto isso,
  `scripts/gerar-og-image.py` contorna o problema compondo o logo com blend *lighten*.

## Deploy

Vercel, com `curtatche.com.br` apontado para o projeto. Brotli e cache imutável dos assets
com hash vêm por padrão da plataforma.

> **Importante:** até a migração, `curtatche.com.br` serve apenas um `<iframe>` de tela cheia
> apontando para um deploy no Cloud Run. O Google não atribui o conteúdo de um iframe ao
> domínio pai, então hoje o domínio não tem conteúdo indexável. Ao concluir a migração,
> substituir o `index.html` do Plesk por um redirect 301 e marcar o domínio do Cloud Run
> como `noindex`, para não competir como conteúdo duplicado.
