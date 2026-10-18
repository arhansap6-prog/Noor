// NOOR ESSENSE ATTAR & PERFUME - Premier Luxury Fragrance Store
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useStore } from '../context/StoreContext';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Truck,
  Award,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  MessageSquare,
  Star,
  Phone,
  MapPin,
  MessageCircle,
  ShoppingBag,
  Eye,
  Crown,
  Compass,
  Zap,
  X,
  Plus,
  Plane,
  Mail,
  Volume2,
  VolumeX,
  Filter,
  Layers,
  Heart,
  Instagram
} from 'lucide-react';
import { Product } from '../types';

export const HomePage: React.FC = () => {
  const { products, setCurrentPage, settings, addToCart, showToast } = useStore();

  const [activeCategoryTab, setActiveCategoryTab] = useState<string>('BEST SELLERS');
  const [activeFeaturedTab, setActiveFeaturedTab] = useState<string>('POEM');
  const [activeScentMood, setActiveScentMood] = useState<string>('FRESH');
  const [isComboModalOpen, setIsComboModalOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [emailSubscription, setEmailSubscription] = useState('');
  const [isMuted, setIsMuted] = useState(true);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const comboCount = settings.comboBottleCount || 5;
  const comboPrice = settings.comboOfferPrice || 1499;
  const isComboOfferVisible =
    settings.comboOfferEnabled !== false &&
    (settings.comboOfferEnabled as any) !== 'false' &&
    (settings.comboOfferEnabled as any) !== 0 &&
    (settings.comboOfferEnabled as any) !== 'inactive' &&
    (typeof window !== 'undefined' ? localStorage.getItem('aaf_combo_offer_enabled') !== 'false' : true);

  const [selectedComboPerfumes, setSelectedComboPerfumes] = useState<string[]>([]);

  const availableComboProducts = products.filter((p) => {
    if (settings.comboProductIds && settings.comboProductIds.length > 0) {
      return settings.comboProductIds.includes(p.id);
    }
    return true;
  });

  const handleOpenComboModal = () => {
    const defaultSelection = [];
    for (let i = 0; i < comboCount; i++) {
      const prod = availableComboProducts[i % (availableComboProducts.length || 1)];
      if (prod) defaultSelection.push(prod.id);
    }
    setSelectedComboPerfumes(defaultSelection);
    setIsComboModalOpen(true);
  };

  const handleAddCustomComboToCart = () => {
    const selectedNames = selectedComboPerfumes
      .map((id) => products.find((p) => p.id === id)?.name)
      .filter(Boolean)
      .join(', ');

    const customComboProduct: Product = {
      id: `custom-combo-${Date.now()}`,
      name: `Custom ${comboCount}-Bottle Perfume Combo (${selectedComboPerfumes.length} Fragrances)`,
      price: settings.comboOfferOriginalPrice || 2499,
      salePrice: comboPrice,
      category: 'Deals & Combos',
      volume: `${comboCount} x 50ml EDP Set`,
      sku: 'AL-COMBO-CUST',
      stock: 100,
      featured: true,
      bestSeller: true,
      newArrival: false,
      status: 'available',
      description: `Selected Fragrances: ${selectedNames}`,
      notes: { top: ['Custom Selection'], middle: ['Selected Fragrances'], base: ['NOOR ESSENSE ATTAR & PERFUME'] },
      images: [
        '/am_user_perfume_hero.jpg?v=2.0',
      ],
      createdAt: new Date().toISOString(),
    };

    addToCart(customComboProduct);
    setIsComboModalOpen(false);
    showToast(`Custom ${comboCount}-Perfume Set (₹${comboPrice}) added to Cart!`);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailSubscription.trim()) {
      showToast('Thank you for subscribing to NOOR ESSENSE ATTAR & PERFUME updates!');
      setEmailSubscription('');
    }
  };

  // Curated lists for Yusuf Bhai style layout
  const weeklyPicks = React.useMemo(() => {
    return products.slice(0, 8).map((p, idx) => ({
      ...p,
      inspiredBy: (p as any).brand || (idx % 2 === 0 ? 'CARTHUSIA' : idx % 3 === 0 ? 'DIOR' : 'BYREDO'),
    }));
  }, [products]);

  const moodFilteredProducts = React.useMemo(() => {
    if (activeScentMood === 'FRESH') return products.filter(p => p.name.includes('Blue') || p.name.includes('Ice') || p.category.includes('Aquatic') || p.category.includes('Fresh')).slice(0, 4);
    if (activeScentMood === 'OUD') return products.filter(p => p.name.includes('Oud') || p.name.includes('Alpha') || p.category.includes('Oud')).slice(0, 4);
    if (activeScentMood === 'GOURMAND') return products.filter(p => p.name.includes('Dessert') || p.name.includes('Vanilla') || p.category.includes('Sweet')).slice(0, 4);
    return products.filter(p => p.name.includes('Floral') || p.category.includes('Women') || p.featured).slice(0, 4);
  }, [products, activeScentMood]);

  const brandInspirations = React.useMemo(() => {
    return products.filter(p => p.category === 'Perfumes' || p.category.includes('Perfume')).slice(0, 6);
  }, [products]);

  const featuredCollectionProducts = React.useMemo(() => {
    if (activeFeaturedTab === 'POEM') return products.filter(p => p.name.includes('Poem') || p.category.includes('Luxury') || p.featured).slice(0, 4);
    if (activeFeaturedTab === 'NOBLE') return products.filter(p => p.name.includes('Noble') || p.name.includes('Gold') || p.bestSeller).slice(0, 4);
    if (activeFeaturedTab === 'DEJA VU') return products.filter(p => p.name.includes('Oud') || p.name.includes('Silver')).slice(0, 4);
    return products.slice(0, 4);
  }, [products, activeFeaturedTab]);

  const scrollWeekly = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#F5F2EB] text-neutral-900 min-h-screen font-sans selection:bg-[#0c1e14] selection:text-amber-200">
      
      {/* 1. CONTINUOUS ANIMATED TICKER / ANNOUNCEMENT MARQUEE */}
      <div className="bg-[#0c1e14] text-[#F5F2EB] py-2 px-4 overflow-hidden border-b border-amber-400/20 whitespace-nowrap select-none">
        <div className="inline-block animate-marquee font-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase font-medium">
          <span className="mx-4 text-amber-300">✨ FREE EXPRESS DISPATCH ACROSS INDIA ON ORDERS ABOVE ₹1,499</span>
          <span className="mx-4 text-neutral-400">•</span>
          <span className="mx-4 text-white">100% PURE ALCOHOL-FREE CONCENTRATED ATTARS &amp; LUXURY EDP EXTRAITS</span>
          <span className="mx-4 text-neutral-400">•</span>
          <span className="mx-4 text-amber-300">DIRECT BERHAMPUR ODISHA BOUTIQUE DISPATCH</span>
          <span className="mx-4 text-neutral-400">•</span>
          <span className="mx-4 text-white">WHATSAPP ORDERS: +91 {settings.whatsappNumber?.replace(/[^0-9]/g, '') || "7788008892"}</span>
        </div>
      </div>

      {/* 2. RESPONSIVE HERO BANNER (NO BLACK BORDER OR EMPTY SPACE BELOW) */}
      <section className="relative w-full bg-black text-white">
        <div className="relative w-full overflow-hidden">
          <img
            src="/new_hero_bg.jpg?v=3.0"
            alt="NOOR ESSENSE ATTAR & PERFUME Luxury Hero Background"
            className="w-full h-auto block"
            loading="eager"
            decoding="sync"
          />
          {/* Subtle bottom gradient so buttons pop without darkening the image */}
          <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />

          {/* Hero Overlay Content - Placed perfectly at the bottom overlay of the image */}
          <div className="absolute bottom-4 sm:bottom-8 left-0 right-0 z-10 max-w-4xl mx-auto text-center w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full px-4 sm:px-10 flex flex-row items-center justify-between gap-3 sm:gap-6"
            >
              {/* Left Button: EXPLORE */}
              <button
                onClick={() => setCurrentPage('shop')}
                className="flex-1 max-w-[180px] py-3.5 sm:py-5 bg-neutral-950/90 hover:bg-white hover:text-black text-white font-semibold text-[11px] sm:text-xs tracking-[0.18em] sm:tracking-[0.3em] uppercase border border-amber-400/60 backdrop-blur-xs transition-all duration-300 cursor-pointer shadow-2xl hover:scale-105 text-center whitespace-nowrap"
              >
                EXPLORE
              </button>

              {/* Center Pulsating Scroll Indicator */}
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="text-amber-300 hover:text-white cursor-pointer px-1 flex-shrink-0"
                onClick={() => window.scrollTo({ top: window.innerHeight - 80, behavior: 'smooth' })}
              >
                <ChevronDown className="w-5 h-5 sm:w-7 sm:h-7" />
              </motion.div>

              {/* Right Button: ATTARS & OILS */}
              <button
                onClick={() => setCurrentPage('collections')}
                className="flex-1 max-w-[180px] py-3.5 sm:py-5 bg-white text-neutral-950 font-bold text-[10px] sm:text-xs tracking-[0.08em] sm:tracking-[0.2em] uppercase border border-neutral-300 transition-all duration-300 cursor-pointer shadow-xl hover:scale-105 text-center whitespace-nowrap"
              >
                ATTARS &amp; OILS
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. SCENT PROFILE MOOD MATCHER QUIZ WIDGET */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-neutral-300/60 bg-white/60 backdrop-blur-xs my-6 rounded-3xl border shadow-xs">
        <div className="text-center space-y-2 mb-8">
          <span className="text-[10px] tracking-[0.3em] text-amber-900 font-bold uppercase block">
            PERSONAL FRAGRANCE SELECTOR
          </span>
          <h2 className="font-serif text-xl sm:text-3xl text-neutral-950 uppercase tracking-widest font-normal">
            FIND YOUR SIGNATURE SCENT MOOD
          </h2>
        </div>

        {/* Mood Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 max-w-2xl mx-auto mb-8">
          {[
            { id: 'FRESH', label: '🌊 FRESH & AQUATIC' },
            { id: 'OUD', label: '👑 ROYAL OUD & WOODS' },
            { id: 'GOURMAND', label: '🍨 SWEET GOURMAND' },
            { id: 'FLORAL', label: '🌸 FRENCH FLORAL' },
          ].map((mood) => (
            <button
              key={mood.id}
              onClick={() => setActiveScentMood(mood.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer border ${
                activeScentMood === mood.id
                  ? 'bg-[#0c1e14] text-white border-[#0c1e14] shadow-md'
                  : 'bg-white text-neutral-700 border-neutral-300 hover:border-neutral-500'
              }`}
            >
              {mood.label}
            </button>
          ))}
        </div>

        {/* Mood Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {moodFilteredProducts.map((p) => (
            <div
              key={p.id}
              onClick={() => setQuickViewProduct(p)}
              className="bg-[#EFECE4] rounded-2xl p-3.5 border border-neutral-300/70 hover:border-neutral-500 transition-all cursor-pointer text-center space-y-2 group shadow-2xs"
            >
              <div className="w-full h-[180px] bg-white rounded-xl overflow-hidden p-2 relative flex items-center justify-center border border-neutral-200">
                <img src={p.images[0] || '/cat_1.jpg'} alt={p.name} className="w-full h-full object-contain p-1 group-hover:scale-105 transition-transform" />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setQuickViewProduct(p);
                  }}
                  className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-white border border-neutral-200 text-neutral-700 hover:bg-[#0c1e14] hover:text-white shadow-xs transition-colors"
                  title="Quick View"
                >
                  <Eye className="w-3.5 h-3.5" />
                </button>
              </div>
              <h3 className="font-serif text-xs font-bold text-neutral-950 uppercase tracking-wide truncate">
                {p.name}
              </h3>
              <div className="text-[11px] font-mono font-semibold text-neutral-800">
                ₹ {(p.salePrice || p.price).toLocaleString('en-IN')}.00
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. FRAGRANCE OF THE WEEK SECTION WITH USER UPLOADED BRIGHT BACKGROUND */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border border-neutral-300/60 relative overflow-hidden rounded-3xl my-6 shadow-md">
        {/* User uploaded background image with boosted saturation and no color overlays */}
        <div className="absolute inset-0 z-0">
          <img
            src="/fragrance_of_week_bg.jpg?v=4.0"
            alt="Fragrance of the week background"
            className="w-full h-full object-cover object-center filter saturate-125 brightness-105"
            loading="eager"
            decoding="async"
          />
          <div className="absolute inset-0 bg-black/10 pointer-events-none" />
        </div>

        <div className="relative z-10">
          <div className="text-center space-y-3 mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 border border-white/30 text-white text-[10px] tracking-[0.2em] uppercase font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span>WEEKLY PICK</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl text-white uppercase tracking-widest font-normal drop-shadow-md">
              FRAGRANCE OF THE WEEK
            </h2>
            <p className="text-xs sm:text-sm text-neutral-100 max-w-xl mx-auto font-light drop-shadow-xs">
              Discover this week's curated fragrances and find your next signature scent.
            </p>
          </div>

          {/* Carousel / Scrollable Cards Row */}
          <div className="relative group">
            <button
              onClick={() => scrollWeekly('left')}
              className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-md border border-neutral-200 flex items-center justify-center text-neutral-800 hover:bg-neutral-900 hover:text-white transition-colors cursor-pointer hidden md:flex"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div
              ref={scrollContainerRef}
              className="flex gap-5 overflow-x-auto scrollbar-none pb-4 pt-2 snap-x snap-mandatory"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {weeklyPicks.map((product) => (
                <div
                  key={product.id}
                  className="w-[240px] sm:w-[280px] shrink-0 snap-start bg-[#EFECE4]/90 backdrop-blur-xs rounded-2xl p-4 border border-neutral-300/80 hover:border-neutral-400 transition-all shadow-xs hover:shadow-md flex flex-col justify-between group relative"
                >
                  {/* Badge */}
                  <div className="mb-2">
                    <span className="text-[9px] tracking-[0.15em] font-semibold uppercase text-neutral-600 bg-white/80 px-2 py-0.5 rounded-md border border-neutral-200">
                      FRAGRANCE OF THE WEEK
                    </span>
                  </div>

                  {/* Product Image Container (100% UNCROPPED) */}
                  <div
                    onClick={() => setCurrentPage('product-detail', { productId: product.id })}
                    className="w-full h-[220px] bg-white rounded-xl overflow-hidden p-3 relative cursor-pointer flex items-center justify-center border border-neutral-200/80"
                  >
                    <img
                      src={product.images[0] || '/cat_1.jpg'}
                      alt={product.name}
                      className="w-full h-full object-contain p-1 group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Plus Floating Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                        showToast(`${product.name} added to cart!`);
                      }}
                      className="absolute bottom-2.5 right-2.5 w-8 h-8 rounded-lg bg-white border border-neutral-300 shadow-sm flex items-center justify-center text-neutral-900 hover:bg-[#0c1e14] hover:text-white hover:border-[#0c1e14] transition-all cursor-pointer"
                      title="Quick Add to Cart"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Info */}
                  <div className="mt-4 space-y-1.5 text-left">
                    <span className="text-[9px] font-mono tracking-widest text-neutral-500 uppercase block font-bold">
                      INSPIRED BY {product.inspiredBy}
                    </span>
                    <h3
                      onClick={() => setCurrentPage('product-detail', { productId: product.id })}
                      className="font-serif text-sm font-bold text-neutral-950 uppercase tracking-wide truncate cursor-pointer hover:text-amber-900"
                    >
                      {product.name}
                    </h3>
                    <div className="text-xs font-mono font-medium text-neutral-800">
                      FROM ₹ {(product.salePrice || product.price).toLocaleString('en-IN')}.00
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => scrollWeekly('right')}
              className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-md border border-neutral-200 flex items-center justify-center text-neutral-800 hover:bg-neutral-900 hover:text-white transition-colors cursor-pointer hidden md:flex"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* 5. OUR TRUE MASTERCLASS / CATEGORY PILLS ROW */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-neutral-300/60">
        <div className="text-center space-y-2 mb-10">
          <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-amber-900 font-semibold">
            OUR TRUE MASTERCLASS INTO HANDPICKED SPECIALTIES
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {[
            { id: 'BEST SELLERS', label: 'BEST SELLERS', page: 'shop' },
            { id: 'PERFUMES', label: 'PERFUMES', page: 'shop' },
            { id: 'PERFUME OILS', label: 'PERFUME OILS', page: 'collections' },
            { id: 'NEW ARRIVALS', label: 'NEW ARRIVALS', page: 'shop' },
          ].map((cat) => (
            <div
              key={cat.id}
              onClick={() => {
                setActiveCategoryTab(cat.id);
                setCurrentPage(cat.page as any);
              }}
              className="bg-[#0c1e14] text-[#F5F2EB] hover:bg-black rounded-3xl py-6 px-4 text-center cursor-pointer border border-amber-400/20 shadow-md hover:shadow-xl transition-all group flex flex-col items-center justify-center relative overflow-hidden"
            >
              <span className="font-serif text-sm sm:text-base font-medium tracking-widest uppercase group-hover:scale-105 transition-transform">
                {cat.label}
              </span>
              <span className="text-[9px] text-amber-300/80 font-mono tracking-widest mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                EXPLORE NOW →
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 6. POUR HOMME & POUR FEMME - THE ICONIC DUO WITH USER UPLOADED BACKGROUND */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border border-neutral-300/60 text-center space-y-8 relative overflow-hidden rounded-3xl my-6 shadow-md">
        {/* User uploaded background image with boosted saturation and zero tint overlays */}
        <div className="absolute inset-0 z-0">
          <img
            src="/iconic_duo_bg.jpg?v=3.0"
            alt="The Iconic Duo background"
            className="w-full h-full object-cover object-center filter saturate-125"
            loading="eager"
            decoding="async"
          />
        </div>

        <div className="relative z-10">
          <div className="space-y-2">
            <span className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-neutral-500 font-bold">
              POUR HOMME &amp; POUR FEMME
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-neutral-950 uppercase tracking-widest font-normal">
              THE ICONIC DUO
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto pt-6">
            {/* Pour Homme */}
            <div
              onClick={() => setCurrentPage('shop')}
              className="group relative rounded-3xl overflow-hidden bg-white/90 backdrop-blur-xs border border-neutral-300 p-6 shadow-md cursor-pointer flex flex-col items-center justify-between min-h-[380px] sm:min-h-[420px]"
            >
              <div className="w-full h-[320px] sm:h-[400px] flex items-center justify-center p-3 relative">
                <img
                  src="/iconic_homme.jpg"
                  alt="Pour Homme Fragrance"
                  className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="w-full pt-4 border-t border-neutral-200 text-center space-y-1">
                <span className="text-[10px] tracking-[0.25em] text-amber-900 uppercase font-bold">GENTLEMAN COLLECTION</span>
                <h3 className="font-serif text-xl sm:text-2xl text-neutral-950 font-bold tracking-wider">POUR HOMME</h3>
              </div>
            </div>

            {/* Pour Femme */}
            <div
              onClick={() => setCurrentPage('shop')}
              className="group relative rounded-3xl overflow-hidden bg-white/90 backdrop-blur-xs border border-neutral-300 p-6 shadow-md cursor-pointer flex flex-col items-center justify-between min-h-[380px] sm:min-h-[420px]"
            >
              <div className="w-full h-[320px] sm:h-[400px] flex items-center justify-center p-3 relative">
                <img
                  src="/iconic_femme.jpg"
                  alt="Pour Femme Fragrance"
                  className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="w-full pt-4 border-t border-neutral-200 text-center space-y-1">
                <span className="text-[10px] tracking-[0.25em] text-amber-900 uppercase font-bold">ROYAL FEMME COLLECTION</span>
                <h3 className="font-serif text-xl sm:text-2xl text-neutral-950 font-bold tracking-wider">POUR FEMME</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. INTRODUCING THE HIGH NOTES COLLECTION - SAY NO TO DRUGS (PERFECT FULL FIT NO CAP CROPPING) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0c1e14] text-white relative overflow-hidden">
        {/* Ribbon diagonal repeating text */}
        <div className="absolute inset-0 opacity-10 pointer-events-none select-none overflow-hidden">
          <div className="rotate-[-12deg] scale-125 space-y-8 font-mono text-3xl font-black tracking-widest uppercase text-amber-200">
            <p>SAY NO TO DRUGS • SAY NO TO DRUGS • SAY NO TO DRUGS • SAY NO TO DRUGS</p>
            <p>SAY NO TO DRUGS • SAY NO TO DRUGS • SAY NO TO DRUGS • SAY NO TO DRUGS</p>
            <p>SAY NO TO DRUGS • SAY NO TO DRUGS • SAY NO TO DRUGS • SAY NO TO DRUGS</p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto text-center space-y-8 relative z-10">
          <div className="space-y-3">
            <span className="text-[10px] sm:text-xs tracking-[0.35em] uppercase text-amber-300 font-semibold block">
              INTRODUCING THE HIGH NOTES COLLECTION
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#F5F2EB] font-light tracking-widest uppercase drop-shadow-md">
              SAY NO TO DRUGS
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 max-w-xl mx-auto font-light">
              Elevate your senses with pure artisanal fragrances crafted for high reflection and mental clarity.
            </p>
          </div>

          {/* 4 Cards Showcase (Full Bottle Visible With Zero Cap Cropping) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-5xl mx-auto pt-4">
            {[
              { title: 'HIGH NOTE I', img: '/hero_prod_8.jpg' },
              { title: 'HIGH NOTE II', img: '/hero_prod_9.jpg' },
              { title: 'HIGH NOTE III', img: '/hero_prod_10.jpg' },
              { title: 'HIGH NOTE IV', img: '/hero_prod_11.jpg' },
            ].map((item, idx) => (
              <div
                key={idx}
                onClick={() => setCurrentPage('shop')}
                className="bg-[#142c1e] border border-amber-400/30 rounded-2xl p-3 shadow-2xl hover:scale-105 transition-transform duration-300 cursor-pointer text-center space-y-2 group"
              >
                <div className="w-full h-[280px] sm:h-[340px] bg-white rounded-xl overflow-hidden relative p-2 flex items-center justify-center">
                  <img src={item.img} alt={item.title} className="w-full h-full object-contain p-1 group-hover:scale-105 transition-transform duration-500" />
                </div>
                <span className="font-serif text-xs text-amber-200 tracking-wider uppercase block font-semibold pt-1">
                  {item.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. BRAND INSPIRATIONS - PERFUMES */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-neutral-300/60">
        <div className="text-center space-y-2 mb-10">
          <span className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-amber-900 font-semibold">
            BRAND INSPIRATIONS
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl text-neutral-950 uppercase tracking-widest font-normal">
            PERFUMES
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {brandInspirations.map((product) => (
            <div
              key={product.id}
              className="bg-[#EFECE4] rounded-2xl p-4 border border-neutral-300/60 hover:border-neutral-400 transition-all shadow-xs hover:shadow-md flex flex-col justify-between group"
            >
              <div
                onClick={() => setCurrentPage('product-detail', { productId: product.id })}
                className="w-full h-[240px] bg-white rounded-xl overflow-hidden p-3 relative cursor-pointer flex items-center justify-center border border-neutral-200/80"
              >
                <img
                  src={product.images[0] || '/cat_1.jpg'}
                  alt={product.name}
                  className="w-full h-full object-contain p-1 group-hover:scale-105 transition-transform duration-300"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product);
                    showToast(`${product.name} added to cart!`);
                  }}
                  className="absolute bottom-3 right-3 w-8 h-8 rounded-lg bg-white border border-neutral-300 shadow-sm flex items-center justify-center text-neutral-900 hover:bg-[#0c1e14] hover:text-white transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-4 space-y-1.5 text-left">
                <span className="text-[9px] font-mono tracking-widest text-neutral-500 uppercase block font-bold">
                  INSPIRED BY {(product as any).brand || 'LUXURY HOUSE'}
                </span>
                <h3
                  onClick={() => setCurrentPage('product-detail', { productId: product.id })}
                  className="font-serif text-base font-bold text-neutral-950 uppercase tracking-wide cursor-pointer hover:text-amber-900 truncate"
                >
                  {product.name}
                </h3>
                <div className="text-xs font-mono font-medium text-neutral-800">
                  FROM ₹ {(product.salePrice || product.price).toLocaleString('en-IN')}.00
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-10">
          <button
            onClick={() => setCurrentPage('shop')}
            className="px-10 py-3.5 bg-neutral-950 text-white hover:bg-black font-medium text-xs tracking-[0.3em] uppercase transition-all shadow-md cursor-pointer"
          >
            VIEW ALL
          </button>
        </div>
      </section>

      {/* 9. VERIFIED CUSTOMER REVIEWS & TESTIMONIALS CAROUSEL */}
      <section className="py-16 bg-[#EFECE4] border-b border-neutral-300/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="space-y-2">
            <div className="flex justify-center text-amber-500 gap-1 text-sm">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl text-neutral-950 uppercase tracking-widest font-normal">
              SCENTED STORIES FROM OUR PATRONS
            </h2>
            <p className="text-xs text-neutral-600">
              Real compliments from fragrance connoisseurs across India
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="bg-white p-6 rounded-2xl border border-neutral-300/70 shadow-2xs space-y-3">
              <div className="flex text-amber-400 gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />)}
              </div>
              <p className="text-xs text-neutral-700 italic leading-relaxed">
                "NOOR ESSENSE ATTAR & PERFUME's AM Alpha and Muaab Oud have insane projection! Lasted 16+ hours on my linen shirt with endless compliments."
              </p>
              <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-[11px]">
                <span className="font-bold text-neutral-900">Rizwan Khan</span>
                <span className="text-neutral-400 font-mono">Mumbai</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-neutral-300/70 shadow-2xs space-y-3">
              <div className="flex text-amber-400 gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />)}
              </div>
              <p className="text-xs text-neutral-700 italic leading-relaxed">
                "Identical to luxury niche French extraits at a fraction of the cost. Ordered the 5-perfume set twice already!"
              </p>
              <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-[11px]">
                <span className="font-bold text-neutral-900">Zaid Memon</span>
                <span className="text-neutral-400 font-mono">Surat</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-neutral-300/70 shadow-2xs space-y-3">
              <div className="flex text-amber-400 gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />)}
              </div>
              <p className="text-xs text-neutral-700 italic leading-relaxed">
                "Direct WhatsApp ordering from Berhampur boutique was instant and dispatch reached Delhi in 3 days with shockproof packaging."
              </p>
              <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-[11px]">
                <span className="font-bold text-neutral-900">Sufiyan Shaikh</span>
                <span className="text-neutral-400 font-mono">Delhi</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. SCENTED DELIGHTS - A TRIO OF LUXURIOUS FRAGRANCES WITH PORTRAIT BACKGROUND */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border border-neutral-300/60 relative overflow-hidden rounded-3xl my-6 shadow-md text-center space-y-8">
        {/* User uploaded portrait background image with strongly boosted saturation and zero tint overlays */}
        <div className="absolute inset-0 z-0">
          <img
            src="/trio_luxurious_bg.jpg?v=2.0"
            alt="Scented Delights background"
            className="w-full h-full object-cover object-center filter saturate-150"
            loading="eager"
            decoding="async"
          />
          {/* Subtle natural dark gradient for premium contrast */}
          <div className="absolute inset-0 bg-black/15 pointer-events-none" />
        </div>

        <div className="relative z-10 space-y-8">
          <div className="space-y-2">
            <span className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-amber-200 font-bold drop-shadow-md">
              SCENTED DELIGHTS
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-white uppercase tracking-widest font-normal drop-shadow-lg">
              A TRIO OF LUXURIOUS FRAGRANCES
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'PERFUMES', img: '/scented_1.jpg', page: 'shop' },
              { title: 'CANDLES', img: '/scented_2.jpg', page: 'shop' },
              { title: 'BAKHOOR', img: '/scented_3.jpg', page: 'collections' },
            ].map((item, idx) => (
              <div
                key={idx}
                onClick={() => setCurrentPage(item.page as any)}
                className="group relative rounded-3xl overflow-hidden bg-white/90 backdrop-blur-xs border border-neutral-300 cursor-pointer shadow-md p-5 flex flex-col items-center justify-between min-h-[340px] hover:scale-[1.02] transition-transform"
              >
                <div className="w-full h-[240px] flex items-center justify-center p-2 relative">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-contain p-1 group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="w-full pt-3 border-t border-neutral-200 text-center">
                  <span className="font-serif text-lg text-neutral-950 font-semibold tracking-widest uppercase">
                    {item.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. FEATURED COLLECTION (POEM, NOBLE, DEJA VU) */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-neutral-300/60">
        <div className="text-center space-y-4 mb-8">
          <span className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-amber-900 font-bold">
            FEATURED COLLECTION
          </span>
          <div className="flex justify-center gap-6 border-b border-neutral-300 pb-2 max-w-md mx-auto">
            {['POEM', 'NOBLE', 'DEJA VU'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFeaturedTab(tab)}
                className={`text-xs tracking-[0.25em] font-serif uppercase py-1 relative transition-colors cursor-pointer ${
                  activeFeaturedTab === tab ? 'text-neutral-950 font-bold' : 'text-neutral-400 hover:text-neutral-700'
                }`}
              >
                {tab}
                {activeFeaturedTab === tab && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#0c1e14]" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
          {featuredCollectionProducts.map((p) => (
            <div
              key={p.id}
              onClick={() => setCurrentPage('product-detail', { productId: p.id })}
              className="bg-[#EFECE4] rounded-2xl p-4 border border-neutral-300/60 hover:border-neutral-400 transition-all shadow-xs cursor-pointer text-center space-y-2 group"
            >
              <div className="w-full h-[180px] bg-white rounded-xl overflow-hidden p-2 relative flex items-center justify-center border border-neutral-200/80">
                <img src={p.images[0] || '/cat_1.jpg'} alt={p.name} className="w-full h-full object-contain p-1 group-hover:scale-105 transition-transform" />
                {p.stock === 0 && (
                  <span className="absolute top-2 right-2 bg-neutral-900 text-white text-[8px] font-bold tracking-widest px-2 py-0.5 rounded-xs uppercase">
                    SOLD OUT
                  </span>
                )}
              </div>
              <h3 className="font-serif text-xs font-bold text-neutral-950 uppercase tracking-wide truncate">
                {p.name}
              </h3>
              <div className="text-xs font-mono font-medium text-neutral-800">
                ₹ {(p.salePrice || p.price).toLocaleString('en-IN')}.00
              </div>
            </div>
          ))}
        </div>

        {/* POEM FOR HIM / POEM FOR HER LEATHER BANNER */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12">
          <div className="bg-[#2c1b12] text-white rounded-2xl p-8 flex flex-col justify-between min-h-[220px] relative overflow-hidden group shadow-lg">
            <div className="relative z-10 space-y-2">
              <span className="text-[10px] tracking-[0.25em] text-amber-300 uppercase font-semibold">THE MASCULINE POEM</span>
              <h3 className="font-serif text-2xl font-bold tracking-wider uppercase">POEM FOR HIM</h3>
            </div>
            <div className="relative z-10 pt-4">
              <button
                onClick={() => setCurrentPage('shop')}
                className="px-6 py-2.5 bg-white text-black font-semibold text-xs tracking-widest uppercase hover:bg-amber-300 transition-colors cursor-pointer"
              >
                BUY NOW
              </button>
            </div>
          </div>

          <div className="bg-[#221711] text-white rounded-2xl p-8 flex flex-col justify-between min-h-[220px] relative overflow-hidden group shadow-lg">
            <div className="relative z-10 space-y-2">
              <span className="text-[10px] tracking-[0.25em] text-amber-300 uppercase font-semibold">THE FEMININE POEM</span>
              <h3 className="font-serif text-2xl font-bold tracking-wider uppercase">POEM FOR HER</h3>
            </div>
            <div className="relative z-10 pt-4">
              <button
                onClick={() => setCurrentPage('shop')}
                className="px-6 py-2.5 bg-white text-black font-semibold text-xs tracking-widest uppercase hover:bg-amber-300 transition-colors cursor-pointer"
              >
                BUY NOW
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 12. NOBLE COLLECTION */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-neutral-300/60 text-center space-y-6">
        <div className="space-y-2">
          <h2 className="font-serif text-2xl sm:text-4xl text-neutral-950 uppercase tracking-widest font-normal">
            NOBLE COLLECTION
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 font-light">
            Elevating elegance through every fragrance
          </p>
        </div>

        <div className="max-w-4xl mx-auto rounded-3xl overflow-hidden border border-neutral-300 shadow-xl bg-white p-4">
          <img src="/cat_3.jpg?v=2.0" alt="Noble Collection" className="w-full h-auto object-contain rounded-2xl" />
        </div>

        <div>
          <button
            onClick={() => setCurrentPage('collections')}
            className="px-10 py-3.5 bg-neutral-950 text-white font-medium text-xs tracking-[0.3em] uppercase hover:bg-black transition-all shadow-md cursor-pointer"
          >
            VIEW PRODUCTS
          </button>
        </div>
      </section>

      {/* 13. INTERNATIONAL SHIPPING & NEWSLETTER */}
      <section className="py-16 bg-[#EFECE4] border-b border-neutral-300/60 text-center space-y-12">
        <div className="max-w-xl mx-auto space-y-2 px-4">
          <Plane className="w-8 h-8 text-neutral-800 mx-auto" />
          <h3 className="font-serif text-xs sm:text-sm font-bold tracking-[0.25em] uppercase text-neutral-950">
            INTERNATIONAL SHIPPING
          </h3>
          <p className="text-xs text-neutral-600">
            Worldwide shipping — customs and duties excluded
          </p>
        </div>

        <div className="max-w-md mx-auto px-4 space-y-4">
          <span className="text-[10px] tracking-[0.3em] text-neutral-500 font-bold uppercase block">
            KEEP ME UPDATED
          </span>
          <h2 className="font-serif text-2xl text-neutral-950 font-normal tracking-widest uppercase">
            NEWSLETTER
          </h2>
          <p className="text-xs text-neutral-600">
            Subscribe to get notified about product launches, special offers and company news.
          </p>

          <form onSubmit={handleSubscribe} className="space-y-3 pt-2">
            <input
              type="email"
              value={emailSubscription}
              onChange={(e) => setEmailSubscription(e.target.value)}
              placeholder="E-mail"
              required
              className="w-full p-3.5 bg-white border border-neutral-300 text-xs focus:outline-none focus:border-[#0c1e14]"
            />
            <button
              type="submit"
              className="w-full py-3.5 bg-[#0c1e14] text-white font-semibold text-xs tracking-[0.3em] uppercase hover:bg-black transition-colors cursor-pointer"
            >
              SUBSCRIBE
            </button>
          </form>
        </div>
      </section>

      {/* 14. WHATSAPP COMMUNITY & BOUTIQUE LOCATION WITH USER UPLOADED BACKGROUND */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-8 relative overflow-hidden rounded-3xl my-6 shadow-md border border-neutral-300/60">
        {/* User uploaded background image with boosted saturation and zero tint overlays */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/whatsapp_support_bg.jpg?v=3.0"
            alt="WhatsApp Support background"
            className="w-full h-full object-cover filter saturate-125 scale-105 origin-center translate-y-1.5"
            style={{ objectPosition: 'center 32%' }}
            loading="eager"
            decoding="async"
          />
        </div>

        <div className="relative z-10">
          <div className="space-y-3">
            <span className="text-xs text-emerald-800 uppercase tracking-[0.25em] font-semibold block">
              DIRECT WHATSAPP ORDER &amp; SUPPORT
            </span>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              <a
                href={`https://wa.me/${settings.whatsappNumber?.replace(/[^0-9]/g, '') || '7788008892'}?text=${encodeURIComponent(`Hello ${settings.brandName || "NOOR ESSENSE ATTAR & PERFUME"}, I want to explore your perfumes and order directly.`)}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 font-serif text-xl sm:text-2xl text-neutral-900 font-semibold hover:text-emerald-700 transition-colors"
              >
                <MessageCircle className="w-6 h-6 text-emerald-600 fill-emerald-600" />
                <span className="text-neutral-950 font-bold">{settings.whatsappNumber || "+91 7788008892"}</span>
              </a>

              <a
                href={settings.instagramUrl || "https://www.instagram.com/noor_essence_perfume?stkn=MWd4NGMxOHBiYmp0MQ=="}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:opacity-95 text-white font-medium text-xs shadow-md transition-opacity"
              >
                <Instagram className="w-4 h-4" />
                <span>Instagram: @noor_essence_perfume</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6">
            {[
              "/bottom_prod_1.jpg?v=5.0",
              "/bottom_prod_2.jpg?v=5.0",
              "/bottom_prod_3.jpg?v=5.0",
              "/bottom_prod_4.jpg?v=5.0"
            ].map((imgUrl, i) => (
              <a
                key={i}
                href={`https://wa.me/${settings.whatsappNumber?.replace(/[^0-9]/g, '') || '7788008892'}?text=${encodeURIComponent(`Hello ${settings.brandName || "NOOR ESSENSE ATTAR & PERFUME"}, I am interested in your luxury perfume collection.`)}`}
                target="_blank"
                rel="noreferrer"
                className="aspect-square rounded-2xl overflow-hidden border border-neutral-300 bg-white p-2 group relative shadow-md block cursor-pointer flex items-center justify-center hover:border-emerald-600 transition-all"
              >
                <img src={imgUrl} alt={`Fragrance ${i + 1}`} className="w-full h-full object-contain p-1 group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-emerald-950/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white gap-1.5 rounded-2xl">
                  <MessageCircle className="w-7 h-7 text-white fill-white" />
                  <span className="text-[11px] font-medium uppercase tracking-wider">Order on WhatsApp</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* QUICK VIEW PRODUCT MODAL */}
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
              <div className="w-full h-[220px] bg-white rounded-2xl overflow-hidden p-3 border border-neutral-200 flex items-center justify-center">
                <img src={quickViewProduct.images[0] || '/cat_1.jpg'} alt={quickViewProduct.name} className="w-full h-full object-contain" />
              </div>

              <div>
                <span className="text-[10px] font-mono tracking-widest text-amber-900 uppercase font-bold">
                  {(quickViewProduct as any).brand || 'NOOR ESSENSE ATTAR & PERFUME'}
                </span>
                <h3 className="font-serif text-2xl font-bold uppercase tracking-wide text-neutral-950">
                  {quickViewProduct.name}
                </h3>
                <p className="text-xs text-neutral-600 mt-1">
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
                  <MessageSquare className="w-4 h-4" />
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
