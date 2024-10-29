import { getSellerInfo } from "./actions";
import ProductList from "@/components/product-list";

export default async function Page({ params }: { params: { slug: string } }) {
  // TODO: Use something other than the UID for slugs
  console.log(params.slug);
  const userProducts = await getSellerInfo(params.slug);

  return (
    <div>
      <ProductList
        products={userProducts.map(({ id, title, imageUrls }) => ({
          id,
          title,
          thumbnailUrl: imageUrls[0],
        }))}
      />
    </div>
  );
}
