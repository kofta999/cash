"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images: string[];
  title: string;
}

export function ProductGallery({ images, title }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  if (!images.length) return null;

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
        <Image
          src={images[selectedImage]}
          alt={`${title} - Image ${selectedImage + 1}`}
          className="object-cover object-center"
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-4 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={image}
              onClick={() => setSelectedImage(index)}
              className={cn(
                "relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md",
                selectedImage === index && "ring-2 ring-primary",
              )}
            >
              <Image
                src={image}
                alt={`${title} thumbnail ${index + 1}`}
                className="object-cover object-center"
                fill
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
