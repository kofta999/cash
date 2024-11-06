import ProductList from "@/components/product-list";
import React from "react";
import { getAllProducts } from "./actions";
import Image from "next/image";

const MyApp = async () => {
  const products = await getAllProducts();

  return (
    <div>
      <Image
        src="/homepagecover.jpg"
        alt="home page cover of two girls thrifting"
        width={500}
        height={300}
        objectFit="cover"
        layout="responsive"
      />
      <ProductList products={products} />
    </div>
  );
};

export default MyApp;
