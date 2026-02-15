"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Plus, Star, Leaf, Award } from "lucide-react"
import { useCart } from "./cart-context"
import { useHapticFeedback } from "./haptic-feedback"

const products = [
  {
    id: 1,
    name: "Sucre Cristal Premium",
    description: "Cristaux purs et brillants, parfaits pour le quotidien. Saveur délicate et dissolution rapide.",
    price: 450,
    image: "/premium-white-sugar-crystals-glass-jar-luxury-pack.jpg",
    rating: 4.9,
    reviews: 234,
    badge: "Best-seller",
    features: ["100% Bio", "Sans additifs", "Cristaux fins"],
  },
  {
    id: 2,
    name: "Sucre Roux Naturel",
    description: "Notes caramélisées subtiles, idéal pour pâtisserie et boissons chaudes. Riche en minéraux.",
    price: 520,
    image: "/organic-brown-sugar-natural-raw-caramel-color-luxu.jpg",
    rating: 4.8,
    reviews: 189,
    badge: "Nouveau",
    features: ["Minéraux préservés", "Goût caramel", "Artisanal"],
  },
  {
    id: 3,
    name: "Sucre Vanillé Bio",
    description: "Infusé à la vanille naturelle. L'alliance parfaite de la douceur et de l'arôme.",
    price: 680,
    image: "/vanilla-sugar-organic-premium-vanilla-pod-natural.jpg",
    rating: 5.0,
    reviews: 156,
    badge: "Premium",
    features: ["Vanille naturelle", "Infusion naturelle", "Édition limitée"],
  },
  {
    id: 4,
    name: "Sucre de Coco",
    description: "Alternative saine au sucre traditionnel. Index glycémique bas et saveur exotique unique.",
    price: 780,
    image: "/coconut-sugar-organic-brown-sustainable-tropical-n.jpg",
    rating: 4.7,
    reviews: 98,
    badge: "Healthy",
    features: ["IG bas", "Riche en potassium", "Saveur unique"],
  },
]

