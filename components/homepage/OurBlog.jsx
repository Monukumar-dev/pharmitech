"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHomepageBlogs } from "@/store/action/blogActions";

import TextEffect from "@/components/TextEffect";
import BlogCard from "@/components/BlogCard";
import Button from "../UI/Button/Button";

export default function OurBlog() {
  const dispatch = useDispatch();
  const { homepageBlogs } = useSelector((state) => state.blog);

  useEffect(() => {
    if (!homepageBlogs?.length) {
      dispatch(fetchHomepageBlogs({ page: 1, per_page: 4 }));
    }
  }, [dispatch, homepageBlogs]);


  return (
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
            {homepageBlogs?.map((item, index) => (
              <BlogCard
                key={item.id}
                blog={item}
                index={index}
              />
            ))}
          </div>

          <div className="col-lg-12 mt-4">
            <div
              className="section-footer-text wow fadeInUp"
              data-wow-delay="0.8s"
            >

              <Button href="/blogs" variant="primary">Back to Home</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
