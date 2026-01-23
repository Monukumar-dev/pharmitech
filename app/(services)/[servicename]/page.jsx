"use client";

import { useEffect, useState } from "react";
import PageHeader from "../../../components/PageHeader"

import { useDispatch, useSelector } from "react-redux";
import { fetchServiceBySlug } from "../../../store/action/servicesAction";

import OurClient from "../../../components/OurClient"
import { fetchClients } from "@/store/slices/clientSlice";
import ServiceSidebar from "./ServiceSidebar"

export default function ServiceDetails({ params }) {

 

  return (
    <>
      <PageHeader
        title="Cleanroom Modular Wall & Ceiling Panels "
        backgroundImage="/images/services/clean-room-wall-ceiling-panels.jpg"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "suppliers" }
        ]}
      />

      <div className="page-service-single">
      <div className="container">
        <div className="row flex-column-reverse flex-lg-row">
          <div className="col-lg-4">
            <ServiceSidebar />
          </div>

          {/* ✅ RIGHT SERVICE CONTENT */}
          <div className="col-lg-8">
            <div className="service-single-content">
              <div className="page-single-image">
                <figure className="">
                  <img src="/images/services/clean-room-wall-ceiling-panels.jpg" alt="Service" />
                </figure>
              </div>
              <div className="service-entry">
                <p className="wow fadeInUp">
                  Pharmintech wall and ceiling panels are self-supporting and designed specifically for cleanroom requirements.
                </p>
                <p className="wow fadeInUp">
                  They provide a smooth wall surface with curved corners, which makes cleaning easy while keeping dust particles, viruses, and microbial or fungal growth at bay.
                </p>
                <p className="wow fadeInUp">
                  This system includes a variety of features to improve cleanroom efficiency and user-friendliness, such as return air risers, covings, pressure gauges, cleanroom phones, and melaphones.
                </p>
                <h2 class="text-anime-style-3">Features & Specifications</h2>
                <div className="table-responsive">
                <table className="table table-borderless align-middle mb-0 wow fadeInUp">
                  <tbody>
                    <tr className="border-bottom">
                      <td className="text-muted small fw-semibold">Panel Type</td>
                      <td className="fw-semibold">Progressive Cleanroom Panel</td>
                    </tr>

                    <tr className="border-bottom">
                      <td className="text-muted small fw-semibold">
                        Panel Thickness
                      </td>
                      <td className="fw-semibold">
                        50 mm / 80 mm / 100 mm
                      </td>
                    </tr>

                    <tr className="border-bottom">
                      <td className="text-muted small fw-semibold">
                        Insulation
                      </td>
                      <td className="fw-semibold">
                        PUF / Rock Wool / Honeycomb / PIR
                      </td>
                    </tr>

                    <tr className="border-bottom">
                      <td className="text-muted small fw-semibold">
                        Max Panel Width
                      </td>
                      <td className="fw-semibold">1200 mm</td>
                    </tr>

                    <tr className="border-bottom">
                      <td className="text-muted small fw-semibold">
                        Sheet Thickness
                      </td>
                      <td className="fw-semibold">0.6 / 0.8 / 1.0 mm</td>
                    </tr>

                    <tr className="border-bottom">
                      <td className="text-muted small fw-semibold">
                        Surface Finish
                      </td>
                      <td className="fw-semibold">
                        Pre-Painted GI (PPGI) / Powder Coated GI (PCGI) /
                        Stainless Steel (SS 304 / SS 316) / High Pressure Laminate
                        (HPL)
                      </td>
                    </tr>

                    <tr className="border-bottom">
                      <td className="text-muted small fw-semibold">
                        Inter-connection
                      </td>
                      <td className="fw-semibold">
                        Aluminum / GI interconnecting profiles
                      </td>
                    </tr>

                    <tr className="border-bottom">
                      <td className="text-muted small fw-semibold">Coving</td>
                      <td className="fw-semibold">
                        50’ Radius Aluminum powder coated snap fit coving with 3D
                        & 2D Corners
                      </td>
                    </tr>

                    <tr className="border-bottom">
                      <td className="text-muted small fw-semibold">
                        Load Bearing Capacity
                      </td>
                      <td className="fw-semibold">Up to 150 Kg / Sqm</td>
                    </tr>

                    <tr>
                      <td className="text-muted small fw-semibold">
                        Thermal Conductivity
                      </td>
                      <td className="fw-semibold">
                        0.018 W/mK (PUF) &nbsp; | &nbsp; 0.035 W/mK (Mineral Wool)
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> 
    </>
  )
}
