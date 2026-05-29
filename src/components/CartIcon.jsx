/**
 * LAILA LUXE
 * FILE: CartIcon.jsx
 *
 * PURPOSE:
 * Shopping cart icon with badge count.
 * Triggers CartDrawer modal when clicked.
 *
 * PROPS:
 * - cartCount: Number of items in cart (for badge)
 * - onClick: Callback to open cart drawer
 *
 * RULE:
 * - Visual structure only (no cart logic yet)
 * - Badge shows count, placeholder for click handler
 */

import { colors } from '../design';

const styles = {
  wrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'transform 150ms ease',

    '&:hover': {
      transform: 'scale(1.05)',
    },
  },

  cartIcon: {
    width: '24px',
    height: '24px',
    color: colors.textPrimary,
    strokeWidth: 1.5,
  },

  badge: {
    position: 'absolute',
    top: '-8px',
    right: '-8px',
    background: colors.gold,
    color: '#FFFFFF',
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: 600,
    boxShadow: `0 2px 8px rgba(198, 169, 114, 0.3)`,
  },

  badgeHidden: {
    display: 'none',
  },
};

export default function CartIcon({ cartCount = 0, onClick }) {
  return (
    <div style={styles.wrapper} onClick={onClick}>
      {/* Cart Icon */}
      <svg
        style={styles.cartIcon}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
        />
      </svg>

      {/* Badge Count */}
      {cartCount > 0 && (
        <div style={styles.badge}>
          {cartCount > 99 ? '99+' : cartCount}
        </div>
      )}
    </div>
  );
}
