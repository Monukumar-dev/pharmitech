'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function useWowFallback() {
  const pathname = usePathname()

  useEffect(() => {
    let ticking = false

    const reveal = () => {
      const elements = document.querySelectorAll('.wow')

      elements.forEach(el => {
        if (el.classList.contains('show')) return

        const rect = el.getBoundingClientRect()
        const delay = el.dataset.wowDelay || '0s'

        if (rect.top < window.innerHeight * 0.9) {
          el.style.transitionDelay = delay
          el.classList.add('show')
        }
      })

      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(reveal)
        ticking = true
      }
    }

    // 🔥 Run immediately after hydration
    setTimeout(reveal, 100)

    window.addEventListener('scroll', onScroll)
    window.addEventListener('resize', reveal)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', reveal)
    }
  }, [pathname])
}
