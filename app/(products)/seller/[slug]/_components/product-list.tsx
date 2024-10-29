import ProductCard, { ProductCardProps } from "./product-card";

interface ProductListProps {
  products: ProductCardProps[];
}

export default function ProductList({ products }: ProductListProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 container">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}
