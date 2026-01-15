'use client'


import { shallowEqual, useDispatch, useSelector } from "react-redux"
import TextEffect from "@/components/TextEffect";

export default function CoreServices() {
  const homeData = useSelector((state) => state.home.homeData);
  
  if (!homeData) return null;
  
  return (
    <section className="our-services bg-section">
      <div className="container">
        <div className="row">

          {/* Section Title */}
          <div className="col-md-9 text-center mx-auto">
            <div className="section-title">
              <h3 className="wow fadeInUp">CORE SERVICES</h3>
              <TextEffect text="Commitment To Excellence" />
            </div>
          </div>

          {/* Services Cards */}
          <div className="col-md-12 mx-auto CoreSecBox mt-0">
            {homeData?.core_services.map((service,i) => (
              <div
                key={service.id}
                className={`card c${service.id} wow fadeInUp`}
                data-wow-delay={`${i * 0.2}s`}
              >
                <div className="step">{service.id}</div>
                <h3>{service.title}</h3>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
