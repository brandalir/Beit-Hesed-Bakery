import EmptyState from '../ui/EmptyState.jsx';
import ProductCard from './ProductCard.jsx';

export default function ProductGrid({ products }) {
  if (!products.length) {
    return (
      <EmptyState
        title="No encontramos productos"
        text="Prueba cambiando los filtros o escribe una busqueda mas amplia."
      />
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
