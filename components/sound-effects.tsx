"use client"

import { createContext, useContext, useCallback, useRef, useState, type ReactNode } from "react"

interface SoundContextType {
  playHover: () => void
  playClick: () => void
  playSuccess: () => void
  toggleMute: () => void
  isMuted: boolean
}

const SoundContext = createContext<SoundContextType | null>(null)

export function SoundProvider({ children }: { children: ReactNode }) {
  const [isMuted, setIsMuted] = useState(true) // Start muted by default
  const audioContextRef = useRef<AudioContext | null>(null)

  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
    return audioContextRef.current
  }, [])

  const playTone = useCallback(
    (frequency: number, duration: number, type: OscillatorType = "sine", volume = 0.1) => {
      if (isMuted) return

      try {
        const ctx = getAudioContext()
        const oscillator = ctx.createOscillator()
        const gainNode = ctx.createGain()

        oscillator.connect(gainNode)
        gainNode.connect(ctx.destination)

        oscillator.frequency.value = frequency
        oscillator.type = type

        gainNode.gain.setValueAtTime(volume, ctx.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)

        oscillator.start()
        oscillator.stop(ctx.currentTime + duration)
      } catch (e) {
        // Audio not supported
      }
    },
    [isMuted, getAudioContext],
  )

  const playHover = useCallback(() => {
    playTone(800, 0.05, "sine", 0.03)
  }, [playTone])

  const playClick = useCallback(() => {
    playTone(600, 0.1, "sine", 0.05)
    setTimeout(() => playTone(900, 0.1, "sine", 0.03), 50)
  }, [playTone])

  const playSuccess = useCallback(() => {
    playTone(523, 0.15, "sine", 0.05) // C
    setTimeout(() => playTone(659, 0.15, "sine", 0.05), 100) // E
    setTimeout(() => playTone(784, 0.2, "sine", 0.05), 200) // G
  }, [playTone])

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev)
  }, [])

  return (
    <SoundContext.Provider value={{ playHover, playClick, playSuccess, toggleMute, isMuted }}>
      {children}
    </SoundContext.Provider>
  )
}

export function useSound() {
  const context = useContext(SoundContext)
  if (!context) {
    return {
      playHover: () => {},
      playClick: () => {},
      playSuccess: () => {},
      toggleMute: () => {},
      isMuted: true,
    }
  }
  return context
}

// Sound toggle button component
export function SoundToggle() {
  const { toggleMute, isMuted } = useSound()

  return (
    <motion.button
      onClick={toggleMute}
      className="fixed bottom-6 left-6 z-[9999] w-12 h-12 rounded-full bg-white/80 backdrop-blur-md border border-[#d4edbc] flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
      whileTap={{ scale: 0.9 }}
      data-cursor={isMuted ? "Activer son" : "Couper son"}
    >
      {isMuted ? (
        <svg className="w-5 h-5 text-[#2b6e1a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
          />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
        </svg>
      ) : (
        <svg className="w-5 h-5 text-[#2b6e1a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
          />
        </svg>
      )}
    </motion.button>
  )
}

import { motion } from "framer-motion"
