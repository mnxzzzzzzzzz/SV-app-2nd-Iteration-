"use client"

import { useState, useEffect, useRef } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Animated } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import QRCode from "react-native-qrcode-svg"
import { Colors, Spacing, FontSize, BorderRadius } from "../../constants/Colors"
import SuccessScreen from "../shared/SuccessScreen"
import ErrorScreen from "../shared/ErrorScreen"
import type { Merchant } from "../../types"

interface ActiveQRScreenProps {
  merchant: Merchant
  onBack: () => void
}

export default function ActiveQRScreen({ merchant, onBack }: ActiveQRScreenProps) {
  const [timeLeft, setTimeLeft] = useState(30)
  const [status, setStatus] = useState<"active" | "success" | "error">("active")
  const [errorReason, setErrorReason] = useState<string>("")
  const rotateValue = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (status !== "active") return

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          setErrorReason("Code Expired")
          setStatus("error")
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [status])

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateValue, {
        toValue: 1,
        duration: 30000,
        useNativeDriver: true,
      }),
    ).start()
  }, [])

  const rotate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  })

  const progress = (timeLeft / 30) * 100

  // Simulate success after 5 seconds for demo
  useEffect(() => {
    if (status === "active") {
      const successTimeout = setTimeout(() => {
        setStatus("success")
      }, 5000)
      return () => clearTimeout(successTimeout)
    }
  }, [status])

  if (status === "success") {
    return (
      <SuccessScreen
        title="Applied!"
        message={`Your ${merchant.discount}% discount at ${merchant.name} has been successfully applied`}
        buttonText="Done"
        onButtonPress={onBack}
      />
    )
  }

  if (status === "error") {
    return (
      <ErrorScreen
        title={errorReason}
        message="This QR code has expired. Please generate a new one to continue."
        primaryButtonText="Get New Code"
        secondaryButtonText="Contact Support"
        onPrimaryPress={() => setStatus("active")}
        onSecondaryPress={() => {}}
      />
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{merchant.name}</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.content}>
        <View style={styles.merchantInfo}>
          <Text style={styles.merchantName}>{merchant.name}</Text>
          <Text style={styles.discountAmount}>{merchant.discount}% OFF</Text>
          <Text style={styles.merchantLocation}>{merchant.location}</Text>
        </View>

        <View style={styles.qrContainer}>
          <View style={styles.qrWrapper}>
            <QRCode
              value={`SV-${merchant.id}-${Date.now()}`}
              size={220}
              backgroundColor="white"
              color={Colors.background}
            />
          </View>

          <Animated.View
            style={[
              styles.timerRing,
              {
                transform: [{ rotate }],
                borderTopColor: progress > 30 ? Colors.primary : Colors.error,
                borderRightColor: progress > 30 ? Colors.primary : Colors.error,
              },
            ]}
          />

          <View style={styles.timerContainer}>
            <Text style={styles.timerText}>{timeLeft}s</Text>
          </View>
        </View>

        <View style={styles.otpContainer}>
          <Text style={styles.otpLabel}>Verification Code</Text>
          <Text style={styles.otpCode}>
            {Math.floor(100000 + Math.random() * 900000)
              .toString()
              .match(/.{1,3}/g)
              ?.join(" ")}
          </Text>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Ionicons name="time-outline" size={20} color={Colors.text.tertiary} />
            <Text style={styles.infoText}>Code expires in {timeLeft} seconds</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="information-circle-outline" size={20} color={Colors.text.tertiary} />
            <Text style={styles.infoText}>Daily limit: {merchant.usesPerDay} use remaining</Text>
          </View>
        </View>

        <View style={styles.instructionContainer}>
          <Text style={styles.instructionText}>Show this QR code to the merchant to apply your discount</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: FontSize.lg,
    fontWeight: "600",
    color: Colors.text.primary,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
  },
  merchantInfo: {
    alignItems: "center",
    marginBottom: Spacing.xxl,
  },
  merchantName: {
    fontSize: FontSize.xxl,
    fontWeight: "700",
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  discountAmount: {
    fontSize: FontSize.xxxl,
    fontWeight: "700",
    color: Colors.primary,
    marginBottom: Spacing.xs,
  },
  merchantLocation: {
    fontSize: FontSize.md,
    color: Colors.text.secondary,
  },
  qrContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.xl,
    position: "relative",
  },
  qrWrapper: {
    backgroundColor: "white",
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
  },
  timerRing: {
    position: "absolute",
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 4,
    borderColor: "transparent",
  },
  timerContainer: {
    position: "absolute",
    bottom: -40,
    backgroundColor: Colors.surface,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  timerText: {
    fontSize: FontSize.xl,
    fontWeight: "700",
    color: Colors.text.primary,
  },
  otpContainer: {
    alignItems: "center",
    marginTop: Spacing.xl,
    marginBottom: Spacing.xl,
  },
  otpLabel: {
    fontSize: FontSize.sm,
    color: Colors.text.tertiary,
    marginBottom: Spacing.xs,
  },
  otpCode: {
    fontSize: FontSize.xxxl,
    fontWeight: "700",
    color: Colors.text.primary,
    letterSpacing: 4,
  },
  infoContainer: {
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  infoText: {
    fontSize: FontSize.md,
    color: Colors.text.secondary,
  },
  instructionContainer: {
    backgroundColor: Colors.surface,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  instructionText: {
    fontSize: FontSize.md,
    color: Colors.text.secondary,
    textAlign: "center",
  },
})
