/**
 * LAILA LUXE
 * FILE: ProductDetailModal.jsx
 * PLACEMENT: src/components/ProductDetailModal.jsx  (REPLACE)
 *
 * FIX: Removed the useEffect that reset state on open.
 * With AnimatePresence conditional rendering, the component fully unmounts
 * when closed and remounts when opened — so useState(initialTab) resets
 * automatically on each open. The useEffect was redundant and triggered
 * the ESLint set-state-in-effect error.
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  colors,
  spacing,
  typography,
  shadows,
  radius,
  borders,
} from '../design';
import { useCart } from '../context/CartContext';
import { APP_CONFIG } from '../config/appConfig';
import { useWindowWidth } from '../hooks/useWindowWidth';
import { FALLBACK_IMAGE } from '../utils/constants';

const TABS = ['Details', 'Share'];

export default function ProductDetailModal({
  product,
  isOpen,
  onClose,
  initialTab = 'Details',
}) {
  // useState(initialTab) resets on every mount — no useEffect needed.
  // The component unmounts when isOpen becomes false (AnimatePresence).
  const [activeTab, setActiveTab] = useState(initialTab);
  const [imgError, setImgError] = useState(false);
  const [copied, setCopied] = useState(false);
  const { addItem, cartItems } = useCart();
  const width = useWindowWidth();
  const isMobile = width <= 768;

  if (!product) return null;

  const isInCart = cartItems.some((i) => i.id === product.id);

  const whatsappMsg =
    product.whatsappMessage?.trim() ||
    `Hi LAILA LUXE, I would like to order ${product.name}.`;
  const whatsappLink = `https://wa.me/${APP_CONFIG.whatsappNumber}?text=${encodeURIComponent(whatsappMsg)}`;

  const handleCopy = async () => {
    const text = `${product.name}${product.price ? ` — ${product.price}` : ''} | LAILA LUXE`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      /* clipboard unavailable */
    }
  };

  const handleWhatsAppShare = () => {
    const text = `I found something at LAILA LUXE you'd love!\n\n*${product.name}*${product.price ? ` — ${product.price}` : ''}\n${product.description || ''}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="detail-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.52)',
            zIndex: 2200,
            display: 'flex',
            alignItems: isMobile ? 'flex-end' : 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(4px)',
            padding: isMobile ? 0 : spacing.lg,
            boxSizing: 'border-box',
          }}
        >
          <motion.div
            key="detail-modal"
            initial={{
              opacity: 0,
              y: isMobile ? 80 : 24,
              scale: isMobile ? 1 : 0.96,
            }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{
              opacity: 0,
              y: isMobile ? 80 : 16,
              scale: isMobile ? 1 : 0.96,
            }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: colors.surface,
              borderRadius: isMobile
                ? `${radius.xl} ${radius.xl} 0 0`
                : radius.lg,
              boxShadow: shadows.xl,
              width: isMobile ? '100%' : '85%',
              maxWidth: '900px',
              maxHeight: isMobile ? '92vh' : '86vh',
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            {/* Close */}
            <button
              onClick={onClose}
              aria-label="Close"
              style={{
                position: 'absolute',
                top: spacing.md,
                right: spacing.md,
                zIndex: 10,
                background: 'rgba(255,255,255,0.92)',
                border: borders.thin,
                borderRadius: '50%',
                width: '34px',
                height: '34px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: '15px',
                color: colors.textPrimary,
                fontFamily: 'inherit',
              }}
            >
              ✕
            </button>

            {/* Image panel */}
            <div
              style={{
                width: isMobile ? '100%' : '42%',
                minHeight: isMobile ? '220px' : 'auto',
                background: colors.mutedSurface,
                flexShrink: 0,
                overflow: 'hidden',
              }}
            >
              <img
                src={imgError ? FALLBACK_IMAGE : product.image}
                alt={product.name}
                onError={() => setImgError(true)}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  minHeight: isMobile ? '220px' : '100%',
                }}
              />
            </div>

            {/* Info panel */}
            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                minWidth: 0,
              }}
            >
              {/* Scrollable body */}
              <div
                style={{
                  flex: 1,
                  overflowY: 'auto',
                  padding: spacing.lg,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: spacing.md,
                }}
              >
                {/* Category + Price */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  {product.category && (
                    <span
                      style={{
                        fontSize: typography.micro.fontSize,
                        fontWeight: 500,
                        color: colors.textSecondary,
                        background: colors.mutedSurface,
                        border: borders.thin,
                        borderRadius: '999px',
                        padding: `${spacing.xs} ${spacing.sm}`,
                        letterSpacing: '0.4px',
                        textTransform: 'uppercase',
                      }}
                    >
                      {product.category}
                    </span>
                  )}
                  {product.price && (
                    <span
                      style={{
                        fontSize: typography.body.fontSize,
                        fontWeight: 700,
                        color: colors.gold,
                      }}
                    >
                      {product.price}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h2
                  style={{
                    margin: 0,
                    fontSize: typography.h2.fontSize,
                    lineHeight: typography.h2.lineHeight,
                    fontWeight: typography.h2.fontWeight,
                    color: colors.textPrimary,
                  }}
                >
                  {product.name}
                </h2>

                {/* Tab bar */}
                <div
                  style={{
                    display: 'flex',
                    borderBottom: `1px solid ${colors.border}`,
                    gap: spacing.lg,
                  }}
                >
                  {TABS.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      style={{
                        background: 'none',
                        border: 'none',
                        borderBottom:
                          activeTab === tab
                            ? `2px solid ${colors.gold}`
                            : '2px solid transparent',
                        marginBottom: '-1px',
                        padding: `${spacing.sm} 0`,
                        cursor: 'pointer',
                        fontSize: typography.small.fontSize,
                        fontWeight: activeTab === tab ? 600 : 400,
                        color:
                          activeTab === tab
                            ? colors.textPrimary
                            : colors.textSecondary,
                        letterSpacing: '0.3px',
                        transition: 'all 150ms ease',
                        fontFamily: 'inherit',
                      }}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Details tab */}
                {activeTab === 'Details' && (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: spacing.lg,
                    }}
                  >
                    <p
                      style={{
                        fontSize: typography.body.fontSize,
                        lineHeight: typography.body.lineHeight,
                        color: colors.textSecondary,
                        margin: 0,
                      }}
                    >
                      {product.description || 'No description available.'}
                    </p>
                    <div
                      style={{
                        borderTop: `1px solid ${colors.border}`,
                        paddingTop: spacing.md,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: spacing.sm,
                      }}
                    >
                      {[
                        ['Category', product.category],
                        ['Availability', 'In Stock'],
                        [
                          'Delivery',
                          'Kampala: 1-2 days · Nationwide: 3-5 days',
                        ],
                        ['Payment', 'MTN · Airtel · Visa · Mastercard'],
                      ]
                        .filter(([, v]) => v)
                        .map(([label, value]) => (
                          <div
                            key={label}
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              gap: spacing.md,
                              fontSize: typography.small.fontSize,
                            }}
                          >
                            <span
                              style={{
                                color: colors.textMuted,
                                fontWeight: 500,
                                flexShrink: 0,
                              }}
                            >
                              {label}
                            </span>
                            <span
                              style={{
                                color: colors.textPrimary,
                                textAlign: 'right',
                              }}
                            >
                              {value}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* Share tab */}
                {activeTab === 'Share' && (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: spacing.md,
                    }}
                  >
                    <p
                      style={{
                        fontSize: typography.small.fontSize,
                        color: colors.textSecondary,
                        margin: 0,
                      }}
                    >
                      Share this piece with someone who'd appreciate it.
                    </p>
                    <button
                      onClick={handleCopy}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: spacing.sm,
                        padding: `${spacing.sm} ${spacing.md}`,
                        border: borders.thin,
                        borderRadius: radius.sm,
                        background: copied
                          ? colors.mutedSurface
                          : colors.surface,
                        borderColor: copied ? colors.gold : colors.border,
                        color: copied ? colors.gold : colors.textPrimary,
                        cursor: 'pointer',
                        fontSize: typography.small.fontSize,
                        fontFamily: 'inherit',
                        fontWeight: 500,
                        transition: 'all 180ms ease',
                      }}
                    >
                      {copied
                        ? '✓ Copied to clipboard'
                        : '⎘  Copy product info'}
                    </button>
                    <button
                      onClick={handleWhatsAppShare}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: spacing.sm,
                        padding: `${spacing.sm} ${spacing.md}`,
                        border: `1px solid #25D366`,
                        borderRadius: radius.sm,
                        background: colors.surface,
                        color: '#128C7E',
                        cursor: 'pointer',
                        fontSize: typography.small.fontSize,
                        fontFamily: 'inherit',
                        fontWeight: 500,
                        transition: 'all 180ms ease',
                      }}
                    >
                      ↗ Share on WhatsApp
                    </button>
                  </div>
                )}
              </div>

              {/* Persistent footer CTAs */}
              <div
                style={{
                  padding: spacing.lg,
                  borderTop: `1px solid ${colors.border}`,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: spacing.sm,
                  background: colors.surface,
                  flexShrink: 0,
                }}
              >
                <button
                  onClick={() => addItem(product)}
                  disabled={isInCart}
                  style={{
                    width: '100%',
                    padding: `${spacing.sm} ${spacing.md}`,
                    background: isInCart ? colors.mutedSurface : 'transparent',
                    border: `1px solid ${isInCart ? colors.border : colors.gold}`,
                    borderRadius: radius.md,
                    color: isInCart ? colors.textSecondary : colors.gold,
                    fontSize: typography.small.fontSize,
                    fontWeight: 600,
                    cursor: isInCart ? 'default' : 'pointer',
                    fontFamily: 'inherit',
                    letterSpacing: '0.3px',
                    transition: 'all 200ms ease',
                  }}
                >
                  {isInCart ? '✓ Added to Selection' : '+ Add to Selection'}
                </button>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    padding: spacing.md,
                    background: colors.gold,
                    color: '#FFFFFF',
                    borderRadius: radius.md,
                    textDecoration: 'none',
                    fontSize: typography.small.fontSize,
                    fontWeight: 700,
                    letterSpacing: '0.4px',
                    boxSizing: 'border-box',
                  }}
                >
                  Order on WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
