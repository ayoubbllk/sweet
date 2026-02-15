"use client"

import type React from "react"
import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { MapPin, Phone, Mail, Send, Clock, CheckCircle, Leaf } from "lucide-react"
import { useHapticFeedback } from "./haptic-feedback"

export function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const titleRef = useRef(null)
  const isTitleInView = useInView(titleRef, { once: true })
  const { light, success } = useHapticFeedback()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    light()
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSubmitted(true)
    success()
  }

  return (
    <section id="contact" className="relative section-padding overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f3f8ee] via-white to-[#e8f5d4]/30" />
      <div className="absolute inset-0 pattern-dots" />

      {/* Decorative SVG */}
      <svg className="absolute top-0 left-0 w-[400px] h-[400px] opacity-[0.03] pointer-events-none" viewBox="0 0 400 400" fill="none">
        <circle cx="200" cy="200" r="180" stroke="#2b6e1a" strokeWidth="1" />
        <circle cx="200" cy="200" r="140" stroke="#2b6e1a" strokeWidth="0.8" />
        <circle cx="200" cy="200" r="100" stroke="#2b6e1a" strokeWidth="0.6" />
        <circle cx="200" cy="200" r="60" stroke="#2b6e1a" strokeWidth="0.4" />
      </svg>

      {/* Ambient blurs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#d4edbc]/15 rounded-full blur-[120px]" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#a8d5ba]/10 rounded-full blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-12 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-[#2b6e1a] font-semibold text-xs uppercase tracking-widest mb-6 shadow-sm"
          >
            <Mail className="w-3.5 h-3.5" />
            Contact
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-[#1a3a0e] mb-5"
          >
            Restons Connectés
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base md:text-lg text-[#5a8f4a]/70 max-w-2xl mx-auto"
          >
            Une question ou une suggestion ? Notre équipe est à votre écoute.
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={isTitleInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-8 mx-auto w-16 h-[2px] bg-gradient-to-r from-transparent via-[#7bc462] to-transparent"
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="relative p-6 md:p-10 rounded-2xl bg-white border border-[#2b6e1a]/5 shadow-sm">
              {/* Decorative corner leaf */}
              <svg className="absolute top-4 right-4 w-8 h-8 opacity-[0.06]" viewBox="0 0 32 32" fill="none">
                <path d="M16 28V12" stroke="#2b6e1a" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M16 18C10 18 6 12 6 6C12 6 16 10 16 18Z" fill="#2b6e1a" />
                <path d="M16 14C22 14 26 8 26 2C20 2 16 6 16 14Z" fill="#2b6e1a" />
              </svg>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8 md:py-12"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", bounce: 0.5 }}
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#e8f5d4] flex items-center justify-center mx-auto mb-5"
                  >
                    <CheckCircle className="w-8 h-8 md:w-10 md:h-10 text-[#2b6e1a]" />
                  </motion.div>
                  <h3 className="text-xl md:text-2xl font-extrabold text-[#1a3a0e] mb-3">Message Envoyé!</h3>
                  <p className="text-[#5a8f4a]/70 mb-6 text-sm md:text-base">
                    Merci pour votre message. Notre équipe vous répondra sous 24h.
                  </p>
                  <motion.button
                    onClick={() => setIsSubmitted(false)}
                    className="btn-secondary text-sm"
                    whileTap={{ scale: 0.95 }}
                  >
                    Envoyer un autre message
                  </motion.button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-[#1a3a0e] uppercase tracking-wider mb-2">Nom</label>
                      <motion.input
                        type="text"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        onFocus={() => setFocusedField("name")}
                        onBlur={() => setFocusedField(null)}
                        className="w-full px-4 py-3 rounded-xl bg-[#fafdf7] border border-[#2b6e1a]/10 text-[#1a3a0e] placeholder-[#5a8f4a]/40 focus:outline-none focus:border-[#7bc462] focus:ring-2 focus:ring-[#7bc462]/10 transition-all text-base"
                        placeholder="Votre nom"
                        required
                        animate={{ scale: focusedField === "name" ? 1.01 : 1 }}
                        style={{ fontSize: "16px" }}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#1a3a0e] uppercase tracking-wider mb-2">Email</label>
                      <motion.input
                        type="email"
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                        className="w-full px-4 py-3 rounded-xl bg-[#fafdf7] border border-[#2b6e1a]/10 text-[#1a3a0e] placeholder-[#5a8f4a]/40 focus:outline-none focus:border-[#7bc462] focus:ring-2 focus:ring-[#7bc462]/10 transition-all text-base"
                        placeholder="votre@email.com"
                        required
                        animate={{ scale: focusedField === "email" ? 1.01 : 1 }}
                        style={{ fontSize: "16px" }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1a3a0e] uppercase tracking-wider mb-2">Sujet</label>
                    <motion.select
                      value={formState.subject}
                      onChange={(e) => {
                        light()
                        setFormState({ ...formState, subject: e.target.value })
                      }}
                      onFocus={() => setFocusedField("subject")}
                      onBlur={() => setFocusedField(null)}
                      className="w-full px-4 py-3 rounded-xl bg-[#fafdf7] border border-[#2b6e1a]/10 text-[#1a3a0e] focus:outline-none focus:border-[#7bc462] focus:ring-2 focus:ring-[#7bc462]/10 transition-all text-base"
                      required
                      animate={{ scale: focusedField === "subject" ? 1.01 : 1 }}
                      style={{ fontSize: "16px" }}
                    >
                      <option value="">Sélectionnez un sujet</option>
                      <option value="question">Question sur un produit</option>
                      <option value="order">Suivi de commande</option>
                      <option value="partnership">Partenariat</option>
                      <option value="distribution">Devenir distributeur</option>
                      <option value="other">Autre</option>
                    </motion.select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1a3a0e] uppercase tracking-wider mb-2">Message</label>
                    <motion.textarea
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      onFocus={() => setFocusedField("message")}
                      onBlur={() => setFocusedField(null)}
                      className="w-full px-4 py-3 rounded-xl bg-[#fafdf7] border border-[#2b6e1a]/10 text-[#1a3a0e] placeholder-[#5a8f4a]/40 focus:outline-none focus:border-[#7bc462] focus:ring-2 focus:ring-[#7bc462]/10 transition-all resize-none text-base"
                      placeholder="Votre message..."
                      rows={4}
                      required
                      animate={{ scale: focusedField === "message" ? 1.01 : 1 }}
                      style={{ fontSize: "16px" }}
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-70"
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSubmitting ? (
                      <motion.div
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Envoyer le message
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Contact Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Map */}
            <div className="relative rounded-2xl overflow-hidden aspect-video md:aspect-[4/3]">
              <div className="absolute inset-0 bg-gradient-to-br from-[#d4edbc]/30 to-[#e8f5d4]/30" />
              <img
                src="/stylized-illustrated-map-algeria-green-nature-bios.jpg"
                alt="Localisation Biosweet - Algérie"
                className="w-full h-full object-cover"
              />
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-[#2b6e1a] rounded-full blur-xl opacity-20 scale-150" />
                  <div className="relative w-10 h-10 md:w-12 md:h-12 bg-[#2b6e1a] rounded-full flex items-center justify-center shadow-lg">
                    <MapPin className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                </div>
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a3a0e]/40 via-transparent to-transparent" />
            </div>

            {/* Info Cards Grid */}
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {[
                { icon: MapPin, title: "Adresse", info: "Zone Industrielle\nOuled Fayet, Alger" },
                { icon: Phone, title: "Téléphone", info: "+213 21 00 00 00\n+213 550 00 00 00" },
                { icon: Mail, title: "Email", info: "contact@\nbiosweet.dz" },
                { icon: Clock, title: "Horaires", info: "Dim-Jeu: 8h-17h\nVen-Sam: Fermé" },
              ].map((item, index) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="p-4 md:p-5 rounded-xl bg-white border border-[#2b6e1a]/5 hover:border-[#7bc462]/20 transition-colors"
                  >
                    <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-[#e8f5d4] flex items-center justify-center mb-3">
                      <Icon className="w-4 h-4 md:w-5 md:h-5 text-[#2b6e1a]" />
                    </div>
                    <h4 className="font-bold text-[#1a3a0e] mb-1 text-sm">{item.title}</h4>
                    <p className="text-xs text-[#5a8f4a]/60 whitespace-pre-line leading-relaxed">{item.info}</p>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
