"use client"

import type { ReactNode } from "react"
import { useRef } from "react"
import { motion, useInView } from "framer-motion"

interface RevealOnScrollProps {
  children: ReactNode
  direction?: "up" | "down" | "left" | "right"
  delay?: number
  duration?: number
  className?: string
}

export function RevealOnScroll({
  children,
  direction = "up",
  delay = 0,
  duration = 0.8,
  className = "",
}: RevealOnScrollProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const directions = {
    up: { y: 80, x: 0 },
    down: { y: -80, x: 0 },
    left: { y: 0, x: 80 },
    right: { y: 0, x: -80 },
  }

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        ...directions[direction],
        filter: "blur(10px)",
      }}
      animate={
        isInView
          ? {
              opacity: 1,
              y: 0,
              x: 0,
              filter: "blur(0px)",
            }
          : {}
      }
      transition={{
        duration,
        delay,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
