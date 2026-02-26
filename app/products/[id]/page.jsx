import { notFound } from "next/navigation"

const base_url = process.env.NEXT_PUBLIC_API_URL;

/* ---------- FETCH PRODUCT ---------- */
async function getProduct(id) {
  try {
    const res = await fetch(`${base_url}/api/product/${id}`, {
      next: { revalidate: 60 }, // cache 60 seconds
    });

    if (!res.ok) return null;

    const data = await res.json();

    if (!data.status) return null;

    return data.data;

  } catch (error) {
    console.error("Product Fetch Error:", error);
    return null;
  }
}

/* ---------- PAGE ---------- */
export default async function ProductDetails({ params }) {

  // 🔥 IMPORTANT for Next 15
  const { id } = await params;

  if (!id) return notFound();

  const product = await getProduct(id);

  if (!product) return notFound();

  return (
    <div className="container py-5">

      <div className="row">

        <div className="col-lg-6">
          {product.image_url && (
            <img
              src={product.image_url}
              alt={product.name}
              className="img-fluid rounded"
            />
          )}
        </div>

        <div className="col-lg-6">
          <h1>{product.name}</h1>

          <p className="text-muted">
            Category: {product.category_name}
          </p>

          <p className="text-muted">
            Subcategory: {product.subcategory_name}
          </p>
        </div>

      </div>

      {/* DESCRIPTION */}
      {product.description && (
        <div className="mt-5">
          <h3>Description</h3>
          <div
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
        </div>
      )}

      {/* FEATURES */}
      {product.feature && (
        <div className="mt-5">
          <h3>Features</h3>
          <div
            dangerouslySetInnerHTML={{ __html: product.feature }}
          />
        </div>
      )}

      {/* SPECIFICATIONS */}
      {product.specification && (
        <div className="mt-5">
          <h3>Specifications</h3>
          <div
            dangerouslySetInnerHTML={{ __html: product.specification }}
          />
        </div>
      )}

    </div>
  );
}