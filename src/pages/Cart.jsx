import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import CartItem from '../components/cart/CartItem.jsx';
import EmptyState from '../components/ui/EmptyState.jsx';
import Seo from '../components/ui/Seo.jsx';
import { useCart } from '../context/CartContext.jsx';
import { currency } from '../utils/formatters.js';

export default function Cart() {
  const { items, total } = useCart();

  return (
    <>
      <Seo title="Carrito" />
      <section className="page-heading">
        <p className="eyebrow">Carrito</p>
        <h1>Tu pedido</h1>
      </section>

      {!items.length ? (
        <EmptyState
          title="Tu carrito esta vacio"
          text="Agrega productos del catalogo para preparar tu pedido."
          action={<Link className="primary-button" to="/catalogo">Ver catalogo</Link>}
        />
      ) : (
        <section className="cart-layout">
          <div className="cart-list">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          <aside className="summary-box">
            <h2>Resumen</h2>
            <div>
              <span>Subtotal</span>
              <strong>{currency.format(total)}</strong>
            </div>
            <p>El costo de envio o retiro se confirma segun fecha y direccion.</p>
            <Link className="primary-button" to="/pedido">
              Continuar
              <ArrowRight size={18} />
            </Link>
          </aside>
        </section>
      )}
    </>
  );
}
