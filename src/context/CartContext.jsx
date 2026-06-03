/**
 * LAILA LUXE
 * FILE: CartContext.jsx
 * PLACEMENT: src/context/CartContext.jsx  (REPLACE previous version)
 *
 * CHANGES FROM PREVIOUS VERSION:
 * - cartItems now stores { ...product, quantity: 1 }
 * - addItem: increments quantity if item already exists
 * - updateQuantity: adjust qty; removes item if qty reaches 0
 * - cartCount: total units (drives Navbar badge)
 * - cartTotal: computed UGX total (drives CartDrawer summary block)
 *
 * USAGE:
 *   const { cartItems, addItem, removeItem, updateQuantity, cartCount, cartTotal } = useCart();
 */

import { createContext, useContext, useState } from 'react';
import { parsePrice } from '../utils/constants';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addItem = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id, qty) => {
    if (qty <= 0) {
      removeItem(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i)),
    );
  };

  const clearCart = () => setCartItems([]);

  const cartCount = cartItems.reduce((sum, i) => sum + (i.quantity || 1), 0);
  const cartTotal = cartItems.reduce(
    (sum, i) => sum + parsePrice(i.price) * (i.quantity || 1),
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
  return ctx;
}
