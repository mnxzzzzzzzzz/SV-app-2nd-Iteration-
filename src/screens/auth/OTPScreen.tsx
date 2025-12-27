import React, { useState, useRef, useEffect } from "react"
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { Colors, Spacing, FontSize, BorderRadius } from "../../constants/Colors"

interface OTPScreenProps {
  email: string
  onVerify: () => void
  onBack: () => void
}

export default function OTPScreen({ email, onVerify, onBack }: OTPScreenProps) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const inputRefs = useRef<any[]>([])

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    setError("")

    if (value && index < 5) {
      inputRefs.current[index + 1].focus()
    }
  }

  const handleVerify = () => {
    if (otp.some(d => !d)) {
      setError("Please enter the full code")
      return
    }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      onVerify()
    }, 1500)
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Ionicons name="arrow-back" size={24} color={Colors.text.primary} />
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={styles.title}>Verify Email</Text>
          <Text style={styles.subtitle}>Enter the 6-digit code sent to {email}</Text>
        </View>

        <View style={styles.otpContainer}>
          {otp.map((digit, i) => (
            <TextInput
              key={i}
              ref={el => inputRefs.current[i] = el}
              style={[styles.otpInput, error ? styles.inputError : null]}
              keyboardType="number-pad"
              maxLength={1}
              value={digit}
              onChangeText={val => handleOtpChange(val, i)}
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === 'Backspace' && !otp[i] && i > 0) {
                  inputRefs.current[i-1].focus()
                }
              }}
            />
          ))}
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={handleVerify} disabled={loading}>
          {loading ? <ActivityIndicator color={Colors.text.primary} /> : (
            <Text style={styles.buttonText}>Verify</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.resendButton}>
          <Text style={styles.resendText}>Didn't receive code? Resend</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scrollContent: { flexGrow: 1, padding: Spacing.xl },
  backButton: { marginTop: Spacing.md, marginBottom: Spacing.xl },
  header: { marginBottom: Spacing.xxl },
  title: { fontSize: 32, fontWeight: "700", color: Colors.text.primary },
  subtitle: { fontSize: FontSize.md, color: Colors.text.secondary, marginTop: Spacing.sm },
  otpContainer: { flexDirection: "row", justifyContent: "space-between", marginBottom: Spacing.xl },
  otpInput: { width: 45, height: 55, backgroundColor: Colors.surface, borderRadius: BorderRadius.md, borderWidth: 1, borderColor: Colors.border, color: Colors.text.primary, fontSize: 24, textAlign: "center" },
  inputError: { borderColor: Colors.error },
  button: { backgroundColor: Colors.primary, borderRadius: BorderRadius.md, paddingVertical: Spacing.lg, alignItems: "center", marginTop: Spacing.md },
  buttonText: { color: Colors.text.primary, fontSize: FontSize.lg, fontWeight: "700" },
  errorText: { color: Colors.error, fontSize: FontSize.sm, textAlign: "center", marginBottom: Spacing.md },
  resendButton: { alignItems: "center", marginTop: Spacing.xl },
  resendText: { color: Colors.primary, fontWeight: "600" }
})
