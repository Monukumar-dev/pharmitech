

import TextEffect from "../../components/TextEffect";

export default function AboutWorkspace() {
  return (
      <div className="about-us">
        <div className="container">
          <div className="row">
            <div className="col-xl-3">
              <div className="about-us-info">
                <div className="section-sub-title">
                  <h3 className="wow fadeInUp">About Our Workspace</h3>
                </div>

                <div className="contact-us-circle">
                  <a href="/contact">
                    <img src="/images/contact-us-circle.svg" alt="" />
                  </a>
                </div>
              </div>
            </div>

            <div className="col-xl-9">
              <div className="about-us-content">
                <div className="section-title">
                 
                  <TextEffect text="Transforming the way people work by design collaborative
                    comfortable and modern environments that spark creativity
                    and build stronger" />

                  <p className="wow fadeInUp">
                    From flexible office solutions to dedicated member
                    services, we provide you need to thrive - fast Wi-Fi,
                    meeting rooms, modern amenities, and a vibrant community.
                  </p>
                </div>

                <div className="about-body">
                  <div
                    className="about-body-item wow fadeInUp"
                    data-wow-delay="0.2s"
                  >
                    <div className="icon-box">
                      <img src="/images/icon-about-body.svg" alt="" />
                    </div>

                    <div className="about-body-item-content">
                      <h3>Client-Focused Approach</h3>
                      <p>We prioritize your needs, tailoring every solutions.</p>
                    </div>
                  </div>

                  <div
                    className="about-event-content wow fadeInUp"
                    data-wow-delay="0.4s"
                  >
                    <div className="about-event-header">
                      <h2>
                        <span className="counter">1</span>K+
                      </h2>
                      <h3>Events Hosted Successfully</h3>
                      <p>
                        We take pride in hosting events that not only run
                        smoothly but also create memorable experiences.
                      </p>
                    </div>

                    <div className="about-event-body">
                      <div className="satisfy-client-images">
                        {[1, 2, 3, 4].map((i) => (
                          <div className="satisfy-client-image" key={i}>
                            <figure className="image-anime">
                              <img src={`/images/author-${i}.jpg`} alt="" />
                            </figure>
                          </div>
                        ))}
                      </div>

                      <p>
                        Be part of a worldwide eco-system where ideas and
                        opportunities
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
