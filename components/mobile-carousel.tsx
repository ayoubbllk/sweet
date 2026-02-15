"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { motion, useMotionValue, useTransform, animate } from "framer-motion"

interface MobileCarouselProps {
  children: React.ReactNode[]
  className?: string
  showDots?: boolean
  autoPlay?: boolean
  interval?: number
}

export function MobileCarousel({
  children,
  className = "",
  showDots = true,
  autoPlay = false,
  interval = 4000,
}: MobileCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [containerWidth, setContainerWidth] = useState(0)
  const x = useMotionValue(0)

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth)
    }

    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    if (autoPlay && containerWidth > 0) {
      const timer = setInterval(() => {
        const nextIndex = (activeIndex + 1) % children.length
        animate(x, -nextIndex * containerWidth, { type: "spring", stiffness: 300, damping: 30 })
        setActiveIndex(nextIndex)
      }, interval)
      return () => clearInterval(timer)
    }
  }, [autoPlay, interval, activeIndex, children.length, containerWidth, x])

  const handleDragEnd = (_: any, info: { velocity: { x: number }; offset: { x: number } }) => {
    const threshold = containerWidth / 4
    const velocity = info.velocity.x
    const offset = info.offset.x

    let newIndex = activeIndex

    if (offset < -threshold || velocity < -500) {
      newIndex = Math.min(activeIndex + 1, children.length - 1)
    } else if (offset > threshold || velocity > 500) {
      newIndex = Math.max(activeIndex - 1, 0)
    }

    animate(x, -newIndex * containerWidth, { type: "spring", stiffness: 300, damping: 30 })
    setActiveIndex(newIndex)
  }

  const goToSlide = (index: number) => {
    animate(x, -index * containerWidth, { type: "spring", stiffness: 300, damping: 30 })
    setActiveIndex(index)
  }

  return (
    <div className={`relative overflow-hidden ${className}`} ref={containerRef}>
      <motion.div
        className="flex"
        style={{ x }}
        drag="x"
        dragConstraints={{ left: -(children.length - 1) * containerWidth, right: 0 }}
        dragElastic={0.1}
        onDragEnd={handleDragEnd}
      >
        {children.map((child, index) => (
          <motion.div key={index} className="flex-shrink-0" style={{ width: containerWidth || "100%" }}>
            {child}
          </motion.div>
        ))}
      </motion.div>

      {showDots && (
        <div className="flex justify-center gap-2 mt-6">
          {children.map((_, index) => (
            <motion.button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === activeIndex ? "bg-[#2b6e1a]" : "bg-[#d4edbc]"
              }`}
              whileTap={{ scale: 0.8 }}
              onClick={() => goToSlide(index)}
              animate={{ scale: index === activeIndex ? 1.3 : 1 }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export function SwipeCards({
  items,
  onSwipe,
  renderCard,
}: {
  items: any[]
  onSwipe?: (item: any, direction: "left" | "right") => void
  renderCard: (item: any, index: number) => React.ReactNode
}) {
  const [cards, setCards] = useState(items)

  const handleSwipe = (direction: "left" | "right", item: any) => {
    onSwipe?.(item, direction)
    setCards((prev) => prev.filter((c) => c !== item))
  }

  return (
    <div className="relative h-[400px] w-full">
      {cards.slice(0, 3).map((item, index) => (
        <SwipeCard key={item.id || index} item={item} index={index} onSwipe={handleSwipe} renderCard={renderCard} />
      ))}
    </div>
  )
}

function SwipeCard({
  item,
  index,
  onSwipe,
  renderCard,
}: {
  item: any
  index: number
  onSwipe: (direction: "left" | "right", item: any) => void
  renderCard: (item: any, index: number) => React.ReactNode
}) {
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-15, 15])
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0.5, 1, 1, 1, 0.5])

  const likeOpacity = useTransform(x, [0, 100], [0, 1])
  const nopeOpacity = useTransform(x, [-100, 0], [1, 0])

  const handleDragEnd = (_: any, info: { offset: { x: number }; velocity: { x: number } }) => {
    if (info.offset.x > 100 || info.velocity.x > 500) {
      onSwipe("right", item)
    } else if (info.offset.x < -100 || info.velocity.x < -500) {
      onSwipe("left", item)
    }
  }

  return (
    <motion.div
      className="absolute inset-0"
      style={{
        x,
        rotate,
        opacity,
        zIndex: 3 - index,
        scale: 1 - index * 0.05,
        y: index * 10,
      }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={1}
      onDragEnd={handleDragEnd}
      whileTap={{ cursor: "grabbing" }}
    >
      <div className="relative h-full w-full">
        {renderCard(item, index)}

        {/* Like indicator */}
        <motion.div
          className="absolute top-8 right-8 px-4 py-2 border-4 border-green-500 text-green-500 font-bold text-2xl rounded-lg rotate-12"
          style={{ opacity: likeOpacity }}
        >
          J'AIME
        </motion.div>

        {/* Nope indicator */}
        <motion.div
          className="absolute top-8 left-8 px-4 py-2 border-4 border-red-500 text-red-500 font-bold text-2xl rounded-lg -rotate-12"
          style={{ opacity: nopeOpacity }}
        >
          PASSER
        </motion.div>
      </div>
    </motion.div>
  )
}
