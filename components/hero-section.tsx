"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion"
import { ArrowDown } from "lucide-react"
import Image from "next/image"

/* ── Organic Blob SVG ────────────────────────────── */
function OrganicBlob({ className, color, delay = 0 }: { className?: string; color: string; delay?: number }) {
  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5, delay }}
    >
      <svg viewBox="0 0 200 200" className="w-full h-full animate-morph" xmlns="http://www.w3.org/2000/svg">
        <path
          fill={color}
          d="M44.7,-76.4C58.8,-69.2,71.8,-58.5,79.6,-44.9C87.3,-31.2,89.8,-15.6,88.5,-0.8C87.2,14.1,82,28.1,73.8,40.3C65.5,52.5,54.3,62.8,41.2,70.1C28.1,77.4,14.1,81.6,-0.7,82.8C-15.5,84,-31.1,82.1,-43.6,74.6C-56.1,67.1,-65.6,54,-73.4,40.1C-81.2,26.2,-87.3,11.6,-86.4,-2.5C-85.5,-16.6,-77.5,-30.5,-67.2,-41.5C-56.9,-52.5,-44.2,-60.7,-31,-67.8C-17.8,-75,-8.9,-81.1,3.5,-87.2C15.9,-93.2,31.7,-99.2,44.7,-76.4Z"
          transform="translate(100 100)"
        />
      </svg>
    </motion.div>
  )
}

/* ── Leaf SVG decoration ─────────────────────────── */
function LeafDecoration({ className, size = 60, delay = 0 }: { className?: string; size?: number; delay?: number }) {
  return (
    <motion.svg
      className={`absolute pointer-events-none ${className}`}
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      initial={{ opacity: 0, y: 20, rotate: -10 }}
      animate={{ opacity: 0.6, y: 0, rotate: 0 }}
      transition={{ duration: 1, delay, ease: "easeOut" }}
    >
      <path
        d="M40 8C40 8 16 20 12 44C8 68 28 76 40 76C52 76 72 68 68 44C64 20 40 8 40 8Z"
        fill="none"
        stroke="#7bc462"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path
        d="M40 16C40 16 40 76 40 76"
        stroke="#7bc462"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.3"
      />
      <path
        d="M40 30C30 28 20 36 20 36"
        stroke="#7bc462"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.3"
      />
      <path
        d="M40 44C50 42 60 48 60 48"
        stroke="#7bc462"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.3"
      />
    </motion.svg>
  )
}

/* ── Floating sugar crystal SVG ──────────────────── */
function SugarCrystal({ x, y, size, delay }: { x: string; y: string; size: number; delay: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: x, top: y }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: [0, 0.4, 0.2, 0.4, 0], y: [0, -40, -80] }}
      transition={{ duration: 6 + delay * 2, repeat: Infinity, delay, ease: "easeInOut" }}
    >
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2L22 8.5V17.5L12 24L2 17.5V8.5L12 2Z"
          fill="white"
          fillOpacity="0.15"
          stroke="white"
          strokeWidth="0.5"
          strokeOpacity="0.3"
        />
      </svg>
    </motion.div>
  )
}

