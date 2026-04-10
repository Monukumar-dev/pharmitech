import ClientPage from "./ClientPage";
import { getMetaData } from "@/lib/getMeta";

export async function generateMetadata() {
  const meta = await getMetaData("Events"); 
  return {
    title: meta?.meta_title,
    description: meta?.meta_description,
    keywords: meta?.meta_keywords || "Pharmintech",
    alternates: {
      canonical: meta?.canonical_url || "https://pharmintech.com/events",
    },
  };
}

export default function Page() {
  return <ClientPage />;
}