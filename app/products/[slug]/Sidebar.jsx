import Button from "@/components/UI/Button/Button";

export default function Sidebar({title}) {
  return (
    <div className="page-single-sidebar">
      <div className="page-category-list wow fadeInUp show">
        <h3 className="text-white">{title}</h3>
        <ul>
          <li>
            <a href="#">Cleanroom Wall, Ceiling &amp; Riser Panels</a>
          </li>
          <li>
            <a href="#">Mobile Cleanroom</a>
          </li>
          <li>
            <a href="#">Cleanroom Doors &amp; Windows</a>
          </li>
        </ul>
      </div>

      <div className="sidebar-cta-box ProductDetailsSidebar">
        <div className="sidebar-cta-content">
          <h3>Need a Cleanroom-Ready Panel Solution?</h3>
          <p>
            Get expert guidance on wall & ceiling panels, insulation options,
            finishes, and installation support.
          </p>
        </div>

        <div className="sidebar-contact-list">
          <ul>
            <li>
              <img src="/images/icon-phone-accent.svg" alt="Phone" />
              <a href="tel:+912249719996">+91-22-4971-9996</a>
            </li>

            <li>
              <img src="/images/icon-mail-accent.svg" alt="Email" />
              <a href="mailto:sales@pharmintech.net">
                sales@pharmintech.net
              </a>
            </li>
          </ul>
        </div>

        <div className="sidebar-cta-btn">
          <Button variant="primary" href="/contact">
            Request Quote
          </Button>
        </div>

      </div>
    </div>
  );
}