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

  const progress = (timeLeft / 30) * 100
  const circumference = 2 * Math.PI * 90
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-sv-glass-border bg-sv-glass-bg backdrop-blur-md">
        <button onClick={onBack} className="p-2 hover:bg-sv-glass-highlight rounded-xl transition-colors" aria-label="Go back">
          <ArrowLeft className="size-5 text-sv-text-main" />
        </button>
        <div className="flex-1">
          <h1 className="text-lg font-semibold text-sv-text-main">{merchant.name}</h1>
          <p className="text-xs text-sv-text-muted">{merchant.discount}% discount</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 bg-sv-navy">
        {/* Info Alert */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm mb-8 p-3 rounded-xl bg-sv-azure/10 border border-sv-azure/30"
        >
          <div className="flex gap-2 text-sm">
            <Info className="size-4 text-sv-azure shrink-0 mt-0.5" />
            <p className="text-sv-text-main text-sm">Show this QR code to the merchant to redeem your discount</p>
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
            <circle
              cx="140"
              cy="140"
              r="90"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-sv-glass-border"
            />
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
                timeLeft > 10 ? "text-success" : timeLeft > 5 ? "text-sv-gold" : "text-destructive"
              }`}
              strokeLinecap="round"
            />
          </svg>

          {/* QR Code */}
          <div className="relative size-[280px] flex items-center justify-center">
            <div className="bg-white p-6 rounded-xl shadow-xl">
              <QRCode value={`STUDENT_DISCOUNT:${merchant.id}:${otp}`} size={160} level="M" />
            </div>
          </div>

          {/* Timer Badge */}
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2">
            <motion.div
              animate={timeLeft <= 5 ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 0.5, repeat: timeLeft <= 5 ? Number.POSITIVE_INFINITY : 0 }}
              className={`text-base px-4 py-1.5 font-mono font-bold rounded-lg ${
                timeLeft > 10
                  ? "bg-success text-white"
                  : timeLeft > 5
                    ? "bg-sv-gold text-sv-navy"
                    : "bg-destructive text-white"
              }`}
            >
              {timeLeft}s
            </motion.div>
          </div>
        </motion.div>

        {/* OTP Code */}
        <div className="w-full max-w-sm mb-6">
          <p className="text-xs text-sv-text-muted text-center mb-2">Verification Code</p>
          <div className="bg-sv-glass-bg rounded-xl p-4 border-2 border-dashed border-sv-glass-border backdrop-blur-sm">
            <p className="text-3xl font-mono font-bold text-center tracking-widest text-sv-text-main">{otp}</p>
          </div>
        </div>

        {/* Daily Limit Info */}
        <div className="flex items-center gap-2 text-sm text-sv-text-muted">
          <div className="flex items-center gap-1.5">
            <div className="size-2 rounded-full bg-success" />
            <span>{merchant.usesPerDay} use available today</span>
          </div>
          <span>•</span>
          <span>Expires {merchant.expiryTime}</span>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-sv-glass-border space-y-2 bg-sv-glass-bg backdrop-blur-md">
        <button
          onClick={() => onStatusChange("success")}
          className="w-full bg-success text-white py-3 rounded-xl font-medium hover:opacity-90 transition-opacity"
        >
          Simulate Success
        </button>
        <button
          onClick={() => onStatusChange("already-used")}
          className="w-full bg-transparent border border-sv-glass-border text-sv-text-main py-3 rounded-xl font-medium hover:bg-sv-glass-highlight transition-colors"
        >
          Simulate Failure
        </button>
      </div>
    </div>
  )
}
