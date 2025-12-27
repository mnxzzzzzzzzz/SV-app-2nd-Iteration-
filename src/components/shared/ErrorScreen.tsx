"use client"

import { useEffect, useRef } from "react"
import { View, Text, StyleSheet, Animated, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { Colors, Spacing, FontSize, BorderRadius } from "../../constants/Colors"

interface ErrorScreenProps {
  title?: string
  message?: string
  primaryButtonText?: string
  secondaryButtonText?: string
  onPrimaryPress?: () => void
  onSecondaryPress?: () => void
}

export default function ErrorScreen({
  title = "Code Expired",
  message = "This QR code has expired. Please generate a new one to continue.",
  primaryButtonText = "Get New Code",
  secondaryButtonText = "Contact Support",
  onPrimaryPress,
  onSecondaryPress,
}: ErrorScreenProps) {
  const scaleValue = useRef(new Animated.Value(0)).current
  const shakeValue = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.sequence([
      Animated.spring(scaleValue, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.sequence([
        Animated.timing(shakeValue, {
          toValue: -10,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(shakeValue, {
          toValue: 10,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(shakeValue, {
          toValue: -10,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(shakeValue, {
          toValue: 0,
          duration: 50,
          useNativeDriver: true,
        }),
      ]),
    ]).start()
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Animated.View
          style={[
            styles.iconContainer,
            {
              transform: [{ scale: scaleValue }, { translateX: shakeValue }],
            },
          ]}
        >
          <View style={[styles.iconCircle, styles.errorCircle]}>
            <Ionicons name="close" size={60} color={Colors.text.primary} />
          </View>
        </Animated.View>

        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>

        <View style={styles.buttonContainer}>
          {onPrimaryPress && (
            <TouchableOpacity style={styles.primaryButton} onPress={onPrimaryPress} activeOpacity={0.8}>
              <Text style={styles.primaryButtonText}>{primaryButtonText}</Text>
            </TouchableOpacity>
          )}

          {onSecondaryPress && (
            <TouchableOpacity style={styles.secondaryButton} onPress={onSecondaryPress} activeOpacity={0.8}>
              <Text style={styles.secondaryButtonText}>{secondaryButtonText}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
    paddingHorizontal: Spacing.xl,
    width: "100%",
  },
  iconContainer: {
    width: 140,
    height: 140,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.xxl,
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  errorCircle: {
    backgroundColor: Colors.error,
  },
  title: {
    fontSize: FontSize.xxxl,
    fontWeight: "700",
    color: Colors.text.primary,
    marginBottom: Spacing.md,
    textAlign: "center",
  },
  message: {
    fontSize: FontSize.md,
    color: Colors.text.secondary,
    textAlign: "center",
    lineHeight: 24,
    marginBottom: Spacing.xl,
  },
  buttonContainer: {
    width: "100%",
    gap: Spacing.md,
    marginTop: Spacing.md,
  },
  primaryButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: "center",
  },
  primaryButtonText: {
    color: Colors.text.primary,
    fontSize: FontSize.md,
    fontWeight: "600",
  },
  secondaryButton: {
    backgroundColor: "transparent",
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: Colors.text.primary,
    fontSize: FontSize.md,
    fontWeight: "600",
  },
})
