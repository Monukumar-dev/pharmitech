"use client";
import Link from "next/link"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchBanners, fetchHomePageData } from "@/store/action/homeActions";
import { fetchHomepageBlogs } from "@/store/action/blogActions";
import { fetchClients } from "@/store/slices/clientSlice";
import { fetchTestimonials } from "@/store/slices/testimonialSlice";

import HomepageBanner from "@/components/homepage/HomepageBanner"
import CoreServices from "@/components/homepage/CoreServices"
import TechSection from "@/components/homepage/TechSection"
import PharmintechAdvantage from "@/components/homepage/PharmintechAdvantage"
import OurServices from "@/components/homepage/OurServices"
import WhatWeDoSilver from "@/components/homepage/WhatWeDoSilver"
import IntroVideoBoxSilver from "@/components/homepage/IntroVideoBoxSilver"
import OurBlog from "@/components/homepage/OurBlog"
import OurTestimonials from "@/components/homepage/OurTestimonials";
import OurClient from "@/components/OurClient";
import HomeConsultationPlanner from "@/components/homepage/HomeConsultationPlanner";
import PdfDownloadSection from "@/components/PdfDownloadSection"
import OurFaqs from "@/components/OurFaqs";
import Preloader  from "@/components/Preloader";
import { fetchAboutPage } from "@/store/slices/aboutSlice";


export default function Home() {

  const dispatch = useDispatch();
  const { loading, error, homeData } = useSelector((state) => state.home);
  const { aboutData } = useSelector((state) => state.about);
 // const { list:testimonialsList } = useSelector((state) => state.testimonials);
  const clients = useSelector((state) => state.client.clients);

  useEffect(() => {
    dispatch(fetchHomePageData());
    dispatch(fetchBanners());
  }, [dispatch]);

  useEffect(() => {
    if (!clients.length) {
      dispatch(fetchClients());
    }
  }, [dispatch, clients]);

  useEffect(() => {
  if (!aboutData.business_scope.items.length) {
    dispatch(fetchAboutPage());
  }
}, [dispatch, aboutData.business_scope.items.length]);


//   useEffect(() => {
//     if (!testimonialsList.length) {
//        dispatch(fetchTestimonials());
//     }
// }, [dispatch, testimonialsList]);

  if (loading) return <Preloader />;
  if (error) return <div className="text-danger">{error}</div>;

  return (
    <>
      <HomepageBanner />
      <section className="our-approach">
      <div className="container">
        <div className="row section-row mb-0 align-items-center">

          {/* Content */}
          <div className="col-xl-12">
            <div className="section-content-btn wow fadeInUp">
              <div className="section-title-content">
                  {homeData?.aboutus?.paragraphs.map((item, i) => (
                    <p key={i} >
                      {item}
                    </p>
                  ))
                  }
              </div>

              {/*
              <div className="section-btn wow fadeInUp" data-wow-delay="0.8s">
                <Link href="/about" className="btn-default">
                  Know More
                </Link>
              </div>
              */}
            </div>
          </div>

        </div>
      </div>
      </section>
      <CoreServices />
      
      <PharmintechAdvantage />
      <TechSection />
      {/*  */}
      {/* <OurServices /> */}
      {/* <WhatWeDoSilver /> */}
      {/* <IntroVideoBoxSilver /> */}

      {/* Our Project Section Start */}
      {/* <div className="our-project-silver">
        <div className="container">
          <div className="row section-row">
            <div className="col-lg-12">
              <div className="section-title section-title-center">
                <h3 className="wow fadeInUp">Our Project</h3>
                <TextEffect text=" Explore our completed projects that redefine modern workspaces" />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="project-item-silver wow fadeInUp">
                <div className="project-image-silver">
                  <div className="project-img-silver">
                    <Link href="#" data-cursor-text="View">
                      <figure className="image-anime">
                        <img src="images/project1.jpg" alt="" />
                      </figure>
                    </Link>
                  </div>
                  <div className="project-btn-silver">
                    <Link href="#">
                      <img src="images/arrow-primary.svg" alt="" />
                    </Link>
                  </div>
                </div>
                <div className="project-content-silver">
                  <p>Turnkey Cleanroom Solution</p>
                  <h3>
                    <Link href="#">
                      Pharmaceutical Cleanroom Facility – Mumbai, India
                    </Link>
                  </h3>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div
                className="project-item-silver wow fadeInUp"
                data-wow-delay="0.2s"
              >
                <div className="project-image-silver">
                  <div className="project-img-silver">
                    <Link href="#" data-cursor-text="View">
                      <figure className="image-anime">
                        <img src="images/project2.jpg" alt="" />
                      </figure>
                    </Link>
                  </div>
                  <div className="project-btn-silver">
                    <Link href="#">
                      <img src="images/arrow-primary.svg" alt="" />
                    </Link>
                  </div>
                </div>
                <div className="project-content-silver">
                  <p>Design, Supply & Installation</p>
                  <h3>
                    <Link href="#">
                      Biotechnology Cleanroom Project – Export Supply
                    </Link>
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      {/* Our Project Section End */}

      {/* How It Work Section Start */}
      {/* <div className="how-it-work-silver dark-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="how-work-content-silver">
                <div className="section-title">
                  <h3 className="wow fadeInUp">How It Work</h3>
                  <TextEffect text={homeData?.how_it_work?.title_main} />
                  {homeData?.how_it_work?.paragraphs.map((items, i)=>(
                    <p key={i} className="wow fadeInUp" data-wow-delay={`${i * 0.2}s`}>{items}</p>
                  ))}
                </div>

                <div className="how-work-body-silver">
                  <div className="satisfy-client-images-silver">
                  {homeData?.how_it_work?.client_images.map((items, i)=>(
                    <div key={i} className="satisfy-client-image-silver">
                      <figure className="image-anime">
                        <img src={items} alt="" />
                      </figure>
                    </div>
                  ))}
                  <div className="satisfy-client-image-silver add-more">
                    <i className="fa-solid fa-plus"></i>
                  </div>
                  </div>
                  <div className="how-work-counter-list-silver">
                    {homeData?.how_it_work?.counters.map((items, i) => (
                      <div key={i} className="how-work-counter-item-silver">
                        <h2>
                          <span className="counter">{items.value}</span>+
                        </h2>
                        <p>{items.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="how-work-step-list-silver">
                    {homeData?.how_it_work?.steps.map((items, i) => (
                      <div key={i} className="work-step-item-silver wow fadeInUp">
                        <div className="work-step-item-header-silver">
                          <div className="work-step-number-silver">
                            <h4>{items.step}</h4>
                          </div>
                          <div className="work-step-title-silver">
                            <h3>{items.title}</h3>
                          </div>
                        </div>
                        <div className="work-step-item-body-silver">
                          <p>{items.description}</p>
                        </div>
                      </div>
                    ))}           
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <OurBlog />

      {/* <OurTestimonials /> */}
      <div className="our-faqs py-0">
        <div className="container">
          <div className="col-lg-12">
            <div className="company-supports-slider-box">
              <OurClient />
            </div>
          </div>
        </div>
      </div>
      <HomeConsultationPlanner />
      <PdfDownloadSection />
      <div className="pb-5 bgPattern1">
        <OurFaqs data={aboutData?.faqs}/>
      </div>

    </>
  )
}
