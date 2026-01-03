"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, ArrowRight, Lock } from "lucide-react"

interface EmailEntryProps {
  onSubmit: (email: string) => void
}

export function EmailEntry({ onSubmit }: EmailEntryProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
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

  const validatePassword = (password: string): boolean => {
    if (password.length < 8) {
      setError("Password must be at least 8 characters")
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

    if (!validatePassword(password)) {
      return
    }

    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      onSubmit(email)
    }, 1000)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 max-w-[480px] mx-auto" style={{ background: 'linear-gradient(to bottom, #0A0F1E 0%, #1a1030 30%, #3d1515 60%, #5c2a1a 80%, #8B4513 100%)' }}>
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
          <img src="/studentverse-app-icon.png" alt="StudentVerse Logo" className="h-28 w-auto" />
        </motion.div>

        {/* Welcome Text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl font-semibold text-sv-text-main mb-2">Create Account</h1>
          <p className="text-sv-text-muted">Sign up with your student email</p>
        </motion.div>

        {/* Glass Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="rounded-2xl p-6 border border-white/10"
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
          }}
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sv-text-main text-sm font-medium mb-2">
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
                  className="w-full border border-white/10 rounded-xl pl-12 pr-4 py-4 text-sv-text-main placeholder:text-sv-text-muted focus:outline-none focus:border-sv-azure transition-colors"
                  style={{ background: 'rgba(255, 255, 255, 0.05)' }}
                  aria-describedby={error ? "email-error" : "email-hint"}
                  aria-invalid={error ? "true" : "false"}
                />
              </div>
              <p id="email-hint" className="text-sv-text-muted text-xs mt-2">
                Only .edu or .ac.ae email addresses
              </p>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sv-text-main text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <Lock className="w-5 h-5 text-sv-text-muted" aria-hidden="true" />
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    setError("")
                  }}
                  placeholder="Enter your password"
                  className="w-full border border-white/10 rounded-xl pl-12 pr-4 py-4 text-sv-text-main placeholder:text-sv-text-muted focus:outline-none focus:border-sv-azure transition-colors"
                  style={{ background: 'rgba(255, 255, 255, 0.05)' }}
                />
              </div>
              <p className="text-sv-text-muted text-xs mt-2">
                Minimum 8 characters
              </p>
            </div>

            {error && (
              <motion.p
                id="email-error"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-destructive text-sm"
                role="alert"
              >
                {error}
              </motion.p>
            )}

            {/* Sign Up Button */}
            <button
              type="submit"
              disabled={isLoading || !email || !password}
              className="w-full text-white py-4 rounded-xl font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed min-h-[56px] mt-2"
              style={{ background: 'linear-gradient(to right, #8B4513, #c44d2c, #e65c00)' }}
              aria-label="Sign up"
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
                  Sign Up
                  <ArrowRight className="w-5 h-5" aria-hidden="true" />
                </>
              )}
            </button>
          </form>
        </motion.div>
      </motion.div>
    </div>
  )
}
