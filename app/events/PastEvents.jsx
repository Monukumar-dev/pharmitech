"use client";

import "@/styles/pastEvents.css";

import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import Lightbox from "yet-another-react-lightbox";
import Video from "yet-another-react-lightbox/plugins/video";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// ✅ Single source of truth for mobile breakpoint — matches your CSS exactly
const MOBILE_BREAKPOINT = 768;

export default function PastEvents({ events = [] }) {
  const container = useRef(null);
  const stRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [slides, setSlides] = useState([]);
  const [index, setIndex] = useState(0);

  const extractYoutubeId = (url) => {
    const match = url?.match(/embed\/([^?]+)/);
    return match ? match[1] : "";
  };

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

  useEffect(() => {
    if (open) {
      stRef.current?.disable();
      document.body.style.overflow = "hidden";
    } else {
      stRef.current?.enable();
      document.body.style.overflow = "";
    }
  }, [open]);

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

    // ✅ CRITICAL FIX: Completely skip GSAP on mobile.
    // Your CSS already handles mobile perfectly (flex-direction: column,
    // transform: none !important, position: relative).
    // GSAP was overriding all of that and breaking the layout.
    const isMobile = () => window.innerWidth <= MOBILE_BREAKPOINT;

    const killScrollTrigger = () => {
      if (stRef.current) {
        stRef.current.kill();
        stRef.current = null;
      }
      // ✅ Reset any inline styles GSAP may have set so CSS takes over cleanly
      outer.style.height = "";
      track.style.transform = "";
      sticky.style.transform = "";
    };

    const initDesktop = () => {
      // ✅ Already killed or never existed — safe to re-init
      if (stRef.current) return;

      if (totalCards <= 2) {
        outer.style.height = "auto";
        sticky.style.position = "relative";
        track.style.transform = "none";
        track.style.justifyContent = "center";
        if (dotsEl) dotsEl.style.display = "none";
        return;
      }

      // Build dots
      if (dotsEl) {
        dotsEl.innerHTML = "";
        cards.forEach((_, i) => {
          const d = document.createElement("div");
          d.className = "hsp-dot" + (i === 0 ? " active" : "");
          dotsEl.appendChild(d);
        });
      }

      const dots = dotsEl?.querySelectorAll(".hsp-dot") || [];

      const getScrollDist = () =>
        Math.max(0, track.scrollWidth - window.innerWidth);

      const updateHeight = () => {
        outer.style.height = window.innerHeight + getScrollDist() + "px";
      };

      updateHeight();

      stRef.current = ScrollTrigger.create({
        trigger: outer,
        start: "top top",
        end: () => "+=" + getScrollDist(),
        pin: sticky,
        scrub: 1,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          gsap.set(track, {
            x: -self.progress * getScrollDist(),
            force3D: true,
          });
          const activeIdx = Math.round(self.progress * (totalCards - 1));
          dots.forEach((d, i) =>
            d.classList.toggle("active", i === activeIdx)
          );
        },
        onRefresh: () => updateHeight(),
      });
    };

    // ✅ On first load: only init desktop if not mobile
    const setup = () => {
      if (isMobile()) {
        killScrollTrigger(); // ensure clean state
      } else {
        initDesktop();
      }
    };

    // ✅ Wait for images before init (fixes scrollWidth being wrong)
    const images = track.querySelectorAll("img");
    const imageLoadPromises = Array.from(images).map(
      (img) =>
        new Promise((resolve) => {
          if (img.complete && img.naturalWidth > 0) resolve();
          else {
            img.onload = resolve;
            img.onerror = resolve;
          }
        })
    );

    Promise.all(imageLoadPromises).then(() => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setup();
        });
      });
    });

    // ✅ Handle resize: switch between mobile/desktop cleanly
    // Uses matchMedia so it only fires AT the breakpoint, not on every px change
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);

    const handleBreakpoint = (e) => {
      if (e.matches) {
        // Switched to mobile — kill GSAP, let CSS handle it
        killScrollTrigger();
      } else {
        // Switched to desktop — init GSAP
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            ScrollTrigger.refresh();
            initDesktop();
          });
        });
      }
    };

    mq.addEventListener("change", handleBreakpoint);

    // ✅ Still handle resize for scrollWidth recalculation on desktop
    const ro = new ResizeObserver(() => {
      if (!isMobile() && stRef.current) {
        const dist = getScrollDist();
        outer.style.height = window.innerHeight + dist + "px";
        ScrollTrigger.refresh();
      }
    });

    // Need getScrollDist accessible in ResizeObserver
    const getScrollDist = () =>
      Math.max(0, track.scrollWidth - window.innerWidth);

    ro.observe(outer);

    return () => {
      stRef.current?.kill();
      stRef.current = null;
      mq.removeEventListener("change", handleBreakpoint);
      ro.disconnect();
    };
  }, { scope: container, dependencies: [events] });

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
            <h2 className="sb-title">Past Events & Exhibitions</h2>
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
                    loading="eager"
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
                    <h3 className="ban-title">{event.title}</h3>
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
        thumbnails={{ position: "bottom", width: 80, height: 60, borderRadius: 6 }}
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