"use client";

import styles from "@/styles/PharminDifference.module.css";
import TextEffect from "@/components/TextEffect"; 

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

export default function PharminDifference() {
 
  return (
    <section
      id="difference"
      className={`${styles.section} position-relative dark-section rounded-4 mx-md-4 mt-5`}
    >
      {/* Ambient orbs */}
      <div  className={`${styles.orb} ${styles.orb1}`} />
      <div  className={`${styles.orb} ${styles.orb2}`} />

      <div className="section-title diff-header mb-5">
        <h3>What Sets Us Apart</h3>
        <TextEffect text="The Pharmintech Difference" />
        {/* <p>End-to-end capability built in-house. From concept to compliance —
          every step owned, every outcome assured.
        </p> */}
      </div>

      {/* ── Cards grid ── */}
      <div id="diff-grid" className="row g-3">
        {DIFFERENCE_CARDS.map((card) => (
          <div key={card.num} className="col-12 col-md-6 mb-3 col-xl-4 wow">
            <div data-cursor="-opaque" className={`${styles.card} position-relative p-4 p-xl-5 h-100`}>
              <div className={`${styles.cardOverlay}`} />
              <div className={`${styles.cardIcon} d-flex align-items-center justify-content-center mb-4`}>
                {card.icon}
              </div>
              <h3 className={`${styles.cardTitle} d-flex align-items-center gap-2 mb-3`}>
                <span className={styles.cardNum}>{card.num}</span>
                {card.title}
              </h3>
              <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
                {card.items.map((item, i) => (
                  <li key={i} className={`${styles.cardItem} d-flex align-items-start gap-2`}>
                    <span className={styles.cardDot} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}