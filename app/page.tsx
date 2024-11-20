import ProductList from "@/components/product-list";
import React from "react";
import { getAllProducts } from "./actions";
import Image from "next/image";

const MyApp = async () => {
  const products = await getAllProducts();

  return (
    <div>
      <div className="relative h-screen bg-no-repeat bg-cover">
        <Image
          src="/homepagecover.jpg"
          alt="home page cover of two girls thrifting"
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>
      <ProductList products={products} />
    </div>
  );
};

export default MyApp;
