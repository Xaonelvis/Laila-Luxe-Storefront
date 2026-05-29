/**
 * LAILA LUXE
 * FILE: Navbar.jsx
 *
 * PURPOSE:
 * Sticky navigation bar for premium storefront.
 * Orchestrates logo, search, and cart interactions.
 * Responsive with scroll-based shrink effect (100% → 80% opacity/size).
 *
 * STRUCTURE:
 * - Left: Logo (SVG image)
 * - Right: Search icon + Cart icon with badge
 * - Mobile: Hamburger menu replaces search
 *
 * RULE:
 * - All spacing and colors from design tokens
 * - Scroll listener for shrink effect
 * - Cart state management ready
 */

import { useState, useEffect } from 'react';
import { colors, spacing } from '../design';
import SearchBar from './SearchBar';
import CartIcon from './CartIcon';
import HamburgerMenu from './HamburgerMenu';
import CartDrawer from './CartDrawer';

const styles = {
  navbar: {
    position: 'sticky',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    background: colors.bg,
    borderBottom: `1px solid ${colors.border}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: spacing.lg,
    paddingRight: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
    transition: 'all 300ms ease',
  },

  logoWrapper: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
  },

  logo: {
    height: '50px',
    width: 'auto',
  },

  rightSection: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.lg,
  },

  desktopOnly: {
    display: 'flex',
  },

  mobileOnly: {
    display: 'none',
  },
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navbarStyle = {
    ...styles.navbar,
    height: scrolled ? '60px' : '80px',
    opacity: scrolled ? 0.8 : 1,
  };

  const desktopStyle = {
    ...styles.desktopOnly,
    '@media (max-width: 768px)': {
      display: 'none',
    },
  };

  const mobileStyle = {
    ...styles.mobileOnly,
    '@media (max-width: 768px)': {
      display: 'flex',
    },
  };

  return (
    <>
      <nav style={navbarStyle}>
        {/* Logo */}
        <div style={styles.logoWrapper}>
          <img
            src="/assets/laila-luxe-official-logo.svg"
            alt="LAILA LUXE"
            style={styles.logo}
          />
        </div>

        {/* Desktop: Search + Cart */}
        <div style={{ ...styles.rightSection, ...desktopStyle }}>
          <SearchBar />
          <CartIcon cartCount={cartItems.length} onClick={() => setCartOpen(true)} />
        </div>

        {/* Mobile: Hamburger + Cart */}
        <div style={{ ...styles.rightSection, ...mobileStyle }}>
          <CartIcon cartCount={cartItems.length} onClick={() => setCartOpen(true)} />
          <HamburgerMenu isOpen={menuOpen} onToggle={setMenuOpen} />
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {menuOpen && <HamburgerMenu isOpen={menuOpen} onToggle={setMenuOpen} />}

      {/* Cart Drawer */}
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} cartItems={cartItems} />
    </>
  );
}
