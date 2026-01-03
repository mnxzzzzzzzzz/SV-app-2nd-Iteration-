import { MapPin, ChevronRight, Menu, Bell } from "lucide-react";
import { motion } from "framer-motion";

export function HomeScreen() {
  const nearbyOffers = [
    {
      id: 1,
      name: "Campus Coffee",
      description: "Fresh brewed coffee & snacks",
      distance: "40m",
      discount: "15% OFF",
      logo: "☕",
    },
    {
      id: 2,
      name: "Tech Zone",
      description: "Electronics & accessories",
      distance: "120m",
      discount: "20% OFF",
      logo: "💻",
    },
    {
      id: 3,
      name: "Fresh Bites",
      description: "Healthy meals & salads",
      distance: "200m",
      discount: "10% OFF",
      logo: "🥗",
    },
    {
      id: 4,
      name: "Book Corner",
      description: "Textbooks & stationery",
      distance: "350m",
      discount: "25% OFF",
      logo: "📚",
    },
  ];

  return (
    <div className="flex flex-col pb-24 px-5 pt-6" style={{ background: 'linear-gradient(to bottom, #0A0F1E 0%, #0d1225 50%, #1a1020 75%, #251518 100%)' }}>
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-4">
        <button className="w-10 h-10 rounded-full bg-sv-glass-bg flex items-center justify-center border border-sv-glass-border">
          <Menu size={20} className="text-sv-text-main" />
        </button>
        <div className="flex items-center gap-2">
          <img src="/studentverse-app-icon.png" alt="StudentVerse" className="h-8 w-auto" />
          <span className="font-heading text-sv-text-main font-semibold">StudentVerse</span>
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

      {/* Hero Promotional Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative rounded-[20px] overflow-hidden mb-8"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-sv-violet via-sv-azure to-sv-cyan opacity-80" />
        <div className="absolute inset-0 bg-sv-glass-bg backdrop-blur-sm" />
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-sv-cyan opacity-30 blur-[60px] rounded-full" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-sv-violet opacity-40 blur-[50px] rounded-full" />
        
        <div className="relative p-6">
          <div className="bg-sv-gold text-sv-navy px-3 py-1 rounded-full font-mono text-xs font-bold uppercase w-fit mb-4">
            20% OFF
          </div>
          <h2 className="font-heading text-sv-text-main text-2xl font-bold mb-2">
            Exclusive Student Deals
          </h2>
          <p className="font-body text-sv-text-main/70 text-sm mb-6 max-w-[200px]">
            Save big on your favorite brands with StudentVerse
          </p>
          <button className="font-body bg-white text-sv-navy px-6 py-3 rounded-full font-semibold text-sm hover:opacity-90 transition-opacity">
            Shop now
          </button>
        </div>
      </motion.div>

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
              className="bg-sv-glass-bg rounded-2xl p-4 border border-sv-glass-border flex items-center gap-4 hover:bg-sv-glass-highlight transition-colors cursor-pointer backdrop-blur-sm"
            >
              <div className="w-14 h-14 rounded-xl bg-sv-navy border border-sv-glass-border flex items-center justify-center text-2xl">
                {offer.logo}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-heading text-sv-text-main font-semibold truncate">{offer.name}</h4>
                  <div className="bg-sv-azure/20 px-2 py-0.5 rounded-md border border-sv-azure/30 ml-2 flex-shrink-0">
                    <span className="font-mono text-sv-azure text-xs font-semibold uppercase">{offer.discount}</span>
                  </div>
                </div>
                <p className="font-body text-sv-text-muted text-sm truncate mb-1">{offer.description}</p>
                <div className="flex items-center gap-1 text-sv-text-muted">
                  <MapPin size={12} />
                  <span className="font-mono text-xs">{offer.distance}</span>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-sv-glass-bg flex items-center justify-center border border-sv-glass-border flex-shrink-0">
                <ChevronRight size={16} className="text-sv-text-muted" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
