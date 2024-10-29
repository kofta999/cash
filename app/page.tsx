import ProductList from "@/components/product-list";
import React from "react";

const MyApp = () => {
  // action

  return (
    <div>
      <ProductList products={[{ id: "test", title: "test" }]} />
    </div>
  );
};

export default MyApp;
