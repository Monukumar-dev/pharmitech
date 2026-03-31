"use client";
import * as url from "@/utils/Url";
import { useEffect, useState } from "react";
import PageHeader from "@/components/PageHeader";

export default function PrivacyPolicyPage() {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrivacyPolicy = async () => {
      try {
        const response = await fetch(`${url.BASE_URL}/api/pages/terms-and-conditions`);
        const result = await response.json();
        if (result.status) {
          setPageData(result.data);
        } else {
          setError("Failed to load privacy policy.");
        }
      } catch (err) {
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPrivacyPolicy();
  }, []);

  return (
    <>
      <PageHeader
        title={pageData?.title || "Terms & Conditions"}
        backgroundImage="/images/careers.jpg"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Privacy Policy" },
        ]}
      />

      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-9">

              {loading && (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-3 text-muted">Loading Terms & Conditions...</p>
                </div>
              )}

              {error && (
                <div className="alert alert-danger text-center" role="alert">
                  {error}
                </div>
              )}

              {!loading && !error && pageData && (
                <div className="" dangerouslySetInnerHTML={{ __html: pageData.content }}>
                  
                </div>
              )}

            </div>
          </div>
        </div>
      </section>
    </>
  );
}