'use client'

import { useSelector } from "react-redux"
import { useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

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
  const sidebarItemRefs = useRef([])   // array of refs for sidebar rows
  const currentIndex    = useRef(-1)   // mutable, no re-render needed

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

        // CSS custom property drives sidebar dash + seg colours
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
      currentIndex.current = 0
      nameRef.current.textContent           = formatTitle(services[0].title)
      bgNumRef.current.textContent          = "01"
      countBigRef.current.textContent       = "01"
      countBigRef.current.style.color       = initColor
      blobRef.current.style.backgroundColor = initColor
      sectionRef.current.style.setProperty("--cs-color", initColor)
      gsap.set(nameRef.current, { opacity: 1, y: 0 })

      // ── ScrollTrigger: pin + snap ─────────────────────────────────────────
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${totalSteps * 850}`,
        pin: true,
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
    // Re-run the setup whenever homeData changes (e.g. async load)
    { scope: sectionRef, dependencies: [homeData] }
  )
  // Note: useGSAP handles cleanup automatically on unmount / re-run
  // (kills all tweens + ScrollTriggers created inside the callback)

  if (!homeData) return null

  const services = homeData.core_services ?? []
  const total    = services.length

  return (
    <>
      <style>{`
        /* ─── Section shell ─────────────────────────────────── */
        .cs-section {
          min-height: 100vh;
          overflow: hidden;
          position: relative;
          background: #0d0d0d;
          border-radius: 32px;
          margin: 0 12px;
          --cs-color: #f97316;
        }

        /* Colour blob */
        .cs-blob {
          position: absolute;
          inset: 0;
          margin: auto;
          width: 520px;
          height: 520px;
          border-radius: 50%;
          filter: blur(130px);
          opacity: 0.18;
          pointer-events: none;
          z-index: 0;
          background: #f97316;
        }

        /* Giant ghost number */
        .cs-bg-num {
          position: absolute;
          right: -10px;
          bottom: -50px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(260px, 36vw, 460px);
          line-height: 1;
          color: transparent;
          -webkit-text-stroke: 1px rgba(255,255,255,0.04);
          pointer-events: none;
          user-select: none;
          z-index: 0;
        }

        /* Inner grid */
        .cs-inner {
          position: relative;
          z-index: 2;
          min-height: 100vh;
          display: grid;
          grid-template-rows: auto 1fr auto;
          padding: 56px 60px;
        }

        /* ─── Header ─────────────────────────────────────────── */
        .cs-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding-bottom: 44px;
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }

        .cs-eyebrow {
          font-size: 11px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.28);
          margin-bottom: 12px;
        }

        .cs-heading {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(42px, 5.5vw, 74px);
          color: #fff;
          letter-spacing: 0.03em;
          line-height: 1;
          margin: 0;
        }

        .cs-count-box  { text-align: right; }

        .cs-count-big {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(60px, 8vw, 94px);
          line-height: 1;
          display: block;
          color: var(--cs-color);
        }

        .cs-count-total {
          font-size: 13px;
          color: rgba(255,255,255,0.2);
          letter-spacing: 0.12em;
        }

        /* ─── Content row ────────────────────────────────────── */
        .cs-content {
          display: flex;
          align-items: center;
          padding-top: 50px;
        }

        .cs-name-wrap {
          flex: 1;
          overflow: hidden;
          min-height: 220px;
          display: flex;
          align-items: center;
        }

        .cs-name {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(36px, 6vw, 86px);
          color: #fff;
          letter-spacing: 0.02em;
          line-height: 1.08;
          white-space: pre-line;
          margin: 0;
        }

        /* ─── Sidebar ────────────────────────────────────────── */
        .cs-sidebar {
          width: 216px;
          flex-shrink: 0;
          border-left: 1px solid rgba(255,255,255,0.07);
          padding-left: 28px;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .cs-si {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 5px 0;
          cursor: default;
          transition: transform 0.35s ease;
        }

        .cs-si-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 13px;
          min-width: 22px;
          color: rgba(255,255,255,0.14);
          transition: color 0.35s;
        }

        .cs-si-dash {
          width: 0;
          height: 1px;
          flex-shrink: 0;
          background: var(--cs-color);
          transition: width 0.35s ease;
        }

        .cs-si-label {
          font-size: 11px;
          letter-spacing: 0.07em;
          color: rgba(255,255,255,0.14);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          transition: color 0.35s;
        }

        .cs-si.active              { transform: translateX(4px); }
        .cs-si.active .cs-si-num  { color: var(--cs-color); }
        .cs-si.active .cs-si-dash { width: 14px; }
        .cs-si.active .cs-si-label{ color: #fff; }

        /* ─── Bottom strip ───────────────────────────────────── */
        .cs-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 32px;
          margin-top: 32px;
          border-top: 1px solid rgba(255,255,255,0.06);
        }

        .cs-segs-wrap {
          display: flex;
          align-items: center;
          flex: 1;
        }

        .cs-segs {
          display: flex;
          gap: 5px;
          flex: 1;
          max-width: 340px;
        }

        .cs-seg {
          height: 2px;
          flex: 1;
          border-radius: 2px;
          background: rgba(255,255,255,0.07);
          transition: background 0.4s ease;
        }

        .cs-seg.done { background: var(--cs-color); }

        .cs-seg-label {
          font-size: 11px;
          color: rgba(255,255,255,0.2);
          letter-spacing: 0.12em;
          margin-left: 14px;
          white-space: nowrap;
        }

        .cs-scroll-hint {
          font-size: 11px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.16);
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .cs-scroll-hint::after {
          content: '';
          display: block;
          width: 34px;
          height: 1px;
          background: rgba(255,255,255,0.1);
        }

        /* ─── Responsive ─────────────────────────────────────── */
        @media (max-width: 900px) {
          .cs-inner    { padding: 40px 24px; }
          .cs-sidebar  { display: none; }
          .cs-bg-num   { font-size: 180px; }
          .cs-section  { border-radius: 20px; margin: 0 8px; }
        }

        @media (max-width: 520px) {
          .cs-heading   { font-size: 34px; }
          .cs-name      { font-size: 32px; }
          .cs-count-big { font-size: 52px; }
        }
      `}</style>

      <section ref={sectionRef} className="cs-section">

        <div ref={blobRef} className="cs-blob" />
        <div ref={bgNumRef} className="cs-bg-num">01</div>

        <div className="cs-inner">

          {/* Header */}
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

          {/* Content */}
          <div className="cs-content">

            {/* Active service name — text swapped by GSAP */}
            <div className="cs-name-wrap">
              <p ref={nameRef} className="cs-name" />
            </div>

            {/* Sidebar — rendered from Redux data, ref-registered for GSAP */}
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

          {/* Bottom strip */}
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
    </>
  )
}