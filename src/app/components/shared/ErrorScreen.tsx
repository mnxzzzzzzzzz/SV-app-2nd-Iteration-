"use client"

import { motion } from "motion/react"
import { X } from "lucide-react"

interface ErrorScreenProps {
  title?: string
  message?: string
  onGetNewCode?: () => void
  onContactSupport?: () => void
  primaryButtonText?: string
  secondaryButtonText?: string
}

export function ErrorScreen({
  title = "Code Expired/Used",
  message = "This verification code is no longer valid",
  onGetNewCode,
  onContactSupport,
  primaryButtonText = "Get New Code",
  secondaryButtonText = "Contact Support",
}: ErrorScreenProps) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#080C1F]">
      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-5">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-[60px]"
        >
          <img src="/studentverse-app-icon.svg" alt="StudentVerse" className="w-[200px] h-[200px]" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-10"
        >
          <div
            className="w-[100px] h-[100px] rounded-[50px] flex items-center justify-center bg-[#EF4444]"
            style={{
              boxShadow: "0 0 15px rgba(239, 68, 68, 0.4)",
            }}
          >
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.5 }}>
              <X className="w-[50px] h-[50px] text-white" strokeWidth={3} />
            </motion.div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[32px] font-semibold text-white text-center mb-4"
        >
          {title}
        </motion.h1>

        {/* Error message */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-base text-[#A0A4B8] text-center max-w-sm mb-10"
        >
          {message}
        </motion.p>
      </div>

      <div className="w-full max-w-[400px] mx-auto px-5 pb-5 space-y-4">
        {onGetNewCode && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            onClick={onGetNewCode}
            className="w-full bg-[#2962FF] text-white py-[14px] px-8 rounded-[30px] text-base font-semibold hover:bg-[#1E4FD9] transition-all active:scale-[0.98]"
          >
            {primaryButtonText}
          </motion.button>
        )}

        {onContactSupport && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            onClick={onContactSupport}
            className="w-full bg-transparent border-2 border-[#2962FF] text-[#2962FF] py-[14px] px-8 rounded-[30px] text-base font-semibold hover:bg-[#2962FF]/10 transition-all active:scale-[0.98]"
          >
            {secondaryButtonText}
          </motion.button>
        )}
      </div>
    </div>
  )
}
