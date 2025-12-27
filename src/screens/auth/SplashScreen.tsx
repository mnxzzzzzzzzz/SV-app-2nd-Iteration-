import React, { useEffect, useRef } from "react"
import { View, Text, StyleSheet, Animated, Dimensions, Image } from "react-native"
import { Colors, Spacing, FontSize } from "../../constants/Colors"

const { width, height } = Dimensions.get("window")

interface SplashScreenProps {
  onComplete: () => void
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current
  const scaleAnim = useRef(new Animated.Value(0.8)).current

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start()

    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start(() => onComplete())
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.content, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
        <View style={styles.logoContainer}>
          <Image 
            source={require("../../../assets/studentverse-logo.svg")} 
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.tagline}>Smarter student living</Text>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    alignItems: "center",
  },
  logoContainer: {
    width: 200,
    height: 200,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 200,
    height: 200,
  },
  tagline: {
    marginTop: Spacing.lg,
    fontSize: FontSize.lg,
    color: Colors.text.secondary,
    fontWeight: "500",
  },
})
