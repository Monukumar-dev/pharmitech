import Button from "@/components/UI/Button/Button";
import Link from "next/link";

export default function Sidebar({data}) {

  //console.log(data.subcategory_products);
  return (
    <div className="page-single-sidebar">
      <div className="page-category-list wow fadeInUp show">
        <h3 className="text-white">{data.subcategory_name}</h3>
        <ul>
          {data?.subcategory_products?.map((item,i) => (
          <li key={item.id}>
            <Link href={item.slug} className={`${item.is_active === 1 ? 'text-primary' : ''}`}>{item.name}</Link>
          </li>
          ))}
        </ul>
      </div>

      <div className="sidebar-cta-box ProductDetailsSidebar">
        <div className="sidebar-cta-content">
          <h5 className="text-light h5">Get expert guidance on wall & ceiling panels, insulation options,
            finishes, and installation support.</h5>
          {/* <p>
            Get expert guidance on wall & ceiling panels, insulation options,
            finishes, and installation support.
          </p> */}
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