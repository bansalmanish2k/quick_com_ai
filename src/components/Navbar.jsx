import React from 'react';
import { ShoppingCart, Search, Menu, Sparkles } from 'lucide-react';

export default function Navbar({ cartItemCount, onOpenSmartList, onOpenCart, onOpenMenu, searchQuery, onSearchChange }) {
  return (
    <nav className="navbar">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="btn-icon" style={{ border: 'none' }} onClick={onOpenMenu}>
            <Menu size={24} />
          </button>
          <div className="flex items-center gap-3" style={{ cursor: 'pointer' }}>
            <div className="logo-wrapper">
              <ShoppingCart size={22} strokeWidth={2.5} />
            </div>
            <h1 className="text-xl font-extrabold" style={{ letterSpacing: '-0.5px' }}>
              Quick<span className="text-brand">Cart</span>
            </h1>
          </div>
        </div>

        <div className="search-bar-container">
          <div className="search-bar">
            <Search size={20} className="text-muted" />
            <input 
              type="text" 
              placeholder="Search for groceries, essentials, and more..." 
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center gap-6">
          <button className="btn btn-ai flex items-center gap-2" onClick={onOpenSmartList}>
            <Sparkles size={18} fill="currentColor" />
            <span>Smart List</span>
          </button>
          <button className="btn-icon" style={{ position: 'relative', border: 'none' }} onClick={onOpenCart}>
            <ShoppingCart size={24} />
            {cartItemCount > 0 && <span className="badge">{cartItemCount}</span>}
          </button>
          <button className="btn btn-secondary text-sm">Sign In</button>
        </div>
      </div>
    </nav>
  );
}
