"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { MerchantList } from "../qr-redemption/MerchantList"
import { ActiveQR } from "../qr-redemption/ActiveQR"
import { StatusScreen } from "../qr-redemption/StatusScreen"
import type { Merchant, RedemptionStatus } from "../qr-redemption/types"

type Screen = "main" | "merchant-list" | "qr" | "status"

export function QRScreen() {
  const [screen, setScreen] = useState<Screen>("main")
  const [selectedMerchant, setSelectedMerchant] = useState<Merchant | null>(null)
  const [redemptionStatus, setRedemptionStatus] = useState<RedemptionStatus>("active")

  const handleSelectMerchant = (merchant: Merchant) => {
    setSelectedMerchant(merchant)
    setScreen("qr")
  }

  const handleStatusChange = (status: RedemptionStatus) => {
    setRedemptionStatus(status)
    setScreen("status")
  }

  const handleBack = () => {
    if (screen === "qr") {
      setScreen("merchant-list")
    } else {
      setScreen("main")
      setSelectedMerchant(null)
      setRedemptionStatus("active")
    }
  }

  const handleBackToMain = () => {
    setScreen("main")
    setSelectedMerchant(null)
    setRedemptionStatus("active")
  }

  // Render merchant redemption flow
  if (screen === "merchant-list") {
    return (
      <div className="min-h-screen pb-20 bg-[#080C1F]">
        <MerchantList onSelectMerchant={handleSelectMerchant} onBack={handleBackToMain} />
      </div>
    )
  }

  if (screen === "qr" && selectedMerchant) {
    return (
      <div className="min-h-screen pb-20 bg-[#080C1F]">
        <ActiveQR merchant={selectedMerchant} onBack={handleBack} onStatusChange={handleStatusChange} />
      </div>
    )
  }

  if (screen === "status" && selectedMerchant) {
    return (
      <div className="min-h-screen pb-20 bg-[#080C1F]">
        <StatusScreen status={redemptionStatus} merchant={selectedMerchant} onClose={handleBackToMain} />
      </div>
    )
  }

  // Main QR Screen
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] pb-24 px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-white mb-2">Your QR Code</h1>
          <p className="text-[#A0A4B8]">Scan to access your room and services</p>
        </div>

        {/* QR Code Container */}
        <div className="bg-white rounded-[30px] p-8 mb-6">
          <div className="aspect-square bg-gradient-to-br from-[#080C1F] to-[#0F1429] rounded-[20px] flex items-center justify-center">
            {/* Mock QR Code Pattern */}
            <svg viewBox="0 0 200 200" className="w-full h-full p-4">
              <rect x="20" y="20" width="40" height="40" fill="#2962FF" />
              <rect x="140" y="20" width="40" height="40" fill="#2962FF" />
              <rect x="20" y="140" width="40" height="40" fill="#2962FF" />
              <rect x="30" y="30" width="20" height="20" fill="white" />
              <rect x="150" y="30" width="20" height="20" fill="white" />
              <rect x="30" y="150" width="20" height="20" fill="white" />

              {/* Pattern elements */}
              <rect x="80" y="20" width="10" height="10" fill="#2962FF" />
              <rect x="100" y="20" width="10" height="10" fill="#2962FF" />
              <rect x="80" y="40" width="10" height="10" fill="#2962FF" />
              <rect x="110" y="40" width="10" height="10" fill="#2962FF" />

              <rect x="70" y="70" width="10" height="10" fill="#2962FF" />
              <rect x="90" y="70" width="10" height="10" fill="#2962FF" />
              <rect x="110" y="70" width="10" height="10" fill="#2962FF" />
              <rect x="130" y="70" width="10" height="10" fill="#2962FF" />

              <rect x="80" y="90" width="10" height="10" fill="#2962FF" />
              <rect x="100" y="90" width="10" height="10" fill="#2962FF" />
              <rect x="120" y="90" width="10" height="10" fill="#2962FF" />

              <rect x="70" y="110" width="10" height="10" fill="#2962FF" />
              <rect x="90" y="110" width="10" height="10" fill="#2962FF" />
              <rect x="130" y="110" width="10" height="10" fill="#2962FF" />

              <rect x="80" y="130" width="10" height="10" fill="#2962FF" />
              <rect x="110" y="130" width="10" height="10" fill="#2962FF" />

              <rect x="80" y="150" width="10" height="10" fill="#2962FF" />
              <rect x="100" y="150" width="10" height="10" fill="#2962FF" />
              <rect x="140" y="150" width="10" height="10" fill="#2962FF" />
              <rect x="160" y="150" width="10" height="10" fill="#2962FF" />
            </svg>
          </div>
        </div>

        {/* User Info */}
        <div className="bg-[#0F1429] rounded-[20px] p-5 border border-white/10 mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[#A0A4B8] text-sm">Student ID</span>
            <span className="text-white font-medium">STU-2024-1847</span>
          </div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-[#A0A4B8] text-sm">Room</span>
            <span className="text-white font-medium">A-412</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#A0A4B8] text-sm">Valid Until</span>
            <span className="text-[#10B981] font-medium">Dec 2025</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            className="w-full bg-[#2962FF] text-white py-4 rounded-[30px] font-medium hover:bg-[#1E4FD9] transition-colors"
            style={{ borderRadius: "30px" }}
          >
            Share QR Code
          </button>

          <button
            className="w-full bg-[#10B981] text-white py-4 rounded-[30px] font-medium hover:bg-[#059669] transition-colors"
            style={{ borderRadius: "30px" }}
            onClick={() => setScreen("merchant-list")}
          >
            Redeem Student Discounts
          </button>
        </div>
      </motion.div>
    </div>
  )
}
