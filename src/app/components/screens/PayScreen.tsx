import { ArrowUpRight, ArrowDownLeft, Clock, Store } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"
import { SVPayScreen } from "../sv-pay/SVPayScreen"
import type { SVPayMerchant } from "../sv-pay/types"

export function PayScreen() {
  const [showSVPay, setShowSVPay] = useState(false)
  const [selectedMerchant, setSelectedMerchant] = useState<SVPayMerchant | null>(null)

  const transactions = [
    { id: 1, type: "expense", title: "Laundry Service", amount: -8.5, date: "Today, 2:30 PM", category: "Services" },
    { id: 2, type: "income", title: "Added Funds", amount: 100.0, date: "Yesterday, 4:15 PM", category: "Deposit" },
    { id: 3, type: "expense", title: "Vending Machine", amount: -3.75, date: "Dec 25, 6:45 PM", category: "Food" },
    { id: 4, type: "expense", title: "Study Room", amount: -5.0, date: "Dec 24, 1:20 PM", category: "Services" },
    { id: 5, type: "expense", title: "Printing", amount: -2.25, date: "Dec 23, 10:15 AM", category: "Services" },
  ]

  const sampleMerchant: SVPayMerchant = {
    id: "1",
    name: "Campus Café",
    logo: "/coffee-shop-logo.png",
    location: "Student Center, Floor 1",
    discount: 15,
    distance: "0.2 km",
  }

  const handleOpenSVPay = () => {
    setSelectedMerchant(sampleMerchant)
    setShowSVPay(true)
  }

  if (showSVPay && selectedMerchant) {
    return <SVPayScreen merchant={selectedMerchant} onBack={() => setShowSVPay(false)} />
  }

  return (
    <div className="flex flex-col pb-24 px-6 pt-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-white mb-2">Payments</h1>
        <p className="text-[#A0A4B8]">Track your spending and transactions</p>
      </div>

      {/* Apple-like Wallet Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative h-[240px] mb-8 cursor-pointer group"
        onClick={handleOpenSVPay}
      >
        {/* Main Card */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1C1C1E] to-[#000000] rounded-[24px] p-8 border border-white/10 shadow-2xl overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
          <div className="flex justify-between items-start mb-12">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#2962FF] to-[#00B0FF] flex items-center justify-center">
                <div className="w-5 h-5 bg-white rounded-sm rotate-45" />
              </div>
              <span className="text-white font-bold tracking-tight">SV Pay</span>
            </div>
            <div className="w-12 h-8 bg-white/5 rounded-md flex items-center justify-center border border-white/10">
              <div className="w-6 h-4 bg-white/20 rounded-sm" />
            </div>
          </div>
          
          <div>
            <p className="text-white/40 text-xs font-medium tracking-widest uppercase mb-1">Total Balance</p>
            <h2 className="text-4xl font-bold text-white tracking-tight">£247.50</h2>
          </div>

          {/* Decorative Mesh */}
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#2962FF] opacity-10 blur-[80px] rounded-full" />
        </div>
      </motion.div>

      {/* Action Buttons */}
      <div className="flex gap-4 mb-10">
        <button className="flex-1 bg-white text-black py-4 rounded-[18px] font-bold flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform">
          <ArrowUpRight size={20} />
          Send
        </button>
        <button className="flex-1 bg-[#1C1C1E] text-white py-4 rounded-[18px] font-bold flex items-center justify-center gap-2 border border-white/5 shadow-lg active:scale-95 transition-transform">
          <ArrowDownLeft size={20} />
          Request
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-[#0F1429] rounded-[20px] p-4 border border-white/10"
        >
          <p className="text-[#A0A4B8] text-sm mb-1">This Week</p>
          <p className="text-white text-xl font-semibold">£45.50</p>
          <p className="text-[#EF4444] text-xs mt-1">↑ 12% from last week</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="bg-[#0F1429] rounded-[20px] p-4 border border-white/10"
        >
          <p className="text-[#A0A4B8] text-sm mb-1">This Month</p>
          <p className="text-white text-xl font-semibold">£182.75</p>
          <p className="text-[#10B981] text-xs mt-1">↓ 8% from last month</p>
        </motion.div>
      </div>

      {/* Transactions */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Recent Transactions</h3>
          <button className="text-[#2962FF] text-sm font-medium">View All</button>
        </div>

        <div className="space-y-3">
          {transactions.map((transaction, index) => (
            <motion.div
              key={transaction.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="flex items-center justify-between p-4 bg-[#0F1429] rounded-[20px] border border-white/10"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    transaction.type === "income" ? "bg-[#10B981]/20" : "bg-[#EF4444]/20"
                  }`}
                >
                  {transaction.type === "income" ? (
                    <ArrowDownLeft size={20} color="#10B981" />
                  ) : (
                    <ArrowUpRight size={20} color="#EF4444" />
                  )}
                </div>
                <div>
                  <p className="text-white font-medium">{transaction.title}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Clock size={12} color="#A0A4B8" />
                    <p className="text-[#A0A4B8] text-xs">{transaction.date}</p>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-semibold ${transaction.type === "income" ? "text-[#10B981]" : "text-white"}`}>
                  {transaction.type === "income" ? "+" : "-"}£{Math.abs(transaction.amount).toFixed(2)}
                </p>
                <p className="text-[#A0A4B8] text-xs mt-1">{transaction.category}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
