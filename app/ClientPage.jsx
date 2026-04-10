"use client";
import Link from "next/link"

import { 
  Compass, 
  Layout, 
  Settings, 
  Factory, 
  Briefcase, 
  Wrench, 
  Beaker, 
  ClipboardCheck, 
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { fetchBanners, fetchHomePageData } from "@/store/action/homeActions";
import { fetchHomepageBlogs } from "@/store/action/blogActions";
import { fetchTestimonials } from "@/store/slices/testimonialSlice";

import { fetchClients } from "@/store/slices/clientSlice";
import { fetchAboutPage } from "@/store/slices/aboutSlice";

import CoreServices from "@/components/homepage/CoreServices"
import HomepageBanner from "@/components/homepage/HomepageBanner"
import TechSection from "@/components/homepage/TechSection"
import PharmintechAdvantage from "@/components/homepage/PharmintechAdvantage"
import OurServices from "@/components/homepage/OurServices"
import WhatWeDoSilver from "@/components/homepage/WhatWeDoSilver"
import IntroVideoBoxSilver from "@/components/homepage/IntroVideoBoxSilver"
import OurBlog from "@/components/homepage/OurBlog"
import OurTestimonials from "@/components/homepage/OurTestimonials";
import OurClient from "@/components/OurClient";
import HomeConsultationPlanner from "@/components/homepage/HomeConsultationPlanner";
import PdfDownloadSection from "@/components/PdfDownloadSection"
import OurFaqs from "@/components/OurFaqs";
import Preloader  from "@/components/Preloader";
import TextEffect from "@/components/TextEffect";

// const services = [
//   { id: 1, title: "Project Guidance & Feasibility", icon: Compass },
//   { id: 2, title: "Conceptual Design, Layout Planning & Proposal", icon: Layout },
//   { id: 3, title: "Detailed Design & Infrastructure Engineering", icon: Settings },
//   { id: 4, title: "In-House Manufacturing & Quality Control", icon: Factory },
//   { id: 5, title: "Project Planning & Management", icon: Briefcase },
//   { id: 6, title: "Installation & Commissioning", icon: Wrench },
//   { id: 7, title: "Testing & Validation", icon: Beaker },
//   { id: 8, title: "Qualification (IQ/OQ/PQ) & Handover", icon: ClipboardCheck },
//   { id: 9, title: "Service, Maintenance & Lifetime Support", icon: ShieldCheck }
// ];


export default function Home() {

  const dispatch = useDispatch();
  const { loading, error, homeData } = useSelector((state) => state.home);
  const { aboutData } = useSelector((state) => state.about);
 // const { list:testimonialsList } = useSelector((state) => state.testimonials);
  const clients = useSelector((state) => state.client.clients);

  console.log("homeData", homeData);

  const iconMap = {
  1: Compass,
  2: Layout,
  3: Settings,
  4: Factory,
  5: Briefcase,
  6: Wrench,
  7: Beaker,
  8: ClipboardCheck,
  9: ShieldCheck
};

const mappedServices = homeData?.core_services.map((service) => ({
  ...service,
  icon: iconMap[service.id] || Compass 
}));
  

  useEffect(() => {
    dispatch(fetchHomePageData());
    dispatch(fetchBanners());
  }, [dispatch]);

  useEffect(() => {
    if (!clients.length) {
      dispatch(fetchClients());
    }
  }, [dispatch, clients]);

  useEffect(() => {
  if (!aboutData.business_scope.items.length) {
    dispatch(fetchAboutPage());
  }
}, [dispatch, aboutData.business_scope.items.length]);


//   useEffect(() => {
//     if (!testimonialsList.length) {
//        dispatch(fetchTestimonials());
//     }
// }, [dispatch, testimonialsList]);

  if (loading) return <Preloader />;
  if (error) return <div className="text-danger">{error}</div>;

const CoreServices = () => (
  <div className="bgGradiantsection dark-section px-4 px-md-4 mx-3 rounded-4">
    <div className="orb orb1"></div>
    <div className="orb orb2"></div>
      <main className="w-100 overflow-hidden">
        <div className="container py-5">
          <div className="row g-4">
            <div className="col-12 col-md-12 col-lg-12">
              <div className="section-title">
                  <h3 className="wow fadeInUp">Core Services</h3>
                  <TextEffect text="Commitment To Excellence" />
                  <p className="mb-4" style={{ lineHeight: '1.8' }}>
                  Delivering comprehensive, end-to-end solutions for the pharmaceutical and biotechnology sectors. From initial feasibility to lifetime support, we engineer excellence at every stage.
                </p>
                </div>
            </div>

            {/* Right Column: Services Grid */}
            <div className="col-lg-12">
              <div className="row g-4 wow">
                {mappedServices?.map((service) => (
                  <div key={service.id} className="col-md-4" >
                    <div data-cursor="-opaque" className="design-3-card position-relative p-4 h-100 cursor-pointer rounded-4">
                      <div className="large-bg-number">
                        {service.id.toString().padStart(2, '0')}
                      </div>
                      {/* Card Content Overlay */}
                      <div className="position-relative z-1">
                        <div className="mb-3 cardIcon d-flex align-items-center justify-content-center">
                          <service.icon size={24} strokeWidth={1.8} color="#6fb0f5" />
                        </div>
                        <h4 className="h5 text-light mb-3 pe-4">{service.title}</h4>
                        <div className="animated-border-bottom mb-3"></div>
                        {/* <p className="text-secondary mb-0 small" style={{ lineHeight: '1.6' }}>
                          {service.desc}
                        </p> */}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </main>
  </div>
);


  return (
    <>
      <HomepageBanner />
      <section className="our-approach">
      <div className="container">
        <div className="row section-row mb-0 align-items-center">

          {/* Content */}
          <div className="col-xl-12">
            <div className="section-content-btn wow fadeInUp">
              <div className="section-title-content">
                  {homeData?.aboutus?.paragraphs.map((item, i) => (
                    <p key={i} >
                      {item}
                    </p>
                  ))
                  }
              </div>

              {/*
              <div className="section-btn wow fadeInUp" data-wow-delay="0.8s">
                <Link href="/about" className="btn-default">
                  Know More
                </Link>
              </div>
              */}
            </div>
          </div>

        </div>
      </div>
      </section>

      {CoreServices()}
      {/* <CoreServices /> */}
      <TechSection /> 
      <PharmintechAdvantage />
      
      {/*  */}
      {/* <OurServices /> */}
      {/* <WhatWeDoSilver /> */}
      {/* <IntroVideoBoxSilver /> */}
  
      <OurBlog />

      <OurTestimonials />

      
      <div className="our-faqs py-0">
        <div className="container">
          <div className="col-lg-12">
            <div className="company-supports-slider-box">
              <OurClient />
            </div>
          </div>
        </div>
      </div>
      <HomeConsultationPlanner data={homeData?.new_chapter} />

      {homeData?.new_chapter?.active && (
        <div className="homepagePdfDownload">
          <PdfDownloadSection />
        </div>
        
      )}
      
      <div className="pb-5 bgPattern1">
        <OurFaqs data={aboutData?.faqs}/>
      </div>

    </>
  )
}
