"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { Leaf, Beaker, Sun, Droplets, Sprout, Recycle } from "lucide-react"

const processSteps = [
  {
    icon: Sprout,
    title: "Culture Biologique",
    description: "Nos cultures sont développées sans pesticides ni engrais chimiques, dans le respect total de l'écosystème algérien.",
  },
  {
    icon: Sun,
    title: "Énergie Solaire",
    description: "100% de notre production est alimentée par l'énergie solaire abondante du Sahara algérien.",
  },
  {
    icon: Droplets,
    title: "Irrigation Intelligente",
    description: "Système d'irrigation goutte-à-goutte connecté pour une utilisation optimale de l'eau.",
  },
  {
    icon: Beaker,
    title: "Extraction Douce",
    description: "Processus breveté d'extraction à basse température préservant tous les nutriments naturels.",
  },
  {
    icon: Leaf,
    title: "Cristallisation Pure",
    description: "Cristaux formés naturellement sans additifs, pour une pureté exceptionnelle certifiée.",
  },
  {
    icon: Recycle,
    title: "Emballage Écologique",
    description: "Packaging 100% recyclable, fabriqué localement pour réduire notre empreinte carbone.",
  },
]

/* ── Step SVG Icons (unique for each step) ─────── */
const stepSvgs = [
  // Sprout
  <svg key="sprout" viewBox="0 0 48 48" fill="none" className="w-full h-full">
    <path d="M24 38V22" stroke="#2b6e1a" strokeWidth="2" strokeLinecap="round" />
    <path d="M24 28C18 28 14 22 14 16C20 16 24 20 24 28Z" fill="#d4edbc" stroke="#2b6e1a" strokeWidth="1.5" />
    <path d="M24 24C30 24 34 18 34 12C28 12 24 16 24 24Z" fill="#e8f5d4" stroke="#7bc462" strokeWidth="1.5" />
    <circle cx="24" cy="40" r="2" fill="#2b6e1a" opacity="0.3" />
  </svg>,
  // Sun
  <svg key="sun" viewBox="0 0 48 48" fill="none" className="w-full h-full">
    <circle cx="24" cy="24" r="8" fill="#e8f5d4" stroke="#2b6e1a" strokeWidth="1.5" />
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
      <line key={i} x1="24" y1="24" x2={24 + 16 * Math.cos((angle * Math.PI) / 180)} y2={24 + 16 * Math.sin((angle * Math.PI) / 180)} stroke="#7bc462" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    ))}
  </svg>,
  // Water
  <svg key="water" viewBox="0 0 48 48" fill="none" className="w-full h-full">
    <path d="M24 8C24 8 12 22 12 30C12 36.627 17.373 42 24 42C30.627 42 36 36.627 36 30C36 22 24 8 24 8Z" fill="#e8f5d4" stroke="#2b6e1a" strokeWidth="1.5" />
    <path d="M20 30C20 30 22 28 24 30C26 32 28 30 28 30" stroke="#7bc462" strokeWidth="1.5" strokeLinecap="round" fill="none" />
  </svg>,
  // Beaker
  <svg key="beaker" viewBox="0 0 48 48" fill="none" className="w-full h-full">
    <path d="M18 8H30V20L38 38H10L18 20V8Z" fill="#e8f5d4" stroke="#2b6e1a" strokeWidth="1.5" strokeLinejoin="round" />
    <line x1="16" y1="8" x2="32" y2="8" stroke="#2b6e1a" strokeWidth="2" strokeLinecap="round" />
    <path d="M14 32H34" stroke="#7bc462" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
    <circle cx="22" cy="28" r="2" fill="#7bc462" opacity="0.4" />
    <circle cx="28" cy="34" r="1.5" fill="#7bc462" opacity="0.3" />
  </svg>,
  // Crystal
  <svg key="crystal" viewBox="0 0 48 48" fill="none" className="w-full h-full">
    <path d="M24 4L38 16L32 44H16L10 16L24 4Z" fill="#e8f5d4" stroke="#2b6e1a" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M24 4L24 44" stroke="#7bc462" strokeWidth="0.8" opacity="0.4" />
    <path d="M10 16L38 16" stroke="#7bc462" strokeWidth="0.8" opacity="0.4" />
    <path d="M16 44L24 4L32 44" stroke="#7bc462" strokeWidth="0.5" opacity="0.3" fill="none" />
  </svg>,
  // Recycle
  <svg key="recycle" viewBox="0 0 48 48" fill="none" className="w-full h-full">
    <circle cx="24" cy="24" r="16" fill="#e8f5d4" stroke="#2b6e1a" strokeWidth="1.5" />
    <path d="M18 20L24 14L30 20" stroke="#2b6e1a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <path d="M24 14V30" stroke="#2b6e1a" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M18 28L24 34L30 28" stroke="#7bc462" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>,
]

