import React from 'react';
import { MessageCircle, Instagram } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

interface WhatsAppButtonProps {
  message?: string;
  floating?: boolean;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  message,
  floating = true,
}) => {
  const { settings } = useStore();
  
  const brand = settings.brandName || "NOOR ESSENSE ATTAR & PERFUME";
  const rawNum = settings.whatsappNumber?.replace(/[^0-9]/g, '') || '7788008892';
  const cleanNum = rawNum.length === 10 ? `91${rawNum}` : rawNum;
  const defaultMsg = message || `Hello ${brand}, I would like to enquire about your perfumes, attars, agarbatti and bakhoor.`;
  const whatsappUrl = `https://wa.me/${cleanNum}?text=${encodeURIComponent(defaultMsg)}`;
  const instagramUrl = settings.instagramUrl || "https://www.instagram.com/noor_essence_perfume?stkn=MWd4NGMxOHBiYmp0MQ==";

  if (!floating) {
    return (
      <div className="flex flex-wrap items-center gap-3">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs rounded-xl uppercase tracking-widest transition-all shadow-md cursor-pointer"
        >
          <MessageCircle className="w-4 h-4 text-white" />
          <span>WhatsApp Order &amp; Enquiry</span>
        </a>
        <a
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:opacity-95 text-white font-medium text-xs rounded-xl uppercase tracking-widest transition-all shadow-md cursor-pointer"
        >
          <Instagram className="w-4 h-4 text-white" />
          <span>Follow on Instagram</span>
        </a>
      </div>
    );
  }

  return (
    <div className="fixed bottom-20 lg:bottom-8 right-3.5 sm:right-5 z-40 flex flex-col items-center gap-2.5 sm:gap-3">
      {/* Floating Instagram Button */}
      <a
        href={instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Visit Noor Essense on Instagram"
        className="w-11 h-11 sm:w-13 sm:h-13 bg-gradient-to-tr from-amber-500 via-pink-600 to-purple-600 hover:scale-110 text-white rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all border-2 border-white/95 group cursor-pointer"
        title="Follow Noor Essense on Instagram (@noor_essence_perfume)"
      >
        <Instagram className="w-5 h-5 sm:w-6 sm:h-6 text-white stroke-[2.3]" />
        <span className="absolute right-14 sm:right-16 bg-neutral-950 text-neutral-100 text-[11px] sm:text-xs py-1.5 px-3 rounded-lg shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-neutral-800 font-medium tracking-wide">
          Instagram @noor_essence_perfume
        </span>
      </a>

      {/* Floating WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        aria-label={`Chat with ${brand} on WhatsApp`}
        className="w-12 h-12 sm:w-14 sm:h-14 bg-emerald-600 hover:bg-emerald-500 hover:scale-110 text-white rounded-full flex items-center justify-center shadow-2xl transition-all border-2 border-white/95 group cursor-pointer"
        title={`Chat with ${brand} on WhatsApp (+91 ${cleanNum.replace(/^91/, '')})`}
      >
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 text-white fill-white" />
        <span className="absolute right-14 sm:right-16 bg-neutral-950 text-neutral-100 text-[11px] sm:text-xs py-1.5 px-3 rounded-lg shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-neutral-800 font-medium tracking-wide">
          WhatsApp (+91 {cleanNum.replace(/^91/, '')})
        </span>
      </a>
    </div>
  );
};
