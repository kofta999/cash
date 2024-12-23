"use server"
import prisma from "@/lib/db"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import { getAuth } from "../utils"

export async function toggleLikeProduct(productId: string): Promise<boolean> {
  const user = await getAuth()

  try {
    await prisma.likes.create({ data: { productId, userId: user.id } })
    return true
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        await prisma.likes.delete({
          where: {
            userId_productId: {
              userId: user.id,
              productId
            }
          }
        })
        return false
      }
    } else {
      console.error(error);
    }

    throw error
  }
}
