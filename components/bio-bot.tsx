"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Send, Sparkles, Leaf, Minus } from "lucide-react"
import { useHapticFeedback } from "./haptic-feedback"

const quickReplies = ["Quels sont vos produits?", "Comment commander?", "Délais de livraison?", "Origine du sucre?"]

const botResponses: Record<string, string> = {
  "quels sont vos produits":
    "🌱 Nous proposons 4 variétés de sucre bio premium: le Sucre Cristal Premium (450 DZD), le Sucre Roux Naturel (520 DZD), le Sucre Vanillé Bio (680 DZD) et le Sucre de Coco (780 DZD). Tous certifiés 100% biologiques!",
  "comment commander":
    "🛒 C'est très simple! Parcourez notre section Produits, ajoutez vos articles au panier, puis choisissez votre mode de paiement (à la livraison, CIB ou EDAHABIA). Livraison gratuite dès 2000 DZD!",
  "délais de livraison":
    "🚚 Nous livrons dans les 58 wilayas d'Algérie en 48-72h. La livraison standard coûte 300 DZD, l'express (24-48h) 500 DZD, et le retrait en point relais est gratuit!",
  "origine du sucre":
    "🌾 Notre sucre est produit localement en Algérie, dans nos plantations certifiées biologiques. Toute notre chaîne de production est tracée et éco-responsable, soutenant l'agriculture algérienne.",
  default:
    "✨ Marhba! Je suis BioBot, votre assistant Biosweet! Je peux vous aider avec nos produits, les commandes, la livraison et bien plus. Que souhaitez-vous savoir?",
}

interface Message {
  id: number
  text: string
  isBot: boolean
  timestamp: Date
}

