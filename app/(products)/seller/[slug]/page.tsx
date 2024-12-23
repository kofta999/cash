import ProductList from "@/components/product-list";
import SellerProfile from "./_components/seller-profile";
import prisma from "@/lib/db";
import { formatProductCards, getAuth } from "@/lib/utils";
import { notFound } from "next/navigation";

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  // TODO: Use something other than the UID for slugs
  const { slug } = await props.params;
  const { id: userId } = await getAuth();

  const [sellerProducts, sellerProfile] = await Promise.all([
    prisma.products.findMany({
      where: { userId: slug },
      select: {
        id: true,
        title: true,
        imageUrls: true,
        price: true,
        ...(userId
          ? {
              likes: {
                where: {
                  userId,
                },
              },
            }
          : {}),
      },
    }),

    prisma.profiles.findUnique({ where: { id: slug } }),
  ]);

  if (!sellerProfile) {
    notFound();
  }

  return (
    <div>
      <SellerProfile {...sellerProfile} />
      <ProductList products={formatProductCards(sellerProducts)} />
    </div>
  );
}
