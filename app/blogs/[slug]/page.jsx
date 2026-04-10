import ClientPage from "./ClientPage";
import { getBlog } from "@/lib/getBlog";

export async function generateMetadata({ params }) {
  const { slug } = await params; 

  const res = await getBlog(slug);
  const blog = res?.data;
  const seo = blog?.seo;
  const canonical = blog?.canonical_url;

  const baseUrl = "https://pharmintech.com";
  const url = `${baseUrl}/blogs/${slug}`;

  return {
    title: seo?.meta_title || blog?.title || "Pharmitech",
    description: seo?.meta_description || blog?.title || "Read latest insights from Pharmitech blogs",
    keywords: seo?.meta_keywords || "",

    alternates: {
      canonical: seo?.canonical || url,
    },

    openGraph: {
      title: seo?.meta_title || blog?.title,
      description: seo?.meta_description || "",
      images: [blog?.featured_image_url],
    },
  };
}

export default async function Page({ params }) {
  return <ClientPage />;
}