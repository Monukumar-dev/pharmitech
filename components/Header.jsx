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
  const isHome = pathname === "/";

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 150);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchTurnkeyMenu = async () => {
      const res = await fetch(`${base_url}/api/category-products`);
      const data = await res.json();
      if (data?.status) setTurnkeyData(data.data);
    };
    fetchTurnkeyMenu();
  }, [base_url]);

  useEffect(() => {
    const fetchPageMenuData = async () => {
      const res = await fetch(`${base_url}/api/pages/page-meta`);
      const data = await res.json();
      if (data?.success) setPageData(data.data);
    };
    fetchPageMenuData();
  }, [base_url]);

  const handleClick = (e) => {
    if (pathname === "/") {
      e.preventDefault();
      window.location.reload();
    }
  };

  return (
    <header className={`main-header active-sticky-header ${menuOpen ? "menu-open" : ""}`}>
      <div className={`header-sticky ${!isHome ? "bg-section dark-section" : ""} ${scrolled ? "active" : ""}`}>

        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid">

            {/* Logo */}
            <Link className="navbar-brand" href="/" onClick={handleClick}>
              <Image src="/images/logo.png" alt="Logo" width={180} height={60} priority />
            </Link>

            {/* ✅ MOBILE TOGGLE ONLY */}
            <div
              className={`navbar-toggle d-lg-none ${menuOpen ? "active" : ""}`}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span></span><span></span><span></span>
            </div>

            {/* ✅ DESKTOP MENU (EXACT ORIGINAL — DO NOT TOUCH) */}
            <div className="navbar-collapse main-menu d-none d-lg-block">
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

                  {/* 🔥 ORIGINAL TURNKEY (UNCHANGED) */}
                  {turnkeyData && (
                    <li className="nav-item submenu">
                      <a className="nav-link">{turnkeyData.name}</a>

                      <ul>
                        {turnkeyData.categories.map((category) => (
                          <li key={category.id} className="nav-item submenu">

                            <span className="nav-link">{category.name}</span>

                            <ul>

                              {category.subcategories.map((sub) => (
                                <li key={sub.id} className="nav-item submenu">

                                  <span className="nav-link">{sub.name}</span>

                                  {sub.products?.length > 0 && (
                                    <ul>
                                      {sub.products.map((product) => (
                                        <li key={product.product_id}>
                                          <Link className="nav-link" href={`/products/${product.slug}`}>
                                            {product.name}
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  )}

                                </li>
                              ))}

                              {category.products?.map((product) => (
                                <li key={product.product_id}>
                                  <Link className="nav-link" href={`/products/${product.slug}`}>
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
                      {pageData?.["Clientele"]?.active && <li>
                        <Link className="nav-link" href="/clientele">Clientele</Link></li>}
                      {pageData?.["Blogs"]?.active && <li>
                        <Link className="nav-link" href="/blogs">Blogs</Link></li>}
                      {pageData?.["Events"]?.active && <li>
                        <Link className="nav-link" href="/events">Events</Link></li>}
                      {pageData?.["Projects Gallery"]?.active && <li>
                        <Link className="nav-link" href="/gallery">Projects Gallery</Link></li>}
                    </ul>
                  </li>

                  {/* Connect (ALL 4 — ORIGINAL) */}
                  <li className="nav-item submenu">
                    <a className="nav-link">Connect</a>
                    <ul>
                      {pageData?.["Customers"]?.active && <li><Link className="nav-link" href="/customers">Customers</Link></li>}
                      {pageData?.["Suppliers"]?.active && <li><Link className="nav-link" href="/suppliers">Suppliers</Link></li>}
                      {pageData?.["Careers"]?.active && <li><Link className="nav-link" href="/careers">Careers</Link></li>}
                      {pageData?.["Complaints & Feedback"]?.active && (
                        <li><Link className="nav-link" href="/complaints-and-feedback">Complaints & Feedback</Link></li>
                      )}
                    </ul>
                  </li>

                </ul>
              </div>

              <div className="header-btn">
                <Button href="/customers" variant="primary">
                  Request a Quote
                </Button>
              </div>
            </div>

          </div>
        </nav>

        {/* ✅ MOBILE MENU (SEPARATE — NO IMPACT ON DESKTOP) */}
        {menuOpen && (
  <div className="mobile-menu d-lg-none">
    <div className="mobile-menu-inner">

      {/* Home */}
      <Link className="mobile-link" href="/">Home</Link>

      {pageData?.["About Us"]?.active && (
        <Link className="mobile-link" href="/about-us">About Us</Link>
      )}

      {/* 🔥 TURNKEY (FULL FIX) */}
      {turnkeyData && (
        <div className="mobile-item">

          <button
            className="mobile-toggle"
            data-bs-toggle="collapse"
            data-bs-target="#mTurnkey"
          >
            {turnkeyData.name} <span>›</span>
          </button>

          <div className="collapse" id="mTurnkey">
            <div className="mobile-submenu">

              {turnkeyData.categories.map((cat) => (
                <div key={cat.id}>

                  {/* Category */}
                  <button
                    className="mobile-toggle small"
                    data-bs-toggle="collapse"
                    data-bs-target={`#mcat-${cat.id}`}
                  >
                    {cat.name} <span>›</span>
                  </button>

                  <div className="collapse" id={`mcat-${cat.id}`}>
                    <div className="mobile-submenu">

                      {/* Subcategories */}
                      {cat.subcategories.map((sub) => (
                        <div key={sub.id}>

                          <button
                            className="mobile-toggle small"
                            data-bs-toggle="collapse"
                            data-bs-target={`#msub-${sub.id}`}
                          >
                            {sub.name} <span>›</span>
                          </button>

                          <div className="collapse" id={`msub-${sub.id}`}>
                            <div className="mobile-submenu">

                              {/* Products */}
                              {sub.products?.map((p) => (
                                <Link
                                  key={p.product_id}
                                  href={`/products/${p.slug}`}
                                  className="mobile-link small"
                                >
                                  {p.name}
                                </Link>
                              ))}

                            </div>
                          </div>

                        </div>
                      ))}

                      {/* Direct Products */}
                      {cat.products?.map((p) => (
                        <Link
                          key={p.product_id}
                          href={`/products/${p.slug}`}
                          className="mobile-link small"
                        >
                          {p.name}
                        </Link>
                      ))}

                    </div>
                  </div>

                </div>
              ))}

            </div>
          </div>

        </div>
      )}

      {/* Insights */}
      <div className="mobile-item">
        <button className="mobile-toggle" data-bs-toggle="collapse" data-bs-target="#mInsights">
          Insights <span>›</span>
        </button>

        <div className="collapse" id="mInsights">
          <div className="mobile-submenu">
            {pageData?.["Clientele"]?.active && <Link href="/clientele" className="mobile-link">Clientele</Link>}
            {pageData?.["Blogs"]?.active && <Link href="/blogs" className="mobile-link">Blogs</Link>}
            {pageData?.["Events"]?.active && <Link href="/events" className="mobile-link">Events</Link>}
            {pageData?.["Projects Gallery"]?.active && <Link href="/gallery" className="mobile-link">Projects Gallery</Link>}
          </div>
        </div>
      </div>

      {/* Connect */}
      <div className="mobile-item">
        <button className="mobile-toggle" data-bs-toggle="collapse" data-bs-target="#mConnect">
          Connect <span>›</span>
        </button>

        <div className="collapse" id="mConnect">
          <div className="mobile-submenu">
            {pageData?.["Customers"]?.active && <Link href="/customers" className="mobile-link">Customers</Link>}
            {pageData?.["Suppliers"]?.active && <Link href="/suppliers" className="mobile-link">Suppliers</Link>}
            {pageData?.["Careers"]?.active && <Link href="/careers" className="mobile-link">Careers</Link>}
            {pageData?.["Complaints & Feedback"]?.active && (
              <Link href="/complaints-and-feedback" className="mobile-link">
                Complaints & Feedback
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-3">
        <Button href="/customers" variant="primary" className="w-100">
          Request a Quote
        </Button>
      </div>

    </div>
  </div>
)}

      </div>
    </header>
  )
}