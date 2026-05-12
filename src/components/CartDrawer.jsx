import React from 'react';
import { ShoppingCart, X, Plus, Minus, Trash2 } from 'lucide-react';

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  cart, 
  onUpdateQty, 
  cartTotal 
}) {
  return (
    <>
      <div className={`cart-drawer-overlay ${isOpen ? 'visible' : ''}`} style={{ display: isOpen ? 'block' : 'none' }} onClick={onClose}></div>
      <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2 className="text-2xl font-extrabold flex items-center gap-3">
            <ShoppingCart size={28} />
            My Cart
          </h2>
          <button className="btn-icon" style={{ border: 'none' }} onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        
        <div className="cart-body">
          {cart.length === 0 ? (
            <div className="flex-col items-center justify-center text-center" style={{ height: '100%', color: 'var(--text-tertiary)' }}>
              <div style={{ background: 'var(--bg-main)', padding: '32px', borderRadius: '50%', marginBottom: '24px' }}>
                <ShoppingCart size={64} strokeWidth={1} />
              </div>
              <h3 className="text-xl font-bold text-secondary mb-2">Your cart is empty</h3>
              <p>Looks like you haven't added any items yet.</p>
              <button className="btn btn-primary mt-8" onClick={onClose}>Start Shopping</button>
            </div>
          ) : (
            <div className="flex-col gap-4">
              {cart.map(item => (
                <div key={item.product.id} className="cart-item">
                  <div className="cart-item-img">
                    {item.product.emoji}
                  </div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div className="font-bold text-lg leading-tight mb-1">{item.product.name}</div>
                      <div className="text-muted text-sm">{item.product.weight}</div>
                    </div>
                    <div className="font-extrabold text-brand text-lg mt-2">₹{item.product.price * item.qty}</div>
                  </div>
                  <div className="flex-col items-end justify-between">
                    <button style={{ color: 'var(--text-tertiary)', background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => onUpdateQty(item.product.id, -item.qty)}>
                      <Trash2 size={20} />
                    </button>
                    
                    <div className="qty-control" style={{ marginTop: 'auto' }}>
                      <button className="qty-btn" onClick={() => onUpdateQty(item.product.id, -1)}>
                        <Minus size={16} strokeWidth={3} />
                      </button>
                      <span className="font-bold" style={{ width: '28px', textAlign: 'center' }}>
                        {item.qty}
                      </span>
                      <button className="qty-btn" onClick={() => onUpdateQty(item.product.id, 1)}>
                        <Plus size={16} strokeWidth={3} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="flex items-center justify-between mb-4">
              <span className="text-muted font-medium">Item Total</span>
              <span className="font-bold">₹{cartTotal}</span>
            </div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-muted font-medium">Delivery Fee</span>
              <span className="font-bold" style={{ color: '#16A34A' }}>FREE</span>
            </div>
            <div className="flex items-center justify-between mb-6" style={{ paddingTop: '20px', borderTop: '2px dashed var(--border-light)' }}>
              <span className="text-xl font-extrabold">Grand Total</span>
              <span className="text-2xl font-extrabold text-brand">₹{cartTotal}</span>
            </div>
            <button className="btn btn-primary" style={{ width: '100%', padding: '18px', fontSize: '18px', boxShadow: '0 8px 24px rgba(255, 43, 79, 0.4)' }}>
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}
