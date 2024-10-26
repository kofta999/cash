import ProductCard, { ProductCardProps } from "./product-card";

interface ProductListProps {
  products: ProductCardProps[];
}

export default function ProductList({ products }: ProductListProps) {
  return (
    <div>
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}
