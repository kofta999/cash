"use server";

import prisma from "@/lib/db";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { z } from "zod";
import { SellFormSchema } from "../sell/consts";

export async function getUserProducts() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    // TODO: handle
    return;
  }

  const user = data.user;

  // TODO: Sorting, paginating, etc
  const userProudcts = await prisma.product.findMany({
    where: { userId: user.id },
  });

  return userProudcts;
}

export async function createProduct(
  productData: SellFormSchema & { userId: string },
) {
  // TODO: Duplicate code
  const sellFormSchema = z.object({
    type: z.string(),
    title: z.string().min(3),
    description: z.string(),
    imageUrls: z.array(z.string()),
    governorate: z.string().min(1),
    userId: z.string(),
  });

  const result = sellFormSchema.safeParse(productData);
  let prodId;

  if (result.success) {
    const supabase = createClient();

    const productData = result.data;

    try {
      const { id: productId } = await prisma.product.create({
        data: { ...productData, imageUrls: [] },
        select: { id: true },
      });

      prodId = productId;

      const imageUrls = await Promise.all(
        productData.imageUrls.map(async (imgUrl, i) => {
          imgUrl = imgUrl.split("product-images/")[1];
          const newUrl = imgUrl.replace("temp", productId);

          const { error: folderError } = await supabase.storage
            .from("product-images")
            .upload(`${productData.userId}/${productId}/placeholder.txt`, "", {
              upsert: true,
            });

          if (folderError) {
            throw folderError;
          }

          const { data, error } = await supabase.storage
            .from("product-images")
            .move(imgUrl, newUrl);

          if (error) {
            throw error;
          }

          return newUrl;
        }),
      );

      console.log("uploaded", imageUrls);

      await prisma.product.update({
        where: { id: productId },
        data: { imageUrls },
      });

      const { data: list, error: e } = await supabase.storage
        .from("product-images")
        .list(`${productData.userId}/temp`);

      if (e) {
        throw e;
      }

      const filesToRemove = list.map(
        (x) => `${productData.userId}/temp/${x.name}`,
      );

      await supabase.storage.from("product-images").remove(filesToRemove);
    } catch (e) {
      console.log(e);
    } finally {
      if (prodId) {
        return redirect(`/products/${prodId}`);
      }
    }
  } else {
    throw new Error("Invalid input");
  }
}
