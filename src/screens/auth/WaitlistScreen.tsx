import React, { useEffect } from "react"
import { View, Text, StyleSheet, Image, ActivityIndicator } from "react-native"
import { Colors, Spacing, FontSize } from "../../constants/Colors"

interface WaitlistScreenProps {
  onComplete: () => void
}

export default function WaitlistScreen({ onComplete }: WaitlistScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete()
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image 
          source={require("../../../assets/studentverse-logo.png")} 
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>You're on the list!</Text>
        <Text style={styles.subtitle}>
          We're onboarding students in waves. You'll get a notification as soon as your spot is ready.
        </Text>
        
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loaderText}>Redirecting to dashboard...</Text>
        </View>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>StudentVerse Beta v1.0</Text>
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
    padding: Spacing.xl,
  },
  content: {
    alignItems: "center",
    width: "100%",
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: Spacing.xxl,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.text.primary,
    textAlign: "center",
    marginBottom: Spacing.md,
  },
  subtitle: {
    fontSize: FontSize.md,
    color: Colors.text.secondary,
    textAlign: "center",
    lineHeight: 24,
    marginBottom: Spacing.xxl,
  },
  loaderContainer: {
    alignItems: "center",
    marginTop: Spacing.xl,
  },
  loaderText: {
    color: Colors.text.tertiary,
    marginTop: Spacing.md,
    fontSize: FontSize.sm,
  },
  footer: {
    position: "absolute",
    bottom: Spacing.xxl,
  },
  footerText: {
    color: Colors.text.tertiary,
    fontSize: FontSize.xs,
  },
})
