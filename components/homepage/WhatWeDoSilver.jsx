'use client'

import { useSelector } from "react-redux";
import useImageReveal from "@/hooks/useImageReveal"
import TextEffect from "@/components/TextEffect";
import Button from "../UI/Button/Button";



export default function WhatWeDoSilver() {
  useImageReveal(".image-anime")
  const homeData = useSelector((state) => state.home.homeData);
  if (!homeData) return null;

  return (
    <section className="what-we-do-silver bgPattern1">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-xl-6">
            <div className="what-do-image-box-silver">
              <div className="what-do-image-item-1-silver">
                <div className="what-do-client-box-silver">

                  <div className="satisfy-client-images-silver">
                    {[1, 2, 3, 4].map((n) => (
                      <div className="satisfy-client-image-silver" key={n}>
                        <figure className="image-anime">
                          <img
                            src={`/images/author-${n}.jpg`}
                            alt="Client"
                          />
                        </figure>
                      </div>
                    ))}
                  </div>

                  <div className="what-do-client-content-silver">
                    <h2>
                      <span className="counter">1.8</span>k
                    </h2>
                    <p>
                      Our exceptional spaces and personalized service keep clients
                      coming back.
                    </p>
                  </div>
                </div>

                <div className="what-do-image-1-silver">
                  <figure className="image-anime">
                    <img
                      src="/images/services/HVAC-Design-Engineering.jpg"
                      alt="HVAC Design & Engineering"
                    />
                  </figure>
                </div>
              </div>

              <div className="what-do-image-item-2-silver">
                <div className="what-do-image-2-silver">
                  <figure>
                    <img
                      src="/images/what-we-image-2-silver.png"
                      alt="Cleanroom Illustration"
                    />
                  </figure>
                </div>
              </div>

            </div>
          </div>
          <div className="col-xl-6">
            <div className="what-we-content-silver">
              <div className="section-title">
                <h3 className="wow fadeInUp">What We Do</h3>
                <TextEffect text={homeData?.what_we_do?.title_main} />
                {homeData?.what_we_do?.description.map((items,i)=>(
                  <p key={i} className="wow fadeInUp" data-wow-delay={`${i * 0.2}s`}>
                    {items}
                  </p>
                ))}
              </div>

              <div className="what-we-list-silver wow fadeInUp" data-wow-delay="0.4s">
                <ul>
                  {homeData?.what_we_do?.points.map((items, i) => (
                    <li key={i}>{items}</li>
                  ))}
                </ul>
              </div>

              <div className="what-we-btn-silver wow fadeInUp" data-wow-delay="0.6s">
                <Button variant="primary" href={homeData?.what_we_do?.button?.url} >
                  {homeData?.what_we_do?.button?.text}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
