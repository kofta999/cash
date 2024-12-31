"use server"

import prisma from "@/lib/db"
import { UpdateUserSchema, updateUserSchema } from "./consts"
import { createClient } from "@/lib/supabase/server";

export async function updateUser(submitData: UpdateUserSchema) {

  const { success, data } = updateUserSchema.safeParse(submitData)

  if (!success) {
    throw new Error("Invalid data")
  }

  // TODO: remove extra images

  const updatedUser = await prisma.profiles.update({
    where: { id: data.id },
    data: {
      bio: data.bio,
      full_name: data.full_name,
      phone_number: data.phone_number,
      avatar: data.avatar
    }
  })

  console.log(updatedUser);

  return true

}

// async function deleteTempImages(userId: string) {
//   const supabase = await createClient();
//   const { data: list, error: e } = await supabase.storage
//     .from("avatars")
//     .list(`${userId}`);

//   if (e) {
//     throw e;
//   }
//   console.log(list);

//   // const filesToRemove = list.map((x) => `${userId}/temp/${x.name}`);
//   // await supabase.storage.from("product-images").remove(filesToRemove);
// }
