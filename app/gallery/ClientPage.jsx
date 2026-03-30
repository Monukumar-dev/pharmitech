"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGallery } from "@/store/slices/gallerySlice";

import Preloader from "@/components/Preloader";
import Gallery from "./Gallery";

export default function Page() {
  const dispatch = useDispatch();
  const { gallery, loading, error } = useSelector((state) => state.gallery);

  useEffect(() => {
    if (!gallery.length) {
      dispatch(fetchGallery());
    }
  }, [dispatch, gallery.length]);


 if (loading) return <Preloader opacity={0.95} />
 if (error) {
    return (
      <div className="text-center py-5 text-danger">
        {error}
      </div>
    );
}

  return (
    <div className="py-4 bgPattern1">
      <Gallery apiData={gallery} />
    </div>
  );
}