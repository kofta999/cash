import { getProductInfo } from "./actions";
import { ProductDetails } from "./ProductDetails";

export default async function Page({ params }: { params: { slug: string } }) {
  const product = await getProductInfo(params.slug);

  if (!product) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <h1 className="text-2xl font-semibold">
          The requested product is not found
        </h1>
      </div>
    );
  }

  return <ProductDetails product={product} />;
}
