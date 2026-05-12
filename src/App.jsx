import React, { useState, useEffect } from 'react';
import fuzzysort from 'fuzzysort';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import SmartListModal from './components/SmartListModal';
import CartDrawer from './components/CartDrawer';
import SidebarMenu from './components/SidebarMenu';
import Footer from './components/Footer';
import { PRODUCTS } from './data/products';

export default function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [uploadState, setUploadState] = useState('idle'); // idle | uploading | scanning | success
  const [scannedItems, setScannedItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [rawText, setRawText] = useState('');

  // Prevent background scroll when modal/drawer is open
  useEffect(() => {
    if (isCartOpen || isUploadOpen || isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isCartOpen, isUploadOpen, isMenuOpen]);

  const addToCart = (product, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => item.product.id === product.id ? { ...item, qty: item.qty + qty } : item);
      }
      return [...prev, { product, qty }];
    });
  };

  const updateCartQty = (productId, delta) => {
    setCart((prev) => prev.map(item => {
      if (item.product.id === productId) {
        const newQty = Math.max(0, item.qty + delta);
        return { ...item, qty: newQty };
      }
      return item;
    }).filter(item => item.qty > 0));
  };

  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      processList(e.target.files[0]);
    }
  };

  const processList = async (file) => {
    setUploadState('uploading');
    setRawText('');

    try {
      await new Promise(res => setTimeout(res, 800));
      setUploadState('scanning');

      const getBase64 = (f) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(f);
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.onerror = error => reject(error);
      });

      const base64Data = await getBase64(file);
      const apiKey = import.meta.env.VITE_AI_API_KEY;

      if (!apiKey) {
        throw new Error("VITE_AI_API_KEY is not defined in environment variables");
      }

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [
              { text: "Extract all the text from this handwritten or typed shopping list. Return only the text without any markdown or formatting." },
              { inline_data: { mime_type: file.type || "image/jpeg", data: base64Data } }
            ]
          }]
        })
      });

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error.message);
      }

      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
      console.log("AI OCR Result:", text);
      setRawText(text);

      const lines = text.split('\n').filter(l => l.trim().length > 0);
      const matchedItems = [];
      const searchTargets = PRODUCTS.map(p => ({ ...p, searchName: p.name.toLowerCase() }));

      lines.forEach(line => {
        // 1. Robust Quantity Extraction: find the first isolated number
        let qty = 1;
        const qtyMatch = line.match(/\b(\d+)\b/);
        if (qtyMatch) {
          qty = parseInt(qtyMatch[1], 10);
        }

        // 2. Robust Product Matching: Token overlap and substring checking
        const queryWords = line.toLowerCase().match(/[a-z]{3,}/g) || [];

        let bestMatch = null;
        let highestScore = 0;

        searchTargets.forEach(target => {
          let score = 0;
          const targetWords = target.searchName.match(/[a-z]{3,}/g) || [];

          queryWords.forEach(qw => {
            targetWords.forEach(tw => {
              if (qw === tw) {
                score += 10; // Exact word match is highly valued
              } else if (tw.includes(qw) || qw.includes(tw)) {
                score += 4; // Substring match (e.g. "apple" in "apples")
              } else {
                // Fuzzy fallback for minor OCR errors (e.g. "onions" vs "ontons")
                let matchingChars = 0;
                for (let i = 0; i < qw.length; i++) {
                  if (tw.includes(qw[i])) matchingChars++;
                }
                if (matchingChars >= Math.min(qw.length, tw.length) - 1 && qw.length >= 4) {
                  score += 1;
                }
              }
            });
          });

          if (score > highestScore) {
            highestScore = score;
            bestMatch = target;
          }
        });

        // 3. Add to cart if we found a decent match (score >= 4 means at least a substring match)
        if (bestMatch && highestScore >= 4) {
          const existing = matchedItems.find(mi => mi.product.id === bestMatch.id);
          if (existing) {
            existing.qty += qty;
          } else {
            matchedItems.push({ product: bestMatch, qty: qty });
          }
        }
      });

      setScannedItems(matchedItems);
      setUploadState('success');
    } catch (error) {
      console.error("OCR failed", error);
      setUploadState('idle');
    }
  };

  const addScannedItemsToCart = () => {
    scannedItems.forEach(item => {
      addToCart(item.product, item.qty);
    });
    setIsUploadOpen(false);
    setTimeout(() => {
      setUploadState('idle');
      setScannedItems([]);
      setIsCartOpen(true);
    }, 300);
  };

  const cartTotal = cart.reduce((total, item) => total + (item.product.price * item.qty), 0);
  const cartItemCount = cart.reduce((total, item) => total + item.qty, 0);

  // Filter products based on search query
  const filteredProducts = PRODUCTS.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Navbar
        cartItemCount={cartItemCount}
        onOpenSmartList={() => setIsUploadOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenMenu={() => setIsMenuOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className="container">
        {searchQuery === '' && <Hero onOpenSmartList={() => setIsUploadOpen(true)} />}
        <ProductGrid
          products={filteredProducts}
          cart={cart}
          onAddToCart={addToCart}
          onUpdateQty={updateCartQty}
        />
      </main>

      <Footer onCategoryClick={setSearchQuery} />

      <SidebarMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />

      <SmartListModal
        isOpen={isUploadOpen}
        onClose={() => { setIsUploadOpen(false); setUploadState('idle'); setScannedItems([]); }}
        uploadState={uploadState}
        scannedItems={scannedItems}
        rawText={rawText}
        onFileUpload={handleFileUpload}
        onRetake={() => setUploadState('idle')}
        onAddItems={addScannedItemsToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQty={updateCartQty}
        cartTotal={cartTotal}
      />

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fadeIn 0.3s ease-out forwards; }
      `}} />
    </>
  );
}
