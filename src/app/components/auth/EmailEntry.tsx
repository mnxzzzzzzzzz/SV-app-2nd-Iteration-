"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, ArrowRight } from "lucide-react"

interface EmailEntryProps {
  onSubmit: (email: string) => void
}

export function EmailEntry({ onSubmit }: EmailEntryProps) {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address")
      return false
    }

    const eduDomains = /\.(edu|ac\.ae)$/i
    if (!eduDomains.test(email)) {
      setError("Only .edu or .ac.ae email addresses are allowed")
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!validateEmail(email)) {
      return
    }

    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      onSubmit(email)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-sv-navy flex flex-col items-center justify-center px-6 max-w-[480px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center justify-center mx-auto mb-8"
        >
          <img src="/studentverse-app-icon.png" alt="StudentVerse Logo" className="h-20 w-auto" />
        </motion.div>

        {/* Welcome Text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl font-semibold text-sv-text-main mb-2">Welcome</h1>
          <p className="text-sv-text-muted">Enter your student email to continue</p>
        </motion.div>

        {/* Email Form */}
        <motion.form
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sv-text-main text-sm font-medium mb-3">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <Mail className="w-5 h-5 text-sv-text-muted" aria-hidden="true" />
              </div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setError("")
                }}
                placeholder="your.name@university.edu"
                className="w-full bg-sv-glass-bg border border-sv-glass-border rounded-full pl-12 pr-4 py-4 text-sv-text-main placeholder:text-sv-text-muted focus:outline-none focus:border-sv-azure transition-colors backdrop-blur-sm"
                aria-describedby={error ? "email-error" : "email-hint"}
                aria-invalid={error ? "true" : "false"}
              />
            </div>
            <p id="email-hint" className="text-sv-text-muted text-sm mt-2 ml-4">
              Only .edu or .ac.ae email addresses
            </p>
            {error && (
              <motion.p
                id="email-error"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-destructive text-sm mt-2 ml-4"
                role="alert"
              >
                {error}
              </motion.p>
            )}
          </div>

          {/* Send OTP Button */}
          <button
            type="submit"
            disabled={isLoading || !email}
            className="w-full bg-sv-azure text-white py-4 rounded-full font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed min-h-[56px]"
            aria-label="Send OTP to email"
          >
            {isLoading ? (
              <div className="flex gap-2">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full bg-white"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
            ) : (
              <>
                Send OTP
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </>
            )}
          </button>
        </motion.form>

        {/* Footer Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center text-sv-text-muted text-sm mt-8"
        >
          By continuing, you agree to our Terms & Privacy Policy
        </motion.p>
      </motion.div>
    </div>
  )
}
