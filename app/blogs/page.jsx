"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "@/store/action/blogActions";

import PageHeader from "@/components/PageHeader";
import Preloader from "@/components/Preloader";
import BlogCard from "@/components/BlogCard";

export default function Blogs() {

  const dispatch = useDispatch();
  const { blogs, loading, pagination } = useSelector((state) => state.blog);

  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 12;

  useEffect(() => {
    dispatch(fetchBlogs({ page: currentPage, per_page: blogsPerPage }));
  }, [dispatch, currentPage]);

  if (loading) return <Preloader opacity={0.95} />

  return (
    <>
      <PageHeader
        title="Our Blog"
        backgroundImage="/images/hero-bg-image-silver111.jpg"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "blog" }
        ]}
      />

      <div className="page-blog bgPattern1">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="post-item-list">
                {blogs?.map((blog, index) => (
                  <BlogCard
                    key={blog.id}
                    blog={blog}
                    index={index}
                  />
                ))}
              </div>
            </div>

            {pagination?.last_page > 1 && (
              <div className="col-lg-12">
                <div
                  className="page-pagination"
                  data-wow-delay="1.6s"
                >
                  <ul className="pagination">

                    <li>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage > 1) {
                            setCurrentPage(currentPage - 1);
                          }
                        }}
                      >
                        <i className="fa-solid fa-angle-left"></i>
                      </a>
                    </li>

                    {[...Array(pagination.last_page)].map((_, index) => (
                      <li
                        key={index}
                        className={currentPage === index + 1 ? "active" : ""}
                      >
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage(index + 1);
                          }}
                        >
                          {index + 1}
                        </a>
                      </li>
                    ))}

                    <li>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage < pagination.last_page) {
                            setCurrentPage(currentPage + 1);
                          }
                        }}
                      >
                        <i className="fa-solid fa-angle-right"></i>
                      </a>
                    </li>

                  </ul>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  )
}
