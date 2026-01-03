import { Plus, Lock, Globe, Smartphone, Tag, Check, X } from "lucide-react"
import { motion, useMotionValue, animate } from "framer-motion"
import { useState, useEffect } from "react"
import { VirtualCard } from "../sv-pay/VirtualCard"
import { TransactionList, Transaction } from "../sv-pay/TransactionList"
import { useSvPay } from "../../../hooks/useSvPay"

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
  const { state: payState, authorize, confirm, voidIntent, reset, clearError } = useSvPay()

  const user = { displayName: "Alex Johnson" }
  const balance = "247.50"
  const mockPaymentAmount = 25.00

  const transactions: Transaction[] = [
    { id: 1, merchant: "Virgin Mobile", amount: "50", type: "debit", category: "utility", date: new Date() },
    { id: 2, merchant: "Dubai Metro", amount: "15", type: "debit", category: "transport", date: new Date(Date.now() - 3600000) },
    { id: 3, merchant: "Top Up", amount: "200", type: "credit", category: "default", date: new Date(Date.now() - 86400000) },
    { id: 4, merchant: "Campus Café", amount: "8.50", type: "debit", category: "food", date: new Date(Date.now() - 172800000) },
    { id: 5, merchant: "Tech Store", amount: "35", type: "debit", category: "shopping", date: new Date(Date.now() - 259200000) },
  ]

  const handleApplyDiscount = async () => {
    await authorize(mockPaymentAmount)
  }

  return (
    <div className="bg-sv-navy text-sv-text-main pb-8 px-6 pt-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-heading text-3xl font-bold tracking-tight">
          SV Pay
        </h1>
        <button className="w-11 h-11 rounded-full bg-sv-glass-bg backdrop-blur-md border border-sv-glass-border flex items-center justify-center hover:bg-sv-glass-highlight transition-colors">
          <Plus size={20} className="text-sv-text-main" />
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <p className="font-mono text-sv-text-muted text-xs uppercase tracking-wider mb-2">Total Balance</p>
        <h2 className="font-heading text-5xl font-extrabold mb-6 bg-gradient-to-r from-sv-text-main to-sv-text-main/80 bg-clip-text text-transparent">
          <BalanceCounter value={balance} />
        </h2>
        
        <VirtualCard user={user} balance={balance} />
      </motion.div>

      {/* SV Pay Authorization Flow */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="mb-8"
      >
        {payState.status === null && (
          <button
            onClick={handleApplyDiscount}
            disabled={payState.loading}
            className="w-full bg-gradient-to-r from-sv-azure to-sv-violet text-white py-4 rounded-2xl font-body font-semibold flex items-center justify-center gap-3 hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            <Tag size={20} />
            {payState.loading ? "Applying..." : "Apply Student Discount"}
          </button>
        )}

        {payState.status === "AUTHORIZED" && (
          <div className="bg-sv-glass-bg backdrop-blur-md border border-sv-glass-border rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-sv-azure/20 flex items-center justify-center">
                <Tag size={16} className="text-sv-azure" />
              </div>
              <h3 className="font-heading text-lg font-semibold">Discount Applied</h3>
            </div>

            <div className="space-y-3 mb-5">
              <div className="flex justify-between items-center">
                <span className="font-body text-sv-text-muted text-sm">Original Amount</span>
                <span className="font-mono text-sv-text-main">£{payState.original_amount?.toFixed(2)}</span>
              </div>
              {payState.discounted_amount !== null && (
                <div className="flex justify-between items-center">
                  <span className="font-body text-sv-text-muted text-sm">Discounted Amount</span>
                  <span className="font-mono text-sv-cyan font-semibold">£{payState.discounted_amount.toFixed(2)}</span>
                </div>
              )}
              {payState.reason_code && (
                <div className="flex justify-between items-center">
                  <span className="font-body text-sv-text-muted text-sm">Discount Code</span>
                  <span className="font-mono text-sv-gold text-xs uppercase">{payState.reason_code}</span>
                </div>
              )}
              {payState.discounted_amount !== null && payState.original_amount !== null && (
                <div className="flex justify-between items-center pt-2 border-t border-sv-glass-border">
                  <span className="font-body text-sv-text-muted text-sm">You Save</span>
                  <span className="font-mono text-green-400 font-semibold">
                    £{(payState.original_amount - payState.discounted_amount).toFixed(2)}
                  </span>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={confirm}
                disabled={payState.loading}
                className="flex-1 bg-sv-azure text-white py-3 rounded-xl font-body font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                <Check size={18} />
                Confirm
              </button>
              <button
                onClick={voidIntent}
                disabled={payState.loading}
                className="flex-1 bg-sv-glass-highlight text-sv-text-main py-3 rounded-xl font-body font-semibold flex items-center justify-center gap-2 hover:bg-sv-glass-bg transition-colors disabled:opacity-50 border border-sv-glass-border"
              >
                <X size={18} />
                Cancel
              </button>
            </div>
          </div>
        )}

        {payState.status === "CONFIRMED" && (
          <div className="bg-sv-glass-bg backdrop-blur-md border border-green-500/30 rounded-2xl p-5 text-center">
            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-3">
              <Check size={24} className="text-green-400" />
            </div>
            <h3 className="font-heading text-lg font-semibold mb-1">Payment Confirmed</h3>
            <p className="font-body text-sv-text-muted text-sm mb-4">
              £{payState.discounted_amount?.toFixed(2) ?? payState.original_amount?.toFixed(2)} has been charged
            </p>
            <button
              onClick={reset}
              className="font-body text-sv-azure text-sm font-semibold"
            >
              Done
            </button>
          </div>
        )}

        {payState.status === "VOIDED" && (
          <div className="bg-sv-glass-bg backdrop-blur-md border border-sv-glass-border rounded-2xl p-5 text-center">
            <div className="w-12 h-12 rounded-full bg-sv-text-muted/20 flex items-center justify-center mx-auto mb-3">
              <X size={24} className="text-sv-text-muted" />
            </div>
            <h3 className="font-heading text-lg font-semibold mb-1">Payment Cancelled</h3>
            <p className="font-body text-sv-text-muted text-sm mb-4">
              No charges were made
            </p>
            <button
              onClick={reset}
              className="font-body text-sv-azure text-sm font-semibold"
            >
              Start Over
            </button>
          </div>
        )}

        {payState.error && (
          <div className="mt-3 bg-red-500/10 border border-red-500/30 rounded-xl p-3 flex items-center justify-between gap-2">
            <p className="font-body text-red-400 text-sm flex-1">{payState.error}</p>
            <button
              onClick={clearError}
              className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center hover:bg-red-500/30 transition-colors flex-shrink-0"
            >
              <X size={14} className="text-red-400" />
            </button>
          </div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-3 gap-3 mb-8"
      >
        <div className="bg-sv-glass-bg backdrop-blur-md border border-sv-glass-border rounded-xl p-4 flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sv-cyan/10 flex items-center justify-center">
            <Lock size={18} className="text-sv-cyan" />
          </div>
          <span className="font-body text-xs text-center text-sv-text-muted">Freeze Card</span>
          <button
            onClick={() => setCardFrozen(!cardFrozen)}
            className={`w-12 h-7 rounded-full p-1 transition-colors ${
              cardFrozen ? "bg-sv-cyan" : "bg-sv-glass-highlight"
            }`}
          >
            <motion.div
              animate={{ x: cardFrozen ? 20 : 0 }}
              className="w-5 h-5 bg-white rounded-full shadow-md"
            />
          </button>
        </div>

        <div className="bg-sv-glass-bg backdrop-blur-md border border-sv-glass-border rounded-xl p-4 flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sv-violet/10 flex items-center justify-center">
            <Globe size={18} className="text-sv-violet" />
          </div>
          <span className="font-body text-xs text-center text-sv-text-muted">Online Pay</span>
          <button
            onClick={() => setOnlinePayments(!onlinePayments)}
            className={`w-12 h-7 rounded-full p-1 transition-colors ${
              onlinePayments ? "bg-sv-violet" : "bg-sv-glass-highlight"
            }`}
          >
            <motion.div
              animate={{ x: onlinePayments ? 20 : 0 }}
              className="w-5 h-5 bg-white rounded-full shadow-md"
            />
          </button>
        </div>

        <div className="bg-sv-glass-bg backdrop-blur-md border border-sv-glass-border rounded-xl p-4 flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sv-cyan/10 flex items-center justify-center">
            <Smartphone size={18} className="text-sv-cyan" />
          </div>
          <span className="font-body text-xs text-center text-sv-text-muted">Aani Pay</span>
          <button className="font-body px-4 py-1.5 bg-sv-cyan text-sv-navy rounded-full text-xs font-semibold hover:opacity-90 transition-opacity">
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
          <h3 className="font-heading text-lg font-semibold">
            Transaction History
          </h3>
          <button className="font-body text-sv-cyan text-sm font-medium">View All</button>
        </div>
        
        <TransactionList transactions={transactions} />
      </motion.div>
    </div>
  )
}
