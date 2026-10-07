# Micro Frontends: Sistema de Pedidos

Monorepo com três apps **Next.js 14 (Pages Router)** integrados por **Webpack Module Federation** (`@module-federation/nextjs-mf`).

| App | Porta | Papel |
|---|---|---|
| `apps/container` | 3000 | Aplicação principal; consome os dois micros com `React.lazy` + `Suspense` |
| `apps/menu` | 3001 | Micro Cardápio; expõe `./Menu` |
| `apps/order` | 3002 | Micro Pedido; expõe `./Order` |

```
apps/<app>/
  components/     componente exposto (micros)
  pages/          páginas do Next (nos micros, só para rodar isolado)
  next.config.js  configuração do Module Federation
```

## Como rodar

Requisitos: Node 18+.

```bash
npm install          # na raiz, instala os três apps
npm run dev          # sobe os três juntos (container em http://localhost:3000)
```

Cada app isolado (teste individual antes de integrar):

```bash
npm run dev:menu       # http://localhost:3001 (cardápio sozinho)
npm run dev:order      # http://localhost:3002 (pedido sozinho, com botão que simula o evento)
npm run dev:container  # http://localhost:3000
```

Se o container abrir antes de um micro, recarregue a página. Se um micro estiver fora do ar, o container mostra um aviso no lugar dele.

## Como funciona a comunicação

Os micros não importam um ao outro. Eles conversam por um evento global no `window`:

1. O usuário clica em **Adicionar ao pedido** no Cardápio.
2. O Cardápio executa `window.dispatchEvent(new CustomEvent('order:add', { detail: { id, name, price } }))`.
3. O Pedido registra `window.addEventListener('order:add', ...)` num `useEffect`, soma a quantidade do prato e recalcula o total.

O nome `order:add` e o formato de `detail` são o contrato entre os micros. Sem dependência de código, cada time publica o seu micro sem travar o outro.

## Decisões

- Os remotes carregam só no cliente (`mounted` no container), pois o foco é a arquitetura e não SSR federado.
- Estilos via `styled-jsx` dentro dos componentes: viajam junto com o JS exposto, sem depender de CSS externo do remote.
- `NEXT_PRIVATE_LOCAL_WEBPACK=true` é exigido pelo plugin; `cross-env` mantém os scripts funcionando no Windows.
- Em outros ambientes, defina `MENU_URL` e `ORDER_URL` no container.
