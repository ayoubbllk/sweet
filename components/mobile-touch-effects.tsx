"use client"

import type React from "react"

import { useEffect, useRef, useState, useCallback } from "react"
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion"

export function TouchRipple() {
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number; size: number }[]>([])
  const idRef = useRef(0)

  useEffect(() => {
    const handleTouch = (e: TouchEvent) => {
      const touch = e.touches[0]
      if (!touch) return

      const newRipple = {
        id: idRef.current++,
        x: touch.clientX,
        y: touch.clientY,
        size: Math.random() * 100 + 80,
      }

      setRipples((prev) => [...prev.slice(-5), newRipple])

      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id))
      }, 1000)
    }

    window.addEventListener("touchstart", handleTouch)
    return () => window.removeEventListener("touchstart", handleTouch)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-[200] md:hidden">
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            className="absolute rounded-full"
            style={{
              left: ripple.x,
              top: ripple.y,
              x: "-50%",
              y: "-50%",
              background:
                "radial-gradient(circle, rgba(199,255,166,0.6) 0%, rgba(205,233,252,0.3) 50%, transparent 70%)",
            }}
            initial={{ width: 0, height: 0, opacity: 1 }}
            animate={{ width: ripple.size, height: ripple.size, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}

export function SwipeIndicator({ direction = "horizontal" }: { direction?: "horizontal" | "vertical" }) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 5000)
    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <motion.div
      className="flex items-center gap-2 text-[#2b6e1a]/60 text-sm md:hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className={`flex items-center gap-1 ${direction === "horizontal" ? "flex-row" : "flex-col"}`}
        animate={{
          x: direction === "horizontal" ? [-5, 5, -5] : 0,
          y: direction === "vertical" ? [-5, 5, -5] : 0,
        }}
        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
      >
        <span>👆</span>
        <span className="text-xs">Glissez pour explorer</span>
      </motion.div>
    </motion.div>
  )
}

export function PullToRefreshIndicator() {
  const [pullDistance, setPullDistance] = useState(0)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const startY = useRef(0)

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if (window.scrollY === 0) {
        startY.current = e.touches[0].clientY
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (window.scrollY === 0 && startY.current > 0) {
        const delta = e.touches[0].clientY - startY.current
        if (delta > 0) {
          setPullDistance(Math.min(delta * 0.5, 100))
        }
      }
    }

    const handleTouchEnd = () => {
      if (pullDistance > 60) {
        setIsRefreshing(true)
        setTimeout(() => {
          setIsRefreshing(false)
          setPullDistance(0)
        }, 1500)
      } else {
        setPullDistance(0)
      }
      startY.current = 0
    }

    window.addEventListener("touchstart", handleTouchStart)
    window.addEventListener("touchmove", handleTouchMove)
    window.addEventListener("touchend", handleTouchEnd)

    return () => {
      window.removeEventListener("touchstart", handleTouchStart)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("touchend", handleTouchEnd)
    }
  }, [pullDistance])

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 flex justify-center pointer-events-none z-[300] md:hidden"
      style={{ paddingTop: pullDistance }}
    >
      <AnimatePresence>
        {(pullDistance > 20 || isRefreshing) && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="w-10 h-10 rounded-full bg-gradient-to-br from-[#d4edbc] to-[#a8d5ba] flex items-center justify-center shadow-lg"
          >
            <motion.div
              className="w-5 h-5 border-2 border-[#2b6e1a] border-t-transparent rounded-full"
              animate={isRefreshing ? { rotate: 360 } : { rotate: pullDistance * 3 }}
              transition={
                isRefreshing ? { duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" } : { duration: 0 }
              }
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function useMobileTilt() {
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springX = useSpring(rotateX, { stiffness: 300, damping: 30 })
  const springY = useSpring(rotateY, { stiffness: 300, damping: 30 })

  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.beta !== null && e.gamma !== null) {
        rotateX.set(Math.max(-15, Math.min(15, e.beta - 45)))
        rotateY.set(Math.max(-15, Math.min(15, e.gamma)))
      }
    }

    if (typeof window !== "undefined" && "DeviceOrientationEvent" in window) {
      window.addEventListener("deviceorientation", handleOrientation)
    }

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation)
    }
  }, [rotateX, rotateY])

  return { rotateX: springX, rotateY: springY }
}

export function MobileScrollSection({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  return <div className={`snap-start snap-always min-h-screen ${className}`}>{children}</div>
}

export function BottomSheet({
  isOpen,
  onClose,
  children,
  title,
}: {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
}) {
  const sheetRef = useRef<HTMLDivElement>(null)
  const dragY = useMotionValue(0)

  const handleDragEnd = useCallback(
    (_: any, info: { velocity: { y: number }; offset: { y: number } }) => {
      if (info.velocity.y > 500 || info.offset.y > 200) {
        onClose()
      }
    },
    [onClose],
  )

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[400] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            ref={sheetRef}
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-[401] max-h-[85vh] overflow-hidden md:hidden"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            style={{ y: dragY }}
          >
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
            </div>
            {title && (
              <div className="px-6 pb-4 border-b border-gray-100">
                <h3 className="text-lg font-bold text-[#2b6e1a]">{title}</h3>
              </div>
            )}
            <div className="overflow-y-auto max-h-[calc(85vh-80px)]">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export function MobileFAB({
  icon,
  onClick,
  badge,
}: {
  icon: React.ReactNode
  onClick: () => void
  badge?: number
}) {
  return (
    <motion.button
      className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-br from-[#2b6e1a] to-[#2b6e1a] text-white shadow-lg shadow-[#2b6e1a]/30 flex items-center justify-center z-[350] md:hidden"
      whileTap={{ scale: 0.9 }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", delay: 1 }}
      onClick={onClick}
    >
      {icon}
      {badge !== undefined && badge > 0 && (
        <motion.span
          className="absolute -top-1 -right-1 w-6 h-6 bg-[#d4edbc] text-[#2b6e1a] text-xs font-bold rounded-full flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          {badge}
        </motion.span>
      )}
    </motion.button>
  )
}
