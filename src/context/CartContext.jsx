import { createContext, useContext, useMemo, useReducer } from 'react';
import { getCartTotal } from '../utils/formatters.js';

const CartContext = createContext(null);
const STORAGE_KEY = 'beit-hesed-cart';

function readInitialCart() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
  } catch {
    return [];
  }
}

function persist(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  return items;
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'add': {
      const existing = state.find((item) => item.id === action.product.id);
      if (existing) {
        return persist(
          state.map((item) =>
            item.id === action.product.id
              ? { ...item, quantity: item.quantity + action.quantity }
              : item,
          ),
        );
      }

      return persist([...state, { ...action.product, quantity: action.quantity }]);
    }
    case 'remove':
      return persist(state.filter((item) => item.id !== action.id));
    case 'quantity':
      return persist(
        state.map((item) =>
          item.id === action.id ? { ...item, quantity: Math.max(1, action.quantity) } : item,
        ),
      );
    case 'clear':
      return persist([]);
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, undefined, readInitialCart);

  const value = useMemo(
    () => ({
      items,
      total: getCartTotal(items),
      itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
      addItem: (product, quantity = 1) => dispatch({ type: 'add', product, quantity }),
      removeItem: (id) => dispatch({ type: 'remove', id }),
      updateQuantity: (id, quantity) => dispatch({ type: 'quantity', id, quantity }),
      clearCart: () => dispatch({ type: 'clear' }),
    }),
    [items],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart debe usarse dentro de CartProvider');
  return context;
}
