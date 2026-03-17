"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import TextEffect from "./TextEffect";

export default function PdfDownloadSection() {

  const homeData = useSelector((state) => state.home.homeData);
  //console.log(homeData?.new_chapter);
  
  if (!homeData) return null;

  return (
    <div className="how-it-works pb-0">
      <div className="container-fluid position-relative z-3">
        <div className="callToAction">
          <div className="cta-overlay"></div>
          <div className="cta-content">

            <TextEffect data-cursor="-opaque" className="cta-title text-effect wow fadeInUp" as="h1" text={homeData?.new_chapter?.chapter_info?.title} />

            <p className="cta-text wow fadeInUp" data-wow-delay="0.2s">
              {homeData?.new_chapter?.chapter_info?.description}
            </p>

            <div className="d-flex flex-wrap gap-3">
              <Link
                href="#"
                className="cta-btn cta-btn-primary wow fadeInUp"
                data-wow-delay="0.4s"
              >
                List of Clients
              </Link>
          
              {homeData?.new_chapter?.chapter_info?.document_pdf_url && (
                <Link
                  href={homeData.new_chapter.chapter_info.document_pdf_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="cta-btn cta-btn-outline wow fadeInUp"
                  data-wow-delay="0.4s"
                  aria-label="Download company brochure PDF"
                >
                  {homeData?.new_chapter?.chapter_info?.document_download_button_name || "Download Brochure"}
                </Link>
              )}



              {homeData?.new_chapter?.contact_info?.whatsapp_number && 
                <Link 
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://wa.me/${homeData?.new_chapter?.contact_info?.whatsapp_number}?text=${encodeURIComponent("Hello, I need a quote for a cleanroom project")}`}
                  className="cta-btn cta-btn-whatsapp wow fadeInUp"
                  data-wow-delay="0.4s"
                >
                  {homeData?.new_chapter?.chapter_info?.whatsapp_button_name}
                </Link>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
