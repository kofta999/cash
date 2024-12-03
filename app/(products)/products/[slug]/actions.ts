"use server"

import prisma from "@/lib/db"

export async function getProductInfo(slug: string) {
  const product = await prisma.products.findUnique({
    where: { id: slug },
    include: {
      users: {
        select: {
          id: true,
          full_name: true,
        }
      }
    }
  })

  return product
}
