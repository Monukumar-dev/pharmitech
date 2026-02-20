'use client'

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import Button from "@/components/UI/Button/Button";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname()


  useEffect(() => {
  const handleScroll = () => {
    setScrolled(window.scrollY > 150);
  };
  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

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
                  <li className="nav-item submenu">
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
                  </li>

                  {/* Insights */}
                  <li className="nav-item submenu">
                    <a className="nav-link">Insights</a>
                    <ul>
                      <li><Link className="nav-link" href="/case-studies">Case Studies</Link></li>
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
                <Button href="/contact" variant="primary">
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
