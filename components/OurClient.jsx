"use client";

import { SwiperSlide } from "swiper/react";
import ReusableSlider from "@/components/ReusableSlider";
import { useSelector } from "react-redux";

export default function OurClient() {
  const clients = useSelector((state) => state.client.clients);

  if (!clients || clients.length === 0) return null;

  return (
    <div className="company-supports-slider-box">
      <div className="company-supports-content">
        <hr />
        <p>1000+ Trusted Clients Over Worldwide</p>
        <hr />
      </div>
      <div className="company-supports-slider">
        <ReusableSlider
          slidesPerView={5}
          breakpoints={{
            0: { slidesPerView: 2 },
            576: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            992: { slidesPerView: 5 },
          }}
        >
          {clients.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="company-supports-logo">
                <img
                  src={item.client_logo_url}
                  alt={item.client_name}
                />
              </div>
            </SwiperSlide>
          ))}
        </ReusableSlider>
      </div>
    </div>
  );
}
