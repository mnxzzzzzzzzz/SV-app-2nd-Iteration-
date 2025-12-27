import type React from "react"
import { View, Text, StyleSheet, type ViewStyle, type TextStyle } from "react-native"
import { Colors, Spacing, FontSize, BorderRadius } from "../../constants/Colors"

interface BadgeProps {
  children: React.ReactNode
  variant?: "default" | "success" | "error" | "warning"
  style?: ViewStyle
  textStyle?: TextStyle
}

export default function Badge({ children, variant = "default", style, textStyle }: BadgeProps) {
  return (
    <View style={[styles.badge, styles[variant], style]}>
      <Text style={[styles.text, textStyle]}>{children}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.sm,
    alignSelf: "flex-start",
  },
  default: {
    backgroundColor: Colors.surfaceLight,
  },
  success: {
    backgroundColor: `${Colors.success}20`,
  },
  error: {
    backgroundColor: `${Colors.error}20`,
  },
  warning: {
    backgroundColor: `${Colors.warning}20`,
  },
  text: {
    fontSize: FontSize.xs,
    fontWeight: "600",
    color: Colors.text.primary,
  },
})
