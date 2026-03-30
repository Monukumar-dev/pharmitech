import * as url from "@/utils/Url";

export async function getMetaData(pageName) {
  try {
    const res = await fetch(`${url.BASE_URL}/api/pages/page-meta`, {
      cache: "no-store", // always fresh (important)
    });

    const json = await res.json();

    if (!json.success) return null;

    return json.data[pageName] || null;
  } catch (error) {
    console.error("Meta fetch error:", error);
    return null;
  }
}