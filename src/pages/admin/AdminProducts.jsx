import { Edit2, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import ProductForm from '../../components/admin/ProductForm.jsx';
import Seo from '../../components/ui/Seo.jsx';
import { useProducts } from '../../hooks/useProducts.js';
import { deleteProduct, upsertProduct } from '../../services/productService.js';
import { currency } from '../../utils/formatters.js';

export default function AdminProducts() {
  const { products, setProducts } = useProducts();
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  async function handleSubmit(product) {
    setSaving(true);
    setMessage('');
    try {
      const saved = await upsertProduct(product);
      setProducts((current) => {
        const exists = current.some((item) => item.id === saved.id);
        return exists ? current.map((item) => (item.id === saved.id ? saved : item)) : [saved, ...current];
      });
      setShowForm(false);
      setEditing(null);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(product) {
    setMessage('');
    try {
      await deleteProduct(product.id);
      setProducts((current) => current.filter((item) => item.id !== product.id));
    } catch (error) {
      setMessage(error.message);
    }
  }

  return (
    <>
      <Seo title="Administrar productos" />
      <section className="admin-heading admin-heading--row">
        <div>
          <p className="eyebrow">Catalogo</p>
          <h1>Productos</h1>
        </div>
        <button className="primary-button" onClick={() => { setEditing(null); setShowForm(true); }}>
          <Plus size={18} />
          Nuevo producto
        </button>
      </section>

      {message ? <p className="notice notice--error">{message}</p> : null}

      {showForm ? (
        <ProductForm
          initialProduct={editing}
          onSubmit={handleSubmit}
          onCancel={() => { setShowForm(false); setEditing(null); }}
          saving={saving}
        />
      ) : null}

      <section className="admin-table" aria-label="Productos">
        {products.map((product) => (
          <article key={product.id} className="admin-row">
            <img src={product.image_url} alt={product.name} />
            <div>
              <strong>{product.name}</strong>
              <span>{product.category} · {currency.format(product.price)}</span>
            </div>
            <span className={product.is_available ? 'status status--ok' : 'status'}>
              {product.is_available ? 'Disponible' : 'Oculto'}
            </span>
            <div className="row-actions">
              <button
                className="icon-button"
                onClick={() => { setEditing(product); setShowForm(true); }}
                aria-label={`Editar ${product.name}`}
              >
                <Edit2 size={17} />
              </button>
              <button className="icon-button" onClick={() => handleDelete(product)} aria-label={`Eliminar ${product.name}`}>
                <Trash2 size={17} />
              </button>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
