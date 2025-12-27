import { QrCode, CreditCard, Orbit, TrendingUp, Users, CheckCircle2, ChevronRight } from "lucide-react";
import { motion } from "motion/react";

export function HomeScreen() {
  // Stat cards data
  const stats = [
    { 
      id: 1, 
      label: "Membership", 
      value: "Premium", 
      icon: CheckCircle2, 
      color: "#10B981",
      bgColor: "#10B98120"
    },
    { 
      id: 2, 
      label: "Daily QR", 
      value: "3/5", 
      subtext: "remaining",
      icon: QrCode, 
      color: "#2962FF",
      bgColor: "#2962FF20"
    },
    { 
      id: 3, 
      label: "Referrals", 
      value: "12/20", 
      subtext: "to unlock reward",
      icon: Users, 
      color: "#A0A4B8",
      bgColor: "#A0A4B820"
    },
  ];

  // Recent activity data
  const activities = [
    { id: 1, title: "QR Code Scan - Laundry", time: "2 hours ago", type: "qr" },
    { id: 2, title: "Payment - Meal Plan", amount: "$45.00", time: "Yesterday", type: "payment" },
    { id: 3, title: "Joined Study Group", time: "2 days ago", type: "orbit" },
    { id: 4, title: "QR Code Scan - Gym Entry", time: "3 days ago", type: "qr" },
  ];

  // CTA buttons matching bottom nav
  const ctaButtons = [
    { id: "qr", label: "QR Code", icon: QrCode, color: "#2962FF" },
    { id: "pay", label: "SV Pay", icon: CreditCard, color: "#10B981" },
    { id: "orbit", label: "Orbit", icon: Orbit, color: "#EF4444" },
  ];

  return (
    <div className="flex flex-col pb-24 px-6 pt-8 min-h-screen">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <p className="text-[#A0A4B8] text-sm mb-1">Welcome back,</p>
        <h1 className="text-3xl font-semibold text-white">Alex Johnson</h1>
      </motion.div>

      {/* Stat Cards */}
      <div className="mb-8">
        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-[#0F1429] border border-white/10 rounded-[20px] p-4 flex flex-col"
              >
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center mb-3"
                  style={{ backgroundColor: stat.bgColor }}
                >
                  <Icon 
                    className="w-5 h-5" 
                    style={{ color: stat.color }}
                    aria-hidden="true" 
                  />
                </div>
                <p className="text-[#A0A4B8] text-xs mb-1">{stat.label}</p>
                <p className="text-white text-xl font-semibold">{stat.value}</p>
                {stat.subtext && (
                  <p className="text-[#A0A4B8] text-xs mt-1">{stat.subtext}</p>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="mb-8"
      >
        <div className="grid grid-cols-3 gap-3">
          {ctaButtons.map((button) => {
            const Icon = button.icon;
            return (
              <button
                key={button.id}
                className="bg-[#0F1429] border border-white/10 rounded-[30px] p-4 flex flex-col items-center justify-center gap-3 min-h-[100px] hover:border-white/20 transition-colors"
                style={{ borderRadius: "30px" }}
                aria-label={button.label}
              >
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ 
                    backgroundColor: `${button.color}20`,
                    borderRadius: "50px" 
                  }}
                >
                  <Icon 
                    className="w-6 h-6" 
                    style={{ color: button.color }}
                    aria-hidden="true" 
                  />
                </div>
                <span className="text-white text-sm font-medium">{button.label}</span>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
          <button className="text-[#2962FF] text-sm font-medium">View All</button>
        </div>
        
        <div className="space-y-2">
          {activities.map((activity, index) => (
            <motion.button
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
              className="w-full bg-[#0F1429] border border-white/10 rounded-[20px] p-4 flex items-center justify-between text-left hover:border-white/20 transition-colors"
            >
              <div className="flex-1">
                <p className="text-white font-medium mb-1">{activity.title}</p>
                <div className="flex items-center gap-2">
                  <p className="text-[#A0A4B8] text-sm">{activity.time}</p>
                  {activity.amount && (
                    <>
                      <span className="text-[#A0A4B8]">•</span>
                      <p className="text-white text-sm font-medium">{activity.amount}</p>
                    </>
                  )}
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-[#A0A4B8] flex-shrink-0" aria-hidden="true" />
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
