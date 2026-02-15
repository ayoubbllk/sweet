"use client"

import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Leaf,
  Sun,
  Droplets,
  FlaskConical,
  Sparkles,
  Package,
  Beaker,
  Factory,
  Coffee,
  Pill,
  Building2,
  Globe,
  ChevronDown,
  Zap,
  Heart,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
} from "lucide-react"

/* ═══════════════════════════════════════════════
   SVG ILLUSTRATIONS — unique hand-drawn style
   ═══════════════════════════════════════════════ */

function SteviaSVG() {
  return (
    <svg viewBox="0 0 400 500" fill="none" className="w-full h-full">
      {/* Stem */}
      <motion.path
        d="M200 480 C200 480 200 250 200 200 C200 150 195 100 200 60"
        stroke="#2b6e1a"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2.5, ease: "easeInOut" }}
      />
      {/* Left leaves */}
      <motion.path
        d="M200 350 C170 340 120 320 100 290 C80 260 90 240 120 250 C150 260 190 310 200 350Z"
        fill="#d4edbc"
        stroke="#2b6e1a"
        strokeWidth="1.5"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        style={{ transformOrigin: "200px 350px" }}
      />
      <motion.path
        d="M200 280 C175 272 140 258 125 235 C110 212 118 198 140 205 C162 212 192 252 200 280Z"
        fill="#e8f5d4"
        stroke="#7bc462"
        strokeWidth="1.2"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        style={{ transformOrigin: "200px 280px" }}
      />
      <motion.path
        d="M200 200 C178 194 150 182 138 163 C126 144 132 132 150 138 C168 144 192 174 200 200Z"
        fill="#d4edbc"
        stroke="#2b6e1a"
        strokeWidth="1"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        style={{ transformOrigin: "200px 200px" }}
      />
      {/* Right leaves */}
      <motion.path
        d="M200 320 C230 312 275 295 295 268 C315 241 306 225 282 234 C258 243 210 288 200 320Z"
        fill="#e8f5d4"
        stroke="#7bc462"
        strokeWidth="1.2"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.8 }}
        style={{ transformOrigin: "200px 320px" }}
      />
      <motion.path
        d="M200 240 C222 234 255 222 270 202 C285 182 278 170 260 176 C242 182 208 212 200 240Z"
        fill="#d4edbc"
        stroke="#2b6e1a"
        strokeWidth="1.2"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        style={{ transformOrigin: "200px 240px" }}
      />
      <motion.path
        d="M200 160 C218 155 242 146 255 130 C268 114 262 104 248 109 C234 114 208 138 200 160Z"
        fill="#e8f5d4"
        stroke="#7bc462"
        strokeWidth="1"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        style={{ transformOrigin: "200px 160px" }}
      />
      {/* Top bud */}
      <motion.path
        d="M200 60 C190 50 185 30 200 20 C215 30 210 50 200 60Z"
        fill="#7bc462"
        stroke="#2b6e1a"
        strokeWidth="1"
        initial={{ scale: 0,  opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.6 }}
        style={{ transformOrigin: "200px 40px" }}
      />
      {/* Leaf veins */}
      <motion.path
        d="M200 350 C180 335 140 310 110 275"
        stroke="#2b6e1a"
        strokeWidth="0.6"
        fill="none"
        opacity={0.3}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      />
      <motion.path
        d="M200 320 C225 305 265 278 290 255"
        stroke="#2b6e1a"
        strokeWidth="0.6"
        fill="none"
        opacity={0.3}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      />
    </svg>
  )
}

function MoleculeHexSVG({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" fill="none" className={className}>
      <motion.path
        d="M60 10 L105 35 L105 85 L60 110 L15 85 L15 35Z"
        stroke="#2b6e1a"
        strokeWidth="1.5"
        fill="none"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
      />
      <motion.circle cx="60" cy="10" r="4" fill="#7bc462" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }} />
      <motion.circle cx="105" cy="35" r="4" fill="#d4edbc" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }} />
      <motion.circle cx="105" cy="85" r="4" fill="#7bc462" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.7 }} />
      <motion.circle cx="60" cy="110" r="4" fill="#d4edbc" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.9 }} />
      <motion.circle cx="15" cy="85" r="4" fill="#7bc462" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 1.1 }} />
      <motion.circle cx="15" cy="35" r="4" fill="#d4edbc" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 1.3 }} />
      {/* Inner bonds */}
      <motion.line x1="60" y1="10" x2="60" y2="110" stroke="#2b6e1a" strokeWidth="0.5" opacity={0.2} initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ delay: 1.5 }} />
      <motion.line x1="15" y1="35" x2="105" y2="85" stroke="#2b6e1a" strokeWidth="0.5" opacity={0.2} initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ delay: 1.6 }} />
      <motion.line x1="105" y1="35" x2="15" y2="85" stroke="#2b6e1a" strokeWidth="0.5" opacity={0.2} initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ delay: 1.7 }} />
      {/* Center */}
      <motion.text x="60" y="64" textAnchor="middle" fill="#2b6e1a" fontSize="14" fontWeight="bold" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 2 }}>OH</motion.text>
    </svg>
  )
}

