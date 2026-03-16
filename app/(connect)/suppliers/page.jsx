"use client";

import { useEffect, useState } from "react";
import Input from "../../../components/Input/Input"
import PageHeader from "../../../components/PageHeader"
import OurClient from "../../../components/OurClient"
import Button from "@/components/UI/Button/Button";
import Preloader from "@/components/Preloader";

import { useDispatch, useSelector } from "react-redux";
import { submitContact, resetContact } from "@/store/slices/contactSlice";
import { fetchClients } from "@/store/slices/clientSlice";
import ContactInfoList from "../ContactInfoList";

export default function page() {

  const dispatch = useDispatch();
  const clients = useSelector((state) => state.client.clients);
  const { companyDetails, status } = useSelector((state) => state.company);
  const { loading, success, error } = useSelector((state) => state.contact);
  //if (!clients || clients.length === 0) return null;

  useEffect(() => {
    if (!clients.length) {
      dispatch(fetchClients());
    }
  }, [dispatch, clients]);

  const [form, setForm] = useState({
    name: "",
    company: "",
    location: "",
    email: "",
    contact: "",
    products: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //console.log("handleSubmit", form);
  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      type: "supplier",
      name: form.name,
      company: form.company,
      location: form.location,
      email: form.email,
      contact_number: form.contact,
      message: form.products,
    };

    dispatch(submitContact(payload));
  };

  useEffect(() => {
    if (success) {
      setForm({
        name: "",
        company: "",
        location: "",
        email: "",
        contact: "",
        products: "",
      });

      const timer = setTimeout(() => {
        dispatch(resetContact());
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [success, dispatch]);

  if (status === "loading") return <Preloader opacity={0.95} />;

  return (
    <>
      <PageHeader
        title="Contact Suppliers"
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

            {/* Contact Info */}
            <div className="col-lg-5">
              <div className="contact-us-content dark-section">
                <div className="section-title">
                  <h2 className="text-anime-style-3" data-cursor="-opaque">
                    Contact information
                  </h2>
                  <p className="wow fadeInUp">
                    Our vision is to redefine the way professionals connect,
                    collaborate, and create by offering flexible,
                  </p>
                </div>

                <ContactInfoList email={companyDetails?.contact_info?.supplier_contact_email} />
              </div>
            </div>

            {/* Contact Form */}
            <div className="col-lg-7">
              <div className="contact-us-form">
                <div className="contact-form">
                  <form
                    id="contactForm"
                    onSubmit={handleSubmit}
                    method="POST"
                    className="wow fadeInUp"
                    data-wow-delay="0.2s"
                  >
                    <div className="row">
                      <div className="form-group col-md-6 mb-4">
                        <Input
                          label="Name"
                          name="name"
                          type="text"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Enter Your Name *"
                          required
                        />
                      </div>

                      {/* Company */}
                      <div className="form-group col-md-6 mb-4">
                        <Input
                          label="Company"
                          name="company"
                          type="text"
                          value={form.company}
                          onChange={handleChange}
                          placeholder="Enter Company Name *"
                          required
                        />
                      </div>

                      {/* Contact Number */}
                      <div className="form-group col-md-6 mb-4">
                        <Input
                          label="Contact Number"
                          name="contact"
                          type="tel"
                          value={form.contact}
                          onChange={handleChange}
                          placeholder="Enter Contact Number *"
                          required
                        />
                      </div>

                      {/* Email */}
                      <div className="form-group col-md-6 mb-4">
                        <Input
                          label="Email"
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="Enter Email Address *"
                          required
                        />
                      </div>

                      {/* Location */}
                      <div className="form-group col-md-12 mb-4">
                        <Input
                          label="Location"
                          name="location"
                          type="text"
                          value={form.location}
                          onChange={handleChange}
                          placeholder="Enter Location"
                        />
                      </div>

                      {/* Products that you manufacture in brief */}
                      <div className="form-group col-md-12 mb-5">
                        <label className="form-label">
                          Products that you manufacture in brief
                        </label>
                        <textarea
                          name="products"
                          className="form-control"
                          rows="4"
                          placeholder="Briefly describe the products you manufacture..."
                          value={form.products}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      {/* Submit */}
                      <div className="col-md-12">
                        <Button type="submit" variant="primary" disabled={loading}>
                          {loading ? "Sending..." : "Send Message"}
                        </Button>

                        {success && (
                          <p className="text-success mt-3">Supplier details sent successfully!</p>
                          )}

                        {error && (<p className="text-danger mt-3">{error}</p>)}
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>

          </div>

          <div className="row bgPattern1">
            <div className="col-lg-12">
              <OurClient />
            </div>
          </div>
        </div>
      </div>
      {/* Page Contact Us End */}
    </>
  )
}
