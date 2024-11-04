"use server";
import prisma from "@/lib/db";

export async function getSellerInfo(slug: string) {
  // Add table for user info linked by the UID
  // Fetch the user's name too
  const [sellerProducts, sellerProfile] = await Promise.all([
    prisma.product.findMany({
      where: { userId: slug },
      select: {
        id: true,
        title: true,
        imageUrls: true,
      },
    }),
    prisma.profile.findUnique({ where: { id: slug } })
  ])

  return { sellerProducts, sellerProfile };
}
