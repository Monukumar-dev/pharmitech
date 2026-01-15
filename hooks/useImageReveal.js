'use client'

import { useLayoutEffect } from "react"
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function useImageReveal(selector = ".image-anime") {
  useLayoutEffect(() => {
    const images = document.querySelectorAll(selector)
    if (!images.length) return

    images.forEach((el) => {
      const img = el.querySelector("img")

      // Initial state
      gsap.set(el, { overflow: "hidden" })
      gsap.set(img, { scale: 1.15, y: 60 })

      gsap.to(img, {
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
      })
    })

    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [selector])
}
