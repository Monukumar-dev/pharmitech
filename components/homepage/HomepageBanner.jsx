'use client'

import Link from "next/link"
import Image from "next/image"
import { useEffect } from "react"

import { shallowEqual, useDispatch, useSelector } from "react-redux"

import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import useParallax from "@/hooks/useParallax"

import Button from "@/components/UI/Button/Button"



export default function HomepageBanner() {

  useParallax(".tech-parallax-bg", 420)

  const banners = useSelector((state) => state.home.banners);
  const homeData = useSelector((state) => state.home.homeData);
  const clients = useSelector((state) => state.client.clients);

  
  if (!banners.length) return null;

  return (
    <section className="hero-silver bg-section dark-section parallaxie">
      <div
        className="tech-parallax-bg"
        style={{
          backgroundImage: `url(${banners[0].media_url})`,
        }}
      />

      <div className="container-fluid position-relative z-3">
        <div className="row">
          <div className="col-lg-12">

            <div className="hero-box-silver">
              {/* Hero Content */}
              <div className="hero-content-silver">
                <div className="section-title">
                  <h3 className="wow fadeInUp mt-4">{banners[0].title}</h3>

                  <h1 className="text-anime-style-3" data-cursor="-opaque">
                    {banners[0].heading}
                  </h1>

                  <p className="wow fadeInUp" data-wow-delay="0.2s">
                    {banners[0].paragraph}
                  </p>
                </div>

                <div className="hero-body-silver">
                 
                  {/* Counters */}
                  <div className="d-flex gap-0">
                     <img className="wow fadeInUp" height="auto" width="180px" src="images/icons/homeBannerCounter1.png" alt="" />
                     <img className="wow fadeInUp" height="auto" width="180px" src="images/icons/homeBannerCounter2.png" alt="" />
                     <img className="wow fadeInUp" height="auto" width="180px" src="images/icons/homeBannerCounter3.png" alt="" />
                  </div>
                  {/* <div className="about-us-counter-list-silver wow fadeInUp" data-wow-delay="0.6s">
                    {homeData?.banner_metrics?.map((item, i) => (
                      <div className="about-counter-item-silver" key={i}>
                        
                        <div className="LaurelwreathText text-center">
                        {item.value ? (
                          <>
                            <h2 className="text-light">
                              <span className="counter">{item.value}</span>+
                            </h2>
                            {item.label && <p className="text-light">{item.label}</p>}
                          </>
                        ) : (
                          item.label && <h4 className="text-light">{item.label}</h4>
                        )}
                        </div>

                      </div>
                    ))}
                  </div> */}
                  <div className="hero-btn-silver wow fadeInUp" data-wow-delay="0.4s">
                    <Button href={banners[0].button_url} variant="secondary" >
                        {banners[0].button_name}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Company Slider */}
              <div className="hero-company-slider-box-silver">
                <p className="text-start">
                  <span className="counter">100</span>+ Trusted Clients Over Worldwide
                </p>

                <div className="hero-company-slider-silver">
                  <Swiper
                    slidesPerView={3}
                    spaceBetween={30}
                    loop={true}
                    speed= {2000}
                    autoplay={{ delay: 5000 }}
                    breakpoints={{
                      320: { slidesPerView: 2 },
                      768: { slidesPerView: 3 },
                      1024: { slidesPerView: 3 },
                    }}
                  >
                    {clients.map((logo, i) => (
                      <SwiperSlide key={logo.id}>
                        <div className="company-logo">
                          <img
                            src={logo.client_logo_url}
                            alt={logo.client_name || "company logo"}
                            // width={160}
                            // height={80}
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// function connectToStore(store) {
//   return {
//     loading: store.home.loading,
//     error: store.home.error,
//     homeData: store.home.homeData,
//   };
// }
