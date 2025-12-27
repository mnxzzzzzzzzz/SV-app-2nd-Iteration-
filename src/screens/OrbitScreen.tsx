"use client"

import { useState, useRef, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { Colors, Spacing, FontSize, BorderRadius } from "../constants/Colors"
import type { PlanOption } from "../types"

interface Message {
  id: string
  type: "user" | "ai" | "plans" | "error"
  content: string
  plans?: PlanOption[]
  timestamp: Date
}

const EXAMPLE_PROMPTS = [
  "Coffee shop near campus",
  "Quick lunch under $15",
  "Study spot with WiFi",
  "Dinner with friends",
]

const MOCK_PLANS: PlanOption[] = [
  {
    id: "1",
    title: "Coffee & Study Session",
    description: "Grab a latte at Campus Coffee, then head to the library for a productive study session",
    time: "2 hours",
    budget: "$8-12",
    dietary: ["Vegan options"],
    stops: ["Campus Coffee House", "Main Library"],
  },
  {
    id: "2",
    title: "Quick Campus Café",
    description: "Fast coffee run at the Student Union with a breakfast sandwich",
    time: "30 mins",
    budget: "$6-10",
    dietary: ["Vegetarian"],
    stops: ["Student Union Café"],
  },
  {
    id: "3",
    title: "Premium Coffee Experience",
    description: "Visit the artisan coffee shop downtown with pastry pairing",
    time: "1.5 hours",
    budget: "$12-18",
    dietary: ["Gluten-free options"],
    stops: ["Downtown Roastery", "Artisan Bakery"],
  },
]

export default function OrbitScreen() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content: "Hi! I'm Orbit. Where should we go today?",
      timestamp: new Date(),
    },
  ])
  const [inputText, setInputText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollViewRef = useRef<ScrollView>(null)

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true })
  }, [messages])

  const handleSend = (text?: string) => {
    const messageText = text || inputText.trim()
    if (!messageText) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: messageText,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputText("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      setIsTyping(false)

      // Random error for invalid prompts
      if (Math.random() > 0.8) {
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: "error",
          content: "I couldn't understand that request. Could you rephrase it or try one of the suggested prompts?",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, errorMessage])
        return
      }

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: "Great! I found some perfect options for you:",
        timestamp: new Date(),
      }

      const plansMessage: Message = {
        id: (Date.now() + 2).toString(),
        type: "plans",
        content: "",
        plans: MOCK_PLANS,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiResponse, plansMessage])
    }, 1500)
  }

  const handleStartPlan = (plan: PlanOption) => {
    const message: Message = {
      id: Date.now().toString(),
      type: "user",
      content: `Start: ${plan.title}`,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, message])

    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: `Perfect! I've started your plan "${plan.title}". Let's head to ${plan.stops[0]} first!`,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, response])
    }, 1000)
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.keyboardView} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View style={styles.header}>
          <Text style={styles.title}>Orbit AI</Text>
          <Text style={styles.subtitle}>Your personal campus assistant</Text>
        </View>

        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((message) => (
            <View key={message.id}>
              {message.type === "ai" && (
                <View style={styles.aiMessageContainer}>
                  <View style={styles.aiAvatar}>
                    <Ionicons name="planet" size={20} color={Colors.primary} />
                  </View>
                  <View style={styles.aiMessage}>
                    <Text style={styles.aiMessageText}>{message.content}</Text>
                  </View>
                </View>
              )}

              {message.type === "user" && (
                <View style={styles.userMessageContainer}>
                  <View style={styles.userMessage}>
                    <Text style={styles.userMessageText}>{message.content}</Text>
                  </View>
                </View>
              )}

              {message.type === "error" && (
                <View style={styles.errorMessageContainer}>
                  <View style={styles.errorMessage}>
                    <Ionicons name="alert-circle" size={20} color={Colors.error} />
                    <Text style={styles.errorMessageText}>{message.content}</Text>
                  </View>
                </View>
              )}

              {message.type === "plans" && message.plans && (
                <View style={styles.plansContainer}>
                  {message.plans.map((plan) => (
                    <View key={plan.id} style={styles.planCard}>
                      <Text style={styles.planTitle}>{plan.title}</Text>
                      <Text style={styles.planDescription}>{plan.description}</Text>

                      <View style={styles.planTags}>
                        <View style={styles.tag}>
                          <Ionicons name="time-outline" size={14} color={Colors.text.tertiary} />
                          <Text style={styles.tagText}>{plan.time}</Text>
                        </View>
                        <View style={styles.tag}>
                          <Ionicons name="cash-outline" size={14} color={Colors.text.tertiary} />
                          <Text style={styles.tagText}>{plan.budget}</Text>
                        </View>
                        {plan.dietary.map((diet, idx) => (
                          <View key={idx} style={styles.tag}>
                            <Ionicons name="restaurant-outline" size={14} color={Colors.text.tertiary} />
                            <Text style={styles.tagText}>{diet}</Text>
                          </View>
                        ))}
                      </View>

                      <View style={styles.planStops}>
                        <Text style={styles.stopsLabel}>Stops:</Text>
                        {plan.stops.map((stop, idx) => (
                          <View key={idx} style={styles.stopItem}>
                            <View style={styles.stopDot} />
                            <Text style={styles.stopText}>{stop}</Text>
                          </View>
                        ))}
                      </View>

                      <TouchableOpacity
                        style={styles.startButton}
                        onPress={() => handleStartPlan(plan)}
                        activeOpacity={0.8}
                      >
                        <Text style={styles.startButtonText}>Start Plan</Text>
                        <Ionicons name="arrow-forward" size={18} color={Colors.text.primary} />
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              )}
            </View>
          ))}

          {isTyping && (
            <View style={styles.aiMessageContainer}>
              <View style={styles.aiAvatar}>
                <Ionicons name="planet" size={20} color={Colors.primary} />
              </View>
              <View style={styles.typingIndicator}>
                <View style={styles.typingDot} />
                <View style={styles.typingDot} />
                <View style={styles.typingDot} />
              </View>
            </View>
          )}

          {messages.length === 1 && (
            <View style={styles.examplesContainer}>
              <Text style={styles.examplesLabel}>Try asking:</Text>
              <View style={styles.examplesGrid}>
                {EXAMPLE_PROMPTS.map((prompt, idx) => (
                  <TouchableOpacity
                    key={idx}
                    style={styles.exampleBubble}
                    onPress={() => handleSend(prompt)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.exampleText}>{prompt}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
        </ScrollView>

        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Ask Orbit anything..."
              placeholderTextColor={Colors.text.tertiary}
              value={inputText}
              onChangeText={setInputText}
              multiline
              maxLength={500}
            />
            <TouchableOpacity
              style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
              onPress={() => handleSend()}
              disabled={!inputText.trim()}
              activeOpacity={0.7}
            >
              <Ionicons name="send" size={20} color={inputText.trim() ? Colors.text.primary : Colors.text.tertiary} />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    padding: Spacing.lg,
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
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
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: Spacing.lg,
    gap: Spacing.lg,
  },
  aiMessageContainer: {
    flexDirection: "row",
    gap: Spacing.sm,
    alignItems: "flex-start",
  },
  aiAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: `${Colors.primary}20`,
    justifyContent: "center",
    alignItems: "center",
  },
  aiMessage: {
    flex: 1,
    backgroundColor: Colors.surface,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  aiMessageText: {
    fontSize: FontSize.md,
    color: Colors.text.primary,
    lineHeight: 22,
  },
  userMessageContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  userMessage: {
    backgroundColor: Colors.primary,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    maxWidth: "80%",
  },
  userMessageText: {
    fontSize: FontSize.md,
    color: Colors.text.primary,
    lineHeight: 22,
  },
  errorMessageContainer: {
    flexDirection: "row",
    gap: Spacing.sm,
  },
  errorMessage: {
    flex: 1,
    flexDirection: "row",
    gap: Spacing.sm,
    backgroundColor: `${Colors.error}20`,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: `${Colors.error}40`,
    alignItems: "center",
  },
  errorMessageText: {
    flex: 1,
    fontSize: FontSize.md,
    color: Colors.text.primary,
    lineHeight: 22,
  },
  typingIndicator: {
    flexDirection: "row",
    gap: 6,
    backgroundColor: Colors.surface,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.text.tertiary,
  },
  plansContainer: {
    gap: Spacing.md,
    marginTop: Spacing.sm,
  },
  planCard: {
    backgroundColor: Colors.surface,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: Spacing.md,
  },
  planTitle: {
    fontSize: FontSize.xl,
    fontWeight: "700",
    color: Colors.text.primary,
  },
  planDescription: {
    fontSize: FontSize.md,
    color: Colors.text.secondary,
    lineHeight: 22,
  },
  planTags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.sm,
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: Colors.surfaceLight,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 6,
    borderRadius: BorderRadius.sm,
  },
  tagText: {
    fontSize: FontSize.xs,
    color: Colors.text.secondary,
  },
  planStops: {
    gap: Spacing.xs,
  },
  stopsLabel: {
    fontSize: FontSize.sm,
    fontWeight: "600",
    color: Colors.text.tertiary,
    marginBottom: 4,
  },
  stopItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  stopDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.primary,
  },
  stopText: {
    fontSize: FontSize.md,
    color: Colors.text.secondary,
  },
  startButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    marginTop: Spacing.sm,
  },
  startButtonText: {
    fontSize: FontSize.md,
    fontWeight: "700",
    color: Colors.text.primary,
  },
  examplesContainer: {
    marginTop: Spacing.xl,
  },
  examplesLabel: {
    fontSize: FontSize.sm,
    color: Colors.text.tertiary,
    marginBottom: Spacing.md,
  },
  examplesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.sm,
  },
  exampleBubble: {
    backgroundColor: Colors.surface,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  exampleText: {
    fontSize: FontSize.sm,
    color: Colors.text.secondary,
  },
  inputContainer: {
    padding: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    backgroundColor: Colors.background,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    gap: Spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: FontSize.md,
    color: Colors.text.primary,
    maxHeight: 100,
    paddingVertical: Spacing.sm,
  },
  sendButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary,
    borderRadius: 20,
  },
  sendButtonDisabled: {
    backgroundColor: Colors.surfaceLight,
  },
})
