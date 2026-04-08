"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import PageHeader from "@/components/PageHeader";
import Preloader from "@/components/Preloader";
import OurClient from "@/components/OurClient";
import OurFaqs from "@/components/OurFaqs";
import OurTestimonials from "@/components/homepage/OurTestimonials";
import PdfDownloadSection, {
  ctaFromNewChapter,
} from "@/components/PdfDownloadSection";
import AboutWorkspace from "./AboutWorkspace";
import AboutApproach from "./AboutApproach";
import WhyChooseUs from "./WhyChooseUs";
import Directors from "./Directors";

import PharminDifference from "./PharminDifference";
import IndustriesSection from "./IndustriesSection";

import { fetchClients } from "@/store/slices/clientSlice";
import { fetchAboutPage } from "@/store/slices/aboutSlice";
import { fetchHomePageData } from "@/store/action/homeActions";
import TextEffect from "@/components/TextEffect";
//import Journey from "./Journey";




export default function AboutUs() {

  const dispatch = useDispatch();
  const { aboutData, loading, error } = useSelector((state) => state.about);
  const homeData = useSelector((state) => state.home.homeData);
  const clients = useSelector((state) => state.client.clients);


 // 🔥 Fetch About Data
 useEffect(() => {
  if (!aboutData.business_scope.items.length) {
    dispatch(fetchAboutPage());
  }
}, [dispatch, aboutData.business_scope.items.length]);

  // Home CTA (brochure / WhatsApp) uses the same `new_chapter` payload — load if missing (e.g. direct visit to About).
  useEffect(() => {
    if (!homeData) {
      dispatch(fetchHomePageData());
    }
  }, [dispatch, homeData]);

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


// components/MeetTeamSection.jsx

function renderMeetTeamSection() {
  return (
    <section className="meet-section mx-4 rounded-4">
      {/* <div className="meet-intro px-5 pb-0">
        <div className="eyebrow">People & Culture</div>
        <h2 className="meet-heading">Meet the <span>Team</span></h2>
        <p className="meet-sub">
          The minds and hands behind every cleanroom — our engineers,
          designers, fabricators, and project specialists working as one.
        </p>
      </div> */}
      <div className="meet-intro px-5 pb-0">
        <div className="section-title text-center">
          <h3 className="wow fadeInUp">People & Culture</h3>
          <TextEffect className="text-center" text="Meet the Team" />
        </div>
      </div>
      

      {/* Mosaic Grid */}
      <div className="mosaic px-5 pb-5 rounded-4 overflow-hidden">
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

      <IndustriesSection
        content={aboutData?.content}
        items={aboutData?.industries_served?.items}
      />
      

      {/* <AboutWorkspace data={aboutData} /> */}
      <Directors members={aboutData?.board_of_directors?.members} />
      {/* <AboutApproach vision={aboutData?.vision} mission={aboutData?.mission} /> */}
      {/* <WhyChooseUs data={aboutData?.why_choose_us} /> */}
      {/* <OurTestimonials /> */}
      {renderMeetTeamSection()}
      {/* <OurFaqs data={aboutData?.faqs}/> */}
      {/* Clients */}
   
      <PharminDifference /> 
      {/* <Journey /> */}
      <section className="mt-5">
        <div className="position-relative text-center px-0 z-3 border rounded-3 wow rounded-4 mx-md-4" style={{background:"#0d1b2a"}}>
          <img className="w-75 h-auto" src="images/AboutMap.png" alt="" />
        </div>
      </section>
      <div className="container pb-5 bgPattern1">
        <OurClient />
      </div>
      <div className="pb-5 ">
      <PdfDownloadSection
        cta={(() => {
          const fromAbout = ctaFromNewChapter(
            aboutData?.cta_bottom ?? aboutData?.new_chapter
          );
          if (fromAbout) return fromAbout;

          const fromHome = ctaFromNewChapter(homeData?.new_chapter);
          return {
            title: "Connect with our Experts to get your quot.",
            description:
              "Pharmintech helps you build cleanrooms that feel strong, look exceptional, and perform with absolute reliability.",
            buttons:
              fromHome?.buttons ?? [
                { variant: "primary", label: "List of Clients", href: "#" },
              ],
          };
        })()}
      />
      </div>
      
      

    </>
  );
}
