"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setIsLoading(false), 500)
          return 100
        }
        return prev + Math.random() * 15 + 5
      })
    }, 150)

    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#fafdf7]"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.05,
            filter: "blur(12px)",
          }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Subtle animated background particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${3 + Math.random() * 4}px`,
                  height: `${3 + Math.random() * 4}px`,
                  background: i % 2 === 0 ? "#d4edbc" : "#a8d5ba",
                }}
                animate={{
                  y: [0, -80, 0],
                  opacity: [0, 0.4, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 3,
                  delay: i * 0.25,
                  repeat: Number.POSITIVE_INFINITY,
                }}
              />
            ))}
          </div>

          {/* Logo */}
          <motion.div
            className="relative mb-8"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", duration: 1, bounce: 0.4 }}
          >
            <motion.div
              className="absolute inset-0 bg-[#d4edbc] rounded-full blur-3xl opacity-30"
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY }}
            />
            <Image src="/images/biosweet-logo.png" alt="Biosweet" width={120} height={120} className="relative z-10" />
          </motion.div>

          {/* Progress bar */}
          <div className="relative w-48 h-[3px] bg-[#2b6e1a]/10 rounded-full overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#2b6e1a] to-[#7bc462] rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Loading text */}
          <motion.p
            className="mt-5 text-[#5a8f4a]/50 font-medium text-xs uppercase tracking-widest"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          >
            Préparation...
          </motion.p>

          {/* Percentage */}
          <motion.span
            className="mt-2 text-lg font-extrabold text-[#2b6e1a]"
            key={Math.round(progress)}
            initial={{ y: 5, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            {Math.min(Math.round(progress), 100)}%
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
