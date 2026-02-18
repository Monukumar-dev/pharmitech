import TextEffect from "../../components/TextEffect";
import TeamCard from "../../components/TeamCard";

export default function OurTeam({directors}) {


  return (
    <div className="our-team">
      <div className="container">
        <div className="row section-row align-items-center">
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
              <p className="mt-4 text-muted wow fadeInUp" data-wow-delay="0.2s">
                At the heart of Pharmintech stands a leadership team driven by purpose and performance.  
                Their collective experience transforms complex cleanroom challenges into seamless turnkey solutions.  
                Through integrity, innovation, and commitment, they continue to elevate industry standards worldwide.
              </p>

            </div>
          </div>
        </div>

        {/* Team Grid */}
        <div className="row">
          {directors.map((member, index) => (
            <div
              key={index}
              className="col-xl-6 col-md-6"
            >
              <TeamCard {...member} />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
