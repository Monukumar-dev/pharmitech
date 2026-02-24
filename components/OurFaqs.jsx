import TextEffect from "./TextEffect";
import Accordion from "./Accordion";
import Button from "@/components/UI/Button/Button";

export default function OurFaqs({data}) {

 if (!data) return null;

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

              {/* <div className="our-faqs-btn">
                <Button variant="primary" href="/faqs" >View all FAQs</Button>
              </div> */}
            </div>
          </div>

          <div className="col-xl-6">
            <Accordion items={data} />
          </div>

        </div>
      </div>
    </div>
  );
}
