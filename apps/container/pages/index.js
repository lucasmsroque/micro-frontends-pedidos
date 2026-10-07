import React, { Suspense, useEffect, useState } from 'react';

// Importa os componentes expostos pelos micros (resolvidos em runtime pelo Module Federation)
const Menu = React.lazy(() => import('menu/Menu'));
const Order = React.lazy(() => import('order/Order'));

// Mensagem exibida enquanto o micro carrega
const Loading = ({ name }) => <p className="status">Carregando {name}…</p>;

// Se um micro estiver fora do ar, mostra aviso em vez de quebrar a página
class MicroBoundary extends React.Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() {
    return this.state.failed
      ? <p className="status">Não foi possível carregar {this.props.name}. Verifique se ele está rodando.</p>
      : this.props.children;
  }
}

export default function Home() {
  // Os micros só são carregados no navegador (evita resolver remotes durante o SSR)
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <>
      <header><h1>Pedidos do restaurante</h1></header>
      <div className="layout">
        <main>
          {mounted && (
            <MicroBoundary name="o cardápio">
              <Suspense fallback={<Loading name="cardápio" />}><Menu /></Suspense>
            </MicroBoundary>
          )}
        </main>
        <div className="side">
          {mounted && (
            <MicroBoundary name="o pedido">
              <Suspense fallback={<Loading name="pedido" />}><Order /></Suspense>
            </MicroBoundary>
          )}
        </div>
      </div>
    </>
  );
}
