"use client"

import { motion } from "framer-motion"
import { Instagram, Facebook, Youtube, ArrowUp } from "lucide-react"
import { AnimatedLogo } from "./animated-logo"

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const footerLinks = {
    produits: [
      { name: "Sucre Cristal", href: "#produits" },
      { name: "Sucre Roux", href: "#produits" },
      { name: "Sucre Vanillé", href: "#produits" },
      { name: "Sucre de Coco", href: "#produits" },
    ],
    entreprise: [
      { name: "Notre Histoire", href: "#innovation" },
      { name: "Nos Engagements", href: "#innovation" },
      { name: "Carrières", href: "#" },
      { name: "Presse", href: "#" },
    ],
    support: [
      { name: "FAQ", href: "#" },
      { name: "Contact", href: "#contact" },
      { name: "Livraison", href: "#boutique" },
      { name: "Retours", href: "#" },
    ],
    legal: [
      { name: "CGV", href: "#" },
      { name: "Confidentialité", href: "#" },
      { name: "Cookies", href: "#" },
      { name: "Mentions Légales", href: "#" },
    ],
  }

  const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Youtube, href: "#", label: "Youtube" },
  ]

  return (
    <footer className="relative bg-[#1a3a0e] text-white overflow-hidden">
      {/* Decorative SVG pattern */}
      <svg className="absolute top-0 left-0 right-0 w-full h-16 opacity-[0.04]" preserveAspectRatio="none" viewBox="0 0 1200 60" fill="none">
        <pattern id="footer-dots" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill="white" />
        </pattern>
        <rect width="1200" height="60" fill="url(#footer-dots)" />
      </svg>

      {/* Ambient blurs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-[#2b6e1a]/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#7bc462]/5 rounded-full blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-8">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <a href="#hero">
                <AnimatedLogo size="md" showText={true} />
              </a>
            </div>
            <p className="text-white/50 text-sm mb-6 max-w-xs leading-relaxed">
              Le sucre bio qui vit avec la nature. Une douceur responsable, 100% algérienne, pour un monde meilleur.
            </p>

            {/* Social Links */}
            <div className="flex gap-2">
              {socialLinks.map((social, index) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center hover:bg-[#7bc462]/20 transition-colors border border-white/5"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon className="w-4 h-4 text-white/60" />
                  </motion.a>
                )
              })}
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-[#7bc462] mb-4 uppercase text-xs tracking-widest">{category}</h4>
              <ul className="space-y-2.5">
                {links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <motion.a
                      href={link.href}
                      className="text-white/40 hover:text-[#d4edbc] transition-colors text-sm"
                      whileHover={{ x: 3 }}
                    >
                      {link.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="p-8 md:p-10 rounded-2xl bg-white/[0.03] border border-white/[0.06] mb-12"
        >
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className="text-lg md:text-xl font-extrabold mb-2">Rejoignez la communauté Biosweet</h3>
              <p className="text-white/40 text-sm">
                Recevez nos recettes exclusives, offres spéciales et actualités.
              </p>
            </div>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Votre email"
                className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#7bc462]/40 transition-colors text-sm"
              />
              <motion.button
                className="px-6 py-3 bg-[#2b6e1a] text-[#d4edbc] rounded-xl font-semibold text-sm whitespace-nowrap hover:bg-[#2b6e1a]/80 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
              >
                {"S'inscrire"}
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/[0.06]">
          <p className="text-white/30 text-xs">© 2025 Biosweet. Tous droits réservés. Fabriqué avec soin en Algérie.</p>

          <motion.button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-white/30 hover:text-[#7bc462] transition-colors group"
            whileHover={{ y: -2 }}
          >
            <span className="text-xs">Retour en haut</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </motion.button>
        </div>
      </div>
    </footer>
  )
}
