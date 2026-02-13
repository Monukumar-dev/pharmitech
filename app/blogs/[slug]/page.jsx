"use client";

import { useEffect } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useParams } from "next/navigation";

import { useDispatch, useSelector } from "react-redux";
import { fetchBlogBySlug } from "@/store/action/blogActions";

import PageHeader from "@/components/PageHeader"
import Preloader from "@/components/Preloader";
import { formatDate } from "../../../utils/helper";

export default function BlogDetails() {

  const dispatch = useDispatch();
  const { slug } = useParams();
  const { blogDetails, loading ,error  } = useSelector((state) => state.blog);

  //console.log("blogDetails", blogDetails);
  
useEffect(() => {
  if (slug || !blogDetails ) {
    dispatch(fetchBlogBySlug(slug));
  }
}, [slug, dispatch]);

if (!loading && error) {
    notFound();
}
  

if (loading) return <Preloader opacity={0.95} />



  return (
    <>
    <PageHeader
        title={blogDetails?.title || 'Our Blog'}
        backgroundImage="/images/hero-bg-image-silver111.jpg"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "blog", href: "/blogs" },
          { label: blogDetails?.title }
        ]}
    />
    <div className="page-single-post">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="post-image">
              <figure className="image-anime">
                <img src={blogDetails?.featured_image_url} alt={blogDetails?.title} />
              </figure>
              <div className="position-absolute top-0 end-0 m-3 dark-section rounded d-flex gap-4 align-content-end p-2 text-white">
                <div><i class="fa-regular fa-user"></i> {blogDetails?.author || 'Admin'}</div>
                <div><i class="fa-regular fa-clock"></i> {formatDate(blogDetails?.publish_date) || 'NA'}</div>
              </div>

            </div>
              
            <div className="post-content">
              <div className="post-entry">
                <div dangerouslySetInnerHTML={{__html: blogDetails?.content,}} />
              </div>

              {/* <div className="post-tag-links">
                <div className="row align-items-center">
                  <div className="col-lg-8">
                    <div
                      className="post-tags wow fadeInUp"
                      data-wow-delay="0.5s"
                    >
                      <span className="tag-links">
                        Tags:
                        {blogDetails?.tags?.map((tag, index) => (
                          <Link key={index} href="#">
                            {tag}
                          </Link>
                        ))}
                      </span>
                    </div>
                  </div>

                  <div className="col-lg-4">
                    <div
                      className="post-social-sharing wow fadeInUp"
                      data-wow-delay="0.5s"
                    >
                      <ul>
                        <li>
                          <a href="#">
                            <i className="fa-brands fa-facebook-f"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fa-brands fa-linkedin-in"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fa-brands fa-instagram"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fa-brands fa-x-twitter"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div> */}

            </div>

          </div>
        </div>
      </div>
    </div>

    
     </>
  );
}
