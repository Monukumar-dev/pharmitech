import TextEffect from "./TextEffect";
import Accordion from "./Accordion";
import Button from "@/components/UI/Button/Button";

export default function OurFaqs({data}) {

 if (!data) return null;

  return (
    <div className="our-faqs pb-0 bgPattern1">
      <div className="container">
        <div className="row">
          
          <div className="col-xl-6">
            <div className="faqs-content">
              <div className="section-title">
                <h3>Frequently Asked Questions</h3>
                <TextEffect text="Everything you need to know about our cleanroom and pharma solution" />
                <p>
                  Learn how Pharmitech empowers your operations with innovative cleanroom technologies, precision engineering, and end-to-end project support tailored for the pharmaceutical industry.
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
