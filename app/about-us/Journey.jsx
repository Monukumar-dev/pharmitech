"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextEffect from "@/components/TextEffect"; 
import styles from "@/styles/Pharminjourney.module.css";
import { ArrowBigRight, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);


const TIMELINE_ITEMS = [
  {
    id: 1,
    year: "2013",
    title: "Commencement",
    bullets: [
      "Establishment of Pharmintech Turnkey Solutions Pvt. Ltd.",
      "Focus: Cleanroom design, engineering, compliance",
    ],
    type: "start",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width={16} height={16}>
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    id: 2,
    year: "Early Years",
    title: "First Turnkey Projects",
    bullets: [
      "First turnkey cleanroom installations",
      "Building credibility through precision + compliance",
    ],
    type: "milestone",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width={16} height={16}>
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
  },
  {
    id: 3,
    year: "Growth Phase",
    title: "Service Expansion",
    bullets: [
      "Concept design → detailed engineering → compliance validation",
    ],
    type: "growth",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width={16} height={16}>
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="16" />
        <line x1="8" y1="12" x2="16" y2="12" />
      </svg>
    ),
  },
  {
    id: 4,
    year: "2019",
    title: "2019 Milestone: In-House Manufacturing",
    bullets: [
      "Establishment of dedicated manufacturing facilities",
      "Enhanced control over quality, precision, and timelines",
    ],
    type: "highlight",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width={16} height={16}>
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  },
  {
    id: 5,
    year: "Reputation Phase",
    title: "Reputation Building",
    bullets: [
      "Trusted partner for various industries",
      "Known for premium, minimal, emotionally resonant communication",
    ],
    type: "milestone",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width={16} height={16}>
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
  },
  {
    id: 6,
    year: "2025",
    title: "Current Position",
    bullets: [
      "Global turnkey solutions provider",
      "Turnkey Cleanroom engineering partner",
      "Long-term client partnerships",
      "Trusted by industry leaders such as Alembic Pharmaceuticals, Cipla, Glenmark, Meril, AMI Lifesciences, Sava Healthcare, Vasudha Pharma, 3M India, Ajanta Pharma, Intas, Kemwell, Recipharm, Wockhardt, Endurance Technologies, and many more.",
    ],
    type: "current",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width={16} height={16}>
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    id: 7,
    year: "Future",
    title: "Future Outlook",
    bullets: [
      "Continued innovation in digital age + Expanding global footprint",
      "Commitment to trust, compliance, and design excellence",
    ],
    type: "future",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width={16} height={16}>
        <path d="M5 12h14" />
        <path d="M13 5l7 7-7 7" />
      </svg>
    ),
  },
];


export default function Journey({data}) {
  
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
      className={`${styles.section} position-relative mx-4 rounded-4 mt-5`}
    >
      {/* Decorative right-edge accent line */}
      <div className={styles.accentLine} />
      <div className="d-flex flex-column flex-lg-row align-items-lg-start" style={{ gap: "80px" }}>
        <div style={{ flex: "1 0 0" }}>
          <div className={styles.sticky}>
            <div className="section-title journey-header mb-5">
              <h3>Our Story</h3>
              <TextEffect className="text-capitalize" text="Pharmintech Journey"/>
              <p>
                From a singular idea in 2013 to a global turnkey partner — every
                milestone built on trust, technology, and relentless quality.
              </p>
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
            <div className={styles.tlTrack} />
            <div ref={tlProgressRef} className={styles.tlProgress} />

            {data?.items?.map((item, i) => (
              <div key={i} className={`${styles.tlItem} tl-item mb-5`}>

                {/* Dot */}
                <div className="tl-dot-wrap d-flex flex-column align-items-center position-relative">
                  <div className={`${styles.tlDot} tl-dot d-flex align-items-center justify-content-center`}>
                    <img className="tlIMG" src={item?.icon_url} alt="" />
                    {/* {item.icon} */}
                  </div>
                </div>

                {/* Content */}
                <div className="pt-1">
                  {/* <div className={`${styles.tlYear} mb-1`}>{item.year}</div> */}
                  <div className={`${styles.tlTitle} mb-2`}>{item.title}</div>

                  {/* {item.body && (
                    <p className={`${styles.tlBody} mb-0`}>{item.body}</p>
                  )} */}

                  {item.points && (
                    <ul className="list-unstyled mt-2 d-flex flex-column gap-1 mb-0">
                      {item.points.map((b, j) => (
                        <li key={j} className={`${styles.tlBulletItem} d-flex align-items-start gap-2`}>
                          <span className={styles.tlArrow}><ArrowRight size={14} /></span>
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