"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Clock, Users, ChefHat, Heart, BookOpen, Play, UtensilsCrossed } from "lucide-react"
import { useHapticFeedback } from "./haptic-feedback"

const recipes = [
  {
    id: 1,
    title: "Makroud aux Dattes",
    image: "/makroud-algerian-pastry-dates-semolina-traditional.jpg",
    time: "60 min",
    servings: 20,
    difficulty: "Intermédiaire",
    likes: 456,
    sugarType: "Sucre Cristal Premium",
  },
  {
    id: 2,
    title: "Baklawa Algéroise",
    image: "/baklava-algerian-pastry-honey-nuts-traditional-swe.jpg",
    time: "90 min",
    servings: 30,
    difficulty: "Avancé",
    likes: 523,
    sugarType: "Sucre Cristal Premium",
  },
  {
    id: 3,
    title: "Zlabia Traditionnelle",
    image: "/zlabia-algerian-sweet-fried-pastry-honey-syrup-ram.jpg",
    time: "45 min",
    servings: 15,
    difficulty: "Intermédiaire",
    likes: 389,
    sugarType: "Sucre Cristal Premium",
  },
  {
    id: 4,
    title: "Kalb El Louz",
    image: "/kalb-el-louz-algerian-semolina-almond-cake-traditi.jpg",
    time: "50 min",
    servings: 12,
    difficulty: "Facile",
    likes: 312,
    sugarType: "Sucre Vanillé Bio",
  },
  {
    id: 5,
    title: "Griwech au Miel",
    image: "/griwech-algerian-fried-pastry-honey-sesame-traditi.jpg",
    time: "75 min",
    servings: 25,
    difficulty: "Expert",
    likes: 278,
    sugarType: "Sucre Roux Naturel",
  },
  {
    id: 6,
    title: "Tcharak Msaker",
    image: "/tcharak-algerian-crescent-pastry-almond-powdered-s.jpg",
    time: "40 min",
    servings: 20,
    difficulty: "Facile",
    likes: 345,
    sugarType: "Sucre Cristal Premium",
  },
]

