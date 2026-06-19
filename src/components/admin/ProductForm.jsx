import { useEffect, useState } from 'react';
import { slugify } from '../../utils/formatters.js';

const emptyProduct = {
  name: '',
  slug: '',
  description: '',
  category: 'Tortas',
  occasion: 'Cumpleaños',
  price: 0,
  image_url: '',
  prep_time: '24 horas',
  is_featured: false,
  is_available: true,
};

export default function ProductForm({ initialProduct, onSubmit, onCancel, saving }) {
  const [form, setForm] = useState(emptyProduct);

  useEffect(() => {
    setForm(initialProduct ?? emptyProduct);
  }, [initialProduct]);

  function updateField(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value,
      ...(field === 'name' ? { slug: slugify(value) } : {}),
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit({ ...form, price: Number(form.price) });
  }

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label className="field">
          <span>Nombre</span>
          <input value={form.name} onChange={(event) => updateField('name', event.target.value)} required />
        </label>
        <label className="field">
          <span>URL amigable</span>
          <input value={form.slug} onChange={(event) => updateField('slug', event.target.value)} required />
        </label>
        <label className="field form-grid__wide">
          <span>Descripcion</span>
          <textarea value={form.description} onChange={(event) => updateField('description', event.target.value)} required />
        </label>
        <label className="field">
          <span>Categoria</span>
          <input value={form.category} onChange={(event) => updateField('category', event.target.value)} required />
        </label>
        <label className="field">
          <span>Ocasion</span>
          <input value={form.occasion} onChange={(event) => updateField('occasion', event.target.value)} required />
        </label>
        <label className="field">
          <span>Precio</span>
          <input type="number" min="0" step="0.01" value={form.price} onChange={(event) => updateField('price', event.target.value)} required />
        </label>
        <label className="field">
          <span>Tiempo de preparacion</span>
          <input value={form.prep_time} onChange={(event) => updateField('prep_time', event.target.value)} required />
        </label>
        <label className="field form-grid__wide">
          <span>Imagen URL</span>
          <input type="url" value={form.image_url} onChange={(event) => updateField('image_url', event.target.value)} required />
        </label>
        <label className="check-field">
          <input type="checkbox" checked={form.is_featured} onChange={(event) => updateField('is_featured', event.target.checked)} />
          Destacado
        </label>
        <label className="check-field">
          <input type="checkbox" checked={form.is_available} onChange={(event) => updateField('is_available', event.target.checked)} />
          Disponible
        </label>
      </div>
      <div className="form-actions">
        <button className="primary-button" type="submit" disabled={saving}>
          {saving ? 'Guardando...' : 'Guardar producto'}
        </button>
        <button className="ghost-button" type="button" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </form>
  );
}
