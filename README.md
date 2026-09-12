# curtatche-site-2026

Site institucional da **Curtatchê** — criação de sites, e-commerce, sistemas e marketing digital.
Produção: [curtatche.com.br](https://curtatche.com.br)

React 19 · Vite 6 · Tailwind CSS 4 · Motion · Lucide · TypeScript

---

## De onde veio este código

O projeto nasceu no Google AI Studio e o código-fonte **nunca chegou a ser versionado**: o
repositório tinha apenas o README do template, o `package-lock.json` e, depois, um `bundle.js`
com o build minificado de 845 KB. Uma atualização feita no AI Studio quebrou o projeto e a
reversão não recuperou a versão boa.

O código aqui foi **reconstruído a partir daquele bundle**, que era um snapshot completo da
versão em produção. Deu para recuperar com fidelidade porque o build preservava todos os
`className` do Tailwind, as estruturas de dados e os 220 textos do site. Os tokens da marca
saíram do CSS compilado.

**Este repositório é agora a única fonte de verdade.** Alterações passam pelo código e pelo git,
não pelo AI Studio.

## Desenvolvimento

```bash
npm ci
npm run dev
```

| Script | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Checagem de tipos + build de produção em `dist/` |
| `npm run preview` | Serve o `dist/` para conferir o build |
| `npm run typecheck` | Só a checagem de tipos |
| `npm run otimiza:imagens` | Regera os WebP do portfólio |
| `npm run gera:og` | Regera a imagem de compartilhamento |

## Estrutura

```
index.html                  título, description, Open Graph, canonical e JSON-LD
src/App.tsx                 composição das seções e estado do carrossel
src/components/             um arquivo por seção
src/data/projetos.ts        os 5 projetos do portfólio
src/data/redes.ts           redes sociais do rodapé (SVG inline) e o número do WhatsApp
src/data/privacidade.ts     texto da Política de Privacidade / LGPD
api/send-email.ts           função serverless que envia o formulário por SMTP
vercel.json                 rewrite de SPA, cabeçalhos de segurança e cache
scripts/                    otimização de imagens e geração da imagem de compartilhamento
```

## Variáveis de ambiente

Copie `.env.example` para `.env` e preencha. Em produção, as mesmas chaves entram como
Environment Variables no projeto da Vercel. **Nunca comite o `.env`.**

Sem essas variáveis, o formulário continua funcionando pelo WhatsApp; só o envio por e-mail
responde que não está disponível.

## Imagens do portfólio

Os originais são prints de página inteira (até 1920×11160) e ficam **fora do git**, em
`assets/portfolio-originais/`, porque somam 25 MB. A altura é intencional: as molduras animam
a rolagem da imagem. Para regerar os WebP:

```bash
npm run otimiza:imagens
```

Pendências conhecidas:

- O print mobile do **NalineLotus** não existe — `naline_cel.png` retornava 404 na origem.
  Enquanto não houver, a moldura de celular mostra o print desktop desse projeto.
- O logo é um JPEG com fundo escuro chapado, o que deixa um retângulo visível sobre o preto
  do site. O ideal é substituir por **SVG ou PNG com transparência**.

## O que mudou em relação à versão anterior

| | Antes | Agora |
|---|---|---|
| Primeiro acesso | 24,9 MB | ~240 KB |
| Imagens | 24,0 MB em PNG | 1,52 MB em WebP |
| JavaScript | 845 KB, servido sem compressão | 418 KB em 3 chunks (~131 KB com gzip) |
| Rolagem horizontal no celular | 478px numa tela de 375px | não existe mais |
| Painel administrativo | no bundle público, senha conferida no navegador | fora do site |
| Open Graph / sitemap / robots | não existiam | presentes |

## Deploy

Vercel, com `curtatche.com.br` apontado para o projeto. Brotli e cache imutável dos assets com
hash vêm por padrão da plataforma; os cabeçalhos de segurança estão no `vercel.json`.

> **Pendente na migração:** hoje `curtatche.com.br` serve apenas um `<iframe>` de tela cheia
> apontando para um deploy no Cloud Run, e o Google não atribui o conteúdo de um iframe ao
> domínio pai — por isso o domínio não tem conteúdo indexável. Ao concluir a migração,
> substituir o `index.html` do Plesk por um redirect 301 e marcar o domínio do Cloud Run como
> `noindex`, para não competir como conteúdo duplicado.
