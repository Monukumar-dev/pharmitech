"use client";

import { useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "@/store/slices/productSlice";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Preloader from "@/components/Preloader";
import Sidebar from "./Sidebar";

gsap.registerPlugin(ScrollTrigger);

export default function ProductPage() {
  const container = useRef(null);
  const sidebar = useRef(null);
  const scrollTriggerRef = useRef(null);

  const { slug } = useParams();
  const dispatch = useDispatch();
  const { product, loading } = useSelector((state) => state.product);

  useEffect(() => {
    if (slug) dispatch(fetchProduct(slug));
  }, [slug, dispatch]);

  // Refresh ScrollTrigger after product data loads
  useEffect(() => {
    if (!product) return;
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
    return () => clearTimeout(timeout);
  }, [product]);

  // Handle resize / orientation change
  useEffect(() => {
    const handleResize = () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useGSAP(
    () => {
      if (!sidebar.current || !container.current) return;

      // Kill previous instance
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }

      // Skip pinning on mobile/tablet (below Bootstrap lg = 992px)
      if (window.innerWidth < 992) return;

      scrollTriggerRef.current = ScrollTrigger.create({
        trigger: container.current,
        start: "top top+=80",
        end: "bottom bottom+=700",
        pin: sidebar.current,
        pinSpacing: false,
        invalidateOnRefresh: true,
        //markers: true, 
      });

      return () => {
        if (scrollTriggerRef.current) {
          scrollTriggerRef.current.kill();
          scrollTriggerRef.current = null;
        }
      };
    },
    { scope: container, dependencies: [product] }
  );

  const specification = product?.feature;

  const getListItems = (html) => {
    if (!html) return [];
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    return [...doc.querySelectorAll("li")].map((li) => li.textContent);
  };

  const listItems = getListItems(specification);
  const icons = ["🏗️", "📐", "🧱", "↔️", "📏", "✨", "🔗", "🔩", "⚖️", "🌡️"];

  if (loading) return <Preloader opacity={0.95} />
  if (!product) {
      return (
        <div className="text-center py-5 text-danger">
          Product not found
        </div>
      );
  }

  function renderSingleProduct() {
    return (
      <div className="service-single-content">
        <div className="service-entry">
          <section id="dc" className="design-section">
            <div className="product-desc pt-0">
              <div className="page-wrap px-0">
                <div className="dc-label">{product.category_name}</div>
                <h1 className="dc-prod-title">{product.name}</h1>

                {product.image_url && (
                   <div className="page-single-image">
                  <figure>
                    <img src={product.image_url} alt={product.name} />
                  </figure>
                </div>
                )}
                <div
                  className="dc-prod-desc"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              </div>
            </div>
          </section>

          {product.feature && (
            <div className="mb-3">
              <h4 className="mb-3">Features</h4>
              <div className="productFeatures" dangerouslySetInnerHTML={{ __html: product.feature }} />
            </div>
          )}

          {product.specification && (
            <div className="page-wrap mt-5">
              <h4 className="dc-feat-title mb-4">Specifications</h4>
              <div
                className="Specifications"
                dangerouslySetInnerHTML={{ __html: product.specification }}
              />
            </div>
          )}
        </div>
      </div>
    );
  }

  function renderMultipleProduct() {
    return (
      <div className="service-single-content">
        <div className="service-entry mb-0">
          <div className="product-desc pt-0">
            <div className="page-wrap px-0">
              <div className="dc-label">{product.category_name}</div>
              <h1 className="dc-prod-title">{product.name}</h1>
              <div
                className="dc-prod-desc"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </div>
          </div>
        </div>

        {product.sub_products?.map((item) => (
          <div
            key={item.id}
            className="mb-4 border overflow-hidden rounded-4 subProductsItems"
          >

            {item.image_url && (
              <div className="mb-4 border-bottom">
                <figure>
                  <img className="subProductsItemsImg" src={item.image_url} alt={item.name}/>
                </figure>
              </div>
            )}
            

            <div className="service-entry px-4 mb-0 flex-1">
              <div className="mt-4">
                <h4>{item.name}</h4>
                <div
                  className="dc-prod-desc mb-3"
                  dangerouslySetInnerHTML={{ __html: item.description }}
                />
              </div>

              {item.feature && (
                <div className="mb-3">
                  <h4 className="mb-3">Features</h4>
                  <div className="productFeatures" dangerouslySetInnerHTML={{ __html: item.feature }} />
                </div>
              )}

              {item.specification && (
                <div className="mb-3">
                  <h4 className="mb-3">Specifications</h4>
                  <div
                    className="Specifications"
                    dangerouslySetInnerHTML={{ __html: item.specification }}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="page-service-single bgPattern1">
      <div className="container" ref={container}>
        <div className="row flex-column-reverse flex-lg-row">
          <div className="col-lg-4">
            <div ref={sidebar}>
              <Sidebar data={product?.subcategory_products} />
            </div>
          </div>
          <div className="col-lg-8">
            {product.product_type === "multiple"
              ? renderMultipleProduct()
              : renderSingleProduct()}
          </div>
        </div>
      </div>
    </div>
  );
}