export function BioBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Marhba! Je suis BioBot 🌱 Votre assistant Biosweet Algérie. Comment puis-je vous aider aujourd'hui?",
      isBot: true,
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { light, success } = useHapticFeedback()

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const getBotResponse = (input: string): string => {
    const lowercaseInput = input.toLowerCase()
    for (const [key, response] of Object.entries(botResponses)) {
      if (lowercaseInput.includes(key)) {
        return response
      }
    }
    return botResponses.default
  }

  const handleSend = async (text: string = inputValue) => {
    if (!text.trim()) return

    light()

    const userMessage: Message = {
      id: Date.now(),
      text,
      isBot: false,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000))

    const botMessage: Message = {
      id: Date.now() + 1,
      text: getBotResponse(text),
      isBot: true,
      timestamp: new Date(),
    }

    setIsTyping(false)
    setMessages((prev) => [...prev, botMessage])
    success()
  }

  return (
    <>
      <motion.button
        onClick={() => {
          light()
          setIsOpen(true)
        }}
        className={`fixed z-50 ${isOpen ? "hidden" : "block"} bottom-24 md:bottom-6 right-4 md:right-6`}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <div className="relative">
          <motion.div
            className="absolute inset-0 bg-[#d4edbc] rounded-full blur-xl"
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          />

          <div className="relative w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-[#2b6e1a] to-[#2b6e1a] rounded-full flex items-center justify-center shadow-lg shadow-[#2b6e1a]/30">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <Sparkles className="w-6 h-6 md:w-7 md:h-7 text-[#d4edbc]" />
            </motion.div>
          </div>

          <motion.div
            className="absolute -top-1 -right-1 w-5 h-5 bg-[#d4edbc] rounded-full flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1 }}
          >
            <span className="text-[#2b6e1a] text-xs font-bold">1</span>
          </motion.div>
        </div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              height: isMinimized ? "auto" : "auto",
            }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed z-50 bottom-0 md:bottom-6 right-0 md:right-6 w-full md:w-[400px] md:max-w-[90vw]"
          >
            <div className="bg-white md:rounded-3xl rounded-t-3xl shadow-2xl shadow-[#2b6e1a]/20 overflow-hidden border border-[#d4edbc]/30 mobile-safe-bottom">
              <div className="bg-gradient-to-r from-[#2b6e1a] to-[#2b6e1a] p-4">
                <div className="w-10 h-1 bg-white/30 rounded-full mx-auto mb-3 md:hidden" />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <motion.div
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#d4edbc]/20 flex items-center justify-center"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    >
                      <Leaf className="w-5 h-5 md:w-6 md:h-6 text-[#d4edbc]" />
                    </motion.div>
                    <div>
                      <h3 className="font-bold text-white text-sm md:text-base">BioBot</h3>
                      <div className="flex items-center gap-1.5">
                        <motion.div
                          className="w-2 h-2 rounded-full bg-[#d4edbc]"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                        />
                        <span className="text-xs text-white/70">En ligne</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <motion.button
                      onClick={() => setIsMinimized(!isMinimized)}
                      className="w-8 h-8 rounded-full bg-white/10 md:hidden flex items-center justify-center hover:bg-white/20 transition-colors"
                      whileTap={{ scale: 0.9 }}
                    >
                      <Minus className="w-4 h-4 text-white" />
                    </motion.button>

                    <motion.button
                      onClick={() => {
                        light()
                        setIsOpen(false)
                      }}
                      className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                      whileTap={{ scale: 0.9 }}
                    >
                      <X className="w-5 h-5 text-white" />
                    </motion.button>
                  </div>
                </div>
              </div>

              <AnimatePresence>
                {!isMinimized && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="h-[50vh] md:h-80 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-[#fafdf7]/50 to-white mobile-scroll-momentum">
                      {messages.map((message) => (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
                        >
                          <div
                            className={`max-w-[85%] p-3 rounded-2xl ${
                              message.isBot
                                ? "bg-[#d4edbc]/30 text-[#2b6e1a] rounded-tl-sm"
                                : "bg-[#2b6e1a] text-white rounded-tr-sm"
                            }`}
                          >
                            <p className="text-sm leading-relaxed">{message.text}</p>
                          </div>
                        </motion.div>
                      ))}

                      {isTyping && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                          <div className="bg-[#d4edbc]/30 p-3 rounded-2xl rounded-tl-sm">
                            <div className="flex gap-1">
                              {[0, 1, 2].map((i) => (
                                <motion.div
                                  key={i}
                                  className="w-2 h-2 rounded-full bg-[#2b6e1a]/50"
                                  animate={{ y: [0, -5, 0] }}
                                  transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: i * 0.2 }}
                                />
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}

                      <div ref={messagesEndRef} />
                    </div>

                    <div className="px-3 md:px-4 py-2 border-t border-[#d4edbc]/20 flex gap-2 overflow-x-auto scrollbar-hide">
                      {quickReplies.map((reply, index) => (
                        <motion.button
                          key={index}
                          onClick={() => handleSend(reply)}
                          className="flex-shrink-0 px-3 py-1.5 bg-[#d4edbc]/20 text-[#2b6e1a] text-xs rounded-full whitespace-nowrap hover:bg-[#d4edbc]/40 transition-colors active:scale-95"
                          whileTap={{ scale: 0.95 }}
                        >
                          {reply}
                        </motion.button>
                      ))}
                    </div>

                    <div className="p-3 md:p-4 border-t border-[#d4edbc]/20">
                      <form
                        onSubmit={(e) => {
                          e.preventDefault()
                          handleSend()
                        }}
                        className="flex gap-2"
                      >
                        <input
                          type="text"
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          placeholder="Écrivez votre message..."
                          className="flex-1 px-4 py-3 rounded-full bg-[#fafdf7] border border-[#d4edbc]/30 text-[#2b6e1a] placeholder-[#2b6e1a]/40 focus:outline-none focus:border-[#2b6e1a] transition-colors text-base"
                          style={{ fontSize: "16px" }}
                        />
                        <motion.button
                          type="submit"
                          className="w-12 h-12 bg-[#2b6e1a] rounded-full flex items-center justify-center flex-shrink-0"
                          whileTap={{ scale: 0.9 }}
                          disabled={!inputValue.trim()}
                        >
                          <Send className="w-5 h-5 text-white" />
                        </motion.button>
                      </form>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
