/**
 * LAILA LUXE DESIGN SYSTEM
 * FILE: tokens.js
 *
 * PURPOSE:
 * Defines global brand constants:
 * - colors
 * - borders
 *
 * This is the emotional identity layer of the UI.
 *
 * RULES:
 * - NO hardcoded colors anywhere in the app
 * - ONLY use values from this file
 * - Keep palette minimal and intentional (luxury = restraint)
 *
 * USED BY:
 * - Buttons
 * - Backgrounds
 * - Cards
 * - Text accents
 */

export const colors = {
  // Background system
  bg: '#F5F0E8', // slightly cooler cream — less "candle shop"
  surface: '#FDFBF7', // near-white with warmth, not clinical
  mutedSurface: '#F9F5EE',

  // Text system
  textPrimary: '#111111', // true near-black, not softened
  textSecondary: '#5C5C5C',
  textMuted: '#9A9A9A',

  // Accent system (luxury gold) - UPDATED
  // The gold fix — this is the single most important change
  gold: '#9D7B4F', // deeper, darker, more cognac than bronze
  goldSoft: '#C4A882', // muted — used for hover states only

  border: '#E2D9C8', // slightly cooler, more refined

  // Status (minimal use)
  success: '#2E7D32',
  warning: '#B26A00',
  error: '#C62828',
};

export const borders = {
  thin: '1px solid #E7DDC8',
  medium: '1.5px solid #D8C9A8',
};
