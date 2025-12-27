"use client"

import { CheckCircle2, XCircle, Loader2, MapPin, BadgePercent, Shield } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import { useState } from "react"
import type { SVPayMerchant, SVPayStatus, EligibilityCheck } from "./types"

interface SVPayScreenProps {
  merchant: SVPayMerchant
  onBack: () => void
}

export function SVPayScreen({ merchant, onBack }: SVPayScreenProps) {
  const [status, setStatus] = useState<SVPayStatus>("idle")
  const [eligibility, setEligibility] = useState<EligibilityCheck | null>(null)

  const handleCheckEligibility = async () => {
    setStatus("checking")

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Simulate eligibility check (80% success rate)
    const isEligible = Math.random() > 0.2
    const eligibilityData: EligibilityCheck = {
      isEligible,
      reason: isEligible ? undefined : "Already used today",
      usesRemaining: isEligible ? 1 : 0,
    }

    setEligibility(eligibilityData)
    setStatus(isEligible ? "eligible" : "error-ineligible")
  }

  const handleActivateDiscount = async () => {
    setStatus("checking")

    // Simulate activation
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Simulate duplicate check (90% success rate)
    const isDuplicate = Math.random() > 0.9
    setStatus(isDuplicate ? "error-duplicate" : "success")
  }

  const isSuccess = status === "success"
  const isError = status === "error-duplicate" || status === "error-ineligible"
  const isChecking = status === "checking"
  const isEligible = status === "eligible"

  return (
    <div className="flex flex-col min-h-screen bg-[#080C1F]">
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <button
          onClick={onBack}
          className="text-[#A0A4B8] hover:text-white transition-colors mb-4"
          aria-label="Go back"
        >
          ← Back
        </button>
        <h1 className="text-2xl font-semibold text-white">SV Pay</h1>
        <p className="text-[#A0A4B8] text-sm mt-1">Activate your student discount</p>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col p-6">
        <AnimatePresence mode="wait">
          {/* Initial State or Eligible State */}
          {(status === "idle" || isEligible) && (
            <motion.div
              key="initial"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex-1 flex flex-col"
            >
              {/* Merchant Info Card */}
              <div className="bg-[#0F1429] rounded-[25px] p-5 border border-white/10 mb-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="size-16 rounded-[15px] overflow-hidden bg-white shrink-0">
                    <img
                      src={merchant.logo || "/studentverse-symbol.svg"}
                      alt={merchant.name}
                      className="size-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-xl font-semibold text-white mb-1">{merchant.name}</h2>
                    <div className="flex items-center gap-1.5 text-[#A0A4B8] text-sm">
                      <MapPin className="size-3.5" />
                      <span>{merchant.location}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-3 border-t border-white/10">
                  <MapPin className="size-4 text-[#2962FF]" />
                  <span className="text-white text-sm">{merchant.distance} away</span>
                </div>
              </div>

              {/* Discount Display */}
              <div className="bg-gradient-to-br from-[#2962FF] to-[#1E4FD9] rounded-[25px] p-6 mb-6 text-center">
                <div className="inline-flex items-center justify-center size-20 rounded-full bg-white/20 mb-4">
                  <BadgePercent className="size-10 text-white" strokeWidth={2} />
                </div>
                <h3 className="text-4xl font-bold text-white mb-2">{merchant.discount}% OFF</h3>
                <p className="text-white/80">Student Discount</p>
              </div>

              {/* Eligibility Status */}
              {isEligible && eligibility && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-[#10B981]/10 border-2 border-[#10B981]/30 rounded-[20px] p-4 mb-6"
                >
                  <div className="flex items-start gap-3">
                    <div className="size-10 rounded-full bg-[#10B981]/20 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="size-5 text-[#10B981]" strokeWidth={2.5} />
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-semibold mb-1">You're Eligible!</p>
                      <p className="text-[#A0A4B8] text-sm">
                        You can use this discount {eligibility.usesRemaining} more time today
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Action Button */}
              <div className="mt-auto">
                <button
                  onClick={isEligible ? handleActivateDiscount : handleCheckEligibility}
                  disabled={isChecking}
                  className="w-full bg-[#2962FF] text-white py-4 rounded-[20px] font-semibold text-lg hover:bg-[#1E4FD9] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isEligible ? (
                    <>
                      <Shield className="size-5" />
                      Activate Discount
                    </>
                  ) : (
                    "Check Eligibility"
                  )}
                </button>

                <div className="mt-4 flex items-center justify-center gap-1.5 text-[#A0A4B8] text-xs">
                  <Shield className="size-3.5" />
                  <span>Secure student verification</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Checking State */}
          {isChecking && (
            <motion.div
              key="checking"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col items-center justify-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="mb-6"
              >
                <Loader2 className="size-16 text-[#2962FF]" />
              </motion.div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {status === "checking" && eligibility === null ? "Checking eligibility..." : "Activating discount..."}
              </h3>
              <p className="text-[#A0A4B8]">Please wait a moment</p>
            </motion.div>
          )}

          {/* Success State */}
          {isSuccess && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex-1 flex flex-col items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="size-24 rounded-full flex items-center justify-center mb-6 bg-[#10B981]/10 border-4 border-[#10B981]/30"
              >
                <CheckCircle2 className="size-12 text-[#10B981]" strokeWidth={2.5} />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-3xl font-bold mb-2 text-center text-white"
              >
                Applied!
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-[#A0A4B8] text-center mb-8"
              >
                Your {merchant.discount}% discount has been activated
              </motion.p>

              {/* Merchant Info */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="w-full max-w-sm mb-8"
              >
                <div className="p-4 rounded-[20px] border-2 flex items-center gap-3 bg-[#10B981]/10 border-[#10B981]/30">
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
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-[6px] bg-[#10B981] text-white">
                        {merchant.discount}% OFF
                      </span>
                      <span className="text-xs text-[#10B981]">Applied</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                onClick={onBack}
                className="w-full max-w-sm bg-[#2962FF] text-white py-4 rounded-[20px] font-semibold hover:bg-[#1E4FD9] transition-colors"
              >
                Done
              </motion.button>
            </motion.div>
          )}

          {/* Error States */}
          {isError && (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex-1 flex flex-col items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="size-24 rounded-full flex items-center justify-center mb-6 bg-[#EF4444]/10 border-4 border-[#EF4444]/30"
              >
                <XCircle className="size-12 text-[#EF4444]" strokeWidth={2.5} />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-3xl font-bold mb-2 text-center text-white"
              >
                {status === "error-duplicate" ? "Already Used" : "Not Eligible"}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-[#A0A4B8] text-center mb-8"
              >
                {status === "error-duplicate"
                  ? "You have already used this discount today"
                  : "You are not eligible for this discount at this time"}
              </motion.p>

              {/* Error Chips */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap justify-center gap-2 mb-8"
              >
                {status === "error-duplicate" && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#0F1429] border border-white/20 rounded-[12px] text-sm text-white">
                    <XCircle className="size-4" />
                    Already used
                  </span>
                )}
                {status === "error-ineligible" && eligibility?.reason && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#0F1429] border border-white/20 rounded-[12px] text-sm text-white">
                    <XCircle className="size-4" />
                    {eligibility.reason}
                  </span>
                )}
              </motion.div>

              <div className="w-full max-w-sm space-y-3">
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  onClick={onBack}
                  className="w-full bg-[#2962FF] text-white py-4 rounded-[20px] font-semibold hover:bg-[#1E4FD9] transition-colors"
                >
                  Back to Merchants
                </motion.button>
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  onClick={onBack}
                  className="w-full bg-transparent border border-white/20 text-white py-4 rounded-[20px] font-semibold hover:bg-white/10 transition-colors"
                >
                  Try Another Merchant
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
