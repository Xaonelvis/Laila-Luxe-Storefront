import { motion } from 'framer-motion';
import { borders, colors, shadows, spacing, typography } from '../design';

const categories = ['all', 'home', 'fashion', 'lifestyle', 'accessories'];

const styles = {
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.xxxl,
  },

  button: {
    border: borders.thin,
    borderRadius: '999px',
    padding: `${spacing.sm} ${spacing.md}`,
    cursor: 'pointer',
    background: 'transparent',
    fontSize: typography.small.fontSize,
    lineHeight: typography.small.lineHeight,
    fontWeight: 500,
    letterSpacing: '0.5px',
    transition: 'all 180ms ease',
  },
};

export default function CategoryFilter({ activeCategory, onChange }) {
  return (
    <div style={styles.wrapper}>
      {categories.map((category) => {
        const isActive = activeCategory === category;

        return (
          <motion.button
            key={category}
            whileTap={{ scale: 0.96 }}
            onClick={() => onChange(category)}
            style={{
              ...styles.button,
              background: isActive ? colors.gold : 'transparent',
              color: isActive ? '#FFFFFF' : colors.textPrimary,
              boxShadow: isActive ? shadows.sm : 'none',
            }}
          >
            {category.toUpperCase()}
          </motion.button>
        );
      })}
    </div>
  );
}