/* ── Flowing line decoration ─────────────────────── */
function FlowingLines() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.04]"
      viewBox="0 0 1440 900"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
    >
      <motion.path
        d="M-100 400C200 300 400 500 720 400S1200 300 1540 400"
        stroke="#2b6e1a"
        strokeWidth="1.5"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 3, delay: 1, ease: "easeInOut" }}
      />
      <motion.path
        d="M-100 500C300 400 500 600 720 500S1100 400 1540 500"
        stroke="#7bc462"
        strokeWidth="1"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 3, delay: 1.5, ease: "easeInOut" }}
      />
      <motion.path
        d="M-100 600C250 500 450 700 720 600S1150 500 1540 600"
        stroke="#a8d5ba"
        strokeWidth="0.8"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 3, delay: 2, ease: "easeInOut" }}
      />
    </svg>
  )
}

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.95])
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, 80])

  const springX = useSpring(mouseX, { stiffness: 40, damping: 25 })
  const springY = useSpring(mouseY, { stiffness: 40, damping: 25 })

  useEffect(() => {
    setIsLoaded(true)
    setIsMobile(window.innerWidth < 768)
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener("resize", handleResize)

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 20)
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 20)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
    }
  }, [mouseX, mouseY])

  const crystals = Array.from({ length: 12 }, (_, i) => ({
    x: `${10 + Math.random() * 80}%`,
    y: `${10 + Math.random() * 80}%`,
    size: 12 + Math.random() * 16,
    delay: Math.random() * 4,
  }))

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden"
    >
      {/* Background layers */}
      <motion.div
        className="absolute inset-0"
        style={{ y, scale }}
      >
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#f0f7ec] via-[#fafdf7] to-white" />
        
        {/* Dot pattern */}
        <div className="absolute inset-0 pattern-dots" />
        
        {/* Flowing lines */}
        <FlowingLines />
      </motion.div>

      {/* Organic blobs - parallax */}
      <motion.div style={{ x: springX, y: springY }} className="absolute inset-0 pointer-events-none">
        <OrganicBlob
          className="top-[5%] -left-[5%] w-[35vw] h-[35vw] max-w-[500px] max-h-[500px]"
          color="rgba(212, 237, 188, 0.35)"
          delay={0.3}
        />
        <OrganicBlob
          className="bottom-[10%] -right-[8%] w-[40vw] h-[40vw] max-w-[550px] max-h-[550px]"
          color="rgba(168, 213, 186, 0.25)"
          delay={0.6}
        />
        <OrganicBlob
          className="top-[30%] right-[15%] w-[20vw] h-[20vw] max-w-[280px] max-h-[280px]"
          color="rgba(123, 196, 98, 0.1)"
          delay={0.9}
        />
      </motion.div>

      {/* Leaf decorations */}
      {!isMobile && (
        <>
          <LeafDecoration className="top-[15%] left-[8%]" size={70} delay={1.2} />
          <LeafDecoration className="top-[25%] right-[12%]" size={50} delay={1.5} />
          <LeafDecoration className="bottom-[20%] left-[15%]" size={40} delay={1.8} />
          <LeafDecoration className="bottom-[30%] right-[8%]" size={60} delay={2} />
        </>
      )}

      {/* Floating sugar crystals */}
      {crystals.slice(0, isMobile ? 6 : 12).map((c, i) => (
        <SugarCrystal key={i} {...c} />
      ))}

      {/* Main content */}
      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-6 text-center"
        style={{ opacity, y: textY }}
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={isLoaded ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 md:mb-10"
        >
          <div className="relative inline-block">
            <motion.div
              className="absolute inset-0 rounded-full blur-[60px]"
              style={{ background: "rgba(123, 196, 98, 0.2)" }}
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <Image
              src="/images/biosweet-logo.png"
              alt="Biosweet - Sucre Bio Premium"
              width={isMobile ? 120 : 160}
              height={isMobile ? 120 : 160}
              className="relative z-10 drop-shadow-sm"
              priority
            />
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="text-gradient-hero mb-6 md:mb-8 px-4"
        >
          Le sucre bio
          <br />
          <span className="text-[#7bc462]">qui vit avec la nature</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-base md:text-xl text-[#5a8f4a]/80 max-w-2xl mx-auto mb-10 md:mb-14 px-4 leading-relaxed"
        >
          Découvrez l&apos;harmonie parfaite entre innovation écologique et douceur naturelle. 
          Un sucre premium 100% algérien, cultivé avec passion.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4"
        >
          <motion.a
            href="#produits"
            className="btn-primary w-full sm:w-auto text-base md:text-lg px-8 py-4"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" opacity="0.3" />
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
            Découvrir nos produits
          </motion.a>
          <motion.a
            href="#innovation"
            className="btn-secondary w-full sm:w-auto text-base md:text-lg px-8 py-4"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Notre histoire
          </motion.a>
        </motion.div>

        {/* Decorative line below CTA */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isLoaded ? { scaleX: 1 } : {}}
          transition={{ duration: 1.2, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 md:mt-20 mx-auto w-24 h-[1px] bg-gradient-to-r from-transparent via-[#7bc462]/40 to-transparent"
        />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <motion.a
          href="#innovation"
          className="flex flex-col items-center gap-2 text-[#5a8f4a]/50 hover:text-[#2b6e1a] transition-colors"
        >
          <span className="text-xs font-medium tracking-widest uppercase">Explorer</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="w-4 h-4" />
          </motion.div>
        </motion.a>
      </motion.div>

      {/* Bottom organic wave transition */}
      <div className="absolute bottom-0 left-0 right-0 z-[2]">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
          <path
            d="M0 80C240 40 480 100 720 80C960 60 1200 20 1440 60V120H0V80Z"
            fill="#fafdf7"
          />
          <path
            d="M0 90C360 60 600 110 900 80C1200 50 1350 70 1440 75V120H0V90Z"
            fill="#fafdf7"
            fillOpacity="0.5"
          />
        </svg>
      </div>
    </section>
  )
}
