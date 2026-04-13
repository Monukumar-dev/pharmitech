"use client";

import styles from "@/styles/PharminDifference.module.css";
import TextEffect from "@/components/TextEffect";

const CARD_ICONS = [
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width={24} height={24}>
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5" />
    <path d="M2 12l10 5 10-5" />
  </svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width={24} height={24}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9h18M9 21V9" />
  </svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width={24} height={24}>
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" />
  </svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width={24} height={24}>
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width={24} height={24}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>,
];

// Parse the raw HTML string into card objects
function parseCardsFromHTML(htmlString) {
  if (!htmlString) return [];

  // Run only on client (DOMParser is browser-only)
  if (typeof window === "undefined") return [];

  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");
  const body = doc.body;

  const cards = [];
  let currentTitle = null;
  let currentItems = [];

  const flush = () => {
    if (currentTitle && currentItems.length > 0) {
      cards.push({ title: currentTitle, items: currentItems });
      currentTitle = null;
      currentItems = [];
    }
  };

  body.childNodes.forEach((node) => {
    // Skip empty/whitespace nodes
    if (node.nodeType === Node.TEXT_NODE) return;
    const tag = node.tagName?.toLowerCase();
    const text = node.textContent?.trim();
    if (!text) return;

    // Headings or <p><strong> → new card title
    if (tag === "h3" || tag === "h2" || (tag === "p" && node.querySelector("strong"))) {
      const strongText = node.querySelector("strong")?.textContent?.trim() || text;
      if (strongText) {
        flush();
        currentTitle = strongText;
      }
      return;
    }

    // <ul> → list items for current card
    if (tag === "ul") {
      const items = [...node.querySelectorAll("li")]
        .map((li) => li.textContent.trim())
        .filter(Boolean);
      currentItems.push(...items);
      return;
    }
  });

  flush(); // push last card
  return cards;
}

export default function PharminDifference({ data }) {
  if (data?.active === false) return null;

  const cards = parseCardsFromHTML(data?.data);

  return (
    <section
      id="difference"
      className={`${styles.section} position-relative dark-section rounded-4 mx-md-4 mt-5`}
    >
      {/* Ambient orbs */}
      <div className={`${styles.orb} ${styles.orb1}`} />
      <div className={`${styles.orb} ${styles.orb2}`} />

      <div className="section-title diff-header mb-5">
        <h3>What Sets Us Apart</h3>
        <TextEffect text={data?.name || "The Pharmintech Difference"} />
      </div>

      {/* Cards grid */}
      <div id="diff-grid" className="row g-3">
        {cards.map((card, index) => (
          <div key={index} className="col-12 col-md-6 mb-3 col-xl-4 wow">
            <div
              data-cursor="-opaque"
              className={`${styles.card} position-relative p-4 p-xl-5 h-100`}
            >
              <div className={styles.cardOverlay} />
              <div
                className={`${styles.cardIcon} d-flex align-items-center justify-content-center mb-4`}
              >
                {CARD_ICONS[index] ?? CARD_ICONS[0]}
              </div>
              <h3
                className={`${styles.cardTitle} d-flex align-items-center gap-2 mb-3`}
              >
                <span className={styles.cardNum}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                {card.title}
              </h3>
              <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
                {card.items.map((item, i) => (
                  <li
                    key={i}
                    className={`${styles.cardItem} d-flex align-items-start gap-2`}
                  >
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