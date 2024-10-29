"use server";

import prisma from "@/lib/db";
import { createClient } from "@/utils/supabase/server";

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
