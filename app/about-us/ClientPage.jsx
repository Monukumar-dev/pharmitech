"use client";

import "@/styles/industries.css";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import PageHeader from "@/components/PageHeader";
import Preloader from "@/components/Preloader";
import OurClient from "@/components/OurClient";
import OurFaqs from "@/components/OurFaqs";
import OurTestimonials from "@/components/homepage/OurTestimonials";
import PdfDownloadSection from "@/components/PdfDownloadSection"
import AboutWorkspace from "./AboutWorkspace";
import AboutApproach from "./AboutApproach";
import WhyChooseUs from "./WhyChooseUs";
import Directors from "./Directors";

import PharminDifference from "./PharminDifference";

import { fetchClients } from "@/store/slices/clientSlice";
import { fetchAboutPage } from "@/store/slices/aboutSlice";




export default function AboutUs() {

  const dispatch = useDispatch();
  const { aboutData, loading, error } = useSelector((state) => state.about);
  const clients = useSelector((state) => state.client.clients);


 // 🔥 Fetch About Data
 useEffect(() => {
  if (!aboutData.business_scope.items.length) {
    dispatch(fetchAboutPage());
  }
}, [dispatch, aboutData.business_scope.items.length]);

  // 🔥 Fetch Clients Only If Empty
  useEffect(() => {
    if (!clients?.length) {
      dispatch(fetchClients());
    }
  }, [dispatch, clients]);

  // =============================
  // Loading & Error UI (Premium)
  // =============================

 if (loading) return <Preloader opacity={0.95} />

 if (error) {
    return (
      <div className="text-center py-5 text-danger">
        {error}
      </div>
    );
  }


const renderIndustries = () => {
  const industries = [
    { num: "01", emoji: "💊", name: "Pharmaceutical", tag: "ISO 5 – 8" },
    { num: "02", emoji: "🧬", name: "Biotechnology", tag: "BSL Certified" },
    { num: "03", emoji: "🏥", name: "Medical Devices", tag: "ISO 7 – 8" },
    { num: "04", emoji: "⚡", name: "Semiconductor", tag: "ISO 3 – 5" },
    { num: "05", emoji: "✈️", name: "Aerospace", tag: "Custom" },
    { num: "06", emoji: "🔬", name: "Research Labs", tag: "Flexible" },
    { num: "07", emoji: "🍽️", name: "Food & Beverage", tag: "HACCP" },
    { num: "08", emoji: "⚙️", name: "Electronics", tag: "ESD Safe" },
    { num: "09", emoji: "🧪", name: "Chemical", tag: "Hazmat Ready" },
    { num: "10", emoji: "🛡️", name: "Defence", tag: "Secure" },
    { num: "11", emoji: "🖨️", name: "Nanotechnology", tag: "Ultra-Clean" },
    { num: "12", emoji: "🏭", name: "Manufacturing", tag: "GMP" },
  ];

  return (
    <section className="industries about-us bgPattern1" id="industries">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <p className="text-center">
              PHARMINTECH is a Cleanroom Design & Manufacturing Company, providing High Quality Cleanrooms to Small businesses and Multinational businesses from a wide range of industries like
            </p>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-12">
            <div className="industry-list">
              {industries.map((item, index) => (
                <div className="industry-card" key={index}>
                  <div className="card-num">{item.num}</div>

                  <div className="card-icon-row">
                    <div className="card-emoji">{item.emoji}</div>
                    <div className="card-name">{item.name}</div>
                  </div>

                  <span className="card-tag">{item.tag}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
    </section>
  );
};

// components/MeetTeamSection.jsx

function renderMeetTeamSection() {
  return (
    <section className="meet-section mx-4 rounded-4">
      <div className="meet-intro px-5 pb-0">
        <div className="eyebrow">People & Culture</div>
        <h2 className="meet-heading">
          Meet the <span>Team</span>
        </h2>
        <p className="meet-sub">
          The minds and hands behind every cleanroom — our engineers,
          designers, fabricators, and project specialists working as one.
        </p>
      </div>

      {/* Mosaic Grid */}
      <div className="mosaic px-5 pb-5 rounded-4 overflow-hidden">

        {/* Office Team */}
        <div className="mosaic-cell cell-1">
          <img
            src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80"
            alt="Office Team"
          />
          <span className="cell-badge">Corporate Office</span>
        </div>

        {/* Fabrication */}
        <div className="mosaic-cell cell-2">
          <img
            src="https://images.unsplash.com/photo-1565043666747-69f6646db940?w=600&q=80"
            alt="Fabrication"
          />
          <span className="cell-badge">Fabrication</span>
        </div>

        {/* Cleanroom */}
        <div className="mosaic-cell cell-3">
          <img
            src="https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=1000&q=80"
            alt="Cleanroom"
          />
          <span className="cell-badge">Cleanroom Facility</span>
        </div>

        {/* Full Team */}
        <div className="mosaic-cell cell-4">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=80"
            alt="Full Team"
          />
          <span className="cell-badge">Full Team</span>
        </div>

        {/* Engineering */}
        <div className="mosaic-cell cell-5">
          <img
            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&q=80"
            alt="Engineering"
          />
          <span className="cell-badge">Engineering</span>
        </div>

        {/* Site Team */}
        <div className="mosaic-cell cell-6">
          <img
            src="https://images.unsplash.com/photo-1513828583688-c52646db42da?w=600&q=80"
            alt="Site Team"
          />
          <span className="cell-badge">Site Team</span>
        </div>

      </div>
    </section>
  );
}


  return (
    <>
      <PageHeader
        title={aboutData?.name || "About Us"}
        backgroundImage="/images/hero-bg-image-silver111.jpg"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: aboutData?.name || "About Us" }
        ]}
      />

      {renderIndustries()}
      

      {/* <AboutWorkspace data={aboutData} /> */}
      <AboutApproach vision={aboutData?.vision} mission={aboutData?.mission} />
      <WhyChooseUs data={aboutData?.why_choose_us} />
      <Directors members={aboutData?.board_of_directors?.members} />
      <OurTestimonials />
      {renderMeetTeamSection()}
      <OurFaqs data={aboutData?.faqs}/>
      <PharminDifference />

      

      <PdfDownloadSection />

      {/* Clients */}
      <div className="container pb-5 bgPattern1">
        <OurClient />
      </div>

      

    </>
  );
}
