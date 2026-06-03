/**
 * LAILA LUXE
 * FILE: constants.js
 * PLACEMENT: src/utils/constants.js
 *            (Create a new `utils` folder inside src/)
 *
 * PURPOSE:
 * Single source of truth for constants and price utilities used across
 * multiple components. Prevents duplication and drift.
 */

// ── Fallback placeholder image (SVG encoded) ─────────────────────────────────
export const FALLBACK_IMAGE =
  'data:image/svg+xml;charset=UTF-8,' +
  encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000" viewBox="0 0 800 1000" fill="none">
      <rect width="800" height="1000" rx="40" fill="#FAF7F0"/>
      <rect x="72" y="72" width="656" height="856" rx="32" fill="#F7F1E3" stroke="#E7DDC8"/>
      <path d="M220 650L330 520L430 610L540 470L620 560" stroke="#9D7B4F" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="315" cy="380" r="42" fill="#C4A882"/>
      <text x="400" y="790" text-anchor="middle" font-family="Arial, sans-serif" font-size="28" fill="#6B6B6B">LAILA LUXE</text>
    </svg>
  `);

// ── Price utilities ───────────────────────────────────────────────────────────
// Products store prices as strings: "UGX 185,000"
// These helpers parse/format for cart total calculations.

/** "UGX 185,000" → 185000 */
export const parsePrice = (str) => {
  if (!str) return 0;
  return parseInt(String(str).replace(/[^0-9]/g, ''), 10) || 0;
};

/** 185000 → "UGX 185,000" */
export const formatUGX = (amount) =>
  `UGX ${Math.round(amount).toLocaleString('en-UG')}`;
