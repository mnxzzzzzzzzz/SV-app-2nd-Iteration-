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
            className="w-[100px] h-[100px] rounded-[50px] flex items-center justify-center bg-[#10B981]"
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
          className="text-[32px] font-semibold text-white text-center mb-4"
        >
          {title}
        </motion.h1>

        {/* Success message */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-base text-[#A0A4B8] text-center max-w-sm"
        >
          {message}
        </motion.p>
      </div>

      {/* Footer Action */}
      {onDone && (
        <div className="p-6 border-t border-white/10 bg-[#0F1429]">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            onClick={onDone}
            className="w-full bg-[#2962FF] text-white py-[14px] px-8 rounded-[30px] text-base font-semibold hover:bg-[#1E4FD9] transition-all active:scale-[0.98]"
          >
            {buttonText}
          </motion.button>
        </div>
      )}
    </div>
  )
}
