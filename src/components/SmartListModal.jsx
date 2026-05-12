import React, { useRef } from 'react';
import { X, Sparkles, UploadCloud, FileText, CheckCircle } from 'lucide-react';

export default function SmartListModal({ 
  isOpen, 
  onClose, 
  uploadState, 
  scannedItems, 
  rawText,
  onFileUpload, 
  onRetake, 
  onAddItems 
}) {
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay animate-fade-in" style={{ animation: 'fadeIn 0.2s ease-out' }}>
      <div className="modal-content animate-scale-in">
        <div className="modal-header">
          <div className="flex items-center gap-3">
            <div style={{ background: 'var(--ai-light)', padding: '8px', borderRadius: '8px', color: '#7E22CE' }}>
              <Sparkles size={24} fill="currentColor" />
            </div>
            <h2 className="text-2xl font-bold">Smart List Reader</h2>
          </div>
          <button className="btn-icon" style={{ border: 'none' }} onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="modal-body">
          {uploadState === 'idle' && (
            <div className="animate-slide-up">
              <p className="text-muted mb-6 text-lg">
                Take a photo or upload your handwritten grocery list. Our AI will automatically read it and add items to your cart.
              </p>
              <div className="upload-zone" onClick={() => fileInputRef.current?.click()}>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  style={{ display: 'none' }} 
                  accept="image/*" 
                  onChange={onFileUpload} 
                />
                <div className="upload-icon-wrapper">
                  <UploadCloud size={40} />
                </div>
                <h3 className="text-xl font-bold mb-2">Click or drag image to upload</h3>
                <p className="text-muted">Supports JPG, PNG (Max 5MB)</p>
              </div>
            </div>
          )}

          {(uploadState === 'uploading' || uploadState === 'scanning') && (
            <div className="flex-col items-center justify-center animate-scale-in" style={{ padding: '40px 0', textAlign: 'center' }}>
              {uploadState === 'scanning' ? (
                <div className="scan-container mb-8">
                  <FileText size={80} strokeWidth={1} />
                  <div className="scan-line"></div>
                </div>
              ) : (
                <div className="upload-icon-wrapper animate-float mb-8" style={{ background: 'var(--primary-light)' }}>
                  <UploadCloud size={40} className="text-brand" />
                </div>
              )}
              
              <h3 className="text-2xl font-bold mb-3">
                {uploadState === 'uploading' ? 'Uploading list...' : 'AI is reading your handwriting...'}
              </h3>
              <p className="text-muted text-lg">This will just take a moment</p>
            </div>
          )}

          {uploadState === 'success' && (
            <div className="animate-slide-up">
              <div className="flex items-center gap-3 mb-6 p-4" style={{ backgroundColor: '#F0FDF4', color: '#16A34A', borderRadius: '12px', border: '1px solid #BBF7D0' }}>
                <CheckCircle size={28} fill="currentColor" color="white" />
                <h3 className="text-xl font-bold">Successfully scanned!</h3>
              </div>
              
              <div style={{ backgroundColor: '#F8FAFC', borderRadius: '16px', padding: '24px', marginBottom: '32px', border: '1px solid var(--border-light)' }}>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-lg text-secondary">Items Found</h4>
                  <span className="font-bold text-brand" style={{ background: 'var(--primary-light)', padding: '4px 12px', borderRadius: 'full' }}>{scannedItems.length} Items</span>
                </div>
                
                <div className="flex-col gap-3" style={{ maxHeight: '250px', overflowY: 'auto', paddingRight: '8px' }}>
                  {scannedItems.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between" style={{ backgroundColor: 'white', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-light)', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                      <div className="flex items-center gap-4">
                        <span style={{ fontSize: '32px', background: 'var(--bg-main)', padding: '8px', borderRadius: '8px' }}>{item.product.emoji}</span>
                        <div>
                          <div className="font-bold text-lg">{item.product.name}</div>
                          <div className="text-muted text-sm">{item.product.weight}</div>
                        </div>
                      </div>
                      <div className="flex-col items-end gap-1">
                        <span className="font-extrabold text-lg text-brand">₹{item.product.price * item.qty}</span>
                        <span className="text-muted font-medium bg-gray-100 px-2 rounded">Qty: {item.qty}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-4 mb-4">
                <button className="btn btn-secondary" style={{ flex: 1, padding: '16px' }} onClick={onRetake}>
                  Retake Photo
                </button>
                <button className="btn btn-primary" style={{ flex: 2, padding: '16px', fontSize: '18px' }} onClick={onAddItems}>
                  Add Items to Cart
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
