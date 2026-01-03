"use client"

import { motion } from "framer-motion"

interface LoadingScreenProps {
  title?: string
  subtitle?: string
}

export function LoadingScreen({
  title = "Processing…",
  subtitle = "Please wait while we verify your information",
}: LoadingScreenProps) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-sv-navy p-5">
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
            className="w-20 h-20 rounded-full border-4 border-sv-azure/10 border-t-sv-azure"
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[32px] font-semibold text-sv-text-main text-center mb-4"
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-base text-sv-text-muted text-center"
        >
          {subtitle}
        </motion.p>
      </motion.div>
    </div>
  )
}
