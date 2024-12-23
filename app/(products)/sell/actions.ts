"use server";

import prisma from "@/lib/db";
import { randomUUID } from "crypto";
import { z } from "zod";
import { SellFormSchema, sellFormSchema } from "./consts";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function createProduct(
  productData: SellFormSchema & { userId: string },
) {
  let prodId = randomUUID();
  const result = sellFormSchema
    .extend({ userId: z.string() })
    .safeParse(productData);

  if (!result.success) {
    throw new Error("Invalid input");
  }

  const data = result.data;

  const imageUrls = await Promise.all(
    productData.imageUrls.map(async (imgUrl) =>
      copyProductImages(imgUrl, prodId, data.userId),
    ),
  );

  await prisma.products.create({
    data: { ...data, imageUrls, id: prodId, updatedAt: (() => new Date())() },
  });

  deleteTempImages(data.userId);

  redirect(`/products/${prodId}`);
}

async function copyProductImages(
  imgUrl: string,
  prodId: string,
  userId: string,
) {
  const supabase = await createClient();
  const baseUrl = imgUrl.split("product-images/")[0];
  imgUrl = imgUrl.split("product-images/")[1];
  const newUrl = imgUrl.replace("temp", prodId);

  const { error: folderError } = await supabase.storage
    .from("product-images")
    .upload(`${userId}/${prodId}/placeholder.txt`, "", {
      upsert: true,
    });

  if (folderError) {
    throw folderError;
  }

  const { error } = await supabase.storage
    .from("product-images")
    .move(imgUrl, newUrl);

  if (error) {
    throw error;
  }

  return baseUrl + "product-images/" + newUrl;
}

async function deleteTempImages(userId: string) {
  const supabase = await createClient();
  const { data: list, error: e } = await supabase.storage
    .from("product-images")
    .list(`${userId}/temp`);

  if (e) {
    throw e;
  }

  const filesToRemove = list.map((x) => `${userId}/temp/${x.name}`);
  await supabase.storage.from("product-images").remove(filesToRemove);
}
