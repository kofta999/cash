import { z } from "zod";

interface Choice {
  label: string;
  value: string;
}

export const choices = [
  'womens-clothes',
  'mens-clothing',
  'womens-accessories',
  'mens-accessories'
] as const

export const governorates: Choice[] = [
  { label: "Alexandria", value: "alexandria" },
  { label: "Aswan", value: "aswan" },
  { label: "Assiut", value: "assiut" },
  { label: "Beheira", value: "beheira" },
  { label: "Beni Suef", value: "beni-suef" },
  { label: "Cairo", value: "cairo" },
  { label: "Dakahlia", value: "dakahlia" },
  { label: "Damietta", value: "damietta" },
  { label: "Fayoum", value: "fayoum" },
  { label: "Gharbia", value: "gharbia" },
  { label: "Ismailia", value: "ismailia" },
  { label: "Kafr el-Sheikh", value: "kafr-el-sheikh" },
  { label: "Matrouh", value: "matrouh" },
  { label: "Minya", value: "minya" },
  { label: "Menofia", value: "menofia" },
  { label: "New Valley", value: "new-valley" },
  { label: "North Sinai", value: "north-sinai" },
  { label: "Port Said", value: "port-said" },
  { label: "Qualyubia", value: "qualyubia" },
  { label: "Qena", value: "qena" },
  { label: "Red Sea", value: "red-sea" },
  { label: "Al-Sharqia", value: "al-sharqia" },
  { label: "Sohag", value: "sohag" },
  { label: "South Sinai", value: "south-sinai" },
  { label: "Suez", value: "suez" },
  { label: "Luxor", value: "luxor" },
];

export const sellFormSchema = z.object({
  type: z.string(),
  title: z.string().min(3),
  description: z.string(),
  imageUrls: z.array(z.string()),
  governorate: z.string().min(1),
  price: z.coerce.number(),
  contactNumber: z.string().min(10).max(11)
});

export const adFormSchema = z.object({
  type: z.enum(choices, {
    message: "Please select a category"
  }),
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  governorate: z.enum([...governorates.map(g => g.value) as [string, ...string[]]], {
    required_error: "Please select a location",
    invalid_type_error: "Please select a valid location",
    message: "Please select a location"
  }),
  price: z.number({
    message: "Price is required",
  }).min(0, "Price must be positive"),
  contactNumber: z.union([z.string()
    .regex(/^(\+20|0)?1[0125][0-9]{8}$/, "Invalid Egyptian phone number"), z.literal("")]),
  instagramLink: z.union([z.string()
    .regex(/^https:\/\/(www\.)?instagram\.com\/.*/, "Invalid Instagram link")
    , z.literal("")
  ]),
  imageUrls: z.array(z.string().url("Invalid image URL")).min(1, "At least one image is required"),
})


export type AdFormData = z.infer<typeof adFormSchema>;


export type SellFormSchema = z.infer<typeof sellFormSchema>;
