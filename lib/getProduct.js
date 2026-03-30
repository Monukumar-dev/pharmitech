import * as url from "@/utils/Url";

export async function getProduct(slug) {
  try {
    const res = await fetch(`${url.BASE_URL}/api/product/${slug}`,
      {
        next: { revalidate: 3600 }, // cache 1 hour
      }
    );

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Product fetch error:", error);
    return null;
  }
}