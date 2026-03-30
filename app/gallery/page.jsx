import ClientPage from "./ClientPage";
import { getMetaData } from "@/lib/getMeta";

export async function generateMetadata() {
  const meta = await getMetaData("Projects Gallery"); 
  return {
    title: meta?.meta_title,
    description: meta?.meta_description,
  };
}

export default function Page() {
  return <ClientPage />;
}