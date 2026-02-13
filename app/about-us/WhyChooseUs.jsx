import TextEffect from "../../components/TextEffect";
import Button from "@/components/UI/Button/Button";

export default function WhyChooseUs() {
  return (
    <div className="why-choose-us-elite">
      <div className="container">
        <div className="row align-items-center">
          
          {/* LEFT CONTENT */}
          <div className="col-xl-6">
            <div className="why-choose-content-elite">
              
              <div className="section-title">
                <h3 className="wow fadeInUp">Why Choose Us</h3>

                <div className="text-effect" data-cursor="-opaque">
                  <TextEffect text="Designed for productivity, built for community" />
                </div>

                <p className="wow fadeInUp" data-wow-delay="0.2s">
                  Every detail of our coworking spaces is crafted to balance
                  focus and collaboration, giving you the tools and
                  environment you need to thrive.
                </p>
              </div>

              <div className="why-choose-body-elite">
                
                {/* Items */}
                <div className="why-choose-item-list-elite">
                  
                  <div
                    className="why-choose-item-elite wow fadeInUp"
                    data-wow-delay="0.4s"
                  >
                    <div className="icon-box">
                      <img
                        src="/images/icon-why-choose-us-1-elite.svg"
                        alt=""
                      />
                    </div>

                    <div className="why-choose-item-content-elite">
                      <h3>Flexible Plans That Fits</h3>
                      <p>
                        Choose from day passes, hot desk pay only what you
                        need.
                      </p>
                    </div>
                  </div>

                  <div
                    className="why-choose-item-elite wow fadeInUp"
                    data-wow-delay="0.6s"
                  >
                    <div className="icon-box">
                      <img
                        src="/images/icon-why-choose-us-2-elite.svg"
                        alt=""
                      />
                    </div>

                    <div className="why-choose-item-content-elite">
                      <h3>Community That Inspires</h3>
                      <p>Work alongside startups and growing teams.</p>
                    </div>
                  </div>

                </div>

                {/* List */}
                <div
                  className="why-choose-list-elite wow fadeInUp"
                  data-wow-delay="0.8s"
                >
                  <ul>
                    <li>A Thriving Community of Professional.</li>
                    <li>Tailored Plans That Balance Flexibility.</li>
                  </ul>
                </div>

                {/* Button */}
                <div
                  className="why-choose-btn-elite wow fadeInUp"
                  data-wow-delay="1s"
                >
                  <Button variant="primary" href="/contact" >Get Started Now</Button>
                </div>

              </div>
            </div>
          </div>

          {/* RIGHT IMAGES */}
          <div className="col-xl-6">
            <div className="why-choose-images-elite">
              
              <div className="why-choose-image-box-1-elite">
                
                <div className="why-choose-img-1-elite">
                  <figure className="image-anime">
                    <img
                      src="/images/services/CleanroomConceptDetailedDesign.jpg"
                      alt=""
                    />
                  </figure>
                </div>

                <div className="why-choose-img-2-elite">
                  <figure className="image-anime">
                    <img
                      src="/images/cleanroom-wall-ceiling-door.jpg"
                      alt=""
                    />
                  </figure>

                  <div className="contact-us-circle-elite">
                    <a href="/contact">
                      <img
                        src="/images/contact-us-circle-elite.svg"
                        alt=""
                      />
                    </a>
                  </div>
                </div>

              </div>

              <div className="why-choose-image-box-2-elite">
                <div className="why-choose-img-3-elite">
                  <figure>
                    <img
                      src="/images/why-choose-us-image-3-elite.png"
                      alt=""
                    />
                  </figure>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
