import ProductList from "@/components/product-list";
import React from "react";
import { getAllProducts } from "./actions/getAllProducts";


const MyApp = async () => {
  const products = await getAllProducts();

  return (
    <div>
      <ProductList products={products} />
    </div>
  );
};

export default MyApp;
