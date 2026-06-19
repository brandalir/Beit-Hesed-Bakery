import { LayoutDashboard, LogOut, Package, ReceiptText } from 'lucide-react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

const adminLinks = [
  { to: '/admin', label: 'Resumen', icon: LayoutDashboard },
  { to: '/admin/productos', label: 'Productos', icon: Package },
  { to: '/admin/pedidos', label: 'Pedidos', icon: ReceiptText },
];

export default function AdminLayout() {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();

  async function handleSignOut() {
    await signOut();
    navigate('/admin/login');
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <NavLink className="brand" to="/">
          <span className="brand__mark">BH</span>
          <span>
            <strong>Admin</strong>
            <small>{user?.email}</small>
          </span>
        </NavLink>
        <nav aria-label="Administracion">
          {adminLinks.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} end={to === '/admin'}>
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>
        <button className="ghost-button" onClick={handleSignOut}>
          <LogOut size={18} />
          Salir
        </button>
      </aside>
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}
