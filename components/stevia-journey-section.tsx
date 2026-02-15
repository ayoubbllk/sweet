"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { Leaf, Sun, Droplets, Beaker, Sparkles, CheckCircle, Coffee, Zap, ArrowRight } from "lucide-react"
import { useHapticFeedback } from "./haptic-feedback"

const journeySteps = [
  {
    id: 1,
    title: "Origine : La Plante",
    narration: "La douceur commence par une plante. Rien d'artificiel. Rien de transformé.",
    icon: Leaf,
    color: "#1a3a0e",
  },
  {
    id: 2,
    title: "Culture : La Terre Algérienne",
    narration: "Avant d'être du sucre, la Stevia apprend la patience de la terre algérienne.",
    icon: Sun,
    color: "#7bc462",
  },
  {
    id: 3,
    title: "Récolte : Le Moment Juste",
    narration: "Récolter trop tôt, c'est perdre. Trop tard, c'est trahir.",
    icon: Droplets,
    color: "#d4edbc",
  },
  {
    id: 4,
    title: "Extraction : La Science Propre",
    narration: "Extraire la douceur sans la dénaturer.",
    icon: Beaker,
    color: "#a8d5ba",
  },
  {
    id: 5,
    title: "Purification : La Pureté",
    narration: "La pureté n'est pas un hasard. C'est un choix.",
    icon: CheckCircle,
    color: "#ffffff",
  },
  {
    id: 6,
    title: "Cristallisation : Naissance du Sucre",
    narration: "La plante devient sucre. Naturellement.",
    icon: Sparkles,
    color: "#d4edbc",
  },
  {
    id: 7,
    title: "Usage : Retour à l'Humain",
    narration: "La douceur retrouve sa place : la vôtre.",
    icon: Coffee,
    color: "#1a3a0e",
  },
  {
    id: 8,
    title: "Vision : L'Avenir",
    narration: "Une plante. Une industrie. Un avenir plus sain.",
    icon: Zap,
    color: "#a8d5ba",
  },
]

const NUM_STEPS = journeySteps.length
const STEP_DURATION = 1 / NUM_STEPS

