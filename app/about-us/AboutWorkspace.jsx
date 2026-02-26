

import TextEffect from "../../components/TextEffect";

export default function AboutWorkspace({data}) {
  return (
      <div className="about-us">
        <div className="container">
          <div className="row">
            <div className="col-xl-4">
              <div className="about-us-info">
                <div className="section-sub-title">
                  <h3 className="wow fadeInUp mb-4">{data.name}</h3>
                  <TextEffect text="Precision, Quality & Innovation in Pharmaceutical Cleanrooms" />
                </div>


                <div className="contact-us-circle">
                  <a href="/customers">
                    <img src="/images/contact-us-circle.svg" alt="" />
                  </a>
                </div>
              </div>
            </div>

            <div className="col-xl-8">
              <div className="about-us-content">
                <div className="section-title">
                  
                  <p className="wow fadeInUp">
                    {data.content}
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
