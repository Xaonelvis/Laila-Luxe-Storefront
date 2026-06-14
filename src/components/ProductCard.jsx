/**
 * LAILA LUXE
 * FILE: ProductCard.jsx
 * PLACEMENT: src/components/ProductCard.jsx  (REPLACE — full clean version)
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { APP_CONFIG } from '../config/appConfig';
import {
  colors,
  spacing,
  typography,
  shadows,
  radius,
  borders,
} from '../design';
import { useCart } from '../context/CartContext';
import { FALLBACK_IMAGE } from '../utils/constants';
import ProductDetailModal from './ProductDetailModal';
import PhotoGalleryModal from './PhotoGalleryModal';
import CategoryModal from './CategoryModal';
import { useWishlist } from '../context/WishlistContext';

const styles = {
  card: {
    background: colors.surface,
    border: borders.thin,
    borderRadius: radius.lg,
    boxShadow: shadows.sm,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    cursor: 'pointer',
    transition: 'box-shadow 200ms ease',
  },
  mediaWrap: {
    position: 'relative',
    overflow: 'hidden',
    background: colors.mutedSurface,
    aspectRatio: '4 / 5',
    cursor: 'pointer',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
    transition: 'transform 400ms ease',
  },
  galleryHint: {
    position: 'absolute',
    bottom: spacing.sm,
    right: spacing.sm,
    background: 'rgba(0,0,0,0.48)',
    color: '#FFFFFF',
    fontSize: '10px',
    fontWeight: 600,
    letterSpacing: '1px',
    padding: `3px ${spacing.sm}`,
    borderRadius: '999px',
    backdropFilter: 'blur(4px)',
    pointerEvents: 'none',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.sm,
    padding: spacing.md,
    flex: 1,
  },
  metaRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
    flexWrap: 'wrap',
  },
  pill: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: `${spacing.xs} ${spacing.sm}`,
    borderRadius: '999px',
    background: colors.mutedSurface,
    color: colors.textSecondary,
    border: borders.thin,
    fontSize: typography.micro.fontSize,
    fontWeight: 500,
    letterSpacing: '0.2px',
    cursor: 'pointer',
    transition: 'all 150ms ease',
  },
  price: {
    margin: 0,
    color: colors.gold,
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: '20px',
    fontWeight: 400,
    letterSpacing: '1.5px',
  },
  title: {
    margin: 0,
    color: colors.textPrimary,
    fontSize: typography.h3.fontSize,
    lineHeight: typography.h3.lineHeight,
    fontWeight: typography.h3.fontWeight,
  },
  description: {
    margin: 0,
    color: colors.textSecondary,
    fontSize: typography.body.fontSize,
    lineHeight: typography.body.lineHeight,
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  footer: {
    marginTop: 'auto',
    paddingTop: spacing.sm,
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.sm,
  },
  actionRow: {
    display: 'flex',
    gap: spacing.xs,
    flexWrap: 'wrap',
  },
  quickBtn: {
    flex: '1 1 auto',
    minWidth: '0',
    padding: `${spacing.xs} ${spacing.xs}`,
    background: 'transparent',
    border: borders.thin,
    borderRadius: radius.sm,
    color: colors.textSecondary,
    fontSize: typography.micro.fontSize,
    fontWeight: 500,
    cursor: 'pointer',
    fontFamily: 'inherit',
    letterSpacing: '0.3px',
    transition: 'all 150ms ease',
    whiteSpace: 'nowrap',
  },
  addBtn: {
    padding: `${spacing.xs} ${spacing.xs}`,
    background: 'transparent',
    border: `1px solid ${colors.gold}`,
    borderRadius: radius.sm,
    color: colors.gold,
    fontSize: typography.micro.fontSize,
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: 'inherit',
    letterSpacing: '0.3px',
    transition: 'all 150ms ease',
    whiteSpace: 'nowrap',
    flex: '1 1 auto',
  },
  addBtnInCart: {
    whiteSpace: 'nowrap',
    flex: '1 1 auto',
    padding: `${spacing.xs} ${spacing.xs}`,
    background: colors.mutedSurface,
    border: borders.thin,
    borderRadius: radius.sm,
    color: colors.textSecondary,
    fontSize: typography.micro.fontSize,
    fontWeight: 500,
    cursor: 'default',
    fontFamily: 'inherit',
  },
  cta: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    minHeight: '44px',
    padding: `0 ${spacing.md}`,
    background: colors.gold,
    color: '#FFFFFF',
    borderRadius: radius.md,
    textDecoration: 'none',
    border: 'none',
    fontSize: typography.small.fontSize,
    fontWeight: 600,
    letterSpacing: '0.2px',
    boxShadow: shadows.sm,
    cursor: 'pointer',
    boxSizing: 'border-box',
  },
};

export default function ProductCard({ product, onCategoryClick }) {
  const [imageError, setImageError] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [detailTab, setDetailTab] = useState('Details');
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [catModalOpen, setCatModalOpen] = useState(false);
  const { addItem, cartItems } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(product.id);
  const isInCart = cartItems.some((i) => i.id === product.id);

  const openDetail = (tab = 'Details') => {
    setDetailTab(tab);
    setDetailOpen(true);
  };

  const handleCategoryClick = (e) => {
    e.stopPropagation();
    if (onCategoryClick) {
      onCategoryClick(product.category);
    } else {
      setCatModalOpen(true);
    }
  };

  const whatsappMessage =
    product?.whatsappMessage?.trim() ||
    `Hi LAILA LUXE, I would like to order ${product?.name || 'this item'}.`;
  const whatsappLink = `https://wa.me/${APP_CONFIG.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  const showCategory = Boolean(product?.category);
  const showPrice =
    product?.price !== undefined &&
    product?.price !== null &&
    `${product.price}`.trim() !== '';

  return (
    <>
      <motion.article
        id={`product-${product.id}`}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -4, boxShadow: shadows.md }}
        whileTap={{ scale: 0.99 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        style={styles.card}
        onClick={() => openDetail('Details')}
      >
        {/* Image — click opens gallery */}
        <div
          style={styles.mediaWrap}
          onClick={(e) => {
            e.stopPropagation();
            setGalleryOpen(true);
          }}
        >
          <img
            src={imageError ? FALLBACK_IMAGE : product.image}
            alt={product.name || 'Product image'}
            loading="lazy"
            decoding="async"
            onError={() => setImageError(true)}
            style={styles.image}
          />
          <span style={styles.galleryHint}>VIEW PHOTOS</span>
        </div>

        {/* Content */}
        <div style={styles.content}>
          <div style={styles.metaRow}>
            {showCategory ? (
              <span
                style={styles.pill}
                onClick={handleCategoryClick}
                title={`Browse all ${product.category} items`}
              >
                {product.category}
              </span>
            ) : (
              <span />
            )}
            {showPrice && (
              <span className="price">{product.price.toLocaleString()}</span>
            )}
          </div>

          <h3 style={styles.title}>{product.name}</h3>

          {product.description && (
            <p style={styles.description}>{product.description}</p>
          )}

          <div style={styles.footer}>
            {/* Quick actions */}
            <div style={styles.actionRow}>
              <button
                style={styles.quickBtn}
                onClick={(e) => {
                  e.stopPropagation();
                  openDetail('Details');
                }}
              >
                Details
              </button>
              <button
                style={styles.quickBtn}
                onClick={(e) => {
                  e.stopPropagation();
                  openDetail('Share');
                }}
              >
                Share
              </button>
              <button
                style={{
                  ...styles.quickBtn,
                  flex: '1 1 auto',
                  whiteSpace: 'nowrap',
                  color: wishlisted ? colors.gold : colors.textSecondary,
                  borderColor: wishlisted ? colors.gold : colors.border,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist(product);
                }}
                title={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                {wishlisted ? '♥' : '♡'}
              </button>

              <button
                style={isInCart ? styles.addBtnInCart : styles.addBtn}
                disabled={isInCart}
                onClick={(e) => {
                  e.stopPropagation();
                  addItem(product);
                }}
              >
                {isInCart ? '✓ Added' : '+ Add'}
              </button>
            </div>

            {/* Primary CTA */}
            <motion.a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              aria-label={`Order ${product.name} on WhatsApp`}
              onClick={(e) => e.stopPropagation()}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.18 }}
              style={styles.cta}
            >
              Order via WhatsApp
            </motion.a>
          </div>
        </div>
      </motion.article>

      {/* Modals */}
      <ProductDetailModal
        product={product}
        isOpen={detailOpen}
        onClose={() => setDetailOpen(false)}
        initialTab={detailTab}
      />

      <PhotoGalleryModal
        product={product}
        isOpen={galleryOpen}
        onClose={() => setGalleryOpen(false)}
      />

      {!onCategoryClick && (
        <CategoryModal
          category={product.category}
          isOpen={catModalOpen}
          onClose={() => setCatModalOpen(false)}
        />
      )}
    </>
  );
}
