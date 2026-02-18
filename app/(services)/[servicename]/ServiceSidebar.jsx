import Link from "next/link";
import Button from "@/components/UI/Button/Button";

export default function ServiceSidebar() {
  return (
    <div className="page-single-sidebar">
      <div className="page-category-list wow fadeInUp">
        {/* <h3>Discover Our Services</h3> */}
        <h3>Modular Cleanroom</h3>
        <ul>
          <li><Link href="#">Cleanroom Wall, Ceiling & Riser Panels</Link></li>
          <li><Link href="#">Mobile Cleanroom</Link></li>
          <li><Link href="#">Cleanroom Doors & Windows</Link></li>
        </ul>
      </div>

      <div className="sidebar-cta-box ProductDetailsSidebar wow fadeInUp" data-wow-delay="0.25s">
        <div className="sidebar-cta-content">
          <h3>Need a Cleanroom-Ready Panel Solution?</h3>
          <p>
            Get expert guidance on wall & ceiling panels, insulation options, finishes,
            and installation support for pharma-grade cleanroom projects.
          </p>
        </div>

        <div className="sidebar-contact-list">
          <ul>
            <li>
              <img src="/images/icon-phone-accent.svg" alt="Phone" />
              <a href="tel:+123456789">+91-22-4971-9996</a>
            </li>
            <li>
              <img src="/images/icon-mail-accent.svg" alt="Email" />
              <a href="mailto:sales@pharmintech.net">sales@pharmintech.net</a>
            </li>
          </ul>
        </div>

        <div className="sidebar-cta-btn">
           <Button variant="primary" href="/contact" >Request Quote</Button>
        </div>
      </div>
    </div>
  );
}
