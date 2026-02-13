"use client";

import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

import PageHeader from "../../components/PageHeader";

export default function ProjectGallery({ galleryData }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [index, setIndex] = useState(0);

  const openCategoryGallery = (project) => {
    const images = project.pictures_list.map((img) => ({
      src: img.url,
    }));

    setSelectedImages(images);
    setIndex(0);
    setLightboxOpen(true);
  };

  return (
    <>
    <PageHeader
        title="Projects Gallery"
        backgroundImage="/images/hero-bg-image-silver111.jpg"
        breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Projects Gallery" }
        ]}
    />
    <div className="page-gallery">
        <div className="container">
            <div className="row">
            {galleryData.map((project) => {
                const coverImage = project.pictures_list[0];
                return (
                    <div className="col-md-6 mb-4" key={project.id}>
                        <div className="category-card shadow rounded overflow-hidden">
                            <div
                                className="position-relative cursor-pointer image-anime"
                                onClick={() => openCategoryGallery(project)}
                                data-cursor-text="View"
                            >
                                <img
                                    src={coverImage?.url}
                                    alt={project.title}
                                    className="img-fluid w-100"
                                    style={{ height: "360px", objectFit: "cover" }}
                                />

                                <div className="image-count">
                                    {project.pictures_list.length} Images
                                </div>
                            </div>
                            <div className="p-3 text-center bg-white">
                                <h6
                                    className="mb-0 cursor-pointer"
                                    onClick={() => openCategoryGallery(project)}
                                >
                                    {project.title}
                                </h6>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
        </div>
    </div>
      
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={selectedImages}
        index={index}
        plugins={[Zoom, Thumbnails]}
      />
    </>
  );
}
