'use client'

import { useSelector } from "react-redux"
import { useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

import "./CoreServices.css"

gsap.registerPlugin(ScrollTrigger)

// Accent colors
const SERVICE_COLORS = [
  "#0ea5e9",
  "#ec4899",
  "#22c55e",
  "#f97316",
  "#6366f1",
  "#ca8a04",
  "#0891b2",
  "#e11d48",
  "#a855f7",
]

function formatTitle(title) {
  return title
    .replace(/\s*&\s*/g, "\n& ")
    .replace(/,\s*/g, ",\n")
}

function shortLabel(title) {
  return title.split(/[&,]/)[0].trim()
}

export default function CoreServices() {
  const homeData = useSelector((state) => state.home.homeData)

  const wrapperRef = useRef(null)
  const sectionRef = useRef(null)
  const nameRef = useRef(null)
  const bgNumRef = useRef(null)
  const countBigRef = useRef(null)
  const blobRef = useRef(null)
  const segsRef = useRef(null)
  const segLabelRef = useRef(null)
  const sidebarItemRefs = useRef([])
  const currentIndex = useRef(-1)
  const activateServiceRef = useRef(null)
  const triggerRef = useRef(null)
  const clickSyncLockUntilRef = useRef(0)

  useGSAP(() => {
    const services = homeData?.core_services
    if (!services?.length) return

    const total = services.length
    const totalSteps = total - 1

    const activate = (index) => {
      if (index === currentIndex.current) return
      currentIndex.current = index

      const color = SERVICE_COLORS[index] ?? "#f97316"
      const title = services[index].title

      gsap.to(nameRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.2,
        onComplete: () => {
          nameRef.current.textContent = formatTitle(title)
          gsap.fromTo(
            nameRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.4 }
          )
        },
      })

      gsap.to(blobRef.current, {
        backgroundColor: color,
        duration: 0.6,
      })

      sectionRef.current.style.setProperty("--cs-color", color)

      bgNumRef.current.textContent = String(index + 1).padStart(2, "0")
      countBigRef.current.textContent = String(index + 1).padStart(2, "0")
      gsap.to(countBigRef.current, { color, duration: 0.3 })

      sidebarItemRefs.current.forEach((el, i) => {
        el?.classList.toggle("active", i === index)
      })

      segsRef.current
        ?.querySelectorAll(".cs-seg")
        .forEach((seg, i) =>
          seg.classList.toggle("done", i <= index)
        )

      if (segLabelRef.current) {
        segLabelRef.current.textContent =
          `${index + 1} / ${String(total).padStart(2, "0")}`
      }
    }
    activateServiceRef.current = activate

    // Initial state
    const initColor = SERVICE_COLORS[0]
    currentIndex.current = 0
    nameRef.current.textContent = formatTitle(services[0].title)
    bgNumRef.current.textContent = "01"
    countBigRef.current.textContent = "01"
    countBigRef.current.style.color = initColor
    blobRef.current.style.backgroundColor = initColor
    sectionRef.current.style.setProperty("--cs-color", initColor)

    // 🔥 Stable ScrollTrigger
    triggerRef.current = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top+=80",
      end: () => `+=${totalSteps * window.innerHeight * 0.8}`,
      pin: sectionRef.current,
      pinSpacing: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      snap: {
        snapTo: 1 / totalSteps,
        duration: 0.45,
        ease: "power2.inOut",
      },
      onUpdate: (self) => {
        if (Date.now() < clickSyncLockUntilRef.current) return
        const index = Math.min(
          Math.round(self.progress * totalSteps),
          totalSteps
        )
        activate(index)
      },
    })

    ScrollTrigger.refresh()
    const refreshAfterLoad = () => ScrollTrigger.refresh()
    window.addEventListener("load", refreshAfterLoad)

    return () => {
      window.removeEventListener("load", refreshAfterLoad)
      if (triggerRef.current) {
        triggerRef.current.kill()
        triggerRef.current = null
      }
    }

  }, { dependencies: [homeData?.core_services?.length] })

  const handleSidebarClick = (index) => {
    clickSyncLockUntilRef.current = Date.now() + 2000
    activateServiceRef.current?.(index)

    const trigger = triggerRef.current
    if (!trigger || typeof window === "undefined") return
    const progressTarget = services.length > 1 ? index / (services.length - 1) : 0
    const nextScrollTop = trigger.start + (trigger.end - trigger.start) * progressTarget
    if (typeof trigger.scroll === "function") {
      trigger.scroll(nextScrollTop)
    } else {
      window.scrollTo({ top: nextScrollTop, behavior: "auto" })
    }
    ScrollTrigger.update()
  }

  if (!homeData) return null

  const services = homeData.core_services ?? []
  const total = services.length

  return (
    <div ref={wrapperRef} className="cs-wrapper">
      <section ref={sectionRef} className="cs-section">

        <div ref={blobRef} className="cs-blob" />
        <div ref={bgNumRef} className="cs-bg-num">01</div>

        <div className="cs-inner">

          <div className="cs-header">
            <div>
              <p className="cs-eyebrow">Core Services</p>
              <h2 className="cs-heading">
                Commitment<br />To Excellence
              </h2>
            </div>

            <div className="cs-count-box">
              <span ref={countBigRef} className="cs-count-big">01</span>
              <span className="cs-count-total">
                / {String(total).padStart(2, "0")} Services
              </span>
            </div>
          </div>

          <div className="cs-content">
            <div className="cs-name-wrap">
              <p ref={nameRef} className="cs-name" />
            </div>

            <div className="cs-sidebar">
              {services.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  ref={(el) => (sidebarItemRefs.current[i] = el)}
                  className={`cs-si${i === 0 ? " active" : ""}`}
                  onClick={() => handleSidebarClick(i)}
                  onPointerDown={(e) => {
                    e.preventDefault()
                    handleSidebarClick(i)
                  }}
                >
                  <span className="cs-si-num">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="cs-si-dash" />
                  <span className="cs-si-label">
                    {shortLabel(s.title)}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="cs-bottom">
            <div className="cs-segs-wrap">
              <div ref={segsRef} className="cs-segs">
                {services.map((_, i) => (
                  <div
                    key={i}
                    className={`cs-seg${i === 0 ? " done" : ""}`}
                  />
                ))}
              </div>
              <span ref={segLabelRef} className="cs-seg-label">
                1 / {String(total).padStart(2, "0")}
              </span>
            </div>
            <div className="cs-scroll-hint">Scroll</div>
          </div>

        </div>
      </section>
    </div>
  )
}