import { QrCode, CreditCard, Orbit, TrendingUp, Users, CheckCircle2, ChevronRight, Bell, Menu, Search, MessageSquare, User } from "lucide-react";
import { motion } from "motion/react";

export function HomeScreen() {
  const nearbyOffers = [
    {
      id: "1",
      name: "Costa",
      description: "Top of the Hill Coffee",
      discount: "50% OFF",
      distance: "40m",
      logo: "https://logo.clearbit.com/costa.co.uk",
      category: "Food",
    },
    {
      id: "2",
      name: "Nando's",
      description: "Proper Nando's",
      discount: "20% OFF",
      distance: "50m",
      logo: "https://logo.clearbit.com/nandos.co.uk",
      category: "Food",
    },
    {
      id: "3",
      name: "Zara",
      description: "Top of the Hill Coffee",
      discount: "20% OFF",
      distance: "20m",
      logo: "https://logo.clearbit.com/zara.com",
      category: "Clothing",
    },
  ];

  const smartSaves = [
    {
      id: "ss1",
      title: "Smart Save",
      merchant: "Top of the Hill Coffee",
      description: "Get smart savings in Top of the Hill Coffee.",
      discount: "20% OFF",
      color: "from-[#0F1629] to-[#1A2139]",
    }
  ];

  return (
    <div className="flex flex-col pb-24 px-6 pt-8 min-h-screen bg-[#080C1F]">
      {/* Navbar Area */}
      <div className="flex items-center justify-between mb-8">
        <Menu className="w-6 h-6 text-white" />
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2962FF] to-[#00B0FF] flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-sm rotate-45" />
          </div>
          <span className="text-white font-bold text-xl">StudentVerse</span>
        </div>
        <div className="relative">
          <Bell className="w-6 h-6 text-white" />
          <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-[#080C1F]" />
        </div>
      </div>

      {/* Greeting Area */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">Hello, Ahmed</h1>
        <div className="bg-[#1A2139] px-4 py-2 rounded-full flex items-center gap-2 border border-white/10">
          <div className="w-5 h-5 bg-yellow-500 rounded-full" />
          <span className="text-white font-bold">850 VP</span>
        </div>
      </div>

      {/* Smart Save Carousel (Mock) */}
      <div className="mb-8">
        {smartSaves.map((save) => (
          <motion.div
            key={save.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`bg-gradient-to-br ${save.color} rounded-[32px] p-6 border border-white/10 relative overflow-hidden h-[200px] flex flex-col justify-center`}
          >
            <div className="relative z-10">
              <p className="text-white text-lg font-bold mb-1">{save.title}</p>
              <h2 className="text-2xl font-bold text-white mb-2">{save.merchant}</h2>
              <p className="text-[#A0A4B8] text-sm mb-6 max-w-[200px]">{save.description}</p>
              <button className="bg-white text-black px-6 py-2 rounded-full text-sm font-bold w-fit">
                Shop now
              </button>
            </div>
            {/* The 20% OFF Badge */}
            <div className="absolute right-6 top-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-[#00FFD1]/20 border border-[#00FFD1]/30 flex flex-col items-center justify-center backdrop-blur-md">
              <span className="text-[#00FFD1] text-2xl font-bold">{save.discount}</span>
              <span className="text-[#00FFD1] text-xs font-bold">OFF</span>
            </div>
            {/* Background Mesh (Mock) */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#2962FF] opacity-20 blur-[50px] rounded-full" />
          </motion.div>
        ))}
        {/* Carousel Indicators */}
        <div className="flex justify-center gap-1 mt-4">
          <div className="w-4 h-1.5 bg-white rounded-full" />
          <div className="w-1.5 h-1.5 bg-white/20 rounded-full" />
          <div className="w-1.5 h-1.5 bg-white/20 rounded-full" />
          <div className="w-1.5 h-1.5 bg-white/20 rounded-full" />
        </div>
      </div>

      {/* Nearby Offers Area */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Nearby Offers</h2>
          <button className="text-[#A0A4B8] text-sm font-medium">See all</button>
        </div>

        <div className="space-y-4">
          {nearbyOffers.map((offer) => (
            <motion.button
              key={offer.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.location.hash = "#qr"}
              className="w-full bg-[#1A2139] rounded-[24px] p-4 flex items-center gap-4 border border-white/5"
            >
              <div className="w-16 h-16 rounded-2xl bg-white overflow-hidden flex items-center justify-center p-2">
                <img src={offer.logo} alt={offer.name} className="w-full h-full object-contain" />
              </div>
              <div className="flex-1 text-left">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-white font-bold text-lg">{offer.name}</h3>
                  <span className="text-[#00FFD1] font-bold text-sm">{offer.discount}</span>
                </div>
                <p className="text-[#A0A4B8] text-sm mb-2">{offer.description}</p>
                <div className="flex items-center gap-1 text-yellow-500">
                  <span className="text-sm font-bold">★ {offer.distance}</span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Bottom Nav Simulation (Hidden as handled by parent) */}
    </div>
  );
}
