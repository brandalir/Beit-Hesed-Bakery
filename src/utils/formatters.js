export const currency = new Intl.NumberFormat('es-BO', {
  style: 'currency',
  currency: 'BOB',
});

export function slugify(value) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getCartTotal(items) {
  return items.reduce((total, item) => total + Number(item.price) * item.quantity, 0);
}
