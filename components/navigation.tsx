"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ShoppingBag, Sparkles } from "lucide-react"
import { useCart } from "./cart-context"
import { AnimatedLogo } from "./animated-logo"
import Link from "next/link"

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { items, setIsOpen } = useCart()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Accueil", href: "#hero" },
    { name: "Innovation", href: "#innovation" },
    { name: "Produits", href: "#produits" },
    { name: "Boutique", href: "#boutique" },
    { name: "Recettes", href: "#recettes" },
    { name: "Contact", href: "#contact" },
  ]

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "py-2 md:py-3"
            : "py-4 md:py-6"
        }`}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 border-b transition-all duration-500"
          style={{
            background: isScrolled ? "rgba(250, 253, 247, 0.85)" : "transparent",
            backdropFilter: isScrolled ? "blur(20px) saturate(180%)" : "none",
            WebkitBackdropFilter: isScrolled ? "blur(20px) saturate(180%)" : "none",
            borderColor: isScrolled ? "rgba(43, 110, 26, 0.06)" : "transparent",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#hero" className="relative z-10">
            <AnimatedLogo size="sm" showText={true} />
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="relative px-4 py-2 text-sm font-medium text-[#5a8f4a] hover:text-[#2b6e1a] transition-colors rounded-full hover:bg-[#d4edbc]/20"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 + 0.2 }}
              >
                {item.name}
              </motion.a>
            ))}
            
            <div className="w-[1px] h-5 bg-[#2b6e1a]/10 mx-2" />
            
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Link
                href="/detaile"
                className="inline-flex items-center gap-2 px-5 py-2 bg-[#2b6e1a] text-white text-sm font-semibold rounded-full hover:bg-[#1a3a0e] transition-all duration-300 hover:shadow-lg hover:shadow-[#2b6e1a]/15"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Guide Stévia
              </Link>
            </motion.div>
          </div>

          {/* Right section */}
          <div className="flex items-center gap-2">
            {/* Cart */}
            <motion.button
              className="relative p-2.5 rounded-full text-[#5a8f4a] hover:text-[#2b6e1a] hover:bg-[#d4edbc]/20 transition-all"
              whileTap={{ scale: 0.92 }}
              onClick={() => setIsOpen(true)}
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 bg-[#2b6e1a] text-white text-[10px] rounded-full flex items-center justify-center font-bold"
                >
                  {totalItems}
                </motion.span>
              )}
            </motion.button>

            {/* Mobile menu toggle */}
            <motion.button
              className="lg:hidden p-2.5 rounded-full text-[#5a8f4a] hover:text-[#2b6e1a] hover:bg-[#d4edbc]/20 transition-all"
              whileTap={{ scale: 0.92 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-[#fafdf7]/95 backdrop-blur-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Decoration SVG */}
            <svg className="absolute bottom-0 right-0 w-[60vw] h-[60vw] opacity-[0.03] pointer-events-none" viewBox="0 0 200 200">
              <path
                d="M44.7,-76.4C58.8,-69.2,71.8,-58.5,79.6,-44.9C87.3,-31.2,89.8,-15.6,88.5,-0.8C87.2,14.1,82,28.1,73.8,40.3C65.5,52.5,54.3,62.8,41.2,70.1C28.1,77.4,14.1,81.6,-0.7,82.8C-15.5,84,-31.1,82.1,-43.6,74.6C-56.1,67.1,-65.6,54,-73.4,40.1C-81.2,26.2,-87.3,11.6,-86.4,-2.5C-85.5,-16.6,-77.5,-30.5,-67.2,-41.5C-56.9,-52.5,-44.2,-60.7,-31,-67.8C-17.8,-75,-8.9,-81.1,3.5,-87.2C15.9,-93.2,31.7,-99.2,44.7,-76.4Z"
                transform="translate(100 100)"
                fill="#2b6e1a"
              />
            </svg>

            <div className="relative flex flex-col items-center justify-center h-full gap-1 p-8">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="text-2xl font-bold text-[#1a3a0e] hover:text-[#7bc462] transition-colors py-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: index * 0.06 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </motion.a>
              ))}
              
              <motion.div
                className="mt-6 pt-6 border-t border-[#2b6e1a]/10 w-32"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              />
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-4"
              >
                <Link
                  href="/detaile"
                  className="inline-flex items-center gap-3 px-8 py-3.5 bg-[#2b6e1a] text-white text-lg font-semibold rounded-full"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Sparkles className="w-5 h-5" />
                  Guide Stévia
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
