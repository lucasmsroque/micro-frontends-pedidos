import Order from '../components/Order';

// Execução isolada: o botão simula o evento que o Cardápio dispararia
export default function Home() {
  const fake = () =>
    window.dispatchEvent(new CustomEvent('order:add', { detail: { id: 99, name: 'Prato de teste', price: 10 } }));
  return (
    <main style={{ padding: 16, maxWidth: 420, fontFamily: 'system-ui, sans-serif' }}>
      <button onClick={fake} style={{ marginBottom: 12 }}>Simular evento order:add</button>
      <Order />
    </main>
  );
}
