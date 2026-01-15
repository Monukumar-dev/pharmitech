"use client";

import Link from "next/link";

export default function PdfDownloadSection() {
  return (
    <div className="how-it-works">
      <div className="container-fluid position-relative z-3">
        <div className="callToAction">
          {/* overlay */}
          <div className="cta-overlay"></div>

          {/* content */}
          <div className="cta-content">
            <h1
              className="cta-title text-effect wow fadeInUp"
              data-cursor="-opaque"
            >
              The new <span>chapter</span> starts with cleanrooms.
            </h1>

            <p className="cta-text wow fadeInUp" data-wow-delay="0.2s">
              Pharmintech delivers turnkey cleanroom solutions with engineering
              precision and regulatory confidence.
            </p>

            <div className="d-flex flex-wrap gap-3">
              <Link
                href="#"
                className="cta-btn cta-btn-primary wow fadeInUp"
                data-wow-delay="0.4s"
              >
                Request a Quote →
              </Link>

              <Link
                href="#"
                className="cta-btn cta-btn-outline wow fadeInUp"
                data-wow-delay="0.6s"
              >
                Download Brochure
              </Link>

              <a
                href="https://wa.me/919999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-btn cta-btn-whatsapp wow fadeInUp"
                data-wow-delay="0.8s"
              >
                Connect on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
