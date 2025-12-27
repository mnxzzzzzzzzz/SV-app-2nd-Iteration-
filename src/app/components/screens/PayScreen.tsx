"use client"

import { ArrowUpRight, ArrowDownLeft, Clock, Store } from "lucide-react"
import { motion } from "motion/react"
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

      {/* Balance Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-gradient-to-br from-[#10B981] to-[#059669] rounded-[30px] p-6 mb-6"
      >
        <p className="text-white/80 text-sm mb-2">Current Balance</p>
        <h2 className="text-4xl font-bold text-white mb-6">$247.50</h2>

        <div className="flex gap-3">
          <button
            className="flex-1 bg-white text-[#10B981] py-3 rounded-[30px] font-medium flex items-center justify-center gap-2"
            style={{ borderRadius: "30px" }}
          >
            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            Send
          </button>
          <button
            className="flex-1 bg-white/20 text-white py-3 rounded-[30px] font-medium flex items-center justify-center gap-2"
            style={{ borderRadius: "30px" }}
          >
            <ArrowDownLeft className="w-4 h-4" aria-hidden="true" />
            Request
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="bg-gradient-to-br from-[#2962FF] to-[#1E4FD9] rounded-[25px] p-5 mb-6 cursor-pointer hover:scale-[1.02] transition-transform"
        onClick={handleOpenSVPay}
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="size-12 rounded-full bg-white/20 flex items-center justify-center">
            <Store className="size-6 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-white font-semibold text-lg">SV Pay</p>
            <p className="text-white/80 text-sm">Use your student discounts</p>
          </div>
          <ArrowUpRight className="size-5 text-white" />
        </div>
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-white/20 h-1.5 rounded-full overflow-hidden">
            <div className="bg-white h-full w-2/3 rounded-full" />
          </div>
          <span className="text-white/90 text-xs font-medium">2/3 used today</span>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-[#0F1429] rounded-[20px] p-4 border border-white/10"
        >
          <p className="text-[#A0A4B8] text-sm mb-1">This Week</p>
          <p className="text-white text-xl font-semibold">$45.50</p>
          <p className="text-[#EF4444] text-xs mt-1">↑ 12% from last week</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="bg-[#0F1429] rounded-[20px] p-4 border border-white/10"
        >
          <p className="text-[#A0A4B8] text-sm mb-1">This Month</p>
          <p className="text-white text-xl font-semibold">$182.75</p>
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
                    <ArrowDownLeft className="w-5 h-5 text-[#10B981]" aria-hidden="true" />
                  ) : (
                    <ArrowUpRight className="w-5 h-5 text-[#EF4444]" aria-hidden="true" />
                  )}
                </div>
                <div>
                  <p className="text-white font-medium">{transaction.title}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Clock className="w-3 h-3 text-[#A0A4B8]" aria-hidden="true" />
                    <p className="text-[#A0A4B8] text-xs">{transaction.date}</p>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-semibold ${transaction.type === "income" ? "text-[#10B981]" : "text-white"}`}>
                  {transaction.type === "income" ? "+" : "-"}${Math.abs(transaction.amount).toFixed(2)}
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
