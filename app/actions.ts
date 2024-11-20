// actions/getAllProducts.ts
import prisma from '@/lib/db';
import { formatProductCards } from '@/lib/utils';

export async function getAllProducts() {
  const products = await prisma.products.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      id: true,
      title: true,
      imageUrls: true,
      price: true
    },
  });

  return formatProductCards(products);
}
