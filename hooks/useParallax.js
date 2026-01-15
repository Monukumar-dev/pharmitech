'use client'

import { useLayoutEffect } from 'react'

export default function useParallaxBackground(
  selector,
  distance = 120,
  ease = 0.08 // 👈 lower = smoother (0.05–0.1)
) {
  useLayoutEffect(() => {
    const el = document.querySelector(selector)
    if (!el) return

    let isVisible = false
    let rafId = null

    let currentY = 0
    let targetY = 0

    el.style.backgroundPosition = 'center 50%'
    el.style.willChange = 'background-position'

    const lerp = (a, b, n) => a + (b - a) * n

    const animate = () => {
      if (!isVisible) return

      currentY = lerp(currentY, targetY, ease)

      el.style.backgroundPosition = `center calc(50% + ${currentY}px)`

      rafId = requestAnimationFrame(animate)
    }

    const updateTarget = () => {
      if (!isVisible) return

      const rect = el.getBoundingClientRect()
      const viewportHeight = window.innerHeight

      const progress =
        (viewportHeight - rect.top) /
        (viewportHeight + rect.height)

      const clamped = Math.max(0, Math.min(1, progress))

      targetY = (clamped - 0.5) * distance
    }

    const onScroll = () => {
      updateTarget()
      if (!rafId) rafId = requestAnimationFrame(animate)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting
        if (isVisible) onScroll()
        else {
          cancelAnimationFrame(rafId)
          rafId = null
        }
      },
      { threshold: 0 }
    )

    observer.observe(el)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(rafId)
      el.style.backgroundPosition = ''
    }
  }, [selector, distance, ease])
}
