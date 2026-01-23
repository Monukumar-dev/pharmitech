import Link from "next/link";

export default function CleanroomPanels() {
  return (
    <section className="py-5 bg-light">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-5">
          <span className="badge text-bg-primary px-3 py-2 rounded-pill mb-3">
            Cleanroom Wall & Ceiling Panels
          </span>

          <h2 className="fw-bold display-6 mb-2">
            Pharmintech Wall & Ceiling Panels
          </h2>

          <p className="text-muted mx-auto" style={{ maxWidth: "900px" }}>
            Pharmintech wall and ceiling panels are self-supporting and designed
            specifically for cleanroom requirements. They provide a smooth wall
            surface with curved corners, which makes cleaning easy while keeping
            dust particles, viruses, and microbial or fungal growth at bay.
          </p>
        </div>

        <div className="row g-4">
          {/* Left content */}
          <div className="col-lg-6">
            <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
              <h5 className="fw-semibold mb-3">
                Why Choose Pharmintech Panels?
              </h5>

              {/* Item 1 */}
              <div className="d-flex gap-3 mb-3">
                <div
                  className="bg-primary bg-opacity-10 text-primary rounded-3 d-flex align-items-center justify-content-center"
                  style={{ width: "46px", height: "46px" }}
                >
                  ✅
                </div>
                <div>
                  <h6 className="mb-1 fw-semibold">Smooth, Hygienic Surface</h6>
                  <p className="text-muted mb-0 small">
                    Seamless panels with curved corners improve cleanability and
                    reduce contamination risk.
                  </p>
                </div>
              </div>

              {/* Item 2 */}
              <div className="d-flex gap-3 mb-3">
                <div
                  className="bg-success bg-opacity-10 text-success rounded-3 d-flex align-items-center justify-content-center"
                  style={{ width: "46px", height: "46px" }}
                >
                  🧼
                </div>
                <div>
                  <h6 className="mb-1 fw-semibold">
                    Easy to Clean & Maintain
                  </h6>
                  <p className="text-muted mb-0 small">
                    Designed to prevent dust collection and microbial or fungal
                    growth.
                  </p>
                </div>
              </div>

              {/* Item 3 */}
              <div className="d-flex gap-3 mb-3">
                <div
                  className="bg-warning bg-opacity-10 text-warning rounded-3 d-flex align-items-center justify-content-center"
                  style={{ width: "46px", height: "46px" }}
                >
                  🧩
                </div>
                <div>
                  <h6 className="mb-1 fw-semibold">
                    Smart Cleanroom Integration
                  </h6>
                  <p className="text-muted mb-0 small">
                    Includes return air risers, covings, pressure gauges,
                    cleanroom phones, and melaphones for better efficiency.
                  </p>
                </div>
              </div>

              <hr className="my-4" />

              <h6 className="fw-semibold mb-3">Included Cleanroom Accessories</h6>

              <div className="d-flex flex-wrap gap-2">
                <span className="badge bg-dark-subtle text-dark px-3 py-2 rounded-pill">
                  Return Air Risers
                </span>
                <span className="badge bg-dark-subtle text-dark px-3 py-2 rounded-pill">
                  Covings
                </span>
                <span className="badge bg-dark-subtle text-dark px-3 py-2 rounded-pill">
                  Pressure Gauges
                </span>
                <span className="badge bg-dark-subtle text-dark px-3 py-2 rounded-pill">
                  Cleanroom Phones
                </span>
                <span className="badge bg-dark-subtle text-dark px-3 py-2 rounded-pill">
                  Melaphones
                </span>
              </div>
            </div>
          </div>

          {/* Right Specs */}
          <div className="col-lg-6">
            <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
              <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
                <h5 className="fw-semibold mb-0">Features & Specifications</h5>

                <span className="badge text-bg-success px-3 py-2 rounded-pill">
                  Progressive Cleanroom Panel
                </span>
              </div>

              <div className="table-responsive">
                <table className="table table-borderless align-middle mb-0">
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

              <div className="mt-4 d-flex gap-2 flex-wrap">
                <Link href="/contact" className="btn btn-primary rounded-pill px-4">
                  Request Quote
                </Link>

                <Link
                  href="/brochure"
                  className="btn btn-outline-dark rounded-pill px-4"
                >
                  Download Catalog
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-5">
          <p className="text-muted small mb-0">
            Built for pharma, biotech, hospitals, and high-standard cleanroom
            environments.
          </p>
        </div>

        {/* ✅ Optional extra modern hover effect */}
        <style jsx>{`
          .card {
            transition: all 0.3s ease-in-out;
          }
          .card:hover {
            transform: translateY(-3px);
          }
          .table td {
            padding: 14px 10px;
          }
        `}</style>
      </div>
    </section>
  );
}
