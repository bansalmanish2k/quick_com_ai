import React from 'react';
import { Sparkles, UploadCloud } from 'lucide-react';

export default function Hero({ onOpenSmartList }) {
  return (
    <section className="hero-section">
      <div className="hero-card">
        <div className="hero-content">
          <div className="tag-ai animate-scale-in">
            <Sparkles size={16} fill="currentColor" />
            AI-Powered Grocery Shopping
          </div>
          <h1 className="text-5xl font-extrabold mb-4" style={{ lineHeight: '1.1' }}>
            Groceries delivered in <br/>
            <span className="text-brand">10 minutes.</span>
          </h1>
          <p className="text-lg text-muted mb-8" style={{ maxWidth: '480px' }}>
            Got a handwritten grocery list? Just snap a photo. Our AI will read your handwriting and build your cart instantly.
          </p>
          <div className="flex gap-4">
            <button className="btn btn-primary flex items-center gap-2 text-lg" style={{ padding: '16px 32px' }} onClick={onOpenSmartList}>
              <UploadCloud size={24} />
              Upload List
            </button>
          </div>
        </div>
        
        <div className="hero-image-container animate-float">
          <img src="/hero.png" alt="Fresh groceries bursting out of bag" className="hero-img" onError={(e) => { e.target.style.display = 'none'; }} />
        </div>
      </div>

      <div className="marquee-wrapper">
        <div className="marquee-content">
          {/* We duplicate the items to create a seamless loop */}
          {[...Array(2)].map((_, i) => (
            <React.Fragment key={i}>
              <div className="marquee-item"><span className="emoji">🍎</span> Fresh Fruits</div>
              <div className="marquee-item"><span className="emoji">🥦</span> Daily Vegetables</div>
              <div className="marquee-item"><span className="emoji">🥛</span> Dairy & Eggs</div>
              <div className="marquee-item"><span className="emoji">🍞</span> Bakery Items</div>
              <div className="marquee-item"><span className="emoji">🥤</span> Cold Drinks</div>
              <div className="marquee-item"><span className="emoji">🍫</span> Sweet Tooth</div>
              <div className="marquee-item"><span className="emoji">🧼</span> Personal Care</div>
              <div className="marquee-item"><span className="emoji">🥩</span> Meat & Seafood</div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
