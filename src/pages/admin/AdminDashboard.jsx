import { Package, ReceiptText, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../../components/ui/Seo.jsx';
import { useProducts } from '../../hooks/useProducts.js';
import { getOrders } from '../../services/orderService.js';

export default function AdminDashboard() {
  const { products } = useProducts();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders().then(setOrders).catch(() => setOrders([]));
  }, []);

  const cards = [
    { label: 'Productos', value: products.length, icon: Package, to: '/admin/productos' },
    { label: 'Destacados', value: products.filter((product) => product.is_featured).length, icon: Star, to: '/admin/productos' },
    { label: 'Pedidos', value: orders.length, icon: ReceiptText, to: '/admin/pedidos' },
  ];

  return (
    <>
      <Seo title="Panel administrativo" />
      <section className="admin-heading">
        <p className="eyebrow">Panel</p>
        <h1>Resumen operativo</h1>
      </section>
      <section className="stats-grid">
        {cards.map(({ label, value, icon: Icon, to }) => (
          <Link className="stat-card" key={label} to={to}>
            <Icon size={22} />
            <span>{label}</span>
            <strong>{value}</strong>
          </Link>
        ))}
      </section>
    </>
  );
}
