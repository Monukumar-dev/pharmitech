"use client";

import Link from "next/link";
import {truncateToLetters} from "@/utils/helper";

export default function BlogCard({ blog, index = 0 }) {
  if (!blog) return null;

  return (
    <div
      className="post-item-silver wow fadeInUp"
      data-wow-delay={`${index * 0.2}s`}
    >
      <div className="post-featured-image-silver">
        <Link href={`/blogs/${blog.slug}`} data-cursor-text="View">
          <figure className="image-anime">
            <img
              src={blog.featured_image_url}
              alt={blog.title}
            />
          </figure>
        </Link>

        {blog.subtitle && (
          <div className="post-item-tags-silver">
            <Link href="#" className="text-truncate-2">
              {truncateToLetters(blog.subtitle)}
            </Link>
          </div>
        )}
      </div>

      <div className="post-item-silver-body">
        <div className="post-item-content-silver">
          <h2>
            <Link
              href={`/blogs/${blog.slug}`}
              className="text-truncate-2"
            >
              {blog.title}
            </Link>
          </h2>
        </div>

        <div className="post-item-silver-btn">
          <Link
            href={`/blogs/${blog.slug}`}
            className="readmore-btn"
          >
            read more
          </Link>
        </div>
      </div>
    </div>
  );
}
