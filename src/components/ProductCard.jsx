import { useState } from "react";
import { motion } from "framer-motion";
import { APP_CONFIG } from "../config/appConfig";
import {
  colors,
  spacing,
  typography,
  shadows,
  radius,
  borders,
} from "../design";

const FALLBACK_IMAGE =
  "data:image/svg+xml;charset=UTF-8," +
  encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000" viewBox="0 0 800 1000" fill="none">
      <rect width="800" height="1000" rx="40" fill="#FAF7F0"/>
      <rect x="72" y="72" width="656" height="856" rx="32" fill="#F7F1E3" stroke="#E7DDC8"/>
      <path d="M220 650L330 520L430 610L540 470L620 560" stroke="#C8A45D" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="315" cy="380" r="42" fill="#E6D3A3"/>
      <text x="400" y="790" text-anchor="middle" font-family="Arial, sans-serif" font-size="28" fill="#6B6B6B">LAILA LUXE</text>
    </svg>
  `);

const styles = {
  card: {
    background: colors.surface,
    border: borders.thin,
    borderRadius: radius.lg,
    boxShadow: shadows.sm,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    gap: spacing.md,
    padding: spacing.md,
    height: "100%",
  },
  mediaWrap: {
    position: "relative",
    borderRadius: radius.md,
    overflow: "hidden",
    background: colors.mutedSurface,
    aspectRatio: "4 / 5",
    border: borders.thin,
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    gap: spacing.sm,
    padding: `0 ${spacing.xs} ${spacing.xs}`,
    flex: 1,
  },
  metaRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.sm,
    flexWrap: "wrap",
  },
  pill: {
    display: "inline-flex",
    alignItems: "center",
    padding: `${spacing.xs} ${spacing.sm}`,
    borderRadius: "999px",
    background: colors.mutedSurface,
    color: colors.textSecondary,
    border: borders.thin,
    fontSize: typography.micro.fontSize,
    lineHeight: typography.micro.lineHeight,
    fontWeight: 500,
    letterSpacing: "0.2px",
  },
  title: {
    margin: 0,
    color: colors.textPrimary,
    fontSize: typography.h3.fontSize,
    lineHeight: typography.h3.lineHeight,
    fontWeight: typography.h3.fontWeight,
    letterSpacing: typography.h3.letterSpacing || "0px",
  },
  description: {
    margin: 0,
    color: colors.textSecondary,
    fontSize: typography.body.fontSize,
    lineHeight: typography.body.lineHeight,
    fontWeight: typography.body.fontWeight,
    display: "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },
  price: {
    margin: 0,
    color: colors.gold,
    fontSize: typography.body.fontSize,
    lineHeight: typography.body.lineHeight,
    fontWeight: 700,
    letterSpacing: "0.2px",
  },
  footer: {
    marginTop: "auto",
    paddingTop: spacing.sm,
  },
  cta: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    minHeight: "44px",
    padding: `0 ${spacing.md}`,
    background: colors.gold,
    color: "#FFFFFF",
    borderRadius: radius.md,
    textDecoration: "none",
    border: "none",
    fontSize: typography.small.fontSize,
    lineHeight: typography.small.lineHeight,
    fontWeight: 600,
    letterSpacing: "0.2px",
    boxShadow: shadows.sm,
    cursor: "pointer",
    boxSizing: "border-box",
  },
};

export default function ProductCard({ product }) {
  const [imageError, setImageError] = useState(false);

  const whatsappMessage =
    product?.whatsappMessage?.trim() ||
    `Hi LAILA LUXE, I would like to order ${product?.name || "this item"}.`;

  const whatsappLink = `https://wa.me/${APP_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  const showCategory = Boolean(product?.category);
  const showPrice =
    product?.price !== undefined &&
    product?.price !== null &&
    `${product.price}`.trim() !== "";

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      style={styles.card}
    >
      <div style={styles.mediaWrap}>
        <img
          src={imageError ? FALLBACK_IMAGE : product.image}
          alt={product.name || "Product image"}
          loading="lazy"
          decoding="async"
          onError={() => setImageError(true)}
          style={styles.image}
        />
      </div>

      <div style={styles.content}>
        <div style={styles.metaRow}>
          {showCategory ? (
            <span style={styles.pill}>{product.category}</span>
          ) : (
            <span />
          )}
          {showPrice ? <span style={styles.price}>{product.price}</span> : null}
        </div>

        <h3 style={styles.title}>{product.name}</h3>

        {product.description ? (
          <p style={styles.description}>{product.description}</p>
        ) : null}

        <div style={styles.footer}>
          <motion.a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            aria-label={`Order ${product.name} on WhatsApp`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.18 }}
            style={styles.cta}
          >
            Order on WhatsApp
          </motion.a>
        </div>
      </div>
    </motion.article>
  );
}
