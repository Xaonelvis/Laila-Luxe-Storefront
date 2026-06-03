/**
 * LAILA LUXE
 * FILE: CategoryModal.jsx
 * PLACEMENT: src/components/CategoryModal.jsx  (NEW FILE)
 *
 * PURPOSE:
 * Full-screen category browsing modal — "a curated shopping lens, not a filter UI."
 * Opens from CategoryFilter pills on the homepage OR category pill on product cards.
 *
 * FEATURES:
 * - Header: category name + description + close button
 * - Category switcher strip: switch categories without closing modal
 * - View mode controls: Grid (default) | List | Featured
 * - View transitions: smooth fade (no layout jumps)
 * - Content: all products for active category in selected view
 * - Footer: "Back to all products" link
 * - Clicking any product opens ProductDetailModal inside this modal
 * - No page reload, no navigation — stays in homepage context
 *
 * PROPS:
 * - category: string — initial category to display
 * - isOpen: boolean
 * - onClose: () => void
 * - onCategoryChange: (cat: string) => void — syncs with homepage filter
 */

import { useState, useEffect } from 'react';
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
import { products as allProducts } from '../data/products';
import ProductDetailModal from './ProductDetailModal';

// ── Category metadata ─────────────────────────────────────────────────────────
const CATEGORY_META = {
  home: {
    label: 'Home',
    description: 'Curated pieces for the discerning home.',
  },
  fashion: {
    label: 'Fashion',
    description: 'Premium everyday fashion pieces.',
  },
  lifestyle: {
    label: 'Lifestyle',
    description: 'Elevated lifestyle essentials.',
  },
  accessories: {
    label: 'Accessories',
    description: 'Refined accessories for every occasion.',
  },
};

// All browsable categories (no "all" inside the modal — use close/back for that)
const CATEGORIES = Object.keys(CATEGORY_META);

// ── View mode definitions ─────────────────────────────────────────────────────
const VIEWS = [
  { id: 'grid', label: '⊞ Grid', title: 'Grid view' },
  { id: 'list', label: '≡ List', title: 'Compact list' },
  { id: 'featured', label: '◫ Featured', title: 'Featured view' },
];

// ── Mini card components for each view mode ───────────────────────────────────

function GridCard({ product, onSelect }) {
  const [imgErr, setImgErr] = useState(false);
  const { addItem, cartItems } = useCart();
  const isInCart = cartItems.some((i) => i.id === product.id);

  return (
    <div
      onClick={() => onSelect(product)}
      style={{
        background: colors.surface,
        border: borders.thin,
        borderRadius: radius.lg,
        overflow: 'hidden',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        transition: 'box-shadow 200ms ease, transform 200ms ease',
      }}
    >
      <div
        style={{
          aspectRatio: '4 / 5',
          background: colors.mutedSurface,
          overflow: 'hidden',
        }}
      >
        <img
          src={imgErr ? FALLBACK_IMAGE : product.image}
          alt={product.name}
          onError={() => setImgErr(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
      </div>
      <div
        style={{
          padding: spacing.md,
          display: 'flex',
          flexDirection: 'column',
          gap: spacing.xs,
          flex: 1,
        }}
      >
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
                color: colors.textSecondary,
                background: colors.mutedSurface,
                border: borders.thin,
                borderRadius: '999px',
                padding: `2px ${spacing.sm}`,
              }}
            >
              {product.category}
            </span>
          )}
          {product.price && (
            <span
              style={{
                fontSize: typography.small.fontSize,
                fontWeight: 700,
                color: colors.gold,
              }}
            >
              {product.price}
            </span>
          )}
        </div>
        <p
          style={{
            margin: 0,
            fontSize: typography.small.fontSize,
            fontWeight: 600,
            color: colors.textPrimary,
          }}
        >
          {product.name}
        </p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            addItem(product);
          }}
          style={{
            marginTop: 'auto',
            padding: `${spacing.xs} ${spacing.sm}`,
            background: isInCart ? colors.mutedSurface : 'transparent',
            border: `1px solid ${isInCart ? colors.border : colors.gold}`,
            borderRadius: radius.sm,
            color: isInCart ? colors.textSecondary : colors.gold,
            fontSize: typography.micro.fontSize,
            fontWeight: 600,
            cursor: isInCart ? 'default' : 'pointer',
            fontFamily: 'inherit',
          }}
        >
          {isInCart ? '✓ Added' : '+ Add'}
        </button>
      </div>
    </div>
  );
}

