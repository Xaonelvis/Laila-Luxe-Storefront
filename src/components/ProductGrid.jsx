import { spacing } from '../design';
import ProductCard from './ProductCard';

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: spacing.xl,
    alignItems: 'start',
  },
};

export default function ProductGrid({ products }) {
  return (
    <section style={styles.grid}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
}
