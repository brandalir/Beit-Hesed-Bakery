import { Link } from 'react-router-dom';
import Seo from '../components/ui/Seo.jsx';

export default function NotFound() {
  return (
    <>
      <Seo title="Pagina no encontrada" />
      <section className="success-page">
        <p className="eyebrow">404</p>
        <h1>Esta pagina no existe</h1>
        <p>Vuelve al inicio o explora el catalogo de productos disponibles.</p>
        <Link className="primary-button" to="/">
          Ir al inicio
        </Link>
      </section>
    </>
  );
}
