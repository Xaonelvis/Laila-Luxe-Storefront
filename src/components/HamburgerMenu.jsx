/**
 * LAILA LUXE
 * FILE: HamburgerMenu.jsx
 *
 * PURPOSE:
 * Mobile hamburger menu with side drawer.
 * Contains navigation items in sophisticated language.
 *
 * STRUCTURE:
 * - Brand statement
 * - Main navigation (Home, Collections, Our Story, Get in Touch)
 * - Secondary section (My Account, Customer Care)
 * - Social icons footer
 *
 * RULE:
 * - Visual structure only (no navigation logic yet)
 * - Smooth slide-in animation
 * - Semi-transparent backdrop overlay
 */

import { colors, spacing, typography, shadows } from '../design';

const styles = {
  backdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.3)',
    zIndex: 999,
    transition: 'opacity 300ms ease',
  },

  drawer: {
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    width: '280px',
    background: colors.bg,
    zIndex: 1001,
    overflowY: 'auto',
    boxShadow: shadows.lg,
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 300ms ease',
  },

  drawerOpen: {
    transform: 'translateX(0)',
  },

  drawerClosed: {
    transform: 'translateX(-100%)',
  },

  header: {
    padding: spacing.lg,
    borderBottom: `1px solid ${colors.border}`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  brandStatement: {
    fontSize: typography.small.fontSize,
    color: colors.textSecondary,
    margin: 0,
    fontWeight: 500,
    letterSpacing: '0.5px',
  },

  closeButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '24px',
    color: colors.textPrimary,
    padding: 0,
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  navSection: {
    padding: spacing.lg,
    flex: 1,
  },

  navTitle: {
    fontSize: '12px',
    fontWeight: 600,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: '1px',
    margin: `0 0 ${spacing.md} 0`,
    paddingBottom: spacing.md,
    borderBottom: `1px solid ${colors.border}`,
  },

  navItem: {
    padding: `${spacing.md} 0`,
    cursor: 'pointer',
    fontSize: typography.body.fontSize,
    color: colors.textPrimary,
    transition: 'all 150ms ease',
    borderLeft: `2px solid transparent`,
    paddingLeft: spacing.md,

    '&:hover': {
      color: colors.gold,
      borderLeftColor: colors.gold,
      paddingLeft: `calc(${spacing.md} + 4px)`,
    },
  },

  divider: {
    height: '1px',
    background: colors.border,
    margin: `${spacing.lg} 0`,
  },

  footer: {
    padding: spacing.lg,
    borderTop: `1px solid ${colors.border}`,
    display: 'flex',
    gap: spacing.md,
    justifyContent: 'center',
  },

  socialIcon: {
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: colors.textPrimary,
    cursor: 'pointer',
    transition: 'color 150ms ease',

    '&:hover': {
      color: colors.gold,
    },
  },
};

const menuItems = [
  { label: 'Home', category: 'primary' },
  { label: 'Collections', category: 'primary' },
  { label: 'Our Story', category: 'primary' },
  { label: 'Get in Touch', category: 'primary' },
  { label: 'My Account', category: 'secondary' },
  { label: 'Customer Care', category: 'secondary' },
];

const socialLinks = ['instagram', 'linkedin', 'twitter', 'facebook', 'tiktok'];

export default function HamburgerMenu({ isOpen = false, onToggle }) {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          style={styles.backdrop}
          onClick={() => onToggle(false)}
          role="button"
          tabIndex={0}
        />
      )}

      {/* Drawer */}
      <div
        style={{
          ...styles.drawer,
          ...(isOpen ? styles.drawerOpen : styles.drawerClosed),
        }}
      >
        {/* Header with Close Button */}
        <div style={styles.header}>
          <p style={styles.brandStatement}>LAILA LUXE</p>
          <button
            style={styles.closeButton}
            onClick={() => onToggle(false)}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        {/* Navigation Items */}
        <div style={styles.navSection}>
          <div style={styles.navTitle}>Discover</div>
          {menuItems
            .filter((item) => item.category === 'primary')
            .map((item, idx) => (
              <div key={idx} style={styles.navItem}>
                {item.label}
              </div>
            ))}

          <div style={styles.divider} />

          <div style={styles.navTitle}>Account</div>
          {menuItems
            .filter((item) => item.category === 'secondary')
            .map((item, idx) => (
              <div key={idx} style={styles.navItem}>
                {item.label}
              </div>
            ))}
        </div>

        {/* Social Icons Footer */}
        <div style={styles.footer}>
          {socialLinks.map((platform, idx) => (
            <div
              key={idx}
              style={styles.socialIcon}
              title={platform}
              role="button"
              tabIndex={0}
            >
              {/* Placeholder icon */}
              <span style={{ fontSize: '18px' }}>◌</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
