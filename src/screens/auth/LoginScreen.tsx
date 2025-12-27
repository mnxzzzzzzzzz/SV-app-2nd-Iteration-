import React, { useState } from "react"
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { Colors, Spacing, FontSize, BorderRadius } from "../../constants/Colors"

interface LoginScreenProps {
  onLogin: (email: string) => void
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = () => {
    if (!email) {
      setError("Please enter your email")
      return
    }
    if (!email.endsWith(".edu") && !email.endsWith(".ac.ae")) {
      setError("Please use your university email (.edu or .ac.ae)")
      return
    }
    
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      onLogin(email)
    }, 1500)
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Ionicons name="planet" size={80} color={Colors.primary} />
          <Text style={styles.title}>StudentVerse</Text>
          <Text style={styles.subtitle}>Your university life, simplified.</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>University Email</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="mail-outline" size={20} color={Colors.text.tertiary} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="name@university.edu"
              placeholderTextColor={Colors.text.tertiary}
              value={email}
              onChangeText={(text) => { setEmail(text); setError("") }}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
            {loading ? <ActivityIndicator color={Colors.text.primary} /> : (
              <>
                <Text style={styles.buttonText}>Continue</Text>
                <Ionicons name="arrow-forward" size={20} color={Colors.text.primary} />
              </>
            )}
          </TouchableOpacity>
        </View>

        <Text style={styles.footer}>By continuing, you agree to our Terms and Privacy Policy</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scrollContent: { flexGrow: 1, padding: Spacing.xl, justifyContent: "center" },
  header: { alignItems: "center", marginBottom: Spacing.xxl },
  title: { fontSize: 32, fontWeight: "700", color: Colors.text.primary, marginTop: Spacing.md },
  subtitle: { fontSize: FontSize.md, color: Colors.text.secondary, marginTop: Spacing.xs },
  form: { width: "100%", gap: Spacing.md },
  label: { fontSize: FontSize.sm, fontWeight: "600", color: Colors.text.secondary },
  inputWrapper: { flexDirection: "row", alignItems: "center", backgroundColor: Colors.surface, borderRadius: BorderRadius.md, borderWidth: 1, borderColor: Colors.border, paddingHorizontal: Spacing.md },
  inputIcon: { marginRight: Spacing.sm },
  input: { flex: 1, color: Colors.text.primary, paddingVertical: Spacing.md, fontSize: FontSize.md },
  button: { backgroundColor: Colors.primary, borderRadius: BorderRadius.md, paddingVertical: Spacing.lg, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: Spacing.sm, marginTop: Spacing.md },
  buttonText: { color: Colors.text.primary, fontSize: FontSize.lg, fontWeight: "700" },
  errorText: { color: Colors.error, fontSize: FontSize.sm },
  footer: { textAlign: "center", color: Colors.text.tertiary, fontSize: 12, marginTop: Spacing.xxl }
})
