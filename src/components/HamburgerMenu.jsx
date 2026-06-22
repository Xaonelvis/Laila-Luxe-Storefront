/**
 * LAILA QUALITY SHOP
 * FILE: HamburgerMenu.jsx
 * PLACEMENT: src/components/HamburgerMenu.jsx
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
    transition: 'opacity 200ms ease',
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
    transition: 'transform 200ms ease',
  },

  drawerOpen: {
    transform: 'translateX(0)',
  },

  drawerClosed: {
    transform: 'translateX(-100%)',
  },

  header: {
    padding: `${spacing.md} ${spacing.lg}`,
    borderBottom: `1px solid ${colors.border}`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxSizing: 'border-box',
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
    letterSpacing: '2px',
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
    alignItems: 'center',
  },

  socialIcon: {
    width: '36px',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: colors.textSecondary,
    cursor: 'pointer',
    transition: 'color 150ms ease, transform 150ms ease',
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

// High-fidelity vector map matching the core UI aesthetics
const socialIcons = {
  instagram: (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  ),
  linkedin: (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
  twitter: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  facebook: (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  ),
  tiktok: (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  ),
};

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
        {/* Header with Clickable Brand SVG Mark */}
        <div style={styles.header}>
          <a
            href="/"
            aria-label="LAILA QUALITY SHOP Home"
            style={{
              display: 'block',
              width: '135px',
              height: 'auto',
              color: colors.textPrimary,
              transition: 'opacity 200ms ease',
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 400 130"
              width="100%"
              height="100%"
            >
              <text
                x="208"
                y="56"
                textAnchor="middle"
                fill="currentColor"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '52px',
                  fontWeight: 300,
                  letterSpacing: '16px',
                  textTransform: 'uppercase',
                }}
              >
                LAILA
              </text>

              <text
                x="203.75"
                y="92"
                textAnchor="middle"
                fill="currentColor"
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: '13.5px',
                  fontWeight: 700,
                  letterSpacing: '7.5px',
                  textTransform: 'uppercase',
                }}
              >
                QUALITY SHOP
              </text>

              <line
                x1="140"
                y1="114"
                x2="260"
                y2="114"
                stroke={colors.gold || '#b8956a'}
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </a>

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
            <a
              href={`https://www.${platform}.com/laila-luxe`}
              key={idx}
              style={styles.socialIcon}
              title={platform}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={(e) => {
                e.currentTarget.style.color = colors.gold;
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = colors.textSecondary;
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {socialIcons[platform]}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
