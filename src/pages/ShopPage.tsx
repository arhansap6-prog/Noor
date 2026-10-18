import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useStore } from '../context/StoreContext';
import { Search, SlidersHorizontal, X, ArrowUpDown, Star, Plus, Eye, Sparkles, Filter } from 'lucide-react';
import { Product } from '../types';

export const ShopPage: React.FC = () => {
  const { products, categories, pageParams, setCurrentPage, addToCart, settings, showToast } = useStore();

  const [searchQuery, setSearchQuery] = useState<string>(pageParams?.search || '');
  const [selectedCategory, setSelectedCategory] = useState<string>(pageParams?.category || 'All');
  const [selectedSort, setSelectedSort] = useState<string>('featured');
  const [maxPrice, setMaxPrice] = useState<number>(10000);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Filter and sort logic
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const queryMatch =
        !searchQuery.trim() ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ((p as any).brand && (p as any).brand.toLowerCase().includes(searchQuery.toLowerCase()));

      const categoryMatch =
        selectedCategory === 'All' ||
        p.category.toLowerCase() === selectedCategory.toLowerCase() ||
        (selectedCategory === 'New Arrivals' && p.newArrival) ||
        (selectedCategory === 'Best Sellers' && p.bestSeller);

      const actualPrice = p.salePrice || p.price;
      const priceMatch = actualPrice <= maxPrice;
      const stockMatch = !inStockOnly || p.status === 'available';

      return queryMatch && categoryMatch && priceMatch && stockMatch;
    }).sort((a, b) => {
      const priceA = a.salePrice || a.price;
      const priceB = b.salePrice || b.price;

      if (selectedSort === 'price-low') return priceA - priceB;
      if (selectedSort === 'price-high') return priceB - priceA;
      if (selectedSort === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      if (selectedSort === 'bestselling') return (b.bestSeller ? 1 : 0) - (a.bestSeller ? 1 : 0);
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [products, searchQuery, selectedCategory, selectedSort, maxPrice, inStockOnly]);

  return (
    <div className="bg-[#F5F2EB] text-neutral-900 min-h-screen pb-16 font-sans">
      
      {/* 1. SHOP HEADER BANNER (YUSUF BHAI STYLE DARK FOREST GREEN) */}
      <section className="bg-[#0c1e14] text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-b border-amber-400/20 text-center space-y-3 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        <div className="max-w-4xl mx-auto space-y-2 relative z-10">
          <span className="text-[10px] sm:text-xs text-amber-300 uppercase tracking-[0.3em] font-semibold block">
            {settings.brandName || "NOOR ESSENSE ATTAR & PERFUME"} FRAGRANCE CATALOGUE
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#F5F2EB] font-light uppercase tracking-wider drop-shadow-md">
            THE COMPLETE COLLECTION
          </h1>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-xl mx-auto font-light">
            Hand-crafted Eau de Parfums, 100% non-alcoholic concentrated attar oils, and exclusive gift sets.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Category Pills Bar */}
        <div className="flex overflow-x-auto scrollbar-none gap-2 sm:gap-3 pb-6 select-none" style={{ scrollbarWidth: 'none' }}>
          {[
            { id: 'All', label: 'ALL FRAGRANCES' },
            { id: 'Perfumes', label: 'EAU DE PARFUM' },
            { id: 'Attar Oils', label: 'PURE ATTARS' },
            { id: 'Deals & Combos', label: 'DEALS & COMBOS' },
            { id: 'Best Sellers', label: 'BEST SELLERS' },
            { id: 'New Arrivals', label: 'NEW ARRIVALS' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider whitespace-nowrap transition-all cursor-pointer border ${
                selectedCategory === tab.id
                  ? 'bg-[#0c1e14] text-[#F5F2EB] border-[#0c1e14] shadow-md'
                  : 'bg-white text-neutral-800 border-neutral-300 hover:border-neutral-500'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Filter & Search Toolbar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8 bg-white p-4 rounded-2xl border border-neutral-300 shadow-xs">
          
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by perfume name, notes, or inspired brand..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#F5F2EB] border border-neutral-200 focus:border-[#0c1e14] text-neutral-900 placeholder-neutral-500 rounded-xl pl-10 pr-8 py-2.5 text-xs focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between md:justify-end gap-3 text-xs">
            <button
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              className="md:hidden flex items-center gap-2 px-3.5 py-2 bg-neutral-100 border border-neutral-200 rounded-xl text-neutral-800 font-medium cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4 text-neutral-900" />
              <span>Filters ({filteredProducts.length})</span>
            </button>

            <div className="flex items-center gap-2">
              <span className="text-neutral-500 uppercase tracking-wider text-[10px] hidden sm:inline font-bold">Sort By:</span>
              <select
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                className="bg-[#F5F2EB] border border-neutral-200 text-neutral-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#0c1e14] uppercase tracking-wider cursor-pointer font-semibold"
              >
                <option value="featured">Featured First</option>
                <option value="bestselling">Best Selling</option>
                <option value="newest">Newest Arrivals</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid Layout */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="bg-[#EFECE4] rounded-2xl p-4 border border-neutral-300/80 hover:border-neutral-500 transition-all shadow-xs hover:shadow-md flex flex-col justify-between group relative"
            >
              {/* Product Image Container (100% UNCROPPED) */}
              <div
                onClick={() => setCurrentPage('product-detail', { productId: product.id })}
                className="w-full h-[220px] sm:h-[250px] bg-white rounded-xl overflow-hidden p-3 relative cursor-pointer flex items-center justify-center border border-neutral-200"
              >
                <img
                  src={product.images[0] || '/cat_1.jpg'}
                  alt={product.name}
                  className="w-full h-full object-contain p-1 group-hover:scale-105 transition-transform duration-300"
                />

                {/* Eye Quick View Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setQuickViewProduct(product);
                  }}
                  className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-white/90 border border-neutral-200 text-neutral-700 hover:bg-[#0c1e14] hover:text-white shadow-xs transition-colors"
                  title="Quick View"
                >
                  <Eye className="w-3.5 h-3.5" />
                </button>

                {/* Quick Add Plus Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product);
                    showToast(`${product.name} added to cart!`);
                  }}
                  className="absolute bottom-2.5 right-2.5 w-8 h-8 rounded-lg bg-white border border-neutral-300 shadow-sm flex items-center justify-center text-neutral-900 hover:bg-[#0c1e14] hover:text-white transition-all cursor-pointer"
                  title="Quick Add to Cart"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Information */}
              <div className="mt-4 space-y-1 text-left">
                <span className="text-[9px] font-mono tracking-widest text-neutral-500 uppercase block font-bold">
                  INSPIRED BY {(product as any).brand || settings.brandName || 'NOOR ESSENSE ATTAR & PERFUME'}
                </span>
                <h3
                  onClick={() => setCurrentPage('product-detail', { productId: product.id })}
                  className="font-serif text-sm font-bold text-neutral-950 uppercase tracking-wide truncate cursor-pointer hover:text-amber-900"
                >
                  {product.name}
                </h3>
                <div className="text-xs font-mono font-semibold text-neutral-900">
                  FROM ₹ {(product.salePrice || product.price).toLocaleString('en-IN')}.00
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-neutral-200 p-8 space-y-3 my-8">
            <Sparkles className="w-10 h-10 text-neutral-400 mx-auto" />
            <h3 className="font-serif text-xl font-bold uppercase tracking-wider text-neutral-900">No Fragrances Found</h3>
            <p className="text-xs text-neutral-500 max-w-sm mx-auto">
              Try adjusting your search keywords or select a different fragrance category tab.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="mt-2 px-6 py-2.5 bg-[#0c1e14] text-white text-xs uppercase font-bold tracking-widest rounded-xl hover:bg-black transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </div>

      {/* QUICK VIEW POPUP MODAL */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#F5F2EB] text-neutral-900 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 relative border border-neutral-300 shadow-2xl animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white border border-neutral-200 text-neutral-600 hover:text-black cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-4">
              <div className="w-full h-[240px] bg-white rounded-2xl overflow-hidden p-3 border border-neutral-200 flex items-center justify-center">
                <img src={quickViewProduct.images[0] || '/cat_1.jpg'} alt={quickViewProduct.name} className="w-full h-full object-contain" />
              </div>

              <div>
                <span className="text-[10px] font-mono tracking-widest text-amber-900 uppercase font-bold">
                  {(quickViewProduct as any).brand || settings.brandName || 'NOOR ESSENSE ATTAR & PERFUME'}
                </span>
                <h3 className="font-serif text-2xl font-bold uppercase tracking-wide text-neutral-950">
                  {quickViewProduct.name}
                </h3>
                <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                  {quickViewProduct.description}
                </p>
              </div>

              <div className="text-xl font-serif font-black text-neutral-950 font-mono">
                ₹ {(quickViewProduct.salePrice || quickViewProduct.price).toLocaleString('en-IN')}.00
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => {
                    addToCart(quickViewProduct);
                    setQuickViewProduct(null);
                    showToast(`${quickViewProduct.name} added to cart!`);
                  }}
                  className="flex-1 py-3.5 bg-[#0c1e14] text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-black transition-colors cursor-pointer"
                >
                  ADD TO CART
                </button>
                <a
                  href={`https://wa.me/${settings.whatsappNumber?.replace(/[^0-9]/g, '') || '7788008892'}?text=${encodeURIComponent(`Hello, I want to order ${quickViewProduct.name} (₹${quickViewProduct.salePrice || quickViewProduct.price}).`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3.5 bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-emerald-700 transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>WHATSAPP</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
