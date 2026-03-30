import TextEffect from "../../components/TextEffect";
import Button from "@/components/UI/Button/Button";

export default function WhyChooseUs({data}) {
  return (
    <div className="why-choose-us-elite bgPattern1">
      <div className="container">
        <div className="row align-items-center">
          
          {/* LEFT CONTENT */}
          <div className="col-xl-6">
            <div className="why-choose-content-elite">
              
              <div className="section-title">
                <h3 className="wow fadeInUp">{data?.name}</h3>

                <div className="text-effect" data-cursor="-opaque">
                  <TextEffect text={data?.headline} />
                </div>

                <p className="wow fadeInUp" data-wow-delay="0.2s">
                  {data?.description}
                </p>
              </div>

              <div className="why-choose-body-elite">
                <div className="why-choose-item-list-elite">

                {data?.items?.map((item, i) =>(
                  <div
                   key={i}
                    className="why-choose-item-elite wow fadeInUp"
                    data-wow-delay="0.4s"
                  >
                    <div className="icon-box">
                      <img src={item.icon} alt={item.title} />
                    </div>

                    <div className="why-choose-item-content-elite">
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                  </div>
                ))}
                  </div>
                
                <div
                  className="why-choose-list-elite wow fadeInUp"
                  data-wow-delay="0.8s"
                >
                  <ul>
                    {data?.highlights?.map((item,i) => (
                        <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>

                {data?.button?.url && (
                  <div
                    className="why-choose-btn-elite wow fadeInUp"
                    data-wow-delay="1s"
                  >
                    <Button variant="primary" href={data?.button?.url}>
                      {data?.button?.text}
                    </Button>
                  </div>
                )}
              
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
                      src={data?.images?.box_1[0].image}
                      alt=""
                    />
                  </figure>
                </div>

                <div className="why-choose-img-2-elite">
                  <figure className="image-anime">
                    <img
                      src={data?.images?.box_1[1].image}
                      alt=""
                    />
                  </figure>

                  <div className="contact-us-circle-elite">
                    <a href={data?.images?.box_1[1].link_url}>
                      <img
                        src='/images/contact-us-circle.svg'
                        alt="monu"
                      />
                    </a>
                  </div>
                </div>

              </div>

              <div className="why-choose-image-box-2-elite">
                <div className="why-choose-img-3-elite">
                  <figure>
                    <img
                      src={data?.images?.box_2[0].image}
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
