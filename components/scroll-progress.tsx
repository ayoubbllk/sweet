"use client"

import { motion, useScroll, useSpring, type MotionValue } from "framer-motion" // Import MotionValue

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  return (
    <>
      {/* Top progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2b6e1a] via-[#d4edbc] to-[#a8d5ba] origin-left z-[9999]"
        style={{ scaleX }}
      />

      {/* Side progress indicator */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-[9999] hidden lg:flex flex-col items-center gap-2">
        <motion.div className="w-1 h-32 bg-[#d4edbc]/30 rounded-full overflow-hidden">
          <motion.div
            className="w-full bg-gradient-to-b from-[#2b6e1a] to-[#d4edbc] rounded-full origin-top"
            style={{ scaleY: scrollYProgress, height: "100%" }}
          />
        </motion.div>
        <motion.span
          className="text-xs font-medium text-[#2b6e1a]"
          style={{
            opacity: scrollYProgress,
          }}
        >
          {/* Percentage display */}
          <ProgressPercentage progress={scrollYProgress} />
        </motion.span>
      </div>
    </>
  )
}

function ProgressPercentage({ progress }: { progress: MotionValue<number> }) {
  const percentage = useSpring(progress, { stiffness: 100, damping: 30 })

  return <motion.span>{Math.round(percentage.get() * 100)}%</motion.span>
}