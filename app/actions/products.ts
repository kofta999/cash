"use server";

import prisma from "@/lib/db";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { z } from "zod";
import { SellFormSchema } from "../sell/consts";
import { randomUUID } from "crypto";

export async function getSelfProducts() {
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
  let prodId = randomUUID();

  if (!result.success) {
    throw new Error("Invalid input");
  }

  const supabase = createClient();

  const data = result.data;

  try {
    const imageUrls = await Promise.all(
      productData.imageUrls.map(async (imgUrl) => {
        const baseUrl = imgUrl.split("product-images/")[0];
        imgUrl = imgUrl.split("product-images/")[1];
        const newUrl = imgUrl.replace("temp", prodId);

        const { error: folderError } = await supabase.storage
          .from("product-images")
          .upload(`${productData.userId}/${prodId}/placeholder.txt`, "", {
            upsert: true,
          });

        if (folderError) {
          throw folderError;
        }

        const { data, error } = await supabase.storage
          .from("product-images")
          .move(imgUrl, newUrl);

        console.log(error, imgUrl, newUrl);

        if (error) {
          throw error;
        }

        return baseUrl + "product-images/" + newUrl;
      }),
    );

    console.log("uploaded", imageUrls);

    await prisma.product.create({
      data: { ...data, imageUrls, id: prodId },
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
    // return redirect(`/products/${prodId}`);
  }
}
