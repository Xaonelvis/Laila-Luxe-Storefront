/**
 * LAILA LUXE
 * FILE: MarqueeStrip.jsx
 * PLACEMENT: src/components/MarqueeStrip.jsx  (new file — no existing conflict)
 *
 * PURPOSE:
 * Infinite horizontal text marquee.
 * Sits between the Hero section and the product grid.
 * Signals luxury brand category — Bottega Veneta, Totême, Aesop all use this.
 *
 * ZERO external dependencies — pure CSS animation via injected <style> tag.
 * The keyframe is scoped with prefix `ll-` to avoid global collision.
 *
 * DESIGN NOTES:
 * - 4 copies of text at 25% translateX = seamless infinite loop
 * - willChange: 'transform' — GPU-composited, zero layout thrash
 * - aria-hidden: this is purely decorative
 */

import { colors } from '../design';

// Edit this to change the scrolling message
const MARQUEE_TEXT =
  'CRAFTED WITH INTENTION · REDEFINING EVERYDAY LUXURY · EST. 2024 · EVERY DETAIL MATTERS · ';

// 4 copies → translateX(-25%) creates a seamless loop
const COPIES = 4;

export default function MarqueeStrip() {
  return (
    <div
      aria-hidden="true"
      style={{
        overflow: 'hidden',
        borderTop: `1px solid ${colors.border}`,
        borderBottom: `1px solid ${colors.border}`,
        padding: '14px 0',
        background: '#FEFCF8',
        userSelect: 'none',
      }}
    >
      {/* Keyframe scoped with ll- prefix to avoid global CSS collisions */}
      <style>{`
        @keyframes ll-marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }
      `}</style>

      <div
        style={{
          display: 'flex',
          width: 'fit-content',
          animation: 'll-marquee 28s linear infinite',
          willChange: 'transform',
        }}
      >
        {Array.from({ length: COPIES }).map((_, i) => (
          <span
            key={i}
            style={{
              whiteSpace: 'nowrap',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '4px',
              color: colors.gold,
              paddingRight: '48px',
              textTransform: 'uppercase',
            }}
          >
            {MARQUEE_TEXT}
          </span>
        ))}
      </div>
    </div>
  );
}
