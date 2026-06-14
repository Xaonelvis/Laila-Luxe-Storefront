/**
 * LAILA LUXE
 * FILE: Navbar.jsx
 * PLACEMENT: src/components/Navbar.jsx  (REPLACE existing)
 *
 * 3-STATE SCROLL SYSTEM:
 *
 * State 0 — Landing (transparent, overlays hero):
 *   Desktop: [☰ MENU] [Logo]   [──── Search ────]   [🛒 CART] [👤 My Luxe]
 *   Mobile:  [Logo]                                   [🔍] [🛒] [☰]
 *
 * State 1 — Scrolling through hero (frosted, labels hidden):
 *   Desktop: [☰] [Logo]   [──── Search ────]   [🛒] [👤 My Luxe]
 *   Mobile:  [Logo]                              [🔍] [🛒] [☰]
 *
 * State 2 — Past marquee strip (solid, brand name center):
 *   Desktop: [☰] [🔍]   LAILA LUXE   [🛒] [👤 My Luxe]
 *   Mobile:  [👤][❤]   LAILA LUXE   [🔍] [🛒]
 *
 * ARCHITECTURE:
 * - position: fixed — overlays hero for transparent effect
 * - Scroll thresholds computed from #hero-section + #marquee-strip DOM IDs
 * - Framer Motion AnimatePresence handles element transitions between states
 * - WishlistContext drives heart icon fill state
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { colors, spacing, typography, shadows, borders } from '../design';
import { useWindowWidth } from '../hooks/useWindowWidth';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import CartIcon from './CartIcon';
import HamburgerMenu from './HamburgerMenu';
import CartDrawer from './CartDrawer';
import SearchBar from './SearchBar';

const MOBILE_BP = 768;

// ── Nav height per state ──────────────────────────────────────────────────────
const NAV_H = {
  desktop: [80, 68, 60],
  mobile: [72, 64, 56],
};

// ── Background per state ──────────────────────────────────────────────────────
const NAV_BG = [
  'rgba(247, 241, 227, 0.06)', // 0: near-transparent over hero
  'rgba(247, 241, 227, 0.84)', // 1: frosted glass
  colors.bg, // 2: solid
];

// ── Inline SVG icons ──────────────────────────────────────────────────────────
const MenuSvg = () => (
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
      strokeWidth={1.5}
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
);

const SearchSvg = ({ size = 20 }) => (
  <svg
    width={size}
    height={size}
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
);

const AccountSvg = ({ size = 20 }) => (
  <svg
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z"
    />
  </svg>
);

const WishlistSvg = ({ filled = false, size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={filled ? colors.gold : 'none'}
    stroke={filled ? colors.gold : 'currentColor'}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    />
  </svg>
);

const BagSvg = () => (
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
      strokeWidth={1.5}
      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
    />
  </svg>
);

// ── Reusable icon button ──────────────────────────────────────────────────────
function NavBtn({ onClick, label, showLabel, children, ariaLabel }) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel || label}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: colors.textPrimary,
        padding: `${spacing.xs} ${spacing.xs}`,
        fontFamily: 'inherit',
        transition: 'opacity 200ms ease',
        position: 'relative',
      }}
    >
      {children}
      <AnimatePresence>
        {showLabel && label && (
          <motion.span
            key="label"
            initial={{ opacity: 0, maxWidth: 0 }}
            animate={{ opacity: 1, maxWidth: '80px' }}
            exit={{ opacity: 0, maxWidth: 0 }}
            transition={{ duration: 0.22 }}
            style={{
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              color: colors.textPrimary,
            }}
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function Navbar({ onSearch }) {
  const [scrollState, setScrollState] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearch] = useState(false);
  const [desktopSearchOpen, setDesktopSearch] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [centreQuery, setCentreQuery] = useState('');

  const width = useWindowWidth();
  const isMobile = width <= MOBILE_BP;
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  // ── Scroll state machine ────────────────────────────────────────────────────
  useEffect(() => {
    let marqueeBottom = 0;

    const calcThreshold = () => {
      const marquee = document.getElementById('marquee-strip');
      if (!marquee) {
        marqueeBottom = window.innerHeight;
        return;
      }
      marqueeBottom = marquee.getBoundingClientRect().bottom + window.scrollY;
    };

    calcThreshold();

    const onScroll = () => {
      const y = window.scrollY;
      if (y < 60) {
        setScrollState(0);
        return;
      }
      if (y < marqueeBottom - 40) {
        setScrollState(1);
        return;
      }
      setScrollState(2);
    };

    const onResize = () => {
      calcThreshold();
      onScroll();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  // Close mobile search when switching to desktop
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!isMobile) setMobileSearch(false);
  }, [isMobile]);

  // ── Derived styles ──────────────────────────────────────────────────────────
  const navH = isMobile
    ? NAV_H.mobile[scrollState]
    : NAV_H.desktop[scrollState];
  const navBg = NAV_BG[scrollState];
  const blur = scrollState > 0 ? 'blur(20px) saturate(1.4)' : 'none';
  const border = `1px solid ${scrollState > 0 ? 'rgba(231,221,200,0.5)' : 'transparent'}`;

  const navStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    height: `${navH}px`,
    display: 'flex',
    alignItems: 'center',
    paddingLeft: spacing.lg,
    paddingRight: spacing.lg,
    background: navBg,
    backdropFilter: blur,
    WebkitBackdropFilter: blur,
    boxShadow: scrollState > 0 ? shadows.sm : 'none',
    borderBottom: border,
    transition: 'all 400ms ease',
  };

  const logoEl = logoError ? (
    <span
     href="home"
      style={{
        fontSize: '14px',
        fontWeight: 700,
        letterSpacing: '4px',
        color: colors.textPrimary,
      }}
    >
      LAILA LUXE
    </span>
  ) : (
    <img
     href="home"
      src="/assets/logo.svg"
      alt="LAILA LUXE"
      style={{ height: '44px', width: 'auto', display: 'block' }}
      onError={() => setLogoError(true)}
    />
  );

  const brandEl = (
    <motion.span
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3 }}
      style={{
        fontSize: isMobile ? '15px' : '18px',
        fontWeight: 700,
        letterSpacing: isMobile ? '4px' : '6px',
        color: colors.textPrimary,
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
      }}
    >
      LAILA LUXE
    </motion.span>
  );

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <>
      <nav style={navStyle}>
        {/* ════════════ DESKTOP ════════════ */}
        {!isMobile && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              gap: spacing.md,
            }}
          >
            {/* LEFT: Menu + (Logo or Search icon) */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: spacing.sm,
                flex: '0 0 auto',
              }}
            >
              <NavBtn
                onClick={() => setMenuOpen((v) => !v)}
                label="Menu"
                showLabel={scrollState === 0}
                ariaLabel="Open menu"
              >
                <MenuSvg />
              </NavBtn>

              <AnimatePresence mode="wait">
                {scrollState < 2 ? (
                  <motion.div
                    key="logo-d"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    {logoEl}
                  </motion.div>
                ) : (
                  <motion.button
                    key="search-d"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    onClick={() => setDesktopSearch((v) => !v)}
                    aria-label="Search"
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: colors.textPrimary,
                      display: 'flex',
                      padding: spacing.xs,
                    }}
                  >
                    <SearchSvg />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            {/* CENTER: Search input (state 0,1) or Brand name (state 2) */}
            <div
              style={{
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                padding: `0 ${spacing.xl}`,
              }}
            >
              <AnimatePresence mode="wait">
                {scrollState < 2 ? (
                  <motion.div
                    key="centre-search"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    style={{ width: '100%', maxWidth: '400px' }}
                  >
                    {/* Pill-shaped always-visible search */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: spacing.sm,
                        background: 'rgba(255,255,255,0.55)',
                        border: borders.thin,
                        borderRadius: '999px',
                        padding: `${spacing.xs} ${spacing.lg}`,
                        backdropFilter: 'blur(8px)',
                        transition: 'border-color 200ms ease',
                      }}
                    >
                      <SearchSvg size={16} />
                      <input
                        type="text"
                        placeholder="Search collections…"
                        value={centreQuery}
                        onChange={(e) => {
                          setCentreQuery(e.target.value);
                          onSearch?.(e.target.value);
                        }}
                        style={{
                          flex: 1,
                          border: 'none',
                          background: 'transparent',
                          outline: 'none',
                          fontSize: typography.small.fontSize,
                          color: colors.textPrimary,
                          fontFamily: 'inherit',
                        }}
                      />
                      {centreQuery && (
                        <button
                          onClick={() => {
                            setCentreQuery('');
                            onSearch?.('');
                          }}
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: colors.textMuted,
                            fontSize: '18px',
                            lineHeight: 1,
                            padding: 0,
                          }}
                        >
                          ×
                        </button>
                      )}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="brand-d"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {brandEl}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* RIGHT: Cart + Account (My Luxe always labelled) */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: spacing.sm,
                flex: '0 0 auto',
              }}
            >
              {/* Cart */}
              <button
                onClick={() => setCartOpen(true)}
                aria-label="Cart"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: colors.textPrimary,
                  padding: spacing.xs,
                  position: 'relative',
                  fontFamily: 'inherit',
                }}
              >
                <div style={{ position: 'relative' }}>
                  <BagSvg />
                  {cartCount > 0 && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '-7px',
                        right: '-9px',
                        background: colors.gold,
                        color: '#FFF',
                        width: '17px',
                        height: '17px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '9px',
                        fontWeight: 700,
                      }}
                    >
                      {cartCount > 9 ? '9+' : cartCount}
                    </div>
                  )}
                </div>
                <AnimatePresence>
                  {scrollState === 0 && (
                    <motion.span
                      key="cart-lbl"
                      initial={{ opacity: 0, maxWidth: 0 }}
                      animate={{ opacity: 1, maxWidth: '60px' }}
                      exit={{ opacity: 0, maxWidth: 0 }}
                      style={{
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        fontSize: '11px',
                        fontWeight: 700,
                        letterSpacing: '1.5px',
                        textTransform: 'autopcase',
                      }}
                    >
                      Shopping Bag
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              {/* Account — "My Luxe" always visible */}
              <button
                aria-label="My account"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: colors.textPrimary,
                  padding: spacing.xs,
                  fontFamily: 'inherit',
                }}
              >
                <AccountSvg />
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    letterSpacing: '1px',
                    textTransform: 'autopcase',
                    whiteSpace: 'nowrap',
                  }}
                >
                  My Luxe
                </span>
              </button>
            </div>
          </div>
        )}

        {/* ════════════ MOBILE ════════════ */}
        {isMobile && (
          <AnimatePresence mode="wait">
            {/* State 0 & 1: Logo left, icons right */}
            {scrollState < 2 && (
              <motion.div
                key="mob-01"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.28 }}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                {logoEl}

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: spacing.sm,
                  }}
                >
                  <button
                    onClick={() => setMobileSearch((v) => !v)}
                    aria-label="Search"
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: colors.textPrimary,
                      display: 'flex',
                      padding: spacing.xs,
                    }}
                  >
                    <SearchSvg />
                  </button>
                  <CartIcon
                    cartCount={cartCount}
                    onClick={() => setCartOpen(true)}
                  />
                  {/* Hamburger button */}
                  <button
                    onClick={() => setMenuOpen((v) => !v)}
                    aria-label="Menu"
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: colors.textPrimary,
                      display: 'flex',
                      padding: spacing.xs,
                    }}
                  >
                    <MenuSvg />
                  </button>
                </div>
              </motion.div>
            )}

            {/* State 2: Account+Wishlist left, Brand centre, Search+Cart right */}
            {scrollState === 2 && (
              <motion.div
                key="mob-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.28 }}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                {/* Left: Account + Wishlist */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: spacing.sm,
                  }}
                >
                  <button
                    aria-label="Account"
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: colors.textPrimary,
                      display: 'flex',
                      padding: spacing.xs,
                    }}
                  >
                    <AccountSvg size={20} />
                  </button>
                  <button
                    aria-label="Wishlist"
                    onClick={() => {
                      // Wishlist drawer — future feature
                      // For now, shows count is tracked
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: colors.textPrimary,
                      display: 'flex',
                      padding: spacing.xs,
                      position: 'relative',
                    }}
                  >
                    <WishlistSvg filled={wishlistCount > 0} size={20} />
                    {wishlistCount > 0 && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '-6px',
                          right: '-6px',
                          background: colors.gold,
                          color: '#FFF',
                          width: '16px',
                          height: '16px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '9px',
                          fontWeight: 700,
                        }}
                      >
                        {wishlistCount}
                      </div>
                    )}
                  </button>
                </div>

                {/* Centre: Brand name */}
                {brandEl}

                {/* Right: Search + Cart */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: spacing.sm,
                  }}
                >
                  <button
                    onClick={() => setMobileSearch((v) => !v)}
                    aria-label="Search"
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: colors.textPrimary,
                      display: 'flex',
                      padding: spacing.xs,
                    }}
                  >
                    <SearchSvg />
                  </button>
                  <CartIcon
                    cartCount={cartCount}
                    onClick={() => setCartOpen(true)}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </nav>

      {/* Mobile search panel — fixed below navbar */}
      {mobileSearchOpen && (
        <div
          style={{
            position: 'fixed',
            top: `${navH}px`,
            left: 0,
            right: 0,
            zIndex: 998,
            padding: `${spacing.sm} ${spacing.lg}`,
            background: colors.bg,
            borderBottom: borders.thin,
            boxShadow: shadows.md,
            transition: 'top 400ms ease',
          }}
        >
          <SearchBar
            onSearch={onSearch}
            fullWidth
            autoFocus
            onDismiss={() => setMobileSearch(false)}
          />
        </div>
      )}

      {/* Desktop search overlay — shown in state 2 when search icon is clicked */}
      {!isMobile && desktopSearchOpen && scrollState === 2 && (
        <div
          style={{
            position: 'fixed',
            top: '60px',
            left: 0,
            right: 0,
            zIndex: 998,
            padding: `${spacing.md} ${spacing.xl}`,
            background: colors.bg,
            borderBottom: borders.thin,
            boxShadow: shadows.md,
          }}
        >
          <SearchBar
            onSearch={onSearch}
            fullWidth
            autoFocus
            onDismiss={() => setDesktopSearch(false)}
          />
        </div>
      )}

      {/* Hamburger drawer */}
      <HamburgerMenu isOpen={menuOpen} onToggle={setMenuOpen} />

      {/* Cart drawer */}
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
