import { getSelfProducts } from "@/app/actions";

export default async function UserProducts() {
  const products = await getSelfProducts();

  return (
    <pre className="text-xs font-mono p-3 rounded border max-h-32 overflow-auto">
      {JSON.stringify(products, null, 2)}
    </pre>
  );
}
