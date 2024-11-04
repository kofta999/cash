// actions/getAllProducts.ts


import ProductList from '@/components/product-list';
import prisma from '@/lib/db';
import { use } from 'react';


export async function getAllProducts() {
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    select :{
      id:true,
      title: true,
      imageUrls: true,
    },
  });
  return products;
}