function ListCard({ product, onSelect }) {
  const [imgErr, setImgErr] = useState(false);
  const { addItem, cartItems } = useCart();
  const isInCart = cartItems.some((i) => i.id === product.id);

  const whatsappMsg =
    product.whatsappMessage?.trim() ||
    `Hi LAILA LUXE, I would like to order ${product.name}.`;
  const whatsappLink = `https://wa.me/${APP_CONFIG.whatsappNumber}?text=${encodeURIComponent(whatsappMsg)}`;

  return (
    <div
      style={{
        display: 'flex',
        gap: spacing.md,
        padding: spacing.md,
        border: borders.thin,
        borderRadius: radius.md,
        background: colors.surface,
        cursor: 'pointer',
        transition: 'border-color 150ms ease',
      }}
    >
      {/* Thumbnail */}
      <div
        onClick={() => onSelect(product)}
        style={{
          width: '80px',
          height: '80px',
          flexShrink: 0,
          borderRadius: radius.sm,
          overflow: 'hidden',
          background: colors.mutedSurface,
        }}
      >
        <img
          src={imgErr ? FALLBACK_IMAGE : product.image}
          alt={product.name}
          onError={() => setImgErr(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
      </div>

      {/* Info */}
      <div onClick={() => onSelect(product)} style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: spacing.xs,
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: typography.small.fontSize,
              fontWeight: 600,
              color: colors.textPrimary,
            }}
          >
            {product.name}
          </p>
          {product.price && (
            <span
              style={{
                fontSize: typography.small.fontSize,
                fontWeight: 700,
                color: colors.gold,
                flexShrink: 0,
                marginLeft: spacing.sm,
              }}
            >
              {product.price}
            </span>
          )}
        </div>
        {product.description && (
          <p
            style={{
              margin: 0,
              fontSize: typography.micro.fontSize,
              color: colors.textSecondary,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {product.description}
          </p>
        )}
      </div>

      {/* Actions */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: spacing.xs,
          flexShrink: 0,
          justifyContent: 'center',
        }}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            addItem(product);
          }}
          style={{
            padding: `${spacing.xs} ${spacing.sm}`,
            background: isInCart ? colors.mutedSurface : 'transparent',
            border: `1px solid ${isInCart ? colors.border : colors.gold}`,
            borderRadius: radius.sm,
            color: isInCart ? colors.textSecondary : colors.gold,
            fontSize: typography.micro.fontSize,
            fontWeight: 600,
            cursor: isInCart ? 'default' : 'pointer',
            fontFamily: 'inherit',
            whiteSpace: 'nowrap',
          }}
        >
          {isInCart ? '✓' : '+ Add'}
        </button>
        <a
          href={whatsappLink}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
          style={{
            display: 'block',
            padding: `${spacing.xs} ${spacing.sm}`,
            background: colors.gold,
            color: '#FFFFFF',
            borderRadius: radius.sm,
            textDecoration: 'none',
            fontSize: typography.micro.fontSize,
            fontWeight: 700,
            textAlign: 'center',
            whiteSpace: 'nowrap',
          }}
        >
          Order
        </a>
      </div>
    </div>
  );
}

