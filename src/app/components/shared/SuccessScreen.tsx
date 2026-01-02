"use client"

import { motion } from "motion/react"
import { Check } from "lucide-react"

interface SuccessScreenProps {
  title?: string
  message?: string
  onDone?: () => void
  buttonText?: string
}

export function SuccessScreen({
  title = "Applied!",
  message = "Your application has been successfully submitted",
  onDone,
  buttonText = "Done",
}: SuccessScreenProps) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-sv-navy">
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
            className="w-[100px] h-[100px] rounded-full flex items-center justify-center bg-success"
            style={{
              boxShadow: "0 0 15px rgba(16, 185, 129, 0.4)",
            }}
          >
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.5 }}>
              <Check className="w-[50px] h-[50px] text-white" strokeWidth={3} />
            </motion.div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[32px] font-semibold text-sv-text-main text-center mb-4"
        >
          {title}
        </motion.h1>

        {/* Success message */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-base text-sv-text-muted text-center max-w-sm"
        >
          {message}
        </motion.p>
      </div>

      {/* Footer Action */}
      {onDone && (
        <div className="p-6 border-t border-sv-glass-border bg-sv-glass-bg backdrop-blur-md">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            onClick={onDone}
            className="w-full bg-sv-azure text-white py-[14px] px-8 rounded-full text-base font-semibold hover:opacity-90 transition-opacity active:scale-[0.98]"
          >
            {buttonText}
          </motion.button>
        </div>
      )}
    </div>
  )
}
