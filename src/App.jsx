import { useState } from 'react';
import { products } from './data/products';
import ProductCard from './components/ProductCard';
import CategoryFilter from './components/CategoryFilter';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MainLayout from './layouts/MainLayout';
import { spacing } from './design';

function App() {
  const [category, setCategory] = useState('all');

  const filteredProducts =
    category === 'all'
      ? products
      : products.filter((p) => p.category === category);

  return (
    <div style={{ background: '#F5F1EA', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* NAVBAR */}
      <Navbar />

      {/* MAIN CONTENT */}
      <MainLayout>
        {/* HEADER */}
        <div style={{ textAlign: 'center', paddingBottom: spacing.xl }}>
          <h1 style={{ letterSpacing: '6px', fontWeight: '300', margin: 0, fontSize: '48px' }}>
            LAILA LUXE
          </h1>

          <div
            style={{
              width: '80px',
              height: '2px',
              background: '#C6A972',
              margin: `${spacing.lg} auto`,
            }}
          />

          <p style={{ color: '#555', margin: 0 }}>Redefining Everyday Luxury</p>
        </div>

        {/* CATEGORY FILTER */}
        <CategoryFilter activeCategory={category} onChange={setCategory} />

        {/* PRODUCTS GRID */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: spacing.lg,
            marginBottom: spacing.huge,
          }}
        >
          {filteredProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </MainLayout>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}

export default App;
