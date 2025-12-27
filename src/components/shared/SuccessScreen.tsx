"use client"

import { useEffect, useRef } from "react"
import { View, Text, StyleSheet, Animated, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { Colors, Spacing, FontSize, BorderRadius } from "../../constants/Colors"

interface SuccessScreenProps {
  title?: string
  message?: string
  buttonText?: string
  onButtonPress?: () => void
}

export default function SuccessScreen({
  title = "Applied!",
  message = "Your discount has been successfully applied",
  buttonText,
  onButtonPress,
}: SuccessScreenProps) {
  const scaleValue = useRef(new Animated.Value(0)).current
  const glowValue = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.sequence([
      Animated.spring(scaleValue, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowValue, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(glowValue, {
            toValue: 0,
            duration: 1500,
            useNativeDriver: true,
          }),
        ]),
      ),
    ]).start()
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Animated.View
          style={[
            styles.iconContainer,
            {
              transform: [{ scale: scaleValue }],
            },
          ]}
        >
          <View style={[styles.iconCircle, styles.successCircle]}>
            <Ionicons name="checkmark" size={60} color={Colors.text.primary} />
          </View>
          <Animated.View
            style={[
              styles.glowRing,
              styles.successGlow,
              {
                opacity: glowValue,
              },
            ]}
          />
        </Animated.View>

        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>

        {buttonText && onButtonPress && (
          <TouchableOpacity style={styles.button} onPress={onButtonPress} activeOpacity={0.8}>
            <Text style={styles.buttonText}>{buttonText}</Text>
          </TouchableOpacity>
        )}
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
  iconContainer: {
    width: 140,
    height: 140,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.xxl,
    position: "relative",
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  successCircle: {
    backgroundColor: Colors.success,
  },
  glowRing: {
    position: "absolute",
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 2,
  },
  successGlow: {
    borderColor: Colors.success,
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
  button: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    marginTop: Spacing.md,
  },
  buttonText: {
    color: Colors.text.primary,
    fontSize: FontSize.md,
    fontWeight: "600",
  },
})
