import { colors, spacing } from '../design';

const styles = {
  page: {
    background: colors.bg,
    minHeight: '100vh',
    width: '100%',
  },

  container: {
    width: '100%',
    maxWidth: '1280px',
    margin: '0 auto',
    paddingLeft: spacing.lg,
    paddingRight: spacing.lg,
    paddingTop: spacing.xxl,
    paddingBottom: spacing.huge,
    boxSizing: 'border-box',
  },
};

export default function MainLayout({ children }) {
  return (
    <main style={styles.page}>
      <div style={styles.container}>{children}</div>
    </main>
  );
}