function ProcessCard({ step, index }: { step: (typeof processSteps)[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      <motion.div
        className="relative p-6 md:p-8 rounded-2xl bg-white border border-[#2b6e1a]/5 overflow-hidden h-full transition-all duration-500 hover:shadow-lg hover:shadow-[#2b6e1a]/5 hover:border-[#7bc462]/20"
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {/* Step number */}
        <div className="absolute top-5 right-5 text-4xl font-black text-[#2b6e1a]/[0.04] select-none">
          {String(index + 1).padStart(2, "0")}
        </div>

        {/* SVG Icon */}
        <div className="w-14 h-14 mb-5">
          {stepSvgs[index]}
        </div>

        <h3 className="text-lg font-extrabold text-[#1a3a0e] mb-2.5">{step.title}</h3>
        <p className="text-sm text-[#5a8f4a]/70 leading-relaxed">{step.description}</p>

        {/* Bottom accent line */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#7bc462] to-[#d4edbc]"
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.4 }}
          style={{ transformOrigin: "left" }}
        />
      </motion.div>
    </motion.div>
  )
}

export function InnovationSection() {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -60])
  const titleRef = useRef(null)
  const isTitleInView = useInView(titleRef, { once: true, margin: "-100px" })
  const statsRef = useRef(null)
  const isStatsInView = useInView(statsRef, { once: true, margin: "-80px" })

  return (
    <section ref={containerRef} id="innovation" className="relative section-padding overflow-hidden">
      {/* Background */}
      <motion.div className="absolute inset-0 bg-[#f3f8ee]" style={{ y: backgroundY }} />
      <div className="absolute inset-0 pattern-grid" />

      {/* Decorative SVG - large leaf outline */}
      <svg className="absolute top-0 right-0 w-[500px] h-[500px] opacity-[0.02] pointer-events-none" viewBox="0 0 500 500" fill="none">
        <path d="M250 50C250 50 100 150 70 280C40 410 170 470 250 470C330 470 460 410 430 280C400 150 250 50 250 50Z" stroke="#2b6e1a" strokeWidth="2" />
        <path d="M250 100C250 100 250 470 250 470" stroke="#2b6e1a" strokeWidth="1.5" />
        <path d="M250 200C200 195 140 230 140 230" stroke="#2b6e1a" strokeWidth="1" />
        <path d="M250 280C300 275 360 300 360 300" stroke="#2b6e1a" strokeWidth="1" />
        <path d="M250 350C210 345 160 370 160 370" stroke="#2b6e1a" strokeWidth="0.8" />
      </svg>

      {/* Ambient blurs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#d4edbc]/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#a8d5ba]/15 rounded-full blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Title */}
        <div ref={titleRef} className="text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-[#2b6e1a] font-semibold text-xs uppercase tracking-widest mb-6 shadow-sm"
          >
            <Leaf className="w-3.5 h-3.5" />
            Notre Processus
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-[#1a3a0e] mb-5"
          >
            Innovation & Nature
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base md:text-lg text-[#5a8f4a]/70 max-w-2xl mx-auto"
          >
            La fusion parfaite entre technologie de pointe et savoir-faire algérien. 
            Chaque grain de sucre Biosweet raconte une histoire d&apos;innovation durable.
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={isTitleInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-8 mx-auto w-16 h-[2px] bg-gradient-to-r from-transparent via-[#7bc462] to-transparent"
          />
        </div>

        {/* Image Grid */}
        <div className="grid lg:grid-cols-2 gap-6 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden aspect-[4/3] group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#d4edbc]/40 to-[#f3f8ee]" />
            <img
              src="/modern-laboratory-biotech-sugar-production-futuris.jpg"
              alt="Laboratoire Biosweet"
              className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-70 transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a3a0e]/60 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <h3 className="text-xl font-extrabold text-white mb-1">Science Bio-Tech</h3>
              <p className="text-white/70 text-sm">Laboratoires certifiés aux normes internationales</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden aspect-[4/3] group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#e8f5d4]/40 to-[#f3f8ee]" />
            <img
              src="/organic-plantation-sunrise-golden-hour-nature-alge.jpg"
              alt="Plantation Biosweet Algérie"
              className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-70 transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a3a0e]/60 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <h3 className="text-xl font-extrabold text-white mb-1">Terroir Algérien</h3>
              <p className="text-white/70 text-sm">Plantations certifiées Agriculture Biologique</p>
            </div>
          </motion.div>
        </div>

        {/* Process Steps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {processSteps.map((step, index) => (
            <ProcessCard key={index} step={step} index={index} />
          ))}
        </div>

        {/* Stats */}
        <motion.div
          ref={statsRef}
          initial={{ opacity: 0, y: 40 }}
          animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mt-20 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 p-8 md:p-12 rounded-2xl bg-white/80 backdrop-blur-sm border border-[#2b6e1a]/5"
        >
          {[
            { value: "100%", label: "Produit Algérien" },
            { value: "0", label: "Pesticides" },
            { value: "58", label: "Wilayas Livrées" },
            { value: "-40%", label: "Empreinte Carbone" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isStatsInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="text-3xl md:text-4xl font-black text-gradient-hero mb-1">{stat.value}</div>
              <div className="text-xs md:text-sm text-[#5a8f4a]/60 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
