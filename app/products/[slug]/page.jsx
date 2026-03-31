import { getProduct } from "@/lib/getProduct";
import ClientPage from "./ClientPage";

export async function generateMetadata({ params }) {
  const { slug } = await params; // ✅ FIX

  const data = await getProduct(slug);
  console.log(data);
  const meta = data?.data?.seo;

  return {
    title: meta?.meta_title || "Pharmintech",
    description: meta?.meta_description || "",
    keywords: meta?.meta_keywords || "Pharmintech",
  };
}

export default async function Page({ params }) {
  return <ClientPage />;
}