import { Search, SlidersHorizontal } from 'lucide-react';

export default function CatalogFilters({
  filters,
  categories,
  occasions,
  onChange,
  onReset,
}) {
  return (
    <aside className="filters-panel" aria-label="Filtros de catalogo">
      <div className="filters-panel__title">
        <SlidersHorizontal size={18} />
        <h2>Filtros</h2>
      </div>

      <label className="field field--search">
        <span>Buscar</span>
        <div>
          <Search size={18} />
          <input
            type="search"
            value={filters.query}
            onChange={(event) => onChange('query', event.target.value)}
            placeholder="Torta, macaron..."
          />
        </div>
      </label>

      <label className="field">
        <span>Categoria</span>
        <select value={filters.category} onChange={(event) => onChange('category', event.target.value)}>
          <option value="">Todas</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>

      <label className="field">
        <span>Ocasion</span>
        <select value={filters.occasion} onChange={(event) => onChange('occasion', event.target.value)}>
          <option value="">Todas</option>
          {occasions.map((occasion) => (
            <option key={occasion} value={occasion}>
              {occasion}
            </option>
          ))}
        </select>
      </label>

      <label className="field">
        <span>Precio maximo</span>
        <input
          type="range"
          min="5"
          max="60"
          step="1"
          value={filters.maxPrice}
          onChange={(event) => onChange('maxPrice', Number(event.target.value))}
        />
        <strong>Hasta Bs {filters.maxPrice}</strong>
      </label>

      <label className="check-field">
        <input
          type="checkbox"
          checked={filters.availableOnly}
          onChange={(event) => onChange('availableOnly', event.target.checked)}
        />
        Solo disponibles
      </label>

      <button className="ghost-button" onClick={onReset}>
        Limpiar filtros
      </button>
    </aside>
  );
}
