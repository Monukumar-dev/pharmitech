'use client'

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import Button from "@/components/UI/Button/Button";

import * as url from "@/utils/Url";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false);
  const [turnkeyData, setTurnkeyData] = useState(null);
  const pathname = usePathname()

  const base_url = url.BASE_URL; // use env


  useEffect(() => {
  const handleScroll = () => {
    setScrolled(window.scrollY > 150);
  };
  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

  // ✅ Fetch Category Products
  useEffect(() => {
    const fetchTurnkeyMenu = async () => {
      try {
        const res = await fetch(`${base_url}/api/category-products`);
        const data = await res.json();

        if (data?.status) {
          setTurnkeyData(data.data);
        }
      } catch (error) {
        console.error("Error fetching turnkey menu:", error);
      }
    };

    fetchTurnkeyMenu();
  }, [base_url]);

  const isHome = pathname === "/"

  return (
    <header className={`main-header active-sticky-header ${menuOpen ? "menu-open" : ""}`}>
      <div className={`header-sticky ${!isHome ? "bg-section dark-section" : ""} ${scrolled ? "active" : ""}`}>
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid">
            <Link className="navbar-brand" href="/">
              <Image
                src="/images/logo.png"
                alt="Logo"
                width={180}
                height={60}
                priority
              />
            </Link>

            {/* Toggle Button (Mobile) */}
            <div
              className="navbar-toggle"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>

            {/* Main Menu */}
            <div className={`collapse navbar-collapse main-menu ${menuOpen ? "show" : ""}`}>
              <div className="nav-menu-wrapper">
                <ul className="navbar-nav mr-auto" id="menu">

                  <li className="nav-item">
                    <Link className="nav-link" href="/">Home</Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" href="/about-us">About Us</Link>
                  </li>
                  

                  {/* Turnkey Solutions */}

                  {turnkeyData && (
                    <li className="nav-item submenu">
                      <a className="nav-link">{turnkeyData.name}</a>
                      <ul>

                        {turnkeyData.categories.map((category) => (
                          <li key={category.id} className="nav-item submenu">
                            <Link href="#" className="nav-link">{category.name}</Link>
                            <ul>
                              {category.subcategories.map((sub) => (
                                <li key={sub.id} className="nav-item submenu">
                                  <Link className="nav-link" href={`/products/${sub.id}`}>{sub.name}</Link>

                                  {/* {sub.products?.length > 0 && (
                                    <ul>
                                      {sub.products.map((product) => (
                                        <li key={product.product_id}>
                                          <Link
                                            className="nav-link"
                                            href={`/products/${product.product_id}`}
                                          >
                                            {product.name}
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  )} */}

                                </li>
                              ))}

                            </ul>
                          </li>
                        ))}

                      </ul>
                    </li>
                  )}

                  {/* <li className="nav-item submenu">
                    <a className="nav-link">Turnkey Solutions</a>
                    <ul>

                      <li className="nav-item submenu">
                        <span className="nav-link">Inhouse Products</span>
                        <ul>
                          <li className="nav-item">
                            <Link className="nav-link" href="#">Modular Cleanroom</Link>
                          </li>
                          <li className="nav-item">
                            <Link className="nav-link" href="#">Equipment & Furniture</Link>
                          </li>
                        </ul>
                      </li>

                      <li className="nav-item submenu">
                        <span className="nav-link">Services</span>
                        <ul>
                          <li><Link className="nav-link" href="#">Cleanroom Concept & Detailed Design</Link></li>
                          <li><Link className="nav-link" href="#">HVAC Design & Engineering</Link></li>
                          <li><Link className="nav-link" href="#">Electrical</Link></li>
                          <li><Link className="nav-link" href="#">Testing & Validation</Link></li>
                          <li><Link className="nav-link" href="#">Water System</Link></li>
                          <li><Link className="nav-link" href="#">Utility</Link></li>
                          <li><Link className="nav-link" href="#">Modular Laboratory Design</Link></li>
                        </ul>
                      </li>

                    </ul>
                  </li> */}


                  {/* Insights */}
                  <li className="nav-item submenu">
                    <a className="nav-link">Insights</a>
                    <ul>
                      {/* <li><Link className="nav-link" href="/case-studies">Case Studies</Link></li> */}
                      <li><Link className="nav-link" href="/clientele">Clientele</Link></li>
                      <li><Link className="nav-link" href="/blogs">Blogs</Link></li>
                      <li><Link className="nav-link" href="/events">Events</Link></li>
                      <li><Link className="nav-link" href="/gallery">Projects Gallery</Link></li>
                    </ul>
                  </li>

                  {/* Connect */}
                  <li className="nav-item submenu">
                    <a className="nav-link">Connect</a>
                    <ul>
                      <li><Link className="nav-link" href="/customers">Customers</Link></li>
                      <li><Link className="nav-link" href="/suppliers">Suppliers</Link></li>
                      <li><Link className="nav-link" href="/careers">Careers</Link></li>
                      <li><Link className="nav-link" href="/complaints-and-feedback">Complaints & Feedback</Link></li>
                    </ul>
                  </li>
                </ul>
              </div>

              {/* CTA Button */}
              <div className="header-btn">
                <Button href="/customers" variant="primary">
                      Request a Quote
                </Button>
              </div>

            </div>
          </div>
        </nav>

        {/* Optional responsive menu container (CSS based) */}
        <div className="responsive-menu"></div>
      </div>
    </header>
  )
}
