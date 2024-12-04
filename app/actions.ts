// actions/getAllProducts.ts
import prisma from '@/lib/db';
import { createClient } from '@/lib/supabase/server';
import { formatProductCards } from '@/lib/utils';

export async function getAllProducts() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const userId = user?.id
  const products = await prisma.products.findMany({
    orderBy: {
      createdAt: 'desc',
    },
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
  });

  return formatProductCards(products);
}
