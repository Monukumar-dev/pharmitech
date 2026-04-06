"use client";

import { useState } from "react";
import TextEffect from "@/components/TextEffect";
import Button from "@/components/UI/Button/Button";
import * as url from "@/utils/Url";
import styles from "@/styles/HomeConsultationPlanner.module.css";

const CARD_OPTIONS = [
  {
    id: "consultation",
    title: "Concept Design & Consultation",
    description:
      "Partner with our engineering experts to create a customized conceptual design for your facility.",
    action: "Proceed to Project Details",
  },
  {
    id: "product_service",
    title: "Product & Service Inquiry",
    description:
      "Request a customized proposal for modular panels, doors, HVAC systems, or complete turnkey packages.",
    action: "Proceed to Product Selection",
  },
  {
    id: "health_checkup",
    title: "Facility Health Checkup",
    description:
      "Schedule a comprehensive validation, testing, and troubleshooting audit for your existing cleanroom.",
    action: "Proceed to Audit Details",
  },
  {
    id: "expert",
    title: "Talk to an Expert",
    description:
      "Bypass forms and schedule a direct consultation call with our cleanroom engineering team.",
    action: "Book a Call Now",
  },
];

const ISSUE_OPTIONS = [
  "Pressurization",
  "Temperature/Humidity Control",
  "Particle Counts",
  "Compliance",
];

const INITIAL_CONSULTATION = {
  name: "",
  company: "",
  contact_number: "",
  email: "",
  project_type: "Greenfield (New Construction)",
  readiness_layout: false,
  readiness_consultant: false,
  industry_product_type: "",
  target_scope: "Complete Turnkey Design-Build",
  estimated_area: 5000,
};

const INITIAL_PRODUCT = {
  name: "",
  company: "",
  contact_number: "",
  email: "",
  requirement_scope: "I need a Complete Turnkey Solution",
  cat_panels: false,
  cat_doors_windows: false,
  cat_hvac: false,
  cat_equipment: false,
  cat_more: false,
};

const INITIAL_HEALTH = {
  name: "",
  company: "",
  contact_number: "",
  email: "",
  primary_issue_encountered: "Particle Counts",
  issue_duration: "1-6 months",
  doc_ahu: false,
  doc_hvac: false,
  doc_rds: false,
  description: "",
};

function CustomCheckbox({ checked, onChange, children }) {
  return (
    <label className={styles.checkChip}>
      <input
        type="checkbox"
        className={styles.checkChipInput}
        checked={checked}
        onChange={onChange}
      />
      <span className={styles.checkChipBox} aria-hidden="true" />
      <span className={styles.checkChipText}>{children}</span>
    </label>
  );
}

