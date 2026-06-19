import { fallbackProducts } from '../data/fallbackProducts.js';
import { hasSupabaseConfig, supabase } from '../lib/supabase.js';

const TABLE = 'products';

export async function getProducts() {
  if (!hasSupabaseConfig) return fallbackProducts;

  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.warn('Supabase products fallback:', error.message);
    return fallbackProducts;
  }

  return data?.length ? data : fallbackProducts;
}

export async function getProductBySlug(slug) {
  if (!hasSupabaseConfig) {
    return fallbackProducts.find((product) => product.slug === slug) ?? null;
  }

  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) return fallbackProducts.find((product) => product.slug === slug) ?? null;
  return data;
}

export async function upsertProduct(product) {
  if (!hasSupabaseConfig) throw new Error('Configura Supabase para guardar productos.');

  const { data, error } = await supabase
    .from(TABLE)
    .upsert(product)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteProduct(id) {
  if (!hasSupabaseConfig) throw new Error('Configura Supabase para eliminar productos.');

  const { error } = await supabase.from(TABLE).delete().eq('id', id);
  if (error) throw error;
}
