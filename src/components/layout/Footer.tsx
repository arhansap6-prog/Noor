import React from 'react';
import { useStore } from '../../context/StoreContext';
import { MapPin, Phone, MessageSquare, ShieldCheck, Truck, Sparkles, Instagram, Award } from 'lucide-react';
import { AmBrandEmblem } from '../brand/AmBrandEmblem';

export const Footer: React.FC = () => {
  const { setCurrentPage, settings } = useStore();

  return (
    <footer className="bg-[#f5f3ee] text-neutral-700 border-t border-neutral-200 pt-16 pb-24 lg:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* USPs Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 mb-12 border-b border-neutral-200/80">
          <div className="flex items-start gap-3">
            <Sparkles className="w-6 h-6 text-amber-700 flex-shrink-0 mt-1" />
            <div>
              <h4 className="text-xs uppercase tracking-widest text-neutral-900 font-semibold mb-1">
                Modern Gentleman Scents
              </h4>
              <p className="text-[11px] text-neutral-600 leading-relaxed">
                French extraits &amp; concentrated attars crafted for refined gentlemen.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Truck className="w-6 h-6 text-amber-700 flex-shrink-0 mt-1" />
            <div>
              <h4 className="text-xs uppercase tracking-widest text-neutral-900 font-semibold mb-1">
                Pan-India Delivery 🇮🇳
              </h4>
              <p className="text-[11px] text-neutral-600 leading-relaxed">
                Securely packed &amp; dispatched from Berhampur, Odisha across India.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <ShieldCheck className="w-6 h-6 text-amber-700 flex-shrink-0 mt-1" />
            <div>
              <h4 className="text-xs uppercase tracking-widest text-neutral-900 font-semibold mb-1">
                100% Authentic Quality
              </h4>
              <p className="text-[11px] text-neutral-600 leading-relaxed">
                Long-lasting formulations without compromising on experience.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MessageSquare className="w-6 h-6 text-amber-700 flex-shrink-0 mt-1" />
            <div>
              <h4 className="text-xs uppercase tracking-widest text-neutral-900 font-semibold mb-1">
                Direct WhatsApp Orders
              </h4>
              <p className="text-[11px] text-neutral-600 leading-relaxed">
                Instant support on +91 {settings.whatsappNumber?.replace(/[^0-9]/g, '') || "7788008892"}.
              </p>
            </div>
          </div>
        </div>

        {/* Core Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <AmBrandEmblem size="sm" showSubtitle={false} />
              <div>
                <h3 className="font-serif text-xl tracking-[0.12em] text-neutral-950 uppercase font-semibold">
                  {settings.brandName || "NOOR ESSENSE ATTAR & PERFUME"}
                </h3>
                <p className="text-[10px] tracking-[0.2em] text-amber-800 uppercase font-bold">
                  {settings.brandTagline || "Pure Non-Alcoholic Attar & French Luxury Perfumes"}
                </p>
                <p className="text-[10px] text-neutral-600 font-medium">
                  By {settings.ownerName || "Noor Essense"} (Founder)
                </p>
              </div>
            </div>
            
            <p className="text-xs text-neutral-600 leading-relaxed max-w-sm">
              {settings.aboutText?.split('\n\n')[0] || "Berhampur’s premier fragrance destination creating masterpieces in luxury perfumes, pure alcohol-free attars, and royal fragrances."}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={`https://wa.me/${settings.whatsappNumber?.replace(/[^0-9]/g, '') || '7788008892'}?text=${encodeURIComponent(`Hello ${settings.brandName || "NOOR ESSENSE ATTAR & PERFUME"}, I want to explore and order your luxury perfumes.`)}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition-colors text-xs font-semibold shadow-md cursor-pointer"
                title="WhatsApp Us"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp (+91 {settings.whatsappNumber?.replace(/[^0-9]/g, '') || "7788008892"})</span>
              </a>

              <a
                href={settings.instagramUrl || "https://www.instagram.com/noor_essence_perfume?stkn=MWd4NGMxOHBiYmp0MQ=="}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:opacity-95 text-white transition-opacity text-xs font-semibold shadow-md cursor-pointer"
                title="Follow on Instagram @noor_essence_perfume"
              >
                <Instagram className="w-4 h-4" />
                <span>Instagram (@noor_essence_perfume)</span>
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] text-neutral-900 font-semibold mb-4">
              EXPLORE
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => setCurrentPage('home')} className="hover:text-black hover:underline transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('shop')} className="hover:text-black hover:underline transition-colors">
                  All Perfumes &amp; Attars
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('collections')} className="hover:text-black hover:underline transition-colors">
                  Bakhoor &amp; Agarbatti
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('about')} className="hover:text-black hover:underline transition-colors">
                  About Our Brand
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('contact')} className="hover:text-black hover:underline transition-colors">
                  Visit Berhampur Showroom
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('wholesale')} className="hover:text-black hover:underline transition-colors">
                  Wholesale Enquiry
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('admin')} className="hover:text-amber-700 font-semibold transition-colors flex items-center gap-1">
                  <span>🔐</span> Admin Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Product Categories */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] text-neutral-900 font-semibold mb-4">
              SPECIALTIES
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => setCurrentPage('shop', { search: 'Attar' })} className="hover:text-black hover:underline transition-colors flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-600"></span>
                  <span>Pure Non-Alcoholic Attar</span>
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('shop', { search: 'Perfume' })} className="hover:text-black hover:underline transition-colors flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-teal-600"></span>
                  <span>Luxury Perfumes (EDP)</span>
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('shop', { search: 'Agarbatti' })} className="hover:text-black hover:underline transition-colors flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-800"></span>
                  <span>Handcrafted Agarbatti</span>
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('shop', { search: 'Bakhoor' })} className="hover:text-black hover:underline transition-colors flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-900"></span>
                  <span>Royal Arabian Bakhoor</span>
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('shop', { search: 'Gold' })} className="hover:text-black hover:underline transition-colors">
                  Royal Gold Masterpiece
                </button>
              </li>
            </ul>
          </div>

          {/* Craft Description */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] text-neutral-900 font-semibold mb-4">
              THE FRAGRANCE DIARIES
            </h4>
            <div className="space-y-2 text-xs leading-relaxed text-neutral-600">
              <p>We expertly formulate every iconic designer, niche, and luxury Arabian fragrance with exceptional projection and longevity.</p>
              <p>Each blend captures the rich essence, long-lasting sillage, and royal aura of world-renowned scent profiles.</p>
              <p>Crafted using the finest pure non-alcoholic attar oils and natural essences.</p>
              <p>Experience signature opulence tailored exclusively for your refined fragrance collection.</p>
            </div>
          </div>

          {/* Store Address & Contact */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] text-neutral-900 font-semibold mb-4">
              BERHAMPUR SHOWROOM
            </h4>
            <div className="space-y-3 text-xs leading-relaxed text-neutral-600">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-800 flex-shrink-0 mt-0.5" />
                <span>
                  {settings.contactAddress || "Park street azim enterprises inside room, Berhampur, ganjam, odisha 760002"}
                </span>
              </div>
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-amber-800 flex-shrink-0" />
                  <a href={`tel:${settings.contactPhone || "7788008892"}`} className="hover:text-black transition-colors font-mono font-medium">
                    Call: +91 {settings.contactPhone || "7788008892"}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-[11px]">
                  <span className="text-emerald-700 font-bold">💬</span>
                  <a href={`https://wa.me/${settings.whatsappNumber?.replace(/[^0-9]/g, '') || "7788008892"}`} target="_blank" rel="noreferrer" className="hover:text-black transition-colors font-mono text-emerald-800 font-semibold">
                    WhatsApp: +91 {settings.whatsappNumber?.replace(/[^0-9]/g, '') || "7788008892"}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-[11px]">
                  <Instagram className="w-4 h-4 text-pink-600 flex-shrink-0" />
                  <a href={settings.instagramUrl || "https://www.instagram.com/noor_essence_perfume?stkn=MWd4NGMxOHBiYmp0MQ=="} target="_blank" rel="noopener noreferrer" className="hover:text-pink-600 transition-colors font-mono text-neutral-700 font-semibold">
                    @noor_essence_perfume
                  </a>
                </div>
              </div>
              <div className="pt-2 border-t border-neutral-200/80 text-[11px]">
                <span className="font-semibold text-neutral-800 block">Founder:</span>
                <span className="text-neutral-700 font-medium">{settings.ownerName || "Noor Essense"}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-neutral-200/80 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <p>© 2026 {settings.brandName || "NOOR ESSENSE ATTAR & PERFUME"}. All Rights Reserved.</p>
          
          <button
            onClick={() => {
              if (window.confirm("🔄 Click OK to clear browser cache and reload the latest deployed version instantly!")) {
                localStorage.removeItem('noor_cached_products');
                localStorage.removeItem('noor_deleted_prods');
                window.location.href = window.location.pathname + '?v=' + Date.now() + '#home';
                window.location.reload();
              }
            }}
            className="px-3 py-1.5 bg-amber-800 hover:bg-amber-900 text-white font-bold rounded-lg shadow-sm transition-all text-[10px] uppercase tracking-wider cursor-pointer flex items-center gap-1.5"
            title="Click to force update if changes are not showing on Google"
          >
            <span>🔄 Fix Not Showing? Force Refresh Latest Version</span>
          </button>

          <div className="flex items-center gap-4 text-neutral-600 uppercase font-medium">
            <span>PAN-INDIA DISPATCH 🇮🇳</span>
            <span>•</span>
            <span>BERHAMPUR, ODISHA</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
