"use client"

import type React from "react"

import type { ReactNode } from "react"
import { useState } from "react"
import { motion } from "framer-motion"

interface LiquidButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  variant?: "primary" | "secondary"
}

export function LiquidButton({ children, className = "", onClick, variant = "primary" }: LiquidButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setRipples((prev) => [...prev, { id: Date.now(), x, y }])
    setTimeout(() => {
      setRipples((prev) => prev.slice(1))
    }, 1000)

    onClick?.()
  }

  const isPrimary = variant === "primary"

  return (
    <motion.button
      className={`relative overflow-hidden ${className}`}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      data-cursor="Cliquer"
    >
      {/* Background blob */}
      <motion.div
        className={`absolute inset-0 ${isPrimary ? "bg-[#2b6e1a]" : "bg-[#d4edbc]"}`}
        animate={{
          borderRadius: isHovered ? "30% 70% 70% 30% / 30% 30% 70% 70%" : "50% 50% 50% 50% / 50% 50% 50% 50%",
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Liquid effect overlay */}
      <motion.div
        className={`absolute inset-0 ${isPrimary ? "bg-[#7bc462]" : "bg-[#2b6e1a]"}`}
        initial={{ y: "100%" }}
        animate={{ y: isHovered ? "0%" : "100%" }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        style={{
          borderRadius: "0 0 50% 50%",
        }}
      />

      {/* Ripple effects */}
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          className="absolute rounded-full bg-white/30 pointer-events-none"
          style={{ left: ripple.x, top: ripple.y }}
          initial={{ width: 0, height: 0, x: 0, y: 0, opacity: 0.5 }}
          animate={{ width: 500, height: 500, x: -250, y: -250, opacity: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      ))}

      {/* Content */}
      <span className={`relative z-10 ${isPrimary ? "text-white" : isHovered ? "text-white" : "text-[#2b6e1a]"}`}>
        {children}
      </span>
    </motion.button>
  )
}
