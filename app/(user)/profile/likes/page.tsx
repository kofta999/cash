import ProductCard from "@/components/product-card";
import prisma from "@/lib/db";
import { getAuth } from "@/lib/utils";
import { notFound } from "next/navigation";

export default async function Page() {
  const { id } = await getAuth();

  const maybeUser = await prisma.profiles.findUnique({
    where: { id },
    include: {
      likes: {
        select: {
          products: true,
        },
      },
    },
  });

  if (!maybeUser) {
    notFound();
  }

  return (
    <div>
      <h2 className="text-4xl text-center font-bold">Liked Products</h2>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 container">
        {maybeUser.likes.map(({ products: prod }) => (
          <ProductCard
            title={prod.title}
            id={prod.id}
            liked={true}
            price={prod.price}
            thumbnailUrl={prod.imageUrls[0]}
          />
        ))}
      </div>
    </div>
  );
}
