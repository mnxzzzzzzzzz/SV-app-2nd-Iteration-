"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Send, Sparkles, AlertCircle } from "lucide-react"
import type { Message, PlanOption, ChatState } from "./types"
import { MessageBubble } from "./MessageBubble"
import { PlanOptionsCard } from "./PlanOptionsCard"
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"

const EXAMPLE_PROMPTS = [
  "Find a quiet place to study",
  "Best lunch spots on campus",
  "Weekend activities under $20",
  "Late night food options",
]

const GREETING_MESSAGE: Message = {
  id: "greeting",
  type: "ai",
  content: "Hi! I'm Orbit. Where should we go today?",
  timestamp: new Date(),
}

export function OrbitAIChat() {
  const [messages, setMessages] = useState<Message[]>([GREETING_MESSAGE])
  const [input, setInput] = useState("")
  const [chatState, setChatState] = useState<ChatState>("idle")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateAIResponse = async (userMessage: string): Promise<Message> => {
    await new Promise((resolve) => setTimeout(resolve, 1500))

    if (userMessage.trim().length < 5) {
      throw new Error("Please provide more details about where you'd like to go or what you'd like to do.")
    }

    const planOptions: PlanOption[] = [
      {
        id: "1",
        title: "Quick Coffee & Study Session",
        description: "Start at the campus café, then head to the library's quiet zone",
        tags: {
          time: "2 hours",
          budget: "$8-12",
          dietary: ["Vegetarian", "Vegan options"],
        },
        highlights: ["Best coffee on campus", "Reserved study rooms available", "Free WiFi & charging stations"],
      },
      {
        id: "2",
        title: "Relaxed Afternoon Plan",
        description: "Grab lunch at the food court, explore the campus bookstore, then study at the lounge",
        tags: {
          time: "3-4 hours",
          budget: "$15-20",
          dietary: ["All dietary options"],
        },
        highlights: ["Multiple food choices", "New book arrivals weekly", "Comfortable seating areas"],
      },
      {
        id: "3",
        title: "Evening Social & Study Mix",
        description: "Dinner with friends at the dining hall, followed by group study at the 24hr lab",
        tags: {
          time: "4-5 hours",
          budget: "$12-18",
          dietary: ["Gluten-free", "Halal"],
        },
        highlights: ["Social dining experience", "Collaborative study spaces", "Open until midnight"],
      },
    ]

    return {
      id: Date.now().toString(),
      type: "options",
      content: "I found some great options for you! Here are my top recommendations:",
      timestamp: new Date(),
      planOptions,
    }
  }

  const handleSendMessage = async () => {
    if (!input.trim() || chatState === "loading") return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setChatState("loading")

    try {
      const aiResponse = await generateAIResponse(input.trim())
      setMessages((prev) => [...prev, aiResponse])
      setChatState("idle")
    } catch (error) {
      const errorMessage: Message = {
        id: Date.now().toString(),
        type: "ai",
        content:
          error instanceof Error
            ? error.message
            : "Sorry, I couldn't process that. Please try again with more details.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
      setChatState("error")
      setTimeout(() => setChatState("idle"), 3000)
    }
  }

  const handleExamplePrompt = (prompt: string) => {
    setInput(prompt)
    textareaRef.current?.focus()
  }

  const handleStartPlan = (planId: string) => {
    console.log("[v0] Starting plan:", planId)
    const confirmMessage: Message = {
      id: Date.now().toString(),
      type: "ai",
      content: "Great choice! Let me help you get started with this plan.",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, confirmMessage])
  }

  return (
    <div className="flex flex-col h-screen pb-24 pt-8 bg-sv-navy">
      {/* Header */}
      <div className="px-6 mb-6 flex-shrink-0">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sv-azure to-sv-violet flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" aria-hidden="true" />
          </div>
          <div>
            <h1 className="font-heading text-2xl font-bold text-sv-text-main">Orbit AI</h1>
            <p className="font-body text-sv-text-muted text-sm">Your campus guide</p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 pb-4">
        <AnimatePresence initial={false}>
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="mb-4"
            >
              {message.type === "options" && message.planOptions ? (
                <>
                  <MessageBubble message={message} />
                  <div className="mt-4 space-y-3">
                    {message.planOptions.map((plan, planIndex) => (
                      <motion.div
                        key={plan.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: planIndex * 0.1 }}
                      >
                        <PlanOptionsCard plan={plan} onStartPlan={handleStartPlan} />
                      </motion.div>
                    ))}
                  </div>
                </>
              ) : (
                <MessageBubble message={message} />
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Loading indicator */}
        {chatState === "loading" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sv-azure to-sv-violet flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" aria-hidden="true" />
            </div>
            <div className="bg-sv-glass-bg rounded-xl px-4 py-3 border border-sv-glass-border backdrop-blur-sm">
              <div className="flex gap-1">
                <motion.div
                  className="w-2 h-2 bg-sv-text-muted rounded-full"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: 0 }}
                />
                <motion.div
                  className="w-2 h-2 bg-sv-text-muted rounded-full"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: 0.2 }}
                />
                <motion.div
                  className="w-2 h-2 bg-sv-text-muted rounded-full"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: 0.4 }}
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Error state */}
        {chatState === "error" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-3 bg-destructive/10 border border-destructive/20 rounded-xl p-4 mb-4"
          >
            <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="text-destructive text-sm font-medium mb-1">Error processing request</p>
              <p className="text-sv-text-muted text-sm">Please try again with a different prompt.</p>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Example Prompts */}
      {messages.length <= 1 && (
        <div className="px-6 mb-4 flex-shrink-0">
          <div className="flex flex-wrap gap-2">
            {EXAMPLE_PROMPTS.map((prompt, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                onClick={() => handleExamplePrompt(prompt)}
                className="bg-sv-glass-bg border border-sv-glass-border rounded-full px-4 py-2 text-sm text-sv-text-muted hover:border-sv-azure/50 hover:text-sv-text-main transition-colors backdrop-blur-sm"
              >
                {prompt}
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="px-6 flex-shrink-0">
        <div className="bg-sv-glass-bg border border-sv-glass-border rounded-xl p-3 flex items-end gap-3 backdrop-blur-md">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSendMessage()
              }
            }}
            placeholder="Ask Orbit anything..."
            className="flex-1 bg-transparent border-none resize-none min-h-[44px] max-h-[120px] text-sv-text-main placeholder:text-sv-text-muted focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
            rows={1}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!input.trim() || chatState === "loading"}
            className="rounded-full w-11 h-11 p-0 bg-sv-azure hover:bg-sv-azure/90 disabled:opacity-50 flex-shrink-0"
            size="icon"
          >
            <Send className="w-5 h-5" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  )
}
