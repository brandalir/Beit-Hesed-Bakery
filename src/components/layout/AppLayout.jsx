import { Menu, ShoppingBag, X } from 'lucide-react';
import { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { useCart } from '../../context/CartContext.jsx';

const links = [
  { to: '/', label: 'Inicio' },
  { to: '/catalogo', label: 'Catalogo' },
  { to: '/admin', label: 'Admin' },
];

export default function AppLayout() {
  const [open, setOpen] = useState(false);
  const { itemCount } = useCart();

  return (
    <div className="site-shell">
      <header className="site-header">
        <Link className="brand" to="/" aria-label="Beit Hesed Bakery inicio">
          <span className="brand__mark">BH</span>
          <span>
            <strong>Beit Hesed</strong>
            <small>Bakery</small>
          </span>
        </Link>

        <button className="icon-button mobile-only" onClick={() => setOpen(true)} aria-label="Abrir menu">
          <Menu size={20} />
        </button>

        <nav className={`site-nav ${open ? 'is-open' : ''}`} aria-label="Navegacion principal">
          <button className="icon-button mobile-only" onClick={() => setOpen(false)} aria-label="Cerrar menu">
            <X size={20} />
          </button>
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} onClick={() => setOpen(false)}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <Link className="cart-link" to="/carrito" aria-label={`Carrito con ${itemCount} productos`}>
          <ShoppingBag size={19} />
          <span>{itemCount}</span>
        </Link>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="site-footer">
        <strong>Beit Hesed Bakery</strong>
        <span>Pasteleria artesanal por encargo</span>
        <Link to="/catalogo">Ver catalogo</Link>
      </footer>
    </div>
  );
}
