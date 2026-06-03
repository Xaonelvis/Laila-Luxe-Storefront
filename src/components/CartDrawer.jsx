/**
 * LAILA LUXE
 * FILE: CartDrawer.jsx
 * PLACEMENT: src/components/CartDrawer.jsx  (REPLACE existing)
 *
 * FULL SPEC IMPLEMENTATION:
 * - Quantity controls per item (- qty +)
 * - Remove item button (x)
 * - Summary block: item count + total price
 * - WhatsApp message exactly per spec:
 *     Hi LAILA LUXE TEAM, I would like to order:
 *     - Item xQty -- Total line price
 *     Total: UGX XXXX
 *     Please confirm availability, payment methods and delivery
 */

import { APP_CONFIG } from '../config/appConfig';
import { useCart } from '../context/CartContext';
import {
  colors,
  spacing,
  typography,
  borders,
  shadows,
  radius,
} from '../design';
import { formatUGX, parsePrice } from '../utils/constants';

const s = {
  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.42)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2000,
    backdropFilter: 'blur(4px)',
  },
  modal: {
    background: colors.surface,
    borderRadius: radius.lg,
    boxShadow: shadows.xl,
    width: '92%',
    maxWidth: '560px',
    maxHeight: '82vh',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    border: borders.thin,
  },
  header: {
    padding: `${spacing.md} ${spacing.lg}`,
    borderBottom: `1px solid ${colors.border}`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexShrink: 0,
  },
  headerLeft: { display: 'flex', alignItems: 'baseline', gap: spacing.sm },
  headerTitle: {
    fontSize: typography.h3.fontSize,
    fontWeight: 300,
    margin: 0,
    color: colors.textPrimary,
    letterSpacing: '2px',
  },
  headerCount: {
    fontSize: typography.micro.fontSize,
    color: colors.textSecondary,
    fontWeight: 500,
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '20px',
    color: colors.textPrimary,
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'inherit',
  },
  content: {
    flex: 1,
    overflowY: 'auto',
    padding: spacing.lg,
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.sm,
  },
  emptyState: {
    textAlign: 'center',
    padding: `${spacing.xxxl} ${spacing.lg}`,
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.sm,
    alignItems: 'center',
  },
  emptyIcon: { fontSize: '32px', opacity: 0.25 },
  emptyText: {
    fontSize: typography.body.fontSize,
    color: colors.textSecondary,
    margin: 0,
  },
  emptySubText: {
    fontSize: typography.small.fontSize,
    color: colors.textMuted,
    margin: 0,
  },
  itemRow: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    border: borders.thin,
    borderRadius: radius.md,
    background: colors.mutedSurface,
  },
  itemInfo: { flex: 1, minWidth: 0 },
  itemName: {
    fontSize: typography.small.fontSize,
    fontWeight: 500,
    color: colors.textPrimary,
    margin: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  itemLinePrice: {
    fontSize: typography.micro.fontSize,
    color: colors.gold,
    fontWeight: 600,
    margin: `${spacing.xs} 0 0`,
  },
  eachNote: {
    fontWeight: 400,
    color: colors.textMuted,
    marginLeft: spacing.xs,
  },
  qtyRow: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.xs,
    flexShrink: 0,
  },
  qtyBtn: {
    width: '28px',
    height: '28px',
    background: colors.surface,
    border: borders.thin,
    borderRadius: radius.sm,
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: colors.textPrimary,
    fontFamily: 'inherit',
    transition: 'all 120ms ease',
  },
  qtyNum: {
    minWidth: '28px',
    textAlign: 'center',
    fontSize: typography.small.fontSize,
    fontWeight: 600,
    color: colors.textPrimary,
  },
  removeBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: colors.textMuted,
    fontSize: '18px',
    padding: `0 ${spacing.xs}`,
    lineHeight: 1,
    flexShrink: 0,
    fontFamily: 'inherit',
  },
  summary: {
    marginTop: spacing.sm,
    padding: spacing.md,
    background: colors.bg,
    border: borders.thin,
    borderRadius: radius.md,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexShrink: 0,
  },
  summaryLeft: {
    fontSize: typography.small.fontSize,
    color: colors.textSecondary,
  },
  summaryTotal: {
    fontSize: typography.body.fontSize,
    fontWeight: 700,
    color: colors.textPrimary,
  },
  footer: {
    padding: spacing.lg,
    borderTop: `1px solid ${colors.border}`,
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.sm,
    flexShrink: 0,
  },
  cancelBtn: {
    width: '100%',
    padding: `${spacing.sm} ${spacing.md}`,
    background: 'transparent',
    border: borders.thin,
    borderRadius: radius.md,
    color: colors.textSecondary,
    fontSize: typography.small.fontSize,
    fontWeight: 500,
    cursor: 'pointer',
    fontFamily: 'inherit',
    transition: 'all 200ms ease',
  },
  waBtn: {
    width: '100%',
    padding: spacing.md,
    background: colors.gold,
    border: 'none',
    borderRadius: radius.md,
    color: '#FFFFFF',
    fontSize: typography.small.fontSize,
    fontWeight: 700,
    cursor: 'pointer',
    letterSpacing: '0.5px',
    fontFamily: 'inherit',
    transition: 'all 200ms ease',
    boxShadow: shadows.sm,
  },
};

