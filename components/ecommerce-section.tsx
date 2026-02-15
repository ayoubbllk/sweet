"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { CreditCard, Truck, Shield, Gift, Check, ArrowRight, MapPin, ShoppingBag } from "lucide-react"
import { useHapticFeedback } from "./haptic-feedback"

const checkoutSteps = [
  { id: 1, title: "Panier", icon: Gift },
  { id: 2, title: "Livraison", icon: Truck },
  { id: 3, title: "Formulaire", icon: CreditCard },
  { id: 4, title: "Confirmation", icon: Check },
]

const benefits = [
  {
    icon: Truck,
    title: "Livraison Nationale",
    description: "Livraison rapide dans les 58 wilayas d'Algérie sous 48-72h.",
  },
  {
    icon: Shield,
    title: "Paiement Sécurisé",
    description: "Paiement à la livraison ou par CIB. Transactions 100% sécurisées.",
  },
  {
    icon: Gift,
    title: "Emballage Cadeau",
    description: "Option packaging premium réutilisable offerte.",
  },
]

const wilayas = [
  { name: "Alger", price: 300 },
  { name: "Oran", price: 400 },
  { name: "Constantine", price: 400 },
  { name: "Annaba", price: 450 },
  { name: "Blida", price: 350 },
  { name: "Tizi Ouzou", price: 350 },
  { name: "Sétif", price: 400 },
  { name: "Béjaïa", price: 400 },
  { name: "Tlemcen", price: 450 },
  { name: "Autres Wilayas", price: 500 },
]

