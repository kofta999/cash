import React from "react";
import { getProductInfo } from "./actions";
import Link from "next/link";
import Image from "next/image";

interface Product {
  id: string;
  title: string;
  description: string;
  createdAt: Date; // ISO 8601 date string
  updatedAt: Date; // ISO 8601 date string
  userId: string;
  imageUrls: string[];
  price: number;
  type: string;
  governorate: string;
  users: {
    id: string;
    full_name: string | null;
    phone_number: string | null;
  };
}

function ProductDetails({ product }: { product: Product }) {
  const {
    id,
    title,
    description,
    createdAt,
    updatedAt,
    userId,
    imageUrls,
    price,
    type,
    governorate,
    users,
  } = product;

  const formattedDate = new Date(createdAt).toLocaleDateString(); // Format created date
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EGP",
  }).format(price);

  {
    /* Phone number should be added in the form, and also there should be a way to hide it behind a button to prevent bot scraping or smth idk */
  }
  console.log(users.phone_number);

  return (
    <div className="product-details flex flex-col md:flex-row mt-20">
      <div className="md:w-1/2">
        {/*  Need some sort of carousel here, GL Frontend boy */}
        {imageUrls.map((url, i) => (
          <Image
            key={i}
            src={url}
            alt={title}
            width={500}
            height={100}
            className="w-full h-auto max-w-sm"
          />
        ))}
      </div>
      <div className="md:w-1/2 md:ml-8">
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        <p className="text-lg mb-2">{description}</p>
        <div className="flex items-center mb-4">
          <p className="text-xl font-bold mr-2">{formattedPrice}</p>
          {/* Add any relevant badges or labels here */}
        </div>
        <p className="text-gray-600 mb-2">Category: {type}</p>
        <p className="text-gray-600 mb-2">Location: {governorate}</p>
        <Link href={`/seller/${users.id}`} className="text-gray-600 mb-2">
          Seller: <span className="text-green-600">{users.full_name}</span>
        </Link>
        <p className="text-gray-600">Posted: {formattedDate}</p>
        {/* Add a "Buy Now" or "Add to Cart" button here */}
      </div>
    </div>
  );
}

export default async function Page({ params }: { params: { slug: string } }) {
  const product = await getProductInfo(params.slug);

  if (!product) {
    return <h1>The requested product is not found</h1>;
  }

  return <ProductDetails product={product} />;
}
