import { ArrowRight, CalendarCheck, HeartHandshake, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductGrid from '../components/products/ProductGrid.jsx';
import Seo from '../components/ui/Seo.jsx';
import { useProducts } from '../hooks/useProducts.js';

export default function Home() {
  const { products } = useProducts();
  const featured = products.filter((product) => product.is_featured).slice(0, 3);

  return (
    <>
      <Seo title="Pasteleria artesanal" />
      <section className="hero">
        <div className="hero__content">
          <p className="eyebrow">Pasteleria artesanal por encargo</p>
          <h1>Beit Hesed Bakery</h1>
          <p>
            Tortas, postres y mesas dulces elaboradas con detalle, ingredientes nobles y una
            experiencia de pedido clara desde el primer clic.
          </p>
          <div className="hero__actions">
            <Link className="primary-button" to="/catalogo">
              Ver catalogo
              <ArrowRight size={18} />
            </Link>
            <Link className="ghost-button" to="/pedido">
              Hacer pedido
            </Link>
          </div>
        </div>
      </section>

      <section className="feature-strip" aria-label="Beneficios">
        <article>
          <HeartHandshake size={22} />
          <strong>Hecho a mano</strong>
          <span>Produccion cuidada por encargo.</span>
        </article>
        <article>
          <CalendarCheck size={22} />
          <strong>Agenda clara</strong>
          <span>Fechas y tiempos visibles antes de pedir.</span>
        </article>
        <article>
          <ShieldCheck size={22} />
          <strong>Pedido seguro</strong>
          <span>Flujo ordenado con confirmacion.</span>
        </article>
      </section>

      <section className="section">
        <div className="section__header">
          <div>
            <p className="eyebrow">Favoritos</p>
            <h2>Productos destacados</h2>
          </div>
          <Link to="/catalogo">Explorar todo</Link>
        </div>
        <ProductGrid products={featured} />
      </section>

      <section className="conversion-band">
        <div>
          <p className="eyebrow">Celebraciones</p>
          <h2>Personaliza tu pedido para eventos especiales</h2>
          <p>
            Agrega tus productos al carrito, elige fecha de entrega y deja notas para detalles
            de sabor, color o presentacion.
          </p>
        </div>
        <Link className="primary-button" to="/catalogo">
          Empezar compra
        </Link>
      </section>
    </>
  );
}
