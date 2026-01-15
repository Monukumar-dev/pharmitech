"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "@/store/action/blogActions";

import TextEffect from "@/components/TextEffect";


export default function OurBlog() {
  const dispatch = useDispatch();
  const { blogs } = useSelector((state) => state.blog);

  useEffect(() => {
    if (!blogs || blogs.length === 0) {
      dispatch(fetchBlogs());
    }
  }, [dispatch, blogs]);

  return (
    <>
      <div className="our-blog-silver pb-0">
        <div className="container">
          <div className="row section-row">
            <div className="col-xl-12">
              <div className="section-title section-title-center">
                <h3 className="wow fadeInUp">Latest Blogs</h3>
                <TextEffect text="Exploring Advanced Cleanroom Solutions Through Expert Insights" />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="post-item-list-silver">

              {blogs.slice(0, 4).map((item, index) => (
                <div
                  key={item.id}
                  className="post-item-silver wow fadeInUp"
                  data-wow-delay={`${index * 0.2}s`}
                >
                  <div className="post-featured-image-silver">
                    <Link href={`/blogs/${item.slug}`} data-cursor-text="View">
                      <figure className="image-anime">
                        <img
                          src={item.featured_image_url}
                          alt={item.title}
                        />
                      </figure>
                    </Link>

                    {item.subtitle && (
                      <div className="post-item-tags-silver">
                        <Link href="#">{item.subtitle}</Link>
                      </div>
                    )}
                  </div>

                  <div className="post-item-silver-body">
                    <div className="post-item-content-silver">
                      <h2>
                        <Link href={`/blogs/${item.slug}`} className="text-truncate-2">
                          {item.title}
                        </Link>
                      </h2>
                    </div>

                    <div className="post-item-silver-btn">
                      <Link
                        href={`/blogs/${item.slug}`}
                        className="readmore-btn"
                      >
                        read more
                      </Link>
                    </div>
                  </div>
                </div>
              ))}

            </div>

            <div className="col-lg-12 mt-4">
              <div
                className="section-footer-text wow fadeInUp"
                data-wow-delay="0.8s"
              >
                <Link href="/blogs" className="btn-default-silver">
                  View All
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Our Blog Section End */}
    </>
  );
}
