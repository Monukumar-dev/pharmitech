"use client";

import { useEffect, useState } from "react";
import Input from "../../../components/Input/Input"
import PageHeader from "../../../components/PageHeader"
import OurClient from "../../../components/OurClient"
import Button from "@/components/UI/Button/Button";

import { useDispatch, useSelector } from "react-redux";
import { submitContact, resetContact } from "@/store/slices/contactSlice";
import { fetchClients } from "@/store/slices/clientSlice";

export default function page() {

  const dispatch = useDispatch();
  const clients = useSelector((state) => state.client.clients);
  const { loading, success, error } = useSelector((state) => state.contact);

  //if (!clients || clients.length === 0) return null;

  const [form, setForm] = useState({
    name: "",
    department: "",
    position: "",
    location: "",
    email: "",
    contact: "",
    cv: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("type", "career");
    formData.append("name", form.name);
    formData.append("department", form.department);
    formData.append("position", form.position);
    formData.append("location", form.location);
    formData.append("email", form.email);
    formData.append("contact_number", form.contact);

    // combine info into message (safe for backend)
    formData.append(
      "message",
      `Department: ${form.department}\nPosition: ${form.position}`
    );

    if (form.cv) {
      formData.append("cv", form.cv);
    }

    dispatch(submitContact(formData));
  };

  useEffect(() => {
    if (success) {
      setForm({
        name: "",
        department: "",
        position: "",
        location: "",
        email: "",
        contact: "",
        cv: null,
      });

      const timer = setTimeout(() => {
        dispatch(resetContact());
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [success, dispatch]);

  useEffect(() => {
    if (!clients.length) {
      dispatch(fetchClients());
    }
  }, [dispatch, clients]);

  return (
    <>
      <PageHeader
        title="Contact Careers"
        backgroundImage="/images/careers.jpg"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Careers" }
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
                    encType="multipart/form-data"
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

                      {/* Department of Expertise */}
                      <div className="form-group col-md-6 mb-4">
                        <Input
                          label="Department of Expertise"
                          name="department"
                          type="text"
                          value={form.department}
                          onChange={handleChange}
                          placeholder="e.g. HVAC, Cleanroom, Validation"
                          required
                        />
                      </div>

                      {/* Position Applied For */}
                      <div className="form-group col-md-6 mb-4">
                        <Input
                          label="Position Applied For"
                          name="position"
                          type="text"
                          value={form.position}
                          onChange={handleChange}
                          placeholder="e.g. Project Engineer"
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
                          placeholder="Preferred Location"
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

                      {/* Upload CV */}
                      <div className="form-group col-md-12 mb-5">
                        <label className="form-label">Upload Your CV</label>
                        <input
                          type="file"
                          name="cv"
                          className="form-control"
                          accept=".pdf,.doc,.docx"
                          onChange={handleChange}
                          required
                        />
                        <small className="form-text text-muted">
                          Accepted formats: PDF, DOC, DOCX (Max 5MB)
                        </small>
                      </div>

                      {/* Submit */}
                      <div className="col-md-12">
                        {/* <button type="submit" className="btn-default" disabled={loading}>
                          <span></span>
                        </button> */}

                        <Button type="submit" variant="primary" disabled={loading}>
                            {loading ? "Applying..." : "Apply Now"}
                        </Button>

                        {success && (
                          <p className="text-success mt-3">
                            Application submitted successfully!
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
