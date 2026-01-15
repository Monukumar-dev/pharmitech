'use client'

import { useSelector } from "react-redux";
import TextEffect from "@/components/TextEffect";

export default function WhatWeDo() {

  const homeData = useSelector((state) => state.home.homeData);
  
  if (!homeData) return null;

  return (
    <section className="what-we-do">
      <div className="container">

        {/* SECTION HEADER */}
        <div className="row section-row align-items-center">
          <div className="col-xl-6">
            <div className="section-title">
              <h3 className="wow fadeInUp">Advantage</h3>
              <TextEffect text="The PharminTECH Advantage" />

            </div>
          </div>

          <div className="col-xl-6">
            <div className="section-title-content wow fadeInUp" data-wow-delay="0.2s">
              {homeData?.pharminTech_advantage?.[0]?.description?.map((item, i) => (
                <p key={i} className="wow fadeInUp" data-wow-delay={`${i * 0.2}s`}>
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* CARDS */}
        <div className="row">
          {homeData?.pharminTech_advantage?.[0]?.advantages?.map((item, i) => (
            <div className="col-xl-3 col-md-6" key={i}>
              <div
                className="what-we-do-item wow fadeInUp"
                data-wow-delay={`${i * 0.2}s`}
              >
                <div className="what-we-do-item-header">
                  <div className="icon-box">
                    <i className={`${item.icon_class}`}></i>
                    {/* <img src={item.icon_class} alt="" /> */}
                  </div>
                  <div className="what-we-do-item-number">
                    <h3>{item.number}</h3>
                  </div>
                </div>
                <div className="what-we-do-item-body border-0">
                  <h3>{item.title}</h3>
                  <p>{item.paragraph}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* COUNTERS */}
        <div className="row">
          <div className="col-lg-12">
            <div className="about-counter-box-silver">
              <div
                className="about-counter-title-silver wow fadeInUp"
                data-wow-delay="0.6s"
              >
                <h3>Metrics & Numbers</h3>
              </div>

              <div className="about-us-counter-list-silver justify-content-center">
                {homeData?.metrics.map((c, i) => (
                  <div className="about-counter-item-silver" key={i}>
                    <h2>
                      <span className="counter">{c.value}</span>
                      {"+"}
                    </h2>
                    <p>{c.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
