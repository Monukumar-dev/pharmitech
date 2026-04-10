import ClientPage from "./ClientPage";
import { getMetaData } from "@/lib/getMeta";

export async function generateMetadata() {
  const meta = await getMetaData("About Us");
  return {
    title: meta?.meta_title,
    description: meta?.meta_description,
    keywords: meta?.meta_keywords,
    alternates: {
      canonical: meta?.canonical_url || "https://pharmintech.com/about-us",
    },
  };
}

export default function AboutPage() {
  return <ClientPage />;
}