function ModalShell({ card, children, onClose, status }) {
  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className={styles.modalClose}
          onClick={onClose}
          aria-label="Close"
        >
          x
        </button>
        <div className={styles.modalBody}>
          <div className={styles.modalInnerGrid}>
            <div className={styles.modalLeftContent}>
              <h4>{card?.title}</h4>
              <p>{card?.description}</p>
              <p className={styles.modalActionText}>{card?.action}</p>
            </div>
            <div className={styles.modalRightForm}>{children}</div>
          </div>
        </div>
        {status.message ? (
          <p className={status.kind === "error" ? styles.errorBanner : styles.successBanner}>
            {status.message}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export default function HomeConsultationPlanner() {
  const [activeModal, setActiveModal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ kind: "", message: "" });
  const [consultation, setConsultation] = useState(INITIAL_CONSULTATION);
  const [product, setProduct] = useState(INITIAL_PRODUCT);
  const [health, setHealth] = useState(INITIAL_HEALTH);
  const getCard = (id) => CARD_OPTIONS.find((item) => item.id === id);

  const clearStatus = () => setStatus({ kind: "", message: "" });

  const openCard = (id) => {
    if (id === "expert") {
      window.location.href = "/customers";
      return;
    }
    clearStatus();
    setActiveModal(id);
  };

  const sendLead = async (payload) => {
    setLoading(true);
    clearStatus();
    try {
      const res = await fetch(`${url.BASE_URL}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || data?.status === false) {
        throw new Error(data?.message || "Failed to submit form.");
      }
      setStatus({ kind: "success", message: "Submitted successfully." });
      return true;
    } catch (error) {
      setStatus({
        kind: "error",
        message: error?.message || "Failed to submit. Please try again.",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const submitConsultation = async (e) => {
    e.preventDefault();
    const current_readiness = [];
    if (consultation.readiness_layout) current_readiness.push("I have layout");
    if (consultation.readiness_consultant) {
      current_readiness.push("I have an appointed Engineering Consultant");
    }
    const payload = {
      type: "consultation",
      name: consultation.name,
      company: consultation.company,
      contact_number: consultation.contact_number,
      email: consultation.email,
      form_data: {
        project_type: consultation.project_type,
        current_readiness,
        industry_product_type: consultation.industry_product_type,
        target_scope: consultation.target_scope,
        estimated_area: String(consultation.estimated_area),
      },
    };
    const ok = await sendLead(payload);
    if (ok) setConsultation(INITIAL_CONSULTATION);
  };

  const submitProduct = async (e) => {
    e.preventDefault();
    const category_selection = [];
    if (product.cat_panels) category_selection.push("Modular Cleanroom Panels");
    if (product.cat_doors_windows) category_selection.push("Cleanroom Doors & Windows");
    if (product.cat_hvac) category_selection.push("HVAC Systems");
    if (product.cat_equipment) category_selection.push("Cleanroom Equipment");
    if (product.cat_more) category_selection.push("Indoor Cleaning");
    const payload = {
      type: "product_service",
      name: product.name,
      company: product.company,
      email: product.email,
      contact_number: product.contact_number,
      form_data: {
        requirement_scope: product.requirement_scope,
        category_selection,
      },
    };
    const ok = await sendLead(payload);
    if (ok) setProduct(INITIAL_PRODUCT);
  };

  const submitHealth = async (e) => {
    e.preventDefault();
    const available_documentation = [];
    if (health.doc_ahu) available_documentation.push("AHU Details");
    if (health.doc_hvac) available_documentation.push("HVAC Details");
    if (health.doc_rds) available_documentation.push("Room Data Sheets");
    const payload = {
      type: "health_checkup",
      name: health.name,
      company: health.company,
      email: health.email,
      contact_number: health.contact_number,
      form_data: {
        primary_issue_encountered: health.primary_issue_encountered,
        issue_duration: health.issue_duration,
        available_documentation,
        description: health.description,
      },
    };
    const ok = await sendLead(payload);
    if (ok) setHealth(INITIAL_HEALTH);
  };

  return (
    <section className={styles.wrapper}>
      <div className="container section-title">
        <div className={styles.headingWrap}>
          <h2><TextEffect text="Ready to build a new greenfield facility OR upgrade your existing facility?" /></h2>
          
          <p className={styles.subtitle}>
            Select an option below to tailor your consultation and get a precise proposal.
          </p>
        </div>

        <div className={styles.cardGrid}>
          {CARD_OPTIONS.map((card, index) => (
            <button
              key={card.id}
              type="button"
              className={styles.optionCard}
              onClick={() => openCard(card.id)}
            >
              <span className={styles.optionNumber}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <h4>{card.title}</h4>
              <p>{card.description}</p>
              <span className={styles.optionAction}>{card.action}</span>
            </button>
          ))}
        </div>
      </div>

      {activeModal === "consultation" ? (
        <ModalShell
          card={getCard("consultation")}
          onClose={() => setActiveModal(null)}
          status={status}
        >
          <form className="contact-form" onSubmit={submitConsultation}>
            <div className="row">
              <div className="form-group col-md-6 mb-4">
                <input
                  className="form-control"
                  placeholder="Name *"
                  required
                  value={consultation.name}
                  onChange={(e) => setConsultation((p) => ({ ...p, name: e.target.value }))}
                />
              </div>
              <div className="form-group col-md-6 mb-4">
                <input
                  className="form-control"
                  placeholder="Company"
                  value={consultation.company}
                  onChange={(e) => setConsultation((p) => ({ ...p, company: e.target.value }))}
                />
              </div>
              <div className="form-group col-md-6 mb-4">
                <input
                  className="form-control"
                  placeholder="Mobile Number *"
                  required
                  value={consultation.contact_number}
                  onChange={(e) =>
                    setConsultation((p) => ({ ...p, contact_number: e.target.value }))
                  }
                />
              </div>
              <div className="form-group col-md-6 mb-4">
                <input
                  className="form-control"
                  type="email"
                  placeholder="Email Address *"
                  required
                  value={consultation.email}
                  onChange={(e) => setConsultation((p) => ({ ...p, email: e.target.value }))}
                />
              </div>
              <div className="form-group col-md-6 mb-4">
                <select
                  className="form-control"
                  value={consultation.project_type}
                  onChange={(e) =>
                    setConsultation((p) => ({ ...p, project_type: e.target.value }))
                  }
                >
                  <option>Greenfield (New Construction)</option>
                  <option>Expansion</option>
                  <option>Modification</option>
                </select>
              </div>
              <div className="form-group col-md-6 mb-4">
                <select
                  className="form-control"
                  value={consultation.target_scope}
                  onChange={(e) =>
                    setConsultation((p) => ({ ...p, target_scope: e.target.value }))
                  }
                >
                  <option>Complete Turnkey Design-Build</option>
                  <option>Only Budgetary Quotation</option>
                </select>
              </div>
              <div className="form-group col-md-12 mb-4">
                <p className={styles.groupLabel}>Current Readiness</p>
                <div className={styles.categoryGrid}>
                  <CustomCheckbox
                    checked={consultation.readiness_layout}
                    onChange={(e) =>
                      setConsultation((p) => ({ ...p, readiness_layout: e.target.checked }))
                    }
                  >
                    I have an architectural layout ready
                  </CustomCheckbox>
                  <CustomCheckbox
                    checked={consultation.readiness_consultant}
                    onChange={(e) =>
                      setConsultation((p) => ({
                        ...p,
                        readiness_consultant: e.target.checked,
                      }))
                    }
                  >
                    I have an appointed Engineering Consultant
                  </CustomCheckbox>
                </div>
              </div>
              <div className="form-group col-md-6 mb-4">
                <input
                  className="form-control"
                  placeholder="Industry / Product Type"
                  value={consultation.industry_product_type}
                  onChange={(e) =>
                    setConsultation((p) => ({
                      ...p,
                      industry_product_type: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="form-group col-md-6 mb-4">
                <div className={styles.sliderField}>
                  <div className={styles.sliderHeader}>
                    <span>Estimated Area (Sq. Ft.)</span>
                    <span className={styles.sliderValue}>
                      {Number(consultation.estimated_area).toLocaleString()} sq ft
                    </span>
                  </div>
                  <input
                    className={styles.creativeRange}
                    type="range"
                    min="0"
                    max="50000"
                    step="100"
                    value={consultation.estimated_area}
                    style={{
                      "--range-progress": `${(Number(consultation.estimated_area) / 50000) * 100}%`,
                    }}
                    onChange={(e) =>
                      setConsultation((p) => ({ ...p, estimated_area: Number(e.target.value) }))
                    }
                  />
                </div>
              </div>
              <div className="col-md-12">
                <Button type="submit" variant="primary" disabled={loading}>
                  {loading ? "Submitting..." : "Submit Project Details"}
                </Button>
              </div>
            </div>
          </form>
        </ModalShell>
      ) : null}

      {activeModal === "product_service" ? (
        <ModalShell
          card={getCard("product_service")}
          onClose={() => setActiveModal(null)}
          status={status}
        >
          <form className="contact-form" onSubmit={submitProduct}>
            <div className="row">
              <div className="form-group col-md-6 mb-4">
                <input
                  className="form-control"
                  placeholder="Name *"
                  required
                  value={product.name}
                  onChange={(e) => setProduct((p) => ({ ...p, name: e.target.value }))}
                />
              </div>
              <div className="form-group col-md-6 mb-4">
                <input
                  className="form-control"
                  placeholder="Company"
                  value={product.company}
                  onChange={(e) => setProduct((p) => ({ ...p, company: e.target.value }))}
                />
              </div>
              <div className="form-group col-md-6 mb-4">
                <input
                  className="form-control"
                  placeholder="Mobile Number *"
                  required
                  value={product.contact_number}
                  onChange={(e) =>
                    setProduct((p) => ({ ...p, contact_number: e.target.value }))
                  }
                />
              </div>
              <div className="form-group col-md-6 mb-4">
                <input
                  className="form-control"
                  type="email"
                  placeholder="Email Address *"
                  required
                  value={product.email}
                  onChange={(e) => setProduct((p) => ({ ...p, email: e.target.value }))}
                />
              </div>
              <div className="form-group col-md-6 mb-4">
                <select
                  className="form-control"
                  value={product.requirement_scope}
                  onChange={(e) =>
                    setProduct((p) => ({ ...p, requirement_scope: e.target.value }))
                  }
                >
                  <option>I need a Complete Turnkey Solution</option>
                  <option>I need Specific Products/Equipment</option>
                </select>
              </div>
              {product.requirement_scope === "I need Specific Products/Equipment" ? (
                <div className="form-group col-md-12 mb-4">
                  <p className={styles.groupLabel}>Select Categories</p>
                  <div className={styles.categoryGrid}>
                    <CustomCheckbox
                      checked={product.cat_panels}
                      onChange={(e) =>
                        setProduct((p) => ({ ...p, cat_panels: e.target.checked }))
                      }
                    >
                      Modular Cleanroom Panels
                    </CustomCheckbox>
                    <CustomCheckbox
                      checked={product.cat_doors_windows}
                      onChange={(e) =>
                        setProduct((p) => ({ ...p, cat_doors_windows: e.target.checked }))
                      }
                    >
                      Cleanroom Doors & Windows
                    </CustomCheckbox>
                    <CustomCheckbox
                      checked={product.cat_hvac}
                      onChange={(e) =>
                        setProduct((p) => ({ ...p, cat_hvac: e.target.checked }))
                      }
                    >
                      HVAC Systems
                    </CustomCheckbox>
                    <CustomCheckbox
                      checked={product.cat_equipment}
                      onChange={(e) =>
                        setProduct((p) => ({ ...p, cat_equipment: e.target.checked }))
                      }
                    >
                      Cleanroom Equipment
                    </CustomCheckbox>
                    <CustomCheckbox
                      checked={product.cat_more}
                      onChange={(e) =>
                        setProduct((p) => ({ ...p, cat_more: e.target.checked }))
                      }
                    >
                      more ( guide towards contact page form )
                    </CustomCheckbox>
                  </div>
                </div>
              ) : null}
              <div className="col-md-12">
                <Button type="submit" variant="primary" disabled={loading}>
                  {loading ? "Submitting..." : "Request Custom Proposal"}
                </Button>
              </div>
            </div>
          </form>
        </ModalShell>
      ) : null}

      {activeModal === "health_checkup" ? (
        <ModalShell
          card={getCard("health_checkup")}
          onClose={() => setActiveModal(null)}
          status={status}
        >
          <form className="contact-form" onSubmit={submitHealth}>
            <div className="row">
              <div className="form-group col-md-6 mb-4">
                <input
                  className="form-control"
                  placeholder="Name *"
                  required
                  value={health.name}
                  onChange={(e) => setHealth((p) => ({ ...p, name: e.target.value }))}
                />
              </div>
              <div className="form-group col-md-6 mb-4">
                <input
                  className="form-control"
                  placeholder="Company"
                  value={health.company}
                  onChange={(e) => setHealth((p) => ({ ...p, company: e.target.value }))}
                />
              </div>
              <div className="form-group col-md-6 mb-4">
                <input
                  className="form-control"
                  placeholder="Mobile Number *"
                  required
                  value={health.contact_number}
                  onChange={(e) =>
                    setHealth((p) => ({ ...p, contact_number: e.target.value }))
                  }
                />
              </div>
              <div className="form-group col-md-6 mb-4">
                <input
                  className="form-control"
                  type="email"
                  placeholder="Email Address *"
                  required
                  value={health.email}
                  onChange={(e) => setHealth((p) => ({ ...p, email: e.target.value }))}
                />
              </div>
              <div className="form-group col-md-6 mb-4">
                <select
                  className="form-control"
                  value={health.primary_issue_encountered}
                  onChange={(e) =>
                    setHealth((p) => ({
                      ...p,
                      primary_issue_encountered: e.target.value,
                    }))
                  }
                >
                  {ISSUE_OPTIONS.map((issue) => (
                    <option key={issue}>{issue}</option>
                  ))}
                </select>
              </div>
              <div className="form-group col-md-6 mb-4">
                <select
                  className="form-control"
                  value={health.issue_duration}
                  onChange={(e) => setHealth((p) => ({ ...p, issue_duration: e.target.value }))}
                >
                  <option>Less than 1 month</option>
                  <option>1-6 months</option>
                  <option>6+ months</option>
                </select>
              </div>
              <div className="form-group col-md-12 mb-4">
                <p className={styles.groupLabel}>Available Documentation</p>
                <div className={styles.categoryGrid}>
                  <CustomCheckbox
                    checked={health.doc_ahu}
                    onChange={(e) => setHealth((p) => ({ ...p, doc_ahu: e.target.checked }))}
                  >
                    AHU Details
                  </CustomCheckbox>
                  <CustomCheckbox
                    checked={health.doc_hvac}
                    onChange={(e) => setHealth((p) => ({ ...p, doc_hvac: e.target.checked }))}
                  >
                    HVAC Details
                  </CustomCheckbox>
                  <CustomCheckbox
                    checked={health.doc_rds}
                    onChange={(e) => setHealth((p) => ({ ...p, doc_rds: e.target.checked }))}
                  >
                    Room Data Sheets
                  </CustomCheckbox>
                </div>
              </div>
              <div className="form-group col-md-12 mb-4">
                <textarea
                  className="form-control"
                  rows={2}
                  placeholder="Description"
                  value={health.description}
                  onChange={(e) => setHealth((p) => ({ ...p, description: e.target.value }))}
                />
              </div>
              <div className="col-md-12">
                <Button type="submit" variant="primary" disabled={loading}>
                  {loading ? "Submitting..." : "Schedule Facility Audit"}
                </Button>
              </div>
            </div>
          </form>
        </ModalShell>
      ) : null}
    </section>
  );
}
