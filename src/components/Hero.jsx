/**
 * LAILA LUXE
 * FILE: Hero.jsx
 * PLACEMENT: src/components/Hero.jsx  (new file — no existing conflict)
 *
 * PURPOSE:
 * Above-the-fold editorial hero section.
 * The single most impactful piece of the proposal — what the client sees first.
 * Replaces the stripped inline header block that was removed from App.jsx.
 *
 * PROPS:
 * - onExplore: () => void
 *   Smooth-scrolls to the products section (wired via ref in App.jsx)
 *
 * DESIGN DECISIONS:
 * - Radial gold aura: depth without visual noise
 * - Expo ease curve [0.16, 1, 0.3, 1]: the "expensive" motion feel
 * - Animated gold rule: draws the eye down the hierarchy
 * - Staggered entrance: kicker → headline → rule → tagline → CTA → scroll nudge
 * - clamp() font size: fluid across all screen widths, no breakpoints needed
 * - Scroll nudge: subtle animated line, fades in last, disappears on scroll
 */

import { motion } from 'framer-motion';
import { colors, spacing, typography } from '../design';

// Expo ease-out — produces the "this feels expensive" motion quality
const expo = [0.16, 1, 0.3, 1];

export default function Hero({ onExplore }) {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: '88vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        overflow: 'hidden',
        background:
          'linear-gradient(160deg, #F7F1E3 0%, #FEFCF8 55%, #F0E8D8 100%)',
        padding: `${spacing.huge} ${spacing.lg}`,
        boxSizing: 'border-box',
      }}
    >
      {/* ── Radial gold aura ─────────────────────────────────────────────
          Adds perceived depth to the flat cream background.
          aria-hidden so screen readers skip decorative element.          */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '700px',
          height: '700px',
          borderRadius: '50%',
          background:
            'radial-gradient(ellipse, rgba(184,149,106,0.10) 0%, transparent 68%)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Kicker label ─────────────────────────────────────────────────
          First text to appear. Sets the season/context.               */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: expo }}
        style={{
          fontSize: typography.micro.fontSize,
          fontWeight: 700,
          letterSpacing: '5px',
          color: colors.gold,
          textTransform: 'uppercase',
          margin: `0 0 ${spacing.xl} 0`,
        }}
      >
        New Season · 2026
      </motion.p>

      {/* ── Display headline ─────────────────────────────────────────────
          clamp() scales fluidly: 56px mobile → 128px wide desktop.
          Weight contrast (200 / 600) creates editorial hierarchy.     */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.25, ease: expo }}
        style={{
          fontSize: 'clamp(56px, 11vw, 128px)',
          fontWeight: 200,
          letterSpacing: 'clamp(8px, 2vw, 20px)',
          color: colors.textPrimary,
          lineHeight: 1,
          margin: 0,
        }}
      >
        LAILA
        <br />
        <span
          style={{ fontWeight: 600, letterSpacing: 'clamp(6px, 1.5vw, 14px)' }}
        >
          LUXE
        </span>
      </motion.h1>

      {/* ── Animated gold rule ───────────────────────────────────────────
          scaleX 0 → 1 wipe. Draws the eye down to the tagline.       */}
      <motion.div
        aria-hidden="true"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.9, delay: 0.8, ease: expo }}
        style={{
          width: '80px',
          height: '1px',
          background: colors.gold,
          margin: `${spacing.xl} auto`,
          transformOrigin: 'center',
        }}
      />

      {/* ── Tagline ──────────────────────────────────────────────────── */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.0 }}
        style={{
          fontSize: typography.small.fontSize,
          color: colors.textSecondary,
          letterSpacing: '3px',
          textTransform: 'uppercase',
          margin: `0 0 ${spacing.xxl} 0`,
        }}
      >
        Redefining Everyday Luxury
      </motion.p>

      {/* ── CTA button ───────────────────────────────────────────────────
          borderRadius: '2px' — deliberately sharp. Luxury ≠ rounded.
          whileHover lifts with gold glow. whileTap gives press feel.  */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        whileHover={{ y: -3, boxShadow: '0 12px 32px rgba(184,149,106,0.30)' }}
        whileTap={{ scale: 0.97 }}
        onClick={onExplore}
        style={{
          padding: `${spacing.md} ${spacing.xxl}`,
          background: colors.gold,
          color: '#FFFFFF',
          border: 'none',
          borderRadius: '2px',
          fontSize: typography.micro.fontSize,
          fontWeight: 700,
          letterSpacing: '4px',
          textTransform: 'uppercase',
          cursor: 'pointer',
          fontFamily: 'inherit',
          transition: 'all 280ms ease',
        }}
      >
        Explore Collections
      </motion.button>

      {/* ── Scroll nudge ─────────────────────────────────────────────────
          Fades in last (delay 1.8s). Bouncing line signals more below.
          aria-hidden — purely decorative.                              */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.45 }}
        transition={{ duration: 1, delay: 1.8 }}
        style={{
          position: 'absolute',
          bottom: spacing.xl,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: spacing.xs,
          color: colors.textMuted,
          fontSize: '10px',
          letterSpacing: '3px',
          textTransform: 'uppercase',
        }}
      >
        <span>Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: '1px',
            height: '28px',
            background: colors.gold,
            opacity: 0.6,
          }}
        />
      </motion.div>
    </section>
  );
}
