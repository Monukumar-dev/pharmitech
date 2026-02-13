"use client";

import { useEffect, useState } from "react";
import Input from "../../../components/Input/Input"
import PageHeader from "../../../components/PageHeader"
import OurClient from "../../../components/OurClient"
import Button from "@/components/UI/Button/Button";

import { useDispatch, useSelector } from "react-redux";
import { fetchClients } from "@/store/slices/clientSlice";
import { submitContact, resetContact } from "@/store/slices/contactSlice";

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



const [form, setForm] = useState({
    name: "",
    company: "",
    location: "",
    projectOrderNo: "",
    email: "",
    contact: "",
    response: "",
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ CORRECT SUBMIT HANDLER
  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      type: "complaint",
      name: form.name,
      company: form.company,
      location: form.location,
      order_no: form.projectOrderNo,
      email: form.email,
      contact_number: form.contact,
      message: form.response,
    };

    dispatch(submitContact(payload));
  };

  // ✅ reset AFTER success (not immediately)
  useEffect(() => {
    if (success) {
      setForm({
        name: "",
        company: "",
        location: "",
        projectOrderNo: "",
        email: "",
        contact: "",
        response: "",
      });

      const timer = setTimeout(() => {
        dispatch(resetContact());
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [success, dispatch]);

  return (
    <>
      <PageHeader
        title="Contact Complaints & Feedback"
        backgroundImage="/images/feedbacks.jpg"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Complaints & Feedback" }
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

                <div className="contact-info-list">
                  <div className="contact-info-item wow fadeInUp" data-wow-delay="0.2s">
                    <div className="icon-box">
                      <img src="/images/icon-phone-primary.svg" alt="Phone" />
                    </div>
                    <div className="contact-item-content">
                      <p>Phone Number</p>
                      <h3>
                        <a href="tel:+912249719996">+91-22-4971-9996</a>
                      </h3>
                    </div>
                  </div>

                  <div className="contact-info-item wow fadeInUp" data-wow-delay="0.4s">
                    <div className="icon-box">
                      <img src="/images/icon-mail-primary.svg" alt="Email" />
                    </div>
                    <div className="contact-item-content">
                      <p>Email Address</p>
                      <h3>
                        <a href="mailto:sales@pharmintech.net">
                          sales@pharmintech.net
                        </a>
                      </h3>
                    </div>
                  </div>

                  <div className="contact-info-item wow fadeInUp" data-wow-delay="0.6s">
                    <div className="icon-box">
                      <img src="/images/icon-location-primary.svg" alt="Location" />
                    </div>
                    <div className="contact-item-content">
                      <p>Our Location</p>
                      <h3>Pharmintech Turnkey Solutions Private Limited
                        A-417, Tower-II, Lodha Supremus, Road no. 22, Wagle Estate,Thane-400604, Maharashtra, India.</h3>
                    </div>
                  </div>

                </div>
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

                      {/* Name */}
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

                      {/* Location */}
                      <div className="form-group col-md-6 mb-4">
                        <Input
                          label="Location"
                          name="location"
                          type="text"
                          value={form.location}
                          onChange={handleChange}
                          placeholder="Enter Location"
                        />
                      </div>

                      {/* Project Order No. */}
                      <div className="form-group col-md-6 mb-4">
                        <Input
                          label="Project Order No."
                          name="projectOrderNo"
                          type="text"
                          value={form.projectOrderNo}
                          onChange={handleChange}
                          placeholder="Enter Project / Order Number"
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

                      {/* Response in brief */}
                      <div className="form-group col-md-12 mb-5">
                        <label className="form-label">Response in brief</label>
                        <textarea
                          name="response"
                          className="form-control"
                          rows="4"
                          placeholder="Briefly describe your complaint or feedback..."
                          value={form.response}
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
                          <p className="text-success mt-3">
                            Complaint / feedback submitted successfully!
                          </p>
                        )}

                        {error && (
                          <p className="text-danger mt-3">
                            {error}
                          </p>
                        )}

                      </div>

                    </div>
                  </form>


                </div>
              </div>
            </div>

            {/* Google Map */}
            <div className="col-lg-12">
              <div className="google-map-iframe">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3767.9315792570687!2d72.94512997381999!3d19.198190548127894!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7bb9141de06bb%3A0xd14cb2e05b0a20e3!2sPharmintech%20Turnkey%20Solutions%20Private%20Limited!5e0!3m2!1sen!2sin!4v1767168215499!5m2!1sen!2sin"
                  width="100%"
                  style={{ height: "450px", border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />

              </div>
            </div>

          </div>

          <div className="row">
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