function ProcessSVG({ step }: { step: number }) {
  const svgs: { [key: number]: JSX.Element } = {
    1: (
      <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
        <motion.path d="M40 65V30" stroke="#2b6e1a" strokeWidth="2.5" strokeLinecap="round" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} />
        <motion.path d="M40 40C30 38 18 28 18 18C28 18 38 28 40 40Z" fill="#d4edbc" stroke="#2b6e1a" strokeWidth="1.5" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.4, duration: 0.5 }} style={{ transformOrigin: "40px 40px" }} />
        <motion.path d="M40 32C50 30 62 20 62 10C52 10 42 20 40 32Z" fill="#e8f5d4" stroke="#7bc462" strokeWidth="1.5" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.6, duration: 0.5 }} style={{ transformOrigin: "40px 32px" }} />
        <motion.ellipse cx="40" cy="68" rx="12" ry="4" fill="#2b6e1a" opacity={0.08} initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.8 }} />
      </svg>
    ),
    2: (
      <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
        <motion.circle cx="40" cy="40" r="14" fill="#e8f5d4" stroke="#2b6e1a" strokeWidth="1.5" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <motion.line key={i} x1={40 + 18 * Math.cos((angle * Math.PI) / 180)} y1={40 + 18 * Math.sin((angle * Math.PI) / 180)} x2={40 + 30 * Math.cos((angle * Math.PI) / 180)} y2={40 + 30 * Math.sin((angle * Math.PI) / 180)} stroke="#7bc462" strokeWidth="2" strokeLinecap="round" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }} />
        ))}
      </svg>
    ),
    3: (
      <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
        <motion.path d="M40 10C40 10 20 30 20 45C20 55 28 65 40 65C52 65 60 55 60 45C60 30 40 10 40 10Z" fill="#e8f5d4" stroke="#2b6e1a" strokeWidth="1.5" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }} style={{ transformOrigin: "40px 40px" }} />
        <motion.path d="M30 45 C33 42 37 44 40 42 C43 40 47 42 50 45" stroke="#7bc462" strokeWidth="1.5" fill="none" strokeLinecap="round" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ delay: 0.6, duration: 0.6 }} />
      </svg>
    ),
    4: (
      <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
        <motion.path d="M28 12H52V30L62 65H18L28 30V12Z" fill="#e8f5d4" stroke="#2b6e1a" strokeWidth="1.5" strokeLinejoin="round" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ transformOrigin: "40px 40px" }} />
        <motion.line x1="24" y1="12" x2="56" y2="12" stroke="#2b6e1a" strokeWidth="2" strokeLinecap="round" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ delay: 0.4, duration: 0.4 }} />
        <motion.circle cx="35" cy="45" r="3" fill="#7bc462" opacity={0.5} initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.7 }} />
        <motion.circle cx="46" cy="52" r="2" fill="#2b6e1a" opacity={0.3} initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.8 }} />
        <motion.circle cx="38" cy="56" r="2.5" fill="#7bc462" opacity={0.4} initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.9 }} />
      </svg>
    ),
    5: (
      <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
        <motion.path d="M40 8L58 22L52 55H28L22 22L40 8Z" fill="#e8f5d4" stroke="#2b6e1a" strokeWidth="1.5" strokeLinejoin="round" initial={{ scale: 0, rotate: -20 }} whileInView={{ scale: 1, rotate: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, type: "spring" }} style={{ transformOrigin: "40px 35px" }} />
        <motion.line x1="40" y1="8" x2="40" y2="55" stroke="#7bc462" strokeWidth="0.6" opacity={0.4} initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ delay: 0.6, duration: 0.6 }} />
        <motion.line x1="22" y1="22" x2="58" y2="22" stroke="#7bc462" strokeWidth="0.6" opacity={0.4} initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ delay: 0.7, duration: 0.6 }} />
        <motion.text x="40" y="75" textAnchor="middle" fill="#2b6e1a" fontSize="8" fontWeight="600" opacity={0.3} initial={{ opacity: 0 }} whileInView={{ opacity: 0.3 }} viewport={{ once: true }} transition={{ delay: 1 }}>99%</motion.text>
      </svg>
    ),
    6: (
      <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
        <motion.rect x="15" y="25" width="50" height="40" rx="8" fill="#e8f5d4" stroke="#2b6e1a" strokeWidth="1.5" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ transformOrigin: "40px 45px" }} />
        <motion.path d="M15 35H65" stroke="#2b6e1a" strokeWidth="1" opacity={0.2} initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ delay: 0.5, duration: 0.4 }} />
        <motion.path d="M32 15 L40 25 L48 15" stroke="#7bc462" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.5 }} />
        <Leaf x={30} y={38} width={20} height={20} className="text-[#2b6e1a]" opacity={0.15} />
      </svg>
    ),
  }
  return svgs[step] || svgs[1]
}

