"use client"

import type React from "react"

import { useCallback } from "react"

export function useHapticFeedback() {
  const vibrate = useCallback((pattern: number | number[]) => {
    if (typeof window !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate(pattern)
    }
  }, [])

  const light = useCallback(() => vibrate(10), [vibrate])
  const medium = useCallback(() => vibrate(20), [vibrate])
  const heavy = useCallback(() => vibrate(40), [vibrate])
  const success = useCallback(() => vibrate([10, 50, 20]), [vibrate])
  const error = useCallback(() => vibrate([50, 30, 50, 30, 50]), [vibrate])
  const warning = useCallback(() => vibrate([30, 20, 30]), [vibrate])

  return { light, medium, heavy, success, error, warning, vibrate }
}

export function AddToCartAnimation({
  children,
  onAdd,
  productImage,
}: {
  children: React.ReactNode
  onAdd: () => void
  productImage?: string
}) {
  const { success } = useHapticFeedback()

  const handleClick = () => {
    success()
    onAdd()
  }

  return <div onClick={handleClick}>{children}</div>
}
