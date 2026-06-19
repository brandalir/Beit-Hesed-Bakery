import { Clock, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext.jsx';
import { currency } from '../../utils/formatters.js';

export default function ProductCard({ product }) {
  const { addItem } = useCart();

  return (
    <article className="product-card">
      <Link to={`/catalogo/${product.slug}`} className="product-card__image">
        <img src={product.image_url} alt={product.name} loading="lazy" />
      </Link>
      <div className="product-card__body">
        <div>
          <p className="eyebrow">{product.category}</p>
          <h3>
            <Link to={`/catalogo/${product.slug}`}>{product.name}</Link>
          </h3>
          <p>{product.description}</p>
        </div>
        <div className="product-card__meta">
          <span>
            <Clock size={16} />
            {product.prep_time}
          </span>
          <strong>{currency.format(product.price)}</strong>
        </div>
        <button
          className="primary-button"
          onClick={() => addItem(product, 1)}
          disabled={!product.is_available}
        >
          <ShoppingBag size={18} />
          {product.is_available ? 'Agregar' : 'Agotado'}
        </button>
      </div>
    </article>
  );
}
