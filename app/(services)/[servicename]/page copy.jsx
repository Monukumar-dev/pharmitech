"use client";

import { useEffect, useState } from "react";
import PageHeader from "../../../components/PageHeader"

import { useDispatch, useSelector } from "react-redux";
import { fetchServiceBySlug } from "../../../store/action/servicesAction";

import OurClient from "../../../components/OurClient"
import { fetchClients } from "@/store/slices/clientSlice";

export default function ServiceDetails({ params }) {

  const dispatch = useDispatch();
  const { servicename } = params;

  const { selected, loading, error } = useSelector((state) => state.services);

  useEffect(() => {
    if (servicename) {
      dispatch(fetchServiceBySlug(servicename));
    }
  }, [dispatch, servicename]);

  if (loading) return <p className="p-6">Loading service details...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;
  if (!selected) return <p className="p-6">Service not found!</p>;


  return (
    <>
      <PageHeader
        title="Products"
        backgroundImage="/images/suppliers.jpg"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "suppliers" }
        ]}
      />

      {/* Page Contact Us Start */}
      <div className="page-contact-us">
        <div className="container">
          <div className="row">
            <div className="p-6 max-w-5xl mx-auto">
              <h1 className="text-3xl font-bold">{selected.title}</h1>

              <img
                src={selected.image_url}
                alt={selected.title}
                className="w-full h-80 object-cover rounded-xl mt-5"
              />

              {/* ✅ Description is HTML */}
              <div
                className="prose max-w-none mt-6"
                dangerouslySetInnerHTML={{ __html: selected.description }}
              />
            </div>



          </div>

          <div className="row">
            <div className="col-lg-12">
              {/* <OurClient /> */}
            </div>
          </div>
        </div>
      </div>
      
    </>
  )
}
