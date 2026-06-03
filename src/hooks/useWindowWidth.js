/**
 * LAILA LUXE
 * FILE: useWindowWidth.js
 * PLACEMENT: src/hooks/useWindowWidth.js
 *            (Create a new `hooks` folder inside src/ — see folder structure)
 *
 * PURPOSE:
 * Returns the current window width as a reactive value.
 * Used by Navbar to conditionally render desktop vs mobile layouts.
 * Replaces the broken `'@media'` keys in JS style objects that were silently ignored.
 *
 * USAGE:
 *   const width = useWindowWidth();
 *   const isMobile = width <= 768;
 */

import { useState, useEffect } from 'react';

export function useWindowWidth() {
  const [width, setWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1024,
  );

  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  return width;
}
