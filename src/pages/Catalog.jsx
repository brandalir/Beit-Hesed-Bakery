import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import CatalogFilters from '../components/products/CatalogFilters.jsx';
import ProductGrid from '../components/products/ProductGrid.jsx';
import Loader from '../components/ui/Loader.jsx';
import Seo from '../components/ui/Seo.jsx';
import { useProducts } from '../hooks/useProducts.js';

const defaults = {
  query: '',
  category: '',
  occasion: '',
  maxPrice: 60,
  availableOnly: true,
};

export default function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, loading, error } = useProducts();

  const filters = useMemo(
    () => ({
      query: searchParams.get('q') ?? defaults.query,
      category: searchParams.get('categoria') ?? defaults.category,
      occasion: searchParams.get('ocasion') ?? defaults.occasion,
      maxPrice: Number(searchParams.get('precio') ?? defaults.maxPrice),
      availableOnly: searchParams.get('disponible') !== 'false',
    }),
    [searchParams],
  );

  const categories = useMemo(() => [...new Set(products.map((product) => product.category))], [products]);
  const occasions = useMemo(() => [...new Set(products.map((product) => product.occasion))], [products]);

  const filteredProducts = useMemo(() => {
    const query = filters.query.trim().toLowerCase();

    return products.filter((product) => {
      const matchesQuery =
        !query ||
        [product.name, product.description, product.category, product.occasion]
          .join(' ')
          .toLowerCase()
          .includes(query);

      return (
        matchesQuery &&
        (!filters.category || product.category === filters.category) &&
        (!filters.occasion || product.occasion === filters.occasion) &&
        Number(product.price) <= filters.maxPrice &&
        (!filters.availableOnly || product.is_available)
      );
    });
  }, [filters, products]);

  function updateFilter(key, value) {
    const next = new URLSearchParams(searchParams);
    const map = {
      query: 'q',
      category: 'categoria',
      occasion: 'ocasion',
      maxPrice: 'precio',
      availableOnly: 'disponible',
    };

    if (value === '' || value === defaults[key]) next.delete(map[key]);
    else next.set(map[key], String(value));

    setSearchParams(next, { replace: true });
  }

  if (loading) return <Loader label="Cargando catalogo" />;

  return (
    <>
      <Seo title="Catalogo" description="Catalogo de tortas, postres y panaderia artesanal de Beit Hesed Bakery." />
      <section className="page-heading">
        <p className="eyebrow">Catalogo online</p>
        <h1>Encuentra el dulce ideal</h1>
        <p>Filtra por categoria, ocasion o presupuesto y arma tu pedido en pocos pasos.</p>
      </section>

      <section className="catalog-layout">
        <CatalogFilters
          filters={filters}
          categories={categories}
          occasions={occasions}
          onChange={updateFilter}
          onReset={() => setSearchParams({})}
        />
        <div className="catalog-results">
          {error ? <p className="notice">{error}</p> : null}
          <div className="result-count">{filteredProducts.length} productos disponibles</div>
          <ProductGrid products={filteredProducts} />
        </div>
      </section>
    </>
  );
}
