/**
 * LAILA LUXE DESIGN SYSTEM
 * FILE: typography.js
 *
 * PURPOSE:
 * Defines strict typography hierarchy for the entire app.
 *
 * RULES:
 * - NEVER create custom font sizes in components
 * - ONLY use this scale
 * - Typography is the main carrier of "luxury feel"
 *
 * USED BY:
 * - Product titles
 * - Headings
 * - Descriptions
 * - UI labels
 */

export const typography = {
  display: {
    fontSize: '48px',
    lineHeight: '56px',
    fontWeight: 600,
    letterSpacing: '-1px',
  },

  h1: {
    fontSize: '36px',
    lineHeight: '44px',
    fontWeight: 600,
    letterSpacing: '-0.8px',
  },

  h2: {
    fontSize: '28px',
    lineHeight: '36px',
    fontWeight: 600,
  },

  h3: {
    fontSize: '22px',
    lineHeight: '30px',
    fontWeight: 500,
  },

  body: {
    fontSize: '16px',
    lineHeight: '24px',
    fontWeight: 400,
  },

  small: {
    fontSize: '14px',
    lineHeight: '20px',
    fontWeight: 400,
  },

  micro: {
    fontSize: '12px',
    lineHeight: '16px',
    fontWeight: 400,
  },
};
