
import Button from "@/components/UI/Button/Button";
import TextEffect from "../../components/TextEffect";

export default function AboutApproach(props) {
  return (
      <div className="our-approach bg-section">
        <div className="container">
          <div className="row section-row align-items-center">
            <div className="col-xl-6">
              <div className="section-title">
                <h3 className="wow fadeInUp">Our Approach</h3>
                <TextEffect text="Building workspaces designed for growth and innovation" />
              </div>
            </div>

            <div className="col-xl-6">
              <div className="section-content-btn">
                <div className="section-title-content">
                  <p className="wow fadeInUp" data-wow-delay="0.2s">
                    At our co-working spaces, we believe work should be
                    inspiring, flexible, and community-driven.
                  </p>
                </div>

                <div className="section-btn wow fadeInUp" data-wow-delay="0.4s">
                  <Button variant="primary" href="/contact" >Learn More</Button>
                </div>
              </div>
            </div>
          </div>

          <div className="row align-items-center">
            <div className="col-xl-4">
              <div className="approach-item-list">
                <div
                    className="approach-item wow fadeInUp"
                    data-wow-delay="0.2s"
                  >
                    <div className="icon-box">
                      <img src={`/images/icon-approach-1.svg`} alt="" />
                    </div>
                    <div className="approach-item-content">
                      <h3>{props?.mission?.name}</h3>
                      <p>{props?.mission?.data}</p>
                    </div>
                </div>

                <div
                    className="approach-item wow fadeInUp"
                    data-wow-delay="0.4s"
                  >
                    <div className="icon-box">
                      <img src={`/images/icon-approach-2.svg`} alt="" />
                    </div>
                    <div className="approach-item-content">
                      <h3>{props?.vision?.name}</h3>
                      <p>{props?.vision?.data}</p>
                    </div>
                  </div>
              </div>
            </div>

            <div className="col-xl-8">
              <div
                className="approach-image-box wow fadeInUp"
                data-wow-delay="0.2s"
              >
                <div className="approach-image">
                  <figure className="image-anime">
                    <img src="/images/hero-bg-image-silver11.jpg" alt="" />
                  </figure>
                </div>

                <div className="approach-counter-box">
                  <div className="approach-counter-item">
                    <h2>
                      <span className="counter">1.2</span>k+
                    </h2>
                    <p>Happy Working Members</p>
                  </div>

                  <div className="approach-counter-item">
                    <h2>
                      <span className="counter">150</span>+
                    </h2>
                    <p>Networking Events</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
