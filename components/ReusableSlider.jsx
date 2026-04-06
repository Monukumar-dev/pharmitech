"use client";

import { Swiper } from "swiper/react";
import { Autoplay, Navigation, Pagination, FreeMode } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./ReusableSlider.css";

export default function ReusableSlider({
  children,
  slidesPerView = 4,
  spaceBetween = 30,
  loop = true,
  autoplay = true,
  delay = 500,
  speed = 300,
  breakpoints = {},
  navigation = false,
  pagination = false,
  marquee = true,
  className = "",
}) {
  const isMarquee = marquee && autoplay;

  return (
    <Swiper
      modules={[Autoplay, Navigation, Pagination, FreeMode]}
      slidesPerView={slidesPerView}
      spaceBetween={spaceBetween}
      loop={loop}
      speed={isMarquee ? 4500 : speed}
      allowTouchMove={!isMarquee}
      freeMode={isMarquee ? { enabled: true, momentum: false } : false}
      autoplay={
        autoplay
          ? {
              delay: isMarquee ? 0 : delay,
              disableOnInteraction: false,
              pauseOnMouseEnter: false,
            }
          : false
      }
      navigation={navigation}
      pagination={pagination ? { clickable: true } : false}
      breakpoints={breakpoints}
      className={`${className} ${isMarquee ? "marquee-swiper" : ""}`.trim()}
    >
      {children}
    </Swiper>
  );
}
