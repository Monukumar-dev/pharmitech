"use client";

import Image from "next/image";

export default function ContactInfoList({email = "sales@pharmintech.net"}) {
  return (
    <div className="contact-info-list">

      {/* Phone */}
      <div
        className="contact-info-item"
        data-wow-delay="0.2s"
      >
        <div className="icon-box">
          <Image
            src="/images/icon-phone-primary.svg"
            alt="Phone"
            width={40}
            height={40}
          />
        </div>
        <div className="contact-item-content">
          <h3>Phone Number</h3>
          <p>
            <a href="tel:+912249719996">
              +91-22-4971-9996
            </a>
          </p>
        </div>
      </div>

      {/* Email */}
      <div
        className="contact-info-item "
        data-wow-delay="0.4s"
      >
        <div className="icon-box">
          <Image
            src="/images/icon-mail-primary.svg"
            alt="Email"
            width={40}
            height={40}
          />
        </div>
        <div className="contact-item-content">
          <h3>Email Address</h3>
          <p><a className="text-lowercase" href={`mailto:${email}`}>{email}</a></p>
        </div>
      </div>

      {/* Location */}
      <div
        className="contact-info-item"
        data-wow-delay="0.6s"
      >
        <div className="icon-box">
          <Image
            src="/images/icon-location-primary.svg"
            alt="Location"
            width={40}
            height={40}
          />
        </div>
        <div className="contact-item-content">
          <h3>Our Location</h3>
          <p>
            Pharmintech Turnkey Solutions Private Limited 
            A-417, Tower-II, Lodha Supremus, Road no. 22,
            Wagle Estate, Thane-400604, Maharashtra, India.
          </p>
        </div>
      </div>

    </div>
  );
}
