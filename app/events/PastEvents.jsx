"use client";

import "@/styles/pastEvents.css";

import { useRef, useState, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import Lightbox from "yet-another-react-lightbox";
import Video from "yet-another-react-lightbox/plugins/video";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function PastEvents({ events = [] }) {
  const container = useRef(null);
  const stRef = useRef(null); // store ScrollTrigger instance

  const [open, setOpen] = useState(false);
  const [slides, setSlides] = useState([]);
  const [index, setIndex] = useState(0);

  /* ---------------------------------- */
  /* Extract YouTube ID safely          */
  /* ---------------------------------- */
  const extractYoutubeId = (url) => {
    const match = url?.match(/embed\/([^?]+)/);
    return match ? match[1] : "";
  };

  /* ---------------------------------- */
  /* Convert API media to slides        */
  /* ---------------------------------- */
  const buildSlides = (event) => {
    const imageSlides =
      event.pictures_list?.map((img) => ({
        type: "image",
        src: img.url,
        title: event.title,
        subtitle: `${event.event_from_date} – ${event.event_to_date}`,
      })) || [];

    const youtubeSlides =
      event.youtube_videos_list?.map((vid) => ({
        type: "video",
        sources: [{ src: vid.url, type: "text/html" }],
        poster: `https://img.youtube.com/vi/${extractYoutubeId(vid.url)}/hqdefault.jpg`,
        title: event.title,
        subtitle: "YouTube Video",
      })) || [];

    const localVideoSlides =
      event.local_videos_list?.map((vid) => ({
        type: "video",
        sources: [{ src: vid.url, type: "video/mp4" }],
        title: event.title,
        subtitle: "Event Video",
      })) || [];

    return [...imageSlides, ...youtubeSlides, ...localVideoSlides];
  };

  /* ---------------------------------- */
  /* Disable only THIS section's ST     */
  /* while lightbox is open             */
  /* ---------------------------------- */
  useEffect(() => {
    if (open) {
      stRef.current?.disable();
      document.body.style.overflow = "hidden";
    } else {
      stRef.current?.enable();
      document.body.style.overflow = "";
    }
  }, [open]);

  /* ---------------------------------- */
  /* Horizontal Scroll GSAP             */
  /* ---------------------------------- */
  useGSAP(() => {
    const scope = container.current;
    if (!scope || !events.length) return;

    const track = scope.querySelector("#hTrack");
    const outer = scope.querySelector("#hScrollOuter");
    const sticky = scope.querySelector(".h-scroll-sticky");
    const dotsEl = scope.querySelector("#hScrollDots");

    if (!track || !outer || !sticky) return;

    const cards = track.querySelectorAll(".ban-card");
    const totalCards = cards.length;

    /* ---- Few cards: no horizontal scroll ---- */
    if (totalCards <= 2) {
      outer.style.height = "auto";
      sticky.style.position = "relative";
      track.style.transform = "none";
      track.style.justifyContent = "center";
      if (dotsEl) dotsEl.style.display = "none";
      return;
    }

    /* ---- Build dots ---- */
    if (dotsEl) {
      dotsEl.innerHTML = "";
      cards.forEach((_, i) => {
        const d = document.createElement("div");
        d.className = "hsp-dot" + (i === 0 ? " active" : "");
        dotsEl.appendChild(d);
      });
    }

    const dots = dotsEl?.querySelectorAll(".hsp-dot") || [];

    /* ---- Wait for all images to load so scrollWidth is accurate ---- */
    const images = track.querySelectorAll("img");

    const initScrollTrigger = () => {
      // Kill previous instance
      if (stRef.current) {
        stRef.current.kill();
        stRef.current = null;
      }

      const getScrollDist = () =>
        Math.max(0, track.scrollWidth - window.innerWidth);

      /* Update outer height helper */
      const updateHeight = () => {
        const dist = getScrollDist();
        outer.style.height = window.innerHeight + dist + "px";
      };

      updateHeight();

      stRef.current = ScrollTrigger.create({
        trigger: outer,
        start: "top top+=50",
        end: () => "+=" + getScrollDist(),
        pin: sticky,
        scrub: 1,
        invalidateOnRefresh: true, // ✅ recalculates on resize
        onUpdate: (self) => {
          gsap.set(track, {
            x: -self.progress * getScrollDist(),
          });

          const activeIdx = Math.round(
            self.progress * (totalCards - 1)
          );

          dots.forEach((d, i) =>
            d.classList.toggle("active", i === activeIdx)
          );
        },
        onRefresh: () => {
          // ✅ Keep outer height in sync when ScrollTrigger recalculates
          updateHeight();
        },
      });
    };

    /* ✅ Wait for images before init so scrollWidth is correct */
    const imageLoadPromises = Array.from(images).map(
      (img) =>
        new Promise((resolve) => {
          if (img.complete) resolve();
          else {
            img.onload = resolve;
            img.onerror = resolve; // don't block on broken images
          }
        })
    );

    Promise.all(imageLoadPromises).then(() => {
      // Extra tick to ensure layout is painted
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          initScrollTrigger();
        });
      });
    });

    /* ✅ Handle resize — recalculate height and refresh */
    const handleResize = () => {
      const dist = Math.max(0, track.scrollWidth - window.innerWidth);
      outer.style.height = window.innerHeight + dist + "px";
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      stRef.current?.kill();
      stRef.current = null;
      window.removeEventListener("resize", handleResize);
    };
  }, { scope: container, dependencies: [events] });

  /* ---------------------------------- */
  /* Card size logic                    */
  /* ---------------------------------- */
  const getCardSizeClass = (index, total) => {
    if (total === 1) return "bc-xl";
    if (index === 0) return "bc-xl";
    if (index % 3 === 0) return "bc-sm";
    return "bc-md";
  };

  return (
    <>
      <section className="upcoming-section" ref={container}>
        <div className="sec-break g-up pt-4">
          <div className="sb-num">02</div>
          <div className="sb-info">
            <div className="sb-label">Look Back</div>
            <div className="sb-title">Past Events & Exhibitions</div>
          </div>
          <div className="sb-line"></div>
        </div>

        <div className="h-scroll-outer" id="hScrollOuter">
          <div className="h-scroll-sticky">
            <div className="h-scroll-track" id="hTrack">
              {events.map((event, indexCard) => (
                <div
                  key={event.id}
                  className={`ban-card ${getCardSizeClass(indexCard, events.length)}`}
                  onClick={() => {
                    const allSlides = buildSlides(event);
                    if (!allSlides.length) return;
                    setSlides(allSlides);
                    setIndex(0);
                    setTimeout(() => setOpen(true), 0);
                  }}
                  data-cursor-text="View"
                >
                  <img
                    className="ban-img"
                    src={event.banner_url}
                    alt={event.title}
                  />
                  <div className="ban-color-overlay bc1o"></div>
                  <div className="ban-grad"></div>
                  <div className="ban-top">
                    <span className="ban-cat">{event.event_type}</span>
                  </div>
                  <div className="ban-bot">
                    <div className="ban-month">
                      {event.event_from_date} – {event.event_to_date}
                    </div>
                    <div className="ban-title">{event.title}</div>
                    <div className="ban-venue">{event.address}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="h-scroll-progress" id="hScrollDots"></div>
      </section>

      <Lightbox
        open={open && slides.length > 0}
        close={() => setOpen(false)}
        slides={slides}
        index={Math.min(index, slides.length - 1)}
        carousel={{ finite: slides.length === 1 }}
        plugins={[Video, Thumbnails]}
        thumbnails={{
          position: "bottom",
          width: 80,
          height: 60,
          borderRadius: 6,
        }}
        render={{
          slideFooter: ({ slide }) => (
            <div className="custom-lightbox-caption">
              <div className="clb-title">{slide?.title}</div>
              {slide?.subtitle && (
                <div className="clb-subtitle">{slide.subtitle}</div>
              )}
            </div>
          ),
        }}
      />
    </>
  );
}