import ClientPage from "./ClientPage";
import { getMetaData } from "@/lib/getMeta";

export async function generateMetadata() {
  const meta = await getMetaData("Complaints & Feedback"); 
  return {
    title: meta?.meta_title,
    description: meta?.meta_description,
    keywords: meta?.meta_keywords || "Pharmintech",
    alternates: {
      canonical: meta?.canonical_url || "https://pharmintech.com/complaints-and-feedback",
    },
  };
}

export default function Page() {
  return <ClientPage />;
}