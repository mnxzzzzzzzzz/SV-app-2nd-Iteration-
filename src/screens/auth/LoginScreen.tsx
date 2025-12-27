import React, { useState } from "react"
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView } from "react-native"
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
          <View style={styles.logoContainer}>
            <Ionicons name="planet" size={60} color={Colors.primary} />
            <Text style={styles.logoMiniText}>SV</Text>
          </View>
          <Text style={styles.welcomeText}>Welcome to</Text>
          <Text style={styles.title}>StudentVerse</Text>
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
          <Text style={styles.validationText}>(.edu/.ac.ae only)</Text>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
            {loading ? <ActivityIndicator color={Colors.text.primary} /> : (
              <Text style={styles.buttonText}>Send OTP</Text>
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.helpLink}>
          <Text style={styles.helpText}>Need help?</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scrollContent: { flexGrow: 1, padding: Spacing.xl, justifyContent: "space-between", paddingBottom: Spacing.xxl },
  header: { alignItems: "center", marginTop: Spacing.xxl },
  logoContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.md },
  logoMiniText: { color: Colors.text.primary, fontSize: 24, fontWeight: '900', marginLeft: -15 },
  welcomeText: { fontSize: FontSize.lg, color: Colors.text.secondary },
  title: { fontSize: 32, fontWeight: "700", color: Colors.text.primary, marginBottom: Spacing.md },
  form: { width: "100%", gap: Spacing.md },
  label: { fontSize: FontSize.sm, fontWeight: "600", color: Colors.text.secondary },
  inputWrapper: { flexDirection: "row", alignItems: "center", backgroundColor: Colors.surface, borderRadius: BorderRadius.md, borderWidth: 1, borderColor: Colors.border, paddingHorizontal: Spacing.md },
  inputIcon: { marginRight: Spacing.sm },
  input: { flex: 1, color: Colors.text.primary, paddingVertical: Spacing.md, fontSize: FontSize.md },
  validationText: { fontSize: 12, color: Colors.text.tertiary, marginLeft: 4 },
  button: { backgroundColor: Colors.primary, borderRadius: BorderRadius.md, paddingVertical: Spacing.lg, alignItems: "center", justifyContent: "center", marginTop: Spacing.md },
  buttonText: { color: Colors.text.primary, fontSize: FontSize.lg, fontWeight: "700" },
  errorText: { color: Colors.error, fontSize: FontSize.sm },
  helpLink: { alignItems: 'center' },
  helpText: { color: Colors.text.tertiary, fontSize: FontSize.sm }
})
