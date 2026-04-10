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
import Journey from "./Journey";




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

function renderMeetTeamSection(data) {

  const office = data?.office || [];
  const factory = data?.factory || [];


  console.log("office",data);
  console.log("office",data?.office[0]?.url);
  

  return (
    <section className="meet-section mx-4 rounded-4">
      <div className="meet-intro px-5 pb-0">
        <div className="section-title text-center">
          <h3 className="wow fadeInUp">Meet the Team</h3>
          <TextEffect className="text-center" text="People & Culture" />
        </div>
      </div>
    
      {/* Mosaic Grid */}
      <div className="mosaic px-3 px-md-5 pb-5 rounded-4 overflow-hidden">
        <div className="mosaic-cell cell-1">
          <img
            src={data?.office[0]?.url}
            alt="Office Team"
          />
          <span className="cell-badge">Office</span>
        </div>

        {/* Fabrication */}
        <div className="mosaic-cell cell-2">
          <img
            src={office[1]?.url}
            alt="Fabrication"
          />
          <span className="cell-badge">Office</span>
        </div>

        {/* Cleanroom */}
        <div className="mosaic-cell cell-3">
          <img
            src={factory[0]?.url}
            alt="Factory"
          />
          <span className="cell-badge">Factory</span>
        </div>

        {/* Full Team */}
        <div className="mosaic-cell cell-4">
          <img
            src={office[2]?.url}
            alt="Full Team"
          />
          <span className="cell-badge">Office</span>
        </div>

        {/* Engineering */}
        <div className="mosaic-cell cell-5">
          <img
            src={factory[1]?.url}
            alt="Factory"
          />
          <span className="cell-badge">Factory</span>
        </div>

        {/* Site Team */}
        <div className="mosaic-cell cell-6">
          <img
            src={factory[2]?.url}
            alt="Factory"
          />
          <span className="cell-badge">Factory</span>
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
      

      { aboutData?.meet_our_team?.active && (
          renderMeetTeamSection(aboutData?.meet_our_team)
      )}
      
      {/* <OurFaqs data={aboutData?.faqs}/> */}
      {/* Clients */}

      { aboutData?.pharmintech_difference?.active && (
          <PharminDifference data={aboutData?.pharmintech_difference} />
      )}
   
      {aboutData?.journey?.active && (
        <Journey data={aboutData?.journey} />
      )}
       

      
      <section className="mt-5">
        <div className="position-relative text-center px-0 z-3 border rounded-3 wow rounded-4 mx-md-4" style={{background:"rgb(1 25 97)"}}>
          <img className="w-75 h-auto" src="images/AboutMap.jpg" alt="" />
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
