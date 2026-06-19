import { hasSupabaseConfig, supabase } from '../lib/supabase.js';

const TABLE = 'orders';

export async function createOrder(order) {
  if (!hasSupabaseConfig) {
    return {
      id: `demo-${Date.now()}`,
      ...order,
      status: 'nuevo',
    };
  }

  const { data, error } = await supabase.from(TABLE).insert(order).select().single();
  if (error) throw error;
  return data;
}

export async function getOrders() {
  if (!hasSupabaseConfig) return [];

  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function updateOrderStatus(id, status) {
  if (!hasSupabaseConfig) throw new Error('Configura Supabase para actualizar pedidos.');

  const { data, error } = await supabase
    .from(TABLE)
    .update({ status })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}
