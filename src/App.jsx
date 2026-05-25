import { useState } from 'react';
import { products } from './data/products';
import ProductCard from './components/ProductCard';
import { spacing } from './design';

function App() {
  const [category, setCategory] = useState('all');

  const filteredProducts =
    category === 'all'
      ? products
      : products.filter((p) => p.category === category);

  return (
    <div style={{ background: '#F5F1EA', minHeight: '100vh' }}>
      {/* HEADER */}
      <div style={{ textAlign: 'center', padding: '80px 20px 30px' }}>
        <h1 style={{ letterSpacing: '6px', fontWeight: '300', margin: 0 }}>
          LAILA LUXE
        </h1>

        <div
          style={{
            width: '60px',
            height: '1px',
            background: '#C6A972',
            margin: '20px auto',
          }}
        />

        <p style={{ color: '#555' }}>Redefining Everyday Luxury</p>
      </div>

      {/* CATEGORY FILTER */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          flexWrap: 'wrap',
          marginBottom: '30px',
        }}
      >
        {['all', 'home', 'fashion', 'lifestyle', 'accessories'].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            style={{
              padding: '8px 14px',
              borderRadius: '20px',
              border: '1px solid #C6A972',
              background: category === cat ? '#C6A972' : 'transparent',
              color: category === cat ? 'white' : '#2B2B2B',
              cursor: 'pointer',
              fontSize: '13px',
            }}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      {/* PRODUCTS GRID */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          padding: '20px 40px 60px',
          maxWidth: '1100px',
          margin: '0 auto',
          gap: spacing.lg,
        }}
      >
        {filteredProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}

export default App;
