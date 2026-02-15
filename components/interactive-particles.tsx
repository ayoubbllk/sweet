"use client"

import { useEffect, useRef, useCallback } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  alpha: number
  life: number
  maxLife: number
}

export function InteractiveParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0, isMoving: false })
  const animationRef = useRef<number | undefined>(undefined) // Correction ici

  const colors = ["#d4edbc", "#a8d5ba", "#2b6e1a", "#7bc462", "#a8d5ba"]

  const createParticle = useCallback((x: number, y: number, burst = false): Particle => {
    const angle = Math.random() * Math.PI * 2
    const speed = burst ? Math.random() * 4 + 2 : Math.random() * 2 + 0.5
    return {
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: Math.random() * 6 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1,
      life: 0,
      maxLife: Math.random() * 60 + 40,
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, isMoving: true }
      if (Math.random() > 0.6) {
        particlesRef.current.push(createParticle(e.clientX, e.clientY))
      }
    }

    const handleClick = (e: MouseEvent) => {
      for (let i = 0; i < 15; i++) {
        particlesRef.current.push(createParticle(e.clientX, e.clientY, true))
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0]
      if (touch) {
        mouseRef.current = { x: touch.clientX, y: touch.clientY, isMoving: true }
        if (Math.random() > 0.5) {
          particlesRef.current.push(createParticle(touch.clientX, touch.clientY))
        }
      }
    }

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0]
      if (touch) {
        for (let i = 0; i < 10; i++) {
          particlesRef.current.push(createParticle(touch.clientX, touch.clientY, true))
        }
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("click", handleClick)
    window.addEventListener("touchmove", handleTouchMove, { passive: true })
    window.addEventListener("touchstart", handleTouchStart, { passive: true })

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current = particlesRef.current.filter((p) => {
        p.life++
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.02
        p.vx *= 0.99
        p.alpha = 1 - p.life / p.maxLife

        if (p.alpha <= 0) return false

        ctx.save()
        ctx.globalAlpha = p.alpha
        ctx.beginPath()

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2)
        gradient.addColorStop(0, p.color)
        gradient.addColorStop(1, "transparent")
        ctx.fillStyle = gradient
        ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2)
        ctx.fill()

        ctx.beginPath()
        ctx.fillStyle = p.color
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()

        return true
      })

      // Draw connections
      particlesRef.current.forEach((p1, i) => {
        particlesRef.current.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 100) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(199, 255, 166, ${(1 - dist / 100) * 0.3 * Math.min(p1.alpha, p2.alpha)})`
            ctx.lineWidth = 1
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        })
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("click", handleClick)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("touchstart", handleTouchStart)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [createParticle])

  return (
    <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[100]" style={{ mixBlendMode: "screen" }} />
  )
}