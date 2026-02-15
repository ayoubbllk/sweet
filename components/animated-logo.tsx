"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface AnimatedLogoProps {
  size?: "sm" | "md" | "lg" | "xl"
  showText?: boolean
  className?: string
}

const sizes = {
  sm: { width: 32, height: 32 },
  md: { width: 48, height: 48 },
  lg: { width: 80, height: 80 },
  xl: { width: 150, height: 150 },
}

export function AnimatedLogo({ size = "md", showText = true, className = "" }: AnimatedLogoProps) {
  const { width, height } = sizes[size]

  return (
    <motion.div
      className={`flex items-center gap-2 ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="relative">
        {/* Glow effect behind logo */}
        <motion.div
          className="absolute inset-0 bg-[#d4edbc] rounded-full blur-xl opacity-30"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
        />

        {/* Animated logo image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ type: "spring", duration: 1, bounce: 0.3 }}
          className="relative"
        >
          {/* Water drop animation */}
          <motion.div
            className="absolute -bottom-1 right-1/3 w-2 h-2 bg-gradient-to-b from-[#a8d5ba] to-[#87ceeb] rounded-full opacity-60"
            animate={{
              y: [0, 20, 0],
              opacity: [0.6, 0, 0.6],
              scale: [1, 0.5, 1],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 1,
            }}
          />

          <Image
            src="/images/biosweet-logo.png"
            alt="Biosweet Logo"
            width={width}
            height={height}
            className="relative z-10 object-contain"
            priority
          />
        </motion.div>
      </div>

      {showText && size !== "xl" && (
        <motion.span
          className={`font-bold text-[#2b6e1a] ${size === "sm" ? "text-lg" : "text-2xl"}`}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          Bio<span className="text-[#7bc462]">Sweet</span>
        </motion.span>
      )}
    </motion.div>
  )
}