export function EcommerceSection() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedWilaya, setSelectedWilaya] = useState(wilayas[0].name)
  const [deliveryPrice, setDeliveryPrice] = useState(wilayas[0].price)
  const [formDetails, setFormDetails] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
  })
  const titleRef = useRef(null)
  const isTitleInView = useInView(titleRef, { once: true })
  const { light } = useHapticFeedback()

  const handleWilayaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    light()
    const selectedName = e.target.value
    const wilaya = wilayas.find((w) => w.name === selectedName)
    if (wilaya) {
      setSelectedWilaya(wilaya.name)
      setDeliveryPrice(wilaya.price)
    }
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormDetails({ ...formDetails, [e.target.name]: e.target.value })
  }

  const isFormValid = formDetails.firstName.trim() !== "" && formDetails.lastName.trim() !== "" && formDetails.phoneNumber.trim() !== ""

  return (
    <section id="boutique" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background — deep forest */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0d1f08] via-[#1a3a0e] to-[#0d1f08]" />

      {/* Decorative SVG pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.015] pointer-events-none" viewBox="0 0 600 600" preserveAspectRatio="xMidYMid slice">
        <pattern id="ecom-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="20" cy="20" r="0.8" fill="white" />
        </pattern>
        <rect width="600" height="600" fill="url(#ecom-grid)" />
      </svg>

      {/* Ambient blurs */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-[#2b6e1a]/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#7bc462]/5 rounded-full blur-[150px]" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[#7bc462] font-semibold text-xs uppercase tracking-widest mb-6"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Boutique
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-white mb-5"
          >
            {"Expérience d'Achat Fluide"}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base md:text-lg text-white/40 max-w-2xl mx-auto"
          >
            Un parcours d&apos;achat simplifié, avec livraison dans toute l&apos;Algérie.
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={isTitleInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-8 mx-auto w-16 h-[2px] bg-gradient-to-r from-transparent via-[#7bc462]/40 to-transparent"
          />
        </div>

        {/* Checkout Flow Demo */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative max-w-4xl mx-auto mb-20"
        >
          <div className="rounded-2xl p-8 md:p-12 bg-white/[0.03] backdrop-blur-sm border border-white/[0.06]">
            {/* Steps Progress */}
            <div className="flex items-center justify-between mb-12">
              {checkoutSteps.map((step, index) => {
                const Icon = step.icon
                const isActive = step.id === currentStep
                const isComplete = step.id < currentStep

                return (
                  <div key={step.id} className="flex items-center">
                    <motion.button
                      onClick={() => setCurrentStep(step.id)}
                      className="relative flex flex-col items-center gap-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.div
                        className={`w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center transition-all duration-300 ${
                          isActive
                            ? "bg-[#2b6e1a] text-[#d4edbc] shadow-lg shadow-[#2b6e1a]/30"
                            : isComplete
                              ? "bg-[#7bc462]/20 text-[#7bc462] border border-[#7bc462]/30"
                              : "bg-white/5 text-white/30 border border-white/5"
                        }`}
                        animate={isActive ? { scale: [1, 1.05, 1] } : {}}
                        transition={{ duration: 0.5 }}
                      >
                        {isComplete ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                      </motion.div>
                      <span className={`text-xs font-medium hidden sm:block ${isActive ? "text-[#7bc462]" : "text-white/30"}`}>
                        {step.title}
                      </span>
                    </motion.button>

                    {index < checkoutSteps.length - 1 && (
                      <div className="flex-1 h-[2px] mx-2 md:mx-4 rounded-full bg-white/5 overflow-hidden">
                        <motion.div
                          className="h-full bg-[#7bc462]/40"
                          initial={{ width: 0 }}
                          animate={{ width: isComplete ? "100%" : "0%" }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Step Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="text-center py-8"
              >
                {currentStep === 1 && (
                  <div>
                    <h3 className="text-xl md:text-2xl font-extrabold text-white mb-4">Votre Panier</h3>
                    <p className="text-white/40 text-sm mb-6">Vérifiez vos produits et quantités</p>
                    <div className="rounded-xl p-6 max-w-md mx-auto bg-white/[0.03] border border-white/[0.06]">
                      <div className="flex items-center gap-4 mb-4 pb-4 border-b border-white/[0.06]">
                        <div className="w-14 h-14 rounded-lg bg-[#2b6e1a]/20 flex items-center justify-center">
                          <ShoppingBag className="w-6 h-6 text-[#7bc462]" />
                        </div>
                        <div className="flex-1 text-left">
                          <p className="font-semibold text-white text-sm">Sucre Cristal Premium</p>
                          <p className="text-xs text-white/40">500g × 2</p>
                        </div>
                        <p className="font-bold text-[#7bc462]">900 DZD</p>
                      </div>
                      <div className="flex justify-between text-white">
                        <span className="font-medium text-sm text-white/60">Total</span>
                        <span className="font-extrabold text-lg text-[#d4edbc]">900 DZD</span>
                      </div>
                    </div>
                  </div>
                )}
                {currentStep === 2 && (
                  <div>
                    <h3 className="text-xl md:text-2xl font-extrabold text-white mb-4">Livraison</h3>
                    <p className="text-white/40 text-sm mb-6">Choisissez votre wilaya pour la livraison</p>
                    <div className="space-y-3 max-w-md mx-auto">
                      <label htmlFor="wilaya-select" className="sr-only">Sélectionnez votre wilaya</label>
                      <motion.select
                        id="wilaya-select"
                        value={selectedWilaya}
                        onChange={handleWilayaChange}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#7bc462]/40 transition-all text-sm"
                        whileHover={{ scale: 1.01 }}
                        style={{ fontSize: "16px" }}
                      >
                        {wilayas.map((wilaya) => (
                          <option key={wilaya.name} value={wilaya.name} className="bg-[#1a3a0e] text-white">
                            {wilaya.name} ({wilaya.price} DZD)
                          </option>
                        ))}
                      </motion.select>
                      <div className="flex justify-between items-center mt-4">
                        <span className="font-medium text-sm text-white/60">Frais de livraison</span>
                        <span className="font-extrabold text-lg text-[#d4edbc]">{deliveryPrice} DZD</span>
                      </div>
                    </div>
                  </div>
                )}
                {currentStep === 3 && (
                  <div>
                    <h3 className="text-xl md:text-2xl font-extrabold text-white mb-4">Vos Coordonnées</h3>
                    <p className="text-white/40 text-sm mb-6">Informations pour la livraison</p>
                    <form className="space-y-4 max-w-md mx-auto">
                      <div>
                        <label htmlFor="firstName" className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-2 text-left">Prénom</label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formDetails.firstName}
                          onChange={handleFormChange}
                          placeholder="Votre prénom"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-[#7bc462]/40 transition-all text-sm"
                          required
                          style={{ fontSize: "16px" }}
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-2 text-left">Nom</label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formDetails.lastName}
                          onChange={handleFormChange}
                          placeholder="Votre nom"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-[#7bc462]/40 transition-all text-sm"
                          required
                          style={{ fontSize: "16px" }}
                        />
                      </div>
                      <div>
                        <label htmlFor="phoneNumber" className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-2 text-left">Numéro de téléphone</label>
                        <input
                          type="tel"
                          id="phoneNumber"
                          name="phoneNumber"
                          value={formDetails.phoneNumber}
                          onChange={handleFormChange}
                          placeholder="0X XX XX XX XX"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-[#7bc462]/40 transition-all text-sm"
                          required
                          style={{ fontSize: "16px" }}
                        />
                      </div>
                      <div className="flex items-center gap-2 text-white/30 text-left text-xs">
                        <MapPin className="w-4 h-4" />
                        <span>Wilaya : <span className="font-semibold text-[#7bc462]">{selectedWilaya}</span></span>
                      </div>
                      <div className="flex items-center justify-center gap-2 text-white/20 mt-4">
                        <Shield className="w-4 h-4" />
                        <span className="text-xs">Paiement à la livraison</span>
                      </div>
                    </form>
                  </div>
                )}
                {currentStep === 4 && (
                  <div>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#2b6e1a] flex items-center justify-center mx-auto mb-6"
                    >
                      <Check className="w-8 h-8 md:w-10 md:h-10 text-[#d4edbc]" />
                    </motion.div>
                    <h3 className="text-xl md:text-2xl font-extrabold text-white mb-4">Commande Confirmée!</h3>
                    <p className="text-white/50 text-sm">Merci pour votre achat, {formDetails.firstName}.</p>
                    <p className="text-white/50 text-sm">Votre commande sera livrée à {selectedWilaya} sous 48-72h.</p>
                    <p className="text-[#7bc462] font-bold mt-3">Total: {900 + deliveryPrice} DZD</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <motion.button
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                  currentStep === 1 ? "opacity-0 pointer-events-none" : "bg-white/5 text-white/60 hover:bg-white/10 border border-white/5"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
              >
                Retour
              </motion.button>
              <motion.button
                onClick={() => {
                  if (currentStep === 4) {
                    setCurrentStep(1)
                    setFormDetails({ firstName: "", lastName: "", phoneNumber: "" })
                  } else {
                    setCurrentStep(Math.min(4, currentStep + 1))
                  }
                }}
                className="px-5 py-2.5 bg-[#2b6e1a] text-[#d4edbc] rounded-xl font-semibold text-sm flex items-center gap-2 hover:bg-[#2b6e1a]/80 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                disabled={currentStep === 3 && !isFormValid}
              >
                {currentStep === 4 ? "Nouvelle commande" : "Continuer"}
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Benefits */}
        <div className="grid md:grid-cols-3 gap-5">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 md:p-8 rounded-2xl bg-white/[0.03] border border-white/[0.06]"
              >
                <div className="w-12 h-12 rounded-xl bg-[#2b6e1a]/20 flex items-center justify-center mx-auto mb-5">
                  <Icon className="w-6 h-6 text-[#7bc462]" />
                </div>
                <h3 className="text-base font-extrabold text-white mb-2">{benefit.title}</h3>
                <p className="text-white/30 text-sm leading-relaxed">{benefit.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
