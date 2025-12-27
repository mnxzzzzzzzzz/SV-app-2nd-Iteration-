"use client"

import { useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { Colors, Spacing, FontSize, BorderRadius } from "../constants/Colors"
import Card from "../components/ui/Card"
import Badge from "../components/ui/Badge"
import SuccessScreen from "../components/shared/SuccessScreen"
import ErrorScreen from "../components/shared/ErrorScreen"

type PayStatus = "idle" | "checking" | "eligible" | "success" | "error"

export default function PayScreen() {
  const [status, setStatus] = useState<PayStatus>("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const merchant = {
    id: "1",
    name: "Campus Coffee House",
    logo: "https://via.placeholder.com/80",
    location: "Student Union Building, Floor 2",
    discount: 20,
  }

  const handleActivate = () => {
    setStatus("checking")

    // Simulate eligibility check
    setTimeout(() => {
      setStatus("eligible")

      // Simulate activation
      setTimeout(() => {
        // Random success/error for demo
        const isSuccess = Math.random() > 0.3

        if (isSuccess) {
          setStatus("success")
        } else {
          setErrorMessage("Already Used Today")
          setStatus("error")
        }
      }, 1500)
    }, 2000)
  }

  const handleReset = () => {
    setStatus("idle")
    setErrorMessage("")
  }

  if (status === "success") {
    return (
      <SuccessScreen
        title="Applied!"
        message={`Your ${merchant.discount}% discount at ${merchant.name} has been successfully applied`}
        buttonText="Done"
        onButtonPress={handleReset}
      />
    )
  }

  if (status === "error") {
    return (
      <ErrorScreen
        title={errorMessage}
        message="You have already used this discount today. Please try again tomorrow."
        primaryButtonText="Go Back"
        secondaryButtonText="Contact Support"
        onPrimaryPress={handleReset}
        onSecondaryPress={() => {}}
      />
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>SV Pay</Text>
          <Text style={styles.subtitle}>Activate your student discounts</Text>
        </View>

        <View style={styles.content}>
          <Card style={styles.merchantCard}>
            <View style={styles.merchantHeader}>
              <Image source={{ uri: merchant.logo }} style={styles.merchantLogo} />
              <View style={styles.merchantInfo}>
                <Text style={styles.merchantName}>{merchant.name}</Text>
                <View style={styles.locationRow}>
                  <Ionicons name="location" size={16} color={Colors.text.tertiary} />
                  <Text style={styles.merchantLocation}>{merchant.location}</Text>
                </View>
              </View>
            </View>
          </Card>

          <Card style={styles.eligibilityCard}>
            <View style={styles.eligibilityHeader}>
              <Text style={styles.eligibilityTitle}>Eligibility Status</Text>
              {status === "checking" && <ActivityIndicator size="small" color={Colors.primary} />}
              {status === "eligible" && (
                <View style={styles.statusBadge}>
                  <Ionicons name="checkmark-circle" size={20} color={Colors.success} />
                  <Text style={styles.eligibleText}>Eligible</Text>
                </View>
              )}
              {status === "idle" && (
                <Badge variant="default">
                  <Text style={styles.badgeText}>Not Checked</Text>
                </Badge>
              )}
            </View>

            {status === "checking" && (
              <View style={styles.checkingContainer}>
                <Text style={styles.checkingText}>Verifying your student status...</Text>
              </View>
            )}

            {(status === "idle" || status === "eligible") && (
              <View style={styles.eligibilityDetails}>
                <View style={styles.detailRow}>
                  <Ionicons name="school-outline" size={20} color={Colors.text.tertiary} />
                  <Text style={styles.detailText}>Student Status: Verified</Text>
                </View>
                <View style={styles.detailRow}>
                  <Ionicons name="card-outline" size={20} color={Colors.text.tertiary} />
                  <Text style={styles.detailText}>Payment Method: StudentVerse Account</Text>
                </View>
                <View style={styles.detailRow}>
                  <Ionicons name="time-outline" size={20} color={Colors.text.tertiary} />
                  <Text style={styles.detailText}>Daily Limit: 1 use remaining</Text>
                </View>
              </View>
            )}
          </Card>

          <Card style={styles.discountCard}>
            <View style={styles.discountHeader}>
              <Text style={styles.discountLabel}>Your Discount</Text>
              <Badge variant="success">
                <Text style={[styles.badgeText, { color: Colors.success }]}>Active</Text>
              </Badge>
            </View>
            <Text style={styles.discountAmount}>{merchant.discount}%</Text>
            <Text style={styles.discountDescription}>Student discount applied at checkout</Text>
          </Card>

          {status === "eligible" && (
            <View style={styles.readyContainer}>
              <Ionicons name="checkmark-circle" size={24} color={Colors.success} />
              <Text style={styles.readyText}>Ready to activate your discount</Text>
            </View>
          )}

          <TouchableOpacity
            style={[
              styles.activateButton,
              (status === "checking" || status === "eligible") && styles.activateButtonDisabled,
            ]}
            onPress={handleActivate}
            disabled={status === "checking" || status === "eligible"}
            activeOpacity={0.8}
          >
            {status === "checking" ? (
              <ActivityIndicator size="small" color={Colors.text.primary} />
            ) : (
              <>
                <Text style={styles.activateButtonText}>
                  {status === "eligible" ? "Activating..." : "Activate Discount"}
                </Text>
                {status === "idle" && <Ionicons name="arrow-forward" size={20} color={Colors.text.primary} />}
              </>
            )}
          </TouchableOpacity>

          <View style={styles.infoBox}>
            <Ionicons name="information-circle-outline" size={20} color={Colors.primary} />
            <Text style={styles.infoText}>
              This discount can be used once per day. Show your activated code to the merchant to receive your discount.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  title: {
    fontSize: FontSize.xxxl,
    fontWeight: "700",
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: FontSize.md,
    color: Colors.text.secondary,
  },
  content: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
    gap: Spacing.lg,
  },
  merchantCard: {
    padding: Spacing.lg,
  },
  merchantHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  merchantLogo: {
    width: 80,
    height: 80,
    borderRadius: BorderRadius.md,
    marginRight: Spacing.md,
    backgroundColor: Colors.surfaceLight,
  },
  merchantInfo: {
    flex: 1,
  },
  merchantName: {
    fontSize: FontSize.xl,
    fontWeight: "700",
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  merchantLocation: {
    fontSize: FontSize.sm,
    color: Colors.text.secondary,
    flex: 1,
  },
  eligibilityCard: {
    padding: Spacing.lg,
  },
  eligibilityHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  eligibilityTitle: {
    fontSize: FontSize.lg,
    fontWeight: "600",
    color: Colors.text.primary,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  eligibleText: {
    fontSize: FontSize.sm,
    fontWeight: "600",
    color: Colors.success,
  },
  badgeText: {
    fontSize: FontSize.xs,
    fontWeight: "600",
  },
  checkingContainer: {
    paddingVertical: Spacing.md,
  },
  checkingText: {
    fontSize: FontSize.md,
    color: Colors.text.secondary,
    textAlign: "center",
  },
  eligibilityDetails: {
    gap: Spacing.md,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  detailText: {
    fontSize: FontSize.md,
    color: Colors.text.secondary,
  },
  discountCard: {
    padding: Spacing.lg,
    alignItems: "center",
  },
  discountHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: Spacing.md,
  },
  discountLabel: {
    fontSize: FontSize.md,
    color: Colors.text.tertiary,
  },
  discountAmount: {
    fontSize: 64,
    fontWeight: "700",
    color: Colors.primary,
    marginBottom: Spacing.sm,
  },
  discountDescription: {
    fontSize: FontSize.md,
    color: Colors.text.secondary,
  },
  readyContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
    padding: Spacing.md,
    backgroundColor: `${Colors.success}20`,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: `${Colors.success}40`,
  },
  readyText: {
    fontSize: FontSize.md,
    fontWeight: "600",
    color: Colors.success,
  },
  activateButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.lg,
    borderRadius: BorderRadius.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
  },
  activateButtonDisabled: {
    opacity: 0.6,
  },
  activateButtonText: {
    fontSize: FontSize.lg,
    fontWeight: "700",
    color: Colors.text.primary,
  },
  infoBox: {
    flexDirection: "row",
    gap: Spacing.sm,
    padding: Spacing.md,
    backgroundColor: `${Colors.primary}15`,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: `${Colors.primary}30`,
  },
  infoText: {
    flex: 1,
    fontSize: FontSize.sm,
    color: Colors.text.secondary,
    lineHeight: 20,
  },
})
