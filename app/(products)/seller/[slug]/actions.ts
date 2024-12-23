"use server";
import prisma from "@/lib/db";
import { createClient } from "@/lib/supabase/server";
import { formatProductCards } from "@/lib/utils";

export async function getSellerInfo(slug: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const userId = user?.id

  const [sellerProducts, sellerProfile] = await Promise.all([
    prisma.products.findMany({
      where: { userId: slug },
      select: {
        id: true,
        title: true,
        imageUrls: true,
        price: true,
        ...
        (
          userId ? {
            likes: {
              where: {
                userId
              }
            }
          } : {}
        )
      },
    }),

    prisma.profiles.findUnique({ where: { id: slug } })
  ])


  console.log(sellerProducts);

  return { sellerProducts: formatProductCards(sellerProducts), sellerProfile };
}
