import { LockKeyhole } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Seo from '../../components/ui/Seo.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

export default function AdminLogin() {
  const { signIn, isDemoAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('admin@beithesed.local');
  const [password, setPassword] = useState('demo12345');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signIn(email, password);
      navigate(location.state?.from?.pathname ?? '/admin', { replace: true });
    } catch (caughtError) {
      setError(caughtError.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Seo title="Acceso administrativo" />
      <main className="login-page">
        <form className="login-card" onSubmit={handleSubmit}>
          <Link className="brand" to="/">
            <span className="brand__mark">BH</span>
            <span>
              <strong>Beit Hesed</strong>
              <small>Panel administrativo</small>
            </span>
          </Link>
          <LockKeyhole size={28} />
          <h1>Acceso privado</h1>
          <p>Gestiona catalogo, disponibilidad y pedidos recibidos.</p>
          {isDemoAdmin ? <p className="notice">Modo demo activo: configura Supabase para autenticacion real.</p> : null}
          <label className="field">
            <span>Email</span>
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
          </label>
          <label className="field">
            <span>Contrasena</span>
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
          </label>
          {error ? <p className="notice notice--error">{error}</p> : null}
          <button className="primary-button" disabled={loading}>
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>
      </main>
    </>
  );
}