function SteviaVisuals({ scrollYProgress }: { scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"] }) {
  const { light } = useHapticFeedback()

  const leafScale = useTransform(scrollYProgress, [0, STEP_DURATION], [1, 1.1])
  const leafRotate = useTransform(scrollYProgress, [0, STEP_DURATION], [0, 5])
  const leafOpacity = useTransform(scrollYProgress, [0, STEP_DURATION * 0.8, STEP_DURATION], [1, 1, 0])

  const fieldOpacity = useTransform(
    scrollYProgress,
    [STEP_DURATION, STEP_DURATION * 1.2, STEP_DURATION * 2, STEP_DURATION * 2.2],
    [0, 1, 1, 0],
  )
  const fieldX = useTransform(scrollYProgress, [STEP_DURATION, STEP_DURATION * 2], ["-50%", "0%"])

  const harvestOpacity = useTransform(
    scrollYProgress,
    [STEP_DURATION * 2, STEP_DURATION * 2.2, STEP_DURATION * 3, STEP_DURATION * 3.2],
    [0, 1, 1, 0],
  )
  const harvestClip = useTransform(scrollYProgress, [STEP_DURATION * 2.5, STEP_DURATION * 3], [`inset(100% 0 0 0)`, `inset(0% 0 0 0)`])
  const harvestColor = useTransform(scrollYProgress, [STEP_DURATION * 2.5, STEP_DURATION * 3], ["#1a3a0e", "#a8d5ba"])

  const extractionOpacity = useTransform(
    scrollYProgress,
    [STEP_DURATION * 3, STEP_DURATION * 3.2, STEP_DURATION * 4, STEP_DURATION * 4.2],
    [0, 1, 1, 0],
  )
  const moleculeScale = useTransform(scrollYProgress, [STEP_DURATION * 3.5, STEP_DURATION * 4], [0.5, 1.5])
  const moleculeBlur = useTransform(scrollYProgress, [STEP_DURATION * 3.5, STEP_DURATION * 4], [`blur(10px)`, `blur(0px)`])

  const purificationOpacity = useTransform(
    scrollYProgress,
    [STEP_DURATION * 4, STEP_DURATION * 4.2, STEP_DURATION * 5, STEP_DURATION * 5.2],
    [0, 1, 1, 0],
  )
  const purificationFilter = useTransform(
    scrollYProgress,
    [STEP_DURATION * 4.5, STEP_DURATION * 5],
    [`grayscale(1) contrast(2)`, `grayscale(0) contrast(1)`]
  )

  const crystalOpacity = useTransform(
    scrollYProgress,
    [STEP_DURATION * 5, STEP_DURATION * 5.2, STEP_DURATION * 6, STEP_DURATION * 6.2],
    [0, 1, 1, 0],
  )
  const crystalRotateX = useTransform(scrollYProgress, [STEP_DURATION * 5.5, STEP_DURATION * 6], [90, 0])

  const usageOpacity = useTransform(
    scrollYProgress,
    [STEP_DURATION * 6, STEP_DURATION * 6.2, STEP_DURATION * 7, STEP_DURATION * 7.2],
    [0, 1, 1, 0],
  )
  const sugarDropY = useTransform(scrollYProgress, [STEP_DURATION * 6.5, STEP_DURATION * 7], [-100, 100])

  const visionOpacity = useTransform(scrollYProgress, [STEP_DURATION * 7, STEP_DURATION * 7.2], [0, 1])

  return (
    <div className="w-full h-full flex items-center justify-center">
      {/* 1. Leaf */}
      <motion.div
        style={{ opacity: leafOpacity, scale: leafScale, rotate: leafRotate }}
        className="absolute w-64 h-64 md:w-96 md:h-96"
      >
        <Leaf className="w-full h-full text-[#2b6e1a] animate-pulse-glow" style={{ filter: "drop-shadow(0 0 10px rgba(43, 110, 26, 0.3))" }} />
      </motion.div>

      {/* 2. Culture */}
      <motion.div
        style={{ opacity: fieldOpacity, x: fieldX }}
        className="absolute w-[200vw] h-full flex items-center justify-center bg-gradient-to-r from-[#5a8f4a] to-[#d4edbc] overflow-hidden"
      >
        <div className="w-screen h-full relative flex items-center justify-center">
          <img
            src="/organic-sugarcane-plantation-sunrise-golden-hour-n.jpg"
            alt="Champs de Stevia"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-[#1a3a0e]/50" />
          <div className="relative text-center text-white p-8">
            <h3 className="text-2xl md:text-3xl font-extrabold mb-4">Terres Fertiles</h3>
            <p className="text-base max-w-md text-white/80">
              <Sun className="inline w-4 h-4 mr-2" /> 300 jours de soleil par an.
            </p>
            <p className="text-base max-w-md text-white/80">
              <Droplets className="inline w-4 h-4 mr-2" /> Irrigation intelligente.
            </p>
          </div>
        </div>
      </motion.div>

      {/* 3. Harvest */}
      <motion.div
        style={{ opacity: harvestOpacity, backgroundColor: harvestColor }}
        className="absolute w-64 h-64 md:w-96 md:h-96 rounded-2xl flex items-center justify-center shadow-2xl"
      >
        <motion.div
          style={{ clipPath: harvestClip }}
          className="absolute inset-0 bg-[#1a3a0e] rounded-2xl flex items-center justify-center"
        >
          <Leaf className="w-1/2 h-1/2 text-white" />
        </motion.div>
        <span className="text-white font-bold text-lg relative z-10">Matière Sèche</span>
      </motion.div>

      {/* 4. Extraction */}
      <motion.div
        style={{ opacity: extractionOpacity, scale: moleculeScale, filter: moleculeBlur }}
        className="absolute w-64 h-64 md:w-96 md:h-96 rounded-full bg-[#a8d5ba]/30 flex items-center justify-center"
      >
        <Beaker className="w-1/3 h-1/3 text-[#2b6e1a]" />
        <div className="absolute w-1/2 h-1/2 border-2 border-[#2b6e1a]/30 rounded-full animate-spin-slow" />
      </motion.div>

      {/* 5. Purification */}
      <motion.div
        style={{ opacity: purificationOpacity }}
        className="absolute w-full h-full flex items-center justify-center bg-white"
      >
        <motion.div
          style={{ filter: purificationFilter }}
          className="w-full h-full flex items-center justify-center"
        >
          <img
            src="/modern-laboratory-biotech-sugar-production-futuris.jpg"
            alt="Laboratoire Purification"
            className="w-full h-full object-cover opacity-70"
          />
        </motion.div>
        <div className="absolute text-center">
          <CheckCircle className="w-14 h-14 text-[#2b6e1a] mb-4 mx-auto" />
          <h3 className="text-2xl md:text-3xl font-extrabold text-[#1a3a0e]">Pureté Absolue</h3>
        </div>
      </motion.div>

      {/* 6. Crystallization */}
      <motion.div
        style={{ opacity: crystalOpacity, rotateX: crystalRotateX }}
        className="absolute w-full h-full flex items-center justify-center bg-gradient-to-br from-[#d4edbc] to-[#a8d5ba] perspective-1000"
      >
        <div className="relative w-64 h-64 md:w-96 md:h-96">
          <motion.div
            className="absolute inset-0 bg-white/40 rounded-2xl"
            style={{ boxShadow: "0 0 40px rgba(255, 255, 255, 0.6)", transformStyle: "preserve-3d" }}
          />
          <Sparkles className="w-full h-full text-white" />
        </div>
      </motion.div>

      {/* 7. Usage */}
      <motion.div
        style={{ opacity: usageOpacity }}
        className="absolute w-full h-full flex items-center justify-center bg-white"
      >
        <div className="relative w-64 h-64 md:w-96 md:h-96 rounded-full bg-[#a8d5ba]/30 flex items-center justify-center overflow-hidden">
          <img
            src="/creme-brulee-vanilla-caramelized-sugar-elegant-des.jpg"
            alt="Usage"
            className="w-full h-full object-cover opacity-80"
          />
          <motion.div
            style={{ y: sugarDropY }}
            className="absolute top-0 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center"
          >
            <Sparkles className="w-4 h-4 text-[#2b6e1a]" />
          </motion.div>
        </div>
      </motion.div>

      {/* 8. Vision */}
      <motion.div
        style={{ opacity: visionOpacity }}
        className="absolute w-full h-full flex flex-col items-center justify-center bg-[#1a3a0e] text-white p-8"
      >
        <Zap className="w-10 h-10 text-[#7bc462] mb-4" />
        <h3 className="text-3xl md:text-5xl font-extrabold mb-5 text-center">L&apos;Avenir est Doux.</h3>
        <p className="text-lg text-white/40 mb-8 max-w-lg text-center">
          Soutenez l&apos;innovation écologique algérienne.
        </p>
        <motion.a
          href="#boutique"
          className="btn-primary flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => light()}
        >
          Découvrir la Boutique
          <ArrowRight className="w-4 h-4" />
        </motion.a>
      </motion.div>
    </div>
  )
}

function SteviaNarration({ scrollYProgress }: { scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"] }) {
  return (
    <div className="relative max-w-xl mx-auto h-full flex flex-col justify-center pointer-events-none">
      {journeySteps.map((step, index) => {
        const start = index * STEP_DURATION
        const end = (index + 1) * STEP_DURATION
        const opacity = useTransform(
          scrollYProgress,
          [start, start + STEP_DURATION * 0.1, end - STEP_DURATION * 0.1, end],
          [0, 1, 1, 0],
        )
        const y = useTransform(
          scrollYProgress,
          [start, start + STEP_DURATION * 0.1, end - STEP_DURATION * 0.1, end],
          [50, 0, 0, -50],
        )

        return (
          <motion.div
            key={step.id}
            style={{ opacity, y }}
            className="absolute inset-0 flex flex-col justify-center p-6 md:p-0 text-center"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-6 md:p-8 rounded-2xl bg-white/80 backdrop-blur-md border border-[#2b6e1a]/5 shadow-lg"
            >
              <step.icon className="w-7 h-7 text-[#2b6e1a] mx-auto mb-3" />
              <h3 className="text-xl md:text-2xl font-extrabold text-[#1a3a0e] mb-2">{step.title}</h3>
              <p className="text-sm md:text-base text-[#5a8f4a]/70 leading-relaxed">{step.narration}</p>
            </motion.div>
          </motion.div>
        )
      })}
    </div>
  )
}

export function SteviaJourneySection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  return (
    <section ref={containerRef} className="relative w-full">
      {/* Sticky Visual Container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <SteviaVisuals scrollYProgress={scrollYProgress} />
      </div>

      {/* Scroll Driving Content */}
      <div className="relative h-[800vh] pointer-events-none">
        <div className="sticky top-0 h-screen flex items-center justify-center">
          <SteviaNarration scrollYProgress={scrollYProgress} />
        </div>
      </div>
    </section>
  )
}
