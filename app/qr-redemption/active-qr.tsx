"use client"

import { useEffect, useState } from "react"
import { ArrowLeft, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
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
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="size-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-lg font-semibold">{merchant.name}</h1>
          <p className="text-xs text-muted-foreground">{merchant.discount}% discount</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        {/* Info Alert */}
        <div className="w-full max-w-sm mb-8 p-3 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900">
          <div className="flex gap-2 text-sm">
            <Info className="size-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
            <p className="text-blue-900 dark:text-blue-100">
              Show this QR code to the merchant to redeem your discount
            </p>
          </div>
        </div>

        {/* QR Code with Timer Ring */}
        <div className="relative mb-8">
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
              className="text-muted/20"
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
              className={cn(
                "transition-all duration-1000 ease-linear",
                timeLeft > 10 ? "text-emerald-500" : "text-amber-500",
                timeLeft <= 5 && "text-red-500",
              )}
              strokeLinecap="round"
            />
          </svg>

          {/* QR Code */}
          <div className="relative size-[280px] flex items-center justify-center">
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <QRCode value={`STUDENT_DISCOUNT:${merchant.id}:${otp}`} size={160} level="M" />
            </div>
          </div>

          {/* Timer Badge */}
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2">
            <Badge
              className={cn(
                "text-base px-4 py-1.5 font-mono font-bold border-2",
                timeLeft > 10 && "bg-emerald-500 border-emerald-600 text-white",
                timeLeft <= 10 && timeLeft > 5 && "bg-amber-500 border-amber-600 text-white",
                timeLeft <= 5 && "bg-red-500 border-red-600 text-white animate-pulse",
              )}
            >
              {timeLeft}s
            </Badge>
          </div>
        </div>

        {/* OTP Code */}
        <div className="w-full max-w-sm mb-6">
          <p className="text-xs text-muted-foreground text-center mb-2">Verification Code</p>
          <div className="bg-secondary/50 rounded-lg p-4 border-2 border-dashed">
            <p className="text-3xl font-mono font-bold text-center tracking-widest">{otp}</p>
          </div>
        </div>

        {/* Daily Limit Info */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <div className="size-2 rounded-full bg-emerald-500" />
            <span>{merchant.usesPerDay} use available today</span>
          </div>
          <span>•</span>
          <span>Expires {merchant.expiryTime}</span>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t space-y-2">
        <Button
          variant="outline"
          className="w-full bg-transparent"
          onClick={() => {
            // Simulate successful redemption
            onStatusChange("success")
          }}
        >
          Simulate Success
        </Button>
        <Button
          variant="outline"
          className="w-full bg-transparent"
          onClick={() => {
            // Simulate failed redemption
            onStatusChange("already-used")
          }}
        >
          Simulate Failure
        </Button>
      </div>
    </div>
  )
}
