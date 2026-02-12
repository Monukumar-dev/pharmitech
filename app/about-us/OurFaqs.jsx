import TextEffect from "../../components/TextEffect";
import Accordion from "../../components/Accordion";

export default function OurFaqs() {
  const faqData = [
    {
      question: "What types of workspaces do you offer?",
      answer:
        "We offer hot desks, dedicated desks, private offices, and creative studios for individuals and teams.",
    },
    {
      question: "Is high-speed internet included in all plans?",
      answer:
        "Yes, ultra-fast internet is included in all membership plans.",
    },
    {
      question: "Are meeting rooms available to all members?",
      answer:
        "Meeting rooms can be booked by members depending on their selected plan.",
    },
    {
      question: "What amenities are included in my membership?",
      answer:
        "Amenities include Wi-Fi, meeting rooms, community events, refreshments, and lounge access.",
    },
    {
      question: "Are pets allowed in the coworking space?",
      answer:
        "Pet policies vary by location. Contact us for details.",
    },
  ];

  return (
    <div className="our-faqs pb-0">
      <div className="container">
        <div className="row">
          
          <div className="col-xl-6">
            <div className="faqs-content">
              <div className="section-title">
                <h3>Frequently Asked Questions</h3>
                <TextEffect text="Answers to help you make the most of our spaces" />
                <p>
                  Explore how co-working nurtures innovation,
                  builds community, and enhances productivity.
                </p>
              </div>

              <div className="our-faqs-btn">
                <a href="/faqs" className="btn-default">
                  View all FAQs
                </a>
              </div>
            </div>
          </div>

          <div className="col-xl-6">
            <Accordion items={faqData} />
          </div>

        </div>
      </div>
    </div>
  );
}
