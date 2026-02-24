'use client'

import { useSelector } from "react-redux"
import { useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

import "./CoreServices.css"

gsap.registerPlugin(ScrollTrigger, useGSAP)

// ── Per-service accent colors (by index) ──────────────────────────────────────
const SERVICE_COLORS = [
  "#0ea5e9", // 1  Project Guidance
  "#ec4899", // 2  Conceptual Design
  "#22c55e", // 3  Detailed Design
  "#f97316", // 4  In-house Manufacturing
  "#6366f1", // 5  Project Planning
  "#ca8a04", // 6  Installation
  "#0891b2", // 7  Testing
  "#e11d48", // 8  Qualification
  "#a855f7", // 9  Service & Maintenance
]

// Format title: break at & and , for two-line display
function formatTitle(title) {
  return title
    .replace(/\s*&\s*/g, "\n& ")
    .replace(/,\s*/g, ",\n")
}

// Short sidebar label: text before first & or ,
function shortLabel(title) {
  return title.split(/[&,]/)[0].trim()
}

export default function CoreServices() {
  const homeData = useSelector((state) => state.home.homeData)

  // DOM refs
  const sectionRef      = useRef(null)
  const nameRef         = useRef(null)
  const bgNumRef        = useRef(null)
  const countBigRef     = useRef(null)
  const blobRef         = useRef(null)
  const segsRef         = useRef(null)
  const segLabelRef     = useRef(null)
  const sidebarItemRefs = useRef([]) // array of refs for sidebar rows
  const currentIndex    = useRef(-1) // mutable, no re-render needed

  // ── useGSAP — scoped to sectionRef, re-runs when homeData arrives ──────────
  const { contextSafe } = useGSAP(
    () => {
      const services = homeData?.core_services
      if (!services?.length) return

      const total      = services.length
      const totalSteps = total - 1

      // ── activate() wrapped in contextSafe so GSAP tracks every tween ──────
      const activate = contextSafe((index) => {
        if (index === currentIndex.current) return
        currentIndex.current = index

        const color   = SERVICE_COLORS[index] ?? "#f97316"
        const title   = services[index].title
        const nameEl  = nameRef.current
        const section = sectionRef.current

        // Name: fade out → swap text → fade + slide in
        gsap.to(nameEl, {
          opacity: 0,
          y: -22,
          duration: 0.18,
          ease: "power2.in",
          onComplete: () => {
            nameEl.textContent = formatTitle(title)
            gsap.fromTo(
              nameEl,
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }
            )
          },
        })

        // Colour blob background
        gsap.to(blobRef.current, {
          backgroundColor: color,
          duration: 0.6,
          ease: "power2.out",
        })

        // CSS custom property — drives sidebar dash + seg colours via CSS
        section.style.setProperty("--cs-color", color)

        // Ghost number + big counter
        bgNumRef.current.textContent    = String(index + 1).padStart(2, "0")
        countBigRef.current.textContent = String(index + 1).padStart(2, "0")
        gsap.to(countBigRef.current, { color, duration: 0.35 })

        // Sidebar active class
        sidebarItemRefs.current.forEach((el, i) => {
          el?.classList.toggle("active", i === index)
        })

        // Progress segments
        segsRef.current
          ?.querySelectorAll(".cs-seg")
          .forEach((seg, i) => seg.classList.toggle("done", i <= index))

        // Segment counter label
        if (segLabelRef.current)
          segLabelRef.current.textContent =
            `${index + 1} / ${String(total).padStart(2, "0")}`
      })

      // ── Initialise first item without animation ───────────────────────────
      const initColor = SERVICE_COLORS[0] ?? "#f97316"
      currentIndex.current                  = 0
      nameRef.current.textContent           = formatTitle(services[0].title)
      bgNumRef.current.textContent          = "01"
      countBigRef.current.textContent       = "01"
      countBigRef.current.style.color       = initColor
      blobRef.current.style.backgroundColor = initColor
      sectionRef.current.style.setProperty("--cs-color", initColor)
      gsap.set(nameRef.current, { opacity: 1, y: 0 })

      // ── ScrollTrigger: pin + snap ─────────────────────────────────────────
      ScrollTrigger.create({
        trigger: sectionRef.current.parentElement,
        start: "top top+=70",
        end: () => `+=${totalSteps * window.innerHeight * 0.8}`,
        pin: sectionRef.current.parentElement,
        //pin: true,
        pinSpacing: true,
        scrub: false,
        snap: {
          snapTo: 1 / totalSteps,
          duration: 0.45,
          ease: "power2.inOut",
        },
        onUpdate: (self) => {
          const index = Math.min(
            Math.round(self.progress * totalSteps),
            totalSteps
          )
          activate(index)
        },
        onLeave:     () => activate(total - 1),
        onEnterBack: () => activate(currentIndex.current),
      })

      // Refresh after first paint so pin heights are calculated correctly
      ScrollTrigger.refresh()
    },
    // Scope all GSAP selectors to the section element
    // Re-runs automatically when homeData changes (e.g. async Redux load)
    // Cleanup (kill tweens + ScrollTriggers) handled automatically by useGSAP
    { scope: sectionRef, dependencies: [homeData] }
  )

  if (!homeData) return null

  const services = homeData.core_services ?? []
  const total    = services.length

  return (
    <div className="cs-wrapper">
    <section ref={sectionRef} className="cs-section">
      <div ref={blobRef} className="cs-blob" />
      <div ref={bgNumRef} className="cs-bg-num">01</div>
      <div className="cs-inner">
        <div className="cs-header">
          <div>
            <p className="cs-eyebrow">Core Services</p>
            <h2 className="cs-heading">Commitment<br />To Excellence</h2>
            {/* <TextEffect className="cs-heading" text="Commitment To Excellence" /> */}
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
              <div
                key={s.id}
                ref={(el) => { sidebarItemRefs.current[i] = el }}
                className={`cs-si${i === 0 ? " active" : ""}`}
              >
                <span className="cs-si-num">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="cs-si-dash" />
                <span className="cs-si-label">{shortLabel(s.title)}</span>
              </div>
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