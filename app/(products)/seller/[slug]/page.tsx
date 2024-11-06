import { getSellerInfo } from "./actions";
import ProductList from "@/components/product-list";
import SellerProfile from "./_components/seller-profile";

export default async function Page({ params }: { params: { slug: string } }) {
  // TODO: Use something other than the UID for slugs
  console.log(params.slug);
  const { sellerProducts, sellerProfile } = await getSellerInfo(params.slug);

  if (!sellerProfile) {
    // TODO: Throw 404 here
    return <h1>The requested seller is not found</h1>;
  }

  return (
    <div>
      <SellerProfile name="PLACEHOLDER" {...sellerProfile} />
      <ProductList products={sellerProducts} />
    </div>
  );
}
