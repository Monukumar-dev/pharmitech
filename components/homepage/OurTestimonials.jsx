"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { useSelector } from "react-redux";

import useParallax from "@/hooks/useParallax";
import TextEffect from "@/components/TextEffect";

export default function OurTestimonialsSilver() {
  useParallax(".tech-parallax-bg", 820)

  const { status, data, list, error } = useSelector((state) => state.testimonials);

  return (
    <div className="our-testimonials-silver bg-section dark-section parallaxie">

      <div
        className="tech-parallax-bg"
        style={{
          backgroundImage: "url('/images/testimonial-bg-silver.jpg')",
        }}
      />

      <div className="container position-relative z-3">
        <div className="row">
          <div className="col-xl-6">
            <div className="testimonials-content-silver">
              <div className="section-title">
                <h3 className="wow fadeInUp">{data?.title}</h3>
                <TextEffect text={data?.heading} />
                <p>{data?.paragraph}</p>
              </div>

              <div className="testimonial-rating-box-silver">
                <div className="icon-box">
                  <img src="images/google-logo-silver.svg" alt="" />
                </div>
                <div className="testimonial-rating-content-silver">
                  <div className="testimonial-rating-content-header-silver">
                    <div className="testimonial-rating-counter-silver">
                      <h3>
                        <span className="counter">{data?.google_data?.overall_rating || 4.9}</span>/5
                      </h3>
                    </div>
                    <div className="testimonial-rating-review-silver">
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                    </div>
                  </div>
                  <div className="testimonial-rating-body-silver">
                    <p>{data?.google_data?.text}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-6">
            {/* Testimonial Slider Start */}
            <div className="testimonial-slider-silver">
              <Swiper
                modules={[Pagination, Autoplay]}
                slidesPerView={1.4}
                spaceBetween={60}
                pagination={{
                  el: ".testimonial-pagination-silver",
                  clickable: true,
                }}
                autoplay={{
                  delay: 4000,
                  disableOnInteraction: false,
                }}
                loop
              >
                <div className="swiper-wrapper" data-cursor-text="Drag">

                  {list.map((items,i) =>(
                    <SwiperSlide key={items.id}>
                    <div className="testimonial-item-silver">
                      <div className="testimonial-item-header-silver">
                        <div className="testimonial-rating-silver">
                          {[...Array(5)].map((_, index) => (
                              <i
                                key={index}
                                className={`fa-star ${
                                  index < items.rating ? "fa-solid" : "fa-regular"
                                }`}
                              ></i>
                            ))}
                        </div>
                        <div className="testimonial-content-silver">
                          <p>{items.message}</p>
                        </div>
                      </div>
                      <div className="testimonial-body-silver">
                        <div className="author-content-silver">
                          <h3>{items.name}</h3>
                          <p>{items.designation}</p>
                        </div>
                        <div className="testimonial-quote-silver">
                          <img
                            src="images/testimonial-quote-silver.svg"
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                  ))}
                </div>

                <div className="testimonial-pagination-silver"></div>
              </Swiper>
            </div>
            {/* Testimonial Slider End */}
          </div>
        </div>
      </div>
    </div>
  );
}
