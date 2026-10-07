// Micro Cardápio: lista estática de pratos.
// Contrato de comunicação: dispara "order:add" no window com { id, name, price }.
const DISHES = [
  { id: 1, name: 'Moqueca de peixe', description: 'Peixe branco, leite de coco, dendê e pimentões.', price: 54.9 },
  { id: 2, name: 'Baião de dois', description: 'Arroz, feijão-verde, queijo coalho e carne de sol.', price: 38.5 },
  { id: 3, name: 'Feijoada completa', description: 'Feijão preto, carnes defumadas, couve e laranja.', price: 46 },
  { id: 4, name: 'Tapioca de queijo', description: 'Goma crocante recheada com queijo coalho derretido.', price: 16.5 },
  { id: 5, name: 'Cuscuz nordestino', description: 'Cuscuz de milho com ovo, manteiga de garrafa e charque.', price: 22 },
  { id: 6, name: 'Pudim de leite', description: 'Calda de caramelo, receita da casa.', price: 14 },
];

const brl = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

export default function Menu() {
  // Publica o evento para qualquer micro interessado (acoplamento mínimo)
  const addToOrder = ({ id, name, price }) =>
    window.dispatchEvent(new CustomEvent('order:add', { detail: { id, name, price } }));

  return (
    <section aria-label="Cardápio">
      <h2>Cardápio</h2>
      <ul>
        {DISHES.map((d) => (
          <li key={d.id}>
            <div>
              <h3>{d.name}</h3>
              <p>{d.description}</p>
              <strong>{brl(d.price)}</strong>
            </div>
            <button onClick={() => addToOrder(d)}>Adicionar ao pedido</button>
          </li>
        ))}
      </ul>
      <style jsx>{`
        h2 { margin: 0 0 12px; font-size: 1.4rem; }
        ul { list-style: none; margin: 0; padding: 0; display: grid; gap: 12px;
             grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); }
        li { display: flex; flex-direction: column; justify-content: space-between; gap: 12px;
             padding: 16px; background: #fff; border: 1px solid #d5ddd9; border-radius: 6px; }
        h3 { margin: 0 0 4px; font-size: 1.05rem; }
        p { margin: 0 0 8px; color: #55635d; font-size: 0.9rem; }
        button { padding: 10px 12px; border: 0; border-radius: 4px; cursor: pointer;
                 background: #14463a; color: #fff; font-weight: 600; }
        button:hover { background: #0e342b; }
        button:focus-visible { outline: 3px solid #e8b931; outline-offset: 2px; }
      `}</style>
    </section>
  );
}
