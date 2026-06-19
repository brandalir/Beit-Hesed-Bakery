import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../../context/CartContext.jsx';
import { currency } from '../../utils/formatters.js';

export default function CartItem({ item }) {
  const { removeItem, updateQuantity } = useCart();

  return (
    <article className="cart-item">
      <img src={item.image_url} alt={item.name} />
      <div>
        <h3>{item.name}</h3>
        <p>{item.category}</p>
        <strong>{currency.format(item.price)}</strong>
      </div>
      <div className="quantity-control" aria-label={`Cantidad de ${item.name}`}>
        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label="Disminuir cantidad">
          <Minus size={16} />
        </button>
        <span>{item.quantity}</span>
        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label="Aumentar cantidad">
          <Plus size={16} />
        </button>
      </div>
      <button className="icon-button" onClick={() => removeItem(item.id)} aria-label={`Eliminar ${item.name}`}>
        <Trash2 size={18} />
      </button>
    </article>
  );
}
