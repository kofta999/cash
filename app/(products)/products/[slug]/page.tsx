import ProductList from "@/components/product-list";
import { getProductInfo } from "./actions";

export default async function Page({ params }: { params: { slug: string } }) {
  // TODO: Use something other than the UID for slugs
  const product = await getProductInfo(params.slug);

  if (!product) {
    // TODO: Throw 404 here
    return <h1>The requested product is not found</h1>;
  }

  return <div>{JSON.stringify(product)}</div>;
}
