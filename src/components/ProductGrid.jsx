/**
 * LAILA LUXE
 * FILE: ProductGrid.jsx
 * PLACEMENT: src/components/ProductGrid.jsx  (REPLACE existing file)
 *
 * CHANGES FROM PREVIOUS VERSION:
 * ─ Added Framer Motion stagger container + item variants
 * ─ Each card animates in sequentially (not all at once)
 *   → Feels like products are being "presented", not dumped on screen
 *
 * HOW THE STAGGER WORKS:
 * - containerVariants triggers children in sequence (staggerChildren: 0.08s)
 * - itemVariants: each card slides up 28px + fades in with expo ease
 * - Total stagger for 4 cards: ~0.32s spread — imperceptible but felt
 */

import { motion } from 'framer-motion';
import { spacing } from '../design';
import ProductCard from './ProductCard';

const gridStyles = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
  gap: spacing.xl,
  alignItems: 'start',
};

// Parent container — sequences the child entrances
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

// Per-card: slide up from 28px + fade in with expo ease
const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1], // expo ease-out
    },
  },
};

export default function ProductGrid({ products }) {
  return (
    <motion.section
      style={gridStyles}
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {products.map((product) => (
        // motion.div wraps each card to receive itemVariants from parent stagger
        <motion.div key={product.id} variants={itemVariants}>
          <ProductCard product={product} />
        </motion.div>
      ))}
    </motion.section>
  );
}
