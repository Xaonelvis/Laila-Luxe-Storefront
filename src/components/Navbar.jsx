/**
 * LAILA LUXE
 * FILE: Navbar.jsx
 * PLACEMENT: src/components/Navbar.jsx  (REPLACE existing)
 *
 * CHANGES FROM PREVIOUS VERSION:
 * - FIXED logo: imported from src/assets/ (was looking in public/, never found)
 * - FIXED responsive: useWindowWidth replaces broken @media JS keys
 * - FIXED cart badge: cartCount from CartContext (total units, not array length)
 * - ADDED mobile search: search icon toggles an expanded search panel below nav
 * - ADDED onSearch prop: wires SearchBar to App.jsx search state
 * - IMPROVED scroll: glassmorphism backdrop-filter replaces opacity fade
 */

import { useState, useEffect } from 'react';
import { colors, spacing, shadows } from '../design';
import { useWindowWidth } from '../hooks/useWindowWidth';
import { useCart } from '../context/CartContext';
import SearchBar from './SearchBar';
import CartIcon from './CartIcon';
import HamburgerMenu from './HamburgerMenu';
import CartDrawer from './CartDrawer';

const MOBILE_BP = 768;

const base = {
  navbar: {
    position: 'sticky',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: spacing.lg,
    paddingRight: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
    transition: 'all 300ms ease',
  },
  logoWrapper: { display: 'flex', alignItems: 'center', height: '100%' },
  logo: { height: '48px', width: 'auto', display: 'block' },
  logoFallback: {
    fontSize: '16px',
    fontWeight: 700,
    letterSpacing: '4px',
    color: colors.textPrimary,
  },
  rightSection: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.lg,
  },

  searchIconBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: spacing.xs,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: colors.textPrimary,
  },
};

export default function Navbar({ onSearch }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearch] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const width = useWindowWidth();
  const isMobile = width <= MOBILE_BP;

  const { cartCount } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile search when switching to desktop
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!isMobile) setMobileSearch(false);
  }, [isMobile]);

  // Glassmorphism on scroll
  const navStyle = {
    ...base.navbar,
    height: scrolled ? '58px' : '76px',
    background: scrolled ? 'rgba(247,241,227,0.84)' : colors.bg,
    backdropFilter: scrolled ? 'blur(20px) saturate(1.4)' : 'none',
    WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(1.4)' : 'none',
    boxShadow: scrolled ? shadows.sm : 'none',
    borderBottom: `1px solid ${scrolled ? 'rgba(231,221,200,0.5)' : colors.border}`,
  };

  return (
    <>
      <nav style={navStyle}>
        {/* Logo — imported from src/assets/ */}
        <div style={base.logoWrapper}>
          {logoError ? (
            <span style={base.logoFallback}>LAILA LUXE</span>
          ) : (
            <img
              src="/assets/logo.svg"
              alt="LAILA LUXE"
              style={base.logo}
              onError={() => setLogoError(true)}
            />
          )}
        </div>

        {/* Desktop: SearchBar + Cart */}
        {!isMobile && (
          <div style={base.rightSection}>
            <SearchBar onSearch={onSearch} />
            <CartIcon cartCount={cartCount} onClick={() => setCartOpen(true)} />
          </div>
        )}

        {/* Mobile: Search icon + Cart + Hamburger */}
        {isMobile && (
          <div style={base.rightSection}>
            {/* Search icon toggle */}
            <button
              style={base.searchIconBtn}
              onClick={() => setMobileSearch((v) => !v)}
              aria-label="Search"
            >
              <svg
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.8}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
            <CartIcon cartCount={cartCount} onClick={() => setCartOpen(true)} />
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Menu"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: spacing.xs,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: colors.textPrimary,
              }}
            >
              <svg
                width="22"
                height="22"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        )}
      </nav>

      <HamburgerMenu isOpen={menuOpen} onToggle={setMenuOpen} />

      {/* Mobile search panel — slides in below nav when toggled */}
      {isMobile && mobileSearchOpen && (
        <div
          style={{
            position: 'fixed',
            top: scrolled ? '58px' : '76px',
            left: 0,
            right: 0,
            zIndex: 998,
            padding: `${spacing.sm} ${spacing.lg}`,
            background: colors.bg,
            borderBottom: `1px solid ${colors.border}`,
            boxShadow: shadows.md,
            transition: 'top 300ms ease',
          }}
        >
          <SearchBar
            onSearch={onSearch}
            autoFocus
            fullWidth
            onDismiss={() => setMobileSearch(false)}
          />
        </div>
      )}

      {/* Cart Drawer */}
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
