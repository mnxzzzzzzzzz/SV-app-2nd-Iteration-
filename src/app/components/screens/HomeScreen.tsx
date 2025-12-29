import { QrCode, CreditCard, Orbit, Wallet, Bell, Menu, Search, MessageSquare, User, Zap, Star, LayoutGrid, Globe, Compass, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export function HomeScreen() {
  const categories = [
    { id: "all", label: "All", active: true },
    { id: "entertainment", label: "Entertainment", active: false },
    { id: "clothing", label: "Clothing", active: false },
    { id: "food", label: "Food", active: false },
  ];

  const quickActions = [
    { id: "scan", label: "Scan QR", icon: QrCode, color: "bg-blue-500/10 text-blue-500" },
    { id: "pay", label: "SV Pay", icon: CreditCard, color: "bg-emerald-500/10 text-emerald-500" },
    { id: "orbit", label: "Orbit AI", icon: Orbit, color: "bg-orange-500/10 text-orange-500" },
    { id: "wallet", label: "Wallet", icon: Wallet, color: "bg-rose-500/10 text-rose-500" },
  ];

  return (
    <div className="flex flex-col pb-24 px-6 pt-8 min-h-screen bg-[#080C1F]">
      {/* Navbar Area */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
             <div className="w-5 h-5 bg-gradient-to-br from-[#FF4D4D] via-[#F9CB28] to-[#2962FF] rounded-sm rotate-45" />
          </div>
          <div>
            <p className="text-[#A0A4B8] text-[10px] uppercase tracking-wider font-bold">Good Morning</p>
            <h1 className="text-white font-bold text-xl leading-none mt-1">John Student</h1>
          </div>
        </div>
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
            <Bell size={20} color="white" />
          </div>
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#FF4D4D] rounded-full border-2 border-[#080C1F] flex items-center justify-center">
            <span className="text-white text-[10px] font-bold">3</span>
          </div>
        </div>
      </div>

      {/* Savings Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-[#2962FF] via-[#1E4FD9] to-[#153BB0] rounded-[32px] p-8 mb-8 relative overflow-hidden shadow-[0_20px_50px_rgba(41,98,255,0.3)] border border-white/10"
      >
        <div className="relative z-10">
          <p className="text-white/80 text-sm font-medium mb-4">Your Total Savings</p>
          <div className="flex items-baseline gap-1 mb-2">
            <h2 className="text-5xl font-bold text-white tracking-tight">£1,247</h2>
          </div>
          <p className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em] mb-10">This semester</p>
          
          <div className="h-[1px] bg-white/10 w-full mb-8" />
          
          <div className="flex items-center justify-between">
            <div className="text-center flex-1">
              <p className="text-white text-2xl font-bold mb-1">23</p>
              <p className="text-white/40 text-[9px] uppercase font-bold tracking-wider">Active Deals</p>
            </div>
            <div className="w-[1px] h-8 bg-white/10" />
            <div className="text-center flex-1">
              <p className="text-white text-2xl font-bold mb-1">45</p>
              <p className="text-white/40 text-[9px] uppercase font-bold tracking-wider">Visits</p>
            </div>
          </div>
        </div>
        
        {/* Abstract design elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[80px] rounded-full -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 blur-[40px] rounded-full -ml-16 -mb-16" />
      </motion.div>

      {/* Quick Actions */}
      <div className="mb-10">
        <h3 className="text-white font-bold text-lg mb-6 tracking-tight">Quick Actions</h3>
        <div className="grid grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <div key={action.id} className="flex flex-col items-center gap-2">
              <div className={`w-15 h-15 rounded-[22px] ${action.color} flex items-center justify-center border border-white/5 shadow-lg active:scale-95 transition-transform`}>
                <action.icon size={24} />
              </div>
              <span className="text-[#A0A4B8] text-[11px] font-semibold tracking-tight">{action.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Nearby Deals */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white font-bold text-xl tracking-tight">Nearby Deals</h2>
          <button className="text-[#2962FF] text-sm font-bold">See All</button>
        </div>

        {/* Categories */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                cat.active 
                ? "bg-[#2962FF] text-white shadow-[0_8px_20px_rgba(41,98,255,0.3)]" 
                : "bg-white/5 text-[#A0A4B8] border border-white/5 hover:bg-white/10"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Deal Card */}
        <motion.div 
          whileTap={{ scale: 0.98 }}
          className="bg-white/5 rounded-[28px] p-5 border border-white/5 flex items-center gap-4 mb-4 hover:bg-white/10 transition-colors cursor-pointer"
        >
          <div className="w-16 h-16 rounded-2xl bg-[#0F1429] border border-white/5 flex items-center justify-center overflow-hidden shadow-inner">
            <div className="w-10 h-10 bg-[#1A2139] rounded-lg" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start mb-1">
               <h4 className="text-white font-bold tracking-tight">Campus Coffee House</h4>
               <div className="bg-orange-500/20 px-2 py-0.5 rounded-md border border-orange-500/10">
                 <span className="text-orange-500 text-[8px] font-black uppercase tracking-wider">Popular</span>
               </div>
            </div>
            <div className="flex items-center justify-between">
               <p className="text-[#A0A4B8] text-sm font-medium">University Mall</p>
               <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center">
                 <ChevronRight size={16} color="#A0A4B8" />
               </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
