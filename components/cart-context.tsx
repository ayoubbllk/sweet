"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react"

interface CartItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: Omit<CartItem, "quantity">) => void
  removeItem: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  total: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const addItem = (item: Omit<CartItem, "quantity">) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id)
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i))
      }
      return [...prev, { ...item, quantity: 1 }]
    })
    setIsOpen(true)
  }

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id)
      return
    }
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity } : i)))
  }

  const clearCart = () => setItems([])

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, isOpen, setIsOpen, total }}>
      {children}
      <CartDrawer />
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error("useCart must be used within CartProvider")
  return context
}

function CartDrawer() {
  const { items, removeItem, updateQuantity, isOpen, setIsOpen, total } = useCart()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-[#d4edbc]/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#d4edbc]/30 flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-[#2b6e1a]" />
                </div>
                <div>
                  <h2 className="font-bold text-[#2b6e1a] text-lg">Votre Panier</h2>
                  <p className="text-sm text-[#2b6e1a]/60">
                    {items.length} article{items.length !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>
              <motion.button
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 rounded-full bg-[#fafdf7] flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5 text-[#2b6e1a]" />
              </motion.button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 rounded-full bg-[#d4edbc]/20 flex items-center justify-center mx-auto mb-4">
                    <ShoppingBag className="w-10 h-10 text-[#2b6e1a]/30" />
                  </div>
                  <p className="text-[#2b6e1a]/60">Votre panier est vide</p>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    className="flex gap-4 p-4 rounded-2xl bg-[#fafdf7]/50 border border-[#d4edbc]/20"
                  >
                    <div className="w-20 h-20 rounded-xl bg-white overflow-hidden">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#2b6e1a] mb-1">{item.name}</h3>
                      <p className="text-[#2b6e1a] font-bold">{item.price} DZD</p>
                      <div className="flex items-center gap-2 mt-2">
                        <motion.button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full bg-white border border-[#d4edbc] flex items-center justify-center"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Minus className="w-4 h-4 text-[#2b6e1a]" />
                        </motion.button>
                        <span className="w-8 text-center font-semibold text-[#2b6e1a]">{item.quantity}</span>
                        <motion.button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full bg-[#2b6e1a] flex items-center justify-center"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Plus className="w-4 h-4 text-white" />
                        </motion.button>
                      </div>
                    </div>
                    <motion.button
                      onClick={() => removeItem(item.id)}
                      className="self-start p-2 text-red-400 hover:text-red-500"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Trash2 className="w-5 h-5" />
                    </motion.button>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-[#d4edbc]/30 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[#2b6e1a]/70">Sous-total</span>
                  <span className="text-xl font-bold text-[#2b6e1a]">{total} DZD</span>
                </div>
                <motion.button
                  className="w-full py-4 bg-[#2b6e1a] text-white rounded-full font-bold text-lg"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Commander
                </motion.button>
                <p className="text-center text-xs text-[#2b6e1a]/50">Livraison gratuite dès 2000 DZD d'achat</p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
