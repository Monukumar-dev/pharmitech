import * as url from "@/utils/Url";
export async function getBlog(slug) {
  try {
    const res = await fetch(`${url.BASE_URL}/api/blogs/${slug}`,
      {
        next: { revalidate: 3600 },
      }
    );

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Blog fetch error:", error);
    return null;
  }
}