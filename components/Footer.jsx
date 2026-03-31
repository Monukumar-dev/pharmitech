'use client'

import Link from "next/link"
import Image from "next/image"
import Preloader from "./Preloader";

import { useDispatch, useSelector } from "react-redux";

export default function Footer() {

  const { companyDetails, status } = useSelector((state) => state.company);
  
  if (status === "loading") return <Preloader opacity={0.95} />;

  const getSocialIcon = (platform) => {
    switch (platform?.toLowerCase()) {
      case "facebook":
        return "fa-brands fa-facebook-f";

      case "instagram":
        return "fa-brands fa-instagram";

      case "linkedin":
        return "fa-brands fa-linkedin-in";

      case "twitter":
      case "tweeter": // your API typo 😄
        return "fa-brands fa-x-twitter";

      case "pinterest":
        return "fa-brands fa-pinterest-p";

      default:
        return "fa-solid fa-globe";
    }
  };

  return (
    <>
      <footer className="main-footer-silver bg-section dark-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="main-footer-box-silver">
                <div className="footer-logo-silver">
                  <img
                    src={companyDetails?.logo || '/images/logo.png'}
                    alt="Pharmintech Logo"
                    width={180}
                    height={60}
                  />
                </div>

                {/* Contact Details */}
                <div className="footer-contact-details-silver">
                  <div className="footer-contact-item-silver">
                    <div className="icon-box">
                      <Image src="/images/icon-phone-accent.svg" alt="" width={24} height={24} />
                    </div>
                    <div className="footer-contact-item-content-silver">
                      <h3>Contact</h3>
                      <p>
                        <a href={`tel:${companyDetails?.contact_info?.landline_no}`}>
                          {companyDetails?.contact_info?.landline_no}
                          </a>
                      </p>
                    </div>
                  </div>

                  <div className="footer-contact-item-silver">
                    <div className="icon-box">
                      <Image src="/images/icon-mail-accent.svg" alt="" width={24} height={24} />
                    </div>
                    <div className="footer-contact-item-content-silver">
                      <h3>E-mail</h3>
                      <p>
                        <a href={`mailto:${companyDetails?.contact_info?.email_id}`}>
                          {companyDetails?.contact_info?.email_id || 'sales@pharmintech.net'}
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="footer-contact-item-silver">
                    <div className="icon-box">
                      <Image src="/images/icon-location-accent.svg" alt="" width={24} height={24} />
                    </div>
                    <div className="footer-contact-item-content-silver">
                      <h3>Address</h3>
                      <p>{companyDetails?.contact_info?.address || 'Thane, Maharashtra, India. '}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          <div className="row">
            <div className="col-xl-4">
              <div className="about-footer-silver">
                <p>
                  {companyDetails?.footer_paragraph || 'We are more than just a cleanroom solutions provider – we are a trusted technology partner delivering precision-engineered environments where quality, compliance, and innovation come together.'}
                </p>

                <div className="footer-social-links-silver">
                  <ul>
                    {companyDetails?.social_media_links
                      ?.filter((item) => item.url)
                      .map((item, i) => (
                        <li key={item.platform || i}>
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <i className={getSocialIcon(item.platform)}></i>
                          </a>
                        </li>
                      ))}

                    {/* <li><a href="#"><i className="fa-brands fa-pinterest-p"></i></a></li>
                    <li><a href="#"><i className="fa-brands fa-x-twitter"></i></a></li>
                    <li><a href="#"><i className="fa-brands fa-facebook-f"></i></a></li>
                    <li><a href="#"><i className="fa-brands fa-instagram"></i></a></li> */}
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-xl-8">
              <div className="row footer-links-box-silver gap-0 flex-nowrap">

                <div className="col-md-5 footer-links-silver ps-md-5">
                  <h3>Quick Links</h3>
                  <ul>
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/about-us">About Us</Link></li>
                    <li><Link href="/blogs">Blogs</Link></li>
                    <li><Link href="/events">Events</Link></li>
                    <li><Link href="/customers">Contact</Link></li>
                  </ul>
                </div>

                {/* <div className="col-md-4 footer-links-silver">
                  <h3>Industries We Serve</h3>
                  <ul>
                    <li><Link href="#">Pharmaceutical Facilities</Link></li>
                    <li><Link href="#">R&amp;D Facilities</Link></li>
                    <li><Link href="#">Biotechnology Facilities</Link></li>
                    <li><Link href="#">Healthcare & Hospitals</Link></li>
                    <li><Link href="#">Food Processing Facilities</Link></li>
                    <li><Link href="#">Cosmetics Facilities</Link></li>
                    <li><Link href="#">Automobile Facilities</Link></li>
                    <li><Link href="#">Space Research Facilities</Link></li>
                    <li><Link href="#">Semiconductors & Electronics</Link></li>
                  </ul>
                </div> */}

                <div className="col-md-7 footer-links-silver footer-newsletter-form-silver">
                  <h3>Locations</h3>
                  <div className="google-map-iframe mt-0">
                    <div dangerouslySetInnerHTML={{ __html: companyDetails?.contact_info?.map_embed_text }} />
                  </div>

                  {/* <form onSubmit={(e) => e.preventDefault()}>
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email Address*"
                        required
                      />
                      <button type="submit" className="newsletter-btn">
                        <i className="fa-regular fa-paper-plane"></i>
                      </button>
                    </div>
                  </form> 
                  <p>* Subscribe now for workspace tips and community updates.</p>
                  */}
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="footer-copyright-silver">
          <div className="container">
            <div className="row">
              <div className="col-md-7">
                <p>
                  © {new Date().getFullYear()} Pharmintech Turnkey Solutions Pvt. Ltd.
                  All Rights Reserved
                </p>
              </div>
              <div className="col-md-5">
                <div className="footer-privacy-policy-silver">
                  <ul className="">
                  <li><Link href="/terms-and-conditions">Terms & Conditions</Link></li>
                  <li><Link href="/privacy-policy">Privacy Policy</Link></li>
                </ul>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
