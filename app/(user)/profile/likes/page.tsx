import ProductCard from "@/components/product-card";
import prisma from "@/lib/db";
import { getAuth } from "@/lib/utils";
import { notFound, redirect } from "next/navigation";

export default async function Page() {
  const maybeUser = await getAuth();
  if (!maybeUser) {
    redirect("/sign-in");
  }

  const { id } = maybeUser;

  const user = await prisma.profiles.findUnique({
    where: { id },
    include: {
      likes: {
        select: {
          products: true,
        },
      },
    },
  });

  if (!user) {
    notFound();
  }

  return (
    <div>
      <h2 className="text-4xl text-center font-bold">Liked Products</h2>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 container">
        {user.likes.map(({ products: prod }) => (
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
