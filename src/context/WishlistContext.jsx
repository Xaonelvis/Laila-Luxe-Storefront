/**
 * LAILA LUXE
 * FILE: WishlistContext.jsx
 * PLACEMENT: src/context/WishlistContext.jsx  (NEW FILE)
 *
 * PURPOSE:
 * Global wishlist state. Mirrors CartContext structure.
 * Wrap <App /> with <WishlistProvider> in main.jsx alongside CartProvider.
 *
 * USAGE:
 *   const { wishlistItems, toggleWishlist, isWishlisted, wishlistCount } = useWishlist();
 */

import { createContext, useContext, useState } from 'react';

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState([]);

  /** Toggle: adds if not present, removes if already wishlisted */
  const toggleWishlist = (product) => {
    setWishlistItems((prev) =>
      prev.find((i) => i.id === product.id)
        ? prev.filter((i) => i.id !== product.id)
        : [...prev, product],
    );
  };

  /** Check if a product is in the wishlist */
  const isWishlisted = (productId) =>
    wishlistItems.some((i) => i.id === productId);

  /** Total wishlisted items */
  const wishlistCount = wishlistItems.length;

  return (
    <WishlistContext.Provider
      value={{ wishlistItems, toggleWishlist, isWishlisted, wishlistCount }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx)
    throw new Error('useWishlist must be used inside <WishlistProvider>');
  return ctx;
}
