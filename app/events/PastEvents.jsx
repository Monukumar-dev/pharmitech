"use client";

import "@/styles/pastEvents.css";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import Lightbox from "yet-another-react-lightbox";
import Video from "yet-another-react-lightbox/plugins/video";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/styles.css";
import TextEffect from "../../components/TextEffect";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function PastEvents({ events = [] }) {
  const container = useRef(null);

  const [open, setOpen] = useState(false);
  const [slides, setSlides] = useState([]);
  const [index, setIndex] = useState(0);

  // 🔥 Convert API media to Lightbox slides
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

  useGSAP(() => {
    const scope = container.current;
    if (!scope) return;

    const track = scope.querySelector("#hTrack");
    const outer = scope.querySelector("#hScrollOuter");
    const sticky = scope.querySelector(".h-scroll-sticky");
    const dotsEl = scope.querySelector("#hScrollDots");

    const cards = track.querySelectorAll(".ban-card");
    const totalCards = cards.length;

    if (totalCards <= 2) {
      outer.style.height = "auto";
      sticky.style.position = "relative";
      track.style.transform = "none";
      track.style.justifyContent = "center";
      dotsEl.style.display = "none";
      return;
    }

    dotsEl.innerHTML = "";

    cards.forEach((_, i) => {
      const d = document.createElement("div");
      d.className = "hsp-dot" + (i === 0 ? " active" : "");
      dotsEl.appendChild(d);
    });

    const dots = dotsEl.querySelectorAll(".hsp-dot");

    const getScrollDist = () =>
      track.scrollWidth - window.innerWidth;

    let scrollDist = getScrollDist();
    outer.style.height =
      window.innerHeight + scrollDist + "px";

    const st = ScrollTrigger.create({
      trigger: outer,
      start: "top top+=50",
      end: () => "+=" + getScrollDist(),
      pin: sticky,
      scrub: 1,
      onUpdate: (self) => {
        gsap.to(track, {
          x: -self.progress * getScrollDist(),
          ease: "none",
          duration: 0,
        });

        const activeIdx = Math.round(
          self.progress * (totalCards - 1)
        );

        dots.forEach((d, i) =>
          d.classList.toggle("active", i === activeIdx)
        );
      },
    });

    return () => st.kill();
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
                <div className="sb-title">Past Events &amp; Exhibitions</div>
            </div>
            <div className="sb-line"></div>
            {/* <p className="sb-link">{events.length} Event{events.length !== 1 && "s"}</p> */}
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
                    setSlides(allSlides);
                    setIndex(0);
                    setOpen(true);
                  }}
                >
                  <img
                    className="ban-img"
                    src={event.banner_url}
                    alt={event.title}
                  />

                  <div className="ban-color-overlay bc1o"></div>
                  <div className="ban-grad"></div>

                  <div className="ban-top">
                    <span className="ban-cat">
                      {event.event_type}
                    </span>
                  </div>

                  <div className="ban-bot">
                    <div className="ban-month">
                      {event.event_from_date} – {event.event_to_date}
                    </div>

                    <div className="ban-title">
                      {event.title}
                    </div>

                    <div className="ban-venue">
                      {event.address}
                    </div>
                  </div>
                </div>
              ))}

            </div>
          </div>
        </div>

        <div className="h-scroll-progress" id="hScrollDots"></div>
      </section>

   <Lightbox
  open={open}
  close={() => setOpen(false)}
  slides={slides}
  index={index}
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
        <div className="clb-title">{slide.title}</div>
        {slide.subtitle && (
          <div className="clb-subtitle">{slide.subtitle}</div>
        )}
      </div>
    ),
  }}
/>
          
    </>
  );
}