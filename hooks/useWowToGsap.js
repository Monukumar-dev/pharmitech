'use client'

import { useLayoutEffect } from 'react'
import { usePathname } from 'next/navigation'

let gsapInstance = null
let ScrollTriggerInstance = null

export default function useWowToGsap() {
  const pathname = usePathname()

  useLayoutEffect(() => {
    let ctx
    let rafId

    const isInViewport = (el) => {
      const rect = el.getBoundingClientRect()
      return rect.top < window.innerHeight * 0.9
    }

    ;(async () => {
      if (!gsapInstance) {
        const { gsap } = await import('gsap')
        const { ScrollTrigger } = await import('gsap/ScrollTrigger')

        gsap.registerPlugin(ScrollTrigger)

        gsapInstance = gsap
        ScrollTriggerInstance = ScrollTrigger
      }

      rafId = requestAnimationFrame(() => {
        ScrollTriggerInstance.getAll().forEach(t => t.kill())
        ScrollTriggerInstance.clearScrollMemory()

        ctx = gsapInstance.context(() => {
          document.querySelectorAll('.wow').forEach((el) => {
            const delay = el.dataset.wowDelay
              ? parseFloat(el.dataset.wowDelay)
              : 0

            // safety reset
            gsapInstance.set(el, { opacity: 1, y: 0 })

            if (isInViewport(el)) {
              // ✅ HERO / ABOVE FOLD
              gsapInstance.from(el, {
                opacity: 0,
                y: 40,
                duration: 0.8,
                delay,
                ease: 'power3.out',
              })
            } else {
              // ✅ SCROLL ANIMATION
              gsapInstance.from(el, {
                opacity: 0,
                y: 60,
                duration: 0.8,
                delay,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: el,
                  start: 'top 85%',
                  once: true,
                  invalidateOnRefresh: true,
                },
              })
            }
          })
        })

        ScrollTriggerInstance.refresh()
      })
    })()

    return () => {
      cancelAnimationFrame(rafId)
      ctx?.revert()

      // final safety
      document.querySelectorAll('.wow').forEach(el => {
        el.style.opacity = '1'
        el.style.transform = 'none'
      })
    }
  }, [pathname])
}
