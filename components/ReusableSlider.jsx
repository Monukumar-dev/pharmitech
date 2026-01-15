"use client";

import { Swiper } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function ReusableSlider({
  children,
  slidesPerView = 4,
  spaceBetween = 30,
  loop = true,
  autoplay = true,
  delay = 2500,
  breakpoints = {},
  navigation = false,
  pagination = false,
  className = "",
}) {
  return (
    <Swiper
      modules={[Autoplay, Navigation, Pagination]}
      slidesPerView={slidesPerView}
      spaceBetween={spaceBetween}
      loop={loop}
      autoplay={
        autoplay
          ? {
              delay,
              disableOnInteraction: false,
            }
          : false
      }
      navigation={navigation}
      pagination={pagination ? { clickable: true } : false}
      breakpoints={breakpoints}
      className={className}
    >
      {children}
    </Swiper>
  );
}
