import React from 'react';
import { ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';

export default function ProductGrid({ products, cart, onAddToCart, onUpdateQty }) {
  return (
    <section style={{ marginBottom: '80px', marginTop: '32px' }}>
      <div className="section-title">
        <h2 className="text-3xl font-extrabold">Bestsellers</h2>
        <button className="flex items-center gap-1 text-brand font-bold text-lg" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          View All <ChevronRight size={20} />
        </button>
      </div>
      
      <div className="product-grid">
        {products.length === 0 ? (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px 0', color: 'var(--text-secondary)' }}>
            <h3 className="text-xl font-bold mb-2">No products found</h3>
            <p>Try adjusting your search query.</p>
          </div>
        ) : (
          products.map(product => {
            const cartItem = cart.find(item => item.product.id === product.id);
            
            return (
              <ProductCard 
                key={product.id}
                product={product}
                cartItem={cartItem}
                onAddToCart={onAddToCart}
                onUpdateQty={onUpdateQty}
              />
            );
          })
        )}
      </div>
    </section>
  );
}
