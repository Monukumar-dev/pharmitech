"use client";
import { useEffect, useRef, useState } from "react";

export default function Accordion({ items }) {
  const [activeIndex, setActiveIndex] = useState(1); // default open 2nd like your design
  const [visibleItems, setVisibleItems] = useState({});
  const itemRefs = useRef([]);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = Number(entry.target.getAttribute("data-idx"));
          if (entry.isIntersecting) {
            setVisibleItems((prev) => ({ ...prev, [idx]: true }));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );

    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  return (
    <div className="faq-accordion" id="accordion">
      {items.map((item, index) => (
        <div
          key={item.id}
          ref={(el) => (itemRefs.current[index] = el)}
          data-idx={index}
          className={`accordion-item faq-item-reveal ${visibleItems[index] ? "is-visible" : ""}`}
          style={{ animationDelay: `${index * 0.12}s` }}
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
