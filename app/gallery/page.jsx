import Gallery from "./Gallery";
import ProjectGallery from "./ProjectGallery";


async function getGallery() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/project-gallery`,
    { cache: "no-store" }
  );

  const data = await res.json();
  return data?.data || [];
}

export default async function Page() {
  const galleryData = await getGallery();

  return (
    <div className="py-4">
      <Gallery apiData={galleryData} />
    </div>
  );
}
