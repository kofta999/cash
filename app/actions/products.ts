"use server";

import prisma from "@/lib/db";
import { createClient } from "@/utils/supabase/server";

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

export async function createProduct(formData: FormData) {
  console.log("Received user data", formData);

  const files = formData.getAll("images");

  console.log(files);

  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    // TODO: handle
    return;
  }

  const user = data.user!;

  const file = files[0] as File;
  console.log(file);

  try {
    const res = await supabase.storage
      .from("product-images")
      .upload(`${user.id}/test.png`, file);

    console.log("uploaded", res);
  } catch (e) {
    console.log(e);
  }
}
