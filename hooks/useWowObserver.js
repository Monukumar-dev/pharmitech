'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function useWowFallback() {
  const pathname = usePathname()

  useEffect(() => {
    let observer

    const initObserver = () => {
      const elements = document.querySelectorAll('.wow')

      if (!elements.length) return

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const el = entry.target

            if (entry.isIntersecting) {
              const delay = el.dataset.wowDelay || '0s'

              el.style.transitionDelay = delay
              el.classList.add('show')

              observer.unobserve(el)
            }
          })
        },
        {
          threshold: 0,
          rootMargin: '0px 0px -15% 0px'
        }
      )

      elements.forEach((el) => {
        // ✅ RESET (important for route change)
        el.classList.remove('show')
        el.style.transitionDelay = '0s'

        observer.observe(el)
      })
    }

    // ✅ RUN AFTER DOM READY + NEXT RENDER
    const timer1 = setTimeout(initObserver, 50)
    const timer2 = setTimeout(initObserver, 300)

    // ✅ HANDLE dynamic content (VERY IMPORTANT)
    const mutationObserver = new MutationObserver(() => {
      initObserver()
    })

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true
    })

    return () => {
      if (observer) observer.disconnect()
      mutationObserver.disconnect()
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [pathname])
}