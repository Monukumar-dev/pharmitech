import { getProduct } from "@/lib/getProduct";
import ClientPage from "./ClientPage";

export async function generateMetadata({ params }) {
  const { slug } = await params; 

  const data = await getProduct(slug);
  const meta = data?.data?.seo;

  const baseUrl = "https://pharmintech.com";
  const url = `${baseUrl}/products/${slug}`;

  return {
    title: meta?.meta_title || "Pharmintech",
    description: meta?.meta_description || "",
    keywords: meta?.meta_keywords || "Pharmintech",
    alternates: {
      canonical: meta?.canonical_url || url,
    },
  };
}

export default async function Page({ params }) {
  return <ClientPage />;
}