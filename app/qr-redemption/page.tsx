"use client"

import { useState } from "react"
import { MerchantList } from "./merchant-list"
import { ActiveQR } from "./active-qr"
import { StatusScreen } from "./status-screen"
import type { Merchant, RedemptionStatus } from "./types"

type Screen = "list" | "qr" | "status"

export default function QRRedemptionPage() {
  const [screen, setScreen] = useState<Screen>("list")
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
    setScreen("list")
    setSelectedMerchant(null)
    setRedemptionStatus("active")
  }

  return (
    <div className="h-screen max-w-md mx-auto border-x">
      {screen === "list" && <MerchantList onSelectMerchant={handleSelectMerchant} />}

      {screen === "qr" && selectedMerchant && (
        <ActiveQR merchant={selectedMerchant} onBack={handleBack} onStatusChange={handleStatusChange} />
      )}

      {screen === "status" && selectedMerchant && (
        <StatusScreen status={redemptionStatus} merchant={selectedMerchant} onClose={handleBack} />
      )}
    </div>
  )
}
