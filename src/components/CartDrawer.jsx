/**
 * LAILA LUXE
 * FILE: CartDrawer.jsx
 *
 * PURPOSE:
 * Cart popup modal showing all selected products.
 * Lists items and provides WhatsApp send option.
 *
 * STRUCTURE:
 * - Header with close button
 * - Products list (scrollable)
 * - Footer with WhatsApp send button
 *
 * BEHAVIOR:
 * - Modal overlay (semi-transparent)
 * - Center-positioned popup
 * - Professional heading + product bullets
 *
 * RULE:
 * - Visual structure only (no cart/WhatsApp logic yet)
 * - Placeholder for product rendering
 */

import { colors, spacing, typography, borders, shadows } from '../design';

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2000,
    backdropFilter: 'blur(4px)',
  },

  modal: {
    background: colors.bg,
    borderRadius: '8px',
    boxShadow: shadows.xl,
    width: '90%',
    maxWidth: '600px',
    maxHeight: '80vh',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    border: borders.thin,
  },

  header: {
    padding: spacing.lg,
    borderBottom: `1px solid ${colors.border}`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  headerTitle: {
    fontSize: typography.display.fontSize,
    fontWeight: 300,
    margin: 0,
    color: colors.textPrimary,
    letterSpacing: '2px',
  },

  closeButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '28px',
    color: colors.textPrimary,
    padding: 0,
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'color 150ms ease',

    '&:hover': {
      color: colors.gold,
    },
  },

  content: {
    flex: 1,
    overflowY: 'auto',
    padding: spacing.lg,
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.md,
  },

  emptyState: {
    textAlign: 'center',
    padding: spacing.xxxl,
    color: colors.textSecondary,
  },

  emptyStateText: {
    fontSize: typography.body.fontSize,
    margin: 0,
  },

  productItem: {
    padding: spacing.md,
    border: borders.thin,
    borderRadius: '4px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    transition: 'all 150ms ease',

    '&:hover': {
      background: colors.bg,
      borderColor: colors.gold,
    },
  },

  productInfo: {
    flex: 1,
  },

  productName: {
    fontSize: typography.body.fontSize,
    color: colors.textPrimary,
    margin: 0,
    fontWeight: 500,
  },

  productPrice: {
    fontSize: typography.small.fontSize,
    color: colors.textSecondary,
    margin: `${spacing.xs} 0 0 0`,
  },

  footer: {
    padding: spacing.lg,
    borderTop: `1px solid ${colors.border}`,
    display: 'flex',
    gap: spacing.md,
  },

  button: {
    flex: 1,
    padding: `${spacing.md} ${spacing.lg}`,
    border: 'none',
    borderRadius: '4px',
    fontSize: typography.small.fontSize,
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 200ms ease',
    letterSpacing: '0.5px',
  },

  whatsappButton: {
    background: colors.gold,
    color: '#FFFFFF',
    boxShadow: shadows.sm,

    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: shadows.md,
    },
  },

  cancelButton: {
    background: 'transparent',
    border: borders.thin,
    color: colors.textPrimary,

    '&:hover': {
      background: colors.border,
    },
  },
};

export default function CartDrawer({ isOpen = false, onClose, cartItems = [] }) {
  if (!isOpen) return null;

  return (
    <div style={styles.overlay} onClick={onClose} role="button" tabIndex={0}>
      <div
        style={styles.modal}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div style={styles.header}>
          <h2 style={styles.headerTitle}>Your Selection</h2>
          <button
            style={styles.closeButton}
            onClick={onClose}
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div style={styles.content}>
          {cartItems.length === 0 ? (
            <div style={styles.emptyState}>
              <p style={styles.emptyStateText}>
                No items selected yet.
              </p>
              <p style={styles.emptyStateText}>
                Browse our collections to get started.
              </p>
            </div>
          ) : (
            cartItems.map((item, idx) => (
              <div key={idx} style={styles.productItem}>
                <div style={styles.productInfo}>
                  <p style={styles.productName}>{item.name}</p>
                  <p style={styles.productPrice}>${item.price}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div style={styles.footer}>
          <button
            style={{ ...styles.button, ...styles.cancelButton }}
            onClick={onClose}
          >
            Continue Shopping
          </button>
          <button
            style={{ ...styles.button, ...styles.whatsappButton }}
            disabled={cartItems.length === 0}
            onClick={() => {
              // TODO: Implement WhatsApp send logic
            }}
          >
            Send via WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}
