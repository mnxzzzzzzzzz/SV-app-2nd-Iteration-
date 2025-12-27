"use client"

import { useEffect, useRef } from "react"
import { View, Text, StyleSheet, Animated, Easing } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { Colors, Spacing, FontSize } from "../../constants/Colors"

interface LoadingScreenProps {
  title?: string
  subtitle?: string
}

export default function LoadingScreen({
  title = "Processing…",
  subtitle = "Please wait while we verify your information",
}: LoadingScreenProps) {
  const spinValue = useRef(new Animated.Value(0)).current
  const pulseValue = useRef(new Animated.Value(1)).current

  useEffect(() => {
    Animated.parallel([
      Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ),
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseValue, {
            toValue: 1.1,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulseValue, {
            toValue: 1,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
      ),
    ]).start()
  }, [])

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  })

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Animated.View style={[styles.logoContainer, { transform: [{ scale: pulseValue }] }]}>
          <Ionicons name="planet" size={100} color={Colors.primary} />
          <Animated.View
            style={[
              styles.spinnerRing,
              {
                transform: [{ rotate: spin }],
              },
            ]}
          />
        </Animated.View>

        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
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
  },
  logoContainer: {
    width: 200,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.xxl,
    position: "relative",
  },
  spinnerRing: {
    position: "absolute",
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 4,
    borderColor: "transparent",
    borderTopColor: Colors.primary,
    borderRightColor: Colors.primary,
  },
  title: {
    fontSize: FontSize.xxl,
    fontWeight: "700",
    color: Colors.text.primary,
    marginBottom: Spacing.sm,
    textAlign: "center",
  },
  subtitle: {
    fontSize: FontSize.md,
    color: Colors.text.secondary,
    textAlign: "center",
    lineHeight: 24,
  },
})
