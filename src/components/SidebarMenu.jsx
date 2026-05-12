import React from 'react';
import { X, User, ShoppingBag, Heart, Settings, HelpCircle, LogOut } from 'lucide-react';

export default function SidebarMenu({ isOpen, onClose }) {
  return (
    <>
      <div className={`side-drawer-overlay ${isOpen ? 'visible' : ''}`} style={{ display: isOpen ? 'block' : 'none' }} onClick={onClose}></div>
      <div className={`side-drawer ${isOpen ? 'open' : ''}`}>
        <div style={{ padding: '24px', borderBottom: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="flex items-center gap-3">
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
              <User size={24} />
            </div>
            <div>
              <div className="font-bold text-lg leading-tight">Guest User</div>
              <div className="text-sm text-brand font-semibold cursor-pointer">Sign in to save progress</div>
            </div>
          </div>
          <button className="btn-icon" style={{ border: 'none' }} onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        
        <div style={{ flex: 1, padding: '16px 0', overflowY: 'auto' }}>
          <button className="sidebar-menu-item">
            <ShoppingBag size={20} className="text-muted" />
            My Orders
          </button>
          <button className="sidebar-menu-item">
            <Heart size={20} className="text-muted" />
            Saved Items
          </button>
          <div style={{ height: '1px', background: 'var(--border-light)', margin: '16px 24px' }}></div>
          <button className="sidebar-menu-item">
            <Settings size={20} className="text-muted" />
            Settings
          </button>
          <button className="sidebar-menu-item">
            <HelpCircle size={20} className="text-muted" />
            Support
          </button>
        </div>
        
        <div style={{ padding: '24px', borderTop: '1px solid var(--border-light)' }}>
          <button className="sidebar-menu-item" style={{ padding: '0', color: 'var(--text-secondary)' }}>
            <LogOut size={20} />
            Log Out
          </button>
        </div>
      </div>
    </>
  );
}
