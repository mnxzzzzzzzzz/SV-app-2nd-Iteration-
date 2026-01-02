import { Plus, Lock, Globe, Smartphone } from "lucide-react"
import { motion, useMotionValue, animate } from "framer-motion"
import { useState, useEffect } from "react"
import { VirtualCard } from "../sv-pay/VirtualCard"
import { TransactionList, Transaction } from "../sv-pay/TransactionList"

function BalanceCounter({ value }: { value: string }) {
  const [displayValue, setDisplayValue] = useState(0)
  const motionValue = useMotionValue(0)

  useEffect(() => {
    const unsubscribe = motionValue.on("change", (latest) => {
      setDisplayValue(latest)
    })

    animate(motionValue, parseFloat(value), {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
    })

    return unsubscribe
  }, [value, motionValue])

  return (
    <span className="tabular-nums">
      £{displayValue.toFixed(2)}
    </span>
  )
}

export function PayScreen() {
  const [cardFrozen, setCardFrozen] = useState(false)
  const [onlinePayments, setOnlinePayments] = useState(true)

  const user = { displayName: "Alex Johnson" }
  const balance = "247.50"

  const transactions: Transaction[] = [
    { id: 1, merchant: "Virgin Mobile", amount: "50", type: "debit", category: "utility", date: new Date() },
    { id: 2, merchant: "Dubai Metro", amount: "15", type: "debit", category: "transport", date: new Date(Date.now() - 3600000) },
    { id: 3, merchant: "Top Up", amount: "200", type: "credit", category: "default", date: new Date(Date.now() - 86400000) },
    { id: 4, merchant: "Campus Café", amount: "8.50", type: "debit", category: "food", date: new Date(Date.now() - 172800000) },
    { id: 5, merchant: "Tech Store", amount: "35", type: "debit", category: "shopping", date: new Date(Date.now() - 259200000) },
  ]

  return (
    <div className="min-h-screen bg-[#080C1F] text-slate-100 pb-32 px-6 pt-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
          SV Pay
        </h1>
        <button className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
          <Plus size={20} className="text-white" />
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <p className="text-[10px] tracking-[0.25em] text-[#A0A4B8] uppercase mb-2">Total Balance</p>
        <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
          <BalanceCounter value={balance} />
        </h2>
        
        <VirtualCard user={user} balance={balance} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-3 gap-3 mb-8"
      >
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#00F0FF]/10 flex items-center justify-center">
            <Lock size={18} className="text-[#00F0FF]" />
          </div>
          <span className="text-xs text-center text-[#A0A4B8]">Freeze Card</span>
          <button
            onClick={() => setCardFrozen(!cardFrozen)}
            className={`w-12 h-7 rounded-full p-1 transition-colors ${
              cardFrozen ? "bg-[#00F0FF]" : "bg-white/20"
            }`}
          >
            <motion.div
              animate={{ x: cardFrozen ? 20 : 0 }}
              className="w-5 h-5 bg-white rounded-full shadow-md"
            />
          </button>
        </div>

        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#7B2CBF]/10 flex items-center justify-center">
            <Globe size={18} className="text-[#7B2CBF]" />
          </div>
          <span className="text-xs text-center text-[#A0A4B8]">Online Pay</span>
          <button
            onClick={() => setOnlinePayments(!onlinePayments)}
            className={`w-12 h-7 rounded-full p-1 transition-colors ${
              onlinePayments ? "bg-[#7B2CBF]" : "bg-white/20"
            }`}
          >
            <motion.div
              animate={{ x: onlinePayments ? 20 : 0 }}
              className="w-5 h-5 bg-white rounded-full shadow-md"
            />
          </button>
        </div>

        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#00F0FF]/10 flex items-center justify-center">
            <Smartphone size={18} className="text-[#00F0FF]" />
          </div>
          <span className="text-xs text-center text-[#A0A4B8]">Aani Pay</span>
          <button className="px-4 py-1.5 bg-[#00F0FF] text-[#080C1F] rounded-full text-xs font-semibold hover:bg-[#00F0FF]/90 transition-colors">
            Open
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold" style={{ fontFamily: "'Syne', sans-serif" }}>
            Transaction History
          </h3>
          <button className="text-[#00F0FF] text-sm font-medium">View All</button>
        </div>
        
        <TransactionList transactions={transactions} />
      </motion.div>
    </div>
  )
}