function ProductCard({ product, index }: { product: (typeof products)[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isFlipped, setIsFlipped] = useState(false)
  const { addItem } = useCart()
  const { success } = useHapticFeedback()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  const handleAddToCart = () => {
    success()
    addItem(product)
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="group perspective-1000 w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setIsFlipped(false) }}
      onTouchEnd={() => { if (!isFlipped) success() }}
    >
      <motion.div
        className="relative h-[460px] md:h-[500px] cursor-pointer preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden backface-hidden card-organic" style={{ backfaceVisibility: "hidden" }}>
          {/* Badge */}
          <div className="absolute top-5 left-5 z-10">
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: index * 0.12 + 0.3, type: "spring" }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#2b6e1a] text-white text-xs font-bold rounded-full"
            >
              <Award className="w-3 h-3" />
              {product.badge}
            </motion.span>
          </div>

          {/* Product image */}
          <div className="relative h-52 md:h-56 flex items-center justify-center p-6 bg-gradient-to-b from-[#f3f8ee] to-transparent">
            {/* SVG decoration behind product */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none" viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="60" stroke="#2b6e1a" strokeWidth="0.5" fill="none" />
              <circle cx="100" cy="100" r="80" stroke="#2b6e1a" strokeWidth="0.3" fill="none" strokeDasharray="4 4" />
            </svg>

            <motion.div
              animate={{ y: isHovered ? -8 : 0, scale: isHovered ? 1.04 : 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="relative w-36 h-36 md:w-44 md:h-44 object-contain drop-shadow-lg"
              />
            </motion.div>
          </div>

          {/* Content */}
          <div className="p-5 md:p-6 pt-2">
            {/* Rating */}
            <div className="flex items-center gap-2 mb-2.5">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? "text-amber-400 fill-amber-400" : "text-[#d4edbc] fill-[#d4edbc]"}`}
                  />
                ))}
              </div>
              <span className="text-xs text-[#5a8f4a]/60 font-medium">({product.reviews})</span>
            </div>

            <h3 className="text-lg md:text-xl font-extrabold text-[#1a3a0e] mb-1.5">{product.name}</h3>
            <p className="text-sm text-[#5a8f4a]/70 mb-4 line-clamp-2 leading-relaxed">{product.description}</p>

            {/* Features */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {product.features.slice(0, 2).map((feature, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#e8f5d4] text-[#2b6e1a] text-[11px] font-semibold rounded-full"
                >
                  <Leaf className="w-2.5 h-2.5" />
                  {feature}
                </span>
              ))}
            </div>

            {/* Price & Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-[#2b6e1a]/5">
              <div>
                <span className="text-2xl font-extrabold text-[#1a3a0e]">{product.price}</span>
                <span className="text-sm text-[#5a8f4a]/50 ml-1 font-medium">DZD</span>
              </div>
              <div className="flex gap-2">
                <motion.button
                  onClick={() => setIsFlipped(true)}
                  className="px-4 py-2 text-xs font-semibold text-[#2b6e1a] border border-[#2b6e1a]/15 rounded-full hover:bg-[#e8f5d4] transition-colors"
                  whileTap={{ scale: 0.95 }}
                >
                  Détails
                </motion.button>
                <motion.button
                  onClick={handleAddToCart}
                  className="p-2.5 bg-[#2b6e1a] text-white rounded-full active:scale-90 transition-transform"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                >
                  <Plus className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden backface-hidden bg-gradient-to-br from-[#1a3a0e] to-[#2b6e1a] p-6 flex flex-col justify-between"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          {/* Decorative SVG */}
          <svg className="absolute top-0 right-0 w-40 h-40 opacity-[0.06] pointer-events-none" viewBox="0 0 200 200">
            <path d="M44.7,-76.4C58.8,-69.2,71.8,-58.5,79.6,-44.9C87.3,-31.2,89.8,-15.6,88.5,-0.8C87.2,14.1,82,28.1,73.8,40.3C65.5,52.5,54.3,62.8,41.2,70.1C28.1,77.4,14.1,81.6,-0.7,82.8C-15.5,84,-31.1,82.1,-43.6,74.6Z" transform="translate(100 100)" fill="white" />
          </svg>

          <div>
            <h3 className="text-xl md:text-2xl font-extrabold text-white mb-4">{product.name}</h3>
            <p className="text-white/70 text-sm mb-6 leading-relaxed">{product.description}</p>
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-[#d4edbc] uppercase tracking-wider">Caractéristiques</h4>
              {product.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-3 text-white/80 text-sm">
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Leaf className="w-3 h-3 text-[#d4edbc]" />
                  </div>
                  {feature}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3 mt-6">
            <div className="flex items-center justify-between text-white">
              <span className="text-3xl font-extrabold">{product.price} DZD</span>
              <span className="text-white/50 text-sm">/ 500g</span>
            </div>
            <motion.button
              onClick={() => { handleAddToCart(); setIsFlipped(false) }}
              className="w-full py-3 bg-white text-[#1a3a0e] rounded-full font-bold text-base active:scale-[0.98] transition-transform"
              whileTap={{ scale: 0.98 }}
            >
              Ajouter au panier
            </motion.button>
            <button
              onClick={() => setIsFlipped(false)}
              className="w-full py-2 text-white/60 text-sm hover:text-white transition-colors"
            >
              ← Retour
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function ProductsSection() {
  const titleRef = useRef(null)
  const isTitleInView = useInView(titleRef, { once: true, margin: "-100px" })
  const [currentIndex, setCurrentIndex] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  const scrollToProduct = (index: number) => {
    setCurrentIndex(index)
    if (scrollRef.current) {
      const productWidth = scrollRef.current.offsetWidth
      scrollRef.current.scrollTo({ left: index * productWidth, behavior: "smooth" })
    }
  }

  return (
    <section id="produits" className="relative section-padding overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-[#fafdf7] to-white" />
      <div className="absolute inset-0 pattern-dots" />

      {/* SVG Decoration - top left leaf cluster */}
      <svg className="absolute top-20 left-0 w-[300px] h-[300px] opacity-[0.03] pointer-events-none" viewBox="0 0 300 300" fill="none">
        <path d="M150 30C150 30 80 80 60 150C40 220 100 270 150 270C200 270 260 220 240 150C220 80 150 30 150 30Z" stroke="#2b6e1a" strokeWidth="1.5" />
        <path d="M150 60C150 60 150 270 150 270" stroke="#2b6e1a" strokeWidth="1" />
        <path d="M150 120C120 115 80 135 80 135" stroke="#2b6e1a" strokeWidth="0.8" />
        <path d="M150 170C180 165 220 180 220 180" stroke="#2b6e1a" strokeWidth="0.8" />
      </svg>

      {/* SVG Decoration - bottom right */}
      <svg className="absolute bottom-10 right-0 w-[250px] h-[250px] opacity-[0.03] pointer-events-none" viewBox="0 0 200 200">
        <circle cx="100" cy="100" r="80" stroke="#2b6e1a" strokeWidth="0.5" fill="none" />
        <circle cx="100" cy="100" r="60" stroke="#2b6e1a" strokeWidth="0.3" fill="none" strokeDasharray="3 5" />
        <circle cx="100" cy="100" r="40" stroke="#2b6e1a" strokeWidth="0.3" fill="none" />
      </svg>

      {/* Subtle ambient blobs */}
      <div className="absolute top-40 -left-20 w-60 md:w-80 h-60 md:h-80 bg-[#d4edbc]/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-40 -right-20 w-72 md:w-96 h-72 md:h-96 bg-[#a8d5ba]/15 rounded-full blur-[100px]" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-6">
        {/* Section header */}
        <div ref={titleRef} className="text-center mb-12 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#e8f5d4] rounded-full text-[#2b6e1a] font-semibold text-xs uppercase tracking-widest mb-6"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" /></svg>
            Collection Premium
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-[#1a3a0e] mb-5"
          >
            Nos Produits
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base md:text-lg text-[#5a8f4a]/70 max-w-2xl mx-auto px-4"
          >
            Chaque variété est soigneusement sélectionnée et produite en Algérie 
            pour offrir une expérience gustative unique.
          </motion.p>

          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isTitleInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-8 mx-auto w-16 h-[2px] bg-gradient-to-r from-transparent via-[#7bc462] to-transparent"
          />
        </div>

        {/* Mobile carousel */}
        <div className="md:hidden">
          <div
            ref={scrollRef}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-4 pb-4 -mx-4 px-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {products.map((product, index) => (
              <div key={product.id} className="flex-shrink-0 w-[85vw] snap-center">
                <ProductCard product={product} index={index} />
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-2 mt-6">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToProduct(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-[#2b6e1a] w-6" : "bg-[#d4edbc]"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Desktop grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
