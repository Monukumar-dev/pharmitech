'use client'
import TextEffect from "@/components/TextEffect";
import Button from "../UI/Button/Button";

export default function OurServices() {
  return (
    <section className="our-services bg-section">
      <div className="container">

        {/* SECTION TITLE */}
        <div className="row section-row">
          <div className="col-lg-12">
            <div className="section-title section-title-center">
              <h3 className="wow fadeInUp">Our services</h3>
              <TextEffect text="From Inspiring Workspaces to Essential Amenities – We Deliver Every Detail" />
            </div>
          </div>
        </div>

        {/* SERVICES LIST */}
        <div className="row">
          <div className="col-lg-12">
            <div className="services-list">
              <div className="service-item wow fadeInUp">
                <div className="service-image">
                  <a href="#" data-cursor-text="View">
                    <figure className="image-anime">
                      <img
                        src="/images/services/CleanroomConceptDetailedDesign.jpg"
                        alt="Cleanroom Concept & Detailed Design"
                      />
                    </figure>
                  </a>
                </div>
                <div className="service-item-content">
                  <div className="service-item-body">
                    <h3>
                      <a href="#">Cleanroom Concept &amp; Detailed Design</a>
                    </h3>
                    <p>End-to-end cleanroom planning with precise, compliant design.</p>
                  </div>
                  <div className="service-btn">
                    <a href="#" className="readmore-btn">learn more</a>
                  </div>
                </div>
              </div>

              {/* SERVICE ITEM 2 */}
              <div className="service-item active wow fadeInUp" data-wow-delay="0.2s">
                <div className="service-image">
                  <a href="#" data-cursor-text="View">
                    <figure className="image-anime">
                      <img
                        src="/images/services/HVAC-Design2.jpg"
                        alt="HVAC Design & Engineering"
                      />
                    </figure>
                  </a>
                </div>
                <div className="service-item-content">
                  <div className="service-item-body" data-cursor-text="View">
                    <h3><a href="#">HVAC Design &amp; Engineering</a></h3>
                    <p>Expert HVAC engineering for optimized airflow and contamination control.</p>
                  </div>
                  <div className="service-btn">
                    <a href="#" className="readmore-btn">learn more</a>
                  </div>
                </div>
              </div>

              {/* SERVICE ITEM 3 */}
              <div className="service-item wow fadeInUp" data-wow-delay="0.4s">
                <div className="service-image">
                  <a href="#" data-cursor-text="View">
                    <figure className="image-anime">
                      <img
                        src="/images/services/electrical-engineer.jpg"
                        alt="Electrical"
                      />
                    </figure>
                  </a>
                </div>
                <div className="service-item-content">
                  <div className="service-item-body">
                    <h3><a href="#">Electrical</a></h3>
                    <p>Reliable electrical systems engineered for safety and compliance.</p>
                  </div>
                  <div className="service-btn">
                    <a href="#" className="readmore-btn">learn more</a>
                  </div>
                </div>
              </div>

              {/* SERVICE ITEM 4 */}
              <div className="service-item wow fadeInUp" data-wow-delay="0.6s">
                <div className="service-image">
                  <a href="#" data-cursor-text="View">
                    <figure className="image-anime">
                      <img
                        src="/images/services/waterclean.jpg"
                        alt="Water System"
                      />
                    </figure>
                  </a>
                </div>
                <div className="service-item-content">
                  <div className="service-item-body">
                    <h3><a href="#">Water System</a></h3>
                    <p>Reliable purified water solutions engineered for critical applications.</p>
                  </div>
                  <div className="service-btn">
                    <a href="#" className="readmore-btn">learn more</a>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* FOOTER BUTTON */}
          <div className="col-lg-12">
            <div className="section-footer-text wow fadeInUp" data-wow-delay="0.8s">
              <Button variant="primary" href="/services" >View All Services</Button>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
