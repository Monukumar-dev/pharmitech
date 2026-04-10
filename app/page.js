import ClientPage from "./ClientPage";
import { getMetaData } from "@/lib/getMeta";

export async function generateMetadata() {
  const meta = await getMetaData("Homepage"); 
  return {
    title: meta?.meta_title,
    description: meta?.meta_description,
    keywords: meta?.meta_keywords,
     alternates: {
      canonical: meta?.canonical_url || "https://pharmintech.com/sdfklsd",
    },
  };
}

export default function Page() {
  return <ClientPage />;
}