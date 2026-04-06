"use client";

import "@/styles/industries.css";

export default function IndustriesSection({ content, items }) {
  if (!items?.length) return null;

  return (
    <section className="industries about-us bgPattern1" id="industries">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-10">
            {content ? (
              <p className="text-center">{content}</p>
            ) : null}
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-12">
            <div className="industry-list">
              {items.map((item, index) => (
                <div
                  className="industry-card"
                  key={`${item.name}-${item.logo_url ?? index}`}
                >
                  <div className="card-num">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="card-icon-row">
                    <div className="card-emoji">
                      {item.logo_url ? (
                        <img
                          src={item.logo_url}
                          alt={item.name || ""}
                          className="card-industry-logo"
                        />
                      ) : null}
                    </div>
                    <div className="card-name">{item.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
