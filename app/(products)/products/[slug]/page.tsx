import React from 'react';
import { getProductInfo } from './actions'; // Assuming actions file exports getProductInfo

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
  const formattedPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price); // Format price

  return (
    <div className="product-details">
      <img src={imageUrls[0]} alt={title} className="product-image" />
      <div className="product-info">
        <h2>{title}</h2>

        <p className="price">{formattedPrice}</p>
        <p className="type">Category: {type}</p>
        <p className="location">Location: {governorate}</p>
        <p className="seller">Seller: {full_name}</p>
        <p className="created-at">Created: {formattedDate}</p>
      </div>
    </div>
  );
}

export default async function Page({ params }: { params: { slug: string } }) {
  const product = await getProductInfo(params.slug);

  return <ProductDetails product={product} />;
}