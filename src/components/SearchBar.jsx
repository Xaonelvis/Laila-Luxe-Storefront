/**
 * LAILA LUXE
 * FILE: SearchBar.jsx
 *
 * PURPOSE:
 * Search input component with reveal on hover (desktop).
 * Displays search suggestions as user types.
 *
 * BEHAVIOR:
 * - Desktop: Appears on hover/focus
 * - Mobile: Click to open (handled by Navbar)
 * - Suggestions populate below input
 *
 * RULE:
 * - Visual structure only (suggestion logic placeholder)
 * - Placeholder for suggestion rendering
 */

import { useState, useCallback } from 'react';
import { colors, spacing, typography, borders } from '../design';

const styles = {
  wrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },

  searchIcon: {
    width: '20px',
    height: '20px',
    cursor: 'pointer',
    color: colors.textPrimary,
  },

  inputWrapper: {
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: 'translateY(-50%)',
    display: 'flex',
    alignItems: 'center',
    gap: spacing.sm,
    background: colors.bg,
    borderRadius: '4px',
    border: borders.thin,
    paddingLeft: spacing.md,
    paddingRight: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.sm,
    minWidth: '250px',
    transition: 'all 200ms ease',
    visibility: 'hidden',
    opacity: 0,
  },

  inputWrapperActive: {
    visibility: 'visible',
    opacity: 1,
  },

  input: {
    border: 'none',
    background: 'transparent',
    outline: 'none',
    fontSize: typography.small.fontSize,
    color: colors.textPrimary,
    width: '100%',
    padding: 0,
    fontFamily: 'inherit',

    '&::placeholder': {
      color: colors.textSecondary,
    },
  },

  suggestionsContainer: {
    position: 'absolute',
    top: '100%',
    right: 0,
    background: colors.bg,
    border: borders.thin,
    borderRadius: '4px',
    marginTop: spacing.xs,
    minWidth: '250px',
    maxHeight: '300px',
    overflowY: 'auto',
    zIndex: 10,
    display: 'none',
  },

  suggestionsContainerActive: {
    display: 'block',
  },

  suggestionItem: {
    padding: `${spacing.sm} ${spacing.md}`,
    cursor: 'pointer',
    borderBottom: `1px solid ${colors.border}`,
    fontSize: typography.small.fontSize,
    color: colors.textPrimary,
    transition: 'background 150ms ease',

    '&:hover': {
      background: colors.bg,
    },

    '&:last-child': {
      borderBottom: 'none',
    },
  },
};

export default function SearchBar() {
  const [isActive, setIsActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleSearchChange = useCallback((e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    // TODO: Implement suggestion logic based on products
    // For now, generate placeholder suggestions
    if (query.length > 0) {
      const placeholders = [
        `Search: ${query}`,
        `${query} - Collections`,
        `${query} - All Products`,
      ];
      setSuggestions(placeholders);
    } else {
      setSuggestions([]);
    }
  }, []);

  return (
    <div style={styles.wrapper}>
      {/* Search Icon */}
      <svg
        style={styles.searchIcon}
        onClick={() => setIsActive(true)}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>

      {/* Search Input */}
      <div
        style={{
          ...styles.inputWrapper,
          ...(isActive && styles.inputWrapperActive),
        }}
      >
        <input
          type="text"
          placeholder="Search collections..."
          value={searchQuery}
          onChange={handleSearchChange}
          onBlur={() => setTimeout(() => setIsActive(false), 200)}
          autoFocus
          style={styles.input}
        />
      </div>

      {/* Suggestions Dropdown */}
      <div
        style={{
          ...styles.suggestionsContainer,
          ...(isActive && suggestions.length > 0 && styles.suggestionsContainerActive),
        }}
      >
        {suggestions.map((suggestion, idx) => (
          <div key={idx} style={styles.suggestionItem}>
            {suggestion}
          </div>
        ))}
      </div>
    </div>
  );
}
