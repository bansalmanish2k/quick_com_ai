import React, { useState } from 'react';
import { ShoppingCart, Mail, Phone, MapPin, CheckCircle } from 'lucide-react';

export default function Footer({ onCategoryClick }) {
  const [toastMessage, setToastMessage] = useState('');

  const handleCategoryClick = (e, category) => {
    e.preventDefault();
    if (onCategoryClick) {
      onCategoryClick(category);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleLinkClick = (e, linkName) => {
    e.preventDefault();
    setToastMessage(`Navigated to ${linkName}`);
    setTimeout(() => setToastMessage(''), 3000);
  };

  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            {/* Brand Column */}
            <div className="footer-col" style={{ maxWidth: '300px' }}>
              <div className="flex items-center gap-2 mb-6">
                <div className="logo-wrapper">
                  <ShoppingCart size={20} strokeWidth={2.5} />
                </div>
                <h1 className="text-xl font-extrabold" style={{ letterSpacing: '-0.5px' }}>
                  Quick<span className="text-brand">Cart</span>
                </h1>
              </div>
              <p className="text-muted font-medium mb-6">
                Your favorite groceries delivered in 10 minutes. Say goodbye to long supermarket lines and hello to instant convenience.
              </p>
            </div>

            {/* Categories */}
            <div className="footer-col">
              <h4>Categories</h4>
              <ul>
                <li><a href="#" onClick={(e) => handleCategoryClick(e, 'Vegetables')}>Fresh Vegetables</a></li>
                <li><a href="#" onClick={(e) => handleCategoryClick(e, 'Fresh Fruits')}>Fresh Fruits</a></li>
                <li><a href="#" onClick={(e) => handleCategoryClick(e, 'Dairy')}>Dairy Products</a></li>
                <li><a href="#" onClick={(e) => handleCategoryClick(e, 'Bakery')}>Bakery & Bread</a></li>
              </ul>
            </div>

            {/* Useful Links */}
            <div className="footer-col">
              <h4>Useful Links</h4>
              <ul>
                <li><a href="#" onClick={(e) => handleLinkClick(e, 'About Us')}>About Us</a></li>
                <li><a href="#" onClick={(e) => handleLinkClick(e, 'Careers')}>Careers</a></li>
                <li><a href="#" onClick={(e) => handleLinkClick(e, 'Partner with us')}>Partner with us</a></li>
                <li><a href="#" onClick={(e) => handleLinkClick(e, 'Terms & Conditions')}>Terms & Conditions</a></li>
                <li><a href="#" onClick={(e) => handleLinkClick(e, 'Privacy Policy')}>Privacy Policy</a></li>
                <li><a href="#" onClick={(e) => handleLinkClick(e, 'Refund Policy')}>Refund Policy</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="footer-col">
              <h4>Contact Us</h4>
              <ul style={{ gap: '16px' }}>
                <li className="flex items-start gap-3">
                  <MapPin size={20} className="text-brand" style={{ flexShrink: 0 }} />
                  <span className="text-secondary font-medium">VIP Road, Zirakpur</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={20} className="text-brand" style={{ flexShrink: 0 }} />
                  <span className="text-secondary font-medium">+91 99960 57141</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={20} className="text-brand" style={{ flexShrink: 0 }} />
                  <span className="text-secondary font-medium">support@quickcart.ai</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="flex flex-col md-flex-row items-center justify-between gap-4">
              <div>
                &copy; {new Date().getFullYear()} QuickCart AI. All rights reserved.
              </div>
              <div className="flex items-center gap-4">
                <span>Made with ❤️ in India</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="animate-fade-in" style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          backgroundColor: 'var(--surface)',
          color: 'var(--text-primary)',
          padding: '16px 24px',
          borderRadius: '12px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          border: '1px solid var(--border-light)',
          borderLeft: '4px solid var(--primary)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          fontWeight: '600'
        }}>
          <CheckCircle size={20} className="text-brand" />
          {toastMessage}
        </div>
      )}
    </>
  );
}
