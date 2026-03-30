"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import PageHeader from "@/components/PageHeader";
import Preloader from "@/components/Preloader";
import OurClient from "@/components/OurClient";
import OurFaqs from "@/components/OurFaqs";
import OurTestimonials from "@/components/homepage/OurTestimonials";

import AboutWorkspace from "./AboutWorkspace";
import AboutApproach from "./AboutApproach";
import WhyChooseUs from "./WhyChooseUs";

import { fetchClients } from "@/store/slices/clientSlice";
import { fetchAboutPage } from "@/store/slices/aboutSlice";
import Directors from "./Directors";


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

      <AboutWorkspace data={aboutData} />
      <AboutApproach vision={aboutData?.vision} mission={aboutData?.mission} />
      <WhyChooseUs data={aboutData?.why_choose_us} />
      <Directors members={aboutData?.board_of_directors?.members} />
      <OurTestimonials />
      <OurFaqs data={aboutData?.faqs}/>

      {/* Clients */}
      <div className="container pb-5 bgPattern1">
        <OurClient />
      </div>
    </>
  );
}
