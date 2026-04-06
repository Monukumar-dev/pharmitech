"use client";

import styles from "@/styles/DirectorsMessage.module.css";
import TextEffect from "@/components/TextEffect";
import {toCapitalize} from "@/utils/helper"

export default function Directors({ members = [] }) {
  return (
    <section className={`${styles.directorsSection} dark-section mb-5`}>

      <div className={styles.bgDots}></div>
      <div className={styles.bgCircleTop}></div>
      <div className={styles.bgCircleBottom}></div>

      <div className="container position-relative">
        <div className="row section-row align-items-center justify-content-center mb-0">
              <div className="col-lg-6">
                <div className="section-title">
                  <h3 className="wow fadeInUp">BOARD OF DIRECTORS</h3>
                  <div
                    className="text-effect"
                    data-cursor="-opaque"
                  >
                    <TextEffect text="Visionary Leadership Driving Precision and Innovation" />
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="section-title-content">
                  <p className="mt-4 wow fadeInUp text-white" data-wow-delay="0.2s">
                    At the heart of Pharmintech stands a leadership team driven by purpose and performance.
                    Their collective experience transforms complex cleanroom challenges into seamless turnkey solutions.
                    Through integrity, innovation, and commitment, they continue to elevate industry standards worldwide.
                  </p>

                </div>
              </div>
            </div>
      </div>

      {/* ───────────────── DIRECTOR Cards ───────────────── */}
{members.map((director, i) => {

  const isReverse = i % 2 !== 0;

  return (
    <div
      key={i}
      className={`${styles.directorBlock} ${isReverse ? styles.reverse : ""}`}
    >
      <div className="container position-relative">
        <div className="row align-items-center g-0">

          {/* CONTENT */}
          <div className={`col-md-6 ${isReverse ? "order-md-2" : ""}`}>
            <div className={styles.contentWrap}>

              <div className={`${styles.sectionLabel} wow fadeInUp`}>
                Director's Message
              </div>

              <h2
                className={`${styles.heading} wow fadeInUp`}
                data-wow-delay="0.1s"
              >
                {director.name}
                <br />
                <em>{toCapitalize(director.position)}</em>
              </h2>

              

              <p
                className={`${styles.para} wow fadeInUp`}
                data-wow-delay="0.3s"
              >
                {director.profile}
              </p>

            </div>
          </div>

          {/* IMAGE */}
          <div className={`col-md-6 ${isReverse ? "order-md-1" : ""}`}>
            <div
              className={`${styles.imageWrap} wow fadeInUp`}
              data-wow-delay="0.3s"
            >
              <div className={styles.imageDeco}></div>

              <img
                src={director.image_url}
                alt={director.name}
                width={300}
                height={440}
                className={styles.directorPhoto}
              />

              <div
                className={`${styles.statBadge} wow fadeInUp`}
                data-wow-delay="0.5s"
              >
                <div>
                  <span className={styles.statBadgeNum}>
                    {director.experience_years}+
                  </span>
                  <span className={styles.statBadgeLabel}>
                    Years Experience
                  </span>
                </div>
              </div>
              <div
                className={`${styles.quoteBlock} wow fadeInUp`}
                data-wow-delay="0.2s"
              >
                <p className={styles.quoteText}>
                  {director.quote || "Deep industry knowledge is what separates good cleanroom design from exceptional results."}
                </p>
              </div>

              <div
                className={`${styles.industryBadge} wow fadeInUp`}
                data-wow-delay="0.6s"
              >
                <span className={styles.industryBadgeText}>
                  {director.specialization || "industry experts"}
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
})}
    </section>
  );
}