"use client"

import type React from "react"

import { useRef, useCallback, useState } from "react"
import { motion } from "framer-motion"

interface PinchZoomProps {
  children: React.ReactNode
  className?: string
  maxScale?: number
  minScale?: number
}

export function PinchZoom({ children, className = "", maxScale = 3, minScale = 1 }: PinchZoomProps) {
  const [scale, setScale] = useState(1)
  const initialDistance = useRef(0)
  const initialScale = useRef(1)

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX
        const dy = e.touches[0].clientY - e.touches[1].clientY
        initialDistance.current = Math.sqrt(dx * dx + dy * dy)
        initialScale.current = scale
      }
    },
    [scale],
  )

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX
        const dy = e.touches[0].clientY - e.touches[1].clientY
        const distance = Math.sqrt(dx * dx + dy * dy)
        const newScale = initialScale.current * (distance / initialDistance.current)
        setScale(Math.max(minScale, Math.min(maxScale, newScale)))
      }
    },
    [maxScale, minScale],
  )

  const handleDoubleTap = useCallback(() => {
    setScale((prev) => (prev > 1 ? 1 : 2))
  }, [])

  return (
    <div
      className={`overflow-hidden ${className}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onDoubleClick={handleDoubleTap}
    >
      <motion.div
        animate={{ scale }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="origin-center"
      >
        {children}
      </motion.div>
    </div>
  )
}

export function LongPress({
  children,
  onLongPress,
  duration = 500,
  className = "",
}: {
  children: React.ReactNode
  onLongPress: () => void
  duration?: number
  className?: string
}) {
  const [isPressing, setIsPressing] = useState(false)
  const [progress, setProgress] = useState(0)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null) // Correction ici
  const intervalRef = useRef<NodeJS.Timeout | null>(null) // Correction ici

  const handleStart = useCallback(() => {
    setIsPressing(true)
    setProgress(0)

    const startTime = Date.now()
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime
      setProgress(Math.min(elapsed / duration, 1))
    }, 16)

    timeoutRef.current = setTimeout(() => {
      onLongPress()
      setIsPressing(false)
      setProgress(0)
      if (intervalRef.current) clearInterval(intervalRef.current)
    }, duration)
  }, [duration, onLongPress])

  const handleEnd = useCallback(() => {
    setIsPressing(false)
    setProgress(0)
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    if (intervalRef.current) clearInterval(intervalRef.current)
  }, [])

  return (
    <div
      className={`relative ${className}`}
      onTouchStart={handleStart}
      onTouchEnd={handleEnd}
      onTouchCancel={handleEnd}
      onMouseDown={handleStart}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
    >
      {children}

      {/* Progress ring */}
      <AnimatedRing progress={progress} isVisible={isPressing} />
    </div>
  )
}

function AnimatedRing({ progress, isVisible }: { progress: number; isVisible: boolean }) {
  if (!isVisible) return null

  const circumference = 2 * Math.PI * 45
  const strokeDashoffset = circumference * (1 - progress)

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <svg className="w-full h-full max-w-[100px] max-h-[100px]" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(199,255,166,0.3)" strokeWidth="4" />
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="#2b6e1a"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform="rotate(-90 50 50)"
          className="transition-all duration-100"
        />
      </svg>
    </div>
  )
}

export function useShakeDetection(callback: () => void, threshold = 15) {
  const lastAcceleration = useRef({ x: 0, y: 0, z: 0 })
  const shakeCount = useRef(0)

  const handleMotion = useCallback(
    (e: DeviceMotionEvent) => {
      const acceleration = e.accelerationIncludingGravity
      if (!acceleration?.x || !acceleration?.y || !acceleration?.z) return

      const deltaX = Math.abs(acceleration.x - lastAcceleration.current.x)
      const deltaY = Math.abs(acceleration.y - lastAcceleration.current.y)
      const deltaZ = Math.abs(acceleration.z - lastAcceleration.current.z)

      if (deltaX + deltaY + deltaZ > threshold) {
        shakeCount.current++
        if (shakeCount.current >= 3) {
          callback()
          shakeCount.current = 0
        }
      }

      lastAcceleration.current = { x: acceleration.x, y: acceleration.y, z: acceleration.z }
    },
    [callback, threshold],
  )

  const startListening = useCallback(() => {
    if (typeof window !== "undefined" && "DeviceMotionEvent" in window) {
      window.addEventListener("devicemotion", handleMotion)
    }
  }, [handleMotion])

  const stopListening = useCallback(() => {
    window.removeEventListener("devicemotion", handleMotion)
  }, [handleMotion])

  return { startListening, stopListening }
}

export function DragToReorder({
  items,
  onReorder,
  renderItem,
}: {
  items: any[]
  onReorder: (items: any[]) => void
  renderItem: (item: any, index: number, isDragging: boolean) => React.ReactNode
}) {
  const [orderedItems, setOrderedItems] = useState(items)
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null)
  const positions = useRef<number[]>([])

  const handleDragStart = (index: number) => {
    setDraggingIndex(index)
  }

  const handleDrag = (index: number, y: number) => {
    const itemHeight = 80 // Approximate item height
    const newIndex = Math.round(y / itemHeight)

    if (newIndex !== index && newIndex >= 0 && newIndex < orderedItems.length) {
      const newItems = [...orderedItems]
      const [removed] = newItems.splice(index, 1)
      newItems.splice(newIndex, 0, removed)
      setOrderedItems(newItems)
    }
  }

  const handleDragEnd = () => {
    setDraggingIndex(null)
    onReorder(orderedItems)
  }

  return (
    <div className="space-y-2">
      {orderedItems.map((item, index) => (
        <motion.div
          key={item.id || index}
          layout
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={0.1}
          onDragStart={() => handleDragStart(index)}
          onDrag={(_, info) => handleDrag(index, info.point.y)}
          onDragEnd={handleDragEnd}
          whileDrag={{ scale: 1.02, zIndex: 10 }}
          className="touch-none"
        >
          {renderItem(item, index, draggingIndex === index)}
        </motion.div>
      ))}
    </div>
  )
}