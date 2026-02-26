"use client";

import styles from "@/styles/events.module.css";

export default function HeroSection({ upcomingCount , pastEvents }) {
  return (
    <section className={styles.hero}>
      <div className={styles.heroLeft}>
        <div className={styles.eyebrow}>
          <span className={styles.dot}></span>
          <span className={styles.eyebrowText}>
            Season 2025 · 2026
          </span>
        </div>

        <h1 data-cursor="-opaque" className={styles.heading}>
            Events & <br /> <em>Exhibitions</em>
        </h1>

        <p className={styles.description}>
          A curated programme of world-class exhibitions, talks, workshops
          and performances for curious minds.
        </p>
      </div>

      <div className={styles.heroRight}>
        <p className={styles.quote}>
          "Innovation begins where curiosity meets experience."
        </p>

        <div className={styles.stats}>
          <div data-cursor="-opaque">
            <div className={styles.statNumber}>{upcomingCount}</div>
            <div className={styles.statLabel}>Upcoming</div>
          </div>

          <div data-cursor="-opaque">
            <div className={styles.statNumber}>{pastEvents}</div>
            <div className={styles.statLabel}>Past Events</div>
          </div>
        </div>
      </div>
    </section>
  );
}