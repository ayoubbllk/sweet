"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion"
import { Home, Sparkles, ShoppingBag, BookOpen, MessageCircle } from "lucide-react"
import { useCart } from "./cart-context"

export function MobileBottomNav() {
  const [activeSection, setActiveSection] = useState("hero")
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const { items, setIsOpen } = useCart()
  const { scrollY } = useScroll()

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0)

  const navItems = [
    { id: "hero", icon: Home, label: "Accueil" },
    { id: "produits", icon: Sparkles, label: "Produits" },
    { id: "boutique", icon: ShoppingBag, label: "Boutique", badge: totalItems },
    { id: "recettes", icon: BookOpen, label: "Recettes" },
    { id: "contact", icon: MessageCircle, label: "Contact" },
  ]

  useMotionValueEvent(scrollY, "change", (latest) => {
    const direction = latest > lastScrollY ? "down" : "up"
    if (direction === "down" && latest > 100) {
      setIsVisible(false)
    } else {
      setIsVisible(true)
    }
    setLastScrollY(latest)
  })

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "innovation", "produits", "boutique", "recettes", "contact"]
      const scrollPosition = window.scrollY + window.innerHeight / 2

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavClick = (id: string) => {
    if (id === "boutique") {
      setIsOpen(true)
    } else {
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
    setActiveSection(id)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-[400] md:hidden"
        >
          <div className="mx-4 mb-4 p-2 rounded-2xl bg-white/80 backdrop-blur-xl border border-[#d4edbc]/50 shadow-lg shadow-[#2b6e1a]/10">
            <div className="flex items-center justify-around">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="relative flex flex-col items-center gap-1 p-2 min-w-[60px]"
                  whileTap={{ scale: 0.9 }}
                >
                  <motion.div
                    className={`relative p-2 rounded-xl transition-colors ${
                      activeSection === item.id ? "bg-[#2b6e1a] text-white" : "text-[#2b6e1a]/60"
                    }`}
                    animate={activeSection === item.id ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.badge !== undefined && item.badge > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 w-4 h-4 bg-[#d4edbc] text-[#2b6e1a] text-[10px] font-bold rounded-full flex items-center justify-center"
                      >
                        {item.badge}
                      </motion.span>
                    )}
                  </motion.div>
                  <span
                    className={`text-[10px] font-medium ${
                      activeSection === item.id ? "text-[#2b6e1a]" : "text-[#2b6e1a]/60"
                    }`}
                  >
                    {item.label}
                  </span>

                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute -bottom-1 w-1 h-1 bg-[#2b6e1a] rounded-full"
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}

export function MobilePageIndicator({ sections }: { sections: string[] }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", () => {
    const scrollPosition = window.scrollY + window.innerHeight / 3

    sections.forEach((section, index) => {
      const element = document.getElementById(section)
      if (element) {
        const { offsetTop, offsetHeight } = element
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveIndex(index)
        }
      }
    })
  })

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-[350] md:hidden">
      <div className="flex flex-col gap-2">
        {sections.map((_, index) => (
          <motion.div
            key={index}
            className="relative"
            animate={{
              height: index === activeIndex ? 24 : 8,
              width: 4,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className={`w-full h-full rounded-full ${index === activeIndex ? "bg-[#2b6e1a]" : "bg-[#d4edbc]"}`} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
