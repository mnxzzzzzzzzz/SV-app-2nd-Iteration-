"use client"

import { CheckCircle2, XCircle } from "lucide-react"
import { motion } from "motion/react"
import type { RedemptionStatus, Merchant } from "./types"

interface StatusScreenProps {
  status: RedemptionStatus
  merchant: Merchant
  onClose: () => void
}

const STATUS_CONFIG = {
  success: {
    icon: CheckCircle2,
    title: "Applied!",
    subtitle: "Your discount has been successfully redeemed",
    bgColor: "bg-[#10B981]/10",
    borderColor: "border-[#10B981]/30",
    iconColor: "text-[#10B981]",
  },
  expired: {
    icon: XCircle,
    title: "Code Expired",
    subtitle: "The QR code has timed out",
    message: "Please generate a new code to redeem",
    bgColor: "bg-[#EF4444]/10",
    borderColor: "border-[#EF4444]/30",
    iconColor: "text-[#EF4444]",
  },
  "already-used": {
    icon: XCircle,
    title: "Already Used",
    subtitle: "You have already used this discount today",
    message: "Come back tomorrow for another discount",
    bgColor: "bg-[#EF4444]/10",
    borderColor: "border-[#EF4444]/30",
    iconColor: "text-[#EF4444]",
  },
  "wrong-device": {
    icon: XCircle,
    title: "Wrong Device",
    subtitle: "This code was generated on a different device",
    message: "Please use the device you generated the code on",
    bgColor: "bg-[#EF4444]/10",
    borderColor: "border-[#EF4444]/30",
    iconColor: "text-[#EF4444]",
  },
  "cap-hit": {
    icon: XCircle,
    title: "Cap Hit",
    subtitle: "Maximum redemptions reached for today",
    message: "Try again tomorrow or explore other merchants",
    bgColor: "bg-[#EF4444]/10",
    borderColor: "border-[#EF4444]/30",
    iconColor: "text-[#EF4444]",
  },
} as const

export function StatusScreen({ status, merchant, onClose }: StatusScreenProps) {
  const config = STATUS_CONFIG[status]
  const Icon = config.icon
  const isSuccess = status === "success"

  return (
    <div className="flex flex-col min-h-screen bg-[#080C1F]">
      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className={`size-24 rounded-full flex items-center justify-center mb-6 ${config.bgColor} border-4 ${config.borderColor}`}
          style={{ borderRadius: "50px" }}
        >
          <Icon className={`size-12 ${config.iconColor}`} strokeWidth={2.5} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl font-bold mb-3 text-center text-white"
        >
          {config.title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-[#A0A4B8] text-center mb-6"
        >
          {config.subtitle}
        </motion.p>

        {/* Merchant Info */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="w-full max-w-sm mb-6"
        >
          <div
            className={`p-4 rounded-[20px] border-2 flex items-center gap-3 ${config.bgColor} ${config.borderColor}`}
          >
            <div className="size-12 rounded-[12px] overflow-hidden bg-white shrink-0">
              <img
                src={merchant.logo || "/studentverse-symbol.svg"}
                alt={merchant.name}
                className="size-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-white">{merchant.name}</p>
              <div className="flex items-center gap-2 mt-1">
                <span
                  className={`text-xs font-semibold px-2 py-0.5 rounded-[6px] ${
                    isSuccess ? "bg-[#10B981] text-white" : "bg-white/10 text-[#A0A4B8]"
                  }`}
                >
                  {merchant.discount}% OFF
                </span>
                {isSuccess && <span className="text-xs text-[#10B981]">Applied</span>}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Additional Message */}
        {config.message && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={`w-full max-w-sm p-4 rounded-[15px] border ${config.bgColor} ${config.borderColor}`}
          >
            <p className="text-sm text-center text-white">{config.message}</p>
          </motion.div>
        )}

        {!isSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-2 mt-6"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0F1429] border border-white/20 rounded-[10px] text-xs text-white">
              <Icon className="size-3" />
              {config.title}
            </span>
          </motion.div>
        )}
      </div>

      <div className="p-6 border-t border-white/10 space-y-3 bg-[#0F1429]">
        <button
          onClick={onClose}
          className="w-full bg-[#2962FF] text-white py-4 rounded-[15px] font-medium hover:bg-[#1E4FD9] transition-colors"
        >
          {isSuccess ? "Done" : "Get New Code"}
        </button>
        {!isSuccess && (
          <button
            onClick={() => {
              /* Contact support logic */
            }}
            className="w-full bg-transparent border-2 border-white/20 text-white py-4 rounded-[15px] font-medium hover:bg-white/5 transition-colors"
          >
            Contact Support
          </button>
        )}
      </div>
    </div>
  )
}
