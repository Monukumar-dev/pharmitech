'use client'

import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  return (
    <>
      {/* Main Footer */}
      <footer className="main-footer-silver bg-section dark-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="main-footer-box-silver">

                {/* Logo */}
                <div className="footer-logo-silver">
                  <Image
                    src="/images/logo.png"
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
                        <a href="tel:+912249719996">+91-22-4971-9996</a>
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
                        <a href="mailto:sales@pharmintech.net">sales@pharmintech.net</a>
                      </p>
                    </div>
                  </div>

                  <div className="footer-contact-item-silver">
                    <div className="icon-box">
                      <Image src="/images/icon-location-accent.svg" alt="" width={24} height={24} />
                    </div>
                    <div className="footer-contact-item-content-silver">
                      <h3>Address</h3>
                      <p>Thane-400604, Maharashtra, India.</p>
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
                  We are more than just a cleanroom solutions provider – we are a
                  trusted technology partner delivering precision-engineered
                  environments where quality, compliance, and innovation come together.
                </p>

                <div className="footer-social-links-silver">
                  <ul>
                    <li><a href="#"><i className="fa-brands fa-pinterest-p"></i></a></li>
                    <li><a href="#"><i className="fa-brands fa-x-twitter"></i></a></li>
                    <li><a href="#"><i className="fa-brands fa-facebook-f"></i></a></li>
                    <li><a href="#"><i className="fa-brands fa-instagram"></i></a></li>
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
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3767.9315792570687!2d72.94512997381999!3d19.198190548127894!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7bb9141de06bb%3A0xd14cb2e05b0a20e3!2sPharmintech%20Turnkey%20Solutions%20Private%20Limited!5e0!3m2!1sen!2sin!4v1767168215499!5m2!1sen!2sin"
                      width="100%"
                      style={{ height: "250px", border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />

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
                  <li><Link href="#">Terms & Conditions</Link></li>
                  <li><Link href="#">Privacy Policy</Link></li>
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
