import { Product, Category, Banner, Coupon, StoreSettings } from '../types';

export const INITIAL_SETTINGS: StoreSettings = {
  brandName: 'NOOR ESSENSE ATTAR & PERFUME',
  brandTagline: 'Pure Non-Alcoholic Attar & French Luxury Perfumes',
  ownerName: 'Noor Essense',
  contactPhone: '8144334641',
  contactPhone2: '8144334641',
  whatsappNumber: '+918144334641',
  supportEmail: 'nooressenceperfume@gmail.com',
  contactAddress: 'Park street azim enterprises inside room, Berhampur, ganjam, odisha 760002',
  googleMapsUrl: 'https://maps.google.com/?q=Park+street+azim+enterprises+inside+room+Berhampur+ganjam+odisha+760002',
  instagramUrl: 'https://www.instagram.com/noor_essence_perfume?stkn=MWd4NGMxOHBiYmp0MQ==',
  logoUrl: '/official_logo.jpg?v=5.0',
  aboutText: 'NOOR ESSENSE ATTAR & PERFUME is Berhampur’s premier fragrance destination creating masterpieces in luxury perfumes, pure alcohol-free traditional attars, and royal fragrances.\n\n📍 Visit our showroom at Park street azim enterprises inside room, Berhampur, ganjam, odisha 760002 or order online with Pan-India express delivery.',
  deliveryDetails: 'Pan-India Express Delivery Available 🇮🇳. All orders are packed securely and dispatched directly from our Berhampur boutique (Park street azim enterprises inside room, Berhampur, ganjam, odisha 760002). Fast delivery within 3-5 days across India.',
  announcementBarText: '✨ Welcome to NOOR ESSENSE ATTAR & PERFUME • 📍 Park Street, Berhampur, Odisha • 📞 WhatsApp / Call: +91 81443 34641 ✨',
  isAnnouncementEnabled: true,
  heroVideoUrl: '',
  heroVideoPoster: '',
  heroImageUrl: '/new_hero_bg.jpg?v=3.0',
  comboOfferTitle: 'ANY 5 PERFUMES AT JUST ₹1499',
  comboOfferPrice: 1499,
  comboOfferOriginalPrice: 2499,
  comboBottleCount: 5,
  comboOfferEnabled: true,
  comboProductIds: [
    'prod-am-alpha', 'prod-am-blue', 'prod-am-dessert', 'prod-secret-blue',
    'prod-ice-gold', 'prod-black-vanilla', 'prod-muaab-oud', 'prod-burberry-her',
    'prod-gucci-flora', 'prod-gentleman-pack'
  ],
  comboOfferDescription: 'Choose any 5 bottles from our entire catalog. Includes luxury gift box and Pan-India delivery!',
  adminEmail: 'noor@gmail.com',
  adminPassword: 'noor0404',
  razorpayKeyId: 'rzp_live_NoorEssence8144334641',
  razorpayKeySecret: 'NoorEssenceSecret2026',
  razorpayUpiId: '8144334641@upi',
  razorpayPaymentLink: '',
  razorpayQrImageUrl: '',
  razorpayEnabled: true,
};

export const INITIAL_CATEGORIES: Category[] = [
  { id: 'cat-all', name: 'All Masterpieces', slug: 'all', description: 'Complete collection of NOOR ESSENSE ATTAR & PERFUME', active: true },
  { id: 'cat-attars', name: 'Attar (Pure Non-Alcoholic)', slug: 'attar', description: '100% pure, alcohol-free concentrated perfume oils & Ittars', active: true },
  { id: 'cat-perfumes', name: 'Luxury Perfumes (EDP)', slug: 'perfumes', description: 'Long-lasting Eau de Parfum crafted for all-day projection', active: true },
  { id: 'cat-agarbatti', name: 'Handcrafted Agarbatti', slug: 'agarbatti', description: 'Pure aromatic incense sticks with soothing natural oils', active: true },
  { id: 'cat-bakhoor', name: 'Royal Bakhoor & Dhoop', slug: 'bakhoor', description: 'Exquisite Arabian incense chips, oudh bakhoor & burners', active: true },
  { id: 'cat-bridal', name: 'Islamic Accessories & Burners', slug: 'bridal-accessories', description: 'Kashmiri Rumal, Premium Topi, Ehram, Electric Burners & Stands', active: true },
  { id: 'cat-gifts', name: 'Custom Gifts & Combos', slug: 'gifts-combos', description: 'Special gift sets, personalized fragrance boxes & combo packs', active: true },
  { id: 'cat-fresh', name: 'Aquatic & Fresh', slug: 'fresh', description: 'Invigorating sea breeze, iced citrus, and blue notes', active: true },
  { id: 'cat-oud', name: 'Oud & Woody', slug: 'oud', description: 'Royal Agarwood, smoky woods, and amber authority', active: true },
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod_1790524402319',
    name: 'AL OUD',
    price: 1200,
    salePrice: 999,
    category: 'Luxury Perfumes (EDP)',
    volume: '50ml Eau de Parfum',
    sku: 'AH-OUD-01',
    stock: 50,
    featured: true,
    bestSeller: true,
    newArrival: true,
    status: 'available',
    description: 'The defining signature royal oud masterpiece of NOOR ESSENSE ATTAR & PERFUME. Rich smoky woody notes lingering for 12+ hours with unforgettable presence.',
    notes: {
      top: ['Kashmiri Saffron', 'Calabrian Bergamot'],
      middle: ['Royal Cambodian Oud', 'Rose Petals'],
      base: ['Golden Amber', 'White Musk'],
    },
    images: [
      '/al_ansar_royal_attar_showcase_1789386348873.jpg',
      '/am_user_perfume_hero.png',
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'prod_1790528862652',
    name: 'Rb marj',
    price: 599,
    salePrice: 499,
    category: 'Luxury Perfumes (EDP)',
    volume: '25 / 50 / 100ml',
    sku: 'AH-MRJ-02',
    stock: 35,
    featured: true,
    bestSeller: true,
    newArrival: false,
    status: 'available',
    description: 'Rich Arabian warmth blending exotic spices, sweet floral nuances, and deep balsamic woods. Formulated for high projection.',
    notes: {
      top: ['Spice sweet', 'Cardamom'],
      middle: ['Warm Amber', 'Orchid'],
      base: ['Woody Accord', 'Pure Musk'],
    },
    images: [
      '/al_ansar_royal_attar_showcase_1789386348873.jpg',
    ],
    createdAt: new Date().toISOString(),
  },
];

export const INITIAL_BANNERS: Banner[] = [
  {
    id: 'ban-1',
    imageUrl: 'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=1600&q=80',
    title: 'ATTAR • PERFUMES • AGARBATTI • BAKHOOR',
    subtitle: 'Park Street, Azim Enterprises, Berhampur, Odisha',
    buttonText: 'EXPLORE MASTERPIECES',
    linkUrl: '/shop',
    isActive: true,
  },
  {
    id: 'ban-2',
    imageUrl: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1600&q=80',
    title: 'THE FRAGRANCE DIARIES ✨',
    subtitle: 'By NOOR ESSENSE ATTAR & PERFUME — WhatsApp Order: +91 81443 34641',
    buttonText: 'DISCOVER BESTSELLERS',
    linkUrl: '/shop',
    isActive: true,
  },
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    id: 'coup-1',
    code: 'AL10',
    discountPercent: 10,
    minOrderAmount: 999,
    isActive: true,
  },
  {
    id: 'coup-2',
    code: 'VAD15',
    discountPercent: 15,
    minOrderAmount: 1999,
    isActive: true,
  },
];
