"use client";
import { useState } from "react";

export default function Accordion({ items }) {
  const [activeIndex, setActiveIndex] = useState(1); // default open 2nd like your design

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-accordion" id="accordion">
      {items.map((item, index) => (
        <div
          key={index}
          className="accordion-item wow fadeInUp"
          data-wow-delay={`${index * 0.2}s`}
        >
          <h2
            className="accordion-header"
            id={`heading${index}`}
          >
            <button
              className={`accordion-button ${
                activeIndex === index ? "" : "collapsed"
              }`}
              type="button"
              onClick={() => toggleAccordion(index)}
            >
              {item.question}
            </button>
          </h2>

          <div
            className={`accordion-collapse collapse ${
              activeIndex === index ? "show" : ""
            }`}
          >
            <div className="accordion-body">
              <p>{item.answer}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
