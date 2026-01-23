"use client";

import { useEffect, useState } from "react";
import Input from "../../../components/Input/Input"
import PageHeader from "../../../components/PageHeader"
import OurClient from "../../../components/OurClient"

import { useDispatch, useSelector } from "react-redux";
import { fetchClients } from "@/store/slices/clientSlice";

export default function page() {

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

        

          </div>

          <div className="row">
            <div className="col-lg-12">
              <OurClient />
            </div>
          </div>
        </div>
      </div>
      
    </>
  )
}