function RecipeCard({ recipe, index }: { recipe: (typeof recipes)[0]; index: number }) {
  const [isLiked, setIsLiked] = useState(false)
  const { light, success } = useHapticFeedback()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  const handleLike = () => {
    success()
    setIsLiked(!isLiked)
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <motion.div
        className="relative rounded-2xl overflow-hidden bg-white border border-[#2b6e1a]/5 shadow-sm hover:shadow-lg hover:shadow-[#2b6e1a]/5 transition-all duration-500"
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <motion.img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a3a0e]/60 via-transparent to-transparent" />

          {/* Play button */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          >
            <motion.button
              className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg"
              whileTap={{ scale: 0.9 }}
              onClick={() => light()}
            >
              <Play className="w-5 h-5 text-[#2b6e1a] ml-0.5" fill="#2b6e1a" />
            </motion.button>
          </motion.div>

          {/* Like button */}
          <motion.button
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm"
            onClick={handleLike}
            whileTap={{ scale: 0.85 }}
          >
            <Heart
              className={`w-4 h-4 transition-colors ${isLiked ? "text-red-500 fill-red-500" : "text-[#1a3a0e]/60"}`}
            />
          </motion.button>

          {/* Sugar Type Badge */}
          <div className="absolute bottom-3 left-3">
            <span className="px-2.5 py-1 bg-[#e8f5d4] text-[#2b6e1a] text-[10px] md:text-xs font-semibold rounded-full">
              {recipe.sugarType}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 md:p-6">
          <h3 className="text-base md:text-lg font-extrabold text-[#1a3a0e] mb-2.5 group-hover:text-[#2b6e1a] transition-colors">
            {recipe.title}
          </h3>

          <div className="flex items-center gap-3 text-xs text-[#5a8f4a]/60 mb-4">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {recipe.time}
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              {recipe.servings}
            </div>
            <div className="flex items-center gap-1">
              <ChefHat className="w-3 h-3" />
              <span className="hidden sm:inline">{recipe.difficulty}</span>
              <span className="sm:hidden">{recipe.difficulty.slice(0, 3)}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-[#5a8f4a]/40">
              <Heart className="w-3.5 h-3.5" />
              <span className="text-xs">{recipe.likes + (isLiked ? 1 : 0)}</span>
            </div>
            <motion.button
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#e8f5d4]/60 text-[#2b6e1a] rounded-lg text-xs font-medium hover:bg-[#e8f5d4] transition-colors active:scale-95"
              whileTap={{ scale: 0.95 }}
              onClick={() => light()}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Voir la recette</span>
              <span className="sm:hidden">Voir</span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function RecipesSection() {
  const [selectedCategory, setSelectedCategory] = useState("Toutes")
  const categories = ["Toutes", "Pâtisserie", "Ramadan", "Fêtes", "Healthy"]
  const titleRef = useRef(null)
  const isTitleInView = useInView(titleRef, { once: true })
  const { light } = useHapticFeedback()

  return (
    <section id="recettes" className="relative section-padding overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-[#fafdf7] to-[#f3f8ee]" />

      {/* Decorative SVG */}
      <svg className="absolute bottom-0 right-0 w-[300px] h-[300px] opacity-[0.02] pointer-events-none" viewBox="0 0 300 300" fill="none">
        <path d="M150 20C150 20 60 80 40 170C20 260 120 290 150 290C180 290 280 260 260 170C240 80 150 20 150 20Z" stroke="#2b6e1a" strokeWidth="1.5" />
        <path d="M150 50V290" stroke="#2b6e1a" strokeWidth="1" />
        <path d="M150 120C120 118 80 140 80 140" stroke="#2b6e1a" strokeWidth="0.8" />
        <path d="M150 180C180 178 220 195 220 195" stroke="#2b6e1a" strokeWidth="0.8" />
      </svg>

      {/* Ambient blur */}
      <div className="absolute top-20 left-10 w-60 h-60 bg-[#d4edbc]/15 rounded-full blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-10 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-[#2b6e1a] font-semibold text-xs uppercase tracking-widest mb-6 shadow-sm"
          >
            <UtensilsCrossed className="w-3.5 h-3.5" />
            Recettes
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-[#1a3a0e] mb-5"
          >
            Recettes Traditionnelles
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base md:text-lg text-[#5a8f4a]/70 max-w-2xl mx-auto mb-8"
          >
            Redécouvrez les saveurs authentiques de la pâtisserie algérienne.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex md:flex-wrap md:justify-center gap-2 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4 md:mx-0 md:px-0"
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => {
                  light()
                  setSelectedCategory(category)
                }}
                className={`flex-shrink-0 px-4 py-2 rounded-lg font-medium text-xs transition-all active:scale-95 ${
                  selectedCategory === category
                    ? "bg-[#2b6e1a] text-white"
                    : "bg-[#e8f5d4]/50 text-[#2b6e1a] hover:bg-[#e8f5d4]"
                }`}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>
        </div>

        {/* Mobile horizontal scroll */}
        <div className="md:hidden">
          <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-4 pb-4 -mx-4 px-4">
            {recipes.map((recipe, index) => (
              <div key={recipe.id} className="flex-shrink-0 w-[80vw] snap-center">
                <RecipeCard recipe={recipe} index={index} />
              </div>
            ))}
          </div>
          <motion.p
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ delay: 4, duration: 1 }}
            className="text-center text-xs text-[#5a8f4a]/40 mt-2"
          >
            ← Glissez pour voir plus →
          </motion.p>
        </div>

        {/* Desktop grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe, index) => (
            <RecipeCard key={recipe.id} recipe={recipe} index={index} />
          ))}
        </div>

        {/* Load More */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-10 md:mt-14"
        >
          <motion.button
            className="btn-secondary text-sm"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
          >
            Voir toutes les recettes
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
