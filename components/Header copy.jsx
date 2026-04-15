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
  const [pageData, setPageData] = useState(null);
  const pathname = usePathname()

  const base_url = url.BASE_URL; 


 // console.log("pageData", pageData);
  
// Close menu on route change
useEffect(() => {
  setMenuOpen(false);
}, [pathname]);

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

  useEffect(() => {
    const fetchPageMenuData = async () => {
      try {
        const res = await fetch(`${base_url}/api/pages/page-meta`);
        const data = await res.json();

        if (data?.success) {
          setPageData(data.data);
        }
      } catch (error) {
        console.error("Error fetching fetchPageMenuData:", error);
      }
    };

    fetchPageMenuData();
  }, [base_url]);

  const isHome = pathname === "/"

  const handleClick = (e) => {
    if (pathname === "/") {
      e.preventDefault();
      window.location.reload(); // 🔥 full reload
    }
  };

  return (
    <header className={`main-header active-sticky-header ${menuOpen ? "menu-open" : ""}`}>
      <div className={`header-sticky ${!isHome ? "bg-section dark-section" : ""} ${scrolled ? "active" : ""}`}>
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid">
            <Link className="navbar-brand" href="/" onClick={handleClick}>
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
                className={`navbar-toggle ${menuOpen ? "active" : ""}`}
                onClick={() => setMenuOpen(!menuOpen)}
              >
              <span className="slicknav_icon-bar"></span>
              <span className="slicknav_icon-bar"></span>
              <span className="slicknav_icon-bar"></span>
            </div>

            {/* Main Menu */}
            <div className={`navbar-collapse main-menu ${menuOpen ? "menu-open-active" : ""}`}>
              <div className="nav-menu-wrapper">
                <ul className="navbar-nav mr-auto" id="menu">
                  <li className="nav-item">
                    <Link className="nav-link" href="/" onClick={handleClick}>Home</Link>
                  </li>

                  {pageData?.["About Us"]?.active && (
                    <li className="nav-item">
                      <Link className="nav-link" href="/about-us">About Us</Link>
                    </li>      
                  )}

                  
                  

                  {/* Turnkey Solutions */}
                  {turnkeyData && (
                    <li className="nav-item submenu">
                      <a className="nav-link">{turnkeyData.name}</a>

                      <ul>
                        {turnkeyData.categories.map((category) => (
                          <li key={category.id} className="nav-item submenu">

                            <span className="nav-link">{category.name}</span>

                            <ul>

                              {/* 🔹 Subcategories */}
                              {category.subcategories.map((sub) => (
                                <li key={sub.id} className="nav-item submenu">

                                  <span className="nav-link">{sub.name}</span>

                                  {sub.products?.length > 0 && (
                                    <ul>
                                      {sub.products.map((product) => (
                                        <li key={product.product_id}>
                                          <Link
                                            className="nav-link"
                                            href={`/products/${product.slug}`}
                                          >
                                            {product.name}
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  )}

                                </li>
                              ))}

                              {/* 🔥 Direct Products (Same Level as Subcategories) */}
                              {category.products?.map((product) => (
                                <li className="px-2 ProductsSubcategories" key={product.product_id}>
                                  <Link
                                    className="nav-link no-padding"
                                    href={`/products/${product.slug}`}
                                  >
                                    {product.name}
                                  </Link>
                                </li>
                              ))}

                            </ul>

                          </li>
                        ))}
                      </ul>
                    </li>
                  )}

                

                  {/* Insights */}
                  <li className="nav-item submenu">
                    <a className="nav-link">Insights</a>
                    <ul>
                      {/* <li><Link className="nav-link" href="/case-studies">Case Studies</Link></li> */}
                      
                      {pageData?.["Clientele"]?.active && (
                          <li><Link className="nav-link" href="/clientele">Clientele</Link></li>    
                      )}
                       {pageData?.["Blogs"]?.active && (
                          <li><Link className="nav-link" href="/blogs">Blogs</Link></li>    
                      )}
                      {pageData?.["Events"]?.active && (
                        <li><Link className="nav-link" href="/events">Events</Link></li>   
                      )}
                      {pageData?.["Projects Gallery"]?.active && (
                        <li><Link className="nav-link" href="/gallery">Projects Gallery</Link></li>
                      )}
                    </ul>
                  </li>

                  {/* Connect */}
                  <li className="nav-item submenu">
                    <a className="nav-link">Connect</a>
                    <ul>
                      {pageData?.["Customers"]?.active && (
                        <li><Link className="nav-link" href="/customers">Customers</Link></li>
                      )}

                      {pageData?.["Suppliers"]?.active && (
                        <li><Link className="nav-link" href="/suppliers">Suppliers</Link></li>
                      )}

                      {pageData?.["Careers"]?.active && (
                        <li><Link className="nav-link" href="/careers">Careers</Link></li>
                      )}

                      {pageData?.["Complaints & Feedback"]?.active && (
                        <li>
                          <Link className="nav-link" href="/complaints-and-feedback">
                            Complaints & Feedback
                          </Link>
                        </li>
                      )}
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
