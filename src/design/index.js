/**
 * LAILA LUXE DESIGN SYSTEM
 * FILE: index.js
 *
 * PURPOSE:
 * Single import gateway for the entire design system.
 *
 * RULE:
 * - Components MUST import from here only
 * - NEVER import from individual design files directly
 *
 * BENEFIT:
 * - Central control layer
 * - Easy future scaling
 * - Prevents messy architecture drift
 */

export { colors, borders } from './tokens';
export { typography } from './typography';
export { spacing } from './spacing';
export { shadows } from './shadows';
export { radius } from './radius';
