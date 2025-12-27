"use client"

import { useState } from "react"
import { View, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Colors } from "../constants/Colors"
import MerchantListScreen from "../components/qr/MerchantListScreen"
import ActiveQRScreen from "../components/qr/ActiveQRScreen"
import type { Merchant } from "../types"

export type QRFlow = "merchant-list" | "active-qr"

export default function QRScreen() {
  const [currentFlow, setCurrentFlow] = useState<QRFlow>("merchant-list")
  const [selectedMerchant, setSelectedMerchant] = useState<Merchant | null>(null)

  const handleMerchantSelect = (merchant: Merchant) => {
    setSelectedMerchant(merchant)
    setCurrentFlow("active-qr")
  }

  const handleBackToList = () => {
    setCurrentFlow("merchant-list")
    setSelectedMerchant(null)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {currentFlow === "merchant-list" && <MerchantListScreen onMerchantSelect={handleMerchantSelect} />}
        {currentFlow === "active-qr" && selectedMerchant && (
          <ActiveQRScreen merchant={selectedMerchant} onBack={handleBackToList} />
        )}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
  },
})
