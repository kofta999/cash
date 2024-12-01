import React from 'react';
import { getProductInfo } from './actions'; 

interface Product {
  id: string;
  title: string;
  description: string;
  createdAt: string; // ISO 8601 date string
  updatedAt: string; // ISO 8601 date string
  userId: string;
  imageUrls: string[];
  price: number;
  type: string;
  governorate: string;
  users: {
    id: string;
    full_name: string;
  };
}
function ProductDetails({ product }: { product: Product }) {
  if (!product) {
    return <h1>The requested product is not found</h1>;
  }

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
    users: { full_name },
  } = product;

  const formattedDate = new Date(createdAt).toLocaleDateString(); // Format created date
  const formattedPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'EGP' }).format(price);
  return (
    <div className="product-details flex flex-col md:flex-row mt-20">
      <div className="md:w-1/2">
  <img src={imageUrls[0]} alt={title} className="w-full h-auto max-w-sm" />
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
        <p className="text-gray-600 mb-2">Seller: {full_name}</p>
        <p className="text-gray-600">Created: {formattedDate}</p>
        {/* Add a "Buy Now" or "Add to Cart" button here */}
      </div>
    </div>
  );
}

export default async function Page({ params }: { params: { slug: string } }) {
  const product = await getProductInfo(params.slug);

  return <ProductDetails product={product} />;
}