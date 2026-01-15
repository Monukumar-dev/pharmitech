"use client";
import useParallax from "@/hooks/useParallax"
import TextEffect from "@/components/TextEffect";
import Link from "next/link";

import { useSelector } from "react-redux";

export default function IntroVideoBoxSilver() {
  useParallax(".tech-parallax-bg", 420)
  
  const homeData = useSelector((state) => state.home.homeData);
  if (!homeData) return null;

  return (
    <div className="intro-video-box-silver bg-section dark-section">
        <div
        className="tech-parallax-bg"
        style={{
          backgroundImage: "url('/images/intro-video-bg-silver.jpg')",
        }}
      />
      <div className="container position-relative z-3">
        <div className="row">
          <div className="col-lg-12">
            <div className="intro-video-content">
              <div className="section-title">
                <TextEffect text={homeData?.explore_things?.title} />
              </div>

              <div className="video-play-button-silver bg-effect-silver">
                {/* <Link href="#" className="popup-video" data-cursor-text="Play">
                  <i className="fa-solid fa-play"></i>
                </Link> */}

                <a className="popup-video" data-cursor-text="Play" data-fancybox="mixed" href={homeData?.explore_things?.video}>
                  <i className="fa-solid fa-play"></i>
                </a>
              </div>
            </div>
          </div>

          <div className="col-lg-12">
            <div
              className="intro-video-footer-list wow fadeInUp"
              data-wow-delay="0.2s"
            >
              <ul>
                {homeData?.explore_things?.points.map((items, i) =>(
                  <li key={i}>{items}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
