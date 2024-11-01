// actions/getAllProducts.ts
import prisma from '@/lib/db';

export async function getAllProducts() {
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return products;
}