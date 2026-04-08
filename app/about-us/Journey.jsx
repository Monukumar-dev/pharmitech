"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextEffect from "@/components/TextEffect"; // ← your existing component
//import { TIMELINE_ITEMS, CLIENTS } from "./aboutData";
import styles from "@/styles/Pharminjourney.module.css";

gsap.registerPlugin(ScrollTrigger);


// ─── aboutData.js ────────────────────────────────────────────────────────────
// Shared data for PharminDifference and PharminJourney sections

const DIFFERENCE_CARDS = [
  {
    num: "01",
    title: "In-House Expertise",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width={24} height={24}>
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    items: [
      "Design & Detailed Engineering team",
      "Manufacturing of Modular Cleanrooms, HVAC Systems & Equipment",
      "Planning, Execution & After-Sales Service team",
      "Testing & Validation Staff",
    ],
  },
  {
    num: "02",
    title: "Turnkey Design-Build",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width={24} height={24}>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
    items: [
      "Budget-aligned designs",
      "Schedule-driven execution",
      "Integrated Engineering Design & Build",
      "End-to-End Responsibility",
    ],
  },
  {
    num: "03",
    title: "Achieving Clean",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width={24} height={24}>
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" />
      </svg>
    ),
    items: [
      "Understand client requirements, challenges & process",
      "Facility Study & Data Mapping",
      "Site Survey & Infrastructure Planning",
      "Modular off-site / on-site fabrication for speed & quality",
    ],
  },
  {
    num: "04",
    title: "Growth & Expansion",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width={24} height={24}>
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    items: [
      "Greenfield Projects",
      "Brownfield Upgrades",
      "Facility Expansions",
      "Renovations & Modernization",
    ],
  },
  {
    num: "05",
    title: "Commitment & Care",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width={24} height={24}>
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    items: [
      "Lifecycle Support with Rapid Response Service",
      "Long-Term Partnerships",
      "Documentation & Regulatory Clarity",
      "Performance Monitoring & Optimization",
      "Post-Qualification Assistance & Client Training",
    ],
  },
];

