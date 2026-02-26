"use client";

import styles from "@/styles/events.module.css";
import { useState } from "react";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export default function UpcomingSection({ events, loading }) {

  const [open, setOpen] = useState(false);
  const [slides, setSlides] = useState([]);

  if (loading) return <p className={styles.loading}>Loading...</p>;

  const openBanner = (event) => {
    setSlides([
      {
        src: event.banner_url,
        title: event.title,
        subtitle: `${event.event_from_date} – ${event.event_to_date}`,
      },
    ]);
    setOpen(true);
  };

  return (
    <>
      <section className={styles.wrapper}>
        <div className={styles.sectionBreak}>
          <div className={styles.number}>01</div>
          <div>
            <span className={styles.label}>What's On</span>
            <h2 data-cursor="-opaque" className={styles.title}>
              Upcoming Events & Exhibitions
            </h2>
          </div>
        </div>

        <div className={styles.grid}>
          {events.map((event, indexCard) => (
            <div
              key={event.id}
              className={`${styles.card} ${
                indexCard === 0 ? styles.heroCard : ""
              }`}
              onClick={() => openBanner(event)}
              data-cursor-text="View"

            >
              <img
                src={event.banner_url}
                alt={event.title}
                className={styles.image}
                style={{ cursor: "pointer" }}
              />

              <div className={styles.content}>
                <span className={styles.date}>
                  {event.event_from_date} – {event.event_to_date}
                </span>

                <h3>{event.title}</h3>
                <p>{event.address}</p>
              </div>

              <div className={styles.floatBadge}>Upcoming</div>
              <div className={styles.bmTint}></div>
              <div className={styles.overlay}></div>
            </div>
          ))}
        </div>
      </section>

      {/* 🔥 Simple Lightbox */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={slides}
        carousel={{finite: slides.length === 1,}}
        render={{
          slideFooter: ({ slide }) => (
            <div className={styles.lightboxCaption}>
              <div className={styles.lbTitle}>
                {slide.title}
              </div>
              {slide.subtitle && (
                <div className={styles.lbSubtitle}>
                  {slide.subtitle}
                </div>
              )}
            </div>
          ),
        }}
      />
    </>
  );
}