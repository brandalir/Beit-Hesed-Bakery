import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Seo from '../components/ui/Seo.jsx';
import { useCart } from '../context/CartContext.jsx';
import { createOrder } from '../services/orderService.js';
import { currency } from '../utils/formatters.js';

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    delivery_date: '',
    delivery_type: 'retiro',
    address: '',
    notes: '',
  });

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const order = await createOrder({
        ...form,
        items: items.map(({ id, name, price, quantity }) => ({ id, name, price, quantity })),
        total,
      });
      clearCart();
      navigate('/pedido/confirmado', { state: { orderId: order.id } });
    } catch (caughtError) {
      setError(caughtError.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Seo title="Finalizar pedido" />
      <section className="page-heading">
        <p className="eyebrow">Pedido</p>
        <h1>Confirma tus datos</h1>
        <p>Te contactaremos para confirmar detalles finales de entrega y pago.</p>
      </section>

      <section className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <label className="field">
              <span>Nombre completo</span>
              <input value={form.customer_name} onChange={(event) => updateField('customer_name', event.target.value)} required />
            </label>
            <label className="field">
              <span>Email</span>
              <input type="email" value={form.customer_email} onChange={(event) => updateField('customer_email', event.target.value)} required />
            </label>
            <label className="field">
              <span>Telefono</span>
              <input value={form.customer_phone} onChange={(event) => updateField('customer_phone', event.target.value)} required />
            </label>
            <label className="field">
              <span>Fecha de entrega</span>
              <input type="date" value={form.delivery_date} onChange={(event) => updateField('delivery_date', event.target.value)} required />
            </label>
            <label className="field">
              <span>Modalidad</span>
              <select value={form.delivery_type} onChange={(event) => updateField('delivery_type', event.target.value)}>
                <option value="retiro">Retiro en tienda</option>
                <option value="delivery">Delivery</option>
              </select>
            </label>
            <label className="field">
              <span>Direccion</span>
              <input value={form.address} onChange={(event) => updateField('address', event.target.value)} />
            </label>
            <label className="field form-grid__wide">
              <span>Notas del pedido</span>
              <textarea value={form.notes} onChange={(event) => updateField('notes', event.target.value)} placeholder="Sabores, colores, dedicatoria o alergias." />
            </label>
          </div>

          {error ? <p className="notice notice--error">{error}</p> : null}

          <button className="primary-button" type="submit" disabled={loading || !items.length}>
            {loading ? 'Enviando...' : 'Enviar pedido'}
          </button>
        </form>

        <aside className="summary-box">
          <h2>Resumen</h2>
          {items.map((item) => (
            <div key={item.id}>
              <span>{item.quantity} x {item.name}</span>
              <strong>{currency.format(item.price * item.quantity)}</strong>
            </div>
          ))}
          <div className="summary-box__total">
            <span>Total</span>
            <strong>{currency.format(total)}</strong>
          </div>
        </aside>
      </section>
    </>
  );
}
