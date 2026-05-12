import React from 'react';
import { Plus, Minus } from 'lucide-react';

export default function ProductCard({ product, cartItem, onAddToCart, onUpdateQty }) {
  return (
    <div className="product-card">
      <div className="product-image-wrap">
        {product.emoji}
      </div>
      <div className="flex-col" style={{ flex: 1 }}>
        <div className="text-xs text-muted font-semibold mb-1" style={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          {product.category}
        </div>
        <div className="text-base font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
          {product.name}
        </div>
        <div className="text-sm text-muted mb-4">{product.weight}</div>
        
        <div className="flex items-center justify-between mt-auto">
          <div className="text-lg font-extrabold">₹{product.price}</div>
          
          {cartItem ? (
            <div className="qty-control">
              <button className="qty-btn" onClick={() => onUpdateQty(product.id, -1)}>
                <Minus size={16} strokeWidth={3} />
              </button>
              <span className="font-bold" style={{ width: '28px', textAlign: 'center' }}>
                {cartItem.qty}
              </span>
              <button className="qty-btn" onClick={() => onUpdateQty(product.id, 1)}>
                <Plus size={16} strokeWidth={3} />
              </button>
            </div>
          ) : (
            <button className="btn btn-secondary" style={{ padding: '8px 20px', fontSize: '14px', borderRadius: '8px', color: 'var(--primary)', borderColor: 'var(--primary-light)', backgroundColor: 'var(--primary-light)' }} onClick={() => onAddToCart(product)}>
              Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
