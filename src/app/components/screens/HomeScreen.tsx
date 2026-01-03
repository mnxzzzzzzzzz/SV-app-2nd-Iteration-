import { MapPin, Menu, Bell } from "lucide-react";
import { motion } from "framer-motion";
import { BRAND_OFFERS } from "../../../data/brandOffers";

interface HomeScreenProps {
  onOfferClick?: (offerId: string) => void;
}

export function HomeScreen({ onOfferClick }: HomeScreenProps) {
  const nearbyOffers = [
    {
      id: 1,
      name: "Coffee Planet",
      description: "Fresh brewed coffee & snacks",
      distance: "40m",
      logoType: "image" as const,
      logoSrc: "/coffee-planet.png",
    },
    {
      id: 2,
      name: "Filli Café",
      description: "Traditional chai & beverages",
      distance: "120m",
      logoType: "image" as const,
      logoSrc: "/filli.png",
    },
    {
      id: 3,
      name: "B60",
      description: "Retro dining experience",
      distance: "200m",
      logoType: "image" as const,
      logoSrc: "/b60.jpg",
    },
    {
      id: 4,
      name: "Book Corner",
      description: "Textbooks & stationery",
      distance: "350m",
      logoType: "icon" as const,
    },
  ];

  return (
    <div className="flex flex-col pb-24 px-5 pt-6" style={{ background: 'linear-gradient(to bottom, #0A0F1E 0%, #0d1225 50%, #1a1020 75%, #251518 100%)' }}>
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-4">
        <button className="w-10 h-10 rounded-full bg-sv-glass-bg flex items-center justify-center border border-sv-glass-border">
          <Menu size={20} className="text-sv-text-main" />
        </button>
        <div className="flex items-center gap-3">
          <img src="/studentverse-app-icon.png" alt="StudentVerse" className="h-10 w-auto" />
          <span className="font-heading text-sv-text-main font-bold text-lg">StudentVerse</span>
        </div>
        <button className="w-10 h-10 rounded-full bg-sv-glass-bg flex items-center justify-center border border-sv-glass-border relative">
          <Bell size={20} className="text-sv-text-main" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-[#080C1F] flex items-center justify-center">
            <span className="text-white text-[8px] font-bold">2</span>
          </div>
        </button>
      </div>

      {/* Greeting Row */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-sv-text-main font-bold text-2xl">Hello, Ahmed</h1>
        <div className="bg-sv-navy border border-sv-glass-border rounded-full px-4 py-2 flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-sv-gold to-orange-500 flex items-center justify-center">
            <span className="text-[8px] font-bold text-white">★</span>
          </div>
          <span className="font-mono text-sv-gold text-sm font-bold">850 VP</span>
        </div>
      </div>

      {/* Hero Promotional Cards - Two Side by Side */}
      <div className="flex gap-3 mb-8">
        {/* Coffee Planet Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-1 rounded-[32px] overflow-hidden aspect-square shadow-2xl"
          style={{ 
            background: 'radial-gradient(circle at 0% 0%, rgba(251, 146, 60, 0.15) 0%, transparent 50%), radial-gradient(circle at 100% 100%, rgba(168, 85, 247, 0.15) 0%, transparent 50%), #0f172a' 
          }}
        >
          <div className="relative p-5 h-full flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-[10px] font-bold tracking-[0.15em] uppercase">
                Coffee Planet
              </span>
              <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center bg-white/5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                  <circle cx="12" cy="8" r="5" />
                  <path d="M3 21c0-4.5 4-8 9-8s9 3.5 9 8" />
                </svg>
              </div>
            </div>
            
            <div className="flex-1 flex flex-col items-center justify-center">
              <h2 className="text-white text-2xl font-extrabold text-center tracking-tight leading-[1.1]">
                Exclusive<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-purple-400 to-blue-400">
                  Matcha Deals
                </span>
              </h2>
            </div>
            
            <button 
              onClick={() => onOfferClick?.('coffee-planet')}
              className="w-full py-3 rounded-2xl text-white font-semibold text-sm transition-transform hover:scale-[1.02] active:scale-[0.98]"
              style={{ 
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 4px 24px rgba(0, 0, 0, 0.2)'
              }}
            >
              Shop Now
            </button>
          </div>
        </motion.div>

        {/* Filli Café Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex-1 rounded-[32px] overflow-hidden aspect-square shadow-2xl"
          style={{ 
            background: 'radial-gradient(circle at 0% 0%, rgba(59, 130, 246, 0.15) 0%, transparent 50%), radial-gradient(circle at 100% 100%, rgba(147, 51, 234, 0.15) 0%, transparent 50%), #0f172a' 
          }}
        >
          <div className="relative p-5 h-full flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-[10px] font-bold tracking-[0.15em] uppercase">
                Filli Café
              </span>
              <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center bg-white/5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                  <circle cx="9" cy="9" r="1" fill="white" />
                  <circle cx="15" cy="9" r="1" fill="white" />
                </svg>
              </div>
            </div>
            
            <div className="flex-1 flex flex-col items-center justify-center">
              <h2 className="text-white text-2xl font-extrabold text-center tracking-tight leading-[1.1]">
                Irresistible<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                  Donut Deals
                </span>
              </h2>
            </div>
            
            <button 
              onClick={() => onOfferClick?.('filli-cafe')}
              className="w-full py-3 rounded-2xl text-white font-semibold text-sm transition-transform hover:scale-[1.02] active:scale-[0.98]"
              style={{ 
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 4px 24px rgba(0, 0, 0, 0.2)'
              }}
            >
              Order Now
            </button>
          </div>
        </motion.div>
      </div>

      {/* Nearby Offers Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-heading text-sv-text-main font-bold text-xl">Nearby Offers</h2>
          <button className="font-body text-sv-azure text-sm font-semibold">See all</button>
        </div>

        {/* Vendor Cards */}
        <div className="flex flex-col gap-3">
          {nearbyOffers.map((offer, index) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onOfferClick?.(offer.name.toLowerCase().replace(/\s+/g, '-'))}
              className="bg-sv-glass-bg rounded-2xl p-2 border border-sv-glass-border flex items-center gap-2 hover:bg-sv-glass-highlight transition-colors cursor-pointer backdrop-blur-sm"
            >
              <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0" style={{ backgroundColor: offer.logoType === 'icon' ? '#000' : 'transparent' }}>
                {offer.logoType === 'image' ? (
                  <img src={offer.logoSrc} alt={offer.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-black rounded-xl" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sv-text-main font-semibold text-lg mb-1" style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>{offer.name}</h4>
                <p className="text-sv-text-muted text-base mb-1" style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>{offer.description}</p>
                <div className="flex items-center gap-1 text-sv-text-muted">
                  <MapPin size={14} />
                  <span className="text-sm" style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>{offer.distance}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
