/**
 * LAILA LUXE
 * FILE: App.jsx
 * PLACEMENT: src/App.jsx  (REPLACE existing)
 *
 * ARCHITECTURE FLOW (per spec):
 * Homepage → Category Modal → Product Detail Modal → Cart Drawer → WhatsApp
 *
 * CHANGES FROM PREVIOUS VERSION:
 * - searchQuery state: passed to Navbar → SearchBar; filters the product grid
 * - modalCategory state: clicking a category filter pill opens CategoryModal
 *   for that category. "ALL" closes the modal and resets filter.
 * - filteredProducts: filters by BOTH category AND searchQuery
 * - CategoryModal renders at app level (one instance, not per-card)
 * - onSearch passed to Navbar → SearchBar for real-time grid filtering
 * - CategoryFilter onChange updated: non-"all" clicks open CategoryModal
 *   in addition to filtering the grid (per "we keep filters" spec rule)
 */

import { useState, useRef } from 'react';
import { products } from './data/products';
import ProductGrid from './components/ProductGrid';
import CategoryFilter from './components/CategoryFilter';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import MarqueeStrip from './components/MarqueeStrip';
import CategoryModal from './components/CategoryModal';
import MainLayout from './layouts/MainLayout';

function App() {
  const [category, setCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [modalCategory, setModalCategory] = useState(null); // null = modal closed

  // Ref for Hero CTA smooth scroll
  const productsRef = useRef(null);
  const scrollToProducts = () =>
    productsRef.current?.scrollIntoView({ behavior: 'smooth' });

  // ── Category handler ─────────────────────────────────────────────────────
  // "All" → reset filter, close modal
  // Any category → filter grid AND open CategoryModal as browse lens
  const handleCategoryChange = (cat) => {
    setCategory(cat);
    setModalCategory(cat === 'all' ? null : cat);
  };

  // Called from CategoryModal's internal switcher — keeps grid in sync
  const handleModalCategoryChange = (cat) => {
    setCategory(cat);
    setModalCategory(cat);
  };

  // ── Filtered products ────────────────────────────────────────────────────
  // Filters by both the active category chip AND the search query
  const filteredProducts = products.filter((p) => {
    const matchCat = category === 'all' || p.category === category;
    const matchSearch =
      !searchQuery ||
      p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div
      style={{
        background: '#F5F0E8',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Navbar — receives onSearch to wire SearchBar to this state */}
      <Navbar onSearch={setSearchQuery} />

      {/* Hero — "Explore Collections" scrolls to products section */}
      <Hero onExplore={scrollToProducts} />

      {/* Marquee strip */}
      <MarqueeStrip />

      {/* Main content */}
      <MainLayout>
        <div ref={productsRef}>
          {/* Category filter pills
              Clicking a specific category also opens CategoryModal */}
          <CategoryFilter
            activeCategory={category}
            onChange={handleCategoryChange}
          />

          {/* Product grid — stagger animations handled inside ProductGrid */}
          <ProductGrid products={filteredProducts} />
        </div>
      </MainLayout>

      {/* Footer */}
      <Footer />

      {/* ── App-level CategoryModal ──────────────────────────────────────────
          Rendered once here — triggered by CategoryFilter pill clicks.
          ProductCard category pills manage their own CategoryModal internally. */}
      <CategoryModal
        category={modalCategory}
        isOpen={!!modalCategory}
        onClose={() => setModalCategory(null)}
        onCategoryChange={handleModalCategoryChange}
      />
    </div>
  );
}

export default App;
