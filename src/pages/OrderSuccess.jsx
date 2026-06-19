import { CheckCircle2 } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Seo from '../components/ui/Seo.jsx';

export default function OrderSuccess() {
  const location = useLocation();

  return (
    <>
      <Seo title="Pedido confirmado" />
      <section className="success-page">
        <CheckCircle2 size={48} />
        <p className="eyebrow">Pedido recibido</p>
        <h1>Gracias por elegir Beit Hesed Bakery</h1>
        <p>
          Tu solicitud fue registrada con el codigo <strong>{location.state?.orderId ?? 'demo'}</strong>.
          Te contactaremos para confirmar disponibilidad y pago.
        </p>
        <Link className="primary-button" to="/catalogo">
          Seguir comprando
        </Link>
      </section>
    </>
  );
}
