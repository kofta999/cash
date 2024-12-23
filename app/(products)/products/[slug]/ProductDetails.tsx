"use client";

import Link from "next/link";
import { ProductGallery } from "../../ProductGallery";
import type { products as ProductModel } from "@prisma/client";

type Product = ProductModel & {
  users: {
    id: string;
    full_name: string | null;
  };
  _count: {
    likes: number;
  };
};

export function ProductDetails({
  product: {
    title,
    description,
    createdAt,
    imageUrls,
    price,
    type,
    governorate,
    contactNumber,
    users,
    _count: { likes },
  },
}: {
  product: Product;
}) {
  const formattedDate = new Date(createdAt).toLocaleDateString();
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EGP",
  }).format(price);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-2">
        <ProductGallery images={imageUrls} title={title} />

        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
            <p className="mt-4 text-lg text-muted-foreground">{description}</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">{formattedPrice}</span>
            </div>

            <dl className="space-y-4 text-sm">
              <div className="flex justify-between">
                <dt className="font-medium">Category</dt>
                <dd className="text-muted-foreground">{type}</dd>
              </div>
              {/* TODO: Update style here maybe? and add LikeButton component */}
              <div className="flex justify-between">
                <dt className="font-medium">Likes</dt>
                <dd className="text-muted-foreground">{likes}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium">Location</dt>
                <dd className="text-muted-foreground">{governorate}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium">Seller</dt>
                <dd>
                  <Link
                    href={`/seller/${users.id}`}
                    className="text-primary hover:underline"
                  >
                    {users.full_name}
                  </Link>
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium">Posted</dt>
                <dd className="text-muted-foreground">{formattedDate}</dd>
              </div>
            </dl>

            <div className="space-y-2">
              <button className="w-full rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                Contact Seller
              </button>
              <p className="text-center text-sm text-muted-foreground">
                {contactNumber}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