export default function CartDrawer({ isOpen = false, onClose }) {
  const { cartItems, removeItem, updateQuantity, cartCount, cartTotal } =
    useCart();

  if (!isOpen) return null;

  const handleWhatsApp = () => {
    const lines = cartItems
      .map((item) => {
        const unit = parsePrice(item.price);
        const lineTotal =
          unit > 0
            ? formatUGX(unit * item.quantity)
            : item.price || 'Enquire for price';
        return `- ${item.name} x${item.quantity} -- ${lineTotal}`;
      })
      .join('\n');

    const total = cartTotal > 0 ? formatUGX(cartTotal) : 'To be confirmed';

    const message = `Hi LUXE team,\n\nI would like to order:\n\n${lines}\n\nTotal: ${total}\n\nPlease confirm availability, payment methods and delivery`;

    window.open(
      `https://wa.me/${APP_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`,
      '_blank',
    );
  };

  return (
    <div style={s.overlay} onClick={onClose}>
      <div
        style={s.modal}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div style={s.header}>
          <div style={s.headerLeft}>
            <h2 style={s.headerTitle}>Your Selection</h2>
            {cartCount > 0 && (
              <span style={s.headerCount}>
                {cartCount} {cartCount === 1 ? 'item' : 'items'}
              </span>
            )}
          </div>
          <button style={s.closeBtn} onClick={onClose} aria-label="Close">
            x
          </button>
        </div>

        {/* Item list */}
        <div style={s.content}>
          {cartItems.length === 0 ? (
            <div style={s.emptyState}>
              <div style={s.emptyIcon}>🛍</div>
              <p style={s.emptyText}>No items selected yet.</p>
              <p style={s.emptySubText}>
                Browse our collections to get started.
              </p>
            </div>
          ) : (
            <>
              {cartItems.map((item) => {
                const unit = parsePrice(item.price);
                const lineTotal =
                  unit > 0 ? formatUGX(unit * item.quantity) : item.price;
                return (
                  <div key={item.id} style={s.itemRow}>
                    <div style={s.itemInfo}>
                      <p style={s.itemName}>{item.name}</p>
                      {lineTotal && (
                        <p style={s.itemLinePrice}>
                          {lineTotal}
                          {item.quantity > 1 && unit > 0 && (
                            <span style={s.eachNote}>
                              ({formatUGX(unit)} each)
                            </span>
                          )}
                        </p>
                      )}
                    </div>

                    {/* Qty controls */}
                    <div style={s.qtyRow}>
                      <button
                        style={s.qtyBtn}
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                      >
                        -
                      </button>
                      <span style={s.qtyNum}>{item.quantity}</span>
                      <button
                        style={s.qtyBtn}
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>

                    <button
                      style={s.removeBtn}
                      onClick={() => removeItem(item.id)}
                      aria-label={`Remove ${item.name}`}
                    >
                      x
                    </button>
                  </div>
                );
              })}

              {/* Summary block */}
              <div style={s.summary}>
                <span style={s.summaryLeft}>
                  {cartCount} {cartCount === 1 ? 'item' : 'items'} selected
                </span>
                <span style={s.summaryTotal}>
                  {cartTotal > 0 ? formatUGX(cartTotal) : '-'}
                </span>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div style={s.footer}>
          <button style={s.cancelBtn} onClick={onClose}>
            Continue Shopping
          </button>
          <button
            style={{
              ...s.waBtn,
              ...(cartItems.length === 0
                ? { opacity: 0.4, cursor: 'not-allowed' }
                : {}),
            }}
            disabled={cartItems.length === 0}
            onClick={handleWhatsApp}
          >
            Order via WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}
