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
  bg: '#F7F1E3',
  surface: '#FFFFFF',
  mutedSurface: '#FAF7F0',

  // Text system
  textPrimary: '#1A1A1A',
  textSecondary: '#6B6B6B',
  textMuted: '#9A9A9A',

  // Accent system (luxury gold) - UPDATED
  gold: '#B8956A',           // ← Changed from #C8A45D (deeper, warmer)
  goldSoft: '#D9C9B0',       // ← Changed from #E6D3A3 (more sophisticated)


  // Borders
  border: '#E7DDC8',

  // Status (minimal use)
  success: '#2E7D32',
  warning: '#B26A00',
  error: '#C62828',
};

export const borders = {
  thin: '1px solid #E7DDC8',
  medium: '1.5px solid #D8C9A8',
};
