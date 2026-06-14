/**
 * LAILA LUXE
 * FILE: SearchBar.jsx
 * PLACEMENT: src/components/SearchBar.jsx  (REPLACE existing)
 *
 * CHANGES FROM PREVIOUS VERSION:
 * - Real search: filters products by name, description, category
 * - Suggestions show matching product name + price
 * - Clicking a suggestion: calls onSearch(query) to filter the grid
 *   AND scrolls to that product card via id="product-{id}"
 * - onSearch prop: wires to App.jsx searchQuery state
 * - fullWidth prop: used in mobile search panel (fills full width)
 * - autoFocus prop: used when mobile panel opens
 * - onDismiss prop: called when Escape or blur with empty query
 */

import { colors, spacing, typography, borders, radius } from '../design';
import { useState, useCallback, useRef, useEffect } from 'react';
import { products } from '../data/products';

export default function SearchBar({
  onSearch,
  fullWidth = false,
  autoFocus = false,
  onDismiss,
}) {
  const [isActive, setIsActive] = useState(autoFocus);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const inputRef = useRef(null);

  // ← PUT IT HERE, top level, not inside any other function
  useEffect(() => {
    if (isActive) {
      const t = setTimeout(() => inputRef.current?.focus(), 30);
      return () => clearTimeout(t);
    }
  }, [isActive]);

  // Filter products matching the query against name, description, category
  const getMatches = (q) => {
    if (!q.trim()) return [];
    const lower = q.toLowerCase();
    return products.filter(
      (p) =>
        p.name?.toLowerCase().includes(lower) ||
        p.description?.toLowerCase().includes(lower) ||
        p.category?.toLowerCase().includes(lower),
    );
  };

  const handleChange = useCallback(
    (e) => {
      const val = e.target.value;
      setQuery(val);
      setSuggestions(getMatches(val));
      if (onSearch) onSearch(val);
    },
    [onSearch],
  );

  const handleSuggestionClick = (product) => {
    setQuery(product.name);
    setSuggestions([]);
    setIsActive(false);
    if (onSearch) onSearch(product.name);
    // Scroll to product card on homepage
    setTimeout(() => {
      const el = document.getElementById(`product-${product.id}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 80);
  };

  const handleBlur = () => {
    // Delay so suggestion clicks register before blur fires
    setTimeout(() => {
      setIsActive(false);
      setSuggestions([]);
      if (!query && onDismiss) onDismiss();
    }, 200);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setQuery('');
      setSuggestions([]);
      setIsActive(false);
      if (onSearch) onSearch('');
      if (onDismiss) onDismiss();
    }
  };

  const handleClear = () => {
    setQuery('');
    setSuggestions([]);
    if (onSearch) onSearch('');
    inputRef.current?.focus();
  };

  const wrapperStyle = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    width: fullWidth ? '100%' : undefined,
  };

  const inputWrapStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.sm,
    background: colors.bg,
    border: isActive ? `1px solid ${colors.gold}` : borders.thin,
    borderRadius: radius.sm,
    paddingLeft: spacing.md,
    paddingRight: spacing.sm,
    paddingTop: spacing.sm,
    paddingBottom: spacing.sm,
    width: fullWidth ? '100%' : isActive ? '260px' : '36px',
    transition: 'all 220ms ease',
    overflow: 'hidden',
    boxSizing: 'border-box',
    cursor: isActive ? 'text' : 'pointer',
  };

  const inputStyle = {
    border: 'none',
    background: 'transparent',
    outline: 'none',
    fontSize: typography.small.fontSize,
    color: colors.textPrimary,
    width: '100%',
    padding: 0,
    fontFamily: 'inherit',
    opacity: isActive || fullWidth ? 1 : 0,
    pointerEvents: isActive || fullWidth ? 'auto' : 'none',
  };

  const showSuggestions = (isActive || fullWidth) && suggestions.length > 0;

  return (
    <div style={wrapperStyle}>
      <div
        style={inputWrapStyle}
        onClick={() => {
          if (!isActive) {
            setIsActive(true);
          }
        }}
      >
        {/* Search icon */}
        <svg
          width="16"
          height="16"
          fill="none"
          stroke={isActive ? colors.gold : colors.textSecondary}
          viewBox="0 0 24 24"
          style={{ flexShrink: 0 }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>

        <input
          ref={inputRef}
          type="text"
          placeholder="Search collections…"
          value={query}
          onChange={handleChange}
          onFocus={() => setIsActive(true)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          autoFocus={autoFocus}
          style={inputStyle}
          aria-label="Search products"
        />

        {/* Clear button — shown when there's a query */}
        {query && (
          <button
            onMouseDown={(e) => e.preventDefault()} // prevent blur before click
            onClick={handleClear}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: colors.textMuted,
              fontSize: '16px',
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              flexShrink: 0,
              fontFamily: 'inherit',
            }}
          >
            ×
          </button>
        )}
      </div>

      {/* Suggestions dropdown */}
      {showSuggestions && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: colors.surface,
            border: borders.thin,
            borderRadius: radius.sm,
            marginTop: spacing.xs,
            boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
            zIndex: 100,
            overflow: 'hidden',
          }}
        >
          {suggestions.map((product) => (
            <div
              key={product.id}
              onMouseDown={(e) => e.preventDefault()} // prevent blur before click
              onClick={() => handleSuggestionClick(product)}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: `${spacing.sm} ${spacing.md}`,
                cursor: 'pointer',
                borderBottom: `1px solid ${colors.border}`,
                transition: 'background 120ms ease',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = colors.mutedSurface)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = 'transparent')
              }
            >
              <span
                style={{
                  fontSize: typography.small.fontSize,
                  color: colors.textPrimary,
                  fontWeight: 500,
                }}
              >
                {product.name}
              </span>
              <span
                style={{
                  fontSize: typography.micro.fontSize,
                  color: colors.gold,
                  fontWeight: 600,
                  marginLeft: spacing.sm,
                  flexShrink: 0,
                }}
              >
                {product.price || product.category}
              </span>
            </div>
          ))}

          {/* No results state */}
          {suggestions.length === 0 && query && (
            <div
              style={{
                padding: `${spacing.sm} ${spacing.md}`,
                fontSize: typography.small.fontSize,
                color: colors.textMuted,
              }}
            >
              No results for "{query}"
            </div>
          )}
        </div>
      )}
    </div>
  );
}
