import { colors, spacing, typography } from '../design';

const styles = {
  wrapper: {
    textAlign: 'center',
    paddingTop: spacing.huge,
    paddingBottom: spacing.xxl,
  },

  brand: {
    margin: 0,
    color: colors.textPrimary,
    fontSize: typography.display.fontSize,
    lineHeight: typography.display.lineHeight,
    fontWeight: 300,
    letterSpacing: '8px',
  },

  divider: {
    width: '72px',
    height: '1px',
    background: colors.gold,
    margin: `${spacing.lg} auto`,
  },

  tagline: {
    margin: 0,
    color: colors.textSecondary,
    fontSize: typography.body.fontSize,
    lineHeight: typography.body.lineHeight,
    letterSpacing: '0.4px',
  },
};

export default function Header() {
  return (
    <header style={styles.wrapper}>
      <h1 style={styles.brand}>LAILA LUXE</h1>

      <div style={styles.divider} />

      <p style={styles.tagline}>Redefining Everyday Luxury</p>
    </header>
  );
}