/* ═══════════════════════════════════════════════
   ANIMATED COUNTER
   ═══════════════════════════════════════════════ */
function AnimatedCounter({ value, suffix = "", prefix = "" }: { value: number; suffix?: string; prefix?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const motionVal = useMotionValue(0)
  const springVal = useSpring(motionVal, { stiffness: 50, damping: 20 })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (isInView) motionVal.set(value)
  }, [isInView, motionVal, value])

  useEffect(() => {
    const unsub = springVal.on("change", (v) => setDisplay(Math.round(v)))
    return unsub
  }, [springVal])

  return (
    <span ref={ref}>
      {prefix}{display}{suffix}
    </span>
  )
}

/* ═══════════════════════════════════════════════
   HORIZONTAL SCROLL SECTION
   ═══════════════════════════════════════════════ */
const productionSteps = [
  {
    step: 1,
    title: "Culture",
    subtitle: "Stevia rebaudiana Bertoni",
    description: "Cultivée sans pesticides, dans un sol riche en matière organique. Les feuilles concentrent les molécules sucrantes — la récolte se fait 3 à 4 mois après plantation, avant la floraison.",
    details: ["Climat subtropical/tropical", "Sol bien drainé", "Récolte pré-floraison"],
    icon: Leaf,
  },
  {
    step: 2,
    title: "Séchage",
    subtitle: "Préservation des glycosides",
    description: "Les feuilles fraîches sont séchées par air chaud contrôlé pour réduire l'humidité sous 10%, préservant les molécules sucrantes intactes.",
    details: ["Air chaud contrôlé", "Humidité < 10%", "Préservation optimale"],
    icon: Sun,
  },
  {
    step: 3,
    title: "Extraction",
    subtitle: "Procédé aqueux naturel",
    description: "Les feuilles broyées sont infusées dans de l'eau chaude. Le liquide est filtré puis purifié via des résines échangeuses d'ions pour isoler les glycosides.",
    details: ["Broyage des feuilles", "Extraction à l'eau chaude", "Filtration & purification", "Résines échangeuses d'ions", "Concentration du liquide"],
    icon: Droplets,
  },
  {
    step: 4,
    title: "Cristallisation",
    subtitle: "Formation des cristaux",
    description: "Les glycosides isolés sont cristallisés de manière contrôlée puis séchés. Le résultat : une poudre blanche d'une pureté de 95 à 99%.",
    details: ["Isolation du Reb-A", "Cristallisation contrôlée", "Séchage final"],
    icon: FlaskConical,
  },
  {
    step: 5,
    title: "Purification",
    subtitle: "Pureté maximale",
    description: "Des étapes de purification supplémentaires éliminent les traces d'amertume. Plus le taux de Rebaudioside A est élevé, plus le goût est pur et neutre.",
    details: ["Élimination de l'amertume", "Pureté ≥95%", "Souvent 97-98%"],
    icon: Sparkles,
  },
  {
    step: 6,
    title: "Conditionnement",
    subtitle: "Transformation finale",
    description: "Selon le produit final : mélange avec érythritol, mise en poudre, comprimés ou forme liquide. Emballage éco-responsable fabriqué localement.",
    details: ["Poudre / Comprimés / Liquide", "Mélange érythritol 1:1", "Emballage écologique"],
    icon: Package,
  },
]

const molecules = [
  { name: "Rebaudioside A", description: "Le plus utilisé — goût propre, moins d'amertume", highlight: true, power: "200-400x" },
  { name: "Stevioside", description: "Molécule historique, légèrement amère", highlight: false, power: "150-300x" },
  { name: "Rebaudioside D", description: "Profil gustatif très propre, premium", highlight: false, power: "200-350x" },
  { name: "Rebaudioside M", description: "Le plus pur, quasi-zéro arrière-goût", highlight: false, power: "250-350x" },
  { name: "Rebaudioside C", description: "Profil aromatique unique", highlight: false, power: "100-200x" },
]