const TIMELINE_ITEMS = [
  {
    year: "2013",
    title: "Commencement",
    body: "Establishment of Pharmintech Turnkey Solutions Pvt. Ltd. — with a focused mission on cleanroom design, engineering, and compliance.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width={16} height={16}>
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    year: "Early Years",
    title: "First Turnkey Projects",
    body: "Delivered the first turnkey cleanroom installations — building credibility through precision and an unwavering commitment to compliance.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width={16} height={16}>
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
  },
  {
    year: "Growth Phase",
    title: "Service Expansion",
    body: null,
    bullets: [
      "Concept design to detailed engineering",
      "Compliance validation and documentation",
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width={16} height={16}>
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="16" />
        <line x1="8" y1="12" x2="16" y2="12" />
      </svg>
    ),
  },
  {
    year: "2019",
    title: "In-House Manufacturing",
    body: "A defining milestone — establishment of dedicated manufacturing facilities. Enhanced control over quality, precision, and project timelines.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width={16} height={16}>
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  },
  {
    year: "Reputation",
    title: "Industry Recognition",
    body: "Became the trusted partner across pharmaceutical, biotech, and healthcare sectors — known for premium quality and emotionally resonant client relationships.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width={16} height={16}>
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
  },
  {
    year: "2025",
    title: "Global Turnkey Partner",
    body: "Today Pharmintech stands as a global turnkey cleanroom engineering partner — trusted by industry leaders across the globe for long-term, lifecycle partnerships.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width={16} height={16}>
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
];

export const CLIENTS = [
  "Alembic Pharma", "Cipla", "Glenmark", "Meril",
  "AMI Lifesciences", "Sava Healthcare", "Vasudha Pharma",
  "3M India", "Ajanta Pharma", "Intas", "Kemwell",
  "Recipharm", "Wockhardt", "Endurance Technologies",
];

export default function Journey() {
  const sectionRef    = useRef(null);
  const timelineRef   = useRef(null);
  const tlProgressRef = useRef(null);

  useGSAP(
    () => {
      // Section header children stagger in
      gsap.from(".journey-header > *", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        y: 40, opacity: 0, duration: 0.9, stagger: 0.12, ease: "power3.out",
      });

      // Clients strip fade up
      gsap.from("#clientsStrip", {
        scrollTrigger: { trigger: "#clientsStrip", start: "top 85%" },
        y: 30, opacity: 0, duration: 0.7, ease: "power3.out",
      });

      // Individual client tags stagger
      gsap.from(`.${styles.clientTag}`, {
        scrollTrigger: { trigger: "#clientsStrip", start: "top 85%" },
        y: 10, opacity: 0, duration: 0.4, stagger: 0.05, ease: "power2.out", delay: 0.2,
      });

      // Future card fade up
      gsap.from("#futureCard", {
        scrollTrigger: { trigger: "#futureCard", start: "top 88%" },
        y: 30, opacity: 0, duration: 0.7, ease: "power3.out",
      });

      // Timeline items slide in from right
      document.querySelectorAll(".tl-item").forEach((item, i) => {
        gsap.from(item, {
          scrollTrigger: { trigger: item, start: "top 85%" },
          x: 40, opacity: 0, duration: 0.75, ease: "power3.out", delay: i * 0.05,
        });
      });

      // Scroll-driven progress bar + active dot toggling
      if (timelineRef.current && tlProgressRef.current) {
        ScrollTrigger.create({
          trigger: timelineRef.current,
          start: "top 60%",
          end: "bottom 60%",
          onUpdate(self) {
            const pct = self.progress * 100;
            tlProgressRef.current.style.height = pct + "%";

            document.querySelectorAll(".tl-item").forEach((item) => {
              const dotWrap = item.querySelector(".tl-dot-wrap");
              if (!dotWrap || !timelineRef.current) return;
              const dotY =
                dotWrap.getBoundingClientRect().top -
                timelineRef.current.getBoundingClientRect().top +
                dotWrap.getBoundingClientRect().height / 2;
              const progressY = (pct / 100) * timelineRef.current.offsetHeight;
              progressY >= dotY
                ? item.classList.add("tl-active")
                : item.classList.remove("tl-active");
            });
          },
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="journey"
      ref={sectionRef}
      className={`${styles.section} position-relative`}
    >
      {/* Decorative right-edge accent line */}
      <div className={styles.accentLine} />

      {/* Two-column layout: sticky left panel + scrollable timeline */}
      <div className="d-flex flex-column flex-lg-row align-items-lg-start" style={{ gap: "80px" }}>

        {/* ── LEFT: sticky panel ── */}
        <div style={{ flex: "1 0 0" }}>
          <div className={styles.sticky}>

            {/* Section heading using your pattern */}
            <div className="section-title journey-header mb-5">
              <h3>Our Story</h3>
              <TextEffect
                className="text-capitalize"
                text="flowchart animation of pharmintech journey / milestone from 2013 to 2025"
              />
              <p>
                From a singular idea in 2013 to a global turnkey partner — every
                milestone built on trust, technology, and relentless quality.
              </p>
            </div>

            {/* Clients strip */}
            <div id="clientsStrip" className={`${styles.clientsStrip} p-4 mb-3`}>
              <p className={`${styles.clientsLabel} mb-3`}>Trusted By</p>
              <div className="d-flex flex-wrap gap-2">
                {CLIENTS.map((c) => (
                  <span key={c} className={styles.clientTag}>{c}</span>
                ))}
              </div>
            </div>

            {/* Future outlook card */}
            <div id="futureCard" className={`${styles.futureCard} position-relative p-4`}>
              <div className={styles.futureOrb1} />
              <div className={styles.futureOrb2} />
              <p className={`${styles.futureLabel} mb-2`}>Future Outlook</p>
              <p className={`${styles.futureBody} mb-0`}>
                <strong style={{ fontWeight: 600, color: "#fff" }}>Continued innovation</strong>{" "}
                in the digital age with an expanding global footprint — anchored
                in trust, compliance, and design excellence.
              </p>
            </div>
          </div>
        </div>

        {/* ── RIGHT: timeline ── */}
        <div style={{ flex: "1.6 0 0" }}>
          <div ref={timelineRef} id="timeline" className={`${styles.timeline} position-relative`}>

            {/* Vertical track */}
            <div className={styles.tlTrack} />
            {/* Animated fill — height driven by GSAP ScrollTrigger */}
            <div ref={tlProgressRef} className={styles.tlProgress} />

            {TIMELINE_ITEMS.map((item, i) => (
              <div key={i} className={`${styles.tlItem} tl-item mb-5`}>

                {/* Dot */}
                <div className="tl-dot-wrap d-flex flex-column align-items-center position-relative">
                  <div className={`${styles.tlDot} tl-dot d-flex align-items-center justify-content-center`}>
                    {item.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="pt-1">
                  <div className={`${styles.tlYear} mb-1`}>{item.year}</div>
                  <div className={`${styles.tlTitle} mb-2`}>{item.title}</div>

                  {item.body && (
                    <p className={`${styles.tlBody} mb-0`}>{item.body}</p>
                  )}

                  {item.bullets && (
                    <ul className="list-unstyled mt-2 d-flex flex-column gap-1 mb-0">
                      {item.bullets.map((b, j) => (
                        <li key={j} className={`${styles.tlBulletItem} d-flex align-items-start gap-2`}>
                          <span className={styles.tlArrow}>→</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}