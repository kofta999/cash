import prisma from "@/lib/db";

export async function getSellerInfo(slug: string) {
  // Add table for user info linked by the UID
  const sellerProducts = await prisma.product.findMany({
    where: { userId: slug },
    select: {
      id: true,
      title: true,
      imageUrls: true,
    },
  });

  return sellerProducts;
}
