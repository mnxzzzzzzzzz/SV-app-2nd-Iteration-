import { QrCode, CreditCard, Orbit, Wallet, Bell, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export function HomeScreen() {
  const categories = [
    { id: "all", label: "All", active: true },
    { id: "entertainment", label: "Entertainment", active: false },
    { id: "clothing", label: "Clothing", active: false },
    { id: "food", label: "Food", active: false },
  ];

  const quickActions = [
    { id: "scan", label: "Scan QR", icon: QrCode, color: "bg-sv-azure/10 text-sv-azure" },
    { id: "pay", label: "SV Pay", icon: CreditCard, color: "bg-sv-cyan/10 text-sv-cyan" },
    { id: "orbit", label: "Orbit AI", icon: Orbit, color: "bg-sv-gold/10 text-sv-gold" },
    { id: "wallet", label: "Wallet", icon: Wallet, color: "bg-sv-violet/10 text-sv-violet" },
  ];

  return (
    <div className="flex flex-col pb-24 px-6 pt-8 min-h-screen bg-sv-navy">
      {/* Navbar Area */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sv-glass-bg flex items-center justify-center border border-sv-glass-border">
             <div className="w-5 h-5 bg-gradient-to-br from-sv-gold via-sv-cyan to-sv-azure rounded-sm rotate-45" />
          </div>
          <div>
            <p className="text-label text-sv-text-muted">Good Morning</p>
            <h1 className="font-heading text-sv-text-main font-bold text-xl leading-none mt-1">John Student</h1>
          </div>
        </div>
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-sv-glass-bg flex items-center justify-center border border-sv-glass-border">
            <Bell size={20} className="text-sv-text-main" />
          </div>
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-destructive rounded-full border-2 border-sv-navy flex items-center justify-center">
            <span className="text-white text-[10px] font-bold">3</span>
          </div>
        </div>
      </div>

      {/* Top Deals Area */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-heading text-sv-text-main font-bold text-xl tracking-tight">Top Deals</h2>
          <button className="text-sv-azure text-sm font-semibold">View all</button>
        </div>
        
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {[1, 2].map((i) => (
            <motion.div
              key={i}
              className="min-w-[280px] bg-sv-glass-bg rounded-2xl p-6 border border-sv-glass-border relative overflow-hidden backdrop-blur-md"
            >
              <div className="relative z-10">
                <div className="bg-sv-glass-highlight w-fit px-3 py-1 rounded-full mb-4 border border-sv-glass-border">
                  <span className="text-label text-sv-cyan">Limited Time</span>
                </div>
                <h3 className="font-heading text-sv-text-main font-bold text-xl mb-1">Exclusive Discount</h3>
                <p className="font-body text-sv-text-muted text-sm mb-6">Save up to 40% on all tech items this week.</p>
                <button className="bg-sv-azure text-white px-6 py-2 rounded-full text-xs font-semibold hover:opacity-90 transition-opacity">
                  Claim Deal
                </button>
              </div>
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-sv-azure opacity-20 blur-[40px] rounded-full" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-10">
        <h3 className="font-heading text-sv-text-main font-semibold text-lg mb-6 tracking-tight">Quick Actions</h3>
        <div className="grid grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <div key={action.id} className="flex flex-col items-center gap-2">
              <div className={`w-15 h-15 rounded-xl ${action.color} flex items-center justify-center border border-sv-glass-border shadow-lg active:scale-95 transition-transform`}>
                <action.icon size={24} />
              </div>
              <span className="font-body text-sv-text-muted text-[11px] font-medium tracking-tight">{action.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Nearby Deals */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-heading text-sv-text-main font-bold text-xl tracking-tight">Nearby Deals</h2>
          <button className="text-sv-azure text-sm font-semibold">See All</button>
        </div>

        {/* Categories */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
                cat.active 
                ? "bg-sv-azure text-white shadow-[0_8px_20px_rgba(41,98,255,0.3)]" 
                : "bg-sv-glass-bg text-sv-text-muted border border-sv-glass-border hover:bg-sv-glass-highlight"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Deal Card */}
        <motion.div 
          whileTap={{ scale: 0.98 }}
          className="bg-sv-glass-bg rounded-2xl p-5 border border-sv-glass-border flex items-center gap-4 mb-4 hover:bg-sv-glass-highlight transition-colors cursor-pointer backdrop-blur-sm"
        >
          <div className="w-16 h-16 rounded-xl bg-sv-navy border border-sv-glass-border flex items-center justify-center overflow-hidden shadow-inner">
            <div className="w-10 h-10 bg-sv-glass-bg rounded-lg" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start mb-1">
               <h4 className="font-heading text-sv-text-main font-bold tracking-tight">Campus Coffee House</h4>
               <div className="bg-sv-gold/20 px-2 py-0.5 rounded-md border border-sv-gold/10">
                 <span className="text-label text-sv-gold">Popular</span>
               </div>
            </div>
            <div className="flex items-center justify-between">
               <p className="font-body text-sv-text-muted text-sm">University Mall</p>
               <div className="w-6 h-6 rounded-full bg-sv-glass-bg flex items-center justify-center">
                 <ChevronRight size={16} className="text-sv-text-muted" />
               </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