/* ═══════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════════ */
export default function DetailPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] })
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  // Parallax values for hero section
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] })
  const heroY = useTransform(heroProgress, [0, 1], [0, 150])
  const heroOpacity = useTransform(heroProgress, [0, 0.6], [1, 0])
  const heroScale = useTransform(heroProgress, [0, 0.6], [1, 0.95])

  // Horizontal scroll for production steps
  const hScrollRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: hScrollProgress } = useScroll({ target: hScrollRef, offset: ["start start", "end end"] })
  const hX = useTransform(hScrollProgress, [0, 1], ["0%", "-65%"])

  return (
    <div ref={containerRef} className="min-h-screen bg-[#fafdf7]">
      {/* ── Progress bar ── */}
      <motion.div
        className="fixed top-0 left-0 h-[2px] bg-gradient-to-r from-[#2b6e1a] via-[#7bc462] to-[#d4edbc] z-50"
        style={{ width: progressWidth }}
      />

      {/* ── Fixed Nav ── */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-40 py-4"
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-[#2b6e1a] hover:text-[#7bc462] transition-colors group">
            <motion.div whileHover={{ x: -4 }} className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white/80 backdrop-blur-sm border border-[#2b6e1a]/10 flex items-center justify-center shadow-sm">
                <ArrowLeft className="w-4 h-4" />
              </div>
              <span className="font-semibold text-sm hidden md:block">Retour</span>
            </motion.div>
          </Link>
          <motion.div
            className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-[#2b6e1a]/10 shadow-sm"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span className="text-sm font-bold text-[#1a3a0e]">🌿 Guide Stévia</span>
          </motion.div>
        </div>
      </motion.nav>

      {/* ═══════════════════════════════════════════
          HERO — Full-screen immersive
          ═══════════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background patterns */}
        <div className="absolute inset-0 pattern-dots" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#e8f5d4]/30 via-transparent to-[#fafdf7]" />

        {/* Floating ambient blobs */}
        <motion.div
          className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-[#d4edbc]/15 blur-[150px]"
          animate={{ scale: [1, 1.15, 1], x: [0, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-[#a8d5ba]/10 blur-[130px]"
          animate={{ scale: [1.1, 1, 1.1], y: [0, -30, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Floating molecule hexagons */}
        <motion.div
          className="absolute top-[15%] right-[10%] w-20 h-20 opacity-[0.08]"
          animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        >
          <MoleculeHexSVG className="w-full h-full" />
        </motion.div>
        <motion.div
          className="absolute bottom-[25%] left-[8%] w-16 h-16 opacity-[0.06]"
          animate={{ y: [0, 12, 0], rotate: [0, -8, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        >
          <MoleculeHexSVG className="w-full h-full" />
        </motion.div>

        <motion.div
          className="relative z-10 max-w-7xl mx-auto px-6 w-full"
          style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen pt-20 pb-10">
            {/* Left — Text */}
            <div className="text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-[#2b6e1a] font-semibold text-xs uppercase tracking-widest mb-8 shadow-sm border border-[#2b6e1a]/5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Guide Complet
              </motion.div>

              <motion.h1
                className="text-5xl md:text-6xl lg:text-7xl font-black text-[#1a3a0e] leading-[0.95] mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                Tout sur la
                <br />
                <span className="relative inline-block mt-2">
                  <span className="text-gradient-hero">Stévia</span>
                  <motion.svg
                    className="absolute -bottom-2 left-0 w-full h-4"
                    viewBox="0 0 200 12"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 1.2, duration: 1 }}
                  >
                    <motion.path
                      d="M2 8 C40 2 80 10 120 4 C160 -2 180 8 198 6"
                      stroke="#7bc462"
                      strokeWidth="3"
                      strokeLinecap="round"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 1.2, duration: 1 }}
                    />
                  </motion.svg>
                </span>
              </motion.h1>

              <motion.p
                className="text-lg text-[#5a8f4a]/70 max-w-md mb-10 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                De la plante à votre tasse — découvrez le processus de production,
                les molécules sucrantes et la science derrière <em>Stevia rebaudiana</em>.
              </motion.p>

              {/* Key stats inline */}
              <motion.div
                className="flex flex-wrap gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                {[
                  { value: 400, suffix: "x", label: "Plus sucrant" },
                  { value: 0, suffix: "", label: "Calories" },
                  { value: 99, suffix: "%", label: "Pureté" },
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-3xl md:text-4xl font-black text-gradient-hero">
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-xs text-[#5a8f4a]/50 font-medium mt-1">{stat.label}</div>
                  </div>
                ))}
              </motion.div>

              <motion.div
                className="mt-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <motion.a
                  href="#processus"
                  className="btn-primary inline-flex items-center gap-2 text-sm"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Explorer le processus
                  <ChevronDown className="w-4 h-4" />
                </motion.a>
              </motion.div>
            </div>

            {/* Right — Stevia plant SVG */}
            <motion.div
              className="relative w-full max-w-md mx-auto lg:mx-0"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              {/* Glow behind plant */}
              <div className="absolute inset-0 bg-[#d4edbc]/15 rounded-full blur-[80px] scale-75" />
              <SteviaSVG />

              {/* Floating labels */}
              <motion.div
                className="absolute top-[30%] -left-4 md:left-[-10%] px-3 py-1.5 bg-white rounded-lg shadow-sm border border-[#2b6e1a]/5 text-[10px] font-semibold text-[#2b6e1a]"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2, duration: 0.5 }}
              >
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#7bc462]" />
                  Glycosides
                </div>
              </motion.div>

              <motion.div
                className="absolute top-[55%] -right-4 md:right-[-5%] px-3 py-1.5 bg-white rounded-lg shadow-sm border border-[#2b6e1a]/5 text-[10px] font-semibold text-[#2b6e1a]"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2.3, duration: 0.5 }}
              >
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#d4edbc]" />
                  Reb-A 95%
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          style={{ opacity: heroOpacity }}
        >
          <ChevronDown className="w-6 h-6 text-[#2b6e1a]/30" />
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 1 — Production Process (Horizontal Scroll)
          ═══════════════════════════════════════════ */}
      <section ref={hScrollRef} id="processus" className="relative h-[400vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-[#f3f8ee]" />
          <div className="absolute inset-0 pattern-grid" />

          {/* Header — fixed while horizontal scrolling */}
          <div className="absolute top-0 left-0 right-0 z-10 pt-12 pb-6 px-6 bg-gradient-to-b from-[#f3f8ee] via-[#f3f8ee]/90 to-transparent">
            <div className="max-w-7xl mx-auto flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#2b6e1a] flex items-center justify-center">
                <Factory className="w-5 h-5 text-[#d4edbc]" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-[#1a3a0e]">Processus de Production</h2>
                <p className="text-sm text-[#5a8f4a]/60">De la plante à la poudre cristalline</p>
              </div>
            </div>

            {/* Progress dots */}
            <div className="max-w-7xl mx-auto mt-6 flex items-center gap-2">
              {productionSteps.map((_, i) => (
                <motion.div
                  key={i}
                  className="h-[3px] flex-1 rounded-full bg-[#2b6e1a]/10 overflow-hidden"
                >
                  <motion.div
                    className="h-full bg-[#2b6e1a] rounded-full"
                    style={{
                      scaleX: useTransform(
                        hScrollProgress,
                        [(i) / productionSteps.length, (i + 1) / productionSteps.length],
                        [0, 1]
                      ),
                      transformOrigin: "left",
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Horizontal sliding cards */}
          <motion.div
            className="flex items-center h-full pt-32 pb-12 px-8 md:px-16 gap-8"
            style={{ x: hX }}
          >
            {productionSteps.map((item, index) => (
              <div key={index} className="flex-shrink-0 w-[85vw] sm:w-[70vw] md:w-[50vw] lg:w-[38vw]">
                <motion.div
                  className="relative h-full rounded-2xl bg-white border border-[#2b6e1a]/5 overflow-hidden shadow-sm hover:shadow-lg hover:shadow-[#2b6e1a]/5 transition-shadow duration-500 p-8 md:p-10"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  {/* Step number watermark */}
                  <div className="absolute top-6 right-6 text-6xl md:text-7xl font-black text-[#2b6e1a]/[0.03] select-none leading-none">
                    {String(item.step).padStart(2, "0")}
                  </div>

                  {/* SVG Illustration */}
                  <div className="w-20 h-20 md:w-24 md:h-24 mb-6">
                    <ProcessSVG step={item.step} />
                  </div>

                  <div className="text-xs font-semibold text-[#7bc462] uppercase tracking-widest mb-1">
                    Étape {item.step}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-[#1a3a0e] mb-1">{item.title}</h3>
                  <p className="text-xs text-[#5a8f4a]/50 italic mb-5">{item.subtitle}</p>

                  <p className="text-sm text-[#5a8f4a]/70 leading-relaxed mb-6">{item.description}</p>

                  <div className="space-y-2">
                    {item.details.map((detail, di) => (
                      <div key={di} className="flex items-center gap-2.5 text-xs text-[#1a3a0e]/70">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#7bc462] flex-shrink-0" />
                        {detail}
                      </div>
                    ))}
                  </div>

                  {/* Bottom accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#7bc462] to-[#d4edbc]" />
                </motion.div>
              </div>
            ))}

            {/* Final summary card */}
            <div className="flex-shrink-0 w-[85vw] sm:w-[70vw] md:w-[50vw] lg:w-[38vw]">
              <div className="relative h-full rounded-2xl bg-gradient-to-br from-[#1a3a0e] to-[#2b6e1a] p-8 md:p-10 text-white overflow-hidden">
                <svg className="absolute inset-0 w-full h-full opacity-[0.03]" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice">
                  <pattern id="proc-dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1" fill="white" />
                  </pattern>
                  <rect width="400" height="400" fill="url(#proc-dots)" />
                </svg>
                <div className="relative">
                  <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center mb-6">
                    <Sparkles className="w-7 h-7 text-[#d4edbc]" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-extrabold mb-3">Résultat Final</h3>
                  <p className="text-white/50 text-sm mb-8">Une poudre blanche d&apos;une pureté exceptionnelle, prête à être transformée en produits finis.</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className="text-2xl font-black text-[#d4edbc]">95-99%</div>
                      <div className="text-xs text-white/40">Pureté</div>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className="text-2xl font-black text-[#d4edbc]">0</div>
                      <div className="text-xs text-white/40">Calorie</div>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className="text-2xl font-black text-[#d4edbc]">300x</div>
                      <div className="text-xs text-white/40">Pouvoir sucrant</div>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className="text-2xl font-black text-[#d4edbc]">100%</div>
                      <div className="text-xs text-white/40">Naturel</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 2 — Molecules
          ═══════════════════════════════════════════ */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#f3f8ee] via-white to-[#fafdf7]" />

        {/* Decorative molecule SVGs */}
        <MoleculeHexSVG className="absolute top-20 right-[5%] w-32 h-32 opacity-[0.03]" />
        <MoleculeHexSVG className="absolute bottom-20 left-[5%] w-24 h-24 opacity-[0.02]" />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left — Explanation */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-[#2b6e1a] font-semibold text-xs uppercase tracking-widest mb-6 shadow-sm"
              >
                <Beaker className="w-3.5 h-3.5" />
                Glycosides de Stéviol
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-[#1a3a0e] mb-6"
              >
                Les Molécules Sucrantes
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-[#5a8f4a]/70 leading-relaxed mb-8"
              >
                Les glycosides de stéviol sont les composés naturels responsables du pouvoir sucrant de la Stévia.
                Ils offrent une douceur <strong className="text-[#1a3a0e]">200 à 400 fois supérieure</strong> au sucre
                ordinaire, sans calories et avec un impact minimal sur la glycémie.
              </motion.p>

              {/* Info cards */}
              <div className="space-y-3">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-[#e8f5d4]/50 border border-[#d4edbc]/30"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#2b6e1a] flex items-center justify-center flex-shrink-0">
                    <Zap className="w-5 h-5 text-[#d4edbc]" />
                  </div>
                  <div>
                    <div className="font-bold text-[#1a3a0e] text-sm">200-400× plus sucrant</div>
                    <div className="text-xs text-[#5a8f4a]/50">que le sucre ordinaire (saccharose)</div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-[#e8f5d4]/50 border border-[#d4edbc]/30"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#7bc462] flex items-center justify-center flex-shrink-0">
                    <Heart className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-[#1a3a0e] text-sm">0 calorie, 0 index glycémique</div>
                    <div className="text-xs text-[#5a8f4a]/50">idéal pour les diabétiques et les régimes</div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Right — Molecule grid */}
            <div className="space-y-4">
              {molecules.map((molecule, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -3 }}
                  className={`relative p-5 rounded-xl border transition-all duration-300 ${
                    molecule.highlight
                      ? "bg-[#2b6e1a] border-[#2b6e1a] text-white"
                      : "bg-white border-[#2b6e1a]/5 hover:border-[#7bc462]/20 hover:shadow-lg hover:shadow-[#2b6e1a]/5"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${molecule.highlight ? "bg-white/15" : "bg-[#e8f5d4]"}`}>
                        <Beaker className={`w-4 h-4 ${molecule.highlight ? "text-[#d4edbc]" : "text-[#2b6e1a]"}`} />
                      </div>
                      <div>
                        <h4 className={`font-bold text-sm ${molecule.highlight ? "" : "text-[#1a3a0e]"}`}>{molecule.name}</h4>
                        <p className={`text-xs mt-0.5 ${molecule.highlight ? "text-white/60" : "text-[#5a8f4a]/50"}`}>{molecule.description}</p>
                      </div>
                    </div>
                    <div className={`text-right flex-shrink-0 ${molecule.highlight ? "" : ""}`}>
                      <div className={`text-sm font-extrabold ${molecule.highlight ? "text-[#d4edbc]" : "text-[#7bc462]"}`}>{molecule.power}</div>
                      <div className={`text-[10px] ${molecule.highlight ? "text-white/40" : "text-[#5a8f4a]/30"}`}>pouvoir sucrant</div>
                    </div>
                  </div>
                  {molecule.highlight && (
                    <span className="absolute top-2 right-2 px-2 py-0.5 bg-[#d4edbc] text-[#1a3a0e] text-[9px] font-bold uppercase tracking-wider rounded-full">
                      Principal
                    </span>
                  )}
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="p-4 rounded-xl border-2 border-dashed border-[#d4edbc]/30 text-center"
              >
                <span className="text-xs text-[#5a8f4a]/30">+ Autres glycosides mineurs (Reb-C, Dulcoside A…)</span>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 3 — Rebaudioside A Deep Dive
          ═══════════════════════════════════════════ */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d1f08] via-[#1a3a0e] to-[#0d1f08]" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.02]" viewBox="0 0 600 600" preserveAspectRatio="xMidYMid slice">
          <pattern id="reb-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="0.8" fill="white" />
          </pattern>
          <rect width="600" height="600" fill="url(#reb-grid)" />
        </svg>

        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-[#2b6e1a]/15 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#7bc462]/5 rounded-full blur-[150px]" />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[#7bc462] font-semibold text-xs uppercase tracking-widest mb-6"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Molécule Star
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-white mb-5"
            >
              Rebaudioside A
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-white/40 max-w-2xl mx-auto"
            >
              Le glycoside le plus utilisé dans l&apos;industrie. Goût pur, stabilité thermique,
              polyvalence — la référence mondiale.
            </motion.p>
          </div>

          {/* Feature grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
            {[
              { icon: CheckCircle2, title: "Goût Propre", desc: "Profil gustatif supérieur au stevioside" },
              { icon: Heart, title: "Moins d'Amertume", desc: "Arrière-goût minimal, quasi imperceptible" },
              { icon: Zap, title: "Stabilité Thermique", desc: "Résiste à la cuisson haute température" },
              { icon: Globe, title: "Polyvalent", desc: "Boissons, pâtisserie, pharma, B2B…" },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-[#2b6e1a] flex items-center justify-center mb-4">
                  <feature.icon className="w-5 h-5 text-[#d4edbc]" />
                </div>
                <h4 className="text-white font-bold text-sm mb-1">{feature.title}</h4>
                <p className="text-white/30 text-xs leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-3 gap-4 p-8 rounded-2xl bg-white/[0.03] border border-white/[0.06]"
          >
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-black text-[#d4edbc]">
                <AnimatedCounter value={300} suffix="x" />
              </div>
              <div className="text-xs text-white/30 mt-1">Pouvoir sucrant moyen</div>
            </div>
            <div className="text-center border-x border-white/[0.06]">
              <div className="text-3xl md:text-4xl font-black text-[#d4edbc]">≥95%</div>
              <div className="text-xs text-white/30 mt-1">Pureté standard</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-black text-[#d4edbc]">97-98%</div>
              <div className="text-xs text-white/30 mt-1">Pureté Biosweet</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-8 p-5 rounded-xl bg-[#7bc462]/10 border border-[#7bc462]/20 text-center"
          >
            <p className="text-sm text-[#d4edbc]/80">
              💡 Plus le taux de Reb-A est élevé, moins il y a d&apos;arrière-goût amer.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 4 — Products
          ═══════════════════════════════════════════ */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#fafdf7] via-white to-[#f3f8ee]" />
        <div className="absolute inset-0 pattern-dots" />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-[#2b6e1a] font-semibold text-xs uppercase tracking-widest mb-6 shadow-sm"
            >
              <Package className="w-3.5 h-3.5" />
              Nos Produits
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-[#1a3a0e] mb-5"
            >
              Formats Disponibles
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-[#5a8f4a]/70 max-w-2xl mx-auto"
            >
              Du professionnel au particulier — une gamme complète à base de stévia.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: FlaskConical,
                title: "Poudre Pure Reb-A",
                description: "Pour l'industrie agroalimentaire",
                details: ["Conditionnement : 1kg, 5kg, 25kg", "Pureté ≥95%", "Usage professionnel"],
              },
              {
                icon: Package,
                title: "Stévia + Érythritol",
                description: "Alternative directe au sucre",
                details: ["Usage domestique", "Ratio 1:1 avec le sucre", "Goût naturel"],
              },
              {
                icon: Droplets,
                title: "Forme Liquide",
                description: "Gouttes concentrées",
                details: ["Idéal pour café & thé", "Dosage précis", "Format nomade"],
              },
              {
                icon: Pill,
                title: "Comprimés",
                description: "Format ultra-pratique",
                details: ["CHR & hôtellerie", "Dosage individuel", "Zéro déchet"],
              },
              {
                icon: Building2,
                title: "Ingrédient B2B",
                description: "Solutions industrielles",
                details: ["Boissons light", "Yaourts & desserts", "Compléments alimentaires"],
              },
            ].map((product, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -5 }}
                className="group relative p-6 md:p-8 rounded-2xl bg-white border border-[#2b6e1a]/5 hover:border-[#7bc462]/20 hover:shadow-lg hover:shadow-[#2b6e1a]/5 transition-all duration-500"
              >
                <div className="absolute top-5 right-5 text-4xl font-black text-[#2b6e1a]/[0.03] select-none">
                  {String(i + 1).padStart(2, "0")}
                </div>

                <div className="w-12 h-12 rounded-xl bg-[#e8f5d4] flex items-center justify-center mb-5 group-hover:bg-[#2b6e1a] transition-colors duration-300">
                  <product.icon className="w-6 h-6 text-[#2b6e1a] group-hover:text-[#d4edbc] transition-colors duration-300" />
                </div>

                <h4 className="text-lg font-extrabold text-[#1a3a0e] mb-1">{product.title}</h4>
                <p className="text-xs text-[#5a8f4a]/50 mb-4">{product.description}</p>

                <div className="space-y-2">
                  {product.details.map((d, di) => (
                    <div key={di} className="flex items-center gap-2 text-xs text-[#1a3a0e]/60">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#7bc462] flex-shrink-0" />
                      {d}
                    </div>
                  ))}
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#7bc462] to-[#d4edbc] opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}

            {/* Custom solution card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative p-6 md:p-8 rounded-2xl border-2 border-dashed border-[#d4edbc]/40 flex flex-col items-center justify-center text-center hover:border-[#7bc462]/40 transition-colors"
            >
              <div className="text-3xl mb-3">🤝</div>
              <h4 className="font-extrabold text-[#1a3a0e] mb-2">Solution Personnalisée</h4>
              <p className="text-xs text-[#5a8f4a]/50 mb-4">Formulation sur-mesure pour vos besoins</p>
              <Link
                href="/#contact"
                className="btn-secondary text-xs flex items-center gap-1.5"
              >
                Nous contacter
                <ExternalLink className="w-3 h-3" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 5 — About Biosweet / CTA
          ═══════════════════════════════════════════ */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[#f3f8ee]" />
        <div className="absolute inset-0 pattern-grid" />

        <div className="relative max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl bg-gradient-to-br from-[#1a3a0e] to-[#2b6e1a] p-10 md:p-16 text-white overflow-hidden"
          >
            {/* Grid overlay */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.03]" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
              <pattern id="cta-grid" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="0.8" fill="white" />
              </pattern>
              <rect width="400" height="300" fill="url(#cta-grid)" />
            </svg>

            {/* Ambient glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#7bc462]/10 rounded-full blur-[100px]" />

            <div className="relative grid md:grid-cols-2 gap-10 items-center">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                    <Globe className="w-6 h-6 text-[#d4edbc]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold">Biosweet</h3>
                    <p className="text-white/40 text-xs">Producteur & Transformateur de Stévia</p>
                  </div>
                </div>

                <p className="text-white/50 text-sm leading-relaxed mb-8">
                  De la culture de <em>Stevia rebaudiana</em> à la production de Rebaudioside A haute pureté,
                  nous maîtrisons toute la chaîne — extraction, cristallisation et conditionnement sur‑mesure.
                </p>

                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/#contact"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#1a3a0e] font-semibold rounded-xl text-sm hover:bg-[#d4edbc] transition-colors"
                  >
                    Nous Contacter
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/#boutique"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-semibold rounded-xl text-sm hover:bg-white/20 transition-colors border border-white/10"
                  >
                    Voir la Boutique
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Leaf, title: "Culture", desc: "Conditions optimales" },
                  { icon: FlaskConical, title: "Extraction", desc: "Glycosides naturels" },
                  { icon: Sparkles, title: "Production", desc: "Reb-A haute pureté" },
                  { icon: Package, title: "Packaging", desc: "Éco-responsable" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="p-4 rounded-xl bg-white/5 border border-white/5"
                  >
                    <item.icon className="w-5 h-5 text-[#d4edbc] mb-2" />
                    <h4 className="text-sm font-semibold mb-0.5">{item.title}</h4>
                    <p className="text-[10px] text-white/30">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FOOTER
          ═══════════════════════════════════════════ */}
      <footer className="relative bg-[#1a3a0e] text-white py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🌿</span>
            <span className="font-bold text-sm">Biosweet</span>
            <span className="text-white/20 text-xs ml-2">© 2026</span>
          </div>
          <Link href="/" className="flex items-center gap-2 text-[#7bc462] hover:text-[#d4edbc] transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" />
            Retour à l&apos;accueil
          </Link>
        </div>
      </footer>
    </div>
  )
}
