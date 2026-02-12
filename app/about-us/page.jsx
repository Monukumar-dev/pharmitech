"use client";

import { useEffect, useState } from "react";

import PageHeader from "@/components/PageHeader"
import OurClient from "../../components/OurClient";

import { useDispatch, useSelector } from "react-redux";
import { fetchClients } from "@/store/slices/clientSlice";
import AboutWorkspace from "./AboutWorkspace";
import AboutApproach from "./AboutApproach";
import WhyChooseUs from "./WhyChooseUs";
import IntroVideo from "./IntroVideo";
import OurTeam from "./OruTeam";
import OurTestimonials from "@/components/homepage/OurTestimonials";
import OurFaqs from "./OurFaqs";


export default function AboutUs() {

  const dispatch = useDispatch();
  const clients = useSelector((state) => state.client.clients);
  const { loading, success, error } = useSelector((state) => state.contact);

  //if (!clients || clients.length === 0) return null;
  

  useEffect(() => {
    if (!clients.length) {
      dispatch(fetchClients());
    }
  }, [dispatch, clients]);

  return (
    <>
      <PageHeader
        title="About us"
        backgroundImage="/images/hero-bg-image-silver111.jpg"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About us" }
        ]}
      />

      <AboutWorkspace />
      <AboutApproach />
      <WhyChooseUs />
      <IntroVideo />
      <OurTeam />
      <OurTestimonials />
      <OurFaqs />

      {/* Page Contact Us Start */}
      <div className="">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 pb-5">
              <OurClient />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
