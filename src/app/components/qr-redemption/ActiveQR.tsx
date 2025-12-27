"use client"

import { useEffect, useState } from "react"
import { ArrowLeft, Info } from "lucide-react"
import { motion } from "motion/react"
import QRCode from "react-qr-code"
import type { Merchant, RedemptionStatus } from "./types"

interface ActiveQRProps {
  merchant: Merchant
  onBack: () => void
  onStatusChange: (status: RedemptionStatus) => void
}

export function ActiveQR({ merchant, onBack, onStatusChange }: ActiveQRProps) {
  const [timeLeft, setTimeLeft] = useState(30)
  const [otp, setOtp] = useState("")

  useEffect(() => {
    // Generate random 6-digit OTP
    setOtp(Math.floor(100000 + Math.random() * 900000).toString())
  }, [])

  useEffect(() => {
    if (timeLeft === 0) {
      onStatusChange("expired")
      return
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1))
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, onStatusChange])

  // Calculate circle progress
  const progress = (timeLeft / 30) * 100
  const circumference = 2 * Math.PI * 90
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-white/10 bg-[#0F1429]">
        <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-lg transition-colors" aria-label="Go back">
          <ArrowLeft className="size-5 text-white" />
        </button>
        <div className="flex-1">
          <h1 className="text-lg font-semibold text-white">{merchant.name}</h1>
          <p className="text-xs text-[#A0A4B8]">{merchant.discount}% discount</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 bg-[#080C1F]">
        {/* Info Alert */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm mb-8 p-3 rounded-[15px] bg-[#2962FF]/10 border border-[#2962FF]/30"
        >
          <div className="flex gap-2 text-sm">
            <Info className="size-4 text-[#2962FF] shrink-0 mt-0.5" />
            <p className="text-white text-sm">Show this QR code to the merchant to redeem your discount</p>
          </div>
        </motion.div>

        {/* QR Code with Timer Ring */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="relative mb-8"
        >
          {/* Animated Timer Ring */}
          <svg className="absolute inset-0 -rotate-90" width="280" height="280">
            {/* Background circle */}
            <circle
              cx="140"
              cy="140"
              r="90"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-white/10"
            />
            {/* Progress circle */}
            <circle
              cx="140"
              cy="140"
              r="90"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className={`transition-all duration-1000 ease-linear ${
                timeLeft > 10 ? "text-[#10B981]" : timeLeft > 5 ? "text-[#F59E0B]" : "text-[#EF4444]"
              }`}
              strokeLinecap="round"
            />
          </svg>

          {/* QR Code */}
          <div className="relative size-[280px] flex items-center justify-center">
            <div className="bg-white p-6 rounded-[20px] shadow-xl">
              <QRCode value={`STUDENT_DISCOUNT:${merchant.id}:${otp}`} size={160} level="M" />
            </div>
          </div>

          {/* Timer Badge */}
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2">
            <motion.div
              animate={timeLeft <= 5 ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 0.5, repeat: timeLeft <= 5 ? Number.POSITIVE_INFINITY : 0 }}
              className={`text-base px-4 py-1.5 font-mono font-bold rounded-[10px] ${
                timeLeft > 10
                  ? "bg-[#10B981] text-white"
                  : timeLeft > 5
                    ? "bg-[#F59E0B] text-white"
                    : "bg-[#EF4444] text-white"
              }`}
            >
              {timeLeft}s
            </motion.div>
          </div>
        </motion.div>

        {/* OTP Code */}
        <div className="w-full max-w-sm mb-6">
          <p className="text-xs text-[#A0A4B8] text-center mb-2">Verification Code</p>
          <div className="bg-[#0F1429] rounded-[15px] p-4 border-2 border-dashed border-white/20">
            <p className="text-3xl font-mono font-bold text-center tracking-widest text-white">{otp}</p>
          </div>
        </div>

        {/* Daily Limit Info */}
        <div className="flex items-center gap-2 text-sm text-[#A0A4B8]">
          <div className="flex items-center gap-1.5">
            <div className="size-2 rounded-full bg-[#10B981]" />
            <span>{merchant.usesPerDay} use available today</span>
          </div>
          <span>•</span>
          <span>Expires {merchant.expiryTime}</span>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-white/10 space-y-2 bg-[#0F1429]">
        <button
          onClick={() => onStatusChange("success")}
          className="w-full bg-[#10B981] text-white py-3 rounded-[15px] font-medium hover:bg-[#059669] transition-colors"
        >
          Simulate Success
        </button>
        <button
          onClick={() => onStatusChange("already-used")}
          className="w-full bg-transparent border border-white/20 text-white py-3 rounded-[15px] font-medium hover:bg-white/10 transition-colors"
        >
          Simulate Failure
        </button>
      </div>
    </div>
  )
}
