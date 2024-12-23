import { getSellerInfo } from "./actions";
import ProductList from "@/components/product-list";
import SellerProfile from "./_components/seller-profile";

export default async function Page(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  // TODO: Use something other than the UID for slugs
  console.log(params.slug);
  const { sellerProducts, sellerProfile } = await getSellerInfo(params.slug);

  if (!sellerProfile) {
    // TODO: Throw 404 here
    return <h1>The requested seller is not found</h1>;
  }

  return (
    <div>
      <SellerProfile {...sellerProfile} />
      <ProductList products={sellerProducts} />
    </div>
  );
}