function FeaturedCard({ product, onSelect }) {
  const [imgErr, setImgErr] = useState(false);
  const { addItem, cartItems } = useCart();
  const isInCart = cartItems.some((i) => i.id === product.id);

  const whatsappMsg =
    product.whatsappMessage?.trim() ||
    `Hi LAILA LUXE, I would like to order ${product.name}.`;
  const whatsappLink = `https://wa.me/${APP_CONFIG.whatsappNumber}?text=${encodeURIComponent(whatsappMsg)}`;

  return (
    <div
      style={{
        border: borders.thin,
        borderRadius: radius.xl,
        overflow: 'hidden',
        background: colors.surface,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Large image */}
      <div
        onClick={() => onSelect(product)}
        style={{
          width: '100%',
          aspectRatio: '16 / 9',
          background: colors.mutedSurface,
          overflow: 'hidden',
          cursor: 'pointer',
        }}
      >
        <img
          src={imgErr ? FALLBACK_IMAGE : product.image}
          alt={product.name}
          onError={() => setImgErr(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            transition: 'transform 400ms ease',
          }}
        />
      </div>

      {/* Rich info */}
      <div
        style={{
          padding: spacing.xl,
          display: 'flex',
          flexDirection: 'column',
          gap: spacing.md,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <div>
            {product.category && (
              <p
                style={{
                  margin: `0 0 ${spacing.xs}`,
                  fontSize: typography.micro.fontSize,
                  fontWeight: 700,
                  letterSpacing: '2px',
                  color: colors.gold,
                  textTransform: 'uppercase',
                }}
              >
                {product.category}
              </p>
            )}
            <h3
              onClick={() => onSelect(product)}
              style={{
                margin: 0,
                fontSize: typography.h3.fontSize,
                fontWeight: typography.h3.fontWeight,
                color: colors.textPrimary,
                cursor: 'pointer',
              }}
            >
              {product.name}
            </h3>
          </div>
          {product.price && (
            <span
              style={{
                fontSize: typography.h3.fontSize,
                fontWeight: 700,
                color: colors.gold,
                flexShrink: 0,
              }}
            >
              {product.price}
            </span>
          )}
        </div>

        {product.description && (
          <p
            style={{
              margin: 0,
              fontSize: typography.body.fontSize,
              color: colors.textSecondary,
              lineHeight: '1.6',
            }}
          >
            {product.description}
          </p>
        )}

        <div
          style={{ display: 'flex', gap: spacing.sm, marginTop: spacing.xs }}
        >
          <button
            onClick={() => addItem(product)}
            disabled={isInCart}
            style={{
              flex: 1,
              padding: spacing.sm,
              background: isInCart ? colors.mutedSurface : 'transparent',
              border: `1px solid ${isInCart ? colors.border : colors.gold}`,
              borderRadius: radius.md,
              color: isInCart ? colors.textSecondary : colors.gold,
              fontSize: typography.small.fontSize,
              fontWeight: 600,
              cursor: isInCart ? 'default' : 'pointer',
              fontFamily: 'inherit',
            }}
          >
            {isInCart ? '✓ Added to Selection' : '+ Add to Selection'}
          </button>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: spacing.sm,
              background: colors.gold,
              color: '#FFFFFF',
              borderRadius: radius.md,
              textDecoration: 'none',
              fontSize: typography.small.fontSize,
              fontWeight: 700,
            }}
          >
            Order on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

// ── Main CategoryModal component ──────────────────────────────────────────────
export default function Categorymodal({
  category: initialCategory,
  isOpen,
  onClose,
  onCategoryChange,
}) {
  const [activeCategory, setActiveCategory] = useState(
    initialCategory || CATEGORIES[0],
  );
  const [viewMode, setViewMode] = useState('grid');
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Sync internal category if prop changes (e.g. user clicks a different pill)
  useEffect(() => {
    if (initialCategory && CATEGORIES.includes(initialCategory)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveCategory(initialCategory);
    }
  }, [initialCategory]);

  const handleCategorySwitch = (cat) => {
    setActiveCategory(cat);
    if (onCategoryChange) onCategoryChange(cat);
  };

  const categoryProducts = allProducts.filter(
    (p) => p.category === activeCategory,
  );
  const meta = CATEGORY_META[activeCategory] || {
    label: activeCategory,
    description: '',
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          // ── Overlay ──────────────────────────────────────────────────────
          <motion.div
            key="cat-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.48)',
              zIndex: 2100,
              backdropFilter: 'blur(6px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: spacing.lg,
              boxSizing: 'border-box',
            }}
          >
            {/* ── Modal shell ─────────────────────────────────────── */}
            <motion.div
              key="cat-modal"
              initial={{ opacity: 0, y: 32, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: colors.bg,
                borderRadius: radius.xl,
                boxShadow: shadows.xl,
                width: '100%',
                maxWidth: '860px',
                maxHeight: '88vh',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
              }}
            >
              {/* ── Header ─────────────────────────────────────────── */}
              <div
                style={{
                  padding: `${spacing.lg} ${spacing.xl}`,
                  borderBottom: `1px solid ${colors.border}`,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  flexShrink: 0,
                  background: colors.surface,
                }}
              >
                <div>
                  <p
                    style={{
                      margin: `0 0 ${spacing.xs}`,
                      fontSize: typography.micro.fontSize,
                      fontWeight: 700,
                      letterSpacing: '3px',
                      color: colors.gold,
                      textTransform: 'uppercase',
                    }}
                  >
                    {meta.label}
                  </p>
                  <p
                    style={{
                      margin: 0,
                      fontSize: typography.small.fontSize,
                      color: colors.textSecondary,
                    }}
                  >
                    {meta.description}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  aria-label="Close"
                  style={{
                    background: 'none',
                    border: borders.thin,
                    borderRadius: '50%',
                    width: '36px',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    fontSize: '15px',
                    color: colors.textPrimary,
                    fontFamily: 'inherit',
                    flexShrink: 0,
                    marginLeft: spacing.lg,
                  }}
                >
                  ✕
                </button>
              </div>

              {/* ── Category switcher + View controls ──────────────── */}
              <div
                style={{
                  padding: `${spacing.md} ${spacing.xl}`,
                  borderBottom: `1px solid ${colors.border}`,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: spacing.md,
                  flexShrink: 0,
                  flexWrap: 'wrap',
                  background: colors.surface,
                }}
              >
                {/* Category switcher chips */}
                <div
                  style={{ display: 'flex', gap: spacing.sm, flexWrap: 'wrap' }}
                >
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => handleCategorySwitch(cat)}
                      style={{
                        padding: `${spacing.xs} ${spacing.md}`,
                        borderRadius: '999px',
                        border:
                          activeCategory === cat
                            ? `1px solid ${colors.gold}`
                            : borders.thin,
                        background:
                          activeCategory === cat ? colors.gold : 'transparent',
                        color:
                          activeCategory === cat
                            ? '#FFFFFF'
                            : colors.textSecondary,
                        fontSize: typography.micro.fontSize,
                        fontWeight: 600,
                        letterSpacing: '0.5px',
                        cursor: 'pointer',
                        textTransform: 'uppercase',
                        fontFamily: 'inherit',
                        transition: 'all 180ms ease',
                      }}
                    >
                      {CATEGORY_META[cat]?.label || cat}
                    </button>
                  ))}
                </div>

                {/* View mode toggles */}
                <div
                  style={{
                    display: 'flex',
                    border: borders.thin,
                    borderRadius: radius.sm,
                    overflow: 'hidden',
                    flexShrink: 0,
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
                        padding: `${spacing.xs} ${spacing.md}`,
                        cursor: 'pointer',
                        fontSize: typography.micro.fontSize,
                        fontWeight: 600,
                        letterSpacing: '0.5px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 150ms ease',
                        fontFamily: 'inherit',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {v.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* ── Product content area ────────────────────────────── */}
              <div style={{ flex: 1, overflowY: 'auto', padding: spacing.xl }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${activeCategory}-${viewMode}`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                  >
                    {categoryProducts.length === 0 ? (
                      <div
                        style={{
                          textAlign: 'center',
                          padding: `${spacing.xxxl} 0`,
                          color: colors.textSecondary,
                        }}
                      >
                        <p
                          style={{
                            fontSize: typography.body.fontSize,
                            margin: 0,
                          }}
                        >
                          No products in this category yet.
                        </p>
                        <p
                          style={{
                            fontSize: typography.small.fontSize,
                            marginTop: spacing.sm,
                            color: colors.textMuted,
                          }}
                        >
                          Check back soon.
                        </p>
                      </div>
                    ) : (
                      <>
                        {viewMode === 'grid' && (
                          <div
                            style={{
                              display: 'grid',
                              gridTemplateColumns:
                                'repeat(auto-fit, minmax(200px, 1fr))',
                              gap: spacing.lg,
                            }}
                          >
                            {categoryProducts.map((p) => (
                              <GridCard
                                key={p.id}
                                product={p}
                                onSelect={setSelectedProduct}
                              />
                            ))}
                          </div>
                        )}

                        {viewMode === 'list' && (
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              gap: spacing.md,
                            }}
                          >
                            {categoryProducts.map((p) => (
                              <ListCard
                                key={p.id}
                                product={p}
                                onSelect={setSelectedProduct}
                              />
                            ))}
                          </div>
                        )}

                        {viewMode === 'featured' && (
                          <div
                            style={{
                              display: 'grid',
                              gridTemplateColumns:
                                'repeat(auto-fit, minmax(380px, 1fr))',
                              gap: spacing.xl,
                            }}
                          >
                            {categoryProducts.map((p) => (
                              <FeaturedCard
                                key={p.id}
                                product={p}
                                onSelect={setSelectedProduct}
                              />
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* ── Footer ─────────────────────────────────────────── */}
              <div
                style={{
                  padding: `${spacing.md} ${spacing.xl}`,
                  borderTop: `1px solid ${colors.border}`,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexShrink: 0,
                  background: colors.surface,
                }}
              >
                <button
                  onClick={onClose}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: typography.small.fontSize,
                    color: colors.textSecondary,
                    fontFamily: 'inherit',
                    display: 'flex',
                    alignItems: 'center',
                    gap: spacing.xs,
                  }}
                >
                  ← Back to all products
                </button>
                <span
                  style={{
                    fontSize: typography.micro.fontSize,
                    color: colors.textMuted,
                  }}
                >
                  {categoryProducts.length}{' '}
                  {categoryProducts.length === 1 ? 'item' : 'items'}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Product Detail Modal triggered from inside CategoryModal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </>
  );
}
