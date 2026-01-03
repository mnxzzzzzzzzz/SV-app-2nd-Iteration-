"use client"

import { useState } from "react"
import { motion } from "framer-motion"
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

  if (screen === "merchant-list") {
    return (
      <div className="min-h-screen pb-20 bg-sv-navy">
        <MerchantList onSelectMerchant={handleSelectMerchant} onBack={handleBackToMain} />
      </div>
    )
  }

  if (screen === "qr" && selectedMerchant) {
    return (
      <div className="min-h-screen pb-20 bg-sv-navy">
        <ActiveQR merchant={selectedMerchant} onBack={handleBack} onStatusChange={handleStatusChange} />
      </div>
    )
  }

  if (screen === "status" && selectedMerchant) {
    return (
      <div className="min-h-screen pb-20 bg-sv-navy">
        <StatusScreen status={redemptionStatus} merchant={selectedMerchant} onClose={handleBackToMain} />
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] pb-24 px-6 bg-sv-navy">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-sv-text-main mb-2">Your QR Code</h1>
          <p className="text-sv-text-muted">Scan to access your room and services</p>
        </div>

        {/* QR Code Container */}
        <div className="bg-white rounded-2xl p-8 mb-6">
          <div className="aspect-square bg-gradient-to-br from-sv-navy to-sv-navy/80 rounded-xl flex items-center justify-center">
            <svg viewBox="0 0 200 200" className="w-full h-full p-4">
              <rect x="20" y="20" width="40" height="40" fill="#2962FF" />
              <rect x="140" y="20" width="40" height="40" fill="#2962FF" />
              <rect x="20" y="140" width="40" height="40" fill="#2962FF" />
              <rect x="30" y="30" width="20" height="20" fill="white" />
              <rect x="150" y="30" width="20" height="20" fill="white" />
              <rect x="30" y="150" width="20" height="20" fill="white" />
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
        <div className="bg-sv-glass-bg rounded-xl p-5 border border-sv-glass-border mb-6 backdrop-blur-md">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sv-text-muted text-sm">Student ID</span>
            <span className="text-sv-text-main font-medium">STU-2024-1847</span>
          </div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sv-text-muted text-sm">Room</span>
            <span className="text-sv-text-main font-medium">A-412</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sv-text-muted text-sm">Valid Until</span>
            <span className="text-success font-medium">Dec 2025</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button className="w-full bg-sv-azure text-white py-4 rounded-full font-medium hover:opacity-90 transition-opacity">
            Share QR Code
          </button>

          <button
            className="w-full bg-success text-white py-4 rounded-full font-medium hover:opacity-90 transition-opacity"
            onClick={() => setScreen("merchant-list")}
          >
            Redeem Student Discounts
          </button>
        </div>
      </motion.div>
    </div>
  )
}
