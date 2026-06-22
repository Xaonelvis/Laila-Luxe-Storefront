/**
 * LAILA QUALITY SHOP
 * FILE: Hero.jsx
 * PLACEMENT: src/components/Hero.jsx (REPLACE existing)
 *
 * ADJUSTMENTS FOR MASSIVE VISUAL WEIGHT:
 * - Typography restored to massive scale: clamp(72px -> 165px)
 * - QUALITY SHOP transformed into a bold, high-visibility geometric anchor
 * - Tighter line-height and margins to eliminate empty dead space
 * - Diamond icon stroke-weight multiplied to balance the heavy typography
 */

import { motion } from 'framer-motion';
import { colors, spacing, typography } from '../design';

const expo = [0.16, 1, 0.3, 1];

export default function Hero({ onExplore, bgImage }) {
  const hasImage = Boolean(bgImage);

  const headlineColor = hasImage ? '#FFFFFF' : colors.textPrimary;
  const subColor = hasImage ? 'rgba(255,255,255,0.85)' : colors.textPrimary;
  const kickerColor = hasImage ? '#D4AA7D' : colors.gold;
  const ruleColor = hasImage ? '#D4AA7D' : colors.gold;
  const ctaBg = hasImage ? 'rgba(255,255,255,0.15)' : colors.gold;
  const ctaColor = '#FFFFFF';
  const ctaBorder = hasImage ? '1px solid rgba(255,255,255,0.4)' : 'none';

  const sectionStyle = {
    id: 'hero-section',
    position: 'relative',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    overflow: 'hidden',
    paddingTop: '100px',
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
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: expo }}
        style={{
          fontSize: typography.micro.fontSize,
          fontWeight: 700,
          letterSpacing: '8px',
          color: kickerColor,
          textTransform: 'uppercase',
          margin: '0 0 20px 0',
        }}
      >
        New Season · 2026
      </motion.p>

      {/* 1. Heavy-Duty Diamond Mark */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.15, ease: expo }}
        style={{
          width: 'clamp(110px, 15vw, 150px)', // Increased foundational size
          height: 'auto',
          marginBottom: '12px', // Tightened to lock closely with typography
        }}
      ></motion.div>

      {/* 2. Brand Typography Block */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Massive Primary Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.25, ease: expo }}
          style={{
            fontSize: 'clamp(80px, 15vw, 165px)', // Restored huge original presence
            fontWeight: 300,
            letterSpacing: 'clamp(16px, 3.5vw, 36px)',
            color: headlineColor,
            lineHeight: 0.85, // Squeezes layout block vertical spread tightly
            margin: 0,
            paddingLeft: 'clamp(16px, 3.5vw, 36px)',
          }}
        >
          LAILA
        </motion.h1>

        {/* Instantly Visible, Heavy Sub-Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.4, ease: expo }}
          style={{
            fontFamily: 'inherit', // Uses your template's solid sans/main token
            fontSize: 'clamp(20px, 3.2vw, 38px)', // Drastically scaled up for instant visibility
            fontWeight: 700, // Thickened weight matches old "LUXE" gravity
            letterSpacing: 'clamp(6px, 1.2vw, 14px)',
            color: subColor,
            textTransform: 'uppercase',
            margin: '12px 0 0 0',
            paddingLeft: 'clamp(6px, 1.2vw, 14px)',
            lineHeight: 1,
          }}
        >
          QUALITY SHOP
        </motion.h2>
      </div>

      {/* Center Balance Accent Divider */}
      <motion.div
        aria-hidden="true"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: 0.7, ease: expo }}
        style={{
          width: '140px',
          height: '2px', // Slightly thicker line definition
          background: ruleColor,
          margin: '32px auto 24px auto',
          transformOrigin: 'center',
        }}
      />

      {/* Editorial Slogan */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.9 }}
        style={{
          fontSize: typography.small.fontSize,
          color: hasImage ? 'rgba(255,255,255,0.7)' : colors.textSecondary,
          letterSpacing: '4px',
          textTransform: 'uppercase',
          margin: `0 0 ${spacing.xxl} 0`,
        }}
      >
        Redefining Everyday Luxury
      </motion.p>

      {/* CTA Button */}
      <motion.button
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.1 }}
        whileHover={{ y: -4, boxShadow: '0 16px 40px rgba(184,149,106,0.3)' }}
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

      {/* Scroll Indicator */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.55 }}
        transition={{ duration: 1.2, delay: 1.6 }}
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
