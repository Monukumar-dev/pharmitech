"use client";

import styles from "@/styles/events.module.css";

export default function UpcomingSection({ events, loading }) {
  if (loading) return <p className={styles.loading}>Loading...</p>;

  return (
    <section className={styles.wrapper}>
      <div className={styles.sectionBreak}>
        <div className={styles.number}>01</div>
        <div>
          <span className={styles.label}>What's On</span>
          <h2 className={styles.title}>
            Upcoming Events & Exhibitions
          </h2>
        </div>
      </div>

      <div className={styles.grid}>
        {events.map((event, index) => (
          <div
            key={event.id}
            className={`${styles.card} ${
              index === 0 ? styles.heroCard : ""
            }`}
          >
            <img
              src={event.banner_url}
              alt={event.title}
              className={styles.image}
            />
            <div className={styles.content}>
              <span className={styles.date}>
                {event.event_from_date} – {event.event_to_date}
              </span>

              <h3>{event.title}</h3>
              <p>{event.address}</p>

              {/* <Button href="#" variant="primary"> View Details → </Button> */}
            </div>
            <div class={styles.floatBadge}>Upcoming</div>
            <div className={styles.bmTint}></div>
            <div className={styles.overlay}></div>
          </div>
        ))}
      </div>
    </section>
  );
}