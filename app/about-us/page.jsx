"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import PageHeader from "@/components/PageHeader";
import Preloader from "@/components/Preloader";
import OurClient from "@/components/OurClient";
import OurTestimonials from "@/components/homepage/OurTestimonials";

import AboutWorkspace from "./AboutWorkspace";
import AboutApproach from "./AboutApproach";
import WhyChooseUs from "./WhyChooseUs";
import Directors from "./Directors";
import OurFaqs from "./OurFaqs";

import { fetchClients } from "@/store/slices/clientSlice";
import { fetchAboutPage } from "@/store/slices/aboutSlice";


export default function AboutUs() {
  const dispatch = useDispatch();

  const { aboutData, loading, error } = useSelector((state) => state.about);
  const clients = useSelector((state) => state.client.clients);

  

  // 🔥 Fetch About Data
  useEffect(() => {
    dispatch(fetchAboutPage());
  }, [dispatch]);

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

      {/* 🔥 Pass API Data Down */}
      <AboutWorkspace content={aboutData?.content} />

      <AboutApproach
        vision={aboutData?.vision}
        mission={aboutData?.mission}
      />

      <WhyChooseUs
        businessScope={aboutData?.business_scope}
      />

      {/* <IntroVideo /> */}

      <Directors members={aboutData?.board_of_directors?.members} />

      <OurTestimonials />

      <OurFaqs
        industries={aboutData?.industries_served}
      />

      {/* Clients */}
      <div className="container pb-5">
        <OurClient />
      </div>
    </>
  );
}
