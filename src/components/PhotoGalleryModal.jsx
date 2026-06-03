/**
 * LAILA LUXE
 * FILE: PhotoGalleryModal.jsx
 * PLACEMENT: src/components/PhotoGalleryModal.jsx  (NEW FILE)
 *
 * PURPOSE:
 * Image gallery popup. Opens when a product image is clicked.
 *
 * FEATURES:
 * - Three view modes toggled from top bar:
 *     Grid (default) | Horizontal scroll | List (vertical stack)
 * - Products currently have one image (product.image).
 *   Built to support product.images[] array when added.
 *   Falls back to [product.image] if images array not present.
 * - Persistent footer CTAs on every view: Add to Selection + Order on WhatsApp
 *
 * PROPS:
 * - product: object
 * - isOpen: boolean
 * - onClose: () => void
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
import { FALLBACK_IMAGE } from '../utils/constants';

// View mode definitions — label is the toggle button text
const VIEWS = [
  { id: 'grid', label: '⊞', title: 'Grid view' },
  { id: 'horizontal', label: '⇌', title: 'Horizontal scroll' },
  { id: 'list', label: '≡', title: 'List view' },
];

export default function PhotoGalleryModal({ product, isOpen, onClose }) {
  const [viewMode, setViewMode] = useState('grid');
  const [activeIdx, setActiveIdx] = useState(0);
  const [imgErrors, setImgErrors] = useState({});
  const { addItem, cartItems } = useCart();

  if (!product) return null;

  // Support future product.images[] — for now defaults to single image array
  const images =
    Array.isArray(product.images) && product.images.length > 0
      ? product.images
      : product.image
        ? [product.image]
        : [];

  const isInCart = cartItems.some((i) => i.id === product.id);

  const imgSrc = (src, idx) => (imgErrors[idx] ? FALLBACK_IMAGE : src);
  const handleImgError = (idx) =>
    setImgErrors((prev) => ({ ...prev, [idx]: true }));

  const whatsappMsg =
    product.whatsappMessage?.trim() ||
    `Hi LAILA LUXE, I would like to order ${product.name}.`;
  const whatsappLink = `https://wa.me/${APP_CONFIG.whatsappNumber}?text=${encodeURIComponent(whatsappMsg)}`;

  // ── Image layout styles per view mode ──────────────────────────────────────
  const containerStyle = (() => {
    switch (viewMode) {
      case 'list':
        return { display: 'flex', flexDirection: 'column', gap: spacing.md };
      case 'horizontal':
        return {
          display: 'flex',
          flexDirection: 'row',
          gap: spacing.md,
          overflowX: 'auto',
          paddingBottom: spacing.xs,
          scrollSnapType: 'x mandatory',
        };
      default: // grid
        return {
          display: 'grid',
          gridTemplateColumns: images.length === 1 ? '1fr' : 'repeat(2, 1fr)',
          gap: spacing.md,
        };
    }
  })();

  const imageStyle = (() => {
    switch (viewMode) {
      case 'list':
        return {
          width: '100%',
          aspectRatio: '16 / 7',
          objectFit: 'cover',
          borderRadius: radius.sm,
          display: 'block',
        };
      case 'horizontal':
        return {
          width: '260px',
          height: '340px',
          flexShrink: 0,
          objectFit: 'cover',
          borderRadius: radius.sm,
          display: 'block',
          scrollSnapAlign: 'start',
        };
      default: // grid
        return {
          width: '100%',
          aspectRatio: images.length === 1 ? '4 / 5' : '1 / 1',
          objectFit: 'cover',
          borderRadius: radius.sm,
          display: 'block',
        };
    }
  })();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="gallery-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.88)',
            zIndex: 2400,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: spacing.md,
            boxSizing: 'border-box',
          }}
        >
          <motion.div
            key="gallery-modal"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: colors.surface,
              borderRadius: radius.lg,
              boxShadow: shadows.xl,
              width: '96%',
              maxWidth: '740px',
              maxHeight: '90vh',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            {/* ── Top bar ─────────────────────────────────────────── */}
            <div
              style={{
                padding: `${spacing.sm} ${spacing.lg}`,
                borderBottom: `1px solid ${colors.border}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: spacing.md,
                flexShrink: 0,
              }}
            >
              {/* Product name */}
              <span
                style={{
                  fontSize: typography.small.fontSize,
                  fontWeight: 600,
                  color: colors.textPrimary,
                  letterSpacing: '0.3px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {product.name}
              </span>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: spacing.sm,
                  flexShrink: 0,
                }}
              >
                {/* View mode toggles */}
                <div
                  style={{
                    display: 'flex',
                    border: borders.thin,
                    borderRadius: radius.sm,
                    overflow: 'hidden',
                  }}
                >
                  {VIEWS.map((v, i) => (
                    <button
                      key={v.id}
                      title={v.title}
                      onClick={() => setViewMode(v.id)}
                      style={{
                        background:
                          viewMode === v.id ? colors.gold : 'transparent',
                        color:
                          viewMode === v.id ? '#FFFFFF' : colors.textSecondary,
                        border: 'none',
                        borderRight:
                          i < VIEWS.length - 1 ? borders.thin : 'none',
                        padding: `${spacing.xs} ${spacing.sm}`,
                        cursor: 'pointer',
                        fontSize: '15px',
                        width: '34px',
                        height: '30px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 150ms ease',
                        fontFamily: 'inherit',
                      }}
                    >
                      {v.label}
                    </button>
                  ))}
                </div>

                {/* Close */}
                <button
                  onClick={onClose}
                  style={{
                    background: 'none',
                    border: borders.thin,
                    borderRadius: '50%',
                    width: '30px',
                    height: '30px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    fontSize: '13px',
                    color: colors.textPrimary,
                    fontFamily: 'inherit',
                  }}
                >
                  ✕
                </button>
              </div>
            </div>

            {/* ── Gallery area ─────────────────────────────────────── */}
            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                overflowX: 'hidden',
                padding: spacing.lg,
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={viewMode}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  style={containerStyle}
                >
                  {images.length > 0 ? (
                    images.map((src, idx) => (
                      <div
                        key={idx}
                        onClick={() => setActiveIdx(idx)}
                        style={{
                          cursor: 'pointer',
                          borderRadius: radius.sm,
                          overflow: 'hidden',
                          border:
                            activeIdx === idx
                              ? `2px solid ${colors.gold}`
                              : '2px solid transparent',
                          transition: 'border-color 150ms ease',
                          flexShrink: viewMode === 'horizontal' ? 0 : undefined,
                        }}
                      >
                        <img
                          src={imgSrc(src, idx)}
                          alt={`${product.name} — photo ${idx + 1}`}
                          onError={() => handleImgError(idx)}
                          style={imageStyle}
                        />
                      </div>
                    ))
                  ) : (
                    <img
                      src={FALLBACK_IMAGE}
                      alt={product.name}
                      style={imageStyle}
                    />
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Image count indicator */}
              {images.length > 1 && (
                <p
                  style={{
                    textAlign: 'center',
                    marginTop: spacing.md,
                    fontSize: typography.micro.fontSize,
                    color: colors.textMuted,
                    letterSpacing: '1px',
                  }}
                >
                  {activeIdx + 1} / {images.length}
                </p>
              )}
            </div>

            {/* ── Persistent footer CTAs ────────────────────────────── */}
            <div
              style={{
                padding: spacing.lg,
                borderTop: `1px solid ${colors.border}`,
                display: 'flex',
                flexDirection: 'column',
                gap: spacing.sm,
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
