import ProductList from "@/components/product-list";
import React from "react";
import { getAllProducts } from "./actions";
import Image from "next/image";
import { ArrowDown } from "lucide-react";

const MyApp = async () => {
  const products = await getAllProducts();

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[70vh] w-full">
        <Image
          src="/homepagecover.jpg"
          alt="home page cover of two girls thrifting"
          fill
          priority
          className="object-cover brightness-[0.85]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/10" />
        
        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 max-w-3xl">
            Discover Unique Thrifted Treasures
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl">
            Shop sustainable fashion and give pre-loved items a second life
          </p>
          
          {/* Scroll Indicator */}
          <a 
            href="#products" 
            className="absolute bottom-8 animate-bounce text-white/90 hover:text-white transition-colors"
            aria-label="Scroll to products"
          >
            <ArrowDown className="h-8 w-8" />
          </a>
        </div>
      </div>

      {/* Products Section */}
      <section id="products" className="py-12 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Products</h2>
        <ProductList products={products} />
      </section>
    </main>
  );
};

export default MyApp;