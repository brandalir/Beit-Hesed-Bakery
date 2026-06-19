import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Seo from '../components/ui/Seo.jsx';
import { useCart } from '../context/CartContext.jsx';
import { getProductBySlug } from '../services/productService.js';
import { currency } from '../utils/formatters.js';

export default function ProductDetail() {
  const { slug } = useParams();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    getProductBySlug(slug).then(setProduct);
  }, [slug]);

  if (!product) {
    return (
      <section className="page-heading">
        <h1>Producto no encontrado</h1>
        <Link to="/catalogo">Volver al catalogo</Link>
      </section>
    );
  }

  return (
    <>
      <Seo title={product.name} description={product.description} />
      <section className="product-detail">
        <Link className="back-link" to="/catalogo">
          <ArrowLeft size={18} />
          Catalogo
        </Link>
        <img src={product.image_url} alt={product.name} />
        <div className="product-detail__content">
          <p className="eyebrow">{product.category}</p>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <dl className="detail-list">
            <div>
              <dt>Ocasion</dt>
              <dd>{product.occasion}</dd>
            </div>
            <div>
              <dt>Preparacion</dt>
              <dd>{product.prep_time}</dd>
            </div>
            <div>
              <dt>Precio</dt>
              <dd>{currency.format(product.price)}</dd>
            </div>
          </dl>
          <label className="field quantity-field">
            <span>Cantidad</span>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(event) => setQuantity(Number(event.target.value))}
            />
          </label>
          <button className="primary-button" onClick={() => addItem(product, quantity)}>
            <ShoppingBag size={18} />
            Agregar al carrito
          </button>
        </div>
      </section>
    </>
  );
}
