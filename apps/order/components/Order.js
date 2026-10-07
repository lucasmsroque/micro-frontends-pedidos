import { useEffect, useState } from 'react';

// Micro Pedido: escuta "order:add" no window e mantém a lista de itens.
const brl = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

export default function Order() {
  const [items, setItems] = useState([]); // [{ id, name, price, qty }]

  useEffect(() => {
    const onAdd = (e) => {
      const dish = e.detail;
      setItems((prev) => {
        const found = prev.find((i) => i.id === dish.id);
        return found
          ? prev.map((i) => (i.id === dish.id ? { ...i, qty: i.qty + 1 } : i))
          : [...prev, { ...dish, qty: 1 }];
      });
    };
    window.addEventListener('order:add', onAdd);
    return () => window.removeEventListener('order:add', onAdd); // evita vazamento
  }, []);

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <aside aria-label="Seu pedido">
      <h2>Seu pedido</h2>
      {items.length === 0 ? (
        <p className="empty">Nenhum prato ainda. Escolha algo no cardápio.</p>
      ) : (
        <>
          <ul>
            {items.map((i) => (
              <li key={i.id}>
                <span>{i.qty}× {i.name}</span>
                <span>{brl(i.price * i.qty)}</span>
              </li>
            ))}
          </ul>
          <p className="total"><span>Total</span><strong>{brl(total)}</strong></p>
          <button onClick={() => setItems([])}>Limpar pedido</button>
        </>
      )}
      <style jsx>{`
        aside { padding: 16px; background: #fff; border: 2px solid #14463a; border-radius: 6px; }
        h2 { margin: 0 0 12px; font-size: 1.4rem; }
        ul { list-style: none; margin: 0; padding: 0; }
        li, .total { display: flex; justify-content: space-between; gap: 8px; padding: 8px 0;
                     border-bottom: 1px solid #e3e9e6; }
        .total { border: 0; font-size: 1.1rem; }
        .empty { color: #55635d; margin: 0; }
        button { width: 100%; padding: 10px; border: 1px solid #14463a; border-radius: 4px;
                 background: transparent; color: #14463a; font-weight: 600; cursor: pointer; }
        button:focus-visible { outline: 3px solid #e8b931; outline-offset: 2px; }
      `}</style>
    </aside>
  );
}
