"use client";

import { placeHolderImageUrl } from "@/lib/constants";
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  thumbnailUrl?: string;
}

export default function ProductCard({
  id,
  title,
  thumbnailUrl,
  price,
}: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent Link navigation when clicking the heart
    setIsLiked(!isLiked);
  };

  return (
    <Link href={`/products/${id}`}>
      <div className="w-72 h-[400px] m-5 bg-white shadow-xl overflow-hidden hover:shadow-xl transition-shadow duration-300 relative">
        <div className="h-[250px] relative">
          <Image
            id={id}
            alt={title}
            src={thumbnailUrl || placeHolderImageUrl}
            fill
            sizes="(max-width: 288px) 100vw, 288px"
            quality={30}
            priority
            className="object-cover"
          />
        </div>
        <div className="p-4 flex flex-col justify-between h-[150px]">
          <h2 className="font-semibold text-lg line-clamp-2 mb-2">{title}</h2>
          <div className="flex justify-between items-center">
            <p className="text-lg font-bold text-primary">
              EGP {price.toLocaleString()}
            </p>
            <button
              onClick={handleLikeClick}
              className="btn btn-circle btn-sm hover:bg-pink-50"
            >
              <Heart
                className={`w-5 h-5 transition-colors ${
                  isLiked ? "fill-red-500 stroke-red-500" : "stroke-gray-500"
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}