/**
 * LAILA LUXE
 * FILE: Hero.jsx
 * PLACEMENT: src/components/Hero.jsx  (REPLACE existing)
 *
 * CHANGES:
 * - id="hero-section" added — Navbar reads this to compute scroll threshold
 * - Typography made louder: clamp(72px→180px), wider letter-spacing
 * - Scroll indicator upgraded: mouse SVG icon + "DISCOVER" label
 * - bgImage prop: when provided, applies dark overlay + white text
 * - minHeight: '100vh' — fills full viewport behind fixed navbar
 * - paddingTop: '88px' — pushes content below fixed navbar
 */

import { motion } from 'framer-motion';
import { colors, spacing, typography } from '../design';

const expo = [0.16, 1, 0.3, 1];

export default function Hero({ onExplore, bgImage }) {
  const hasImage = Boolean(bgImage);

  // Text colors adapt to background
  const headlineColor = hasImage ? '#FFFFFF' : colors.textPrimary;
  const subColor = hasImage ? 'rgba(255,255,255,0.75)' : colors.textSecondary;
  const kickerColor = hasImage ? '#D4AA7D' : colors.gold;
  const ruleColor = hasImage ? '#D4AA7D' : colors.gold;
  const ctaBg = hasImage ? 'rgba(255,255,255,0.15)' : colors.gold;
  const ctaColor = hasImage ? '#FFFFFF' : '#FFFFFF';
  const ctaBorder = hasImage ? '1px solid rgba(255,255,255,0.4)' : 'none';

  const sectionStyle = {
    id: 'hero-section', // NOTE: id is set on the JSX element below
    position: 'relative',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    overflow: 'hidden',
    paddingTop: '88px', // clears fixed navbar
    paddingBottom: spacing.huge,
    paddingLeft: spacing.lg,
    paddingRight: spacing.lg,
    boxSizing: 'border-box',
    ...(hasImage
      ? {
          backgroundImage: `linear-gradient(to bottom, rgba(15,10,5,0.38) 0%, rgba(15,10,5,0.60) 100%), url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }
      : {
          background:
            'linear-gradient(160deg, #F5F0E8 0%, #FEFCF8 52%, #EDE5D8 100%)',
        }),
  };

  return (
    <section id="hero-section" style={sectionStyle}>
      {/* Radial gold aura — only on cream version */}
      {!hasImage && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '860px',
            height: '860px',
            borderRadius: '50%',
            background:
              'radial-gradient(ellipse, rgba(184,149,106,0.12) 0%, transparent 66%)',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Kicker */}
      <motion.p
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: expo }}
        style={{
          fontSize: typography.micro.fontSize,
          fontWeight: 700,
          letterSpacing: '6px',
          color: kickerColor,
          textTransform: 'uppercase',
          margin: `0 0 ${spacing.xl} 0`,
        }}
      >
        New Season · 2026
      </motion.p>

      {/* ── Main headline — the LOUD part ── */}
      <motion.h1
        initial={{ opacity: 0, y: 48 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.22, ease: expo }}
        style={{
          // clamp: 72px mobile → 180px wide desktop
          fontSize: 'clamp(72px, 16vw, 180px)',
          fontWeight: 300,
          // LAILA gets extreme width, LUXE gets tighter weight contrast
          letterSpacing: 'clamp(14px, 3.5vw, 40px)',
          color: headlineColor,
          lineHeight: 0.92,
          margin: 0,
        }}
      >
        LAILA
        <br />
        <span
          style={{
            fontWeight: 700,
            letterSpacing: 'clamp(8px, 2vw, 22px)',
            // Slightly tighter on LUXE for visual tension
          }}
        >
          LUXE
        </span>
      </motion.h1>

      {/* Animated gold rule */}
      <motion.div
        aria-hidden="true"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.9, ease: expo }}
        style={{
          width: '100px',
          height: '1px',
          background: ruleColor,
          margin: `${spacing.xl} auto`,
          transformOrigin: 'center',
        }}
      />

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 1.1 }}
        style={{
          fontSize: typography.small.fontSize,
          color: subColor,
          letterSpacing: '4px',
          textTransform: 'uppercase',
          margin: `0 0 ${spacing.xxl} 0`,
        }}
      >
        Redefining Everyday Luxury
      </motion.p>

      {/* CTA */}
      <motion.button
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.3 }}
        whileHover={{ y: -4, boxShadow: '0 16px 40px rgba(184,149,106,0.35)' }}
        whileTap={{ scale: 0.97 }}
        onClick={onExplore}
        style={{
          padding: `${spacing.md} ${spacing.xxl}`,
          background: ctaBg,
          color: ctaColor,
          border: ctaBorder,
          borderRadius: '2px',
          fontSize: typography.micro.fontSize,
          fontWeight: 700,
          letterSpacing: '5px',
          textTransform: 'uppercase',
          cursor: 'pointer',
          fontFamily: 'inherit',
          transition: 'all 300ms ease',
          backdropFilter: hasImage ? 'blur(8px)' : 'none',
        }}
      >
        Explore Collections
      </motion.button>

      {/* ── Upgraded scroll indicator ── */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.55 }}
        transition={{ duration: 1.2, delay: 2 }}
        style={{
          position: 'absolute',
          bottom: spacing.xl,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: spacing.sm,
        }}
      >
        {/* Mouse icon with animated scroll dot */}
        <svg
          width="26"
          height="40"
          viewBox="0 0 26 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="1.5"
            y="1.5"
            width="23"
            height="37"
            rx="11.5"
            stroke={ruleColor}
            strokeWidth="1.5"
          />
          <motion.rect
            x="11"
            y="7"
            width="4"
            height="7"
            rx="2"
            fill={ruleColor}
            animate={{ y: [7, 20, 7], opacity: [0.9, 0.2, 0.9] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </svg>

        {/* "DISCOVER" label */}
        <span
          style={{
            fontSize: '9px',
            fontWeight: 700,
            letterSpacing: '4px',
            color: ruleColor,
            textTransform: 'uppercase',
          }}
        >
          Discover
        </span>
      </motion.div>
    </section>
  );
}
