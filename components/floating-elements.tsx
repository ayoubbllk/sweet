"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export function FloatingElements() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springX = useSpring(mouseX, { stiffness: 20, damping: 30 })
  const springY = useSpring(mouseY, { stiffness: 20, damping: 30 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window
      mouseX.set((e.clientX / innerWidth - 0.5) * 100)
      mouseY.set((e.clientY / innerHeight - 0.5) * 100)
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  const elements = [
    { size: 300, x: "10%", y: "20%", delay: 0, parallax: 0.3, color: "#d4edbc" },
    { size: 200, x: "80%", y: "30%", delay: 0.5, parallax: -0.2, color: "#a8d5ba" },
    { size: 150, x: "20%", y: "70%", delay: 1, parallax: 0.4, color: "#d4edbc" },
    { size: 250, x: "70%", y: "80%", delay: 1.5, parallax: -0.3, color: "#a8d5ba" },
    { size: 100, x: "50%", y: "10%", delay: 2, parallax: 0.5, color: "#7bc462" },
  ]

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {elements.map((el, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl opacity-30"
          style={{
            width: el.size,
            height: el.size,
            left: el.x,
            top: el.y,
            background: `radial-gradient(circle, ${el.color} 0%, transparent 70%)`,
            x: springX.get() * el.parallax,
            y: springY.get() * el.parallax,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 8 + el.delay,
            repeat: Number.POSITIVE_INFINITY,
            delay: el.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Cursor glow effect */}
      <motion.div
        className="absolute w-64 h-64 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(199,255,166,0.15) 0%, transparent 70%)",
          left: mousePosition.x - 128,
          top: mousePosition.y - 128,
        }}
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
    </div>
  )
}
