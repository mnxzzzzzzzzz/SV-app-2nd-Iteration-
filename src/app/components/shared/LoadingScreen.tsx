"use client"

import { motion } from "motion/react"

interface LoadingScreenProps {
  title?: string
  subtitle?: string
}

export function LoadingScreen({
  title = "Processing…",
  subtitle = "Please wait while we verify your information",
}: LoadingScreenProps) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#080C1F] p-5">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center"
      >
        <div className="mb-[60px]">
          <img src="/studentverse-app-icon.svg" alt="StudentVerse" className="w-[200px] h-[200px]" />
        </div>

        <motion.div
          className="relative mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="w-20 h-20 rounded-full border-4"
            style={{
              borderColor: "rgba(41, 98, 255, 0.1)",
              borderTopColor: "#2962FF",
            }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[32px] font-semibold text-[#2962FF] text-center mb-4"
        >
          {title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-base text-[#A0A4B8] text-center"
        >
          {subtitle}
        </motion.p>
      </motion.div>
    </div>
  )
}
