import { useEffect, useState } from 'react';
import Seo from '../../components/ui/Seo.jsx';
import { getOrders, updateOrderStatus } from '../../services/orderService.js';
import { currency } from '../../utils/formatters.js';

const statuses = ['nuevo', 'confirmado', 'en preparacion', 'entregado', 'cancelado'];

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    getOrders()
      .then(setOrders)
      .catch((error) => setMessage(error.message));
  }, []);

  async function handleStatus(id, status) {
    setMessage('');
    try {
      const updated = await updateOrderStatus(id, status);
      setOrders((current) => current.map((order) => (order.id === id ? updated : order)));
    } catch (error) {
      setMessage(error.message);
    }
  }

  return (
    <>
      <Seo title="Gestion de pedidos" />
      <section className="admin-heading">
        <p className="eyebrow">Pedidos</p>
        <h1>Gestion de pedidos</h1>
      </section>

      {message ? <p className="notice notice--error">{message}</p> : null}

      <section className="admin-table" aria-label="Pedidos">
        {!orders.length ? <p className="notice">Aun no hay pedidos registrados.</p> : null}
        {orders.map((order) => (
          <article key={order.id} className="order-row">
            <div>
              <strong>{order.customer_name}</strong>
              <span>{order.customer_phone} · {order.delivery_date}</span>
              <small>{order.items?.map((item) => `${item.quantity} x ${item.name}`).join(', ')}</small>
            </div>
            <strong>{currency.format(order.total)}</strong>
            <label className="field field--compact">
              <span>Estado</span>
              <select value={order.status} onChange={(event) => handleStatus(order.id, event.target.value)}>
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </label>
          </article>
        ))}
      </section>
    </>
  );
}
