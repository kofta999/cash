import { z } from "zod";

export const updateUserSchema = z.object({
  id: z.string(),
  full_name: z.string().nullable()
    .refine((val) => !val || val.length >= 2, {
      message: "Full name must be at least 2 characters long"
    }),
  bio: z.string().nullable()
    .refine((val) => !val || val.length <= 500, {
      message: "Bio must not exceed 500 characters"
    }),
  phone_number:
    z.string()
      .regex(/^(\+20|0)?1[0125][0-9]{8}$/, "Invalid Egyptian phone number").nullable(),
  avatar: z.string().nullable(),
  links: z.array(z.string().url({
    message: "Must be a valid URL"
  })),
})

export type UpdateUserSchema = z.infer<typeof updateUserSchema>
