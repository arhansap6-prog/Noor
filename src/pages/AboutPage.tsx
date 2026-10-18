import React from 'react';
import { motion } from 'motion/react';
import { useStore } from '../context/StoreContext';
import { Award, ShieldCheck, MapPin, Phone, MessageSquare, Sparkles, Truck, Compass, CheckCircle2, Instagram } from 'lucide-react';
import { AmBrandEmblem } from '../components/brand/AmBrandEmblem';

export const AboutPage: React.FC = () => {
  const { setCurrentPage, settings } = useStore();

  const brandTitle = settings.brandName || "NOOR ESSENSE ATTAR & PERFUME";
  const tagline = settings.brandTagline || "Pure Non-Alcoholic Attar & French Luxury Perfumes";
  const locationText = "Berhampur, Ganjam, Odisha";
  const landmarkText = settings.contactAddress || "Park street azim enterprises inside room, Berhampur, ganjam, odisha 760002";
  const supportNum = settings.contactPhone || "7788008892";
  const whatsappNum = settings.whatsappNumber?.replace(/[^0-9]/g, '') || "7788008892";
  const instagramUrl = settings.instagramUrl || "https://www.instagram.com/noor_essence_perfume?stkn=MWd4NGMxOHBiYmp0MQ==";

  return (
    <div className="bg-[#F7F4EB] text-neutral-900 min-h-screen py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-16">
      
      {/* Hero Heading */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-4 border-b border-neutral-200/80 pb-12"
      >
        <div className="pt-2 flex justify-center">
          <AmBrandEmblem size="lg" showSubtitle={false} interactive={false} />
        </div>

        <span className="text-xs tracking-[0.25em] uppercase font-bold text-amber-900 block">
          OUR STORY &amp; HERITAGE
        </span>

        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-neutral-950 tracking-tight uppercase font-bold">
          {brandTitle}
        </h1>

        <p className="text-xs sm:text-base text-neutral-600 tracking-[0.25em] uppercase font-medium">
          {tagline}
        </p>

        <p className="font-serif italic text-base sm:text-xl text-neutral-700 max-w-2xl mx-auto">
          "Where divine aromatics and French perfumery meet — delivering authentic, long-lasting fragrances across India."
        </p>

        {/* Social Connect Badges */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:opacity-95 text-white text-xs font-semibold shadow-md transition-all cursor-pointer"
          >
            <Instagram className="w-4 h-4" />
            <span>Follow Us on Instagram @noor_essence_perfume</span>
          </a>

          <a
            href={`https://wa.me/${whatsappNum}?text=${encodeURIComponent(`Hello ${brandTitle}, I want to learn more about your fragrance creations.`)}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-md transition-all cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>WhatsApp (+91 {whatsappNum})</span>
          </a>
        </div>
      </motion.div>

      {/* Brand Philosophy Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
        
        {/* Visual Showcase Card */}
        <div className="relative rounded-3xl overflow-hidden border border-neutral-200/90 shadow-xl aspect-[3/4] sm:aspect-[4/5] group bg-neutral-950">
          <img
            src="/noble_bottle.jpg"
            alt="NOOR ESSENSE ATTAR & PERFUME Showroom & Fragrance Artistry"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
          
          <div className="absolute top-4 left-4">
            <span className="bg-white/90 backdrop-blur-md text-neutral-900 text-[10px] uppercase font-mono tracking-widest px-3 py-1 rounded-full border border-neutral-200">
              BERHAMPUR, ODISHA SHOWROOM
            </span>
          </div>

          <div className="absolute bottom-6 left-6 right-6 space-y-2 text-white">
            <span className="text-[11px] uppercase text-amber-300 tracking-widest block font-mono font-medium">
              ESTABLISHED IN BERHAMPUR, GANJAM, ODISHA
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
              {brandTitle}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-200 font-light leading-relaxed">
              {landmarkText}
            </p>
          </div>
        </div>

        {/* Narrative Section */}
        <div className="space-y-6 text-neutral-700 text-sm sm:text-base leading-relaxed">
          <div className="space-y-2">
            <span className="text-xs uppercase font-mono tracking-[0.2em] text-amber-800 font-semibold block">
              OUR BELIEF &amp; ESSENCE
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-neutral-950 font-bold tracking-tight">
              Crafting Divine Scent Impressions
            </h2>
          </div>

          <p className="text-neutral-700 leading-relaxed font-normal">
            <strong className="text-neutral-900">{brandTitle}</strong> is Berhampur’s premier fragrance house, dedicated to crafting divine non-alcoholic concentrated attars, long-lasting luxury Eau de Parfum extraits, pure Arabian bakhoor, and artisanal aromatic blends.
          </p>

          <p className="text-neutral-600 leading-relaxed">
            Located in the heart of Berhampur at <strong>Park street azim enterprises inside room, Berhampur, ganjam, odisha 760002</strong>, we combine time-honored traditional distillation secrets with contemporary French fragrance nuances to offer perfumes that leave an unforgettable trail.
          </p>

          <p className="text-neutral-600 leading-relaxed">
            Whether you are looking for royal oud, fresh aquatic daytime notes, opulent gourmand vanilla, or tailored wedding gifting sets, every bottle is bottled with precision and dispatched securely across India.
          </p>

          {/* Quick Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setCurrentPage('shop')}
              className="px-6 py-3 bg-neutral-950 hover:bg-neutral-800 text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-sm hover:shadow-md"
            >
              <Compass className="w-4 h-4 text-amber-400" />
              <span>Explore Scent Catalog</span>
            </button>

            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <Instagram className="w-4 h-4" />
              <span>Instagram Page</span>
            </a>
          </div>
        </div>
      </div>

      {/* Founders Section */}
      <div className="space-y-8">
        <div className="border-b border-neutral-200/80 pb-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-amber-800 font-semibold text-xs tracking-wider">
              <Award className="w-4 h-4" />
              <span>THE VISION &amp; PURPOSE</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl text-neutral-950 font-bold">
              About {brandTitle}
            </h2>
          </div>

          <div className="text-xs text-neutral-500 font-mono tracking-wider uppercase">
            {locationText}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
          
          <div className="p-6 bg-white rounded-2xl border border-neutral-200 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-900 font-serif font-bold text-lg">
              NE
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-neutral-950">Noor Essense Heritage</h3>
              <p className="text-xs text-amber-800 font-medium tracking-wider uppercase">Master Fragrance Curators</p>
            </div>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              We specialize in 100% alcohol-free traditional attars, concentrated essential oils, and intense projection French EDP perfumes crafted for Indian climate and long-lasting sillage.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-neutral-200 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-900 font-serif font-bold text-lg">
              📍
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-neutral-950">Berhampur Showroom &amp; Hub</h3>
              <p className="text-xs text-amber-800 font-medium tracking-wider uppercase">Park Street, Azim Enterprises</p>
            </div>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              Serving patrons in-store and shipping orders nationwide with shockproof packaging. Connect on WhatsApp (+91 {whatsappNum}) or Instagram for direct concierge support.
            </p>
          </div>

        </div>
      </div>

      {/* Pan-India Delivery & Assurance Banner */}
      <div className="bg-neutral-950 text-white rounded-3xl p-8 sm:p-10 shadow-xl relative overflow-hidden">
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-2 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-800 border border-neutral-700 text-amber-300 rounded-full text-[11px] font-mono uppercase tracking-wider">
              <Truck className="w-3.5 h-3.5 text-amber-400" />
              <span>PAN-INDIA DISPATCH 🇮🇳</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
              We Deliver Across Every State in India
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-xl">
              {settings.deliveryDetails || "Orders are securely packed in protective multi-layer bubble wrap and dispatched within 24-48 hours. Live online tracking links are shared directly on WhatsApp."}
            </p>
          </div>

          <div className="flex flex-col gap-3 justify-center">
            <a
              href={`https://wa.me/${whatsappNum}?text=${encodeURIComponent(`Hello ${brandTitle}, I would like to place an order.`)}`}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white text-center rounded-xl text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-2 shadow-md cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Direct Order ({whatsappNum})</span>
            </a>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center rounded-xl text-xs font-semibold tracking-wider uppercase transition-all flex items-center justify-center gap-2 shadow-md"
            >
              <Instagram className="w-4 h-4" />
              <span>Instagram: @noor_essence_perfume</span>
            </a>
          </div>
        </div>
      </div>

      {/* Boutique Visit Guide */}
      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-neutral-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-neutral-200/80 pb-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-amber-800 font-semibold block">
              PHYSICAL STORE VISIT
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-neutral-950 font-bold">
              Visit Our Showroom in {locationText}
            </h2>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-800 text-xs font-mono">
            <MapPin className="w-4 h-4 text-amber-800" />
            <span>Berhampur, Odisha</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4 text-sm text-neutral-700 leading-relaxed">
            <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-2xl space-y-1.5">
              <span className="text-xs uppercase font-bold text-amber-900 tracking-wider block">Showroom Address:</span>
              <p className="font-medium text-neutral-900 text-base">
                {landmarkText}
              </p>
              <p className="text-xs text-neutral-600">
                Park street azim enterprises inside room, Berhampur, ganjam, odisha 760002
              </p>
            </div>

            <div className="space-y-2 text-xs sm:text-sm">
              <div className="flex items-center gap-2 text-neutral-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Walk-in fragrance testing &amp; personal attar sampling</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Pure alcohol-free attars, luxury EDP perfumes &amp; royal bakhoor</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Accepting UPI, Google Pay, PhonePe, Cards &amp; Cash</span>
              </div>
            </div>

            <div className="pt-2 text-xs font-mono space-y-1">
              <div>
                <span className="text-neutral-400 block text-[10px]">PHONE CALLS:</span>
                <span className="text-neutral-900 font-semibold text-sm">+91 {supportNum}</span>
              </div>
              <div>
                <span className="text-neutral-400 block text-[10px]">WHATSAPP:</span>
                <span className="text-emerald-700 font-semibold text-sm">+91 {whatsappNum}</span>
              </div>
              <div>
                <span className="text-neutral-400 block text-[10px]">INSTAGRAM:</span>
                <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="text-pink-600 font-semibold hover:underline">
                  @noor_essence_perfume
                </a>
              </div>
            </div>
          </div>

          <div className="aspect-video sm:aspect-[4/3] rounded-2xl overflow-hidden border border-neutral-200 shadow-sm relative group">
            <iframe
              title={`${brandTitle} Showroom Location`}
              src={`https://maps.google.com/maps?q=${encodeURIComponent("Park Street Azim Enterprises Berhampur Ganjam Odisha 760002")}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
              className="w-full h-full border-0 pointer-events-none opacity-85"
              loading="lazy"
            />
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent("Park Street Azim Enterprises Berhampur Ganjam Odisha 760002")}`}
              target="_blank"
              rel="noreferrer"
              className="absolute inset-0 bg-black/10 hover:bg-black/20 transition-colors flex items-center justify-center cursor-pointer z-10"
            >
              <div className="px-4 py-2 bg-neutral-950/95 hover:bg-black text-amber-300 font-bold text-[10px] sm:text-xs uppercase tracking-wider rounded-xl border border-amber-400/50 shadow-md backdrop-blur-md flex items-center gap-1.5 transition-transform group-hover:scale-105">
                <Compass className="w-3.5 h-3.5 text-amber-400" />
                <span>OPEN DIRECTLY IN GOOGLE MAPS</span>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Core Quality Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-neutral-200/80">
        <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-800">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-lg text-neutral-950 font-semibold">Artisanal Mastery</h3>
          <p className="text-xs text-neutral-600 leading-relaxed">
            High oil concentration ensuring long-lasting performance and projection tailored for Indian weather.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-800">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-lg text-neutral-950 font-semibold">100% Pure &amp; Non-Alcoholic</h3>
          <p className="text-xs text-neutral-600 leading-relaxed">
            Our traditional attar concentrates are 100% alcohol-free, completely skin-safe, and highly concentrated.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-800">
            <Truck className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-lg text-neutral-950 font-semibold">Pan-India Delivery</h3>
          <p className="text-xs text-neutral-600 leading-relaxed">
            Dispatched straight from Berhampur, Odisha in shockproof double-wrap packaging to your doorstep.
          </p>
        </div>
      </div>

    </div>
  );
};
